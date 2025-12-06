// CreateWorkspaceForm.tsx
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Workspace name must be at least 3 characters long",
  }),
});

export type CreateWorkspaceFormValues = z.infer<typeof formSchema>;

interface CreateWorkspaceFormProps {
  onSubmit: (values: CreateWorkspaceFormValues) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const CreateWorkspaceForm = ({
  onSubmit,
  onCancel,
  isSubmitting = false,
}: CreateWorkspaceFormProps) => {
  const form = useForm<CreateWorkspaceFormValues>({
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
                <Input {...field} placeholder="e.g. First Workspace" />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Workspace name is required and must be at least 3 characters
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
