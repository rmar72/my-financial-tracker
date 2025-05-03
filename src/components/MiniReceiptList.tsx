import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  IconButton,
  Paper,
  Stack
} from '@mui/material';
import { SharedContribution } from '../types/SharedContribution';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Props {
  contributions: SharedContribution[];
  onEdit: (contrib: SharedContribution) => void;
  onDelete: (id: number) => void;
}

const MiniReceiptList: React.FC<Props> = ({
  contributions,
  onEdit,
  onDelete
}) => (
  <Box sx={{ mb: 3 }}>
    <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2, mt: 0, }}>
      <Table size="small">
        <TableBody>
          {contributions.map((contrib) => (
            <TableRow key={contrib.id}>
              <TableCell sx={{ fontSize: 14 }}>
                {contrib.contributor} paid ${Number(contrib.amount).toFixed(2)} via {contrib.method} on {new Date(contrib.date).toLocaleDateString('en-US')}
              </TableCell>
              <TableCell align="right">
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <IconButton size="small" onClick={() => onEdit(contrib)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton color="error" size="small" onClick={() => onDelete(contrib.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);

export default MiniReceiptList;
