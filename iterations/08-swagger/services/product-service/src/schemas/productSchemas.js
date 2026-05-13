import { z } from "zod";

export const productParamsSchema = z.object({
  id: z.string().regex(/^\d+$/, "Product id must be numeric")
});
