import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { VideoQuery } from "../../video-query";
import { env } from "~/env.mjs";

const videoQuery = new VideoQuery({
  BASE: env.VIDEO_QUERY_API_BASE_URL,
  HEADERS: {
    Authorization: env.VIDEO_QUERY_API_KEY,
  },
});

export const videoRouter = createTRPCRouter({
  upload: protectedProcedure
    .input(z.object({ url: z.string().url() }))
    .mutation(async ({ input, ctx }) => {
      ctx.session.user.id;
      const upload = await videoQuery.videos.upload({ requestBody: input });
      return upload;
    }),

  get: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      return await videoQuery.videos.getVideo(input);
    }),

  getAll: publicProcedure
    .input(
      z.object({
        author: z.string().optional(),
        skip: z.number().default(0),
        limit: z.number().min(10).max(50).default(20),
      })
    )
    .query(async ({ input }) => {
      return await videoQuery.videos.getAllVideos(input);
    }),

  summary: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      return await videoQuery.videos.summaryVideo(input);
    }),

  search: publicProcedure
    .input(
      z.object({
        query: z.string(),
        author: z.string().optional(),
        skip: z.number().default(0),
        limit: z.number().min(10).max(50).default(20),
      })
    )
    .query(async ({ input }) => {
      return await videoQuery.search.searchAllVideos(input);
    }),
});
