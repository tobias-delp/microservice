import { z } from "zod";

export const productIdSchema = z.string().regex(/^\d+$/, "Product id must be numeric");

export const createOrderSchema = z.object({
  productId: productIdSchema,
  quantity: z.number().int().positive()
});
