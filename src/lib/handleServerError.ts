import { ServerActionResponse } from "@/types/server";

export function handleServerError(
  error: unknown,
  actionName: string
): ServerActionResponse<null> {
  const message =
    error instanceof Error ? error.message : "An unknown error occurred";

  console.error(`[${actionName}]: Error`, { message, error });

  return {
    success: false,
    message,
    data: null,
  };
}
