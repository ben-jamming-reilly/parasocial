import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import pRetry from "p-retry";
import { TRPCError } from "@trpc/server";

export const videoRouter = createTRPCRouter({
  upload: protectedProcedure
    .input(z.object({ url: z.string().url() }))
    .mutation(async ({ input, ctx }) => {
      const date = new Date();
      date.setDate(date.getDate() - 1);

      const [uploads, user] = await Promise.all([
        ctx.db.videoUpload.count({
          where: {
            user_id: ctx.session.user.id,
            create_date: {
              gte: date,
            },
          },
        }),
        ctx.db.user.findUnique({ where: { id: ctx.session.user.id } }),
      ]);

      if (uploads >= 3 && !user?.infinite_upload) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "cannot upload more than 3 videos a day",
        });
      }

      const maxLength = user?.infinite_upload ? 60 * 60 * 12 : 60 * 60 * 4;
      const upload = await ctx.videoQuery.videos.upload({
        maxLength,
        requestBody: input,
      });
      const videoUpload = await ctx.db.videoUpload.create({
        data: {
          id: upload.id,
          url: upload.url,
          user_id: ctx.session.user.id,
        },
      });

      return videoUpload;
    }),
  //
  view: publicProcedure
    .input(
      z.object({
        video_id: z.string(),
        start: z.number().int(),
        end: z.number().int(),
        author: z.string().optional(),
        query: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      // Don't double count
      const viewWindow = new Date();
      viewWindow.setMinutes(viewWindow.getMinutes() - 5);

      const view = await ctx.db.view.findFirst({
        where: {
          AND: [
            { video_id: input.video_id },
            { start_s: input.start },
            { end_s: input.end },
            { author: input.author },
            { query: input.query },
            { user_id: ctx.session?.user.id },
            {
              create_date: {
                gt: viewWindow,
              },
            },
          ],
        },
      });

      // if (view) return view;

      return await ctx.db.view.create({
        data: {
          video_id: input.video_id,
          start_s: input.start,
          end_s: input.end,
          user_id: ctx.session?.user.id,
          author: input.author,
          query: input.query,
        },
      });
    }),

  get: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        return await pRetry(() => ctx.videoQuery.videos.getVideo(input), {
          retries: 3,
        });
      } catch (error) {
        return undefined;
      }
    }),

  getAll: publicProcedure
    .input(
      z.object({
        author: z.string().optional(),
        skip: z.number().default(0),
        limit: z.number().min(10).max(1000).default(500),
      })
    )
    .query(async ({ input, ctx }) => {
      const videos = await pRetry(
        () => ctx.videoQuery.videos.getAllVideos(input),
        { retries: 3 }
      );

      if (!input.author) return videos;

      return videos.sort((lh, rh) => {
        const lhDate = new Date(lh.publish_date);
        const rhDate = new Date(rh.publish_date);
        return rhDate.getTime() - lhDate.getTime();
      });
    }),

  summary: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await pRetry(() => ctx.videoQuery.videos.summaryVideo(input), {
        retries: 3,
      });
    }),

  similar: publicProcedure
    .input(
      z.object({
        id: z.string().min(1),
        start: z.number().int().min(0),
        end: z.number().int().min(0),
        author: z.string().optional(),
        explore: z.boolean().default(false),
      })
    )
    .query(async ({ ctx, input }) => {
      if (input.explore) {
        const getSimilarVideos = () =>
          ctx.videoQuery.videos.similarVideo({
            id: input.id,
            start: input.start,
            end: input.end,
            excludeAuthor: input.author,
          });

        return await pRetry(getSimilarVideos, { retries: 3 });
      } else {
        const getSimilarVideos = () =>
          ctx.videoQuery.videos.similarVideo({
            id: input.id,
            start: input.start,
            end: input.end,
            author: input.author,
          });

        return await pRetry(getSimilarVideos, { retries: 3 });
      }
    }),

  search: publicProcedure
    .input(
      z.object({
        query: z.string(),
        videoId: z.string().optional(),
        author: z.string().optional(),
        skip: z.number().default(0),
        limit: z.number().min(10).max(50).default(20),
      })
    )
    .query(async ({ input, ctx }) => {
      const saveQuery = ctx.db.searchQuery.create({
        data: {
          query: input.query,
          user_id: ctx.session?.user.id,
          author: input.author,
          video_id: input.videoId,
        },
      });

      if (input.videoId) {
        const search = () =>
          ctx.videoQuery.search.searchVideo({
            id: input.videoId!,
            query: input.query,
          });

        const [results] = await Promise.all([
          pRetry(search, { retries: 3 }),
          saveQuery,
        ]);
        return results;
      }

      const search = () => ctx.videoQuery.search.searchAllVideos(input);
      const [results] = await Promise.all([
        pRetry(search, { retries: 3 }),
        saveQuery,
      ]);

      return results;
    }),
});
