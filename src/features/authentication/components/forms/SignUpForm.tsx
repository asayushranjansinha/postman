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
import { signUp } from "@/lib/auth-client";

const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

type SignUpFormValues = z.infer<typeof signUpSchema>;

const defaultValues: SignUpFormValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignUpForm = () => {
  const router = useRouter();
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues,
    mode: "onChange",
  });

  const isSubmitting = form.formState.isSubmitting;

  function onSubmit(values: SignUpFormValues) {
    return signUp
      .email({
        email: values.email,
        password: values.password,
        callbackURL: "/",
        name: values.email,
      })
      .then((res) => {
        if (res.error) {
          toast.error("Sign up failed", {
            description: res.error.message || "Invalid credentials",
          });
          return;
        }

        toast.success("Signed up successfully", {
          description: "You will be redirected to home",
        });

        form.reset();
        router.push("/");
      })
      .catch((err) => {
        toast.error("Sign up failed", {
          description: err?.message || "Unexpected error",
        });
      });
  }

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
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupAddon>
                    <LockIcon className="h-4 w-4" />
                  </InputGroupAddon>
                  <InputGroupInput
                    placeholder="********"
                    type="password"
                    {...field}
                  />
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Signing Up..." : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
};
