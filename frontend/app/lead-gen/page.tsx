"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    Search,
    Mail,
    Database,
    Loader2,
    CheckCircle2,
    Send,
    Building2,
    ExternalLink,
    Copy
} from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

export default function LeadGenPage() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [company, setCompany] = useState("");
    const [role, setRole] = useState("Marketing Manager");
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const runResearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setResult(null);
        setError(null);

        try {
            const response = await fetch("/api/lead-gen/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ company_name: company, target_role: role }),
            });
            if (!response.ok) {
                const text = await response.text().catch(() => "");
                throw new Error(text || `Request failed (${response.status})`);
            }
            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error("Research failed:", error);
            setError(error instanceof Error ? error.message : "Research failed");
        } finally {
            setLoading(false);
        }
    };

    const sendToOutreach = async () => {
        setSending(true);
        // Simulate an API call to an outreach service
        await new Promise(resolve => setTimeout(resolve, 2000));
        setSending(false);
        setSent(true);
        setTimeout(() => setSent(false), 3000);
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        // You could add a toast here
    };

    return (
        <div className="max-w-5xl mx-auto space-y-12 pb-24">
            <div className="space-y-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider"
                >
                    <Search className="w-3 h-3" />
                    Autonomous Prospecting
                </motion.div>
                <h1 className="text-5xl font-bold tracking-tight">Lead Research Engine</h1>
                <p className="text-muted-foreground text-xl max-w-2xl">
                    Enter a company name and our AI agent will perform deep research, find contacts, and draft a high-conversion pitch.
                </p>
            </div>

            {/* Input Form */}
            <div className="p-8 rounded-[2.5rem] glass border-white/5 glow relative z-20">
                <form onSubmit={runResearch} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/60 ml-1">Company Name</label>
                        <input
                            required
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="e.g. Tesla, Stripe, Nike"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/60 ml-1">Target Role</label>
                        <input
                            required
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            placeholder="e.g. CEO, Marketing Manager"
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all"
                        />
                    </div>
                    <div className="flex items-end">
                        <button
                            disabled={loading || !company}
                            className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Agent Researching...
                                </>
                            ) : (
                                <>
                                    <Database className="w-5 h-5" />
                                    Launch Research
                                </>
                            )}
                        </button>
                    </div>
                </form>
                {error && (
                    <p className="mt-4 text-sm text-red-400">
                        {error}
                    </p>
                )}
            </div>

            <AnimatePresence mode="wait">
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                    >
                        {/* Left: Research Summary */}
                        <div className="space-y-6">
                            <div className="p-8 rounded-[2rem] glass border-white/5 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3 rounded-2xl bg-blue-500/10">
                                            <Building2 className="w-6 h-6 text-blue-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold">{result.company}</h3>
                                            <p className="text-blue-400 text-sm flex items-center gap-1">
                                                {result.domain} <ExternalLink className="w-3 h-3" />
                                            </p>
                                        </div>
                                    </div>
                                    <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold flex items-center gap-1">
                                        <CheckCircle2 className="w-3 h-3" />
                                        Verified
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-white/40">Found Intelligence</h4>
                                    <div className="text-muted-foreground text-sm leading-relaxed whitespace-pre-wrap markdown-content">
                                        <ReactMarkdown>{result.context_summary}</ReactMarkdown>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-white/5">
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-white/40">Decision Makers</h4>
                                    <div className="space-y-2">
                                        {Array.isArray(result.found_emails) ? result.found_emails.map((email: string, i: number) => (
                                            <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 group">
                                                <span className="text-sm font-medium">{email}</span>
                                                <button onClick={() => copyToClipboard(email)} className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-white/10 rounded-lg transition-all">
                                                    <Copy className="w-4 h-4 text-white/40" />
                                                </button>
                                            </div>
                                        )) : <p className="text-sm text-white/20">No emails found via Hunter</p>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Pitch Generation */}
                        <div className="space-y-6">
                            <div className="p-8 rounded-[2rem] glass border-violet-500/20 glow bg-violet-500/2 bg-gradient-to-br from-violet-600/5 to-transparent relative">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="p-3 rounded-2xl bg-violet-500/10">
                                        <Mail className="w-6 h-6 text-violet-400" />
                                    </div>
                                    <h3 className="text-xl font-bold">AI Generated Pitch</h3>
                                </div>

                                <div className="bg-black/40 rounded-2xl p-6 border border-white/10 min-h-[300px] relative group text-left">
                                    <div className="text-muted-foreground text-sm leading-relaxed markdown-content italic">
                                        <ReactMarkdown>{result.email_draft}</ReactMarkdown>
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(result.email_draft)}
                                        className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                                    >
                                        <Copy className="w-4 h-4 text-white" />
                                    </button>
                                </div>

                                <button 
                                    onClick={sendToOutreach}
                                    disabled={sending || sent}
                                    className={cn(
                                        "w-full mt-6 font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-3 group shadow-lg",
                                        sent ? "bg-emerald-600 text-white" : "bg-violet-600 hover:bg-violet-500 text-white shadow-violet-600/20"
                                    )}
                                >
                                    {sending ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : sent ? (
                                        <CheckCircle2 className="w-5 h-5" />
                                    ) : (
                                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    )}
                                    {sending ? "Adding to Sequence..." : sent ? "Added to Sequence!" : "Send to Outreach Sequence"}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {!result && !loading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-12 rounded-[2rem] glass border-dashed border-white/10 flex flex-col items-center justify-center text-center gap-4 py-24"
                >
                    <div className="p-4 rounded-full bg-white/5 border border-white/10 shadow-inner">
                        <Database className="w-8 h-8 text-white/20" />
                    </div>
                    <div className="space-y-1">
                        <p className="text-white font-medium text-lg">Agent Ready for Deployment</p>
                        <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                            Our autonomous researcher is standing by. Just enter a company name above to begin prospecting.
                        </p>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
