import PostThreads from "@/components/forms/PostThreads";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user?.id);

  if (!userInfo?.onboarding) redirect("/onboarding");

  return (
    <>
      <h1 className="head-text">Create Threads</h1>
      <PostThreads userId={userInfo._id} />
    </>
  );
};

export default Page;
