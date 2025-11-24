import api from "./api";

export type Quote = {
  id: string;
  name: string;
  email: string;
  address: string;
  phone?: string;
  averageMonthlyBill: number;
  estimatedSavings: number;
  createdAt: string;
};

export type CreateQuoteInput = {
  name: string;
  email: string;
  address: string;
  phone?: string;
  averageMonthlyBill: number;
};

export async function createQuote(input: CreateQuoteInput): Promise<Quote> {
  const res = await api.post<Quote>("/quotes", input);
  return res.data;
}

export async function getQuotes(): Promise<Quote[]> {
  const res = await api.get<Quote[]>("/quotes");
  return res.data;
}
