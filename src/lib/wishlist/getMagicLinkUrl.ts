export const getMagicLinkUrl = (magicLinkId: string) => {
  const magicLinkBase = window.location.origin
    .replace("https://", "")
    .replace("http://", "");

  return `${magicLinkBase}/wishlist/join/${magicLinkId}`;
};
