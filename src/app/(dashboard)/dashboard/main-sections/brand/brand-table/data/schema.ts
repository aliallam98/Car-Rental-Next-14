import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const brandSchema = z.object({
  id: z.string(),
  name: z.string(),
  image: z.object({
    secure_url: z.string(),
  }),
  createdBy: z.object({
    _id: z.string(),
    fullName: z.string(),
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Brand = z.infer<typeof brandSchema>;
