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
import { parseStringify } from "../utils";
import {InputFile} from "node-appwrite/file"


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

export const getUser = async(userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user)
  } catch (error) {
    console.log(error)
  }
}

export const getUserEmail = async(email: string) => {
  try {
    const usersList = await users.list(
      [Query.equal('email', email)]
    );
    if (usersList.total > 0) {
      const user = usersList.users[0]; // Get the first matched user
      return {
        id: user.$id, // Include the user's ID
        ...parseStringify(user), // Parse and return the rest of the user details
      };
    } else {
      return { message: 'User not found' }; // Handle no user found
    }
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
}

export const registerInfluencer = async ({identificationDocument, ...influencer }: RegisterInfluencerParams) => {
  try{
    console.log("123")
    let file;

    if(identificationDocument){
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get('blobFile') as Blob,
        identificationDocument?.get('fileName') as string,
      )

      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile)
    }
    const newInfluencer = await databases.createDocument(
      DATABASE_ID!,
      INFLUENCER_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id || null,
        identificationDocumentUrl: file?.$id
          ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
          : null,
          ...influencer
      }
    )
    return parseStringify(newInfluencer)
  } catch(error){
    console.log(error)
  }
}

export const getInfluencer = async(userId: string) => {
  try {
    const influencers = await databases.listDocuments(
      DATABASE_ID!,
      INFLUENCER_COLLECTION_ID!,
      [Query.equal('userId', userId)]
    );
    return parseStringify(influencers.documents[0]);
  } catch (error) {
    console.log(error)
  }
}

// export const createHotel = async (hotel: CreateHotelParams) => {
//   try {
//     const newHotel = await users.create(
//       ID.unique(),
//       hotel.hotelemail,
//       hotel.contactnumber,
//       undefined,
//       hotel.hotelname
//     );

//     console.log("Hotel created successfully:", newHotel);
//     return newHotel; // Ensure this is returned
//   } catch (error: any) {
//     console.error("Error during hotel creation:", error);

//     if (error && error?.code === 409) {
//       const documents = await users.list([Query.equal("hotelemail", [hotel.hotelemail])]);
//       if (documents?.users?.length) {
//         console.log("Hotel already exists:", documents?.users[0]);
//         return documents?.users[0];
//       }
//     }
//     throw error; // Rethrow error for further handling
//   }
// };