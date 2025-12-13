"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CheckIcon, Loader2Icon, SendIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SITE_CONFIG } from "@/config/siteConfig";

// Zod Schema
const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);

  // Initialize Form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const { isSubmitting } = form.formState;

  // Mock Submission Handler
  async function onSubmit(data: FormValues) {
    const { firstName, lastName, email, subject, message } = data;

    const body = encodeURIComponent(
      `Name: ${firstName} ${lastName}\n` + `Email: ${email}\n\n` + `${message}`
    );

    const mailtoLink =
      `mailto:${SITE_CONFIG.supportEmail}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${body}`;

    window.location.href = mailtoLink;

    setIsSuccess(true);
    form.reset();
  }

  // Success State View
  if (isSuccess) {
    return (
      <div className="relative p-8 rounded-3xl border border-border bg-card shadow-2xl h-full min-h-[500px] flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
          <CheckIcon className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Message Received!
        </h3>
        <p className="text-muted-foreground max-w-xs mb-8">
          We've added your request to our priority queue. Expect a response
          within 2 hours.
        </p>
        <Button
          variant="outline"
          onClick={() => setIsSuccess(false)}
          className="border-primary/30 hover:bg-primary/10"
        >
          Send another message
        </Button>
      </div>
    );
  }

  // Form View
  return (
    <div className="relative group">
      {/* Decorative Glow behind the form */}
      <div className="absolute -inset-1 rounded-3xl bg-linear-to-r from-primary/30 to-accent/30 opacity-50 blur-lg pointer-events-none group-hover:opacity-75 transition-opacity duration-500" />

      <div className="relative p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-2xl">
        <div className="mb-6 space-y-2">
          <h3 className="text-2xl font-bold text-foreground">
            Send us a message
          </h3>
          <p className="text-sm text-muted-foreground">
            Fill out the form below and we'll get back to you shortly.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Jane"
                        {...field}
                        className="bg-secondary/20 border-border focus-visible:ring-primary/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Doe"
                        {...field}
                        className="bg-secondary/20 border-border focus-visible:ring-primary/20"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Work Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="jane@company.com"
                      {...field}
                      className="bg-secondary/20 border-border focus-visible:ring-primary/20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="How can we help?"
                      {...field}
                      className="bg-secondary/20 border-border focus-visible:ring-primary/20"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your project or issue..."
                      className="min-h-[120px] bg-secondary/20 border-border focus-visible:ring-primary/20 resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 text-base bg-primary hover:bg-primary/90 glow-blue transition-all duration-300 mt-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2Icon className="w-4 h-4 mr-1 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <SendIcon className="w-4 h-4 ml-1" />
                </>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
