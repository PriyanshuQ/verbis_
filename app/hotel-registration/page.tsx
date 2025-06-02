"use client";
import InfluencerForm from "@/components/forms/InfluencerForm";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import HotelForm from "@/components/forms/HotelForm";
import { useRouter } from "next/navigation";

const Registration = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch("/api/user"); // Ensure this is the correct API endpoint
        if (response.ok) {
          const user = await response.json();
          setLoading(false); // User details fetched, stop loading
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
        router.push("/");
      }
    };

    fetchUserDetails();
  }, []);

  if (loading) {
    return null; // Prevent rendering the page while loading
  }

  return (
    <div lang="en">
      <div className="flex h-screen max-h-screen">
        <section className="remove-scrollbar container my-auto">
          <div className="sub-container max-w-[496px]">
            <div className="flex items-center">
              {/* Logo */}
              <Image
                src="/assets/icons/logo-full.png"
                height={50} // Adjust size to fit the layout
                width={50}
                alt="verbis_logo"
                className="rounded-lg" // Slightly rounded corners
              />
              {/* Divider Line */}
              <div className="h-[1.5rem] w-[1px] bg-gray-400 mx-2"></div>
              {/* Text */}
              <div className="font-semibold text-lg" translate="no">
                <span>verbis.</span>{" "}
                {/* Prevent this text from being translated */}
              </div>
            </div>
            <HotelForm />
            <div className="text-14-regular mt-20 flex justify-between">
              <p className="justify-items-end text-dark-600 xl:text-left">
                © 2024 verbis
              </p>
            </div>
          </div>
        </section>
        <Image
          src="/assets/images/onboarding-img.jpg"
          height={1000}
          width={1000}
          alt="hotel"
          className="side-img max-w-[50%]"
        />
      </div>
    </div>
  );
};

export default Registration;
