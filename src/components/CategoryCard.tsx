import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import { Expense } from '../types/Expense';

interface Props {
  categoryId: number;
  expenses: Expense[];
}

const CategoryCard: React.FC<Props> = ({ categoryId, expenses }) => {
  const total = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Category ID: {categoryId}
        </Typography>

        <Typography variant="subtitle2" gutterBottom>
          Total: ${total.toFixed(2)}
        </Typography>

        <List dense disablePadding>
          {expenses.map((expense) => (
            <React.Fragment key={expense.id}>
              <ListItem>
                <ListItemText
                  primary={`$${Number(expense.amount).toFixed(2)} – ${expense.description || 'No description'}`}
                  secondary={new Date(expense.date).toLocaleDateString()}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
