"use client";

import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { HotelRegistrationValidation } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { FormFieldType } from "./InfluencerForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  GenderOptions,
  IdentificationTypes,
  HotelFormDefaultValues,
  Platform,
  ageRange,
} from "@/constants";
import { Label } from "../ui/label";
import { SelectItem } from "../ui/select";
import FileUploader from "../FileUploader";
import { registerHotel, getUserEmail, getHotel } from "@/lib/actions/hotel.actions";
// // import { getInfluencer } from "@/lib/actions/influencer.actions";

const HotelRegistrationForm = ({ hotel }: { hotel: Hotel }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // Destructure user data
  // const { hotelname, hotelemail, contactnumber } = hotel;
  // console.log(hotel.$id)

  // @ts-ignore
  const hotelname = hotel.name
  // @ts-ignore
  const hotelemail = hotel.email
  // @ts-ignore
  const contactnumber = hotel.phone;

  // Define the form and default values
  const form = useForm<z.infer<typeof HotelRegistrationValidation>>({
    resolver: zodResolver(HotelRegistrationValidation),
    defaultValues: {
      ...HotelFormDefaultValues
    },
  });

    useEffect(() => {
      const fetchUserDetails = async () => {
        try {
          const userDetails = await getUserEmail(hotelemail); // Check if the email exists in your database
          // const { id } = userDetails;
          const hotelDetails = await getHotel(`${userDetails.$id}`);
          const { locationurl, collaborationagreementConsent, contentusageConsent } = hotelDetails;
          // console.log(userDetails)
          // console.log(influencerDetails)

          if(locationurl && collaborationagreementConsent && contentusageConsent){
            router.push(`/hotels/${userDetails.$id}/dashboard`); // Replace "/home" with your desired route
            return;
          }

        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };
      fetchUserDetails();
    }, []);



  async function onSubmit(values: z.infer<typeof HotelRegistrationValidation>) {
    // console.log("Form submitted with values:", values);
    setIsLoading(true);

    let formData;

    if (
      values.image1 && values.image1.length > 0 && values.image2 && values.image2.length > 0 && values.image3 && values.image3.length > 0
    ) {
      const blobFile1 = new Blob([values.image1[0]], {
        type: values.image1[0].type,
      });
      const blobFile2 = new Blob([values.image2[0]], {
        type: values.image2[0].type,
      });
      const blobFile3 = new Blob([values.image3[0]], {
        type: values.image3[0].type,
      });

      formData = new FormData();
      formData.append("blobFile1", blobFile1);
      formData.append("blobFile2", blobFile2);
      formData.append("blobFile3", blobFile3);
      formData.append("fileName1", values.image1[0].name);
      formData.append("fileName2", values.image2[0].name);
      formData.append("fileName3", values.image3[0].name);
    }

    try {
      const hotelData = {
        ...values,
        hotelId: hotel.$id,
        hotelname: hotelname,
        hotelemail: hotelemail,
        contactnumber: contactnumber,
        image1: formData,
        image2: formData,
        image3: formData,
      };

      // @ts-ignore
      const userhotel = await registerHotel(hotelData);
      console.log("Hotel registration response:", userhotel);
      if (userhotel) {
        console.log("Navigation to dashboard page");
        router.push(`/hotels/${hotel.$id}/dashboard`);
      }

    } catch (error) {
      console.error("Error during hotel creation:", error);
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
          <h1 className="header">Register Your Hotel,</h1>
          <p className="text-gray-700">Provide the necessary details to list your hotel on our platform.</p>
        </section>

        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Additional Information</h2>
            <div className="text-14-regular">
              &#40;NOTE: Currently, we only support Instagram Influencers&#41;
            </div>
          </div>
        </section>

        <div className="flex flex-col gap-6">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="address"
            label="Hotel Address"
            placeholder="Royal Heritage Hotel, 123 Dream Lane, MG Road, Jaipur 302001, Rajasthan"
            iconSrc="/assets/icons/location.svg"
            iconAlt="location"
          />
        </div>

        <div className="flex gap-6">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="city"
            label="City"
            placeholder="Jaipur"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="state"
            label="State"
            placeholder="Rajasthan"
          />
        </div>

        <div className="flex gap-6">
          <div className="basis-1/3">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="pincode"
              label="Pincode"
              placeholder="302001"
            />
          </div>
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="locationurl"
            label="Google Maps Link"
            placeholder="E.g., https://maps.app.goo.gl/xyz123"
          />
        </div>

        <div className="flex gap-6">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="starrating"
            label="Star Rating"
            placeholder="E.g., 5"
          />
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="whatsappcontactnumber"
            label="WhatsApp Contact Number (Optional)"
            placeholder="9988776655"
          />
        </div>

        <div className="flex flex-col gap-6">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="hotelwebsiteurl"
            label="Hotel Website URL (Optional)"
            placeholder="E.g., https://royalheritagehotel.com"
          />
        </div>

        <div className="flex flex-col gap-6">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="socialmediaurl"
            label="Social Media URL (Optional)"
            placeholder="E.g., https://instagram.com/royalheritagehotel"
          />
        </div>

        <CustomFormField
          fieldType={FormFieldType.SKELETON}
          control={form.control}
          name="image1"
          label="Upload Hotel Images"
          renderSkeleton={(field) => (
            <FormControl>
              <FileUploader files={field.value} onChange={field.onChange} />
            </FormControl>
          )}
        />

        <div className="flex gap-6">
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="image2"
            label=""
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          /><CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="image3"
            label=""
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader files={field.value} onChange={field.onChange} />
              </FormControl>
            )}
          />
        </div>


        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div>
        </section>
        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="collaborationagreementConsent"
          label="I agree to the Privacy Policy and consent to data collection and usage."
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

export default HotelRegistrationForm;
