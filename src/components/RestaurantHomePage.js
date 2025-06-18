import React from 'react';
import { Utensils, Clock, Truck, Star } from 'lucide-react';
import { RESTAURANT_INFO } from '../utils/restaurantConstants';

const RestaurantHomePage = ({ setActiveTab }) => {
    const features = [
        {
            icon: <Utensils className="w-8 h-8 text-orange-600" />,
            title: "Fresh Ingredients",
            description: "We use only the freshest, locally-sourced ingredients in all our dishes"
        },
        {
            icon: <Clock className="w-8 h-8 text-orange-600" />,
            title: "Quick Service",
            description: "Fast preparation without compromising on quality and taste"
        },
        {
            icon: <Truck className="w-8 h-8 text-orange-600" />,
            title: "Delivery Available",
            description: "Get your favorite meals delivered right to your doorstep"
        },
        {
            icon: <Star className="w-8 h-8 text-orange-600" />,
            title: "5-Star Quality",
            description: "Consistently rated excellent by our satisfied customers"
        }
    ];

    const specialOffers = [
        {
            title: "Family Combo",
            description: "2 Main dishes + 2 Sides + 4 Drinks",
            originalPrice: 45.99,
            offerPrice: 35.99,
            savings: 10.00
        },
        {
            title: "Lunch Special",
            description: "Any main dish + side + drink",
            originalPrice: 18.99,
            offerPrice: 14.99,
            savings: 4.00
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
            <div className="max-w-6xl mx-auto px-4 py-16">
                {/* Hero Section */}
                <div className="text-center mb-16 fade-in">
                    <h2 className="text-6xl font-bold text-gray-800 mb-6">
                        Welcome to {RESTAURANT_INFO.name}
                    </h2>
                    <p className="text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
                        {RESTAURANT_INFO.tagline} - Where every meal is prepared with care and served with a smile
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => setActiveTab('menu')}
                            className="bg-orange-600 text-white px-8 py-4 rounded-xl text-xl font-semibold hover:bg-orange-700 transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                            View Our Menu
                        </button>
                        <button
                            onClick={() => setActiveTab('contact')}
                            className="bg-white text-orange-600 border-2 border-orange-600 px-8 py-4 rounded-xl text-xl font-semibold hover:bg-orange-50 transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                            Order Now
                        </button>
                    </div>
                </div>

                {/* Special Offers */}
                <div className="mb-16">
                    <h3 className="text-4xl font-bold text-center text-gray-800 mb-8">Today's Special Offers</h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        {specialOffers.map((offer, index) => (
                            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-orange-200">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h4 className="text-2xl font-bold text-gray-800 mb-2">{offer.title}</h4>
                                        <p className="text-gray-600">{offer.description}</p>
                                    </div>
                                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                        Save ${offer.savings}
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-gray-400 line-through text-lg">${offer.originalPrice}</span>
                                        <span className="text-3xl font-bold text-orange-600">${offer.offerPrice}</span>
                                    </div>
                                    <button
                                        onClick={() => setActiveTab('menu')}
                                        className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                                    >
                                        Order Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`bg-white text-center p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 fade-in animation-delay-${index * 75}`}
                        >
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-gray-800">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Hours & Delivery Info */}
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-xl shadow-lg">
                        <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                            <Clock className="w-6 h-6 mr-3 text-orange-600" />
                            Business Hours
                        </h3>
                        <div className="space-y-3">
                            {Object.entries(RESTAURANT_INFO.hours).map(([day, hours]) => (
                                <div key={day} className="flex justify-between items-center">
                                    <span className="font-semibold text-gray-700">{day}</span>
                                    <span className="text-gray-600">{hours}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-lg">
                        <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                            <Truck className="w-6 h-6 mr-3 text-orange-600" />
                            Delivery Info
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-700">Delivery Fee</span>
                                <span className="text-gray-600">${RESTAURANT_INFO.delivery.fee}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-700">Minimum Order</span>
                                <span className="text-gray-600">${RESTAURANT_INFO.delivery.minimum}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-700">Delivery Time</span>
                                <span className="text-gray-600">{RESTAURANT_INFO.delivery.time}</span>
                            </div>
                            <div className="mt-6 p-4 bg-green-50 rounded-lg">
                                <p className="text-green-700 text-sm font-medium">
                                    🚚 Free delivery on orders over $30!
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantHomePage;