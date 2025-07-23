import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { format, formatDistance } from 'date-fns';

type DateArg = Date | number | string;

export function TimeDistance({
    hasTooltip = true,
    to,
    from = new Date(),
    absoluteFormat = 'PPpp',
}: {
    hasTooltip?: boolean;
    to: DateArg;
    from?: DateArg;
    absoluteFormat?: string;
}) {
    const absString = format(to, absoluteFormat);
    const distString = formatDistance(to, from, {
        addSuffix: true,
    });

    const child = <>{distString}</>;
    if (!hasTooltip) return child;

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>{child}</TooltipTrigger>
                <TooltipContent>{absString}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
