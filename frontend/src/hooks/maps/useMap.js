import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';

const useMap = ({
	mapContainer,
	style,
	initialLng,
	initialLat,
	initialZoom,
	initialPitch,
	initialBearing,
	relief }) => {
	const map = useRef(null);
	const [lng, setLng] = useState(initialLng);
	const [lat, setLat] = useState(initialLat);
	const [zoom, setZoom] = useState(initialZoom);
	const [pitch, setPitch] = useState(initialPitch);
	const [bearing, setBearing] = useState(initialBearing);

	useEffect(() => {
		// Initialize map only once
		if (map.current) return;

		map.current = new mapboxgl.Map({
			container: mapContainer.current,
			style: style,
			center: [initialLng, initialLat],
			zoom: initialZoom,
			pitch: initialPitch,
			bearing: initialBearing
		});

		map.current.on('move', () => {
			setLng(map.current.getCenter().lng.toFixed(4));
			setLat(map.current.getCenter().lat.toFixed(4));
			setZoom(map.current.getZoom().toFixed(2));
			setPitch(map.current.getPitch().toFixed(2));
			setBearing(map.current.getBearing().toFixed(2));
		});

		if (relief) {
			map.current.on('load', () => {
				map.current.addSource('mapbox-dem', {
					'type': 'raster-dem',
					'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
					'tileSize': 512,
					'maxzoom': 14 // mapbox-terrain-dem-v1 : zoom max 14
				});

				map.current.setTerrain({
					'source': 'mapbox-dem',
					'exaggeration': 1.2
				});

			});
		}

	}, [mapContainer, style, initialLng, initialLat, initialZoom, initialPitch, initialBearing]);

	return {
		map,
		lng,
		lat,
		zoom,
		pitch,
		bearing
	};
};

export default useMap;
