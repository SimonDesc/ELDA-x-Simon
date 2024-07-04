import React from 'react';
import './index.css';

const Navbar = () => {
	return (
		<div className="navbar">
			<div className="logo">
				<img src='https://eldatechnology.fr/wp-content/uploads/2023/01/ELDA-TECHNOLOGY.png' width={150} alt="logo ELDA" />
			</div>
			<div className="navbar-text">Protoype projet ELDA x Simon</div>
		</div>
	);
};

export default Navbar;
