import React from 'react'
import styles from "./sidebar.module.css";
import logo from '../../assets/images/logo.png'
import clients from '../../assets/images/clients.svg'
import exit from '../../assets/images/exit.svg'
import { Link } from "react-router-dom";

const SideBar = () => {
	return (
		<div className={styles.sidebar}>
			<div className={styles.logoBlock}>
				<img src={logo} alt="logo"/>
			</div>
			<nav>
				<ul>
					<li className={styles.menuItem}>
						<span>
							<img src={clients} alt="clients"/>
						</span>
						<Link className={styles.menuLink} to="/clients">
							Клиенты
						</Link>
					</li>
					<li className={styles.menuItem}>
						<span>
							<img src={exit} alt="clients" />
						</span>
						<Link className={styles.menuLink} to="/">
							Выход
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default SideBar
