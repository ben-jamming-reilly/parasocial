import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  searchHistory: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.searchQuery.findMany({
      where: {
        user_id: ctx.session.user.id,
      },
      orderBy: {
        create_date: "desc",
      },
      distinct: "query",
      take: 50,
    });
  }),
  uploads: protectedProcedure.query(async ({ ctx }) => {
    const uploads = await ctx.db.videoUpload.findMany({
      where: {
        user_id: ctx.session.user.id,
      },
    });
    return uploads;
  }),
});
