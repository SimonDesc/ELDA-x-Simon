import React, { createContext, useState } from 'react';
import useFetch from '../hooks/dataFetching/useFetch';
import useLogValueChange from '../hooks/logging/useLogValueChange';

const AppContext = createContext();

const AppProvider = ({ children }) => {
	const { data, loadingData, error: fetchError } = useFetch('http://localhost:3001/api/snow-depth');
	const { filteredData, handleLogValueChange } = useLogValueChange(data);
	const [info, setInfo] = useState(null);
	const [coordinates, setCoordinates] = useState({
		lng: 0,
		lat: 0,
		zoom: 0,
		pitch: 0,
		bearing: 0
	});
	const [fixedInfo, setFixedInfo] = useState(null);
	
	return (
		<AppContext.Provider value={{
			data, loadingData, fetchError, filteredData, handleLogValueChange,
			info, setInfo, coordinates, setCoordinates, fixedInfo, setFixedInfo,
		}}>
			{children}
		</AppContext.Provider>
	);
};

export { AppContext, AppProvider };
