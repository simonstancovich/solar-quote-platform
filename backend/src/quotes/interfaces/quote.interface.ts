export interface Quote {
  id: string;
  name: string;
  email: string;
  address: string;
  phone?: string;
  averageMonthlyBill: number;
  estimatedSavings: number;
  createdAt: string;
}
