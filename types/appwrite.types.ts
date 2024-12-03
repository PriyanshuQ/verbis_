import { Models } from "node-appwrite";

// Influencer Interface
export interface Influencer extends Models.Document {
  influencerId: string;
  name: string;
  email: string;
  phone: string;
  gender: Gender;
  socialMediaPlatform: Platform[]; // Multiple platforms allowed
  socialMediaHandle: string; // Username or handle
  followerCount: number; // Number of followers
  engagementRate: number; // Engagement rate as a percentage
  identificationType: GovtId[]; // e.g., Passport, Driver's License
  identificationNumber: string | undefined; // The actual ID number
  identificationDocument: FormData | undefined; // Uploaded ID proof
  privacyConsent: boolean; // Has the influencer consented to privacy terms?
  previousCollaborations: string | undefined; // Details of prior partnerships
}

// Booking Interface
export interface Booking extends Models.Document {
    bookingId: string; // Unique booking identifier
    influencerId: string; // Influencer making the booking
    hotelId: string; // Hotel being booked
    offerId: string; // Specific offer being used
    checkInDate: Date; // Start of the stay
    checkOutDate: Date; // End of the stay
    status: BookingStatus; // Current booking status
    specialRequests: string | undefined; // Optional requests by influencer
    createdAt: Date; // Timestamp for when the booking was created
    updatedAt: Date | null; // Timestamp for the last update
  }

// Hotel Interface
export interface Hotel extends Models.Document {
  hotelId: string;
  name: string;
  location: string; // City, state, or other descriptive location
  amenities: string[]; // List of amenities (e.g., Pool, Free Wi-Fi)
  contactEmail: string; // Hotel's email
  contactPhone: string; // Hotel's phone number
  rating: number; // Hotel rating out of 5
  offers: HotelOffer[]; // List of promotional offers
  images: string[]; // Array of URLs for hotel images
}

// Hotel Offer Interface
export interface HotelOffer {
  offerId: string; // Unique identifier for the offer
  description: string; // Description of the offer
  actualOfferPrice: number; // Actual value of the offer in currency
  minimumFollowers: number; // Required follower count for eligibility
  additionalRequirements: string | undefined; // e.g., social post requirements
}

// Influencer Search Parameters
export interface InfluencerSearchParams {
  platform?: Platform; // Filter by social media platform
  minimumFollowerCount?: number; // Filter by follower count
  engagementRate?: number; // Filter by engagement rate
  location?: string; // Filter by influencer's location
}

// // Hotel Search Parameters
export interface HotelSearchParams {
  location: string; // Desired location for the hotel
  minimumRating?: number; // Minimum rating required
  amenities?: string[]; // Required amenities (e.g., Pool, Wi-Fi)
  minimumFollowers?: number; // Minimum follower count required for offers
}
