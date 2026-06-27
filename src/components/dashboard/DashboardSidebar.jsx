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
import SidebarNav from "./SidebarNav";

export async function DashboardSidebar() {

    const user = await getUserSession();
    // console.log("user", user);
    const CreatorSidebarLinks = [
        {
            icon: "house",
            href: "/dashboard/creator",
            label: "Creator Home",
        },
        {
            icon: "person",
            href: "/dashboard/creator/profile",
            label: "My Profile",
        },
        {
            icon: "bell",
            href: "/dashboard/creator/my-prompts/create-prompt",
            label: "Add Prompt",
        },
        {
            icon: "envelope",
            href: "/dashboard/creator/my-prompts",
            label: "My Prompts",
        },
    ];

    const userSidebarLinks = [
        {
            icon: "house",
            href: "/dashboard/user",
            label: "User Home",
        },
        {
            icon: "person",
            href: "/dashboard/user/profile",
            label: "My Profile",
        },
        {
            icon: "bell",
            href: "/dashboard/user/my-prompts/create-prompt",
            label: "Add Prompt",
        },
        {
            icon: "bell",
            href: "/dashboard/user/my-prompts",
            label: "My Prompts",
        },
        {
            icon: "bookmark",
            href: "/dashboard/user/saved-prompts",
            label: "Saved Prompts",
        },
        {
            icon: "star",
            href: "/dashboard/user/my-reviews",
            label: "My Reviews",
        },
    ];

    const adminSidebarLinks = [
        {
            icon: "house",
            href: "/dashboard/admin",
            label: "Admin Analytics",
        },
        {
            icon: "bell",
            href: "/dashboard/admin/users",
            label: "Manage Users",
        },
        {
            icon: "envelope",
            href: "/dashboard/admin/prompts",
            label: "Manage Prompts",
        },
        {
            icon: "bookmark",
            href: "/dashboard/admin/reports",
            label: "Reported Prompts",
        },
        {
            icon: "gear",
            href: "/dashboard/admin/payments",
            label: "All Payments",
        },
    ];

    const navLinksMap = {
        creator: CreatorSidebarLinks,
        user: userSidebarLinks,
        admin: adminSidebarLinks,
    }
    const navItems = navLinksMap[user?.role] || [];
    const navContent = <SidebarNav navItems={navItems} />;

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