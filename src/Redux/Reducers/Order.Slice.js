import { createSlice } from '@reduxjs/toolkit'

export const OrderSlice = createSlice({
    name: "order",
    initialState: {
        orders: []
    },
    reducers: {
        addOrder: (state, action) => {
            const item = action.payload;
            state.orders.push(item)
        },
        removeOrder: (state, action) => {
            const item = action.payload;
            const val = state.orders.filter(res => (res.name != item))
            state.orders = val
        },
        increment: (state, action) => {
            const item_name = action.payload
            state.orders.map(res => res.name === item_name ? res.quantity = res.quantity + 1 : res)
        },
        decrement: (state, action) => {
            const item_name = action.payload
            state.orders.map(res => res.name === item_name ? res.quantity = res.quantity - 1 : res)
        }

    }
})

export const { addOrder, removeOrder, increment, decrement } = OrderSlice.actions

export default OrderSlice.reducer