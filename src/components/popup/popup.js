import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./popup.module.css";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  input: {
    width: "244px",
    marginBottom: "25px",
    "&::placeholder": {
      fontSize: "12px"
    }
  },
  largeInput: {
    marginBottom: "25px"
  }
});

const postClient = e => {
	e.preventDefault();
	
  const form = e.currentTarget;
  const formData = new FormData(form);
  const plainFormData = Object.fromEntries(formData.entries());

  async function postData(url = "") {
		const token = document.cookie.replace(
			/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
			"$1"
		);

    const response = await fetch(url, {
      method: "POST",
			headers: new Headers({
				"Content-Type": "application/json",
				Authorization: "Bearer " + token
			}),
      body: JSON.stringify(plainFormData)
    });
    return await response.json();
  }

	postData("http://194.67.90.67/api/v1/companies/").then(data => {
    console.log(data);
		
  });
};

const Popup = ({ setPopUp }) => {
  const classes = useStyles();

  return (
    <div className={styles.overlay}>
      <div className={styles.wrap}>
        <form onSubmit={postClient}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h6>Добавить клиента</h6>
            <CloseIcon onClick={() => setPopUp(false)} />
          </div>

          <div className={styles.inputBlock}>
            <TextField
              className={classes.input}
              name="name"
              variant="outlined"
              label="Наименование компании"
            />
            <TextField
              className={classes.input}
              name="shortname"
              variant="outlined"
              label="Короткое название"
            />
          </div>
          <div className={styles.inputBlock}>
            <TextField
              className={classes.input}
							name="registered_name"
              variant="outlined"
              label="Тип юр.лица"
            />
            <TextField
              className={classes.input}
							name="workscope"
              variant="outlined"
              label="Сфера деятельности"
            />
          </div>
          <div className={styles.inputBlock}>
            <TextField
              className={classes.input}
              name="region"
              variant="outlined"
              label="Регион"
            />
            <TextField
              className={classes.input}
              name="city"
              variant="outlined"
              label="Город"
            />
          </div>
          <div className={styles.inputBlock}>
            <TextField
              className={classes.input}
              name="email"
              variant="outlined"
              label="Email"
            />
            <TextField
              className={classes.input}
              name="phone"
              variant="outlined"
              label="Телефон"
            />
          </div>
          <TextField
						name="description"
            variant="outlined"
            fullWidth
            label="Дополнительно (описание)"
          />
          <div style={{ textAlign: "right", marginTop: "23px" }}>
            <Button type="submit" variant="contained" color="primary">
              Добавить
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;
