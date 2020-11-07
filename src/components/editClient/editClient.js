import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";
import ClientInformationForm from "../clientInformationForm";
import CompanyBankDetails from "../companyBankDetails";

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

const EditClient = ({idClient}) => {
	const [client, setClient] = useState({});
	const [companyInfo, setCompanyInfo] = useState({})
	const [bankDetails, setBankDetails] = useState({})
	const [value, setValue] = useState(0);
	
	const classes = useStyles();
  
  const handleChange = (event, newValue) => {		
    setValue(newValue);
	};
	
	const token = document.cookie.replace(
		/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
		"$1"
	);

  useEffect(() => {
		async function getData(url = "", token) {
      const response = await fetch(url, {
				method: "GET",
        headers: new Headers({
          Authorization: "Bearer " + token
        })
			});
			
      return await response.json();
    }

    getData(
      `http://194.67.90.67/api/v1/companies/${idClient}`,
      token
    ).then(data => {
			setClient(data)
		});
		////put
		getData(
			`http://194.67.90.67/api/v1/companies/${idClient}`,
			token
		).then(data => {			
			setCompanyInfo(data);
		});

		getData(
			`http://194.67.90.67/api/v1/companies/${idClient}/bank_details`,
			token
		).then(data => {
			console.log(data);
			
			setBankDetails(data);
		});
		console.log(bankDetails);		
	}, [idClient]);

  return (
    <div style={{padding: "28px 40px 40px 40px"}}>
      <div>
        <Paper className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
          >
						<Tab label="Информация" />
            <Tab label="Банковские реквизиты" />
          </Tabs>
        </Paper>
      </div>
      {value ? <CompanyBankDetails bankDetails={bankDetails} /> : <ClientInformationForm companyInfo={companyInfo} client={client}/>}
    </div>
  );
};

export default EditClient;
