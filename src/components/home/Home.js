import React from "react";
import TextField from "@material-ui/core/TextField";
import styles from "./Home.module.css";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      marginBottom: "28px"
    }
  }
}));

const Home = () => {
  const classes = useStyles();

  const postData = e => {
    const form = e.currentTarget;
    const formData = new FormData(form);
    const plainFormData = Object.fromEntries(formData.entries());

    e.preventDefault();
    async function postData(url = "") {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(plainFormData)
      });
      return await response.json();
    }

    postData("http://194.67.90.67/api/v1/token/").then(data => {
      document.cookie = `token=${data.access}`;
    });
  };
  return (
    <form onSubmit={postData} className={styles.form}>
      <div className={classes.root}>
        <h5 className={styles.signup}>Авторизация</h5>
        <TextField
          name="email"
          className={classes.root}
          fullWidth={true}
          variant="outlined"
          label="Email"
        />
        <TextField
          name="password"
          variant="outlined"
          fullWidth
          label="Пароль"
        />
      </div>
      <button className={styles.btn}>Войти</button>
    </form>
  );
};

export default Home;
