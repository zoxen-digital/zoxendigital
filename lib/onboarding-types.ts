export type SubmissionStatus = "New" | "In Progress" | "Done" | "On Hold";

export const STATUS_OPTIONS: SubmissionStatus[] = ["New", "In Progress", "Done", "On Hold"];

export type OnboardingSubmission = {
  _id?: string;
  package: string;
  addOns: string[];

  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  currentWebsite: string;
  socialMedia: string;
  industry: string;
  businessSize: string;

  mainGoal: string;
  targetAudience: string;

  logoStatus: string;
  designStyle: string;
  brandColors: string;
  inspirationWebsites: string;

  pagesNeeded: string[];

  homepageHeadline: string;
  businessDescription: string;
  servicesList: string;
  contactDetails: string;
  pricingDisplay: string;
  productPricingInfo: string;
  specialOffers: string;
  notes: string;

  logoUrl: string | null;
  attachmentUrls: string[];

  status: SubmissionStatus;
  assignedTo: string;
  domainConnected: boolean;
  targetMonth: string;
  createdAt: string;
};
