import { MessageToaster } from '@/components/message-toaster';
import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';
import { ReactNode } from 'react';

export default function AuthLayout({ children, title, description, ...props }: { children: ReactNode; title: string; description: string }) {

    return (
        <AuthLayoutTemplate title={title} description={description} {...props}>
            {children}
            <MessageToaster />
        </AuthLayoutTemplate>
    );
}
