import React, { useMemo } from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, removeFromCart, updateCartItemQuantity } from '../redux/action';
import type { CartItem } from '../redux/reducers';

const Cart = ({ route }: { route: any }) => {
    

    const cartItems = useSelector((state: any) => state.cart as CartItem[]);

    const dispatch = useDispatch();

    const handleRemoveFromCart = (productId: number) => {
        dispatch(removeFromCart(productId));
    }

    const handleUpdateCartItemQuantity = (productId: number, quantity: number) => {
        dispatch(updateCartItemQuantity(productId, quantity));
    }

    const total = useMemo(() => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }, [cartItems]);

    const renderItem = ({ item }: { item: CartItem }) => {
        return (
            <View style={styles.row}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.subtitle}>${item.price}  •  Subtotal: ${(item.price * item.quantity).toFixed(2)}</Text>
                </View>

                <View style={styles.controls}>
                    <TouchableOpacity
                        style={styles.iconBtn}
                        onPress={() => handleUpdateCartItemQuantity(item.id, item.quantity - 1)}
                        activeOpacity={0.85}
                    >
                        <Ionicons name="remove" size={18} color="#fff" />
                    </TouchableOpacity>

                    <Text style={styles.qty}>{item.quantity}</Text>

                    <TouchableOpacity
                        style={[styles.iconBtn, { backgroundColor: '#00C2FF' }]}
                        onPress={() => handleUpdateCartItemQuantity(item.id, item.quantity + 1)}
                        activeOpacity={0.85}
                    >
                        <Ionicons name="add" size={18} color="#001018" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.iconBtn, { backgroundColor: 'rgba(255,77,77,0.25)' }]}
                        onPress={() => handleRemoveFromCart(item.id)}
                        activeOpacity={0.85}
                    >
                        <Ionicons name="trash" size={18} color="#FF4D4D" />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#0B1220' }}>
            <FlatList
                contentContainerStyle={styles.list}
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Ionicons name="cart-outline" size={42} color="#B6C2D9" />
                        <Text style={styles.emptyTitle}>Your cart is empty</Text>
                        <Text style={styles.emptySub}>Add some products to see them here.</Text>
                    </View>
                }
            />

            <View style={styles.footer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.footerLabel}>Total</Text>
                    <Text style={styles.footerTotal}>${total.toFixed(2)}</Text>
                </View>

                <TouchableOpacity
                    style={[styles.clearBtn, { opacity: cartItems.length ? 1 : 0.5 }]}
                    onPress={() => dispatch(clearCart())}
                    disabled={!cartItems.length}
                    activeOpacity={0.85}
                >
                    <Ionicons name="trash-outline" size={18} color="#fff" />
                    <Text style={styles.clearBtnText}>Clear</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Cart

const styles = StyleSheet.create({
    list: {
        padding: 16,
        paddingBottom: 110,
    },
    row: {
        backgroundColor: '#101827',
        borderRadius: 16,
        padding: 14,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    title: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '800',
    },
    subtitle: {
        color: '#B6C2D9',
        marginTop: 6,
        fontSize: 12,
        fontWeight: '600',
    },
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    iconBtn: {
        width: 36,
        height: 36,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.12)',
    },
    qty: {
        width: 26,
        textAlign: 'center',
        color: '#fff',
        fontWeight: '900',
    },
    empty: {
        paddingVertical: 60,
        alignItems: 'center',
        gap: 8,
    },
    emptyTitle: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '800',
        marginTop: 6,
    },
    emptySub: {
        color: '#B6C2D9',
        fontSize: 13,
        fontWeight: '600',
    },
    footer: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        padding: 16,
        backgroundColor: 'rgba(11,18,32,0.92)',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.08)',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    footerLabel: {
        color: '#B6C2D9',
        fontWeight: '700',
        fontSize: 12,
    },
    footerTotal: {
        color: '#fff',
        fontWeight: '900',
        fontSize: 20,
        marginTop: 2,
    },
    clearBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#FF4D4D',
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: 14,
    },
    clearBtnText: {
        color: '#fff',
        fontWeight: '900',
    },
});