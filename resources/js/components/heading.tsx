import { cn } from '@/lib/utils';

export function Heading({ title, className, description }: { title: string; className?: string; description?: string }) {
    return (
        <div className={cn('mb-8 space-y-0.5', className)}>
            <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
    );
}
