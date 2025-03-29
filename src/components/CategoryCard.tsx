// import React from 'react';
// import {
//   Card,
//   CardContent,
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   Divider
// } from '@mui/material';
// import { Expense } from '../types/Expense';

// interface Props {
//   categoryId: number;
//   expenses: Expense[];
// }

// const CategoryCard: React.FC<Props> = ({ categoryId, expenses }) => {
//   const total = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

//   return (
//     <Card variant="outlined">
//       <CardContent>
//         <Typography variant="h6" gutterBottom>
//           Category ID: {categoryId}
//         </Typography>

//         <Typography variant="subtitle2" gutterBottom>
//           Total: ${total.toFixed(2)}
//         </Typography>

//         <List dense disablePadding>
//           {expenses.map((expense) => (
//             <React.Fragment key={expense.id}>
//               <ListItem>
//                 <ListItemText
//                   primary={`$${Number(expense.amount).toFixed(2)} – ${expense.description || 'No description'}`}
//                   secondary={new Date(expense.date).toLocaleDateString()}
//                 />
//               </ListItem>
//               <Divider />
//             </React.Fragment>
//           ))}
//         </List>
//       </CardContent>
//     </Card>
//   );
// };

// export default CategoryCard;


import React, { useState } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  Typography
} from '@mui/material';
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

  const category = categories.find((c) => c.id === categoryId);
  const categoryName = category ? category.name : `Category ${categoryId}`;

  return (
    <>
      <Card variant="outlined">
        <CardActionArea onClick={() => setOpen(true)}>
          <CardContent>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              {categoryName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total: ${total.toFixed(2)}
            </Typography>
          </CardContent>
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
