"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  BarChart3,
  Mail,
  Tag,
  Settings,
  Link as LinkIcon,
  FileText,
  Bot,
  CreditCard,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    title: "Email Analytics",
    url: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Mailbox",
    url: "/dashboard/logs",
    icon: Mail,
  },
  {
    title: "Calendar",
    url: "/dashboard/calendar",
    icon: Calendar,
  },
  {
    title: "Label Overview",
    url: "/dashboard/labels",
    icon: Tag,
  },
  {
    title: "Integrations",
    url: "/dashboard/integrations",
    icon: LinkIcon,
  },
  {
    title: "CSV Viewer",
    url: "/dashboard/csv-viewer",
    icon: FileText,
  },
  {
    title: "Nina AI",
    url: "/dashboard/nina",
    icon: Bot,
  },
  {
    title: "Billing",
    url: "/dashboard/billing",
    icon: CreditCard,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="!border-r-border/50 !bg-gray-900 text-white">
      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg uppercase font-semibold tracking-wide text-gray-400 mt-4 mb-2 px-3">
            Email Dashboard
          </SidebarGroupLabel>
          <div className="border-b border-gray-700 mb-2"></div>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`hover:bg-gray-800 transition-all duration-200 hover:scale-105 rounded-lg my-1 hover:text-white ${
                      pathname === item.url ? "bg-gray-800 border-l-4 border-primary" : ""
                    }`}
                  >
                    <Link href={item.url} className="flex items-center p-3">
                      <item.icon className="w-5 h-5 mr-3" />
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}