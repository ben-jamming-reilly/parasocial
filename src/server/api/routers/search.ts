import { z } from "zod";
import { SearchQuery } from "@prisma/client";
import {
  createTRPCRouter,
  publicProcedure,
  // protectedProcedure,
} from "~/server/api/trpc";
import { db } from "~/server/db";

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
});
