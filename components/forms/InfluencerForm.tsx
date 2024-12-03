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
import { createUser } from "@/lib/actions/influencer.actions";

export enum FormFieldType {
  INPUT = "input",
  TEXTAREA = "textarea",
  VIEW = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
}

// const InfluencerForm = () => {
//   const router = useRouter();
//   const [userEmail, setUserEmail] = useState<string>("");
//   const [userName, setUserName] = useState<string>("");
//   const [isLoading, setIsLoading] = useState(false);
  
//   // Define the form and default values
//   const form = useForm<z.infer<typeof UserFormValidation>>({
//     resolver: zodResolver(UserFormValidation),
//     defaultValues: {
//       name: "",
//       email: userEmail || "", // Set the email if available from the API, or empty string
//       phone: "",
//     },
//   });
  
//   // Fetch user details (email) from the API on mount
//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       try {
//         const response = await fetch("/api/user"); // Ensure this is the correct API endpoint
//         if (response.ok) {
//           const user = await response.json();
//           setUserName(user.given_name);
//           setUserEmail(user.email); // Set the email from the API response
//         } else {
//           console.error("Failed to fetch user details:", response.statusText);
//         }
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//       }
//     };

//     fetchUserDetails();
//   }, []);


//   // Define a submit handler
//   async function onSubmit({
//     name,
//     email,
//     phone,
//   }: z.infer<typeof UserFormValidation>) {
//     setIsLoading(true);

//     try {
//       const userData = { name, email, phone };
//       const user = await createUser(userData);
//       if (user) router.push(`/influencers/${user.$id}/register`);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
//         <section className="mb-12 space-y-4">
//           <h1 className="header">Hey there,</h1>
//           <p className="text-dark-700">Let's make your profile</p>
//         </section>

//         <CustomFormField
//           fieldType={FormFieldType.INPUT}
//           control={form.control}
//           name="username"
//           label="Full name"
//           placeholder={userName || "Fetching name..."}
//           iconSrc="/assets/icons/user.svg"
//           iconAlt="user"
//         />

//         {/* Email field will be pre-populated and locked */}
//         <CustomFormField
//           fieldType={FormFieldType.INPUT}
//           control={form.control}
//           name="email"
//           label="Email"
//           placeholder={userEmail || "Fetching email..."} // Placeholder while loading
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

//         <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
//       </form>
//     </Form>
//   );
// };

// export default InfluencerForm;


const InfluencerForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Define the form and default values
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "", // Always provide an initial value
      phone: "",
    },
  });

  // Fetch user details (email) from the API on mount and update form state
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("/api/user"); // Ensure this is the correct API endpoint
        if (response.ok) {
          const user = await response.json();
          // Update the form state directly with `reset`
          form.reset({
            name: user.given_name || "",
            email: user.email || "", // Set fallback values
            phone: "",
          });
        } else {
          console.error("Failed to fetch user details:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [form]);

  // Define a submit handler

  // const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
  //   setIsLoading(true);
  
  //   try {
  //     console.log("Form submission started. Submitted values:", values);
  
  //     const user = {
  //       name: values.name,
  //       email: values.email,
  //       phone: values.phone,
  //     };
  
  //     console.log("Prepared user data for API call:", user);
  
  //     // Call the createUser API
  //     const newUser = await createUser(user);
  
  //     if (newUser) {
  //       console.log("User created successfully. API response:", newUser);
  //       router.push(`/influencer/${newUser.$id}/register`);
  //     } else {
  //       console.error("User creation failed: No user returned from API.");
  //     }
  //   } catch (error) {
  //     console.error("Error occurred during user creation:", error);
  //     alert("Something went wrong while creating the user. Please try again.");
  //   } finally {
  //     setIsLoading(false);
  //     console.log("Form submission completed.");
  //   }
  // };
  

  // async function onSubmit({
  //   name,
  //   email,
  //   phone,
  // }: z.infer<typeof UserFormValidation>) {
  //   setIsLoading(true);

  //   try {
  //     const userData = { name, email, phone };
  //     const user = await createUser(userData);
  //     if (user) router.push(`/influencers/${user.$id}/register`);
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  async function onSubmit({
    name,
    email,
    phone,
  }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);
  
    console.log("Submitting form data:", { name, email, phone }); // Log form data
  
    try {
      const userData = { name, email, phone };
      const newUser = await createUser(userData);
  
      console.log("User created:", newUser); // Log API response
  
      if (newUser) {
        router.push(`/influencers/${newUser.$id}/register`);
      } else {
        console.error("User creation failed: No user returned");
      }
    } catch (error) {
      console.error("Error during user creation:", error);
    } finally {
      setIsLoading(false);
    }
  }
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hey there,</h1>
          <p className="text-dark-700">Let's make your profile</p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full name"
          placeholder="John Cena"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="cena@gmail.com"
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
