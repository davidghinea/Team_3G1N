"use client";

import Feed from "@/components/personal-components/feed";

export default function Home() {
  return (
    <div className="flex w-screen justify-center items-center bg-background">
      {/* Main feed area - flexible for sidebar */}
      <Feed />
    </div>
  );
}
