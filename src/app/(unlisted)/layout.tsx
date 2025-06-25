import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "CV | Daniel's Portfolio",
  description:
    "I am a web developer with extensive experience in front-end and full-stack development, working with agile teams across various industries. Recently, I have been involved in projects for major clients like Disney, LegalZoom, and Billet at Globant, where I focused on developing and maintaining web and mobile platforms. My expertise includes modern JavaScript frameworks such as React, React Native, Vue, and Next.js, along with TypeScript for scalable development. I have also worked with Remix and Next.js for server-side rendering and backend technologies like Express.\n\nMy workflow integrates agile methodologies using tools like Jira and Azure DevOps, and I have experience deploying and managing applications on AWS. I emphasize quality through unit and integration testing with Jest, Playwright, and React Testing Library. In previous roles, I led technical teams, created development roadmaps, and guided developers in learning paths. Additionally, I have worked with Shopify and WordPress development, handling direct client interactions to translate their needs into technical solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main>{children}</main>;
}
