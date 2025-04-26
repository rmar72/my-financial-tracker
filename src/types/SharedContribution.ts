export interface SharedContribution {
  id: number;
  amount: number;
  date: string; // ISO format
  contributor: string;
  method: string; // e.g., Venmo, CashApp, etc.
  expenseId: number;
}
