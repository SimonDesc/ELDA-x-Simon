import { useEffect, useState, useRef } from 'react';

const useMapLayers = ({ map, data, id, type, source, paint, minzoom = 0, maxzoom = 22 }) => {
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!map.current || !data) return;

		try {
			if (map.current.getSource(source)) {
				map.current.getSource(source).setData(data);
			} else {
				map.current.addSource(source, {
					'type': 'geojson',
					'data': data
				});

				map.current.addLayer({
					'id': id,
					'type': type,
					'source': source,
					'paint': paint,
					'minzoom': minzoom,
					'maxzoom': maxzoom
				});
			}
		} catch (err) {
			console.error("Error adding map layer:", err);
			setError(err);
		}

	}, [map, data]);

	return { error };
};

export default useMapLayers;
