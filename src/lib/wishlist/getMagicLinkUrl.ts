import { env } from "process";

export const getMagicLinkUrl = (magicLinkId: string) => {
  const magicLinkBase = window.location.origin;

  return `https://${magicLinkBase}/wishlist/join/${magicLinkId}`;
};
