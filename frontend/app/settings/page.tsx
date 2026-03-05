"use client";

import { Settings, ShieldCheck, Database, Key } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-24 text-left">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight">System Settings</h1>
                <p className="text-muted-foreground text-lg">
                    Manage your API keys, database connections, and agent preferences.
                </p>
            </div>

            <div className="p-12 rounded-[2rem] glass border-dashed border-white/10 flex flex-col items-center justify-center text-center gap-4 py-24">
                <div className="p-4 rounded-full bg-white/5 border border-white/10 shadow-inner">
                    <Settings className="w-8 h-8 text-white/20 animate-[spin_4s_linear_infinite]" />
                </div>
                <div className="space-y-1">
                    <p className="text-white font-medium text-lg">Settings Module Coming Soon</p>
                    <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                        Configuration is currently managed via the backend `.env` file. A UI for managing these settings will be deployed in the next update.
                    </p>
                </div>
            </div>
        </div>
    );
}
