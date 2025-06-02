"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { InfluencerFormValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import {
  createUser,
  getUserEmail,
  registerInfluencer,
  // registerInfluencer,
} from "@/lib/actions/influencer.actions";
import { FormFieldType } from "./InfluencerForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  GenderOptions,
  IdentificationTypes,
  InfluencerFormDefaultValues,
  Platform,
  ageRange,
} from "@/constants";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import FileUploader from "../FileUploader";
import { getInfluencer } from "@/lib/actions/influencer.actions";

const RegisterForm = ({ user }: { user: Influencer }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Destructure user data
  const { name, email, phone } = user;

  // Define the form and default values
  const form = useForm<z.infer<typeof InfluencerFormValidation>>({
    resolver: zodResolver(InfluencerFormValidation),
    defaultValues: {
      ...InfluencerFormDefaultValues,
    },
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await getUserEmail(user.email); // Check if the email exists in your database
        // const { id } = userDetails;
        const influencerDetails = await getInfluencer(`${userDetails.$id}`);
        const { social_media_url, dataConsent, contentusageConsent } = influencerDetails;
        // console.log(userDetails)
        // console.log(influencerDetails)

        if(social_media_url && dataConsent && contentusageConsent){
          router.push(`/influencers/${userDetails.$id}/explore-offers`); // Replace "/home" with your desired route
          return;
        }

      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUserDetails();
  }, []);

  

  async function onSubmit(values: z.infer<typeof InfluencerFormValidation>) {
    console.log("Form submitted with values:", values);
    setIsLoading(true);
    
    let formData;
    
    if (
      values.identificationDocument &&
      values.identificationDocument.length > 0
    ) {
      const blobFile = new Blob([values.identificationDocument[0]], {
        type: values.identificationDocument[0].type,
      });
      
      formData = new FormData();
      formData.append("blobFile", blobFile);
      formData.append("fileName", values.identificationDocument[0].name);
    }

    try {
      const influencerData = {
        ...values,
        userId: user.$id,
        name: name,
        email: email,
        phone: phone,
        identificationDocument: formData,
      };

      // @ts-ignore
      const influencer = await registerInfluencer(influencerData);
      console.log("Influencer registration response:", influencer);
      if (influencer) {
        console.log("Navigation to explore offers page");
        router.push(`/influencers/${user.$id}/explore-offers`);
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
        className="space-y-10 flex-1"
      >
        <section className="space-y-4">
          <h1 className="header">Welcome,</h1>
          <p className="text-gray-700">Let's complete your profile</p>
        </section>
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Additional Details</h2>
            <div className="text-14-regular">
              &#40;NOTE: Currently we only support Instagram&#41;
            </div>
          </div>
        </section>

        <div className="flex flex-col gap-6">
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
        </div>
        <div className="flex flex-col gap-6">
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
          {/* //validation of link */}
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="social_media_url"
            label="Your Profile URL (Instagram / Facebook)"
            placeholder="https://instagram.com/johncena"
          />
        </div>
        <div className="flex gap-6">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="niche"
            label="Preffered Niche/Category"
            placeholder="Travel, Fitness, etc"
          />
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={form.control}
            name="insights"
            label="Insights (Your Followers Age Range)"
            placeholder="Select"
          >
            {ageRange.map((option) => (
              <SelectItem key={option} value={option}>
                <div className="flex cursor-pointer items-center gap-2">
                  <p>{option}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>
        </div>
        <div>
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="previousCollaborations"
            label="Previous Collaborations (If any)"
            placeholder="Brand Name"
          />
        </div>
        <section className="space-y-6">
          <div className="mb-2 space-y-1">
            <h2 className="sub-header">Identification and Verification</h2>
            <div className="text-14-regular">
              &#40;NOTE: Verification are done manually on our website&#41;
            </div>
          </div>
        </section>
        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="identificationType"
          label="Identification Type"
          placeholder="Select"
        >
          {IdentificationTypes.map((option) => (
            <SelectItem key={option} value={option}>
              <div className="flex cursor-pointer items-center gap-2">
                <p>{option}</p>
              </div>
            </SelectItem>
          ))}
        </CustomFormField>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="identificationNumber"
          label="Identification Number"
          placeholder="1234 1234 1234"
        />
        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="identificationDocument"
          label="Scanned copy of identification Document"
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>
        </section>
        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="dataConsent"
          label="I consent to the collection and use of my data as described in the Privacy Policy."
        />
        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="contentusageConsent"
          label="I authorize the platform to showcase my submitted content for promotional purposes in accordance with the Terms of Service."
        />
        <SubmitButton isLoading={isLoading}>Finish</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
