import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { User } from '@/types/models';

export function UserAvatar({ user, className }: { user: User; className?: string }) {
    const getInitials = useInitials();

    return (
        <Avatar className={cn('h-8 w-8 overflow-hidden rounded-full text-sm', className)}>
            <AvatarImage src={user.avatar_url} alt={user.name} />
            <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                {getInitials(user.name || '?')}
            </AvatarFallback>
        </Avatar>
    );
}
