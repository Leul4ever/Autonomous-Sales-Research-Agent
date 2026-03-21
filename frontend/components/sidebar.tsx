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
        <div className="flex flex-col w-20 md:w-64 glass h-screen border-r border-white/10 transition-all duration-300">
            <div className="flex items-center gap-3 px-4 md:px-6 h-20 border-b border-white/10 justify-center md:justify-start">
                <div className="p-2 rounded-xl bg-violet-600/20 glow flex-shrink-0">
                    <BrainCircuit className="w-6 h-6 text-violet-500" />
                </div>
                <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 hidden md:block whitespace-nowrap">
                    GTM Engine
                </span>
            </div>

            <nav className="flex-1 px-3 md:px-4 py-8 space-y-2">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            title={item.name}
                            className={cn(
                                "flex items-center gap-3 px-3 md:px-4 py-3 rounded-xl transition-all duration-200 group justify-center md:justify-start",
                                isActive
                                    ? "bg-violet-600/10 text-violet-400 border border-violet-600/20"
                                    : "text-muted-foreground hover:bg-white/5 hover:text-white"
                            )}
                        >
                            <item.icon className={cn(
                                "w-6 h-6 md:w-5 md:h-5 transition-colors flex-shrink-0",
                                isActive ? "text-violet-400" : "group-hover:text-white"
                            )} />
                            <span className="font-medium text-sm hidden md:block whitespace-nowrap">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-3 md:p-4 border-t border-white/5">
                <Link
                    href="/settings"
                    title="Settings"
                    className="flex items-center gap-3 px-3 md:px-4 py-3 text-muted-foreground hover:text-white transition-colors justify-center md:justify-start"
                >
                    <Settings className="w-6 h-6 md:w-5 md:h-5 flex-shrink-0" />
                    <span className="font-medium text-sm hidden md:block whitespace-nowrap">Settings</span>
                </Link>
            </div>
        </div>
    );
}
