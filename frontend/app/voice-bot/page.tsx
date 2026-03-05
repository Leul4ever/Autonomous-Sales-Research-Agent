"use client";

import { PhoneCall, Mic, Calendar, Headphones } from "lucide-react";
import { motion } from "framer-motion";

export default function VoiceBotPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tight">AI Voice Agent</h1>
                <p className="text-muted-foreground text-lg">
                    High-conversion voice bots for appointment setting and lead qualification.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 rounded-3xl glass border-white/5 space-y-6">
                    <div className="p-3 rounded-2xl bg-violet-500/10 w-fit">
                        <Mic className="w-6 h-6 text-violet-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white text-left">Neural Voice Synthesis</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed text-left">
                        Ultra-realistic, low-latency voices that sound human and empathetic. Powered by Vapi.
                    </p>
                </div>

                <div className="p-8 rounded-3xl glass border-white/5 space-y-6">
                    <div className="p-3 rounded-2xl bg-blue-500/10 w-fit">
                        <Calendar className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white text-left">Auto-Booking</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed text-left">
                        Connect directly to Calendly or Google Calendar for instant meeting bookings during calls.
                    </p>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-12 rounded-[2rem] glass border-dashed border-white/10 flex flex-col items-center justify-center text-center gap-4 py-24"
            >
                <div className="p-4 rounded-full bg-white/5 border border-white/10">
                    <Headphones className="w-8 h-8 text-white/20" />
                </div>
                <div className="space-y-1">
                    <p className="text-white font-medium">Coming Soon: Interactive Voice Demo</p>
                    <p className="text-muted-foreground text-sm">Branch 4 will integrate live calling capabilities.</p>
                </div>
            </motion.div>
        </div>
    );
}
