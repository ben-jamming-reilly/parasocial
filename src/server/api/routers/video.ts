import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const videoRouter = createTRPCRouter({
  upload: protectedProcedure
    .input(z.object({ url: z.string().url() }))
    .mutation(async ({ input, ctx }) => {
      const upload = await ctx.videoQuery.videos.upload({ requestBody: input });
      return upload;
    }),

  get: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await ctx.videoQuery.videos.getVideo(input);
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
      return await ctx.videoQuery.videos.getAllVideos(input);
    }),

  summary: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await ctx.videoQuery.videos.summaryVideo(input);
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
