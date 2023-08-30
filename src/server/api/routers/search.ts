import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";
import { SearchClient } from "~/lib/search"
import { env } from "~/env.mjs"
import { prisma } from "~/server/db";
import { SearchQuery } from "@prisma/client";

const social = new SearchClient({
  BASE: env.PARASOCIAL_API_BASE_URL,
});

export const searchRouter = createTRPCRouter({
  previousSearches: publicProcedure
    .input(z.object({ author: z.string() }))
    .query(async ({ input }) => {
      //

      const searches = await prisma.searchQuery.findMany({
        where: {
          author: input.author,
        },
        orderBy: {
          create_date: "desc",
        },
        take: 100,
      });

      const queries = new Set(searches.map((search) => search.query.toLowerCase()));
      let uniqueSearches: SearchQuery[] = [];

      for (const search of searches) {
        if (queries.has(search.query.toLowerCase())) {
          uniqueSearches.push(search);
          queries.delete(search.query.toLowerCase());
        }
      }

      return
    }),
  searchByAuthor: publicProcedure
    .input(z.object({ query: z.string(), author: z.string() }))
    .query(async ({ input }) => {
      return await social.search.documentSegmentsByQuery(input.query, input.author)
    }),
});
