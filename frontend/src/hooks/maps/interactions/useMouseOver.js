import { useEffect, useState, useContext } from 'react';
import { AppContext } from '../../../context/AppContext';

// hover logic / click on layer
const useMouseOver = (map, layer) => {
	const { info, setInfo, fixedInfo, setFixedInfo } = useContext(AppContext);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!map.current) return;
		
		const handleMouseMove = (e) => {
			try {
				const features = e.features;
				if (features.length) {
					const feature = features[0];
					const properties = feature.properties;
					setInfo(properties);
				}
			} catch (err) {
				console.error("Error handling mouse move:", err);
				setError(err);
			}
		};

		const handleMouseLeave = () => {
			setInfo(null);
		};

		const handleMouseClick = (e) => {
			try {
				const features = e.features;
				if (features.length) {
					const feature = features[0];
					const properties = feature.properties;
					setFixedInfo(properties);
				}
			} catch (err) {
				console.error("Error handling mouse click:", err);
				setError(err);
			}
		};

		try {
			map.current.on('mousemove', layer, handleMouseMove);
			map.current.on('mouseleave', layer, handleMouseLeave);
			map.current.on('click', layer, handleMouseClick);
		} catch (err) {
			console.error("Error setting up event listeners:", err);
			setError(err);
		}

		return () => {
			try {
				map.current.off('mousemove', layer, handleMouseMove);
				map.current.off('mouseleave', layer, handleMouseLeave);
				map.current.off('click', layer, handleMouseClick);
			} catch (err) {
				console.error("Error cleaning up event listeners:", err);
				setError(err);
			}
		};
	}, [map, layer]);

	return { info, fixedInfo, error };
};

export default useMouseOver;
