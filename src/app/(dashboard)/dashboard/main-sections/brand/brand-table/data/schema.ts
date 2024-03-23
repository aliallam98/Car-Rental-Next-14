import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const brandSchema = z.object({
  _id: z.string(),
  name: z.string(),
  imageUrl: z.string(),
  createdBy: z.object({
    _id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Brand = z.infer<typeof brandSchema>;
