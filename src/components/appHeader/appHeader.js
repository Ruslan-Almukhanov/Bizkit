import React from "react";
import styles from "./appHeader.module.css";
import plus from "../../assets/images/plus.png";

const AppHeader = ({ title, setEditClient, setPopUp }) => {
  return (
    <div className={styles.header}>
      <div className={styles.headerWrapper}>
        <h5 onClick={() => setEditClient(false)}>{title}</h5>
        <div>
          <button
            onClick={() => setPopUp(true)}
            style={{ display: "flex", alignItems: "center" }}
            className="btn"
          >
            <img style={{ marginRight: "12px" }} src={plus} alt="plus" />{" "}
            Добавить
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
