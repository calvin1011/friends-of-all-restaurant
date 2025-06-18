import React, { useState } from 'react';
import { Phone, MapPin, Clock, Mail, MessageSquare, Star, Utensils, Truck } from 'lucide-react';
import { RESTAURANT_INFO } from '../utils/restaurantConstants';

const RestaurantContactPage = () => {
    const [feedbackForm, setFeedbackForm] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
        rating: 5
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFeedbackForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmitFeedback = (e) => {
        e.preventDefault();

        if (!feedbackForm.name || !feedbackForm.message) {
            alert('Please fill in your name and message.');
            return;
        }

        // Create feedback summary
        const feedbackSummary = `
Thank you for your feedback!

Name: ${feedbackForm.name}
${feedbackForm.email ? `Email: ${feedbackForm.email}` : ''}
${feedbackForm.phone ? `Phone: ${feedbackForm.phone}` : ''}
Rating: ${feedbackForm.rating}/5 stars
Message: ${feedbackForm.message}

We appreciate your input and will get back to you soon!
        `.trim();

        alert(feedbackSummary);

        // Reset form
        setFeedbackForm({
            name: '',
            email: '',
            phone: '',
            message: '',
            rating: 5
        });
    };

    const features = [
        {
            icon: <Utensils className="w-8 h-8 text-orange-600" />,
            title: "Fresh Daily",
            description: "All ingredients sourced fresh daily from local suppliers"
        },
        {
            icon: <Truck className="w-8 h-8 text-orange-600" />,
            title: "Fast Delivery",
            description: "Hot food delivered to your door in 25-35 minutes"
        },
        {
            icon: <Star className="w-8 h-8 text-orange-600" />,
            title: "5-Star Service",
            description: "Consistently rated excellent by our happy customers"
        }
    ];

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Header */}
            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">Contact Friends of All</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    We'd love to hear from you! Get in touch for orders, feedback, or any questions
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
                {/* Contact Information */}
                <div className="space-y-8">
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h3>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-6 h-6 text-orange-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-1">Phone Orders</h4>
                                    <p className="text-gray-600 mb-2">{RESTAURANT_INFO.phone}</p>
                                    <p className="text-sm text-gray-500">Call us for quick orders and questions</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-6 h-6 text-orange-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-1">Location</h4>
                                    <p className="text-gray-600 mb-2">{RESTAURANT_INFO.address}</p>
                                    <p className="text-sm text-gray-500">Visit us for dine-in or pickup</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-6 h-6 text-orange-600" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-800 mb-1">Email</h4>
                                    <p className="text-gray-600 mb-2">info@friendsofall.com</p>
                                    <p className="text-sm text-gray-500">For catering and special requests</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Business Hours */}
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                            <Clock className="w-6 h-6 mr-3 text-orange-600" />
                            Business Hours
                        </h3>
                        <div className="space-y-3">
                            {Object.entries(RESTAURANT_INFO.hours).map(([day, hours]) => (
                                <div key={day} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                                    <span className="font-semibold text-gray-700">{day}</span>
                                    <span className="text-gray-600">{hours}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 p-4 bg-green-50 rounded-lg">
                            <h4 className="font-semibold text-green-800 mb-2">Delivery Information</h4>
                            <div className="space-y-1 text-sm text-green-700">
                                <p>🚚 Delivery Time: {RESTAURANT_INFO.delivery.time}</p>
                                <p>💰 Delivery Fee: ${RESTAURANT_INFO.delivery.fee} (Free over $30)</p>
                                <p>📦 Minimum Order: ${RESTAURANT_INFO.delivery.minimum}</p>
                            </div>
                        </div>
                    </div>

                    {/* Features */}
                    <div className="bg-white rounded-xl shadow-lg p-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Why Choose Us?</h3>
                        <div className="space-y-6">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-start space-x-4">
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-1">{feature.title}</h4>
                                        <p className="text-gray-600">{feature.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Feedback Form */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                        <MessageSquare className="w-6 h-6 mr-3 text-orange-600" />
                        Send us Feedback
                    </h3>

                    <form onSubmit={handleSubmitFeedback} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={feedbackForm.name}
                                onChange={handleInputChange}
                                placeholder="Your full name"
                                className="input-field"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email (Optional)
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={feedbackForm.email}
                                    onChange={handleInputChange}
                                    placeholder="your.email@example.com"
                                    className="input-field"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone (Optional)
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={feedbackForm.phone}
                                    onChange={handleInputChange}
                                    placeholder="(555) 123-4567"
                                    className="input-field"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Rate Your Experience
                            </label>
                            <div className="flex items-center space-x-1">
                                {[1, 2, 3, 4, 5].map(rating => (
                                    <button
                                        key={rating}
                                        type="button"
                                        onClick={() => setFeedbackForm(prev => ({ ...prev, rating }))}
                                        className={`p-1 transition-colors ${
                                            rating <= feedbackForm.rating
                                                ? 'text-yellow-400'
                                                : 'text-gray-300'
                                        }`}
                                    >
                                        <Star className="w-8 h-8 fill-current" />
                                    </button>
                                ))}
                                <span className="ml-3 text-gray-600">
                                    {feedbackForm.rating}/5 stars
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Your Message *
                            </label>
                            <textarea
                                name="message"
                                value={feedbackForm.message}
                                onChange={handleInputChange}
                                placeholder="Tell us about your experience, suggestions, or any questions..."
                                rows={6}
                                className="input-field resize-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2"
                        >
                            <MessageSquare className="w-5 h-5" />
                            <span>Send Feedback</span>
                        </button>
                    </form>

                    <div className="mt-8 p-4 bg-orange-50 rounded-lg">
                        <h4 className="font-semibold text-orange-800 mb-2">Quick Order Options</h4>
                        <div className="space-y-2">
                            <button
                                onClick={() => window.location.hash = '#menu'}
                                className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors"
                            >
                                📱 Order Online Now
                            </button>
                            <div className="text-center text-orange-700">
                                <p className="text-sm">Or call us at</p>
                                <p className="font-bold text-lg">{RESTAURANT_INFO.phone}</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        <p>We typically respond to feedback within 24 hours</p>
                    </div>
                </div>
            </div>

            {/* Call to Action */}
            <div className="mt-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl p-8 text-white text-center">
                <h3 className="text-3xl font-bold mb-4">Ready to Order?</h3>
                <p className="text-xl mb-6 opacity-90">
                    Delicious food is just a click away!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => window.location.hash = '#menu'}
                        className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                        Browse Menu
                    </button>
                    <a
                        href={`tel:${RESTAURANT_INFO.phone}`}
                        className="bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-800 transition-colors"
                    >
                        Call to Order
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RestaurantContactPage;