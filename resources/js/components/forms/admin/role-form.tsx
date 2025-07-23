import { FormSubmit } from '@/components/form-submit';
import { InputError } from '@/components/input-error';
import { PermissionTable } from '@/components/permission-table';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PartialFormProps } from '@/types';

export type RoleFormData = {
    name: string;
    permissions: string[];
};

type FormProps = PartialFormProps<RoleFormData> & { allPermissions: Record<number, string> };

export function RoleForm({ errors, setData, data, processing, recentlySuccessful, allPermissions, ...props }: FormProps) {
    return (
        <form {...props} className="space-y-6">
            <div className="grid gap-2">
                <Label htmlFor="steam_id">Name</Label>
                <Input
                    id="name"
                    value={data.name}
                    className="mt-1 block w-full"
                    onChange={(e) => setData('name', e.target.value)}
                    required
                    autoComplete="steam_id"
                />

                <InputError className="mt-2" message={errors.name} />
            </div>

            <div className="grid gap-2">
                <InputError className="mt-2" message={errors.permissions} />
                <PermissionTable permissions={allPermissions} data={data.permissions} onChange={(data) => setData('permissions', data)} />
            </div>

            <div className="flex items-center gap-4">
                <FormSubmit processing={processing} recentlySuccessful={recentlySuccessful} />
            </div>
        </form>
    );
}
