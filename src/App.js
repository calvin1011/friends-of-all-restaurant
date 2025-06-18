import React, { useState } from 'react';
import RestaurantNavigation from './components/RestaurantNavigation';
import RestaurantHomePage from './components/RestaurantHomePage';
import MenuPage from './components/MenuPage';
import OrderPage from './components/OrderPage';
import RestaurantContactPage from './components/RestaurantContactPage';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import { useLocalStorage } from './hooks/useLocalStorage';
import { INITIAL_MENU_ITEMS, INITIAL_ORDERS } from './utils/restaurantConstants';

function RestaurantApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [menuItems, setMenuItems] = useLocalStorage('restaurant-menu', INITIAL_MENU_ITEMS);
  const [orders, setOrders] = useLocalStorage('restaurant-orders', INITIAL_ORDERS);
  const [cart, setCart] = useLocalStorage('restaurant-cart', []);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  // Check URL parameters for admin mode
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === 'true') {
      setShowAdminLogin(true);
    }
  }, []);

  const addToCart = (item, quantity = 1, specialInstructions = '') => {
    const cartItem = {
      id: Date.now(),
      menuItemId: item.id,
      name: item.name,
      price: item.price,
      quantity,
      specialInstructions,
      total: item.price * quantity
    };
    setCart(prev => [...prev, cartItem]);
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateCartItem = (cartItemId, updates) => {
    setCart(prev => prev.map(item =>
        item.id === cartItemId
            ? { ...item, ...updates, total: (updates.price || item.price) * (updates.quantity || item.quantity) }
            : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = (customerInfo) => {
    const order = {
      id: Date.now(),
      ...customerInfo,
      items: cart,
      total: cart.reduce((sum, item) => sum + item.total, 0),
      status: 'pending',
      timestamp: new Date().toISOString(),
      estimatedTime: '25-35 minutes'
    };
    setOrders(prev => [...prev, order]);
    clearCart();
    return order;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(prev => prev.map(order =>
        order.id === orderId
            ? { ...order, status, lastUpdated: new Date().toISOString() }
            : order
    ));
  };

  const renderActiveTab = () => {
    if (isAdmin && activeTab === 'admin') {
      return (
          <AdminDashboard
              orders={orders}
              updateOrderStatus={updateOrderStatus}
              menuItems={menuItems}
              setMenuItems={setMenuItems}
          />
      );
    }

    switch (activeTab) {
      case 'home':
        return <RestaurantHomePage setActiveTab={setActiveTab} />;
      case 'menu':
        return (
            <MenuPage
                menuItems={menuItems}
                addToCart={addToCart}
                cart={cart}
                isAdmin={isAdmin}
                setMenuItems={setMenuItems}
            />
        );
      case 'order':
        return (
            <OrderPage
                cart={cart}
                removeFromCart={removeFromCart}
                updateCartItem={updateCartItem}
                clearCart={clearCart}
                placeOrder={placeOrder}
            />
        );
      case 'contact':
        return <RestaurantContactPage />;
      default:
        return <RestaurantHomePage setActiveTab={setActiveTab} />;
    }
  };

  if (showAdminLogin && !isAdmin) {
    return <AdminLogin setIsAdmin={setIsAdmin} setShowAdminLogin={setShowAdminLogin} />;
  }

  return (
      <div className="min-h-screen bg-gray-50">
        <RestaurantNavigation
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            isAdmin={isAdmin}
            setIsAdmin={setIsAdmin}
            setShowAdminLogin={setShowAdminLogin}
            cartCount={cart.length}
        />
        <main className="pt-8">
          {renderActiveTab()}
        </main>
      </div>
  );
}

export default RestaurantApp;