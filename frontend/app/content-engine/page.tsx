"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Sparkles,
    Video,
    Share2,
    PenTool,
    Loader2,
    Copy,
    Zap,
    Target,
    Rocket
} from "lucide-react";

export default function ContentEnginePage() {
    const [topic, setTopic] = useState("");
    const [audience, setAudience] = useState("Sales & Marketing Professionals");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [mode, setMode] = useState<"posts" | "video">("posts");

    const generateContent = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);

        const endpoint = mode === "posts" ? "social-posts" : "video-script";

        try {
            const response = await fetch(`http://localhost:8001/api/content/${endpoint}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ topic, target_audience: audience }),
            });
            if (!response.ok) {
                console.error("Generation failed:", await response.text().catch(() => ""));
                throw new Error(`Request failed (${response.status})`);
            }
            const data = await response.json();
            setResult(data.content);
        } catch (error) {
            console.error("Generation failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        if (result) navigator.clipboard.writeText(result);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-12 pb-24 text-left">
            <div className="space-y-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider"
                >
                    <Sparkles className="w-3 h-3" />
                    Content Velocity
                </motion.div>
                <h1 className="text-5xl font-bold tracking-tight">Content Engine</h1>
                <p className="text-muted-foreground text-xl max-w-2xl">
                    Transform a simple topic into high-performing social posts and video scripts in seconds.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Configuration */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="p-8 rounded-[2.5rem] glass border-white/5 space-y-8 bg-gradient-to-b from-emerald-600/5 to-transparent">
                        <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10">
                            <button
                                onClick={() => setMode("posts")}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all text-sm font-bold ${mode === "posts" ? "bg-emerald-600 text-white shadow-lg" : "text-white/40 hover:text-white"}`}
                            >
                                <Share2 className="w-4 h-4" /> Posts
                            </button>
                            <button
                                onClick={() => setMode("video")}
                                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all text-sm font-bold ${mode === "video" ? "bg-emerald-600 text-white shadow-lg" : "text-white/40 hover:text-white"}`}
                            >
                                <Video className="w-4 h-4" /> Script
                            </button>
                        </div>

                        <form onSubmit={generateContent} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Core Topic</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    placeholder="e.g. The future of AI in B2B sales development..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all resize-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Target Audience</label>
                                <div className="relative">
                                    <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                    <input
                                        value={audience}
                                        onChange={(e) => setAudience(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all"
                                    />
                                </div>
                            </div>

                            <button
                                disabled={loading || !topic}
                                className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-3 group"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5 group-hover:scale-110 transition-transform" />}
                                {loading ? "AI Generating..." : "Generate Magic"}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right: Output */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="min-h-[500px] p-8 rounded-[2.5rem] glass border-white/5 relative group border- emerald-500/20">
                        {!result && !loading && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-4 opacity-40">
                                <PenTool className="w-12 h-12" />
                                <p className="text-lg font-medium">Your content will appear here</p>
                            </div>
                        )}

                        {loading && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center animate-pulse">
                                <Rocket className="w-12 h-12 text-emerald-400 mb-4 animate-bounce" />
                                <p className="text-emerald-400 font-bold">Assembling Your Assets...</p>
                            </div>
                        )}

                        <AnimatePresence>
                            {result && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-6"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold flex items-center gap-2">
                                            {mode === "posts" ? <Share2 className="w-5 h-5 text-emerald-400" /> : <Video className="w-5 h-5 text-emerald-400" />}
                                            Generated Response
                                        </h3>
                                        <button
                                            onClick={copyToClipboard}
                                            className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-xs font-bold flex items-center gap-2 border border-white/10"
                                        >
                                            <Copy className="w-3.5 h-3.5" /> Copy All
                                        </button>
                                    </div>

                                    <div className="bg-black/40 rounded-3xl p-8 border border-white/10 text-muted-foreground leading-relaxed whitespace-pre-wrap font-medium">
                                        {result}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
