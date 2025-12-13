"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    InputGroup,
    InputGroupButton,
    InputGroupInput,
} from "@/components/ui/input-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { AllowedInviteRoles } from "@/features/workspace/types";

// Define the constant array for Zod's runtime validation
const INVITE_ROLES_ARRAY = ["MEMBER", "ADMIN"] as const;

const inviteFormSchema = z.object({
  role: z.enum(INVITE_ROLES_ARRAY, "Please select a role for the invite."),
});

type InviteFormValues = z.infer<typeof inviteFormSchema>;
// -----------------------------

interface WorkspaceInviteFormProps {
  workspaceId: string; // Not used in form fields, but passed to onSubmit
  isSubmitting?: boolean;
  onSubmit: (values: { role: AllowedInviteRoles }) => Promise<string | null>;
  onCancel: () => void;
}

export const WorkspaceInviteForm = ({
  isSubmitting = false,
  onSubmit,
  onCancel,
}: WorkspaceInviteFormProps) => {
  const [inviteToken, setInviteToken] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const form = useForm<InviteFormValues>({
    resolver: zodResolver(inviteFormSchema),
    defaultValues: {
      role: "MEMBER", // Set default role
    },
  });

  const handleFormSubmit = async (values: InviteFormValues) => {
    // Call the external onSubmit handler
    const token = await onSubmit(values);
    if (token) {
      setInviteToken(token);
    }
  };

  const copyToClipboard = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };

  if (inviteToken) {
    const inviteLink = `${window.location.origin}/invite/${inviteToken}`;

    return (
      <div className="space-y-4">
        <InputGroup>
          <InputGroupInput value={inviteLink} readOnly />
          <InputGroupButton
            aria-label="Copy"
            title="Copy"
            size="icon-xs"
            onClick={() => copyToClipboard(inviteLink)}
          >
            {isCopied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </InputGroupButton>
        </InputGroup>

        <div className="flex justify-end">
          <Button variant="outline" onClick={onCancel}>
            Close
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="MEMBER">Member</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Generating invite…" : "Generate Invite"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
