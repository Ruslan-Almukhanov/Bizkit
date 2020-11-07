import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  container: {
    maxHeight: 440
  }
});

const CompanyBankDetails = ({ bankDetails }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
	console.log(bankDetails.results)
  return (
    <>
      <div>
        <h6>Банковские реквизиты компании</h6>
      </div>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Actions</TableCell>
                <TableCell>Банк</TableCell>
                <TableCell>Бик</TableCell>
                <TableCell>номер счета</TableCell>
                <TableCell>Валюта</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
							
              {
								
								
								bankDetails.results.map(result => (
                <TableRow hover role="checkbox" tabIndex={-1}>
                  <TableCell><CreateIcon/><DeleteIcon/></TableCell>
                  <TableCell>{result.bank}</TableCell>
                  <TableCell>{result.bank_id_code}</TableCell>
                  <TableCell>{result.account_number}</TableCell>
                  <TableCell>{result.currency}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};

export default CompanyBankDetails;
