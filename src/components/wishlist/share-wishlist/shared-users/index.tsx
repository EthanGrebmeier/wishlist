import { getSharedUsers } from "~/lib/wishlist/getSharedUsers";
import SharedUserItem from "./shared-user-item";

type SharedUsersProps = {
  wishlistId: string;
};

const SharedUsers = async ({ wishlistId }: SharedUsersProps) => {
  const sharedUsers = await getSharedUsers({ wishlistId });
  return (
    <div className="spacing-y-2">
      <h2 className="text-lg font-medium"> Currently Shared With: </h2>
      <div className="flex flex-wrap gap-2">
        {sharedUsers.length ? (
          sharedUsers.map((user) => (
            <SharedUserItem wishlistId={wishlistId} user={user} key={user.id} />
          ))
        ) : (
          <p className="py-2"> Nobody yet...</p>
        )}
      </div>
    </div>
  );
};

export default SharedUsers;
