import React, { useState, useEffect } from "react";
import styles from "./clientsList.module.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ReplayIcon from "@material-ui/icons/Replay";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import loading from "../../assets/images/loading.svg";

const useStyles = makeStyles(theme => ({
  formControl: {
    marginRight: 24,
    width: 211,
    height: 36
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const ClientsList = ({ editHandler }) => {
  const [companies, setCompanies] = useState([]);
  const [rendering, setRendering] = useState(true);
  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  async function getData(url = "") {
    const response = await fetch(url, {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + token
      })
    });
    return await response.json();
  }

  async function deleteData(url = "") {
    const response = await fetch(url, {
      method: "DELETE",
      headers: new Headers({
        Authorization: "Bearer " + token
      })
    });
    return await response.text();
  }

  useEffect(() => {
    getData("http://194.67.90.67/api/v1/companies").then(data => {
      setCompanies(() => {
        return data.results.filter(result => result.name !== "");
      });
      setRendering(false);
    });
  }, [rendering]);

  const deleteHandler = id => {
    deleteData(`http://194.67.90.67/api/v1/companies/${id}`, "DELETE").then(
      data => {
        setRendering(true);
      }
    );
  };
  const classes = useStyles();
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: "28px 0 40px 30px"
        }}
      >
        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            variant="outlined"
            className={classes.input}
            label="Наименование компании"
          />
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="outlined-age-native-simple">
            Тип юр.лица
          </InputLabel>
          <Select
            native
            label="Age"
            inputProps={{
              name: "age",
              id: "outlined-age-native-simple"
            }}
          >
            <option aria-label="None" value="" />
            <option value={10}>ТОО</option>
            <option value={20}>ИП</option>
            <option value={30}>АО</option>
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="outlined-age-native-simple">Регион</InputLabel>
          <Select
            native
            label="Age"
            inputProps={{
              name: "age",
              id: "outlined-age-native-simple"
            }}
          >
            <option aria-label="None" value="" />
            {companies.map((company, i) => (
              <option key={i} value={i}>
                {company.region}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" className={classes.formControl}>
          <TextField variant="outlined" label="Город" />
        </FormControl>
        <ReplayIcon />
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Наименование компании</TableCell>
                <TableCell>Тип юр.лица</TableCell>
                <TableCell>Регион</TableCell>
                <TableCell>Город</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {companies.map(company => (
                <TableRow key={company.id}>
                  <TableCell component="th" scope="row">
                    {company.name}
                  </TableCell>
                  <TableCell></TableCell>
                  <TableCell>{company.region}</TableCell>
                  <TableCell>{company.city}</TableCell>
                  <TableCell>
                    <CreateIcon
                      onClick={() => editHandler(company.id)}
                      className={styles.icon}
                    />
                    <DeleteIcon
                      onClick={() => deleteHandler(company.id)}
                      className={styles.icon}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {rendering && <img className={styles.loader} src={loading} />}
    </>
  );
};

export default ClientsList;
