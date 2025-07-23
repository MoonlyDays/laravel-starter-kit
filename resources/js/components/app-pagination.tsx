import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import { ModelPagination, ResourcePagination } from '@/types/models';

type AppPaginationProps = {
    pagination: ModelPagination<unknown> | ResourcePagination<unknown>;
    className?: string;
};

const paginationItemInactiveClassName = 'opacity-50 pointer-events-none';

export function AppPagination({ pagination, className }: AppPaginationProps) {
    const links = 'meta' in pagination ? pagination.meta.links : pagination.links;

    const linkElement = (link: (typeof links)[number]) => {
        const props = {
            href: link.url || '',
            isActive: link.active,
            disabled: !link.url,
            className: !link.url ? paginationItemInactiveClassName : '',
        };

        if (link.label.includes('Previous')) {
            return <PaginationPrevious {...props} />;
        }

        if (link.label.includes('Next')) {
            return <PaginationNext {...props} />;
        }

        if (link.label == '...') {
            return <PaginationEllipsis />;
        }

        return (
            <PaginationLink href={link.url || ''} isActive={link.active}>
                {link.label}
            </PaginationLink>
        );
    };

    return (
        <Pagination className={className}>
            <PaginationContent>
                {links.map((link, index) => (
                    <PaginationItem key={index}>{linkElement(link)}</PaginationItem>
                ))}
            </PaginationContent>
        </Pagination>
    );
}
