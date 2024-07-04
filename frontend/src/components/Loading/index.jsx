import React from 'react';
import './index.css';

const Loading = ({ isLoading }) => {
	return (
		<div className="loading">
			{isLoading && <p>Loading data in progress...</p>}
		</div>
	);
};

export default Loading;
