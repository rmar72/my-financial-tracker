import { SharedContribution } from './SharedContribution';
export interface Expense {
  id: number;
  amount: number;
  date: string; // ISO format from backend
  categoryId: number;
  paymentId: number;
  payment: { id: number, type: string },
  userId?: number;
  description?: string;
  isShared: boolean;
  sharedContributions: SharedContribution[];
  netAmount: number;
}
