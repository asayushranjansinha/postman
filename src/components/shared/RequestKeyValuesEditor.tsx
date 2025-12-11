"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const keyValueSchema = z.object({
  items: z.array(
    z.object({
      key: z.string().min(1, "Key is required"),
      value: z.string(),
      enabled: z.boolean().default(true).optional(),
    })
  ),
});

type RequestKeyValuesData = z.infer<typeof keyValueSchema>;

export interface KeyValueItem {
  key: string;
  value: string;
  enabled?: boolean;
}

interface RequestKeyValuesEditorProps {
  initialData?: KeyValueItem[];
  onSubmit: (data: KeyValueItem[]) => void;
  placeholder?: { key?: string; value?: string };
  className?: string;
  title?: string;
}

/** KeyValue editor with auto-save and debounce */
export const RequestKeyValuesEditor: React.FC<RequestKeyValuesEditorProps> = ({
  initialData = [],
  onSubmit,
  placeholder = { key: "Key", value: "Value" },
  className,
  title = "Key-Value Editor",
}) => {
  const form = useForm<RequestKeyValuesData>({
    resolver: zodResolver(keyValueSchema),
    defaultValues: {
      items:
        initialData.length > 0
          ? initialData.map((item) => ({
              ...item,
              enabled: item.enabled ?? true,
            }))
          : [{ key: "", value: "", enabled: true }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  });

  const addRow = () => append({ key: "", value: "", enabled: true });

  const removeRow = (index: number) => {
    if (fields.length > 1) remove(index);
  };

  const lastSavedRef = useRef<string | null>(null);

  const getFilteredItems = (items: KeyValueItem[]) =>
    items
      .filter((item) => item.enabled && (item.key?.trim() || item.value?.trim()))
      .map(({ key, value }) => ({ key, value }));

  const debounce = (fn: (...args: any[]) => void, wait = 500) => {
    let t: ReturnType<typeof setTimeout> | null = null;
    return (...args: any[]) => {
      if (t) clearTimeout(t);
      t = setTimeout(() => fn(...args), wait);
    };
  };

  const saveIfChanged = useCallback(
    (items: KeyValueItem[]) => {
      const filtered = getFilteredItems(items);
      const serialized = JSON.stringify(filtered);
      if (serialized !== lastSavedRef.current) {
        lastSavedRef.current = serialized;
        onSubmit(filtered);
      }
    },
    [onSubmit]
  );

  const debouncedRef = useRef(debounce(saveIfChanged, 500));

  useEffect(() => {
    const subscription = form.watch((v) => {
      const items = (v as RequestKeyValuesData).items || [];
      debouncedRef.current(items as KeyValueItem[]);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  return (
    <Form {...form}>
      <form className={cn("w-full space-y-2", className)}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">{title}</h3>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={addRow}
            className="h-7 gap-1.5 text-xs"
          >
            <Plus className="h-3.5 w-3.5" /> Add
          </Button>
        </div>

        {/* Column headers */}
        <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-2 px-1 pb-1 border-b text-xs font-medium text-muted-foreground">
          <div className="w-8" />
          <div>Key</div>
          <div>Value</div>
          <div className="w-8" />
        </div>

        {/* Rows */}
        <div className="space-y-1.5">
          {fields.map((field, index) => {
            const isEnabled = form.watch(`items.${index}.enabled`);
            return (
              <div
                key={field.id}
                className={cn(
                  "grid grid-cols-[auto_1fr_1fr_auto] gap-2 items-center px-1 py-1 rounded-md transition-colors",
                )}
              >
                {/* Checkbox */}
                <FormField
                  control={form.control}
                  name={`items.${index}.enabled`}
                  render={({ field: checkboxField }) => (
                    <FormItem className="flex items-center justify-center w-8">
                      <FormControl>
                        <Checkbox
                          checked={checkboxField.value}
                          onCheckedChange={(checked) => checkboxField.onChange(checked)}
                          className="h-4 w-4"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Key */}
                <FormField
                  control={form.control}
                  name={`items.${index}.key`}
                  render={({ field }) => (
                    <FormItem className="space-y-0">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={placeholder.key}
                          disabled={!isEnabled}
                          className={cn(
                            "h-8 text-sm border-input bg-background",
                            !isEnabled && "cursor-not-allowed"
                          )}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Value */}
                <FormField
                  control={form.control}
                  name={`items.${index}.value`}
                  render={({ field }) => (
                    <FormItem className="space-y-0">
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={placeholder.value}
                          disabled={!isEnabled}
                          className={cn(
                            "h-8 text-sm border-input bg-background",
                            !isEnabled && "cursor-not-allowed"
                          )}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {/* Delete button */}
                <div className="flex items-center justify-center w-8">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeRow(index)}
                    disabled={fields.length <= 1}
                    className="h-7 w-7 transition-opacity"
                  >
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex justify-end px-1 pt-1">
          <span className="text-xs text-muted-foreground italic">Auto-saved</span>
        </div>
      </form>
    </Form>
  );
};
