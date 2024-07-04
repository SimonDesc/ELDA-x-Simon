import React, { useContext } from 'react';
import { AppProvider, AppContext } from './context/AppContext';

// Components
import Navbar from './components/Navbar';
import SideBar from './components/Sidebar'
import Loading from './components/Loading';
import MapContainer from './components/Map';
import ControlPanel from './components/ControlPanel';

// Styles
import './App.css'


// Loading the context before the App
const App = () => {
	return (
		<AppProvider>
			<MainApp />
		</AppProvider>
	);
};

const MainApp = () => {
	const { loadingData, fetchError, data, handleLogValueChange  } = useContext(AppContext);

	if (fetchError) return <p>Error loading data: {fetchError.message}</p>;
	return (
		<>
			<Navbar />
			<SideBar />
			<Loading isLoading={loadingData} />
			<MapContainer />
			<ControlPanel data={data} onLogValueChange={handleLogValueChange} />
		</>
	);
};

export default App;
