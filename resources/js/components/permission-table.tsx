import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckedState } from '@radix-ui/react-checkbox';

export function PermissionTable({
    permissions,
    data,
    onChange,
}: {
    permissions: Record<string, string>;
    data: string[];
    onChange: (permissions: string[]) => void;
}) {
    const handleChange = (name: string, checked: CheckedState) => {
        if (checked) {
            onChange([...data, name]);
        } else {
            onChange(data.filter((p) => p !== name));
        }
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Permissions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Object.entries(permissions).map(([name, value]) => (
                    <TableRow key={name}>
                        <TableCell>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id={`permission-${name}`}
                                    onCheckedChange={(checked) => handleChange(name, checked)}
                                    defaultChecked={data.includes(name)}
                                />
                                <Label className="w-full" htmlFor={`permission-${name}`}>
                                    {value}
                                </Label>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
