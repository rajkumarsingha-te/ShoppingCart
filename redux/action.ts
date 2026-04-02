export const ADD_TO_CART = 'add to cart';
export const REMOVE_FROM_CART = 'remove from cart';
export const CLEAR_CART = 'clear cart';
export const UPDATE__CART_ITEM_QUANTITY = 'update quantity';

export const addToCart = (product: any) => {
    return {
        type: ADD_TO_CART,
        payload: product
    }
}

export const removeFromCart = (productId: number) => {
    return {
        type: REMOVE_FROM_CART,
        payload: productId
    }
}

export const clearCart = () => {
    return {
        type: CLEAR_CART
    }
}

export const updateCartItemQuantity = (productId: number, quantity: number) => {
    return {
        type: UPDATE__CART_ITEM_QUANTITY,
        payload: { productId, quantity }
    }
}

