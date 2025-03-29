import React, { useState } from 'react';
import {
  Card,
  Box,
  Typography,
  Slider,
  CardActionArea
} from '@mui/material';
import { sliderClasses } from '@mui/material/Slider';
import { Expense } from '../types/Expense';
import CategoryExpensesModal from './CategoryExpensesModal';

interface Props {
  categoryId: number;
  expenses: Expense[];
  categories: { id: number; name: string }[];
}

const CategoryCard: React.FC<Props> = ({ categoryId, expenses, categories }) => {
  const [open, setOpen] = useState(false);

  const total = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  const budget = 500; // 🔧 Mock budget for now
  const percentUsed = Math.min((total / budget) * 100, 100);
  const usageDisplay = `${Math.round(total)} / ${budget}`;

  const category = categories.find((c) => c.id === categoryId);
  const categoryName = category ? category.name : `Category ${categoryId}`;

  return (
    <>
      <Card
        elevation={0}
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: 2,
          minWidth: 280,
          borderRadius: '12px',
          boxShadow: '0 2px 4px 0 rgba(138, 148, 159, 0.2)',
          '& > *:nth-of-type(1)': {
            marginRight: 2
          },
          '& > *:nth-of-type(2)': {
            flex: 1
          }
        }}
      >
          <CardActionArea
            onClick={() => setOpen(true)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              padding: '20px',
              '& .MuiCardActionArea-focusHighlight': {
                opacity: 0,
                background: 'transparent'
              }
            }}
          >
          <Box>
            <Typography sx={{ fontSize: 16, fontWeight: 600 }}>
              {categoryName}
            </Typography>
            <Typography
              sx={{
                fontSize: 14,
                color: 'grey.600',
                letterSpacing: '0.5px',
                mb: 0.5
              }}
            >
              Total Spent: ${total.toFixed(2)}
            </Typography>

            <Box display="flex" alignItems="center">
              <Slider
                value={percentUsed}
                sx={{
                  height: 4,
                  flex: 1,
                  [`& .${sliderClasses.rail}`]: {
                    borderRadius: '10px',
                    height: 4,
                    backgroundColor: 'rgb(202,211,216)'
                  },
                  [`& .${sliderClasses.track}`]: {
                    borderRadius: '10px',
                    height: 4,
                    backgroundColor: percentUsed > 90 ? 'error.main' : 'primary.main',
                    border: 'none'
                  },
                  [`& .${sliderClasses.thumb}`]: {
                    display: 'none'
                  }
                }}
              />
              <Box
                component="span"
                sx={{ marginLeft: 1, fontSize: 13, color: 'grey.600' }}
              >
                {usageDisplay}
              </Box>
            </Box>
          </Box>
        </CardActionArea>
      </Card>

      <CategoryExpensesModal
        open={open}
        onClose={() => setOpen(false)}
        categoryId={categoryId}
        expenses={expenses}
        categoryName={categoryName}
        categories={categories}
      />
    </>
  );
};

export default CategoryCard;
