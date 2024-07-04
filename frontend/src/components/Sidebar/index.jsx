import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import './index.css';

const SideBar = ({ }) => {
	const { coordinates, info, fixedInfo } = useContext(AppContext);
	return (
		<div className="sidebar">
			<div className="details">
				<div className="detail-row">
					<span className="detail-key">Snow depth:</span>
					<span className="detail-value">{info && info.snow_depth}</span>
				</div>
				<div className="detail-row">
					<span className="detail-key">Selected snow depth:</span>
					<span className="detail-value">{fixedInfo && fixedInfo.snow_depth}</span>
				</div>
				<div className="detail-row">
					<span className="detail-key">Longitude:</span>
					<span className="detail-value">{coordinates.lng}</span>
				</div>
				<div className="detail-row">
					<span className="detail-key">Latitude:</span>
					<span className="detail-value">{coordinates.lat}</span>
				</div>
				<div className="detail-row">
					<span className="detail-key">Zoom:</span>
					<span className="detail-value">{coordinates.zoom}</span>
				</div>
				<div className="detail-row">
					<span className="detail-key">Pitch:</span>
					<span className="detail-value">{coordinates.pitch}</span>
				</div>
				<div className="detail-row">
					<span className="detail-key">Bearing:</span>
					<span className="detail-value">{coordinates.bearing}</span>
				</div>
			</div>
		</div>
	);
};
export default SideBar;
