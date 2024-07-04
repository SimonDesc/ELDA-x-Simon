import mapboxgl from 'mapbox-gl';
import React, { useRef, useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';

// custom hooks
import useMap from '../../hooks/maps/useMap';
import useMapLayers from '../../hooks/maps/useMapLayer';
import useMouseOver from '../../hooks/maps/interactions/useMouseOver';

// utils
import colorInterpolation from '../../utils/colorInterpolation'

// styles
import './index.css';


mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

// Map and layer construction
const MapContainer = () => {
	const mapContainer = useRef(null);
	const layerId = 'snow-depth';
	const source = 'snow-depth';

	const { setCoordinates, data, filteredData } = useContext(AppContext);

	
	
	// Initialize the map
	const { map } = useMap({
		mapContainer: mapContainer,
		style: 'mapbox://styles/mapbox/standard',
		initialLng: 6.6149,
		initialLat: 44.8976,
		initialZoom: 15.62,
		initialPitch: 60,
		initialBearing: -17.6,
		relief: true
	});

	// keeping track of the coordinates
	useEffect(() => {
		if (!map.current) return;

		const updateCoordinates = () => {
			setCoordinates({
				lng: map.current.getCenter().lng.toFixed(4),
				lat: map.current.getCenter().lat.toFixed(4),
				zoom: map.current.getZoom().toFixed(2),
				pitch: map.current.getPitch().toFixed(2),
				bearing: map.current.getBearing().toFixed(2)
			});
		};

		map.current.on('move', updateCoordinates);
		updateCoordinates();

		return () => {
			if (map.current) {
				map.current.off('move', updateCoordinates);
			}
		};
	}, [map, setCoordinates]);

	// Add map layers only when data is available
	const { error: layerError } = useMapLayers({
		map,
		data: filteredData ? filteredData : data,
		id: layerId,
		type: 'fill',
		source: source,
		paint: {
			'fill-color': colorInterpolation('snow_depth'),
			'fill-opacity': 0.6
		},
	});

	// Add the mouseOver and onClick functionality
	const { info, fixedInfo } = useMouseOver(map, 'snow-depth');

	return (
		<div ref={mapContainer} className="map-container" />
	);
};

export default MapContainer;
