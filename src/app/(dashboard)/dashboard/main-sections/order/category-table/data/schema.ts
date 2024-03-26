import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const categorySchema = z.object({
  _id: z.string(),
  fullName: z.string(),
  mobilePhone: z.string(),
  specialRequest: z.string(),
  rentalStartDate: z.date(),
  rentalEndDate: z.date(),
  carId: z.string(),
  carNameAndModel: z.string(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Category = z.infer<typeof categorySchema>;
