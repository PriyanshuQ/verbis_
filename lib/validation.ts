import { z } from "zod";

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(4, {
      message: "Username must be at least 4 characters.",
    })
    .max(30, {
      message: "Username must be at least 30 characters.",
    }),
  email: z.string().email({
    message: "Please enter a valid email.",
  }),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});

export const InfluencerFormValidation = z.object({
  followers: z
    .number({
      invalid_type_error: "Followers must be a number.", // Error for non-number values
    })
    .refine((count) => count > 10000, {
      message: "Number of followers must be greater than 10,000.",
    }),
  social_media_url: z
    .string()
    .transform((val) => val.trim()) // Trim leading and trailing spaces
    .refine(
      (value) => !value.includes(" "), // Check for spaces in the middle
      { message: "The URL cannot contain spaces" }
    )
    .refine(
      (value) => /^https?:\/\/[^\s$.?#].[^\s]*$/.test(value), // Validate URL format
      { message: "Invalid URL format" }
    ),
  gender: z.enum(["Male", "Female", "Other"]),
  platform: z.enum(["Instagram", "Other"]),
  dataConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to treatment in order to proceed",
    }),
  contentusageConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to disclosure in order to proceed",
    }),
  insights: z.string().min(1, { message: "Identification type is required." }),
  identificationType: z
    .string()
    .min(1, { message: "Identification type is required." }),
  identificationNumber: z
    .string()
    .min(1, { message: "Identification number is required." }),
  identificationDocument: z
    .custom<File[]>()
    .refine((files) => files.length > 0, {
      message: "At least one identification document is required.",
    }),
});
