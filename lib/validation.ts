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
  // name: z
  //   .string()
  //   .min(2, "Name must be at least 2 characters")
  //   .max(50, "Name must be at most 50 characters"),
  // email: z.string().email("Invalid email address"),
  // phone: z
  //   .string()
  //   .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),


  previousCollaborations: z.string().optional(),
  niche: z.string().optional(),


  followers: z
  .string()
  .transform((val) => {
    // Try to convert the string to a number
    const parsed = Number(val);
    return isNaN(parsed) ? val : parsed; // If it's not a number, return the original string
  })
  .refine((val) => typeof val === "number", {
    message: "Followers must be a valid number.",
  }) // Ensure it is now a number
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
  insights: z.enum(["13-17", "18-24", "25-34", "35-44", "45-54"]),
  identificationType: z.enum(["Government_ID_Proof", "Driving_Licence", "PAN"]),
  identificationNumber: z
    .string()
    .min(1, { message: "Identification number is required." }),
  identificationDocument: z
    .custom<File[]>()
    .refine((files) => files?.length > 0, {
      message: "At least one identification document is required.",
    }),

});

export const HotelFormValidation = z.object({
  hotelname: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters.",
    })
    .max(30, {
      message: "Name must be at most 30 characters.",
    }),
  hotelemail: z.string().email({
    message: "Please enter a valid email.",
  }),
  contactnumber: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});

export const HotelRegistrationValidation = z.object({

  address: z.string().min(10, "Address must be at least 10 characters."),
  city: z.string().min(2, "City must be at least 2 characters."),
  state: z.string().min(2, "State must be at least 2 characters."),
  pincode: z
    .string()
    .refine((code) => /^\d{6}$/.test(code), "Invalid pincode (must be 6 digits)."),
  locationurl: z
    .string()
    .transform((val) => val.trim())
    .refine(
      (value) => !value.includes(" "),
      { message: "The URL cannot contain spaces" }
    )
    .refine(
      (value) => /^https?:\/\/[^\s$.?#].[^\s]*$/.test(value),
      { message: "Invalid Google Maps URL" }
    ),

  starrating: z
    .string()
    .refine(
      (rating) => /^[1-5]$/.test(rating),
      { message: "Star rating must be a number between 1 and 5." }
      ).transform((rating) => parseInt(rating, 10)
    ),
  whatsappcontactnumber: z
    .string()
    .refine((num) => /^\d{10}$/.test(num), "Invalid WhatsApp number (must be 10 digits).")
    .optional(),
    
  hotelwebsiteurl: z
    .string()
    .transform((val) => val.trim())
    .refine(
      (value) => !value.includes(" "),
      { message: "The URL cannot contain spaces" }
    )
    .refine(
      (value) => /^https?:\/\/[^\s$.?#].[^\s]*$/.test(value),
      { message: "Invalid URL format." }
    ).optional(),

  socialmediaurl: z
    .string()
    .transform((val) => val.trim())
    .refine(
      (value) => !value.includes(" "),
      { message: "The URL cannot contain spaces" }
    )
    .refine(
      (value) => /^https?:\/\/[^\s$.?#].[^\s]*$/.test(value),
      { message: "Invalid URL format." }
    ).optional(),

  image1: z
    .custom<File[]>()
    .refine((files) => files?.length > 0, {
      message: "Images are required.",
    }),
  image2: z
    .custom<File[]>()
    .refine((files) => files?.length > 0, {
      message: "Images are required.",
    }),
  image3: z
    .custom<File[]>()
    .refine((files) => files?.length > 0, {
      message: "Images are required.",
    }),

  contentusageConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "You must consent to disclosure in order to proceed.",
    }),
  collaborationagreementConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: "Please confirm your agreement to the collaboration terms before proceeding.",
    }),
});
