import { useState, useEffect } from 'react';

const useLogValueChange = (data) => {
    const [filteredData, setFilteredData] = useState(null);

	// Filter the data based on 2 values(min/max)
	// Used by the slider
    const handleLogValueChange = (logValue) => {
		if (data) {
            const filtered = {
                type: 'FeatureCollection',
                features: data.features.filter(
                    feature => feature.properties.snow_depth >= logValue[0] && feature.properties.snow_depth <= logValue[1]
                ),
            };
            setFilteredData(filtered);
        }
    };

    return { filteredData, handleLogValueChange };
};

export default useLogValueChange;
