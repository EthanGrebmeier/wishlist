import { env } from "process";

export const getMagicLinkUrl = (magicLinkId: string) => {
  const magicLinkBase = env.VERCEL_PROJECT_PRODUCTION_URL
    ? "www.fillaneed.xyz"
    : "localhost:3000";

  return `https://${magicLinkBase}/wishlist/join/${magicLinkId}`;
};
