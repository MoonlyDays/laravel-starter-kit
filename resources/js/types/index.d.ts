import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href?: string;
}

export type NavItem = NavItemSingle | NavItemGroup;

type NavItemShared = {
    title: string;
    icon?: LucideIcon | null;
};

export type NavItemSingle = NavItemShared & {
    href: string;
};

export type NavItemGroup = NavItemShared & {
    items: NavItemSingle[];
};

export type SharedData = {
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    toast?: {
        message: string;
        nonce: string;
    };

    [key: string]: unknown;
};

export interface User {
    id: number;
    name: string;
    email: string;
    avatar_url?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;

    [key: string]: unknown; // This allows for additional properties...
}
