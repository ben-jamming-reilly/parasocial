import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { SearchClient } from "~/lib/search";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import { SearchQuery } from "@prisma/client";

const social = new SearchClient({
  BASE: env.PARASOCIAL_API_BASE_URL,
});

export const profileRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        skip: z.number().default(0),
        limit: z.number().min(10).max(50).default(20),
      })
    )
    .query(async ({ input }) => {
      return await social.profile.getAllProfiles();
    }),
  getYoutubeProfile: publicProcedure
    .input(
      z.object({
        channel: z.string(),
      })
    )
    .query(async ({ input }) => {
      return await social.profile.getYoutube(input.channel);
    }),
  getDocuments: publicProcedure
    .input(
      z.object({
        channel: z.string(),
        skip: z.number().default(0),
        limit: z.number().min(10).max(50).default(20),
      })
    )
    .query(async ({ input }) => {
      return await social.search.allDocuments(
        input.channel,
        input.skip,
        input.limit
      );
    }),
});
