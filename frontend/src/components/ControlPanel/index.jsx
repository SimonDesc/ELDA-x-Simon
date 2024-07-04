import React from 'react';
import LogarithmicRangeSlider from '../LogarithmicSlider';
import './index.css';

// side bar to control map appearance
const ControlPanel = ({ data, onLogValueChange }) => {
	const label="Depth of snow :"
	return (
		<div className="control-panel">
			<h3>Layer :</h3>
			{data && (
				<LogarithmicRangeSlider
					minValue={data.min_snow_depth}
					maxValue={data.max_snow_depth}
					onLogValueChange={onLogValueChange}
					label={label}
				/>
			)}
		</div>
	);
};

export default ControlPanel;
