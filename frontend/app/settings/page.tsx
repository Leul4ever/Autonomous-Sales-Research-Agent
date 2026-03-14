"use client";

import { useState, useEffect } from "react";
import { Settings, ShieldCheck, Database, Key, Loader2, Save, CheckCircle2 } from "lucide-react";

export default function SettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const [keys, setKeys] = useState({
        VAPI_PRIVATE_KEY: "",
        VAPI_PHONE_NUMBER_ID: "",
        HUNTER_API_KEY: "",
        GEMINI_API_KEY: "",
        DATABASE_URL: "",
    });

    const [status, setStatus] = useState({
        vapi_private_key_set: false,
        hunter_api_key_set: false,
        gemini_api_key_set: false,
        database_url_set: false,
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            const res = await fetch("http://localhost:8001/api/settings/");
            if (res.ok) {
                const data = await res.json();
                setStatus(data);
                setKeys((prev) => ({ ...prev, VAPI_PHONE_NUMBER_ID: data.vapi_phone_id || "" }));
            }
        } catch (error) {
            console.error("Failed to fetch settings", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setSaveSuccess(false);

        try {
            // Only send fields that are not empty
            const payload: any = {};
            for (const [k, v] of Object.entries(keys)) {
                if (v.trim() !== "") {
                    payload[k] = v;
                }
            }

            const res = await fetch("http://localhost:8001/api/settings/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                setSaveSuccess(true);
                setTimeout(() => setSaveSuccess(false), 3000);
                await fetchSettings(); // refresh status
                
                // clear sensitive inputs
                setKeys(prev => ({
                    ...prev,
                    VAPI_PRIVATE_KEY: "",
                    HUNTER_API_KEY: "",
                    GEMINI_API_KEY: "",
                    DATABASE_URL: ""
                }));
            }
        } catch (error) {
            console.error("Save failed", error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-24 text-left">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight">System Settings</h1>
                <p className="text-muted-foreground text-lg">
                    Manage your API keys, database connections, and agent preferences.
                </p>
            </div>

            <div className="p-8 rounded-[2rem] glass border-white/5 glow relative z-20">
                {loading ? (
                    <div className="flex justify-center p-12">
                        <Loader2 className="w-8 h-8 animate-spin text-white/50" />
                    </div>
                ) : (
                    <form onSubmit={handleSave} className="space-y-8">
                        {/* API Keys Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                                <Key className="w-6 h-6 text-blue-400" />
                                <h3 className="text-xl font-semibold">API Integrations</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <label className="text-sm font-medium text-white/60 ml-1">Gemini API Key</label>
                                        {status.gemini_api_key_set && <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md">Configured</span>}
                                    </div>
                                    <input
                                        type="password"
                                        value={keys.GEMINI_API_KEY}
                                        onChange={(e) => setKeys({ ...keys, GEMINI_API_KEY: e.target.value })}
                                        placeholder={status.gemini_api_key_set ? "••••••••••••••••" : "AIzaSy..."}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <label className="text-sm font-medium text-white/60 ml-1">Hunter API Key</label>
                                        {status.hunter_api_key_set && <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md">Configured</span>}
                                    </div>
                                    <input
                                        type="password"
                                        value={keys.HUNTER_API_KEY}
                                        onChange={(e) => setKeys({ ...keys, HUNTER_API_KEY: e.target.value })}
                                        placeholder={status.hunter_api_key_set ? "••••••••••••••••" : "Hunter Key"}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Vapi Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                                <ShieldCheck className="w-6 h-6 text-violet-400" />
                                <h3 className="text-xl font-semibold">Voice Agent (Vapi)</h3>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <label className="text-sm font-medium text-white/60 ml-1">Vapi Private Key</label>
                                        {status.vapi_private_key_set && <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md">Configured</span>}
                                    </div>
                                    <input
                                        type="password"
                                        value={keys.VAPI_PRIVATE_KEY}
                                        onChange={(e) => setKeys({ ...keys, VAPI_PRIVATE_KEY: e.target.value })}
                                        placeholder={status.vapi_private_key_set ? "••••••••••••••••" : "sk-..."}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <div className="flex justify-between items-center">
                                        <label className="text-sm font-medium text-white/60 ml-1">Vapi Phone Number ID</label>
                                        {status.vapi_phone_id && <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md">Saved</span>}
                                    </div>
                                    <input
                                        type="text"
                                        value={keys.VAPI_PHONE_NUMBER_ID}
                                        onChange={(e) => setKeys({ ...keys, VAPI_PHONE_NUMBER_ID: e.target.value })}
                                        placeholder="Phone Number ID"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500/40"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Database Section */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                                <Database className="w-6 h-6 text-emerald-400" />
                                <h3 className="text-xl font-semibold">Supabase Database</h3>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-medium text-white/60 ml-1">Database Connection URL</label>
                                    {status.database_url_set && <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md">Configured</span>}
                                </div>
                                <input
                                    type="password"
                                    value={keys.DATABASE_URL}
                                    onChange={(e) => setKeys({ ...keys, DATABASE_URL: e.target.value })}
                                    placeholder={status.database_url_set ? "••••••••••••••••" : "postgresql://postgres:password@host/db"}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 font-mono text-sm"
                                />
                                <p className="text-xs text-white/30 ml-1 pt-1">
                                    Leave blank to use the built-in SQLite database locally.
                                </p>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/10 flex justify-end items-center gap-4">
                            {saveSuccess && (
                                <span className="text-emerald-400 flex items-center gap-2 text-sm font-medium">
                                    <CheckCircle2 className="w-4 h-4" /> Settings Saved
                                </span>
                            )}
                            <button
                                type="submit"
                                disabled={saving}
                                className="bg-white text-black hover:bg-white/90 font-bold py-3 px-8 rounded-2xl transition-all flex items-center gap-2"
                            >
                                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                Save Configuration
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
