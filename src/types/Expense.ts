export interface Expense {
  id: number;
  amount: number;
  date: string; // ISO format from backend
  categoryId: number;
  paymentId: number;
  userId?: number;
  description?: string;
}
