/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
  };
  
  declare type GenderOptions = "Male" | "Female" | "Other";
  declare type ageRange = "13-17"| "18-24"| "25-34"| "35-44"| "45-54"
  declare type Platform = "Instagram" | "Other" ;
  declare type BookingStatus = "pending" | "confirmed" | "cancelled";
  declare type IdentificationTypes = "Government_ID_Proof" | "Driving_Licence" | "PAN";
  
  declare interface CreateInfluencerParams {
    name: string;
    email: string;
    phone: string;
  }
  
  declare interface Influencer extends CreateInfluencerParams {
    $id: string;
  }
  
  declare interface RegisterInfluencerParams extends CreateInfluencerParams {
    userId: string;
    gender: GenderOptions;
    platform: Platform;
    insights: ageRange; // percentage
    followers: number;
    social_media_url: string;
    niche: string | undefined;
    identificationType: IdentificationTypes;
    identificationNumber: string | undefined;
    identificationDocument: FormData | undefined;
    dataConsent: boolean;
    contentusageConsent: boolean;
    verified: boolean;
    previousCollaborations: string | undefined;
    // mediaKit: FormData | undefined; // optional file upload for a media kit
  }
  
  declare interface HotelDetails {
    hotelId: string;
    name: string;
    location: string;
    amenities: string[];
    contactEmail: string;
    contactPhone: string;
    rating: number; // e.g., 4.5 out of 5
    offers: HotelOffer[]; // List of offers provided by the hotel
  }
  
  declare interface HotelOffer {
    offerId: string;
    description: string; // e.g., "Free 2-night stay and complimentary meals"
    actualofferPrice: number; // The actual price/value of the offer (in the hotel's local currency)
    minimumFollowers: number; // Minimum followers required for eligibility
    additionalRequirements: string | undefined; // e.g., "At least 3 Instagram posts and 2 stories"
  }
  
  declare type CreateHotelBookingParams = {
    influencerId: string;
    hotelId: string;
    offerId: string; // Connect the booking to a specific hotel offer
    checkInDate: Date;
    checkOutDate: Date;
    status: BookingStatus;
    specialRequests: string | undefined; // optional notes from the influencer
  };
  
  declare type UpdateHotelBookingParams = {
    bookingId: string;
    influencerId: string;
    hotelId: string;
    status: BookingStatus;
    note: string | undefined;
  };
  
  declare interface Booking extends CreateHotelBookingParams {
    $id: string;
    createdAt: Date;
  }
  
  declare type InfluencerSearchParams = {
    platform?: Platform;
    minimumFollowerCount?: number;
    engagementRate?: number;
    location?: string;
  };
  
  declare type HotelSearchParams = {
    location: string;
    minimumRating?: number;
    amenities?: string[];
    minimumFollowers?: number; // Find hotels that accept influencers with a specific follower count
  };
  