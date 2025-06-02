import React from "react";
import { redirect } from "next/navigation"; // For redirection in Next.js
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getUserEmail, getInfluencer } from "@/lib/actions/influencer.actions";
// import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Dashboard = async () => {
  const { isAuthenticated, getUser, getPermissions } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();

  // Redirect if not authenticated
  if (!isUserAuthenticated) {
    redirect("/"); // Redirects to the landing page
    return null; // Ensure nothing is rendered
  }

  const user = await getUser();
  const permissions = await getPermissions();
  const userEmail = String(user?.email);

  // Role-based redirection
  if (permissions?.permissions?.includes("influencers")) {
    // is already registered
    const userDetails = await getUserEmail(userEmail); // Check if the email exists in your database
    const { email } = userDetails;
    if (email) {
      const influencerDetails = await getInfluencer(`${userDetails.$id}`);
      const { social_media_url, dataConsent, contentusageConsent } =
        influencerDetails;
      if (social_media_url && dataConsent && contentusageConsent) {
        //checking if he/she has already filled the required info
        redirect(`/influencers/${userDetails.$id}/explore-offers`); // Replace "/home" with your desired route
        return null;
      }
    }
    //if not registered
    redirect("/influencer-registration"); // Redirect to the registration page if not registered
    return null;
  } 
  else if (permissions?.permissions?.includes("hotels")) {
    redirect("/hotel-registration"); // Redirect to the Hotels Dashboard
    return null;
  }
  // else if (permissions?.permissions?.includes("influencers") && if he/she has already registered on appwrite db) {
  //   redirect("/explore-offers"); // Redirect to the Hotels Dashboard
  //   return null;
  // }

  return (
    <div>
      <h1>Welcome, {user?.given_name || "User"}</h1>
      <h2>Your Permissions:</h2>
      <ul>
        {permissions?.permissions?.map((permission, index) => (
          <li key={index}>{permission}</li>
        ))}
      </ul>
      <LogoutLink>Log out</LogoutLink>
    </div>
  );
};

export default Dashboard;
