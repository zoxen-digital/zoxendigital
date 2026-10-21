import type { Metadata } from "next";

// Private client onboarding form and admin dashboard: keep out of search results.
export const metadata: Metadata = {
  title: "Client Onboarding",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
