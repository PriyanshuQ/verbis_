export const GenderOptions = ["Male", "Female", "Other"];
export const Platform = ["Instagram", "Other"];
export const ageRange = ["13-17", "18-24", "25-34", "35-44", "45-54"];
export const IdentificationTypes = [
  "Government_ID_Proof",
  "Driving_License",
  "PAN",
];

export const InfluencerFormDefaultValues = {
  // name: "",
  // email: "",
  // phone: "",
  gender: "Male" as GenderOptions,
  platform: "Instagram" as Platform,
  niche: "",
  insights: "25-34" as ageRange,
  followers: 0,
  social_media_url: "",
  identificationType: "Government_ID_Proof" as IdentificationTypes,
  identificationNumber: "",
  identificationDocument: [],
  dataConsent: false,
  contentusageConsent: false,
  verified: false,
  previousCollaborations: undefined,
};

export const HotelFormDefaultValues = {
  address: "", // Default to an empty string
  city: "", // Default to an empty string
  state: "", // Default to an empty string
  pincode: "", // Default to an empty string
  locationurl: "", // Default to an empty string
  starrating: 0, // Default to an empty string (validated as a number later)
  whatsappcontactnumber: "", // Default to an empty string
  image1: [], // Default to an empty array
  image2: [], // Default to an empty array
  image3: [], // Default to an empty array
  contentusageConsent: false, // Default to false
  collaborationagreementConsent: false,
};
