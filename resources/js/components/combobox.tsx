import { Check, ChevronsUpDown, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ReactNode, useMemo, useState } from 'react';

export type ComboboxItemValue = string;

export type ComboboxItemProps = {
    value: ComboboxItemValue;
    label: string;
    display?: ReactNode;
    keywords?: string[];
};

type ComboboxProps = {
    searchMessage?: string;
    emptyMessage?: string;
    placeholder?: string;
    className?: string;
    value?: string;
    nullable?: boolean;
    items: ComboboxItemProps[];
    onChange?: (value?: ComboboxItemValue) => void;
};

type MultiComboboxProps = Omit<ComboboxProps, 'value' | 'onChange' | 'nullable'> & {
    values: ComboboxItemValue[];
    onChange?: (values: ComboboxItemValue[]) => void;
    otherActions?: ReactNode;
};

export function MultiCombobox({ items, values, onChange, otherActions }: MultiComboboxProps) {
    const [selectedItems, remainingItems] = useMemo(
        function () {
            const selected: ComboboxItemProps[] = [];
            const remaining: ComboboxItemProps[] = [];

            for (const item of items) {
                if (values.includes(item.value)) {
                    selected.push(item);
                } else {
                    remaining.push(item);
                }
            }

            return [selected, remaining];
        },
        [items, values],
    );

    const added = (value?: ComboboxItemValue) => {
        if (value === undefined) return;

        onChange?.([...values, value]);
    };

    const removed = (item: ComboboxItemProps) => {
        onChange?.(values.filter((v) => v !== item.value));
    };

    return (
        <div className="grid gap-1">
            <div className="flex flex-col gap-2">
                {remainingItems.length > 0 && <Combobox items={remainingItems} placeholder="Select to add" onChange={added} />}
                <div>{otherActions}</div>
            </div>
            <div>
                {selectedItems.map((item) => (
                    <div className="flex justify-between gap-2 p-2" key={item.value}>
                        {item.display || item.label}
                        <Button variant="secondary" size="sm" onClick={() => removed(item)}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function Combobox({
    searchMessage = 'Search',
    emptyMessage = 'Nothing was found',
    placeholder = 'Empty',
    nullable = true,
    items,
    value,
    onChange,
    className,
}: ComboboxProps) {
    const [open, setOpen] = useState(false);

    const selectedItem = useMemo(() => items.find((item) => item.value === value), [items, value]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" className={cn('h-auto w-full justify-between text-left whitespace-pre-wrap', className)}>
                    {selectedItem ? selectedItem.display || selectedItem.label : <span className="text-muted-foreground">{placeholder}</span>}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0">
                <Command>
                    <CommandInput placeholder={searchMessage} className="h-9" />
                    <CommandList>
                        <CommandEmpty>{emptyMessage}</CommandEmpty>
                        <CommandGroup>
                            {items.map((item) => (
                                <CommandItem
                                    key={item.value}
                                    value={item.value.toString()}
                                    keywords={[item.label, ...(item.keywords || [])]}
                                    onSelect={(currentValue) => {
                                        const newValue = currentValue === value && nullable ? undefined : currentValue;
                                        setOpen(false);
                                        onChange?.(newValue);
                                    }}
                                >
                                    {item.display || item.label}
                                    <Check className={cn('ml-auto', value === item.value ? 'opacity-100' : 'opacity-0')} />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
