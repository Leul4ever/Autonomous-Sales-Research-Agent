"use client";

import { Video, Share2, FileEdit, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function ContentEnginePage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight">Content Engine</h1>
                <p className="text-muted-foreground text-lg">
                    Automated social media growth and video script generation.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 rounded-3xl glass border-white/5 space-y-6">
                    <div className="p-3 rounded-2xl bg-emerald-500/10 w-fit">
                        <Share2 className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white text-left">Social Automation</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed text-left">
                        Generate viral-ready posts for LinkedIn, Twitter, and Instagram from any topic or URL.
                    </p>
                </div>

                <div className="p-8 rounded-3xl glass border-white/5 space-y-6">
                    <div className="p-3 rounded-2xl bg-amber-500/10 w-fit">
                        <Video className="w-6 h-6 text-amber-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white text-left">Video Scripts</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed text-left">
                        AI-driven video scripts for TikTok/Reels/Shorts including visual cues and hooks.
                    </p>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-12 rounded-[2rem] glass border-dashed border-white/10 flex flex-col items-center justify-center text-center gap-4 py-24"
            >
                <div className="p-4 rounded-full bg-white/5 border border-white/10">
                    <Sparkles className="w-8 h-8 text-white/20" />
                </div>
                <div className="space-y-1">
                    <p className="text-white font-medium">Viral Generator Offline</p>
                    <p className="text-muted-foreground text-sm">Branch 5 will bring content generation to life.</p>
                </div>
            </motion.div>
        </div>
    );
}
