import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(2, { message: "Full name is required" }),
  email: z.string().email({ message: "Invalid email" }),
  phone: z.string().regex(/^\d{3}-\d{3}-\d{4}$/, { message: "Use format 123-456-7890" }),
  shippingAddress: z.string().min(5, { message: "Shipping address required" }),
  billingAddress: z.string().min(5, { message: "Billing address required" }),
  sameAsShipping: z.boolean().optional(),
});

export type CheckoutFormInputs = z.infer<typeof checkoutSchema>;
