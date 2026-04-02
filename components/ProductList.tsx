import React from 'react'
import { FlatList, Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../redux/action'
import type { CartItem, Product } from '../redux/reducers'

const products: Product[] = [
  { id: 1, name: 'Laptop', price: 100 },
  { id: 2, name: 'Phone', price: 200 },
  { id: 3, name: 'Tablet', price: 300 },
  { id: 4, name: 'Headphones', price: 400 },
  { id: 5, name: 'Keyboard', price: 500 },
  { id: 6, name: 'Mouse', price: 600 },
  { id: 7, name: 'Speaker', price: 700 },
  { id: 8, name: 'Monitor', price: 800 },
  { id: 9, name: 'Printer', price: 900 },
  { id: 10, name: 'Scanner', price: 1000 },
  { id: 11, name: 'Projector', price: 1100 },
  { id: 12, name: 'UPS', price: 1200 },
  { id: 13, name: 'Router', price: 1300 },
]

const ProductList = ({ navigation }: { navigation: any }) => {


  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart as CartItem[]);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  }

  const renderItem = ({ item }: { item: typeof products[0] }) => {
    const inCart = cartItems.find((p) => p.id === item.id);
    return (
      <View style={styles.card}>
        <View style={styles.cardLeft}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.subtitle}>${item.price}</Text>
          {inCart ? <Text style={styles.pill}>In cart: {inCart.quantity}</Text> : null}
        </View>

        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => handleAddToCart(item)}
          activeOpacity={0.85}
        >
          <Ionicons name="add" size={20} color="#fff" />
          <Text style={styles.addBtnText}>Add</Text>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
    />
  )
}

export default ProductList

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#101827',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardLeft: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  subtitle: {
    color: '#B6C2D9',
    marginTop: 4,
    fontSize: 13,
    fontWeight: '600',
  },
  pill: {
    marginTop: 8,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(80, 200, 120, 0.14)',
    color: '#7CFFB0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '700',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF4D4D',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
  },
  addBtnText: {
    color: '#fff',
    fontWeight: '800',
  },
});