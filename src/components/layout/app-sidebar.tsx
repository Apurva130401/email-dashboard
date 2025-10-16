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
} from "lucide-react";
import Link from "next/link";

const menuItems = [
  {
    title: "Email Analytics",
    url: "/",
    icon: BarChart3,
  },
  {
    title: "Email Log Table",
    url: "/logs",
    icon: Mail,
  },
  {
    title: "Label Overview",
    url: "/labels",
    icon: Tag,
  },
  {
    title: "Integrations",
    url: "/integrations",
    icon: LinkIcon,
  },
  {
    title: "CSV Viewer",
    url: "/csv-viewer",
    icon: FileText,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
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