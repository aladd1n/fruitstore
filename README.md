# FreshDaily Portal - Fruit Store Management

A fruit store management application with separate admin and customer views. Admins can set daily prices and visibility for products per customer, while customers see their personalized catalog.

## Features

- **Admin Dashboard**: Manage daily prices and product visibility for each customer
- **Customer Dashboard**: Browse available products with personalized pricing
- **Dynamic Pricing**: Set custom prices per customer per product
- **Product Visibility**: Control which products each customer can see
- **Responsive Design**: Works on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

### Running the App

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production

Build the app for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Usage

1. **Login Screen**: Choose to login as Store Owner (admin) or select a customer
2. **Admin View**: Select a customer from the sidebar and manage their product prices and visibility
3. **Customer View**: Browse available products and add items to cart