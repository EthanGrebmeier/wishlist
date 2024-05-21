import * as React from "react";
import {
  Body,
  Container,
  Font,
  Head,
  Html,
  Img,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { Button } from "@react-email/components";
import type { Wishlist } from "~/types/wishlist";
import type { User } from "~/types/user";
import type { DefaultUser } from "next-auth";

type InviteEmailProps = {
  url: string;
  wishlist: Wishlist;
  toUser: User;
  fromUser: DefaultUser;
};

export function InviteEmail({
  url,
  wishlist,
  toUser,
  fromUser,
}: InviteEmailProps) {
  return (
    <Html lang="en">
      <Head>
        <title>{`You have been invited to join a wishlist: ${wishlist.name}`}</title>
        <Font
          fontFamily="Junicode"
          fallbackFontFamily="Times New Roman"
          webFont={{
            url: "https://www.fillaneed.xyz/fonts/junicode",
            format: "truetype",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Font
          fontFamily="Orbiter"
          fallbackFontFamily="Times New Roman"
          webFont={{
            url: "https://www.fillaneed.xyz/fonts/TASAOrbiterVF.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Tailwind>
        <Body className="mx-auto rounded-md border-2 border-solid border-black p-4">
          <Container className="mx-auto my-0 max-w-[480px]">
            <Section className="mt-8">
              <Img
                src={`https://www.fillaneed.xyz/logo.png`}
                width="120"
                height="33"
                alt="Vercel"
                className="mx-auto my-0"
              />
            </Section>
            <Text
              style={{
                fontFamily: "Junicode",
              }}
              className="text-3xl"
            >
              Hey there {toUser.name},
            </Text>
            <Text
              style={{
                fontFamily: "Orbiter",
              }}
              className="mt-8"
            >
              <strong> {fromUser.name} </strong> has invited you to join{" "}
              <strong> {wishlist.name} </strong> on Fillaneed!
            </Text>
            <Button
              className="mt-8 h-10 overflow-hidden rounded-md border-2 border-solid border-black bg-green-200 px-4 py-2 font-medium text-black"
              href={`https://www.fillaneed.xyz${url}`}
              style={{
                fontFamily: "Orbiter",
              }}
            >
              Accept Invitation
            </Button>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default InviteEmail;
