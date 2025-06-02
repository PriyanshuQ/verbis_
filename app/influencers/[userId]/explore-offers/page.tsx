import React from "react";
import { getInfluencer } from "@/lib/actions/influencer.actions";
import { redirect } from "next/navigation"; // For redirection in Next.js
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import HotelCard from "@/components/HotelCard";

const Explore = async ({ params }: SearchParamProps) => {
  const { isAuthenticated, getUser, getPermissions } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();

  // Redirect if not authenticated
  if (!isUserAuthenticated) {
    redirect("/"); // Redirects to the landing page
    return null; // Ensure nothing is rendered
  }
  const { userId } = params; // No need to destructure `await` for params here
  const user = await getInfluencer(userId);

  return (
    <div>
      <HotelCard />
    </div>



    // <div>
    //   <h1>User Details</h1>
    //   {user ? (
    //     <ul>
    //       {Object.entries(user).map(([key, value]) => (
    //         <li key={key}>
    //           <strong>{key}:</strong> {JSON.stringify(value)}
    //         </li>
    //       ))}
    //     </ul>
    //   ) : (
    //     <p>No user data found.</p>
    //   )}
    // </div>
  );
};

export default Explore;
