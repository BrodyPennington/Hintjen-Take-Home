import { mcResponse } from "./types";

const BASE = "https://api.mcsrvstat.us/3/";

export async function getServerStatus(address: string): Promise<mcResponse> {
    const url = BASE + encodeURIComponent(address.trim());
    const res = await fetch(url, {
        next: { revalidate: 60 },
    });

    if (!res.ok) {
        throw new Error(`Lookup failed (${res.status})`);
    }
    return res.json();
}