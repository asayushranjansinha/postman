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
import { HttpMethod } from "@prisma/client";

// Define
const formSchema = z.object({
  name: z.string().min(1, {
    message: "Request name is required.",
  }),
  url: z.url({ message: "Must be a valid URL." }).optional(),
  method: z.enum(Object.values(HttpMethod), "Must be a valid HTTP method."),
});

export type RequestFormValues = z.infer<typeof formSchema>;

// Define props
interface RequestFormProps {
  initialData?: RequestFormValues & { id: string };
  onSubmit: (values: RequestFormValues) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const RequestForm = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: RequestFormProps) => {
  // Determine if we are in edit mode
  const isEditMode = !!initialData;

  const form = useForm<RequestFormValues>({
    resolver: zodResolver(formSchema),
    // Use initialData if provided, otherwise use default empty values
    defaultValues: initialData || {
      name: "",
      method: "GET", // Default to GET for new requests
      url: "",
    },
  });

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4"
        >
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Request Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder={
                      isEditMode ? initialData?.name : "e.g. Get User List"
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Method and URL Fields */}
          <div className="flex gap-2">
            {/* Method Field (Select) */}
            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem className="w-[120px] shrink-0">
                  <FormLabel>Method</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(HttpMethod).map(([key, value]) => (
                        <SelectItem key={key} value={value}>
                          {value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* URL Field (Input) */}
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. https://api.example.com/users"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormDescription className="text-right">
            Configuration fields like headers and body are not included in this
            form.
          </FormDescription>

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
                : "Create Request"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
