import React, { useState } from "react";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./clientInformationForm.module.css";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  input: {
    width: "211px",
    marginBottom: "25px"
  },
  largeInput: {
    marginBottom: "25px"
  }
});

const ClientInformationForm = ({ client, companyInfo }) => {
  const [value, setValue] = useState(0);

  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
	};

	async function postData(url = "", token, form) {
		const response = await fetch(url, {
			method: "PUT",
			headers: new Headers({
				'Content-Type': 'application/json',
				Authorization: "Bearer " + token
			}),
			body: JSON.stringify(form)
		});
		return await response.text();
	}
	
	const editCompanyInfo = (e) => {
		e.preventDefault();
		const raw = "{\n    \"name\": \"<string>\",\n    \"is_owner\": \"<boolean>\",\n    \"shortname\": \"<string>\",\n    \"type\": \"<integer>\",\n    \"registered_type\": \"<string>\",\n    \"registered_name\": \"<string>\",\n    \"address\": \"<string>\",\n    \"registered_address\": \"<string>\",\n    \"bin_iin\": \"<integer>\",\n    \"tax_payer\": \"<boolean>\",\n    \"leader_position\": \"<string>\",\n    \"leader\": \"<string>\",\n    \"region\": \"<string>\",\n    \"city\": \"<string>\",\n    \"workscope\": \"<string>\",\n    \"email\": \"<email>\",\n    \"phone\": \"<string>\",\n    \"description\": \"<string>\"\n}";
		
		const form = e.currentTarget
		const formData = new FormData(form)
		const plainFormData = Object.fromEntries(formData.entries());
		
		console.log(plainFormData);
			

	
	const token = document.cookie.replace(
		/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
		"$1"
	);

	postData(`http://194.67.90.67/api/v1/companies/${client.id}`, token, plainFormData).then(data => {
		console.log(data);

	});
}

  const checkData = value => {
    return value ? value : "нет данных...";
  };

  return (
    <form onSubmit={editCompanyInfo}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div className={styles.blockForm}>
          <h6>Основная информация</h6>
          <TextField
            className={classes.largeInput}
            name="name"
            variant="outlined"
            defaultValue=" "
            value={checkData(client.name)}
            fullWidth
            label="Наименование компании"
          />
          <div className={styles.inputBlock}>
            <TextField
              className={classes.input}
              defaultValue=" "
              value={checkData(client.shortname)}
              name="shortname"
              variant="outlined"
              label="Короткое название"
            />
            <TextField
              className={classes.input}
              defaultValue=" "
              value={checkData(client.workscope)}
              name="typeBussines"
              variant="outlined"
              label="Сфера деятельности"
            />
          </div>
          <div className={styles.inputBlock}>
            <TextField
              className={classes.input}
              defaultValue=" "
              value={checkData(client.region)}
              name="region"
              variant="outlined"
              label="Регион"
            />
            <TextField
              className={classes.input}
              defaultValue=" "
              value={checkData(client.city)}
              name="city"
              variant="outlined"
              label="Город"
            />
          </div>
          <div className={styles.inputBlock}>
            <TextField
              className={classes.input}
              defaultValue=" "
              value={checkData(client.email)}
              name="email"
              variant="outlined"
              label="Email"
            />
            <TextField
              className={classes.input}
              defaultValue=" "
              value={checkData(client.phone)}
              name="phone"
              variant="outlined"
              label="Телефон"
            />
          </div>
          <TextField
            name="additInfo"
            defaultValue=" "
            value={checkData(client.description)}
            variant="outlined"
            fullWidth
            label="Дополнительно (описание)"
          />
        </div>
        <div className={styles.blockForm}>
          <h6>Реквизиты компании</h6>
          <TextField
            className={classes.largeInput}
            defaultValue=" "
            value={checkData(companyInfo.name)}
            name="nameLaw"
            variant="outlined"
            fullWidth
            label="Наименование юр.лица"
          />
          <div className={styles.inputBlock}>
            <TextField
              className={classes.input}
              defaultValue=" "
              value={checkData(companyInfo.registered_type)}
              name="type"
              variant="outlined"
              label="Тип юр.лица"
            />
            <TextField
              className={classes.input}
              defaultValue=" "
              value={checkData(companyInfo.bin_iin)}
							name="bin_iin"
              variant="outlined"
              label="БИН/ИИН"
            />
          </div>
          <div className={styles.inputBlock}>
            <TextField
              className={classes.input}
              defaultValue=" "
              value={checkData(companyInfo.leader)}
              name="leader"
              variant="outlined"
              label="Руководитель"
            />
            <TextField
              className={classes.input}
              defaultValue=" "
              value={checkData(companyInfo.leader_position)}
              name="leader_position"
              variant="outlined"
              label="Должность руководителя"
            />
          </div>
          <div className={styles.inputBlock}>
            <TextField
              className={classes.input}
              defaultValue=" "
              value={checkData(companyInfo.registered_address)}
							name="registered_address"
              variant="outlined"
              label="Юридический адрес"
            />
            <TextField
              className={classes.input}
              defaultValue=" "
              value={checkData(companyInfo.address)}
              name="adress"
              variant="outlined"
              label="Фактический адрес"
            />
          </div>
          <div>
            <span>Плательщик НДС (нет/да)</span>
            <Switch
              // checked={state.checkedB}
              // onChange={handleChange}
							name="tax_payer"
              color="primary"
            />
          </div>
          <div style={{textAlign: 'right'}}>
            <Button type="submit" variant="contained" color="primary">
              Сохранить
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ClientInformationForm;
