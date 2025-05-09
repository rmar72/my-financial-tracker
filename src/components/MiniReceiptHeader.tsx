import { Box, Divider } from '@mui/material';

interface Props {
  grossAmount: number;
  netAmount: number;
  contributionsAmount: number;
}

const MiniReceiptHeader: React.FC<Props> = ({ grossAmount, netAmount, contributionsAmount }) => (
  <Box sx={{ textAlign: 'center' }}>
    <Box
      sx={{
        backgroundColor: '#C9E4DE',
        px: 1.5,
        py: 0.75,
        borderRadius: 2,
        fontWeight: 600,
        fontSize: '0.85rem',
        color: '#00695c',
        display: 'inline-block',
        mb: 2
      }}
    >
      Gross Amount: ${Number(grossAmount).toFixed(2)}
    </Box>

    <Box
      sx={{
        backgroundColor: '#C6DEF1',
        px: 1.5,
        py: 0.75,
        borderRadius: 2,
        fontWeight: 600,
        fontSize: '0.85rem',
        color: '#00695c',
        display: 'inline-block',
        mb: 2,
        ml: 2
      }}
    >
      Net Amount: {netAmount != null ? `$ ${Number(netAmount).toFixed(2)}` : 'N/A'}
    </Box>

    <Box
      sx={{
        backgroundColor: '#FAEDCB',
        px: 1.5,
        py: 0.75,
        borderRadius: 2,
        fontWeight: 600,
        fontSize: '0.85rem',
        color: '#00695c',
        display: 'inline-block',
        mb: 2,
        ml: 2
      }}
    >
      Contributions Amount: {contributionsAmount != null ? `$ ${Number(contributionsAmount).toFixed(2)}` : 'N/A'}
    </Box>

    <Divider sx={{ mt: '-5px', mb: 0.5 }} />
  </Box>
);

export default MiniReceiptHeader;
