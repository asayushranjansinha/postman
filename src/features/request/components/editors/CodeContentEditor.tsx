"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlignLeftIcon,
  CheckIcon,
  Code,
  CopyIcon,
  FileText,
  RotateCcw,
  Save,
} from "lucide-react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import React, { useCallback, useMemo } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { cn } from "@/lib/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

// Dynamically import Monaco Editor
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

// Schema and Types
const contentEditorSchema = z.object({
  contentType: z.enum(["application/json", "text/plain"]),
  body: z.string().optional(),
});
export type ContentEditorFormData = z.infer<typeof contentEditorSchema>;

const contentTypeOptions = [
  {
    value: "application/json" as const,
    label: "application/json",
    icon: Code,
  },
  {
    value: "text/plain" as const,
    label: "text/plain",
    icon: FileText,
  },
];

// Sub-Components
interface ContentTypeSelectorProps {
  form: UseFormReturn<ContentEditorFormData>;
  disabled: boolean;
}

const ContentTypeSelector: React.FC<ContentTypeSelectorProps> = ({
  form,
  disabled,
}) => {
  return (
    <FormField
      control={form.control}
      name="contentType"
      render={({ field }) => (
        <FormItem className="flex items-center gap-3 space-y-0">
          <Label className="text-xs font-medium text-muted-foreground whitespace-nowrap">
            Content Type
          </Label>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={disabled}
          >
            <FormControl>
              <SelectTrigger
                className={cn(
                  "h-8 text-xs w-fit bg-transparent border-none shadow-none ring-0"
                )}
              >
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {contentTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center gap-2 text-xs">
                    <option.icon className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{option.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};

interface EditorActionsProps {
  contentType: "application/json" | "text/plain";
  onFormat: () => void;
  onReset: () => void;
  onCopy: () => void;
  copied: boolean;
  disabled: boolean;
}

const EditorActions: React.FC<EditorActionsProps> = ({
  contentType,
  onFormat,
  onReset,
  onCopy,
  copied,
  disabled,
}) => {
  const TooltipWrapper: React.FC<{
    label: string;
    children: React.ReactNode;
  }> = ({ label, children }) => (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent className="text-xs">{label}</TooltipContent>
    </Tooltip>
  );

  return (
    <div className="flex items-center gap-1">
      {contentType === "application/json" && (
        <TooltipWrapper label="Format JSON (Prettify)">
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={onFormat}
            disabled={disabled}
          >
            <AlignLeftIcon className="size-3.5" />
          </Button>
        </TooltipWrapper>
      )}
      <TooltipWrapper label={copied ? "Copied!" : "Copy to Clipboard"}>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={onCopy}
          disabled={disabled}
        >
          {copied ? (
            <CheckIcon className="size-3.5 text-green-500" />
          ) : (
            <CopyIcon className="size-3.5" />
          )}
        </Button>
      </TooltipWrapper>
      <TooltipWrapper label="Clear Content">
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={onReset}
          disabled={disabled}
        >
          <RotateCcw className="size-3.5" />
        </Button>
      </TooltipWrapper>
    </div>
  );
};

interface EditorHeaderProps {
  form: UseFormReturn<ContentEditorFormData>;
  contentType: "application/json" | "text/plain";
  onFormat: () => void;
  onReset: () => void;
  onCopy: () => void;
  copied: boolean;
  disabled: boolean;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({
  form,
  contentType,
  onFormat,
  onReset,
  onCopy,
  copied,
  disabled,
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-1.5 bg-card border-b z-10 relative">
      <ContentTypeSelector form={form} disabled={disabled} />
      <EditorActions
        contentType={contentType}
        onFormat={onFormat}
        onReset={onReset}
        onCopy={onCopy}
        copied={copied}
        disabled={disabled}
      />
    </div>
  );
};

interface CodeEditorProps {
  form: UseFormReturn<ContentEditorFormData>;
  contentType: "application/json" | "text/plain";
  editorTheme: string;
  onEditorChange: (value?: string) => void;
  minHeight: string;
  disabled: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  form,
  contentType,
  editorTheme,
  onEditorChange,
  minHeight,
  disabled,
}) => {
  return (
    <div className="relative bg-background">
      <FormField
        control={form.control}
        name="body"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div
                className="overflow-hidden rounded-none"
                style={{ height: minHeight }}
              >
                <MonacoEditor
                  height={minHeight}
                  value={field.value}
                  language={
                    contentType === "application/json" ? "json" : "plaintext"
                  }
                  theme={editorTheme}
                  options={{
                    automaticLayout: true,
                    minimap: { enabled: false },
                    scrollBeyondLastLine: false,
                    fontSize: 14,
                    fontFamily:
                      "JetBrains Mono, Fira Code, Consolas, Monaco, monospace",
                    lineNumbers: "on",
                    roundedSelection: true,
                    padding: { top: 16, bottom: 16 },
                    readOnly: disabled,
                    scrollbar: {
                      vertical: "auto",
                      horizontal: "auto",
                      useShadows: false,
                      verticalScrollbarSize: 8,
                      horizontalScrollbarSize: 8,
                    },
                    bracketPairColorization: {
                      enabled: true,
                    },
                    smoothScrolling: true,
                    cursorBlinking: "smooth",
                    cursorSmoothCaretAnimation: "on",
                    renderLineHighlight: "all",
                    renderWhitespace: "selection",
                    guides: {
                      indentation: true,
                      bracketPairs: true,
                    },
                  }}
                  onChange={onEditorChange}
                />
              </div>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};

interface StatsDisplayProps {
  lines: number;
  chars: number;
  bytes: number;
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({ lines, chars, bytes }) => {
  return (
    <div className="flex items-center gap-4 text-xs">
      <div className="flex items-center gap-1">
        <span className="text-muted-foreground">L:</span>
        <span className="font-mono font-semibold text-foreground/80">
          {lines}
        </span>
      </div>
      <div className="h-3 w-px bg-border" />
      <div className="flex items-center gap-1">
        <span className="text-muted-foreground">C:</span>
        <span className="font-mono font-semibold text-foreground/80">
          {chars}
        </span>
      </div>
      <div className="h-3 w-px bg-border" />
      <div className="flex items-center gap-1">
        <span className="text-muted-foreground">Size:</span>
        <span className="font-mono font-semibold text-foreground/80">
          {bytes} B
        </span>
      </div>
    </div>
  );
};

interface EditorFooterProps {
  bodyValue: string | undefined;
  disabled: boolean;
}

const EditorFooter: React.FC<EditorFooterProps> = ({ bodyValue, disabled }) => {
  const stats = useMemo(
    () => ({
      lines: bodyValue?.split("\n").length || 0,
      chars: bodyValue?.length || 0,
      bytes: new Blob([bodyValue || ""]).size,
    }),
    [bodyValue]
  );

  return (
    <div className="flex items-center justify-between px-4 py-1.5 bg-card border-t">
      <StatsDisplay
        lines={stats.lines}
        chars={stats.chars}
        bytes={stats.bytes}
      />
      <TooltipProvider>
        <Tooltip delayDuration={300}>
          <TooltipTrigger asChild>
            <Button type="submit" size="sm" variant="ghost" disabled={disabled}>
              <Save className="size-3.5 mr-1" />
              Save Changes
            </Button>
          </TooltipTrigger>
          <TooltipContent className="text-xs">
            Save current content and format to the form state.
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

// --- Main Component ---

interface CodeContentEditorProps {
  initialContent?: string;
  initialContentType?: "application/json" | "text/plain";
  onSave: (data: ContentEditorFormData) => void;
  minHeight?: string;
  disabled?: boolean;
}

/**
 * A sophisticated, generic code/text editor component using Monaco Editor.
 * Features: JSON/Text modes, Syntax Highlighting, Formatting, Copy, Stats, Tooltips.
 * State updates parent ONLY on 'Save Changes' button press.
 */
export const CodeContentEditor: React.FC<CodeContentEditorProps> = ({
  initialContent = "",
  initialContentType = "application/json",
  onSave,
  minHeight = "300px",
  disabled = false,
}) => {
  const { resolvedTheme } = useTheme();
  const { copyFn, copied } = useCopyToClipboard();

  const form = useForm<ContentEditorFormData>({
    resolver: zodResolver(contentEditorSchema),
    defaultValues: {
      contentType: initialContentType,
      body: initialContent,
    },
    mode: "onChange",
  });

  const contentType = form.watch("contentType");
  const bodyValue = form.watch("body");

  const handleEditorChange = useCallback(
    (value?: string) => {
      form.setValue("body", value || "", { shouldValidate: true });
    },
    [form]
  );

  const handleFormat = useCallback(() => {
    if (contentType === "application/json" && bodyValue) {
      try {
        const formatted = JSON.stringify(JSON.parse(bodyValue), null, 2);
        form.setValue("body", formatted);
        toast.success("JSON formatted successfully.");
      } catch (error) {
        toast.error("Invalid JSON format. Cannot format.");
      }
    }
  }, [contentType, bodyValue, form]);

  const handleReset = useCallback(() => {
    form.setValue("body", "");
    toast.info("Content cleared.");
  }, [form]);

  const handleCopy = useCallback(() => {
    if (bodyValue) {
      copyFn(bodyValue);
      toast.success("Content copied to clipboard.");
    }
  }, [bodyValue, copyFn]);

  const editorTheme = resolvedTheme === "dark" ? "vs-dark" : "light";

  return (
    <div className="flex flex-col rounded-lg border overflow-hidden shadow-xl">
      <TooltipProvider>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSave)}>
            <EditorHeader
              form={form}
              contentType={contentType}
              onFormat={handleFormat}
              onReset={handleReset}
              onCopy={handleCopy}
              copied={copied}
              disabled={disabled}
            />
            <CodeEditor
              form={form}
              contentType={contentType}
              editorTheme={editorTheme}
              onEditorChange={handleEditorChange}
              minHeight={minHeight}
              disabled={disabled}
            />
            <EditorFooter bodyValue={bodyValue} disabled={disabled} />
          </form>
        </Form>
      </TooltipProvider>
    </div>
  );
};
