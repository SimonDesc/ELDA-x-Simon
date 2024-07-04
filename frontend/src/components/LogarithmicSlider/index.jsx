import React, { useEffect, useState } from 'react';
import { Range, getTrackBackground } from 'react-range';
import './index.css'

/* A custom range slider that allows users
to select a range of values in a logarithmic scale. */
const LogarithmicRangeSlider = ({ minValue, maxValue, onLogValueChange, label }) => {
	const [values, setValues] = useState([0, 100]);
	const [logValue, setlogValue] = useState(0);


	useEffect(() => {
		const minLog = Math.log(minValue + 1);
		const maxLog = Math.log(maxValue + 1);
		const scale = (maxLog - minLog) / 100;

		const newLogValue = values.map(value => Math.exp(minLog + scale * value) - 1);
		onLogValueChange(newLogValue);
		setlogValue(newLogValue);

	}, [values, minValue, maxValue]);

	return (

		<div className='logarithmic-button-item'>
			<label className='button-label'>
				{ label }
			</label>
			{/* Use of specifique range in order to have 2 cursors (min/max)*/}
			<Range
				values={values}
				step={0.1}
				min={0}
				max={100}
				onChange={setValues}
				// Style of the track
				renderTrack={({ props, children }) => (
					<div
						onMouseDown={props.onMouseDown}
						onTouchStart={props.onTouchStart}
						style={{ height: '36px', display: 'flex', alignItems: 'center',  justifyContent: 'center', width: '100%' }}
					>
						<div
							ref={props.ref}
							style={{
								height: '8px',
								width: '80%',
								borderRadius: '4px',
								background: getTrackBackground({
									values,
									colors: ['#ccc', '#0075FF', '#ccc'],
									min: 0,
									max: 100
								}),
								alignSelf: 'center',
								
							}}
						>
							{children}
						</div>
					</div>
				)}
				// Style of the two thumb
				renderThumb={({ props, isDragged }) => {
					const { key, ...restProps } = props;
					return <div
						{...restProps}
						key={key}
						style={{
							height: '15px',
							width: '15px',
							borderRadius: '50%',
							backgroundColor: '#1976d2',
						}}
					>

					</div>
				}}
			/>
			{/* Show the result in cm or m */}
			<div className='logarithmic-result'>
				<div>
					{logValue && logValue[0] >= 1 ? `${logValue[0].toFixed(2)} m` : `${(logValue[0] * 100).toFixed(0)} cm`}
				</div>
				<div>
					{logValue && logValue[1] >= 1 ? `${logValue[1].toFixed(2)} m` : `${(logValue[1] * 100).toFixed(0)} cm`}
				</div>
			</div>
		</div>
	);
};

export default LogarithmicRangeSlider;
