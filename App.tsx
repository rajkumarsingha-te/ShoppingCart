import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import Cart from './components/Cart';
import ProductList from './components/ProductList';
import store from './redux/store';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import type { CartItem } from './redux/reducers';

const Stack = createStackNavigator();

function HeaderCartButton({ navigation }: { navigation: any }) {
  const cartItems = useSelector((state: any) => state.cart as CartItem[]);
  const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <TouchableOpacity
      style={styles.headerBtn}
      onPress={() => navigation.navigate('Cart')}
      activeOpacity={0.85}
    >
      <Ionicons name="cart" size={22} color="white" />
      {count > 0 ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={({ navigation }) => ({
              headerStyle: {
                backgroundColor: '#FF4D4D',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: '900',
              },
              headerRight: () => <HeaderCartButton navigation={navigation} />,
              headerRightContainerStyle: { paddingRight: 12 },
            })}
          >
            <Stack.Screen name="Products" component={ProductList} />
            <Stack.Screen name="Cart" component={Cart} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  )
}

const styles = StyleSheet.create({
  headerBtn: {
    padding: 10,
  },
  badge: {
    position: 'absolute',
    right: 6,
    top: 6,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 5,
    backgroundColor: '#101827',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '900',
  },
});
