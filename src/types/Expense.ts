export interface Expense {
  id: number;
  amount: number;
  date: string; // ISO format from backend
  categoryId: number;
  paymentId: number;
  payment: { id: number, type: string },
  userId?: number;
  description?: string;
}
