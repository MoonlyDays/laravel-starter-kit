import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useForm } from '@inertiajs/react';
import { PropsWithChildren, useState } from 'react';

export function DeleteDialog({ children, href }: PropsWithChildren<{ href: string }>) {
    const { delete: destroy, processing } = useForm();
    const [open, setOpen] = useState(false);

    const confirm = () => {
        destroy(href, { preserveScroll: true });
    };

    const cancel = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>Are you sure you want to delete this.</DialogDescription>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="secondary" onClick={cancel}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button variant="destructive" onClick={confirm} disabled={processing}>
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
