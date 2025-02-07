import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  CircularProgress,
  Typography,
  Chip,
  Button,
} from "@mui/material";

export default function TransactionsTable({ transactions, loading }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (!transactions || transactions.length === 0) {
    return (
      <Box p={3} textAlign="center">
        <Typography color="text.secondary">No transactions found</Typography>
      </Box>
    );
  }

  const totalPages = Math.ceil(transactions.length / rowsPerPage);

  return (
    <Paper elevation={2}>
      <TableContainer>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "grey.100" }}>
              <TableCell sx={{ fontWeight: "bold", borderBottom: 2 }}>
                ID
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", borderBottom: 2 }}>
                Title
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", borderBottom: 2 }}>
                Description
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", borderBottom: 2 }}>
                Price
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", borderBottom: 2 }}>
                Category
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", borderBottom: 2 }}>
                Sold
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", borderBottom: 2 }}>
                Image
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((transaction) => (
                <TableRow
                  key={transaction._id}
                  hover
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { backgroundColor: "grey.50" },
                  }}
                >
                  <TableCell sx={{ borderBottom: 1 }}>
                    {transaction._id}
                  </TableCell>
                  <TableCell sx={{ borderBottom: 1 }}>
                    {transaction.title}
                  </TableCell>
                  <TableCell sx={{ borderBottom: 1 }}>
                    <Typography noWrap sx={{ maxWidth: 200 }}>
                      {transaction.description}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ borderBottom: 1 }}>
                    ${transaction.price?.toFixed(2)}
                  </TableCell>
                  <TableCell sx={{ borderBottom: 1 }}>
                    {transaction.category}
                  </TableCell>
                  <TableCell sx={{ borderBottom: 1 }}>
                    <Chip
                      label={transaction.sold ? "Yes" : "No"}
                      color={transaction.sold ? "success" : "error"}
                      size="small"
                      sx={{ minWidth: 60 }}
                    />
                  </TableCell>
                  <TableCell sx={{ borderBottom: 1 }}>
                    {transaction.image && (
                      <Box
                        component="img"
                        src={transaction.image}
                        alt={transaction.title}
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: 1,
                          objectFit: "cover",
                          border: "1px solid",
                          borderColor: "grey.300",
                        }}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          borderTop: 1,
          borderColor: "grey.200",
        }}
      >
        <Button
          variant="outlined"
          onClick={() => setPage(Math.max(0, page - 1))}
          disabled={page === 0}
          sx={{ minWidth: 100 }}
        >
          &lt; Previous
        </Button>
        <Typography variant="body2" sx={{ mx: 2 }}>
          Page {page + 1} of {totalPages}
        </Typography>
        <Button
          variant="outlined"
          onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
          disabled={page >= totalPages - 1}
          sx={{ minWidth: 100 }}
        >
          Next &gt;
        </Button>
      </Box>
    </Paper>
  );
}
