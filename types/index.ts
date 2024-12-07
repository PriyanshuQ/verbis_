/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
  };
  
  declare type Gender = "Male" | "Female" | "Other";
  declare type Platform = "Instagram" | "Other" ;
  declare type BookingStatus = "pending" | "confirmed" | "cancelled";
  declare type GovtId = "Aadhaar" | "Driving Licence" | "PAN";
  
  declare interface CreateInfluencerParams {
    name: string;
    email: string;
    phone: string;
  }
  
  declare interface Influencer extends CreateInfluencerParams {
    $id: string;
  }
  
  declare interface RegisterInfluencerParams extends CreateInfluencerParams {
    influencerId: string;
    // birthDate: Date;
    gender: Gender;
    socialMediaPlatform: Platform[];
    socialMediaHandle: string;
    followerCount: number;
    engagementRate: number; // percentage
    // portfolioUrl: string | undefined;
    identificationType: GovtId[];
    identificationNumber: string | undefined;
    identificationDocument: FormData | undefined;
    privacyConsent: boolean;
    // address: string;
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
  