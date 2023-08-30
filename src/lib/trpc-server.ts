import { httpBatchLink } from "@trpc/client";

import { appRouter } from "~/server/api/root";
import { getBaseUrl } from "~/lib/utils"

export const trpcServer = appRouter.createCaller({
    links: [
        httpBatchLink({
            url: `${getBaseUrl}/api/trpc`,
        }),
    ],
});