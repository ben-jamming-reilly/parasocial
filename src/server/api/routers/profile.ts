import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { searchInstance } from "~/lib/search/instance";
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
});
