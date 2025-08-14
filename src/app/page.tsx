"use client"

import React, { useState } from "react";
import ServerSearch from "@/components/ServerSearch";
import ServerInfo from "@/components/ServerInfo";

export default function Page() {

  const [searchedIP, setSearchedIP] = useState<string | null>(null);

  return (
    <main className="relative min-h-dvh w-full overflow-hidden">
      {/* Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 -z-10 w-full h-full object-cover"
      >
        <source src="./background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {/* Overlay */}
      <div className="absolute inset-0 -z-10 bg-black/25" />

      <div className="container mx-auto flex min-h-dvh max-w-5xl flex-col items-center px-4 py-16">
        {/* Title */}
        <h1 className="${minecraft.className} mb-10 text-center text-4xl font-semibold tracking-tight text-charcoal drop-shadow md:text-5xl">
          Minecraft Server Search
        </h1>

        {/* Search component */}
        <ServerSearch onSearch={(ip) => setSearchedIP(ip)} />
        {/* Results */}
        {searchedIP && <ServerInfo ip={searchedIP} />}


        {/* Footer blip */}
        <div className="mt-auto" />
      </div>
    </main>
  );
}
