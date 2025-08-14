"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, X } from "lucide-react";

export default function ServerSearch({ onSearch }: { onSearch: (ip: string) => void }) {

    const [ip, setIp] = useState("");
    const [showResults, setShowResults] = useState(false);

    function clear() {
        setIp("");
        setShowResults(false);
    }
    // Handle form submit and emit the trimmed value up to the page
    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!ip.trim()) return;        // don’t show the card on empty input
        setShowResults(true);
        onSearch(ip);
    }

    return (
        <div className="w-full flex flex-col items-center">
            <div className="relative w-full max-w-3xl">
                {/* Search bar + button */}
                <form onSubmit={onSubmit} className="mb-10 flex flex-col items-center gap-3 w-full">
                    <div className="relative w-full max-w-3xl">
                        <Input
                            value={ip}
                            onChange={(e) => {
                                const value = e.target.value;
                                setIp(value);
                                if (!value.trim()) setShowResults(false);
                            }}
                            placeholder="Server IP (e.g., hypixel.net or 192.168.1.1:25565)"
                            className="h-12 w-full max-w-3xl rounded-full bg-charcoal/10 backdrop-blur placeholder:text-black/55 border-4 border-charcoal/80 text-gray-200"
                        />

                        {/* Clear (X) button */}
                        {ip && (
                            <Button
                                type="button"
                                onClick={clear}
                                aria-label="Clear search"
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full active:scale-95 transition cursor-pointer bg-transparent hover:bg-charcoal/20 focus:outline-none focus:ring-2 focus:ring-charcoal/80 focus:ring-offset-2"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="h-12 w-40 mt-5 rounded-full hover:bg-black cursor-pointer"
                    >
                        <Search className="mr-1 h-4 w-4" />
                        Search
                    </Button>
                </form>
            </div>
        </div>
    );
}