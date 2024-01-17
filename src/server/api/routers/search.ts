import { z } from "zod";
import { SearchQuery } from "@prisma/client";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";
import { searchInstance } from "~/lib/search/instance";
import { db } from "~/server/db";
import { getServerAuthSession } from "~/server/auth";

export const searchRouter = createTRPCRouter({
  previousQueries: publicProcedure
    .input(
      z.object({
        query: z.string().min(1),
        author: z.string().min(1),
      })
    )
    .query(async ({ input }) => {
      const searches: SearchQuery[] = await db.$queryRaw`
        SELECT  *
        FROM "SearchQuery"
        WHERE "SearchQuery".author = ${input.author} 
          AND to_tsvector('english', "query") @@ plainto_tsquery('english', ${input.query})
        LIMIT 20;
      `;
      const queries = new Set();

      return searches
        .filter((search) => {
          if (search.author && !queries.has(search.query)) {
            queries.add(search.query);
            return true;
          }
          return false;
        })
        .map(({ id, query, author }) => ({ id, query, author }));
    }),

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
        db.searchQuery.create({
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
