import { configureStore } from "@reduxjs/toolkit";
import { userAPI } from "./api/userAPI";
import { userReducer } from "./reducer/userReducer";
import { productAPI } from "./api/productAPI";
import { cartReducer } from "./reducer/cartReducer";
import { orderApi } from "./api/orderAPI";
import { dashboardApi } from "./api/dashboardAPI";

export const server = import.meta.env.VITE_SERVER; // Ensure VITE_SERVER is defined in your environment variables

export const store = configureStore({
    reducer: {
        [userReducer.name]: userReducer.reducer,
        [cartReducer.name]: cartReducer.reducer,
        [userAPI.reducerPath]: userAPI.reducer, // Correct reducer assignment
        [productAPI.reducerPath]:productAPI.reducer,
        [orderApi.reducerPath]:orderApi.reducer,
        [dashboardApi.reducerPath]:dashboardApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(userAPI.middleware).concat(productAPI.middleware).concat(orderApi.middleware).concat(dashboardApi.middleware), // Correct middleware setup using `concat`
});

export type RootState = ReturnType<typeof store.getState>;
