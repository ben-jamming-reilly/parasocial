import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";
import { SearchClient } from "~/lib/search";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import { SearchQuery } from "@prisma/client";
import { getServerAuthSession } from "~/server/auth";

const social = new SearchClient({
  BASE: env.PARASOCIAL_API_BASE_URL,
});

export const searchRouter = createTRPCRouter({
  previousSearches: publicProcedure
    .input(
      z.object({
        author: z.string(),
        limit: z.number().min(10).max(100).default(35),
      })
    )
    .query(async ({ input }) => {
      const searches = await prisma.searchQuery.findMany({
        where: {
          author: input.author,
        },
        orderBy: {
          create_date: "desc",
        },
        take: 100,
      });

      const queries = new Set(
        searches.map((search) => search.query.toLowerCase())
      );
      let uniqueSearches: SearchQuery[] = [];

      for (const search of searches) {
        const query = search.query.toLowerCase();

        if (queries.has(query)) {
          uniqueSearches.push(search);
          queries.delete(query);

          if (uniqueSearches.length >= input.limit) break;
        }
      }

      return uniqueSearches;
    }),
  fromAuthor: publicProcedure
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
        social.search.documentSegmentsByQuery(
          input.query,
          input.author,
          input.skip,
          input.limit
        ),
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
  fromDocument: publicProcedure
    .input(
      z.object({
        query: z.string(),
        url: z.string().url(),
        skip: z.number().optional(),
      })
    )
    .query(async ({ input }) => {
      // const limit = 20;
      // return await social.search.documentSegmentsByQuery(input.query, input.author, input.skip, limit)
      return [];
    }),
});
