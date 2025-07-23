import { useSharedData } from '@/lib/utils';
import { PropsWithChildren } from 'react';

type RequirePermissionProps = PropsWithChildren<{
    permission?: string;
    anyOf?: string[];
    allOf?: string[];
}>;

export function RequirePermission({ permission, children, anyOf, allOf }: RequirePermissionProps) {
    const {
        auth: { permissions },
    } = useSharedData();

    if (permission && !permissions.includes(permission)) return null;
    if (anyOf && anyOf.length > 0 && !anyOf.some((p) => permissions.includes(p))) return null;
    if (allOf && allOf.length > 0 && !allOf.every((p) => permissions.includes(p))) return null;

    return children;
}
