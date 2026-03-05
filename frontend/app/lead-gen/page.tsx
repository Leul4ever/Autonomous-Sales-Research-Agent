"use client";

import { motion } from "framer-motion";
import { Users, Search, Mail, Database } from "lucide-react";

export default function LeadGenPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight">Lead Research Engine</h1>
                <p className="text-muted-foreground text-lg">
                    Deep-sea company research and personalized outreach automation.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 rounded-3xl glass border-white/5 space-y-6">
                    <div className="p-3 rounded-2xl bg-blue-500/10 w-fit">
                        <Search className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white text-left">Company Intelligence</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed text-left">
                        Research company focus, recent news, and technology stack to create ultra-personalized hooks.
                    </p>
                </div>

                <div className="p-8 rounded-3xl glass border-white/5 space-y-6">
                    <div className="p-3 rounded-2xl bg-emerald-500/10 w-fit">
                        <Mail className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white text-left">Outbound Automation</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed text-left">
                        Generate high-converting cold email drafts and automate sending via specialized workflows.
                    </p>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-12 rounded-[2rem] glass border-dashed border-white/10 flex flex-col items-center justify-center text-center gap-4 py-24"
            >
                <div className="p-4 rounded-full bg-white/5 border border-white/10">
                    <Database className="w-8 h-8 text-white/20" />
                </div>
                <div className="space-y-1">
                    <p className="text-white font-medium">Ready to start research?</p>
                    <p className="text-muted-foreground text-sm">Deployment of Branch 3 will enable real-time agents.</p>
                </div>
            </motion.div>
        </div>
    );
}
