"use client";
import InfluencerForm from "@/components/forms/InfluencerForm";
import React, { useState } from "react";
import Image from "next/image";

const Registration = () => {
  return (
    <div lang="en">
      <div>
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
              <InfluencerForm />
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
    </div>
  );
};

export default Registration;
