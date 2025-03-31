import React from 'react';
import { Card, Typography } from '@mui/material';

interface Props {
  onAdd: (name: string) => Promise<void>;
}

const AddCategoryCard: React.FC<Props> = ({ onAdd }) => {
  const handleClick = async () => {
    const name = prompt('Enter new category name');
    if (name && name.trim()) {
      try {
        await onAdd(name.trim());
      } catch (err) {
        console.error('Failed to add category', err);
      }
    }
  };

  return (
    <Card
      elevation={0}
      onClick={handleClick}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        py: 3,
        mt: '10px',
        minWidth: 200,
        maxWidth: 250,
        height: '100px',
        borderRadius: '16px',
        background: 'white',
        textAlign: 'center',
        boxShadow: `
          6px 6px 12px #bebebe,
          -0px -2px 12px #ffffff
        `,
        cursor: 'pointer',
        width: '100%',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'scale(1.015)',
          boxShadow: `
            4px 4px 8px #bebebe,
            -4px -4px 8px #ffffff
          `
        }
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 500, color: 'grey.600',         textAlign: 'center', }}>
        + Add Category
      </Typography>
    </Card>
  );
};

export default AddCategoryCard;
