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
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const menuItems = [
  {
    title: "Email Analytics",
    url: "/dashboard",
    icon: BarChart3,
  },
  {
    title: "Email Log Table",
    url: "/dashboard/logs",
    icon: Mail,
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
                <motion.div
                  key={item.title}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}