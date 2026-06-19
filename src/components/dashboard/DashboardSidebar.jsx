"use client";

import {
    Bars,
    Bell,
    Envelope,
    Gear,
    House,
    Magnifier,
    Person,
} from "@gravity-ui/icons";

import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export function DashboardSidebar() {
    const navItems = [
  {
    icon: House,
    href: "/dashboard/creator",
    label: "Creator Home",
  },
  {
    icon: Person,
    href: "/dashboard/creator/profile",
    label: "My Profile",
  },
  {
    icon: Bell,
    href: "/dashboard/creator/my-prompts/create-prompt",
    label: "Add Prompt",
  },
  {
    icon: Envelope,
    href: "/dashboard/creator/my-prompts",
    label: "My Prompts",
  },
];
    const navContent = (
        <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
                <Link
                    href={item.href}
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-default"
                >
                    <item.icon className="size-5" />
                    {item.label}
                </Link>
            ))}
        </nav>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex w-60 shrink-0 flex-col border-r p-4">
                <h2 className="mb-4 text-lg font-semibold">
                    Dashboard
                </h2>

                {navContent}
            </aside>

            {/* Mobile Drawer */}
            <div className="p-4 lg:hidden">
                <Drawer>
                    <Button variant="secondary red-500">
                        <Bars />
                        sidebar
                    </Button>

                    <Drawer.Backdrop>
                        <Drawer.Content placement="left">
                            <Drawer.Dialog>
                                <Drawer.CloseTrigger />

                                <Drawer.Header>
                                    <Drawer.Heading>
                                        Navigation
                                    </Drawer.Heading>
                                </Drawer.Header>

                                <Drawer.Body>
                                    {navContent}
                                </Drawer.Body>
                            </Drawer.Dialog>
                        </Drawer.Content>
                    </Drawer.Backdrop>
                </Drawer>
            </div>
        </>
    );
}