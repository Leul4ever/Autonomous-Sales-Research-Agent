"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  PhoneCall,
  PenTool,
  ArrowRight,
  Zap,
  ShieldCheck,
  Globe,
  Database
} from "lucide-react";

const engines = [
  {
    title: "Lead Research",
    desc: "Autonomous agent that researches companies and finds decision makers.",
    icon: Users,
    href: "/lead-gen",
    color: "bg-blue-500",
    status: "Live"
  },
  {
    title: "Voice Agent",
    desc: "Riley, the neural AI assistant for automated phone scheduling.",
    icon: PhoneCall,
    href: "/voice-bot",
    color: "bg-violet-500",
    status: "Review"
  },
  {
    title: "Content Engine",
    desc: "Generate LinkedIn posts and viral video scripts in seconds.",
    icon: PenTool,
    href: "/content-engine",
    color: "bg-emerald-500",
    status: "Live"
  }
];

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-24">
      {/* Hero Section */}
      <section className="relative pt-12 text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Zap className="w-3 h-3" />
            V1.0 Launch Ready
          </div>
          <h1 className="text-7xl font-bold tracking-tight bg-gradient-to-r from-white via-white to-white/40 bg-clip-text text-transparent leading-[1.1]">
            Scale your GTM with <br />
            <span className="text-blue-500">Autonomous AI.</span>
          </h1>
          <p className="text-muted-foreground text-xl max-w-2xl leading-relaxed">
            The AI GTM Engine unifies lead research, voice automation, and content velocity into a single, premium dashboard.
          </p>

          <div className="flex gap-4 pt-4">
            <Link href="/lead-gen">
              <button className="bg-white text-black font-bold h-14 px-8 rounded-2xl hover:bg-white/90 transition-all flex items-center gap-3 group shadow-2xl shadow-white/10">
                Launch Lead Research
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Engine Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {engines.map((engine, i) => (
          <motion.div
            key={engine.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={engine.href} className="group block">
              <div className="h-full p-8 rounded-[2.5rem] glass border-white/5 hover:border-white/20 transition-all relative overflow-hidden">
                <div className={`absolute -right-8 -top-8 w-32 h-32 ${engine.color} opacity-[0.03] blur-3xl group-hover:opacity-[0.08] transition-opacity`} />

                <div className="space-y-6 relative z-10">
                  <div className="flex justify-between items-start">
                    <div className={`p-4 rounded-2xl ${engine.color}/10 border border-${engine.color}/20 group-hover:scale-110 transition-transform`}>
                      <engine.icon className={`w-7 h-7 ${engine.color.replace('bg-', 'text-')}`} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/30 bg-white/5 px-2 py-1 rounded-md">
                      {engine.status}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{engine.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {engine.desc}
                    </p>
                  </div>

                  <div className="pt-4 flex items-center gap-2 text-sm font-semibold text-white/40 group-hover:text-white transition-colors">
                    Access Engine
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Stats/Benefits Section */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12 border-t border-white/5">
        {[
          { icon: Database, label: "LangChain Agents", value: "3 Ready" },
          { icon: ShieldCheck, label: "API Security", value: "Locked" },
          { icon: Zap, label: "Latency", value: "<1s Response" },
          { icon: Globe, label: "Global Scale", value: "+100 Countries" }
        ].map((stat, i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-center gap-2 text-white/40">
              {/* <stat.icon className="w-4 h-4" /> */}
              <span className="text-xs font-bold uppercase tracking-widest">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
