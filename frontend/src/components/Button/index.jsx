import React from 'react';
import './index.css';

const Button = ({ name, type, options }) => {
	return (
		<div className="button-item">
			<label className="button-label">{name}</label>
			{type === 'dropdown' && (
				<select className="button-element">
					{options.map((option, index) => (
						<option key={index} value={option}>
							{option}
						</option>
					))}
				</select>
			)}
			{type === 'checkbox' && (
				<input type="checkbox" className="button-element" />
			)}
			{type === 'range' && (
				<input type="range" className="button-element" />
			)}
			{!type && (
				<button className="button-element">{name}</button>
			)}
		</div>
	);
};

export default Button;
