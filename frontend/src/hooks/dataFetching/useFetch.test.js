import { renderHook } from '@testing-library/react-hooks';
import axios from 'axios';
import useFetch from './useFetch';

// Mocking axios
jest.mock('axios');

describe('useFetch', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	test('should return data when the fetch is successful', async () => {
		const data = { message: 'Hello, World!' };
		axios.get.mockResolvedValue({ data });

		const { result, waitForNextUpdate } = renderHook(() => useFetch('/api/data'));

		await waitForNextUpdate();

		expect(result.current.data).toEqual(data);
		expect(result.current.loadingData).toBe(false);
		expect(result.current.error).toBe(null);
	});

	test('should return error when the fetch fails', async () => {
		const errorMessage = 'Network Error';
		axios.get.mockRejectedValue(new Error(errorMessage));

		const { result, waitForNextUpdate } = renderHook(() => useFetch('/api/data'));

		await waitForNextUpdate();

		expect(result.current.data).toBe(null);
		expect(result.current.loadingData).toBe(false);
		expect(result.current.error).toEqual(new Error(errorMessage));
	});

	test('should set loadingData to false after fetch is complete', async () => {
		const data = { message: 'Hello, World!' };
		axios.get.mockResolvedValue({ data });

		const { result, waitForNextUpdate } = renderHook(() => useFetch('/api/data'));

		await waitForNextUpdate();

		expect(result.current.loadingData).toBe(false);
	});
});
