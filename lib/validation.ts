import {z} from "zod"

export const UserFormValidation = z.object({
    name: z.string()
    .min(4, {
      message: "Username must be at least 4 characters.",
    })
    .max(30, {
        message: "Username must be at least 30 characters.",
      }),
    email: z.string().email({
      message: "Please enter a valid email.",
    }),
    phone: z.string().refine((phone) => /^\+d{10,15}$/.test(phone), {
        message: "Please enter a valid Phone number.",
    })
  });