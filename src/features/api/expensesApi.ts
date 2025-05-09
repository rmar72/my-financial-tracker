import { apiSlice } from './apiSlice';
import { Expense } from '../../types/Expense';
import { SharedContribution } from '../../types/SharedContribution';

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
    addSharedContribution: builder.mutation<
      SharedContribution,
      Partial<SharedContribution> & { expenseId: number }
    >({
      query: ({ expenseId, ...contribution }) => ({
        url: `expenses/${expenseId}/shared-contributions`, // ✅ correct url
        method: 'POST',
        body: contribution // ✅ now matches backend expecting { amount, contributor, method, date }
      }),
      invalidatesTags: ['Expense']
    }),
    updateSharedContribution: builder.mutation<
      SharedContribution,
      { id: number; contributor: string; amount: number; method: string; date: string }
    >({
      query: ({ id, ...body }) => ({
        url: `shared-contributions/${id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Expense'],
    }),
    deleteSharedContribution: builder.mutation<void, number>({
      query: (id) => ({
        url: `shared-contributions/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Expense'],
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
  useUpdateCategoryMutation,
  useAddSharedContributionMutation,
  useUpdateSharedContributionMutation,
  useDeleteSharedContributionMutation
} = expensesApi;
