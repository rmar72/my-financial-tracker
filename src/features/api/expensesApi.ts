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
    updateExpense: builder.mutation<Expense, { id: number; data: Partial<Expense> }>({
      query: ({ id, data }) => ({
        url: `expenses/${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Expense']
    }),    
    getCategories: builder.query<{ id: number; name: string; budgetAmount: number | null }[], void>({
      query: () => 'categories',
      providesTags: ['Category']
    }),
    addCategory: builder.mutation<
      { id: number; name: string; budgetAmount: number },
      { name: string; budgetAmount: number }
    >({
      query: (body) => ({
        url: 'categories',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Category']
    }),
    updateCategory: builder.mutation<
        { id: number; name: string; budgetAmount: number | null },
        { id: number; data: { name: string; budgetAmount: number | null } }
      >({
        query: ({ id, data }) => ({
          url: `categories/${id}`,
          method: 'PUT',
          body: data
        }),
        invalidatesTags: ['Category']
    }),
  })
});

export const { 
  useGetExpensesQuery,
  useAddExpenseMutation,
  useDeleteExpenseMutation,
  useUpdateExpenseMutation,
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation
} = expensesApi;
