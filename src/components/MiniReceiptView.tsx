import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import { SharedContribution } from '../types/SharedContribution';
import {
  useGetExpensesQuery,
  useUpdateExpenseMutation,
  useAddSharedContributionMutation,
  useUpdateSharedContributionMutation,
  useDeleteSharedContributionMutation,
} from '../features/api/expensesApi';

import MiniReceiptHeader from './MiniReceiptHeader';
import MiniReceiptForm from './MiniReceiptForm';
import MiniReceiptList from './MiniReceiptList';

interface Props {
  contributions: SharedContribution[];
  grossAmount: number;
  netAmount: number;
  contributionsAmount: number;
  onCollapse: () => void;
  expenseId: number;
}

const MiniReceiptView: React.FC<Props> = ({
  contributions,
  grossAmount,
  netAmount,
  contributionsAmount,
  onCollapse,
  expenseId
}) => {
  const [addSharedContribution] = useAddSharedContributionMutation();
  const [updateExpense] = useUpdateExpenseMutation();
  const [updateSharedContribution] = useUpdateSharedContributionMutation();
  const [deleteSharedContribution] = useDeleteSharedContributionMutation();
  const { refetch } = useGetExpensesQuery();

  const [editingContribution, setEditingContribution] = useState<SharedContribution | null>(null);
  const [form, setForm] = useState({
    contributor: '',
    amount: '',
    method: '',
    date: new Date()
  });

  useEffect(() => {
    if (editingContribution) {
      setForm({
        contributor: editingContribution.contributor,
        amount: editingContribution.amount.toString(),
        method: editingContribution.method,
        date: new Date(editingContribution.date)
      });

    }
  }, [editingContribution]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (newDate: Date | null) => {
    if (newDate) setForm({ ...form, date: newDate });
  };

  const handleCancel = () => {
    onCollapse();

    setEditingContribution(null);
    resetForm();
  };

  const resetForm = () => {
    setForm({
      contributor: '',
      amount: '',
      method: '',
      date: new Date()
    });
  };

  const handleSave = async () => {
    try {
      if (editingContribution) {
        await updateSharedContribution({
          id: editingContribution.id,
          contributor: form.contributor,
          amount: parseFloat(form.amount),
          method: form.method,
          date: form.date.toISOString(),
        }).unwrap();
      } else {
        await addSharedContribution({
          contributor: form.contributor,
          amount: parseFloat(form.amount),
          method: form.method,
          date: form.date.toISOString(),
          expenseId
        }).unwrap();

        await updateExpense({
          id: expenseId,
          data: { isShared: true }
        }).unwrap();
      }


      setEditingContribution(null);
      resetForm();
      await refetch();
    } catch (err) {
      console.error('Failed to save contribution or update expense', err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteSharedContribution(id).unwrap();
      await refetch();
    } catch (err) {
      console.error('Failed to delete contribution', err);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#fafafa',
        padding: 2,
        borderRadius: 2,
        boxShadow: 'inset 0 0 4px rgba(0,0,0,0.1)',
        marginTop: 0,
        marginBottom: 2,
        mr: 1,
      }}
    >
      <MiniReceiptHeader
        grossAmount={grossAmount}
        netAmount={netAmount}
        contributionsAmount={contributionsAmount}
      />
      <MiniReceiptList
        contributions={contributions}
        onEdit={(contrib) => setEditingContribution(contrib)}
        onDelete={handleDelete}
        onAddNew={() => {
          setEditingContribution(null);
        }}
      />
      <MiniReceiptForm
        form={form}
        onChange={handleChange}
        onDateChange={handleDateChange}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </Box>
  );
};

export default MiniReceiptView;
