import { getUserSession } from "@/lib/core/session";
import {
    Bars,
    Bell,
    Envelope,
    Gear,
    House,
    Magnifier,
    Person,
    Star,
} from "@gravity-ui/icons";

import { Button, Drawer } from "@heroui/react";
import { BookmarkCheck, BookmarkCheckIcon } from "lucide-react";
import Link from "next/link";

export async function DashboardSidebar() {

    const user = await getUserSession();
    // console.log("user", user);
    const CreatorSidebarLinks = [
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

    const userSidebarLinks = [
        {
            icon: House,
            href: "/dashboard/user",
            label: "User Home",
        },
        {
            icon: Person,
            href: "/dashboard/user/profile",
            label: "My Profile",
        },
        {
            icon: Bell,
            href: "/dashboard/user/my-prompts/create-prompt",
            label: "Add Prompt",
        },
        {
            icon: Bell,
            href: "/dashboard/user/my-prompts",
            label: "My Prompts",
        },
        {
            icon: BookmarkCheckIcon,
            href: "/dashboard/user/saved-prompts",
            label: "Saved Prompts",
        },
        {
            icon: Star,
            href: "/dashboard/user/my-reviews",
            label: "My Reviews",
        },
    ];

    const adminSidebarLinks = [
        {
            icon: House,
            href: "/dashboard/admin",
            label: "Admin Analytics",
        },
        {
            icon: Person,
            href: "/dashboard/admin/profile",
            label: "Admin Profile",
        },
        {
            icon: Bell,
            href: "/dashboard/admin/users",
            label: "Manage Users",
        },
        {
            icon: Envelope,
            href: "/dashboard/admin/prompts",
            label: "Manage Prompts",
        },
        {
            icon: BookmarkCheckIcon,
            href: "/dashboard/admin/reports",
            label: "Reported Prompts",
        },
        {
            icon: Gear,
            href: "/dashboard/admin/settings",
            label: "Settings",
        },
    ];

    const navLinksMap = {
        creator: CreatorSidebarLinks,
        user: userSidebarLinks,
        admin: adminSidebarLinks,
    }
    const navItems = navLinksMap[user?.role] || [];
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