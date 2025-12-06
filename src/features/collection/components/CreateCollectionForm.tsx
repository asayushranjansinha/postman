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



interface CreateCollectionFormProps {
  onSubmit: (values: CreateCollectionFormValues) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
});
export type CreateCollectionFormValues = z.infer<typeof formSchema>;

export const CreateCollectionForm = ({
  onSubmit,
  onCancel,
  isSubmitting,
}: CreateCollectionFormProps) => {
  const form = useForm<CreateCollectionFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
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
                <Input {...field} placeholder="e.g. First Collection" />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Collection name is required and must be at least 3 characters
                long
              </FormDescription>
            </FormItem>
          )}
        />

        {/* Move buttons OUTSIDE FormField */}
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
            {isSubmitting ? "Creating..." : "Create Workspace"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
