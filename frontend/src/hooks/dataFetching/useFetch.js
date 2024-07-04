import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url) => {
	const [data, setData] = useState(null);
	const [loadingData, setloadingData] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(url);
				setData(response.data);
			} catch (error) {
				setError(error);
			} finally {
				setloadingData(false);
			}
		};

		fetchData();
	}, [url]);
	return { data, loadingData, error };
};

export default useFetch;
