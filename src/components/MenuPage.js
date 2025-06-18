import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart, Filter, Search, Star, Flame } from 'lucide-react';
import { MENU_CATEGORIES } from '../utils/restaurantConstants';
import { Utensils } from 'lucide-react';

const MenuPage = ({ menuItems, addToCart, cart, isAdmin, setMenuItems }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [showOnlyAvailable, setShowOnlyAvailable] = useState(true);
    const [quantities, setQuantities] = useState({});
    const [specialInstructions, setSpecialInstructions] = useState({});

    const filteredItems = menuItems.filter(item => {
        const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesAvailability = !showOnlyAvailable || item.available;

        return matchesCategory && matchesSearch && matchesAvailability;
    });

    const updateQuantity = (itemId, change) => {
        setQuantities(prev => ({
            ...prev,
            [itemId]: Math.max(1, (prev[itemId] || 1) + change)
        }));
    };

    const handleAddToCart = (item) => {
        const quantity = quantities[item.id] || 1;
        const instructions = specialInstructions[item.id] || '';
        addToCart(item, quantity, instructions);

        // Reset for this item
        setQuantities(prev => ({ ...prev, [item.id]: 1 }));
        setSpecialInstructions(prev => ({ ...prev, [item.id]: '' }));

        // Show success feedback
        const button = document.getElementById(`add-button-${item.id}`);
        if (button) {
            const original = button.innerHTML;
            button.innerHTML = '✓ Added!';
            button.className = button.className.replace('bg-orange-600', 'bg-green-600');
            setTimeout(() => {
                button.innerHTML = original;
                button.className = button.className.replace('bg-green-600', 'bg-orange-600');
            }, 1000);
        }
    };

    const categories = ['All', ...MENU_CATEGORIES];

    return (
        <div className="max-w-7xl mx-auto p-6">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Menu</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Discover our delicious selection of freshly prepared dishes
                </p>
            </div>

            {/* Filters */}
            <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search menu items..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="input-field pl-10"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="relative">
                        <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="input-field pl-10"
                        >
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    {/* Availability Filter */}
                    <div className="flex items-center space-x-3">
                        <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={showOnlyAvailable}
                                onChange={(e) => setShowOnlyAvailable(e.target.checked)}
                                className="rounded text-orange-600"
                            />
                            <span className="text-gray-700">Show only available items</span>
                        </label>
                    </div>
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-3 mt-6">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                                selectedCategory === category
                                    ? 'bg-orange-600 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Menu Items Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map(item => (
                    <div key={item.id} className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 ${!item.available ? 'opacity-60' : ''}`}>
                        {/* Item Image */}
                        <div className="relative h-48 bg-gray-100">
                            {item.image ? (
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <div className="text-center">
                                        <Utensils className="w-16 h-16 text-gray-300 mx-auto mb-2" />
                                        <p className="text-gray-400 text-sm">No image</p>
                                    </div>
                                </div>
                            )}

                            {/* Badges */}
                            <div className="absolute top-3 left-3 flex flex-col space-y-2">
                                {item.spicy && (
                                    <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                                        <Flame className="w-3 h-3 mr-1" />
                                        Spicy
                                    </span>
                                )}
                                {!item.available && (
                                    <span className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                        Unavailable
                                    </span>
                                )}
                            </div>

                            {/* Popular Badge (you can add logic for this) */}
                            <div className="absolute top-3 right-3">
                                <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                                    <Star className="w-3 h-3 mr-1" />
                                    Popular
                                </span>
                            </div>
                        </div>

                        {/* Item Details */}
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-3">
                                <h3 className="text-xl font-bold text-gray-800">{item.name}</h3>
                                <span className="text-2xl font-bold text-orange-600">${item.price.toFixed(2)}</span>
                            </div>

                            <p className="text-gray-600 mb-4 leading-relaxed">{item.description}</p>

                            <div className="text-sm text-gray-500 mb-4">
                                <span className="bg-gray-100 px-2 py-1 rounded">{item.category}</span>
                            </div>

                            {item.available ? (
                                <div className="space-y-4">
                                    {/* Quantity Selector */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-700">Quantity:</span>
                                        <div className="flex items-center space-x-3">
                                            <button
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors flex items-center justify-center"
                                                disabled={(quantities[item.id] || 1) <= 1}
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-8 text-center font-semibold">
                                                {quantities[item.id] || 1}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors flex items-center justify-center"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Special Instructions */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Special Instructions (optional):
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g., no onions, extra spice..."
                                            value={specialInstructions[item.id] || ''}
                                            onChange={(e) => setSpecialInstructions(prev => ({
                                                ...prev,
                                                [item.id]: e.target.value
                                            }))}
                                            className="input-field text-sm"
                                        />
                                    </div>

                                    {/* Add to Cart Button */}
                                    <button
                                        id={`add-button-${item.id}`}
                                        onClick={() => handleAddToCart(item)}
                                        className="w-full bg-orange-600 text-white py-3 rounded-lg font-semibold hover:bg-orange-700 transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105"
                                    >
                                        <ShoppingCart className="w-5 h-5" />
                                        <span>Add to Cart - ${((quantities[item.id] || 1) * item.price).toFixed(2)}</span>
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center py-4">
                                    <p className="text-gray-500 font-medium">Currently Unavailable</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredItems.length === 0 && (
                <div className="text-center py-16">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Search className="w-12 h-12 text-gray-400" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-600 mb-4">No items found</h3>
                    <p className="text-lg text-gray-500 mb-6">
                        Try adjusting your search or filter criteria
                    </p>
                    <button
                        onClick={() => {
                            setSearchTerm('');
                            setSelectedCategory('All');
                            setShowOnlyAvailable(false);
                        }}
                        className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
                    >
                        Clear Filters
                    </button>
                </div>
            )}

            {/* Cart Summary (Floating) */}
            {cart.length > 0 && (
                <div className="fixed bottom-6 right-6 bg-orange-600 text-white p-4 rounded-xl shadow-2xl z-50">
                    <div className="flex items-center space-x-3">
                        <ShoppingCart className="w-6 h-6" />
                        <div>
                            <p className="font-semibold">{cart.length} items in cart</p>
                            <p className="text-sm opacity-90">
                                Total: ${cart.reduce((sum, item) => sum + item.total, 0).toFixed(2)}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MenuPage;