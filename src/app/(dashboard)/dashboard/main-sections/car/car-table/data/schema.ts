import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const categorySchema = z.object({
  _id: z.string(),
  name: z.string(),
  imagesUrl: z.array(z.string()),
  createdAt: z.string(),
  createdBy: z.object({
    firstName: z.string(),
    lastName: z.string(),
  })
})

export type Category = z.infer<typeof categorySchema>