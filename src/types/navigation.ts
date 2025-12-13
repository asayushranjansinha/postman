export type NavigationItem = {
  /** URL of the navigation item */
  href: string;
  /** Label of the navigation item */
  label: string;
  /** Icon of the navigation item */
  icon?: React.ComponentType<{ className?: string }>;
  /** Whether to show the navigation item on mobile */
  showOnMobile?: boolean;
  /** Whether to show the navigation item on desktop */
  showOnDesktop?: boolean;
};
