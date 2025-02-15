import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AllProductsResponse, CategoriesResponse, DeleteProductRequest , messageResponse, NewProductRequest, ProductResponse, SearchProductsRequest, SearchProductsResponse, UpdateProductRequest } from "../../types/api-types";

export const productAPI = createApi({
    reducerPath:"productApi",
    baseQuery: fetchBaseQuery({
        baseUrl:`${import.meta.env.VITE_SERVER}/api/v1/product/`,
    }),
    tagTypes:["product"],
    endpoints:(builder)=>({
            latestProducts:builder.query<AllProductsResponse, string>({
                query:()=>"latest",
                providesTags:["product"],
            }),
            allProducts:builder.query<AllProductsResponse, string>({
                query:(id)=>`admin-products?id=${id}`,
                providesTags:["product"],
            }),
            categories:builder.query<CategoriesResponse, string>({
                query:()=>`categories`,
                providesTags:["product"],
            }),
            searchProducts: builder.query<SearchProductsResponse, SearchProductsRequest>({
                query:({price,search,sort,page,category})=>{
                let base  = `all?search=${search}&page=${page}`
                if (price) base+=`&price=${price}`;
                if(category) base+=`&category=${category}`;
                if (sort) base+= `&sort=${sort}`;
                return base;
            },
            providesTags:["product"],
        }),
            newProduct:builder.mutation<messageResponse, NewProductRequest>({query:({formData, id})=>({
                    url:`new?id=${id}`,
                    method:"POST",
                    body:formData,
                }),
                invalidatesTags:["product"], 
        }),
            productDetails:builder.query<ProductResponse, string>({query:(id)=>id}),
            updateProduct:builder.mutation<messageResponse, UpdateProductRequest>(
                {query:({formData, userId, productId})=>({
                url:`${productId}?id=${userId}`,
                method:"PUT",
                body:formData,
                }),
                invalidatesTags:["product"], 
        }),
            deleteProduct: builder.mutation<messageResponse, DeleteProductRequest>({
                query:({userId, productId})=>({
                    url:`${productId}?id=${userId}`,
                    method:"DELETE",
                }),
                invalidatesTags:["product"],
            })
        
        }),
    });

export const {useLatestProductsQuery, useAllProductsQuery, useCategoriesQuery, useSearchProductsQuery,
    useNewProductMutation, useProductDetailsQuery, useUpdateProductMutation, useDeleteProductMutation, 
} = productAPI;