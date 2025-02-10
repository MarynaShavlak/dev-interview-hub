import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions';
import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { Article } from '../..';

export type BuilderType = EndpointBuilder<
    BaseQueryFn<any, Article[], unknown, {}, {}>,
    'Articles',
    'firestoreApi'
>;

// import { BaseQueryApi } from '@reduxjs/toolkit/query';
// import { MaybePromise } from '@reduxjs/toolkit/dist/query/tsHelpers';
// import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
//
// type BaseQueryFn<
//     Args = any,
//     Result = unknown,
//     Error = unknown,
//     DefinitionExtraOptions = {},
//     Meta = {},
// > = (
//     args: Args,
//     api: BaseQueryApi,
//     extraOptions: DefinitionExtraOptions,
// ) => MaybePromise<QueryReturnValue<Result, Error, Meta>>;
//
// export type BuildQueryFn<ResultType, QueryArg = void> = {
//     providesTags?: any;
//     keepUnusedDataFor?: number;
//     queryFn: BaseQueryFn;
//     onCacheEntryAdded?: (
//         arg: QueryArg,
//         api: {
//             updateCachedData: (fn: (draft: ResultType) => void) => void;
//             cacheDataLoaded: Promise<void>;
//             cacheEntryRemoved: Promise<void>;
//         },
//     ) => Promise<void>;
// };
//
// export type BuildMutationFn<ResultType, QueryArg> = {
//     invalidatesTags?: string[];
//     // queryFn: BaseQueryFn<QueryArg, ResultType, unknown>['queryFn'];
// };
