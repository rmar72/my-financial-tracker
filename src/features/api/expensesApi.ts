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
    }),
    deleteExpense: builder.mutation<void, number>({
      query: (id) => ({
        url: `expenses/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Expense']
    }),
    getCategories: builder.query<{ id: number; name: string }[], void>({
      query: () => 'categories',
      providesTags: ['Category']
    }),
  })
});

export const { 
  useGetExpensesQuery,
  useAddExpenseMutation,
  useDeleteExpenseMutation,
  useGetCategoriesQuery
} = expensesApi;
