"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    PhoneCall,
    Mic,
    Calendar,
    Headphones,
    Loader2,
    Send,
    CheckCircle2,
    XCircle
} from "lucide-react";

export default function VoiceBotPage() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [calling, setCalling] = useState(false);
    const [callStatus, setCallStatus] = useState<"idle" | "calling" | "success" | "error">("idle");

    const startCall = async (e: React.FormEvent) => {
        e.preventDefault();
        setCalling(true);
        setCallStatus("calling");

        try {
            const response = await fetch("http://localhost:8000/api/voice/call", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone_number: phoneNumber }),
            });

            if (response.ok) {
                setCallStatus("success");
            } else {
                setCallStatus("error");
            }
        } catch (error) {
            console.error("Call failed:", error);
            setCallStatus("error");
        } finally {
            setCalling(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-24 text-left">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight">AI Voice Agent</h1>
                <p className="text-muted-foreground text-lg">
                    Connect Riley to your prospects and watch them book meetings autonomously.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left: configuration/Trigger */}
                <div className="space-y-6">
                    <div className="p-8 rounded-3xl glass border-white/5 space-y-6 bg-gradient-to-br from-violet-600/5 to-transparent">
                        <div className="p-3 rounded-2xl bg-violet-500/10 w-fit">
                            <Mic className="w-6 h-6 text-violet-400" />
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold">Launch "Riley" Bot</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                                Enter a phone number to have Riley call and schedule a health consultation at Wellness Partners.
                            </p>
                        </div>

                        <form onSubmit={startCall} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Phone Number</label>
                                <input
                                    required
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    placeholder="+1 234 567 8900"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-violet-500/40 transition-all font-mono"
                                />
                            </div>
                            <button
                                disabled={calling || !phoneNumber}
                                className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-50 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-violet-600/20 flex items-center justify-center gap-3"
                            >
                                {calling ? <Loader2 className="w-5 h-5 animate-spin" /> : <PhoneCall className="w-5 h-5" />}
                                {calling ? "AI Initializing..." : "Trigger AI Call"}
                            </button>
                        </form>

                        <div className="pt-4 flex items-center gap-2">
                            {callStatus === "success" && (
                                <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium">
                                    <CheckCircle2 className="w-4 h-4" /> Call Triggered Successfully
                                </div>
                            )}
                            {callStatus === "error" && (
                                <div className="flex items-center gap-2 text-red-400 text-sm font-medium">
                                    <XCircle className="w-4 h-4" /> Error: Check API Keys
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right: Capabilities */}
                <div className="space-y-6">
                    <div className="p-8 rounded-3xl glass border-white/5 space-y-8">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-white/40">Agent Capabilities</h4>

                        <div className="space-y-6">
                            {[
                                { icon: Headphones, title: "Neural Voices", desc: "Ultra-realistic Susan voice for a high trust factor." },
                                { icon: Calendar, title: "Calendar Sync", desc: "Auto-books slots in the clinic workflow." },
                                { icon: Send, title: "Low Latency", desc: "<500ms response time for natural conversation." }
                            ].map((cap, i) => (
                                <div key={i} className="flex gap-4">
                                    <div className="p-2 rounded-xl bg-white/5 h-fit">
                                        <cap.icon className="w-5 h-5 text-violet-400/70" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-semibold text-sm">{cap.title}</p>
                                        <p className="text-xs text-muted-foreground leading-relaxed">{cap.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
