import React, { useState } from 'react';
import {
    Plus, Edit3, Trash2, Save, X, Upload, Camera,
    Package,
    DollarSign, FileText, Settings
} from 'lucide-react';
import { ORDER_STATUSES, MENU_CATEGORIES } from '../utils/restaurantConstants';

const AdminDashboard = ({ orders, updateOrderStatus, menuItems, setMenuItems }) => {
    const [activeAdminTab, setActiveAdminTab] = useState('orders');
    const [editingItem, setEditingItem] = useState(null);
    const [showAddItem, setShowAddItem] = useState(false);
    const [newItem, setNewItem] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Main Dishes',
        available: true,
        spicy: false,
        image: null
    });

    // Order Management Functions
    const getOrdersByStatus = (status) => {
        return orders.filter(order => order.status === status);
    };

    const handleStatusUpdate = (orderId, newStatus) => {
        updateOrderStatus(orderId, newStatus);
    };

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Menu Management Functions
    const handleImageUpload = (itemId, event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (itemId === 'new') {
                    setNewItem(prev => ({ ...prev, image: e.target.result }));
                } else {
                    setMenuItems(prev => prev.map(item =>
                        item.id === itemId
                            ? { ...item, image: e.target.result }
                            : item
                    ));
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const saveMenuItem = (itemId) => {
        if (itemId === 'new') {
            // Add new item to the menu
            const item = {
                ...newItem,
                id: Date.now(),
                price: parseFloat(newItem.price) || 0
            };
            setMenuItems(prev => [...prev, item]);
            setNewItem({
                name: '',
                description: '',
                price: '',
                category: 'Main Dishes',
                available: true,
                spicy: false,
                image: null
            });
            setShowAddItem(false);
        } else {
            // Update existing item
            const nameInput = document.getElementById(`item-name-${itemId}`);
            const descInput = document.getElementById(`item-desc-${itemId}`);
            const priceInput = document.getElementById(`item-price-${itemId}`);
            const categorySelect = document.getElementById(`item-category-${itemId}`);
            const availableCheck = document.getElementById(`item-available-${itemId}`);
            const spicyCheck = document.getElementById(`item-spicy-${itemId}`);

            if (nameInput && descInput && priceInput && categorySelect) {
                setMenuItems(prev => prev.map(item =>
                    item.id === itemId
                        ? {
                            ...item,
                            name: nameInput.value,
                            description: descInput.value,
                            price: parseFloat(priceInput.value) || 0,
                            category: categorySelect.value,
                            available: availableCheck.checked,
                            spicy: spicyCheck.checked
                        }
                        : item
                ));
                setEditingItem(null);
            }
        }
    };

    const deleteMenuItem = (itemId) => {
        if (window.confirm('Are you sure you want to delete this menu item?')) {
            setMenuItems(prev => prev.filter(item => item.id !== itemId));
        }
    };

    const cancelEdit = () => {
        setEditingItem(null);
        setShowAddItem(false);
        setNewItem({
            name: '',
            description: '',
            price: '',
            category: 'Main Dishes',
            available: true,
            spicy: false,
            image: null
        });
    };

    const adminTabs = [
        { id: 'orders', label: 'Orders', icon: <Package className="w-5 h-5" /> },
        { id: 'menu', label: 'Menu Management', icon: <FileText className="w-5 h-5" /> },
        { id: 'analytics', label: 'Analytics', icon: <Settings className="w-5 h-5" /> }
    ];

    const renderOrdersTab = () => (
        <div className="space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
                {/* Order Stats */}
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Orders Today</h3>
                    <p className="text-3xl font-bold text-orange-600">{orders.length}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Pending Orders</h3>
                    <p className="text-3xl font-bold text-yellow-600">
                        {getOrdersByStatus('pending').length + getOrdersByStatus('confirmed').length}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Revenue Today</h3>
                    <p className="text-3xl font-bold text-green-600">
                        ${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}
                    </p>
                </div>
            </div>

            {/* Orders List */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 border-b">
                    <h3 className="text-2xl font-bold text-gray-800">Recent Orders</h3>
                </div>
                <div className="divide-y">
                    {orders.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                            <p className="text-xl">No orders yet today</p>
                        </div>
                    ) : (
                        orders.map(order => (
                            <div key={order.id} className="p-6 hover:bg-gray-50">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-800">
                                            Order #{order.id}
                                        </h4>
                                        <p className="text-gray-600">{order.customerName} - {order.phone}</p>
                                        <p className="text-sm text-gray-500">
                                            Ordered at {formatTime(order.timestamp)}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-gray-800">${order.total.toFixed(2)}</p>
                                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${ORDER_STATUSES[order.status].color}`}>
                                            {ORDER_STATUSES[order.status].label}
                                        </div>
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="mb-4">
                                    <h5 className="font-semibold text-gray-700 mb-2">Items:</h5>
                                    <div className="space-y-1">
                                        {order.items.map((item, index) => (
                                            <div key={index} className="flex justify-between text-sm">
                                                <span>{item.quantity}x {item.name}</span>
                                                <span>${item.total.toFixed(2)}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Status Update Buttons */}
                                <div className="flex flex-wrap gap-2">
                                    {Object.entries(ORDER_STATUSES).map(([status, config]) => (
                                        <button
                                            key={status}
                                            onClick={() => handleStatusUpdate(order.id, status)}
                                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                                order.status === status
                                                    ? `${config.color} text-white`
                                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                            disabled={order.status === status}
                                        >
                                            {config.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );

    const renderMenuTab = () => (
        <div className="space-y-8">
            {/* Menu Management Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-3xl font-bold text-gray-800">Menu Management</h3>
                    <p className="text-gray-600 mt-2">Add, edit, and manage your menu items</p>
                </div>
                <button
                    onClick={() => setShowAddItem(true)}
                    className="bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-700 transition-colors flex items-center space-x-2"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add New Item</span>
                </button>
            </div>

            {/* Add New Item Form */}
            {showAddItem && (
                <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-orange-200">
                    <div className="flex justify-between items-center mb-6">
                        <h4 className="text-2xl font-semibold text-gray-800">Add New Menu Item</h4>
                        <button onClick={cancelEdit} className="text-gray-500 hover:text-gray-700">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Item Name *</label>
                                <input
                                    type="text"
                                    value={newItem.name}
                                    onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                                    placeholder="e.g., Classic Burger"
                                    className="input-field"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                                <textarea
                                    value={newItem.description}
                                    onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                                    placeholder="Describe the item..."
                                    rows={3}
                                    className="input-field resize-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Price *</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={newItem.price}
                                        onChange={(e) => setNewItem(prev => ({ ...prev, price: e.target.value }))}
                                        placeholder="0.00"
                                        className="input-field"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                                    <select
                                        value={newItem.category}
                                        onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value }))}
                                        className="input-field"
                                    >
                                        {MENU_CATEGORIES.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex space-x-6">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={newItem.available}
                                        onChange={(e) => setNewItem(prev => ({ ...prev, available: e.target.checked }))}
                                        className="rounded"
                                    />
                                    <span className="text-sm text-gray-700">Available</span>
                                </label>

                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={newItem.spicy}
                                        onChange={(e) => setNewItem(prev => ({ ...prev, spicy: e.target.checked }))}
                                        className="rounded"
                                    />
                                    <span className="text-sm text-gray-700">Spicy 🌶️</span>
                                </label>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Item Photo</label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
                                    {newItem.image ? (
                                        <div className="relative">
                                            <img src={newItem.image} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                                            <button
                                                onClick={() => setNewItem(prev => ({ ...prev, image: null }))}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                            <p className="text-gray-600 mb-4">Upload a photo of this item</p>
                                            <label className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors cursor-pointer inline-flex items-center space-x-2">
                                                <Upload className="w-4 h-4" />
                                                <span>Choose Photo</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleImageUpload('new', e)}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4 mt-6">
                        <button onClick={cancelEdit} className="btn-secondary">
                            Cancel
                        </button>
                        <button
                            onClick={() => saveMenuItem('new')}
                            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                            disabled={!newItem.name || !newItem.description || !newItem.price}
                        >
                            <Save className="w-4 h-4" />
                            <span>Add Item</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Menu Items by Category */}
            {MENU_CATEGORIES.map(category => {
                const categoryItems = menuItems.filter(item => item.category === category);
                if (categoryItems.length === 0) return null;

                return (
                    <div key={category} className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="bg-orange-600 text-white p-4">
                            <h4 className="text-xl font-semibold">{category}</h4>
                        </div>
                        <div className="divide-y">
                            {categoryItems.map(item => (
                                <div key={item.id} className="p-6">
                                    {editingItem === item.id ? (
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-4">
                                                <input
                                                    type="text"
                                                    id={`item-name-${item.id}`}
                                                    defaultValue={item.name}
                                                    className="input-field text-lg font-semibold"
                                                    placeholder="Item name"
                                                />
                                                <textarea
                                                    id={`item-desc-${item.id}`}
                                                    defaultValue={item.description}
                                                    className="input-field resize-none"
                                                    rows={3}
                                                    placeholder="Item description"
                                                />
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="flex items-center space-x-2">
                                                        <DollarSign className="w-5 h-5 text-gray-500" />
                                                        <input
                                                            type="number"
                                                            step="0.01"
                                                            id={`item-price-${item.id}`}
                                                            defaultValue={item.price}
                                                            className="input-field"
                                                            placeholder="Price"
                                                        />
                                                    </div>
                                                    <select
                                                        id={`item-category-${item.id}`}
                                                        defaultValue={item.category}
                                                        className="input-field"
                                                    >
                                                        {MENU_CATEGORIES.map(cat => (
                                                            <option key={cat} value={cat}>{cat}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="flex space-x-6">
                                                    <label className="flex items-center space-x-2">
                                                        <input
                                                            type="checkbox"
                                                            id={`item-available-${item.id}`}
                                                            defaultChecked={item.available}
                                                            className="rounded"
                                                        />
                                                        <span className="text-sm text-gray-700">Available</span>
                                                    </label>
                                                    <label className="flex items-center space-x-2">
                                                        <input
                                                            type="checkbox"
                                                            id={`item-spicy-${item.id}`}
                                                            defaultChecked={item.spicy}
                                                            className="rounded"
                                                        />
                                                        <span className="text-sm text-gray-700">Spicy 🌶️</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                                                    {item.image ? (
                                                        <div className="relative">
                                                            <img src={item.image} alt={item.name} className="w-full h-32 object-cover rounded-lg" />
                                                            <label className="absolute bottom-2 right-2 bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700 cursor-pointer">
                                                                <Upload className="w-4 h-4" />
                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={(e) => handleImageUpload(item.id, e)}
                                                                    className="hidden"
                                                                />
                                                            </label>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                                            <label className="text-orange-600 hover:text-orange-700 cursor-pointer">
                                                                Upload Photo
                                                                <input
                                                                    type="file"
                                                                    accept="image/*"
                                                                    onChange={(e) => handleImageUpload(item.id, e)}
                                                                    className="hidden"
                                                                />
                                                            </label>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="md:col-span-2 flex justify-end space-x-4">
                                                <button onClick={cancelEdit} className="btn-secondary">
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={() => saveMenuItem(item.id)}
                                                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                                                >
                                                    <Save className="w-4 h-4" />
                                                    <span>Save</span>
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex justify-between items-start">
                                            <div className="flex space-x-4 flex-1">
                                                <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                                                    {item.image ? (
                                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <Camera className="w-8 h-8 text-gray-400" />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-2 mb-1">
                                                        <h5 className="text-lg font-semibold text-gray-800">{item.name}</h5>
                                                        {item.spicy && <span>🌶️</span>}
                                                        {!item.available && (
                                                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                                                                Unavailable
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-gray-600 mb-2">{item.description}</p>
                                                    <p className="text-2xl font-bold text-orange-600">${item.price.toFixed(2)}</p>
                                                </div>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => setEditingItem(item.id)}
                                                    className="text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                                    title="Edit item"
                                                >
                                                    <Edit3 className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => deleteMenuItem(item.id)}
                                                    className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-100 transition-colors"
                                                    title="Delete item"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );

    const renderAnalyticsTab = () => (
        <div className="space-y-8">
            <h3 className="text-3xl font-bold text-gray-800">Analytics & Reports</h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Total Menu Items</h4>
                    <p className="text-3xl font-bold text-orange-600">{menuItems.length}</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Available Items</h4>
                    <p className="text-3xl font-bold text-green-600">
                        {menuItems.filter(item => item.available).length}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Average Price</h4>
                    <p className="text-3xl font-bold text-blue-600">
                        ${(menuItems.reduce((sum, item) => sum + item.price, 0) / menuItems.length || 0).toFixed(2)}
                    </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-lg">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Orders This Month</h4>
                    <p className="text-3xl font-bold text-purple-600">{orders.length}</p>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">Popular Categories</h4>
                <div className="space-y-3">
                    {MENU_CATEGORIES.map(category => {
                        const count = menuItems.filter(item => item.category === category).length;
                        const percentage = (count / menuItems.length * 100) || 0;
                        return (
                            <div key={category} className="flex items-center justify-between">
                                <span className="text-gray-700">{category}</span>
                                <div className="flex items-center space-x-3">
                                    <div className="w-32 bg-gray-200 rounded-full h-3">
                                        <div
                                            className="bg-orange-600 h-3 rounded-full"
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm text-gray-600 w-12">{count} items</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Admin Header */}
            <div className="mb-8">
                <h2 className="text-4xl font-bold text-gray-800 mb-2">Restaurant Admin Dashboard</h2>
                <p className="text-xl text-gray-600">Manage your orders, menu, and restaurant operations</p>
            </div>

            {/* Admin Tabs */}
            <div className="mb-8">
                <div className="flex space-x-4 border-b">
                    {adminTabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveAdminTab(tab.id)}
                            className={`px-6 py-3 font-semibold transition-colors flex items-center space-x-2 ${
                                activeAdminTab === tab.id
                                    ? 'text-orange-600 border-b-2 border-orange-600'
                                    : 'text-gray-600 hover:text-gray-800'
                            }`}
                        >
                            {tab.icon}
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            {activeAdminTab === 'orders' && renderOrdersTab()}
            {activeAdminTab === 'menu' && renderMenuTab()}
            {activeAdminTab === 'analytics' && renderAnalyticsTab()}
        </div>
    );
};

export default AdminDashboard;