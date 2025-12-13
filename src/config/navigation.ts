import { NavigationItem } from "@/types/navigation";
import {
  ZapIcon,
  TagIcon,
  MailIcon,
  ArrowRightIcon,
  StarIcon,
  HelpCircleIcon,
} from "lucide-react";

export const HEADER_NAV_ITEMS: NavigationItem[] = [
  {
    label: "Features",
    href: "#features",
    icon: ZapIcon,
    showOnDesktop: true,
    showOnMobile: true,
  },
  {
    label: "Testimonials",
    href: "#testimonials",
    icon: StarIcon,
    showOnDesktop: false,
    showOnMobile: true,
  },
  {
    label: "FAQ",
    href: "#faq",
    icon: HelpCircleIcon,
    showOnDesktop: true,
    showOnMobile: true,
  },
  {
    label: "Pricing",
    href: "#pricing",
    icon: TagIcon,
    showOnDesktop: true,
    showOnMobile: true,
  },
  {
    label: "Contact",
    href: "#contact",
    icon: MailIcon,
    showOnDesktop: true,
    showOnMobile: true,
  },
  {
    label: "Start",
    href: "/sign-in",
    icon: ArrowRightIcon,
    showOnDesktop: true,
    showOnMobile: true,
  },
];
