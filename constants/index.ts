export const GenderOptions = ["Male", "Female", "Other"];
export const Platform = ["Instagram", "Other"];
export const ageRange = ["13-17", "18-24", "25-34", "35-44", "45-54"]
export const IdentificationTypes = [
    "Government ID Proof",
    "Driver's License",
    "PAN Card",
  ];

export const InfluencerFormDefaultValues= {
  gender: "Male" as Gender,
  platform: "Instagram" as Platform,
  insights: "",
  followers: 0,
  social_media_url: "",
  identificationType: "Government ID Proof",
  identificationNumber: "",
  identificationDocument: [],
  dataConsent: false,
  contentusageConsent: false,
}
