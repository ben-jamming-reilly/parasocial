import { env } from "~/env.mjs";
import { SearchClient } from "./SearchClient";

export const searchInstance = new SearchClient({
  BASE: env.VIDEO_QUERY_API_BASE_URL,
});
