import { Combobox } from '@/components/combobox';
import { FormSubmit } from '@/components/form-submit';
import { InputError } from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PartialFormProps } from '@/types';

export type UserFormData = {
    steam_id: string;
    role_id?: number;
};

type FormProps = PartialFormProps<UserFormData> & { roles: Record<number, string> };

export function UserForm({ errors, setData, data, processing, recentlySuccessful, roles, ...props }: FormProps) {
    return (
        <form {...props} className="space-y-6">
            <div className="grid gap-2">
                <Label htmlFor="steam_id">Steam ID</Label>
                <Input
                    id="steam_id"
                    className="mt-1 block w-full"
                    onChange={(e) => setData('steam_id', e.target.value)}
                    defaultValue={data.steam_id}
                />
                <InputError className="mt-2" message={errors.steam_id} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="group_id">Role</Label>
                <Combobox
                    value={data.role_id?.toString()}
                    nullable={false}
                    onChange={(roleId) => setData('role_id', parseInt(roleId!))}
                    items={Object.entries(roles).map(([index, name]) => ({
                        label: name,
                        value: index,
                    }))}
                />

                <InputError className="mt-2" message={errors.role_id} />
            </div>

            <div className="flex items-center gap-4">
                <FormSubmit processing={processing} recentlySuccessful={recentlySuccessful} />
            </div>
        </form>
    );
}
