import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { barResponse, lineResponse, pieResponse, statsResponse } from "../../types/api-types";


export const dashboardApi = createApi({
    reducerPath:"dashboardApi",
    baseQuery: fetchBaseQuery({
        baseUrl:`${import.meta.env.VITE_SERVER}/api/v1/dashboard/`,
    }),
    tagTypes:["dashboard"],
    endpoints: (builder)=>({
        stats: builder.query<statsResponse, string>({
            query:(id)=>`stats?id=${id}`,
            keepUnusedDataFor:0,
        }),
        pie :builder.query<pieResponse, string>({
            query: (id)=>`pie?id=${id}`,
            keepUnusedDataFor:0,
        }),
        bar : builder.query<barResponse, string>({
            query: (id)=>`bar?id=${id}`,
            keepUnusedDataFor:0,
        }),
        line : builder.query<lineResponse, string>({
            query: (id)=>`line?id=${id}`,
            keepUnusedDataFor:0,
        }),
    })

});

export const { useBarQuery, useLineQuery, useStatsQuery, usePieQuery} = dashboardApi;


