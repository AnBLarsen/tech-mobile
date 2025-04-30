import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().nonempty({ message: "Email is required" }).email(),
    password: z.string().nonempty({ message: "Password is required" }).min(8)
});

export type LoginFormInputs = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    address: z.string().min(5, { message: "Address must be at least 5 characters" }),
    phone: z.string().regex(/^\d{3}-\d{3}-\d{4}$/, { message: "Phone number must be in the format 123-456-7890" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string().min(8, { message: "Confirm Password must be at least 8 characters" }),
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export type RegisterFormInputs = z.infer<typeof registerSchema>;
