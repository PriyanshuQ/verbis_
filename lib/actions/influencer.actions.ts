"use server"
import { ID, Query } from "node-appwrite";
import {
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  INFLUENCER_COLLECTION_ID,
  PROJECT_ID,
  databases,
  storage,
  users,
} from "../appwrite.config";

// export const createUser = async (user: CreateInfluencerParams) => {

export const createUser = async (user: CreateInfluencerParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    console.log("User created successfully:", newUser);
    return newUser; // Ensure this is returned
  } catch (error: any) {
    console.error("Error during user creation:", error);

    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal("email", [user.email])]);
      if (documents?.users?.length) {
        console.log("User already exists:", documents?.users[0]);
        return documents?.users[0];
      }
    }

    throw error; // Rethrow error for further handling
  }
};

//   try {
//     const newUser = await users.create(
//       ID.unique(),
//       user.email,
//       user.phone,
//       undefined,
//       user.name
//     );
//   } catch (error: any) {
//     if (error && error?.code == 409) {
//       const documents = await users.list([Query.equal("email", [user.email])]);
//       return documents?.users[0];
//     }
//   }
// };
