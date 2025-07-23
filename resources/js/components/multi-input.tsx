import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Plus, Trash } from 'lucide-react';
import { InputHTMLAttributes, KeyboardEventHandler, ReactNode, useMemo, useState } from 'react';

type MultiInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> & {
    values: string[];
    onChange: (values: string[]) => void;
    emptyMessage?: string;
    unique?: boolean;
    renderItem?: (value: string) => ReactNode;
    validate?: (value: string) => boolean;
};

export function MultiInput({ className, values, onChange, renderItem, emptyMessage = 'The list is empty.', ...props }: MultiInputProps) {
    const handleRemove = (value: string) => {
        onChange(values.filter((i) => i !== value));
    };

    const handleAdd = (value: string) => {
        onChange([...values, value]);
    };

    return (
        <div className={cn('space-y-6', className)}>
            <MultiInputField onAdd={handleAdd} values={values} {...props} />
            <MultiInputValues onRemove={handleRemove} values={values} emptyMessage={emptyMessage} renderItem={renderItem} />
        </div>
    );
}

type MultiInputFieldProps = Omit<MultiInputProps, 'onChange'> & {
    onAdd: (value: string) => void;
};

function MultiInputField({ unique, values, onAdd, validate, ...props }: MultiInputFieldProps) {
    const [input, setInput] = useState('');

    const handleKeyDown: KeyboardEventHandler = (e) => {
        if (e.code == 'Enter') {
            e.preventDefault();
            add();
        }
    };

    const canAdd = useMemo(() => {
        if (unique && values.includes(input)) return false;
        if (validate && !validate(input)) return false;
        return input.length > 0;
    }, [input, unique, values, validate]);

    const add = () => {
        if (!canAdd) return;

        onAdd(input);
        setInput('');
    };

    return (
        <div className="flex gap-2">
            <Input onKeyDown={handleKeyDown} value={input} onChange={(e) => setInput(e.target.value)} {...props} />
            <Button disabled={!canAdd} variant="default" type="button" onClick={add}>
                <Plus />
            </Button>
        </div>
    );
}

type MultiInputValuesProps = Pick<MultiInputProps, 'values' | 'renderItem' | 'emptyMessage'> & {
    onRemove: (value: string) => void;
};

function MultiInputValues({ values, emptyMessage, renderItem, onRemove }: MultiInputValuesProps) {
    return values.length == 0 ? (
        <div className="text-sm text-muted-foreground italic">{emptyMessage}</div>
    ) : (
        <div className="flex flex-wrap gap-4">
            {values.map((value) => (
                <Card key={value} className="px-3 py-2">
                    <CardContent className="flex items-center gap-3 p-0">
                        <div className="text-base">{renderItem ? renderItem(value) : value}</div>
                        <Button variant="destructive" type="button" onClick={() => onRemove(value)}>
                            <Trash className="h-2 w-2" />
                        </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
