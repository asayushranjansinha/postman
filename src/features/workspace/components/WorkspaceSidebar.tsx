"use client";

import { CheckIcon, CreditCardIcon, LogOut, LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Main",
    items: [
      {
        title: "Item 1",
        icon: CheckIcon,
        url: "/item-1",
      },
      {
        title: "Item 2",
        icon: CheckIcon,
        url: "/item-2",
      },
      {
        title: "Item 3",
        icon: CheckIcon,
        url: "/item-3",
      },
      {
        title: "Item 4",
        icon: CheckIcon,
        url: "/item-4",
      },
      {
        title: "Item 5",
        icon: CheckIcon,
        url: "/item-5",
      },
    ],
  },
];

type FooterMenuItem = {
  title: string;
  icon: LucideIcon;
  onClick: () => void | Promise<void>;
};

export const WorkspaceSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const footerMenuItems = useMemo(() => {
    const items: FooterMenuItem[] = [];
    items.push({
      title: "Logout",
      icon: LogOut,
      onClick() {},
    });
    // Billing Portal
    items.push({
      title: "Billing portal",
      icon: CreditCardIcon,
      onClick: () => {},
    });
    return items;
  }, []);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b" style={{ height: "53px" }}>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                prefetch
                href="/"
                className="flex self-center items-center gap-2 text-2xl font-semibold text-foreground"
              >
                <Image
                  src="/logo.svg"
                  alt="POSTMAN"
                  width={28}
                  height={28}
                  className="size-[28px]"
                />
                Postman
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Navigation */}
      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={
                        item.url === "/"
                          ? pathname === "/"
                          : pathname.startsWith(item.url)
                      }
                    >
                      <Link href={item.url} prefetch>
                        <item.icon className="size-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      {/* Footer actions */}
      <SidebarFooter>
        <SidebarMenu>
          {footerMenuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} onClick={item.onClick}>
                <item.icon className="size-4" />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
