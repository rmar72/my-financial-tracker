import { apiSlice } from './apiSlice';
import { Expense } from '../../types/Expense';

export const expensesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getExpenses: builder.query<Expense[], void>({
      query: () => 'expenses',
      providesTags: ['Expense']
    }),
    addExpense: builder.mutation<Expense, Partial<Expense>>({
      query: (expense) => ({
        url: 'expenses',
        method: 'POST',
        body: expense
      }),
      invalidatesTags: ['Expense']
    })
  })
});

export const { useGetExpensesQuery, useAddExpenseMutation } = expensesApi;
