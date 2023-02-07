import { configureStore } from "@reduxjs/toolkit";
import order from "./Reducers/Order.Slice";

export default configureStore({
    reducer: {
        order: order,
    }
})