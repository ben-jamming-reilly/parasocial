import { httpBatchLink } from "@trpc/client";

import { appRouter } from "~/server/api/root";
import { getBaseUrl } from "~/lib/utils";
// import { getServerAuthSession } from "~/server/auth";

export const trpcServer = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
});
