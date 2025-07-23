import { useMemo } from 'react';

export function useFormatter() {
    return useMemo(() => {
        return {
            currencyFormatter: new Intl.NumberFormat('en-US', {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
                currency: 'USD',
                currencyDisplay: 'name',
            }),
        };
    }, []);
}
