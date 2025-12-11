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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ====================================================================
// SCHEMA AND TYPES
// ====================================================================

const saveFormSchema = z.object({
  name: z.string().min(1, {
    message: "Request name is required.",
  }),
  collectionId: z.string().min(1, {
    message: "A collection must be selected.",
  }),
});

export type SaveRequestFormValues = z.infer<typeof saveFormSchema>;

// Define the structure for the collection data passed down
interface Collection {
    id: string;
    name: string;
}

interface SaveRequestFormProps {
  initialData: {
    id: string;
    name: string;
    collectionId: string; // Current collection ID (can be "" for unsaved)
  };
  // ADDED: Collections are passed in directly from the parent
  collections: Collection[]; 
  onSubmit: (values: SaveRequestFormValues) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

// ====================================================================

export const SaveRequestForm = ({
  initialData,
  collections, // Destructure the collections prop
  onSubmit,
  onCancel,
  isSubmitting = false,
}: SaveRequestFormProps) => {
  
  // NOTE: Loading state for collections is now managed by the parent, 
  // but we can derive it based on whether collections data exists.
  const isLoadingCollections = collections.length === 0 && !isSubmitting; 
  
  // Determine if this is a brand new save (e.g., from an unsaved tab)
  const isNewSave = initialData.collectionId === "";
  
  const form = useForm<SaveRequestFormValues>({
    resolver: zodResolver(saveFormSchema),
    defaultValues: {
      name: initialData.name,
      // Default to current collectionId, or empty string if unsaved/none
      collectionId: initialData.collectionId || "", 
    },
  });

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          {/* Request Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Request Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={initialData.name}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Target Collection Field (Select) */}
          <FormField
            control={form.control}
            name="collectionId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Collection</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  // Disable if submitting or if collections haven't been loaded yet (and we're not submitting)
                  disabled={isSubmitting || isLoadingCollections}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={isLoadingCollections ? "Loading collections..." : "Select a target collection"} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {collections.map((collection) => (
                      <SelectItem key={collection.id} value={collection.id}>
                        {collection.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  {isNewSave
                    ? "Choose a collection to save your new request."
                    : "Move this request to a different collection."}
                </FormDescription>
                <FormMessage />
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
            <Button 
              type="submit" 
              // Disable if submitting or if no collections are available to select
              disabled={isSubmitting || isLoadingCollections}>
              {isSubmitting
                ? "Saving..."
                : isNewSave
                ? "Save Request"
                : "Move & Rename"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};