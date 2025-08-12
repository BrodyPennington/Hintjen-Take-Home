"use client"

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

export default function Page() {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // no API wiring yet — just UI scaffold
  }

  return (
    <main className="relative min-h-dvh w-full overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 -z-10 bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url(/minecraftBG.png)" }}
      />
      {/* Subtle dark overlay for contrast */}
      <div className="absolute inset-0 -z-10 bg-black/35" />

      <div className="container mx-auto flex min-h-dvh max-w-5xl flex-col items-center px-4 py-16">
        {/* Title */}
        <h1 className="${minecraft.className} mb-10 text-center text-4xl font-semibold tracking-tight text-white drop-shadow md:text-5xl">
          Minecraft Server Search
        </h1>

        {/* Search bar + button */}
        <form
          onSubmit={onSubmit}
          className="mb-10 flex flex-col items-center gap-3 w-full"
        >
          <Input
            placeholder="Server IP (e.g., hypixel.net or 192.168.1.1:25565)"
            className="h-12 w-full max-w-3xl rounded-full bg-white/20 backdrop-blur placeholder:text-black/55"
          />
          <Button
            type="submit"
            className="h-12 w-40 mt-5 rounded-full hover:bg-black/40"
          >
            <Search className="mr-1 h-4 w-4" />
            Search
          </Button>
        </form>

        {/* Result placeholder card */}
        <Card className="w-full  max-w-3xl bg-white/20 shadow-lg backdrop-blur">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-[110px,1fr,1fr]">
              {/* Server Logo placeholder */}
              <div className="flex items-center justify-center w-30 h-30 justify-self-center rounded-md border bg-white/70 p-4 text-sm text-muted-foreground">
                <div className="text-center">
                  <div className="mb-1 font-medium">Server</div>
                  <div>Logo</div>
                </div>
              </div>

              {/* Server info left column */}
              <div className="space-y-2 text-sm">
                <div className="rounded-md bg-white/80 p-3">Server IP and MOTD</div>
                <div className="rounded-md bg-white/80 p-3">Player Count: #</div>
                <div className="rounded-md bg-white/80 p-3">Server Version</div>
                <div className="rounded-md bg-white/80 p-3">Online Status Indicator</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer blip */}
        <div className="mt-auto" />
      </div>
    </main>
  );
}
