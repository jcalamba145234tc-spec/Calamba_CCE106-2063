import { API_CONFIG } from "./api-config";

export type Quote = {
  id: number;
  quote: string;
  author: string;
};

export async function fetchRandomQuote(signal?: AbortSignal): Promise<Quote> {
  const response = await fetch(API_CONFIG.quoteUrl, { signal, headers: { Accept: "application/json" } });
  if (!response.ok) {
    throw new Error(`The quotes service returned an error (${response.status}).`);
  }

  const data: unknown = await response.json();
  if (
    typeof data !== "object" ||
    data === null ||
    !("quote" in data) ||
    !("author" in data) ||
    typeof data.quote !== "string" ||
    typeof data.author !== "string" ||
    !data.quote.trim() ||
    !data.author.trim()
  ) {
    throw new Error("The quotes service returned an invalid quote.");
  }

  return {
    id: "id" in data && typeof data.id === "number" ? data.id : Date.now(),
    quote: data.quote,
    author: data.author,
  };
}
