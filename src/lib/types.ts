export interface mcMotd {
    raw?: string[];    // ["line1", "line2"]
    clean?: string[];  // same as raw but stripped
    html?: string[];   // HTML-formatted
}

export interface mcPlayers {
    online?: number;
    max?: number;
}

export interface mcResponse {
    online: boolean;
    ip?: string;
    port?: number;
    hostname?: string;           // e.g. hypixel.net
    motd?: mcMotd;
    players?: mcPlayers;
    version?: string | string[]; // sometimes array
    icon?: string;               // data:image/png;base64,...
    // ...many more possible fields; we only use a few
}

