export function HeadingSmall({ title, className, description }: { title: string; className?: string; description?: string }) {
    return (
        <header className={className}>
            <h3 className="mb-0.5 text-base font-medium">{title}</h3>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </header>
    );
}
