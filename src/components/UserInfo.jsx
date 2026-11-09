"use client";
import { authClient } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const UserInfo = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignout = async () => {
    await authClient.signOut();
    router.refresh();
  };
  return (
    <div>
      {user ? (
        <div>
          <div className="flex flex-col items-center gap-2">
            <Avatar>
              <Avatar.Image
                alt="John Doe"
                src={user.image}
              />
            </Avatar>
            <h2>{user?.name}</h2>
            <button onClick={handleSignout} className="px-2 py-1 bg-red-500 text-white rounded-[10px]">সাইন আউট</button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Link
            href="/sign-in"
            className="text-[18px] rounded-lg px-3 py-2 font-medium text-gray-700 transition hover:bg-gray-100"
          >
            সাইন ইন
          </Link>

          <Link
            href="/sign-up"
            className="text-[18px] rounded-lg bg-green-600 px-4 py-2.5 font-semibold text-white shadow-md transition hover:bg-green-700"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
