// import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
// import { fetchProfileData } from './fetchProfileData';
// import { testProfileData } from '@/entities/Profile/testing';
//
// describe('async thunk fetchProfileData test', () => {
//     test('success fetching profile data', async () => {
//         const thunk = new TestAsyncThunk(fetchProfileData);
//         thunk.api.get.mockReturnValue(
//             Promise.resolve({ data: testProfileData }),
//         );
//
//         const result = await thunk.callThunk('1');
//         expect(thunk.api.get).toHaveBeenCalledWith('/profile/1');
//         expect(thunk.api.get).toHaveBeenCalled();
//         expect(result.meta.requestStatus).toBe('fulfilled');
//         expect(result.payload).toEqual(testProfileData);
//     });
//
//     test('error fetching profile data with 403 status', async () => {
//         const thunk = new TestAsyncThunk(fetchProfileData);
//         thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
//         const result = await thunk.callThunk('1');
//         expect(thunk.api.get).toHaveBeenCalledWith('/profile/1');
//
//         expect(result.meta.requestStatus).toBe('rejected');
//         expect(result.payload).toBe('Failed to fetch profile data');
//     });
//
//     test('error fetching profile data with network error', async () => {
//         const thunk = new TestAsyncThunk(fetchProfileData);
//         thunk.api.get.mockReturnValue(
//             Promise.reject(new Error('Network Error')),
//         );
//
//         const result = await thunk.callThunk('1');
//
//         expect(thunk.api.get).toHaveBeenCalledWith('/profile/1');
//         expect(thunk.api.get).toHaveBeenCalledTimes(1);
//         expect(result.meta.requestStatus).toBe('rejected');
//         expect(result.payload).toBe('Failed to fetch profile data');
//     });
//
//     test('error fetching profile data with missing data', async () => {
//         const thunk = new TestAsyncThunk(fetchProfileData);
//         thunk.api.get.mockReturnValue(Promise.resolve({ data: null }));
//
//         const result = await thunk.callThunk('1');
//
//         expect(thunk.api.get).toHaveBeenCalledWith('/profile/1');
//         expect(thunk.api.get).toHaveBeenCalledTimes(1);
//         expect(result.meta.requestStatus).toBe('rejected');
//         expect(result.payload).toBe('Failed to fetch profile data');
//     });
//
//     test('multiple simultaneous profile data fetch requests', async () => {
//         const thunk = new TestAsyncThunk(fetchProfileData);
//         thunk.api.get.mockReturnValue(
//             Promise.resolve({ data: testProfileData }),
//         );
//
//         const results = await Promise.all([
//             thunk.callThunk('1'),
//             thunk.callThunk('1'),
//             thunk.callThunk('1'),
//         ]);
//
//         results.forEach((result) => {
//             expect(result.meta.requestStatus).toBe('fulfilled');
//             expect(result.payload).toEqual(testProfileData);
//         });
//
//         expect(thunk.api.get).toHaveBeenCalledWith('/profile/1');
//         expect(thunk.api.get).toHaveBeenCalledTimes(3);
//     });
// });

export {};
