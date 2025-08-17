"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, X } from "lucide-react";

function isValidMinecraftAddress(input: string): boolean {
    const value = input.trim();

    if (!value) return false;
    if (value.includes(" ")) return false; // no spaces
    if (value.includes("[") || value.includes("]")) return false; // keep it simple: no IPv6 for now

    // Split into host[:port]
    const parts = value.split(":");
    if (parts.length > 2) return false;

    const host = parts[0];
    const portStr = parts[1];

    // Validate optional port (1..65535)
    if (portStr !== undefined) {
        if (!/^\d{1,5}$/.test(portStr)) return false;
        const port = Number(portStr);
        if (port < 1 || port > 65535) return false;
    }

    // IPv4 validation (0-255 each octet)
    const ipv4Octet = "(25[0-5]|2[0-4]\\d|1?\\d?\\d)";
    const ipv4Regex = new RegExp(
        `^${ipv4Octet}\\.${ipv4Octet}\\.${ipv4Octet}\\.${ipv4Octet}$`
    );

    // Domain validation: labels 1-63 chars, letters/digits/hyphens, no leading/trailing hyphen, TLD 2-63 letters
    const domainRegex = /^(?=.{1,253}$)(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,63}$/;

    // Accept either a valid IPv4 or a valid domain
    if (ipv4Regex.test(host)) return true;
    if (domainRegex.test(host)) return true;

    return false;
}

export default function ServerSearch({ onSearch }: { onSearch: (ip: string) => void }) {

    const [ip, setIp] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function clear() {
        setIp("");
        setShowResults(false);
        setError(null);
    }

    // Validate the IP address before submitting
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setIp(value);

        // Live validation: show/hide error and hide results when cleared/invalid
        if (!value.trim()) {
            setError(null);
            setShowResults(false);
            return;
        }
        if (isValidMinecraftAddress(value)) {
            setError(null);
        } else {
            setError("Enter a valid server address (domain or IPv4).");
            setShowResults(false);
        }
    }

    // Handle form submit and emit the trimmed value up to the page
    function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const ok = isValidMinecraftAddress(ip);

        if (!ok) {
            setError("Enter a valid server address (domain or IPv4).");
            setShowResults(false);
            return;
        }

        setError(null);
        setShowResults(true);
        onSearch(ip.trim());
    }

    return (
        <div className="w-full flex flex-col items-center">
            <div className="relative w-full max-w-3xl">
                {/* Search bar + button */}
                <form onSubmit={onSubmit} className="mb-10 flex flex-col items-center gap-3 w-full">
                    <div className="relative w-full max-w-3xl">
                        <Input
                            value={ip}
                            onChange={handleChange}
                            placeholder="Server IP (e.g., hypixel.net or 192.168.1.1:25565)"
                            aria-invalid={!!error}
                            aria-describedby={error ? "ip-error" : undefined}
                            className={["h-12 w-full max-w-3xl rounded-full", "bg-charcoal/10 backdrop-blur placeholder:text-black/55 text-gray-200", "border-4", error ? "border-red-500" : "border-charcoal/80",].join(" ")}
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

                    {/* Inline error */}
                    {error && (
                        <div id="ip-error" className="w-full max-w-3xl text-red-400 text-sm -mt-2">
                            {error}
                        </div>
                    )}

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
