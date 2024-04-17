import type { User } from "~/types/user";
import SharedUserItem from "./shared-user-item";

type SharedUsersProps = {
  wishlistId: string;
  userId: string;
  sharedUsers: User[];
};

const SharedUsers = ({ wishlistId, userId, sharedUsers }: SharedUsersProps) => {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-medium"> Currently Shared With </h2>
      <div className="flex flex-wrap gap-2">
        {sharedUsers.length ? (
          sharedUsers
            .sort((a) => (a.id === "userId" ? 1 : -1))
            .map((sharedUser) => (
              <SharedUserItem
                userId={userId}
                wishlistId={wishlistId}
                sharedUser={sharedUser}
                key={sharedUser.id}
              />
            ))
        ) : (
          <p className="py-2"> Nobody yet...</p>
        )}
      </div>
    </div>
  );
};

export default SharedUsers;
