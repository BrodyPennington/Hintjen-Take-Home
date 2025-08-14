"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { getServerStatus } from "@/lib/minecraft-api";
import type { mcResponse } from "@/lib/types";


// Renders server details for the provided IP/hostname
export default function ServerInfo({ ip }: { ip: string }) {
    const [data, setData] = useState<mcResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState<string | null>(null);

    // Fetch on mount and whenever 'ip' changes
    useEffect(() => {
        let cancelled = false;
        (async () => {
            setLoading(true); // Start loading
            setErr(null); // reset error
            try {
                const res = await getServerStatus(ip);  // Call API helper
                if (!cancelled) setData(res);
            } catch (e: any) {
                if (!cancelled) {
                    setErr(e?.message ?? "Failed to fetch server status"); // Save error message
                    setData(null);  // Clear data on error
                }
            } finally {
                if (!cancelled) setLoading(false); // Stop loading
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [ip]);

    // Build a readable MOTD from available arrays
    const motdText = useMemo(() => {
        const lines =
            (data?.motd?.clean ?? data?.motd?.raw ?? []) as string[] | undefined;
        return Array.isArray(lines) ? lines.join(" ") : "";
    }, [data]);

    // Normalize version to a single string
    const versionText = useMemo(() => {
        const v = data?.version;
        return Array.isArray(v) ? v.join(", ") : (v ?? "Unknown");
    }, [data]);

    return (
        <Card className="w-full max-w-3xl bg-charcoal/10 shadow-lg backdrop-blur border-4 border-charcoal/80">
            <CardContent className="p-6">
                <div className="text-center text-lg p-4 font-semibold text-charcoal">
                    Results for: {ip}
                </div>

                {/* Loading and error states */}
                {loading && <p className="text-center text-sm opacity-80">Loading…</p>}
                {err && <p className="text-center text-sm text-red-400">{err}</p>}

                {/* If no data, show a message */}
                {!loading && !err && !data && (
                    <p className="text-center text-sm opacity-80">No data found for this server.</p>
                )}

                {/* If we have data, display it */}
                {!loading && !err && data && (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-[110px,1fr]">
                        {/* Server Logo */}
                        <div className="flex items-center justify-center justify-self-center">
                            {data.icon ? (
                                <img
                                    src={data.icon}
                                    alt="Server icon"
                                    className="w-24 h-24 items-center rounded-md border bg-charcoal/70 object-contain"
                                />
                            ) : (
                                <div className="flex items-center justify-center w-24 h-24 rounded-md border bg-charcoal/70 text-xs opacity-80">
                                    No icon
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="space-y-2 text-sm">
                            <div className="rounded-md bg-charcoal/80 p-3">
                                <div className="font-semibold text-lg underline">Server IP / Host</div>
                                <div className="opacity-90">
                                    {data.hostname ?? data.ip ?? "Unknown"}
                                    {data.port ? `:${data.port}` : ""}
                                    {motdText && <div className="mt-1 opacity-75 ">{motdText}</div>}
                                </div>
                            </div>

                            <div className="rounded-md bg-charcoal/80 p-3">
                                <div className="font-semibold text-lg underline">Player Count</div>
                                <div className="opacity-90">
                                    {data.players?.online ?? 0} / {data.players?.max ?? "?"}
                                </div>
                            </div>

                            <div className="rounded-md bg-charcoal/80 p-3">
                                <div className="font-semibold text-lg underline">Version</div>
                                <div className="opacity-90">{versionText}</div>
                            </div>

                            <div className="rounded-md bg-charcoal/80 p-3">
                                <div className="font-semibold text-lg underline">Status</div>
                                <div className={data.online ? "text-emerald-300" : "text-red-300"}>
                                    {data.online ? "Online" : "Offline"}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}