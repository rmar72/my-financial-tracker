import React from 'react';
import { Box, Stack, Button } from '@mui/material';
import { SharedContribution } from '../types/SharedContribution';

interface Props {
  contributions: SharedContribution[];
  onEdit: (contrib: SharedContribution) => void;
  onDelete: (id: number) => void;
  onAddNew: () => void;
}

const MiniReceiptList: React.FC<Props> = ({
  contributions,
  onEdit,
  onDelete,
  onAddNew
}) => (
  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
    {contributions.map((contrib) => (
      <Box
        key={contrib.id}
        sx={{
          fontSize: 14,
          color: 'grey.800',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2,
          bgcolor: '#f7f7f7',
          p: 1,
          borderRadius: 1,
          minWidth: 300
        }}
      >
        <Box>
          {contrib.contributor} paid ${Number(contrib.amount).toFixed(2)} via {contrib.method} on{' '}
          {new Date(contrib.date).toLocaleDateString('en-US')}
        </Box>
        <Stack direction="row" spacing={1}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => onEdit(contrib)}
          >
            Edit
          </Button>
          <Button
            size="small"
            color="error"
            variant="outlined"
            onClick={() => onDelete(contrib.id)}
          >
            Delete
          </Button>
        </Stack>
      </Box>
    ))}

    <Box mt={2}>
      <Button size="small" variant="outlined" onClick={onAddNew}>
        Add New
      </Button>
    </Box>
  </Stack>
);

export default MiniReceiptList;
