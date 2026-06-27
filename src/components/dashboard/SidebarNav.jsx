"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    House,
    Bell,
    Envelope,
    Person,
    Star,
    Gear,
    FileDollar,
} from "@gravity-ui/icons";

import { BookmarkCheck, Flag } from "lucide-react";

const icons = {
    house: House,
    bell: Bell,
    envelope: Envelope,
    gear: FileDollar,
    person: Person,
    star: Star,
    bookmark: Flag,
};

export default function SidebarNav({ navItems }) {
    const pathname = usePathname();
    const getIsActive = (href) => {
        // exact match always wins
        if (pathname === href) return true;

        // check if there's a more specific route
        const hasMoreSpecificMatch = navItems.some(
            (item) =>
                pathname.startsWith(item.href) &&
                item.href.length > href.length
        );

        if (hasMoreSpecificMatch) return false;

        return pathname.startsWith(href + "/");
    };

    return (
        <nav className="flex flex-col gap-1">
            {navItems.map((item) => {
                const Icon = icons[item.icon];

                // Debug missing icons
                if (!Icon) {
                    console.log("Missing icon:", item.icon);
                    return null;
                }

                const isActive = getIsActive(item.href);
                return (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={`flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${isActive
                            ? "bg-blue-600 text-white"
                            : "hover:bg-default"
                            }`}
                    >
                        <Icon className="size-5" />
                        {item.label}
                    </Link>
                );
            })}
        </nav>
    );
}