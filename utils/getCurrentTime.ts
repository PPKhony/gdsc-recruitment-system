// lib/getCurrentTime.ts
"use server"

export async function getCurrentTime(): Promise<string> {
  // Get the server's current time
  const now = new Date();
  return now.toISOString();
}
