import type { User } from "~/types/user";
import SharedUserItem from "./shared-user-item";

type SharedUsersProps = {
  wishlistId: string;
  userId: string;
  sharedUsers: User[];
  isEditor: boolean;
};

const SharedUsers = ({
  wishlistId,
  userId,
  sharedUsers,
  isEditor,
}: SharedUsersProps) => {
  return (
    <div className="space-y-2">
      <h2 className="text-lg font-medium"> Currently Shared With </h2>
      <div className="grid max-h-[280px] w-full gap-2 overflow-y-auto border-b-2 border-b-black pb-6">
        {sharedUsers.length ? (
          sharedUsers
            .sort((a) => (a.id === "userId" ? 1 : -1))
            .map((sharedUser) => (
              <SharedUserItem
                isEditor={isEditor}
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
