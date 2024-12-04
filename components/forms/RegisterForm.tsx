"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { UserFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions/influencer.actions";
import { FormFieldType } from "./InfluencerForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { GenderOptions, Platform } from "@/constants";
import { Label } from "../ui/label";

const RegisterForm = ({ user }: { user: Influencer }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Define the form and default values
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {},
  });

  // Fetch user details (email) from the API on mount and update form state
  // useEffect(() => {
  //   const fetchUserDetails = async () => {
  //     try {
  //       const response = await fetch("/api/user"); // Ensure this is the correct API endpoint
  //       if (response.ok) {
  //         const user = await response.json();
  //         // Update the form state directly with `reset`
  //         form.reset({
  //           name: user.given_name || "",
  //           email: user.email || "", // Set fallback values
  //           phone: "",
  //         });
  //       } else {
  //         console.error("Failed to fetch user details:", response.statusText);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user details:", error);
  //     }
  //   };

  //   fetchUserDetails();
  // }, [form]);

  // Define a submit handler

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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="space-y-4">
          <h1 className="header">Welcome,</h1>
          <p className="text-gray-700">Let's complete your profile</p>
        </section>
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Some More Information</h2>
          </div>
        </section>
        <div className="flex flex-col gap-6 ">
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="gender"
            label="Gender"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderOptions.map((option) => (
                    <div key={option} className="radio-group">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="platform"
            label="Social Media Platform"
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {Platform.map((option) => (
                    <div key={option} className="radio-group">
                      <RadioGroupItem value={option} id={option} />
                      <Label htmlFor={option} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="followers"
            label="Number of Followers"
            placeholder="50000"
            iconSrc="/assets/icons/users.svg"
            iconAlt="followers"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="niche"
            label="Preffered Niche/Category"
            placeholder="Travel, Fitness, etc"
          />
        </div>
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
