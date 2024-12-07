export const GenderOptions = ["Male", "Female", "Other"];
export const Platform = ["Instagram", "Other"];
export const ageRange = ["13-17", "18-24", "25-34", "35-44", "45-54"]
export const IdentificationTypes = [
    "Government_ID_Proof",
    "Driving_License",
    "PAN",
  ];

export const InfluencerFormDefaultValues= {
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
}
