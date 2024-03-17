import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const categorySchema = z.object({
  id: z.string(),
  title: z.string(),
  imageUrl: z.string(),
  label: z.string(),
  action: z.string(),
})

export type Category = z.infer<typeof categorySchema>