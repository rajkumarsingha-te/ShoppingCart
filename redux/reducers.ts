import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART, UPDATE__CART_ITEM_QUANTITY } from "./action";

export type Product = { id: number; name: string; price: number };
export type CartItem = Product & { quantity: number };

const initialState: CartItem[] = [];

const cartReducer = (state: CartItem[] = initialState, action: any): CartItem[] => {
    switch (action.type) {
        case ADD_TO_CART:
            const productToAdd = action.payload;
            const existingProduct = state.findIndex((product) => product.id === productToAdd.id);
            if (existingProduct !== -1) {
                return state.map((product, index) =>
                    index === existingProduct ? { ...product, quantity: product.quantity + 1 } : product
                );
            } else {
                return [...state, { ...productToAdd, quantity: 1 }];
            }
        case REMOVE_FROM_CART:
            const productIdToRemove = action.payload;
            return state.filter((product) => product.id !== productIdToRemove);
        case CLEAR_CART:
            return [];
        case UPDATE__CART_ITEM_QUANTITY:
            const { productId, quantity } = action.payload;
            if (quantity <= 0) {
                return state.filter((product) => product.id !== productId);
            }
            return state.map((product) => (product.id === productId ? { ...product, quantity } : product));
        default:
            return state
    }
}

export default cartReducer;