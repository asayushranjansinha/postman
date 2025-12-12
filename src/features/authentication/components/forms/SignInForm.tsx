"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LockIcon, MailIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { authClient } from "@/lib/auth-client";

const signInSchema = z.object({
  email: z.email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});

type SignInFormValues = z.infer<typeof signInSchema>;

const defaultValues: SignInFormValues = {
  email: "",
  password: "",
};

export const SignInForm = () => {
  const router = useRouter();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues,
    mode: "onChange",
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: SignInFormValues) => {
    try {
      const result = await authClient.signIn.email({
        email: values.email,
        password: values.password,
        callbackURL: "/",
        rememberMe: false,
      });

      if (result.error) {
        toast.error("Sign in failed", {
          description: result.error.message ?? "Invalid credentials",
        });
        return;
      }

      toast.success("Signed in successfully", {
        description: "Redirecting to home",
      });

      form.reset();
      router.push("/");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An unexpected error occurred";

      toast.error("Sign in failed", { description: message });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupAddon>
                    <MailIcon className="h-4 w-4" />
                  </InputGroupAddon>
                  <InputGroupInput
                    placeholder="you@example.com"
                    type="email"
                    disabled={isSubmitting}
                    {...field}
                  />
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupAddon>
                    <LockIcon className="h-4 w-4" />
                  </InputGroupAddon>
                  <InputGroupInput
                    placeholder="********"
                    type="password"
                    disabled={isSubmitting}
                    {...field}
                  />
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Signing in..." : "Sign In"}
        </Button>
      </form>
    </Form>
  );
};
