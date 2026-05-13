import { z } from "zod";

export const inventoryParamsSchema = z.object({
  productId: z.string().regex(/^\d+$/, "Product id must be numeric")
});
