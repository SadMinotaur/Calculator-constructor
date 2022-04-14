import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

export default function sagaError(
  action: ActionCreatorWithPayload<string, string>,
  error: unknown
): void {
  if (error instanceof Error) {
    console.log(error);
  }
}
