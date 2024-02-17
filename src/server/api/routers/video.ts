import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import pRetry from "p-retry";
import { nanoid } from "nanoid";
import { TRPCError } from "@trpc/server";

export const videoRouter = createTRPCRouter({
  upload: protectedProcedure
    .input(z.object({ url: z.string().url() }))
    .mutation(async ({ input, ctx }) => {
      const date = new Date();
      date.setDate(date.getDate() - 1);

      const uploads = await ctx.db.videoUpload.count({
        where: {
          user_id: ctx.session.user.id,
          create_date: {
            gte: date,
          },
        },
      });

      if (uploads >= 3) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "cannot upload more than 3 videos a day",
        });
      }

      await ctx.videoQuery.videos.upload({ requestBody: input });
      const videoUpload = await ctx.db.videoUpload.create({
        data: {
          id: nanoid(),
          url: input.url,
          user_id: ctx.session.user.id,
        },
      });

      return videoUpload;
    }),

  get: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await await pRetry(() => ctx.videoQuery.videos.getVideo(input), {
        retries: 3,
      });
    }),

  getAll: publicProcedure
    .input(
      z.object({
        author: z.string().optional(),
        skip: z.number().default(0),
        limit: z.number().min(10).max(50).default(20),
      })
    )
    .query(async ({ input, ctx }) => {
      return await pRetry(() => ctx.videoQuery.videos.getAllVideos(input), {
        retries: 3,
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
        const [results] = await Promise.all([
          ctx.videoQuery.search.searchVideo({
            id: input.videoId,
            query: input.query,
          }),
          saveQuery,
        ]);
        return results.slice(0, 20);
      }

      const [results] = await Promise.all([
        ctx.videoQuery.search.searchAllVideos(input),
        saveQuery,
      ]);

      return results.slice(0, 20);
    }),
});
