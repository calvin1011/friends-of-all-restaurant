import React, { useState } from 'react';
import { Trash2, Plus, Minus, ShoppingCart, CreditCard, MapPin, Phone, User, Mail, CheckCircle } from 'lucide-react';
import { RESTAURANT_INFO } from '../utils/restaurantConstants';

const OrderPage = ({ cart, removeFromCart, updateCartItem, clearCart, placeOrder }) => {
    const [customerInfo, setCustomerInfo] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        deliveryInstructions: ''
    });
    const [orderType, setOrderType] = useState('delivery'); // 'delivery' or 'pickup'
    const [paymentMethod, setPaymentMethod] = useState('cash'); // 'cash' or 'card'
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderConfirmation, setOrderConfirmation] = useState(null);

    const subtotal = cart.reduce((sum, item) => sum + item.total, 0);
    const deliveryFee = orderType === 'delivery' && subtotal < 30 ? RESTAURANT_INFO.delivery.fee : 0;
    const tax = (subtotal + deliveryFee) * 0.08; // 8% tax
    const total = subtotal + deliveryFee + tax;

    const updateQuantity = (cartItemId, newQuantity) => {
        if (newQuantity <= 0) {
            removeFromCart(cartItemId);
        } else {
            updateCartItem(cartItemId, { quantity: newQuantity });
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmitOrder = (e) => {
        e.preventDefault();

        if (!customerInfo.name || !customerInfo.phone) {
            alert('Please fill in all required fields (Name and Phone).');
            return;
        }

        if (orderType === 'delivery' && !customerInfo.address) {
            alert('Please provide a delivery address.');
            return;
        }

        if (cart.length === 0) {
            alert('Your cart is empty. Please add some items first.');
            return;
        }

        const orderData = {
            ...customerInfo,
            orderType,
            paymentMethod,
            subtotal,
            deliveryFee,
            tax,
            total
        };

        const confirmation = placeOrder(orderData);
        setOrderConfirmation(confirmation);
        setOrderPlaced(true);
    };

    if (orderPlaced) {
        return (
            <div className="max-w-2xl mx-auto p-6">
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-12 h-12 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Order Confirmed!</h2>
                    <p className="text-xl text-gray-600 mb-6">
                        Thank you for your order, {orderConfirmation?.name}!
                    </p>

                    <div className="bg-gray-50 rounded-lg p-6 mb-6">
                        <div className="grid grid-cols-2 gap-4 text-left">
                            <div>
                                <p className="text-sm text-gray-600">Order Number</p>
                                <p className="font-semibold">#{orderConfirmation?.id}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total</p>
                                <p className="font-semibold text-green-600">${orderConfirmation?.total.toFixed(2)}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Estimated Time</p>
                                <p className="font-semibold">{orderConfirmation?.estimatedTime}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Status</p>
                                <p className="font-semibold text-orange-600">Order Received</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 text-sm text-gray-600">
                        <p>📱 We'll send you updates via phone: {orderConfirmation?.phone}</p>
                        <p>🚚 {orderType === 'delivery' ? 'Your order will be delivered to:' : 'Pickup location:'}</p>
                        <p className="font-medium">
                            {orderType === 'delivery' ? orderConfirmation?.address : RESTAURANT_INFO.address}
                        </p>
                    </div>

                    <div className="mt-8 space-y-4">
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                        >
                            Place Another Order
                        </button>
                        <div>
                            <p className="text-sm text-gray-500">
                                Questions? Call us at {RESTAURANT_INFO.phone}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Your Order</h2>
                <p className="text-xl text-gray-600">Review your items and complete your order</p>
            </div>

            {cart.length === 0 ? (
                <div className="text-center py-16">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                        <ShoppingCart className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-600 mb-4">Your cart is empty</h3>
                    <p className="text-lg text-gray-500 mb-6">Add some delicious items to get started!</p>
                    <button
                        onClick={() => window.location.hash = '#menu'}
                        className="bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                    >
                        Browse Menu
                    </button>
                </div>
            ) : (
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold text-gray-800">Cart Items ({cart.length})</h3>
                                <button
                                    onClick={clearCart}
                                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                                >
                                    Clear All
                                </button>
                            </div>

                            <div className="space-y-4">
                                {cart.map(item => (
                                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                            <span className="text-2xl">🍽️</span>
                                        </div>

                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-800">{item.name}</h4>
                                            <p className="text-sm text-gray-600">${item.price.toFixed(2)} each</p>
                                            {item.specialInstructions && (
                                                <p className="text-sm text-orange-600 italic">
                                                    Note: {item.specialInstructions}
                                                </p>
                                            )}
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors flex items-center justify-center"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-8 text-center font-semibold">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors flex items-center justify-center"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <div className="text-right">
                                            <p className="font-bold text-gray-800">${item.total.toFixed(2)}</p>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-red-600 hover:text-red-700 text-sm mt-1"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Type Selection */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Order Type</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <button
                                    onClick={() => setOrderType('delivery')}
                                    className={`p-4 rounded-lg border-2 transition-all ${
                                        orderType === 'delivery'
                                            ? 'border-orange-600 bg-orange-50 text-orange-600'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    <MapPin className="w-6 h-6 mx-auto mb-2" />
                                    <p className="font-semibold">Delivery</p>
                                    <p className="text-sm text-gray-600">{RESTAURANT_INFO.delivery.time}</p>
                                </button>
                                <button
                                    onClick={() => setOrderType('pickup')}
                                    className={`p-4 rounded-lg border-2 transition-all ${
                                        orderType === 'pickup'
                                            ? 'border-orange-600 bg-orange-50 text-orange-600'
                                            : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    <ShoppingCart className="w-6 h-6 mx-auto mb-2" />
                                    <p className="font-semibold">Pickup</p>
                                    <p className="text-sm text-gray-600">15-20 min</p>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary & Customer Info */}
                    <div className="space-y-6">
                        {/* Customer Information */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Customer Information</h3>
                            <form onSubmit={handleSubmitOrder} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        <User className="w-4 h-4 inline mr-1" />
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={customerInfo.name}
                                        onChange={handleInputChange}
                                        placeholder="John Doe"
                                        className="input-field"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        <Phone className="w-4 h-4 inline mr-1" />
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={customerInfo.phone}
                                        onChange={handleInputChange}
                                        placeholder="(555) 123-4567"
                                        className="input-field"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        <Mail className="w-4 h-4 inline mr-1" />
                                        Email (Optional)
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={customerInfo.email}
                                        onChange={handleInputChange}
                                        placeholder="john@example.com"
                                        className="input-field"
                                    />
                                </div>

                                {orderType === 'delivery' && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                <MapPin className="w-4 h-4 inline mr-1" />
                                                Delivery Address *
                                            </label>
                                            <input
                                                type="text"
                                                name="address"
                                                value={customerInfo.address}
                                                onChange={handleInputChange}
                                                placeholder="123 Main St, City, State 12345"
                                                className="input-field"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Delivery Instructions
                                            </label>
                                            <textarea
                                                name="deliveryInstructions"
                                                value={customerInfo.deliveryInstructions}
                                                onChange={handleInputChange}
                                                placeholder="e.g., Ring doorbell, Leave at door..."
                                                rows={2}
                                                className="input-field resize-none"
                                            />
                                        </div>
                                    </>
                                )}

                                {/* Payment Method */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        <CreditCard className="w-4 h-4 inline mr-1" />
                                        Payment Method
                                    </label>
                                    <div className="space-y-2">
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="cash"
                                                checked={paymentMethod === 'cash'}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="text-orange-600"
                                            />
                                            <span>Cash {orderType === 'delivery' ? 'on Delivery' : 'on Pickup'}</span>
                                        </label>
                                        <label className="flex items-center space-x-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="card"
                                                checked={paymentMethod === 'card'}
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                className="text-orange-600"
                                            />
                                            <span>Credit/Debit Card {orderType === 'delivery' ? 'on Delivery' : 'on Pickup'}</span>
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Order Summary */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h3>

                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                                </div>

                                {orderType === 'delivery' && (
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">
                                            Delivery Fee
                                            {subtotal >= 30 && <span className="text-green-600 text-sm ml-1">(Free!)</span>}
                                        </span>
                                        <span className="font-semibold">
                                            {deliveryFee > 0 ? `${deliveryFee.toFixed(2)}` : 'FREE'}
                                        </span>
                                    </div>
                                )}

                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tax (8%)</span>
                                    <span className="font-semibold">${tax.toFixed(2)}</span>
                                </div>

                                <div className="border-t pt-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold text-gray-800">Total</span>
                                        <span className="text-2xl font-bold text-orange-600">${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Info */}
                            {orderType === 'delivery' && subtotal < RESTAURANT_INFO.delivery.minimum && (
                                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                    <p className="text-sm text-yellow-800">
                                        💡 Add ${(RESTAURANT_INFO.delivery.minimum - subtotal).toFixed(2)} more for free delivery!
                                    </p>
                                </div>
                            )}

                            <div className="mt-6 space-y-3">
                                <div className="text-sm text-gray-600">
                                    <p>📍 {orderType === 'delivery' ? 'Delivery' : 'Pickup'} Time:
                                        <span className="font-semibold ml-1">
                                            {orderType === 'delivery' ? RESTAURANT_INFO.delivery.time : '15-20 minutes'}
                                        </span>
                                    </p>
                                    <p>💳 Payment: <span className="font-semibold">{paymentMethod === 'cash' ? 'Cash' : 'Card'} on {orderType}</span></p>
                                </div>

                                <button
                                    onClick={handleSubmitOrder}
                                    disabled={cart.length === 0 || !customerInfo.name || !customerInfo.phone ||
                                        (orderType === 'delivery' && !customerInfo.address)}
                                    className="w-full bg-orange-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-orange-700 transition-all duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                                >
                                    <CheckCircle className="w-6 h-6" />
                                    <span>Place Order - ${total.toFixed(2)}</span>
                                </button>

                                <p className="text-xs text-center text-gray-500">
                                    By placing this order, you agree to our terms and conditions
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderPage;