import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import pRetry from "p-retry";

export const profileRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        skip: z.number().default(0),
        limit: z.number().min(10).max(50).default(20),
      })
    )
    .query(async ({ input, ctx }) => {
      return await pRetry(() => ctx.videoQuery.profile.getAllProfiles(), {
        retries: 3,
      });
    }),
  getYoutubeProfile: publicProcedure
    .input(
      z.object({
        author: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      return await pRetry(() => ctx.videoQuery.profile.getYoutube(input), {
        retries: 3,
      });
    }),
  trending: publicProcedure
    .input(z.object({ author: z.string() }))
    .query(async ({ ctx, input }) => {
      // Get a sample of the latest views of someone
      const views = await ctx.db.view.findMany({
        where: { author: input.author },
        orderBy: { create_date: "desc" },
        take: 500,
      });

      return await ctx.videoQuery.cluster.clusterVideos({
        requestBody: views.map((view) => ({
          video_id: view.video_id,
          text: view.query || "",
          start: view.start_s,
          end: view.end_s,
        })),
      });
    }),
});
