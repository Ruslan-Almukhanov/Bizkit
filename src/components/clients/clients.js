import React, { useState } from "react";
import AppHeader from "../appHeader";
import ClientsList from "../clientsList";
import EditClient from "../editClient";
import styles from './clients.module.css'
import Popup from '../popup'

const Clients = () => {
  const [editClient, setEditClient] = useState(false);
  const [idClient, setIdClient] = useState("");
  const [popUp, setPopUp] = useState(false)
  const editHandler = id => {
    setIdClient(id);
    setEditClient(true);
  };
  return (
    <>
      <div className={styles.header}>
        <AppHeader setPopUp={setPopUp} title="Клиенты" setEditClient={setEditClient} />
      </div>
      <div className={styles.wrap}>
        {editClient ? <EditClient idClient={idClient}/> : <ClientsList editHandler={editHandler} />}
      </div>
      {
        popUp && <Popup setPopUp={setPopUp}/>
      }
    </>
  );
};

export default Clients;
