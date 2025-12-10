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

// Collection Form Schema
const formSchema = z.object({
  name: z.string().min(3, {
    message: "Collection name must be at least 3 characters long",
  }),
});

export type CollectionFormValues = z.infer<typeof formSchema>;

// Define props
interface CollectionFormProps {
  initialData?: CollectionFormValues & { id: string };
  onSubmit: (values: CollectionFormValues) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

// Collection Form Component
export const CollectionForm = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: CollectionFormProps) => {
  // Determine if we are in edit mode
  const isEditMode = !!initialData;

  const form = useForm<CollectionFormValues>({
    resolver: zodResolver(formSchema),
    // Use initialData if provided, otherwise use default empty values
    defaultValues: initialData
      ? {
          name: initialData.name,
        }
      : {
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
          {/* Collection Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="sr-only">Collection Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={
                      isEditMode
                        ? initialData?.name
                        : "e.g. User Authentication API"
                    }
                  />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  Collection name is required and must be at least 3 characters
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
                : "Create Collection"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
