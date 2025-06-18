export const INITIAL_MENU_ITEMS = [
    // Appetizers
    {
        id: 1,
        name: 'Wings (8 pieces)',
        description: 'Crispy chicken wings with your choice of sauce',
        price: 12.99,
        category: 'Appetizers',
        image: null,
        available: true,
        spicy: true
    },
    {
        id: 2,
        name: 'Mozzarella Sticks',
        description: 'Golden fried cheese sticks served with marinara sauce',
        price: 8.99,
        category: 'Appetizers',
        image: null,
        available: true,
        spicy: false
    },
    {
        id: 3,
        name: 'Loaded Nachos',
        description: 'Tortilla chips topped with cheese, jalapeños, and sour cream',
        price: 10.99,
        category: 'Appetizers',
        image: null,
        available: true,
        spicy: true
    },

    // Main Dishes
    {
        id: 4,
        name: 'Classic Burger',
        description: 'Beef patty with lettuce, tomato, onion, and pickles',
        price: 14.99,
        category: 'Main Dishes',
        image: null,
        available: true,
        spicy: false
    },
    {
        id: 5,
        name: 'BBQ Ribs (Half Rack)',
        description: 'Tender pork ribs with house BBQ sauce',
        price: 18.99,
        category: 'Main Dishes',
        image: null,
        available: true,
        spicy: false
    },
    {
        id: 6,
        name: 'Grilled Chicken Caesar',
        description: 'Fresh romaine lettuce with grilled chicken and Caesar dressing',
        price: 13.99,
        category: 'Main Dishes',
        image: null,
        available: true,
        spicy: false
    },
    {
        id: 7,
        name: 'Fish & Chips',
        description: 'Beer-battered cod with crispy fries and tartar sauce',
        price: 16.99,
        category: 'Main Dishes',
        image: null,
        available: true,
        spicy: false
    },

    // Sides
    {
        id: 8,
        name: 'French Fries',
        description: 'Crispy golden fries',
        price: 4.99,
        category: 'Sides',
        image: null,
        available: true,
        spicy: false
    },
    {
        id: 9,
        name: 'Onion Rings',
        description: 'Beer-battered onion rings',
        price: 5.99,
        category: 'Sides',
        image: null,
        available: true,
        spicy: false
    },
    {
        id: 10,
        name: 'Mac & Cheese',
        description: 'Creamy macaroni and cheese',
        price: 6.99,
        category: 'Sides',
        image: null,
        available: true,
        spicy: false
    },

    // Desserts
    {
        id: 11,
        name: 'Chocolate Cake',
        description: 'Rich chocolate cake with chocolate frosting',
        price: 6.99,
        category: 'Desserts',
        image: null,
        available: true,
        spicy: false
    },
    {
        id: 12,
        name: 'Ice Cream (3 scoops)',
        description: 'Vanilla, chocolate, or strawberry',
        price: 4.99,
        category: 'Desserts',
        image: null,
        available: true,
        spicy: false
    },

    // Beverages
    {
        id: 13,
        name: 'Soft Drinks',
        description: 'Coke, Pepsi, Sprite, Orange',
        price: 2.99,
        category: 'Beverages',
        image: null,
        available: true,
        spicy: false
    },
    {
        id: 14,
        name: 'Fresh Juice',
        description: 'Orange, Apple, or Cranberry',
        price: 3.99,
        category: 'Beverages',
        image: null,
        available: true,
        spicy: false
    },
    {
        id: 15,
        name: 'Coffee',
        description: 'Fresh brewed coffee',
        price: 2.49,
        category: 'Beverages',
        image: null,
        available: true,
        spicy: false
    }
];

export const MENU_CATEGORIES = ['Appetizers', 'Main Dishes', 'Sides', 'Desserts', 'Beverages'];

export const INITIAL_ORDERS = [
    {
        id: 1,
        customerName: 'John Smith',
        phone: '(555) 123-4567',
        email: 'john@example.com',
        items: [
            { name: 'Classic Burger', quantity: 2, price: 14.99, total: 29.98 },
            { name: 'French Fries', quantity: 2, price: 4.99, total: 9.98 }
        ],
        total: 39.96,
        status: 'preparing',
        timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 min ago
        estimatedTime: '25-35 minutes'
    }
];

export const ORDER_STATUSES = {
    pending: { label: 'Order Received', color: 'bg-yellow-500' },
    confirmed: { label: 'Order Confirmed', color: 'bg-blue-500' },
    preparing: { label: 'Preparing', color: 'bg-orange-500' },
    ready: { label: 'Ready for Pickup', color: 'bg-green-500' },
    delivered: { label: 'Delivered', color: 'bg-gray-500' },
    cancelled: { label: 'Cancelled', color: 'bg-red-500' }
};

export const RESTAURANT_INFO = {
    name: 'Friends of All',
    tagline: 'Delicious food made with love',
    phone: '(555) 123-4567',
    address: '123 Foodie Street, Delicious City, DC 12345',
    hours: {
        'Monday - Thursday': '11:00 AM - 9:00 PM',
        'Friday - Saturday': '11:00 AM - 10:00 PM',
        'Sunday': '12:00 PM - 8:00 PM'
    },
    delivery: {
        fee: 2.99,
        minimum: 15.00,
        time: '25-35 minutes'
    }
};