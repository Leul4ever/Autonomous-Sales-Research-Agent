"use client";

import { motion } from "framer-motion";
import {
  Users,
  PhoneCall,
  Video,
  ArrowRight,
  Zap,
  ShieldCheck,
  BarChart3
} from "lucide-react";
import Link from "next/link";

const engines = [
  {
    name: "Lead Research",
    description: "Deep-sea company research and personalized outbound automation.",
    icon: Users,
    href: "/lead-gen",
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    border: "border-blue-400/20"
  },
  {
    name: "Voice Agent",
    description: "High-conversion AI voice bots for appointment setting and qualification.",
    icon: PhoneCall,
    href: "/voice-bot",
    color: "text-violet-400",
    bg: "bg-violet-400/10",
    border: "border-violet-400/20"
  },
  {
    name: "Content Engine",
    description: "Automated social media growth and video script generation.",
    icon: Video,
    href: "/content-engine",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10",
    border: "border-emerald-400/20"
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-24">
      {/* Hero Section */}
      <section className="space-y-6 pt-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold uppercase tracking-wider"
        >
          <Zap className="w-3 h-3 fill-current" />
          Brainlancer Selection Phase
        </motion.div>

        <div className="space-y-2">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/40"
          >
            AI GTM Engine
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl"
          >
            The next generation of Sales & Marketing automation. Orchestrate your entire go-to-market strategy with specialized AI architects.
          </motion.p>
        </div>
      </section>

      {/* Engine Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {engines.map((engine) => (
          <Link key={engine.name} href={engine.href}>
            <motion.div
              variants={item}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`group p-8 rounded-3xl glass transition-all duration-300 border-b-2 ${engine.border} hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] relative overflow-hidden`}
            >
              {/* Subtle accent glow */}
              <div className={`absolute -right-12 -top-12 w-24 h-24 rounded-full blur-[40px] opacity-20 ${engine.bg}`} />

              <div className="flex flex-col h-full gap-6">
                <div className={`p-3 rounded-2xl w-fit ${engine.bg}`}>
                  <engine.icon className={`w-8 h-8 ${engine.color}`} />
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-white group-hover:text-violet-400 transition-colors">
                    {engine.name}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {engine.description}
                  </p>
                </div>

                <div className="mt-auto pt-6 flex items-center text-xs font-semibold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                  Explore Engine
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-12 py-12 border-t border-white/5"
      >
        {[
          { label: "Efficiency Boost", value: "85%", icon: BarChart3 },
          { label: "Lead Precision", value: "99.2%", icon: ShieldCheck },
          { label: "Cost Reduction", value: "10x", icon: Zap },
        ].map((stat, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-white/5 border border-white/10">
              <stat.icon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </motion.section>
    </div>
  );
}
