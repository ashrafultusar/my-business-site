export interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

// ─── NextAuth Type Extensions ────────────────────────────────────────────────
declare module "next-auth" {
  interface User {
    role?: string;
    id?: string;
  }
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
  }
}

