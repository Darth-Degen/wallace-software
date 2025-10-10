import Head from "next/head";

type SeoHeadProps = {
  title?: string;
  description?: string;
  url?: string; // full page URL
  image?: string; // path from root
  twitter?: string;
};

// TODO: Replace with your actual root domain
const rootDomain = "https://wallace.software";

export default function SeoHead({
  title = "Wallace Software | React & Next.js Frontend Engineer",
  description = "Building fast, accessible web apps with React, Next.js, and Tailwind. Explore projects, skills, and contact.",
  url = rootDomain,
  image = "/meta.png",
  twitter = "darthdegen",
}: SeoHeadProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={`@${twitter}`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${rootDomain}${image}`} />
      <meta property="twitter:url" content={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${rootDomain}${image}`} />
    </Head>
  );
}
