import { getServerAuthSession } from "~/server/auth";
import { type NextRequest, NextResponse } from "next/server";
import { getAllWishlists } from "~/lib/wishlist/getWishlist";

export async function GET(request: NextRequest) {
  const session = await getServerAuthSession();
  const editableOnly =
    request.nextUrl.searchParams.get("editableOnly") === "true";

  if (!session?.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const wishlists = await getAllWishlists({ editableOnly });

    return NextResponse.json(wishlists);
  } catch (error) {
    console.error("Error fetching wishlists:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
