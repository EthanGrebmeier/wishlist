import * as React from "react";
import {
  Body,
  Container,
  Font,
  Head,
  Html,
  Img,
  Link,
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
      </Head>
      <Tailwind>
        <Body className="mx-auto max-w-[480px] rounded-md border-2 border-solid border-black px-4 py-12 font-sans">
          <Container className="mx-auto my-0">
            <Section>
              <Img
                src={`https://www.fillaneed.xyz/images/logo.png`}
                width="120"
                height="33"
                alt="Fillaneed"
                className="mx-auto my-0"
              />
            </Section>
            <Section className="mt-12">
              <Text
                style={{
                  fontFamily: "Junicode",
                }}
                className=" text-2xl"
              >
                Hey there {toUser.name},
              </Text>
              <Text className="my-4 font-sans text-xl">
                <strong> {fromUser.name} </strong> has invited you to join{" "}
                <strong> {wishlist.name} </strong> on Fillaneed!
              </Text>
            </Section>
            <Section className="mt-4">
              <Link
                className="overflow-hidden rounded-md border-2 border-solid border-black bg-green-200 px-4 py-2 font-sans font-semibold text-black"
                href={`https://www.fillaneed.xyz${url}`}
              >
                Accept Invitation
              </Link>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default InviteEmail;
