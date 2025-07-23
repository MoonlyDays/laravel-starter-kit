export type ModelPagination<T> = {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url?: string;
        label: string;
        active: boolean;
    }[];
    next_page_url?: string;
    path: string;
    per_page: number;
    prev_page_url?: string;
    to: number;
    total: number;
};

export type ResourcePagination<T> = {
    data: T[];
    links: {
        first?: string;
        last?: string;
        prev?: string;
        next?: string;
    };
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        path: string;
        per_page: number;
        to: number;
        total: number;
        links: {
            url?: string;
            label: string;
            active: boolean;
        }[];
    };
};

export interface User {
    id: number;
    name: string;
    avatar_url: string;
    steam_id: string;
    created_at: string;
    updated_at: string;

    roles?: Role[];
}

export type Role = {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;

    users_count?: number;
    permissions_count?: number;

    permissions?: Permission[];
};

export type Permission = {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
};

export type Donation = {
    id: number;
    name: string;
    message: string;
    amount: number;
    transaction_id: number;
    channel: string;
    email?: string;
    steam_id?: string;
    is_censored: boolean;
    allows_contact: boolean;
    extra_parameters?: Record<string, unknown>;
    completed_at?: string;
    created_at?: string;
    updated_at?: string;

    sticker_id?: number;
    sticker?: Sticker;
};

export type Sticker = {
    id: number;
    title: string;
    description?: string;
    image_url: string;
    is_enabled: boolean;
    price: number;
    created_at: string;
    updated_at: string;
};

export type DataPoint<T extends string = 'value' | string> = {
    period: string;
} & Record<T, number>;
