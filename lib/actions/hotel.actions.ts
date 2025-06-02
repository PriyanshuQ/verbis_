"use server";
import { ID, Query } from "node-appwrite";
import {
  BUCKET_ID,
  HOTELIMG_ID,
  DATABASE_ID,
  ENDPOINT,
  HOTEL_COLLECTION_ID,
  PROJECT_ID,
  databases,
  storage,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";

export const createHotel = async (hotel: CreateHotelParams) => {
  try {
    const newHotel = await users.create(
      ID.unique(),
      hotel.hotelemail,
      hotel.contactnumber,
      undefined,
      hotel.hotelname
    );

    console.log("Hotel created successfully:", newHotel);
    return newHotel; // Ensure this is returned
  } catch (error: any) {
    console.error("Error during hotel creation:", error);

    if (error && error?.code === 409) {
      const documents = await users.list([
        Query.equal("hotelemail", [hotel.hotelemail]),
      ]);
      if (documents?.users?.length) {
        console.log("Hotel already exists:", documents?.users[0]);
        return documents?.users[0];
      }
    }
    throw error; // Rethrow error for further handling
  }
};

export const registerHotel = async ({
  image1,
  image2,
  image3,
  ...hotel
}: RegisterHotelParams) => {
  try {
    console.log("Starting hotel registration");

    let file1, file2, file3;

    if (image1) {
      const inputFile1 = InputFile.fromBuffer(
        image1?.get("blobFile1") as Blob,
        image1?.get("fileName1") as string
      );
      file1 = await storage.createFile(HOTELIMG_ID!, ID.unique(), inputFile1);
    }

    if (image2) {
      const inputFile2 = InputFile.fromBuffer(
        image2?.get("blobFile2") as Blob,
        image2?.get("fileName2") as string
      );
      file2 = await storage.createFile(HOTELIMG_ID!, ID.unique(), inputFile2);
    }

    if (image3) {
      const inputFile3 = InputFile.fromBuffer(
        image3?.get("blobFile3") as Blob,
        image3?.get("fileName3") as string
      );
      file3 = await storage.createFile(HOTELIMG_ID!, ID.unique(), inputFile3);
    }

    const payload = {
      image1url: file1?.$id
        ? `${ENDPOINT}/storage/buckets/${HOTELIMG_ID}/files/${file1.$id}/view?project=${PROJECT_ID}`
        : null,
      image2url: file2?.$id
        ? `${ENDPOINT}/storage/buckets/${HOTELIMG_ID}/files/${file2.$id}/view?project=${PROJECT_ID}`
        : null,
      image3url: file3?.$id
        ? `${ENDPOINT}/storage/buckets/${HOTELIMG_ID}/files/${file3.$id}/view?project=${PROJECT_ID}`
        : null,
      ...hotel,
    };

    console.log("Payload for createDocument:", payload);

    const newHotel = await databases.createDocument(
      DATABASE_ID!,
      HOTEL_COLLECTION_ID!,
      ID.unique(),
      payload
    );

    return parseStringify(newHotel);
  } catch (error) {
    console.error("Error in registerHotel:", error);
    throw error; // Ensure the error is propagated for debugging
  }
};

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

export const getHotel = async (userId: string) => {
  try {
    const hotels = await databases.listDocuments(
      DATABASE_ID!,
      HOTEL_COLLECTION_ID!,
      [Query.equal("hotelId", userId)]
    );
    return parseStringify(hotels.documents[0]);
  } catch (error) {
    console.log(error);
  }
};
