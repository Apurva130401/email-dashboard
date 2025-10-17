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
  return (
    <Sidebar className="glass-card !border-r-border/50 !bg-sidebar/80">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Email Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
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