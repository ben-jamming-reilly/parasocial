import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";
import { searchInstance } from "~/lib/search/instance";
import { prisma } from "~/server/db";
import { getServerAuthSession } from "~/server/auth";

export const searchRouter = createTRPCRouter({
  queryAuthor: publicProcedure
    .input(
      z.object({
        query: z.string(),
        author: z.string(),
        skip: z.number().default(0),
        limit: z.number().min(10).max(50).default(20),
      })
    )
    .query(async ({ input }) => {
      const session = await getServerAuthSession();

      const [results] = await Promise.all([
        searchInstance.search.querySegmentsFromProfile(input),
        prisma.searchQuery.create({
          data: {
            user_id: session?.user.id ?? undefined,
            query: input.query,
            author: input.author,
          },
        }),
      ]);

      return results;
    }),
  queryDocument: publicProcedure
    .input(
      z.object({
        id: z.string(),
        query: z.string(),
        skip: z.number().default(0),
        limit: z.number().min(10).max(50).default(20),
      })
    )
    .query(async ({ input }) => {
      return await searchInstance.search.querySegmentsFromDocument(input);
    }),
});
