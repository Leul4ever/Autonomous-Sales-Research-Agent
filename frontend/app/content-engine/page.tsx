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
    Rocket,
    Linkedin,
    Twitter,
    Instagram,
    Check
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PlatformPost {
    platform: "LinkedIn" | "Twitter" | "Instagram" | "Generic";
    title: string;
    focus: string;
    content: string;
    visualSuggestion?: string;
}

export default function ContentEnginePage() {
    const [topic, setTopic] = useState("");
    const [audience, setAudience] = useState("Sales & Marketing Professionals");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<string | null>(null);
    const [parsedPosts, setParsedPosts] = useState<PlatformPost[]>([]);
    const [mode, setMode] = useState<"posts" | "video">("posts");
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const parseContent = (text: string): PlatformPost[] => {
        const posts: PlatformPost[] = [];
        const sections = text.split(/### \d\./);
        
        sections.forEach(section => {
            if (!section.trim()) return;

            const platformMatch = section.match(/^(.*?):/);
            const platformName = platformMatch ? platformMatch[1].trim() : "Generic";
            
            let platform: PlatformPost["platform"] = "Generic";
            if (platformName.includes("LinkedIn")) platform = "LinkedIn";
            else if (platformName.includes("Twitter") || platformName.includes("(X)")) platform = "Twitter";
            else if (platformName.includes("Instagram")) platform = "Instagram";

            const titleMatch = section.match(/^(.*?)\n/);
            const title = titleMatch ? titleMatch[1].trim() : "";

            const focusMatch = section.match(/\*\*Focus:\*\* \*(.*?)\*/);
            const focus = focusMatch ? focusMatch[1].trim() : "";

            const visualMatch = section.match(/\*\*Visual Suggestion:\*\* \*(.*?)\*/);
            const visualSuggestion = visualMatch ? visualMatch[1].trim() : undefined;

            // Extract content: everything after focus (or title) and before visual suggestion (if exists)
            let content = section;
            if (focusMatch) {
                content = section.split(/\*\*Post Copy:\*\*|\*\*Caption:\*\*/)[1] || section;
            }
            if (visualMatch) {
                content = content.split(/\*\*Visual Suggestion:\*\*/)[0];
            }

            posts.push({
                platform,
                title,
                focus,
                content: content.trim(),
                visualSuggestion
            });
        });

        return posts;
    };

    const generateContent = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);
        setParsedPosts([]);

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
            if (mode === "posts") {
                setParsedPosts(parseContent(data.content));
            }
        } catch (error) {
            console.error("Generation failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text: string, index: number | "all") => {
        navigator.clipboard.writeText(text);
        if (typeof index === "number") {
            setCopiedIndex(index);
            setTimeout(() => setCopiedIndex(null), 2000);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-24 text-left">
            <div className="space-y-4 text-center md:text-left">
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

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                {/* Left: Configuration */}
                <div className="xl:col-span-1 space-y-6">
                    <div className="p-8 rounded-[2.5rem] glass border-white/5 space-y-8 bg-gradient-to-b from-emerald-600/5 to-transparent sticky top-8">
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
                <div className="xl:col-span-3 space-y-6">
                    <div className="min-h-[600px] p-4 md:p-8 rounded-[2.5rem] glass border-white/5 relative group border-emerald-500/20 overflow-hidden">
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
                            {(mode === "video" && result) && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-6"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-xl font-bold flex items-center gap-2">
                                            <Video className="w-5 h-5 text-emerald-400" />
                                            Video Script
                                        </h3>
                                        <button
                                            onClick={() => copyToClipboard(result!, "all")}
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

                            {(mode === "posts" && parsedPosts.length > 0) && (
                                <div className="grid grid-cols-1 gap-8">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-xl font-bold flex items-center gap-2">
                                            <Share2 className="w-5 h-5 text-emerald-400" />
                                            High-Impact Social Posts
                                        </h3>
                                        <button
                                            onClick={() => copyToClipboard(result!, "all")}
                                            className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-xs font-bold flex items-center gap-2 border border-white/10 hidden md:flex"
                                        >
                                            <Copy className="w-3.5 h-3.5" /> Copy All Posts
                                        </button>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 gap-6">
                                        {parsedPosts.map((post, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden flex flex-col"
                                            >
                                                <div className={cn(
                                                    "px-6 py-4 flex items-center justify-between",
                                                    post.platform === "LinkedIn" && "bg-blue-600/10 border-b border-blue-600/20",
                                                    post.platform === "Twitter" && "bg-white/5 border-b border-white/10",
                                                    post.platform === "Instagram" && "bg-pink-600/10 border-b border-pink-600/20",
                                                    post.platform === "Generic" && "bg-emerald-600/10 border-b border-emerald-600/20"
                                                )}>
                                                    <div className="flex items-center gap-3">
                                                        {post.platform === "LinkedIn" && <Linkedin className="w-5 h-5 text-blue-400" />}
                                                        {post.platform === "Twitter" && <Twitter className="w-5 h-5 text-white" />}
                                                        {post.platform === "Instagram" && <Instagram className="w-5 h-5 text-pink-400" />}
                                                        {post.platform === "Generic" && <Share2 className="w-5 h-5 text-emerald-400" />}
                                                        <span className="font-bold text-sm tracking-wide uppercase">{post.platform}</span>
                                                    </div>
                                                    <button
                                                        onClick={() => copyToClipboard(post.content, i)}
                                                        className={cn(
                                                            "px-3 py-1.5 rounded-lg transition-all text-[10px] font-bold uppercase tracking-widest flex items-center gap-2",
                                                            copiedIndex === i ? "bg-emerald-500 text-white" : "bg-white/10 hover:bg-white/20 text-white/70"
                                                        )}
                                                    >
                                                        {copiedIndex === i ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                                                        {copiedIndex === i ? "Copied" : "Copy Post"}
                                                    </button>
                                                </div>
                                                <div className="p-6 space-y-4 flex-1">
                                                    <div>
                                                        <h4 className="text-sm font-bold text-white mb-1">{post.title}</h4>
                                                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-tighter italic">Focus: {post.focus}</p>
                                                    </div>
                                                    <div className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap font-medium h-full italic">
                                                        {post.content}
                                                    </div>
                                                    {post.visualSuggestion && (
                                                        <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-dashed border-white/10">
                                                            <p className="text-[10px] font-bold text-white/40 uppercase mb-2">Visual Suggestion</p>
                                                            <p className="text-xs text-white/60 italic">{post.visualSuggestion}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
