// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
// } from "@/components/ui/form";
// import CustomFormField from "../CustomFormField";

// export enum FormFieldType {
//   INPUT = 'input',
//   TEXTAREA = 'textarea',
//   PHONE_INPUT = 'phoneInput',
//   CHECKBOX = 'checkbox',
//   DATE_PICKER = 'datePicker',
//   SELECT = 'select',
//   SKELETON = 'skeleton',
// }

// const formSchema = z.object({
//   username: z.string().min(4, {
//     message: "Username must be at least 4 characters.",
//   }),
// });

// const InfluencerForm = () => {
//   // 1. Define form.
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       username: "",
//     },
//   });

//   // 2. Define a submit handler.
//   function onSubmit(values: z.infer<typeof formSchema>) {
//     // Do something with the form values.
//     // ✅ This will be type-safe and validated.
//     console.log(values);
//   }
//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
//         <section className="mb-12 space-y-4">
//           <h1 className="header">Hey there,</h1>
//           <p className="text-dark-700">Book your hotel with us</p>
//         </section>
//         <CustomFormField
//           fieldType={FormFieldType.INPUT}
//           control={form.control}
//           name="name"
//           label="Full name"
//           placeholder="John Doe"
//           iconSrc="/assets/icons/user.svg"
//           iconAlt="user"
//         />
//         {/* EMAIL */}
//         <CustomFormField
//           fieldType={FormFieldType.INPUT}
//           control={form.control}
//           name="email"
//           label="Email"
//           placeholder="JohnDoe@gmail.com"
//           iconSrc="/assets/icons/email.svg"
//           iconAlt="email"
//         />
//         <CustomFormField
//           fieldType={FormFieldType.PHONE_INPUT}
//           control={form.control}
//           name="phone"
//           label="Phone Number"
//           placeholder="0987654321"
//         />

//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//   );
// };

// export default InfluencerForm;

"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

const InfluencerForm = () => {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch user details (email) from the API on mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("/api/user"); // Ensure this is the correct API endpoint
        if (response.ok) {
          const user = await response.json();
          setUserEmail(user.email); // Set the email from the API response
        } else {
          console.error("Failed to fetch user details:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, []);

  // Define the form and default values
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: userEmail || "", // Set the email if available from the API, or empty string
      phone: "",
    },
  });

  // Define a submit handler
  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try {
      // const userData = { name, email, phone };

      // const user = await createUser(userData);
      // if (user) router.push(`/patients/${user.id}/register`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hey there,</h1>
          <p className="text-dark-700">Book your hotel with us</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="username"
          label="Full name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        {/* Email field will be pre-populated and locked */}
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder={userEmail || "Fetching email..."} // Placeholder while loading
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone Number"
          placeholder="0987654321"
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default InfluencerForm;
