import { z } from "zod";

const validateExpiry = (value: string) => {
    const [monthStr, yearStr] = value.split('/');
    const month = parseInt(monthStr, 10);
    const year = parseInt('20' + yearStr, 10);
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
  
    if (isNaN(month) || isNaN(year)) return false;
    if (month < 1 || month > 12) return false;
    if (year < currentYear) return false;
    if (year === currentYear && month < currentMonth) return false;
  
    return true;
};
  
export const PaymentSchema = z.object({
    cardNumber: z.string().regex(/^(\d{4} ?){4}$/, 'Card number must be 16 digits'),
    expiry: z
      .string()
      .regex(/^\d{2}\/\d{2}$/, 'Format must be MM/YY')
      .refine(validateExpiry, {
        message: 'Expiry date must be valid and in the future',
      }),
    cvc: z.string().min(3, 'CVC must be 3 digits').max(4, 'CVC must be max 4 digits'),
});
  
export type PaymentFormData = z.infer<typeof PaymentSchema>;