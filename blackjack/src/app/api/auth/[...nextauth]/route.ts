import { handlers } from "../../../../lib/auth";

// re-exporta os handlers (GET, POST, etc) do next-auth
export const { GET, POST } = handlers;
