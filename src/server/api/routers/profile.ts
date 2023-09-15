import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { searchInstance } from "~/lib/search/instance";

export const profileRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        skip: z.number().default(0),
        limit: z.number().min(10).max(50).default(20),
      })
    )
    .query(async ({ input }) => {
      return await searchInstance.profile.getAllProfiles();
    }),
  getYoutubeProfile: publicProcedure
    .input(
      z.object({
        author: z.string(),
      })
    )
    .query(async ({ input }) => {
      return await searchInstance.profile.getYoutube(input);
    }),
  getDocuments: publicProcedure
    .input(
      z.object({
        author: z.string(),
        skip: z.number().default(0),
        limit: z.number().min(10).max(50).default(20),
      })
    )
    .query(async ({ input }) => {
      const documents = await searchInstance.documents.allDocuments({
        ...input,
      });

      return documents.sort(
        (doc1, doc2) =>
          new Date(doc2.publish_date).getTime() -
          new Date(doc1.publish_date).getTime()
      );
    }),
});
