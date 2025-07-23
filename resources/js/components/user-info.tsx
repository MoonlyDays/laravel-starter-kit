import { UserAvatar } from '@/components/user-avatar';
import { User } from '@/types/models';

export function UserInfo({ user, showSteamId = false }: { user: User; showSteamId?: boolean }) {
    return (
        <>
            <div className="relative h-8 w-8">
                <UserAvatar user={user} />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <div className="truncate font-medium">{user.name || <span className="text-muted-foreground italic">Unknown</span>}</div>
                {showSteamId && <div className="truncate text-xs text-muted-foreground">{user.steam_id}</div>}
            </div>
        </>
    );
}
