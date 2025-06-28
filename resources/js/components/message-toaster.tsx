import { Toaster } from '@/components/ui/sonner';
import { useSharedData } from '@/lib/utils';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

export function MessageToaster() {
    const toastConfig = useSharedData().toast;
    const toastedNonce = useRef<string>(undefined);

    useEffect(() => {
        if (toastedNonce.current === toastConfig?.nonce) return;
        if (!toastConfig?.nonce) return;

        toast(toastConfig.message);
        toastedNonce.current = toastConfig.nonce;
    }, [toastConfig?.message, toastConfig?.nonce]);

    return <Toaster />;
}
