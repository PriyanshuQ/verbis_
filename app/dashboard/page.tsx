import React from "react";
import { redirect } from "next/navigation"; // For redirection in Next.js
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

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

  // Role-based redirection
  if (permissions?.permissions?.includes("influencers")) {
    redirect("/explore-offers"); // Redirect to the Hotels page
    return null;
  } else if (permissions?.permissions?.includes("hotels")) {
    redirect("/manage-bookings"); // Redirect to the Hotels Dashboard
    return null;
  }

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