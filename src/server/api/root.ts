import { searchRouter } from "~/server/api/routers/search";
import { profileRouter } from "./routers/profile";
import { videoRouter } from "./routers/video";
import { createTRPCRouter } from "~/server/api/trpc";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  search: searchRouter,
  profile: profileRouter,
  video: videoRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
