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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Workspace name must be at least 3 characters long",
  }),
});

export type WorkspaceFormValues = z.infer<typeof formSchema>;

interface WorkspaceFormProps {
  initialData?: WorkspaceFormValues & { id: string };
  onSubmit: (values: WorkspaceFormValues) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const WorkspaceForm = ({
  initialData, // Destructure initialData
  onSubmit,
  onCancel,
  isSubmitting = false,
}: WorkspaceFormProps) => {
  // Create isEditMode variable
  const isEditMode = !!initialData;

  const form = useForm<WorkspaceFormValues>({
    resolver: zodResolver(formSchema),
    // Use initialData if provided, otherwise use default empty values
    defaultValues: initialData || {
      name: "",
    },
  });

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Workspace Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={
                      isEditMode ? initialData?.name : "e.g. Project Alpha"
                    }
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Workspace name is required and must be at least 3 characters
                  long.
                </FormDescription>
              </FormItem>
            )}
          />

          {/* Buttons */}
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
              {isSubmitting
                ? "Saving"
                : isEditMode
                ? "Save Changes"
                : "Create Workspace"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
