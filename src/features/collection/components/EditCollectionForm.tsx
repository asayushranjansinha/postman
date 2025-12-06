"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface EditCollectionFormProps {
  onSubmit: (values: EditCollectionFormValues) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  initialData: { name: string };
}

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
});

export type EditCollectionFormValues = z.infer<typeof formSchema>;

export const EditCollectionForm = ({
  onSubmit,
  onCancel,
  isSubmitting,
  initialData,
}: EditCollectionFormProps) => {
  const form = useForm<EditCollectionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData.name,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} placeholder="Collection name" />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Must be at least 3 characters long.
              </FormDescription>
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
