import React, { useState } from 'react';
import { Utensils, Menu, X, Settings, LogOut, ShoppingCart } from 'lucide-react';

const RestaurantNavigation = ({ activeTab, setActiveTab, isAdmin, setIsAdmin, setShowAdminLogin, cartCount }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'menu', label: 'Menu' },
        { id: 'order', label: `Cart ${cartCount > 0 ? `(${cartCount})` : ''}` },
        { id: 'contact', label: 'Contact' }
    ];

    if (isAdmin) {
        navItems.push({ id: 'admin', label: 'Dashboard' });
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
        setIsMobileMenuOpen(false);
    };

    const handleAdminLogin = () => {
        setShowAdminLogin(true);
        setIsMobileMenuOpen(false);
    };

    const handleLogout = () => {
        setIsAdmin(false);
        setActiveTab('home');
        setIsMobileMenuOpen(false);
        // Remove admin parameter from URL
        window.history.replaceState({}, document.title, window.location.pathname);
    };

    return (
        <nav className="bg-orange-600 text-white shadow-lg">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center py-6">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <Utensils className="w-12 h-12" />
                        <div>
                            <h1 className="text-4xl font-bold">Friends of All</h1>
                            <p className="text-orange-100 text-sm">Delicious Food</p>
                        </div>
                        {isAdmin && (
                            <span className="bg-white text-orange-600 px-3 py-1 rounded-full text-sm font-semibold ml-3">
                                Admin
                            </span>
                        )}
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map(item => (
                            <button
                                key={item.id}
                                onClick={() => handleTabClick(item.id)}
                                className={`px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${
                                    activeTab === item.id
                                        ? 'bg-white text-orange-600 font-bold shadow-lg scale-105'
                                        : 'hover:bg-orange-700 hover:scale-105 hover:shadow-md'
                                }`}
                            >
                                {item.id === 'order' && <ShoppingCart className="w-5 h-5" />}
                                <span>{item.label}</span>
                            </button>
                        ))}

                        {/* Admin Controls */}
                        {isAdmin ? (
                            <button
                                onClick={handleLogout}
                                className="px-6 py-3 rounded-xl text-lg font-semibold hover:bg-orange-700 transition-all duration-300 flex items-center space-x-2 hover:scale-105"
                            >
                                <LogOut className="w-5 h-5" />
                                <span>Logout</span>
                            </button>
                        ) : (
                            <button
                                onClick={handleAdminLogin}
                                className="px-6 py-3 rounded-xl text-lg font-semibold hover:bg-orange-700 transition-all duration-300 flex items-center space-x-2 hover:scale-105"
                            >
                                <Settings className="w-5 h-5" />
                                <span>Admin</span>
                            </button>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden p-3 rounded-xl hover:bg-orange-700 transition-colors relative"
                    >
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                        {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-6 border-t border-orange-500">
                        <div className="flex flex-col space-y-3">
                            {navItems.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => handleTabClick(item.id)}
                                    className={`px-6 py-4 rounded-xl text-lg font-semibold text-left transition-all duration-300 flex items-center space-x-3 ${
                                        activeTab === item.id
                                            ? 'bg-white text-orange-600 font-bold shadow-lg'
                                            : 'hover:bg-orange-700 hover:scale-105'
                                    }`}
                                >
                                    {item.id === 'order' && <ShoppingCart className="w-5 h-5" />}
                                    <span>{item.label}</span>
                                </button>
                            ))}

                            {/* Mobile Admin Controls */}
                            {isAdmin ? (
                                <button
                                    onClick={handleLogout}
                                    className="px-6 py-4 rounded-xl text-lg font-semibold text-left hover:bg-orange-700 transition-all duration-300 flex items-center space-x-3"
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span>Logout</span>
                                </button>
                            ) : (
                                <button
                                    onClick={handleAdminLogin}
                                    className="px-6 py-4 rounded-xl text-lg font-semibold text-left hover:bg-orange-700 transition-all duration-300 flex items-center space-x-3"
                                >
                                    <Settings className="w-5 h-5" />
                                    <span>Admin Login</span>
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default RestaurantNavigation;