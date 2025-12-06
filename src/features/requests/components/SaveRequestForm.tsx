import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, ChevronRightIcon, CopyIcon } from "lucide-react";
import React from "react";
import { useForm, useWatch } from "react-hook-form";
import * as z from "zod";

import { RequestMethod } from "@prisma/client";

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

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

import { Collection } from "@/features/collection/types";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  url: z.string().url("Invalid URL"),
  method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"] as const),
  collectionId: z.string().min(1, "Collection is required"),
});

export type SaveRequestFormValues = z.infer<typeof formSchema>;

interface SaveRequestFormProps {
  onSubmit: (values: SaveRequestFormValues) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  workspaceId: string;
  workspaceName?: string;
  collections: Array<Collection>;
  initialData?: Partial<SaveRequestFormValues>;
  isEditMode?: boolean;
}

export const SaveRequestForm: React.FC<SaveRequestFormProps> = ({
  onSubmit,
  onCancel,
  isSubmitting,
  workspaceId,
  workspaceName,
  collections,
  initialData = {
    name: "Untitled Request",
    collectionId: "",
    method: "GET",
    url: "",
  },
  isEditMode = false,
}) => {
  const { copied, copyFn } = useCopyToClipboard();

  const form = useForm<SaveRequestFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData.name ?? "Untitled Request",
      url: initialData.url ?? "",
      method: initialData.method ?? "GET",
      collectionId: initialData.collectionId ?? "",
    },
  });

  // Live preview source
  const previewMethod = useWatch({ control: form.control, name: "method" });
  const previewUrl = useWatch({ control: form.control, name: "url" });

  function getCollectionNameById(id?: string) {
    if (!id) return "Collection";
    const collection = collections.find((c) => c.id === id);
    return collection?.name ?? "Collection";
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        {/* Request Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Request Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. GET Users" />
              </FormControl>
              <FormDescription>
                This name will appear inside the collection.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* URL */}
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>URL</FormLabel>
              <FormControl>
                <Input {...field} placeholder="https://api.example.com/users" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Method */}
        <FormField
          control={form.control}
          name="method"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Method</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GET" className={cn(requestColorMap.GET)}>
                      GET
                    </SelectItem>
                    <SelectItem
                      value="POST"
                      className={cn(requestColorMap.POST)}
                    >
                      POST
                    </SelectItem>
                    <SelectItem value="PUT" className={cn(requestColorMap.PUT)}>
                      PUT
                    </SelectItem>
                    <SelectItem
                      value="DELETE"
                      className={cn(requestColorMap.DELETE)}
                    >
                      DELETE
                    </SelectItem>
                    <SelectItem
                      value="PATCH"
                      className={cn(requestColorMap.PATCH)}
                    >
                      PATCH
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* PREVIEW ROW */}
        <div className="w-full flex flex-col gap-2">
          <FormLabel className="mb-1 block">Preview</FormLabel>
          <InputGroup>
            <InputGroupAddon>
              <span className={requestColorMap[previewMethod]}>
                {previewMethod}
              </span>
            </InputGroupAddon>
            <InputGroupInput
              readOnly
              value={previewUrl}
              placeholder="https://api.example.com/users"
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                aria-label="Copy"
                title="Copy"
                size="icon-xs"
                onClick={() => copyFn(previewUrl)}
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
        </div>

        {/* Collection ID */}
        <FormField
          control={form.control}
          name="collectionId"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Select Location</FormLabel>

              {/* Breadcrumb */}
              <div className="flex flex-row gap-0.5 text-muted-foreground text-xs items-center italic mb-2 overflow-hidden">
                <span className="truncate">{workspaceName || "Workspace"}</span>
                <ChevronRightIcon className="size-3 shrink-0" />
                <span className="truncate">
                  {getCollectionNameById(field.value)}
                </span>
                <ChevronRightIcon className="size-3 shrink-0" />
                <span className="truncate">{form.getValues("name")}</span>
              </div>

              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={isEditMode} // ✅ Disable collection change in edit mode
                >
                  <SelectTrigger className="w-full capitalize">
                    <SelectValue placeholder="Select a collection">
                      {field.value
                        ? getCollectionNameById(field.value)
                        : "Select a collection"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {collections.map((collection) => (
                      <SelectItem
                        key={collection.id}
                        value={collection.id}
                        className="capitalize"
                      >
                        {collection.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>

              {isEditMode && (
                <FormDescription>
                  Collection cannot be changed when editing a request
                </FormDescription>
              )}

              <FormMessage />
            </FormItem>
          )}
        />

        {/* Footer */}
        <div className="flex justify-end gap-2 pt-4">
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
              ? isEditMode
                ? "Updating..."
                : "Saving..."
              : isEditMode
              ? "Update Request"
              : "Save Request"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

const requestColorMap: Record<RequestMethod, string> = {
  GET: "text-green-500",
  POST: "text-indigo-500",
  PUT: "text-yellow-500",
  DELETE: "text-red-500",
  PATCH: "text-orange-500",
};
