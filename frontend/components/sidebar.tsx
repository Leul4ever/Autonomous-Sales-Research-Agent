"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Users,
    PhoneCall,
    Video,
    Settings,
    BrainCircuit
} from "lucide-react";

const navigation = [
    { name: "Overview", href: "/", icon: LayoutDashboard },
    { name: "Lead Research", href: "/lead-gen", icon: Users },
    { name: "Voice Agent", href: "/voice-bot", icon: PhoneCall },
    { name: "Content Engine", href: "/content-engine", icon: Video },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="flex flex-col w-64 glass h-screen border-r border-white/10">
            <div className="flex items-center gap-3 px-6 h-20 border-b border-white/10">
                <div className="p-2 rounded-xl bg-violet-600/20 glow">
                    <BrainCircuit className="w-6 h-6 text-violet-500" />
                </div>
                <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                    GTM Engine
                </span>
            </div>

            <nav className="flex-1 px-4 py-8 space-y-2">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                isActive
                                    ? "bg-violet-600/10 text-violet-400 border border-violet-600/20"
                                    : "text-muted-foreground hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <item.icon className={cn(
                                "w-5 h-5 transition-colors",
                                isActive ? "text-violet-400" : "group-hover:text-white"
                            )} />
                            <span className="font-medium text-sm">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/5">
                <Link
                    href="/settings"
                    className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-white transition-colors"
                >
                    <Settings className="w-5 h-5" />
                    <span className="font-medium text-sm">Settings</span>
                </Link>
            </div>
        </div>
    );
}
