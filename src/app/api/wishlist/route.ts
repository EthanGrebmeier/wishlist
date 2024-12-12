import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { wishlists } from "~/server/db/schema/wishlist";

export async function GET() {
  const session = await getServerAuthSession();

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const userWishlists = await db.query.wishlists.findMany({
      where: eq(wishlists.createdById, session.user.id),
    });

    return NextResponse.json(userWishlists);
  } catch (error) {
    console.error("Error fetching wishlists:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
