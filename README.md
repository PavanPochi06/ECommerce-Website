🛒 React E-Commerce Application

A fully functional e-commerce web application built while learning React.js, focusing on real-world project structure, component-based architecture, routing, state handling, styling, and testing.

This project simulates a modern online shopping experience including product listing, checkout flow, order tracking, and order history.

🚀 Features

    Product listing with images, pricing, and ratings
    
    Add to cart & checkout flow
    
    Delivery options & payment summary
    
    Order history & tracking page
    
    Reusable components and modular styling
    
    Unit testing for components and utilities
    
    Modern build tooling with Vite

  📂 Project Structure
  
    project-root/
    ├── frontend/     # React application (UI)
    └── backend/      # Backend service (API & data)
    
  Frontend and Backend are independent
  
  Each can be started separately
  
  Frontend communicates with backend via API calls

  🎨 Frontend (React)
  
  Tech Stack
    
    React.js (Functional Components & Hooks)
    
    Vite
    
    CSS Modules / Page-based CSS
    
    Vitest for testing
    
    Responsibilities
    
    Render UI and pages
    
    Display products
    
    Handle cart & checkout UI
    
    Show orders & tracking
    
    Consume backend APIs

  Key Structure

    frontend/src/
    ├── components/     # Reusable UI components
    ├── pages/          # Home, Checkout, Orders
    ├── styles/         # Page & shared styles
    ├── utils/          # Utility functions
    └── App.jsx

🖥️ Backend

  The backend acts as a data provider for the frontend and simulates real API behavior.
  
  Responsibilities
  
  Serve product data
  
  Manage cart data
  
  Handle orders & delivery options
  
  Provide order tracking data

  Data Structure
  
      backend/
        ├── deliveryOptions.js     # API logic for available delivery methods
        ├── orders.js              # Handles order creation & order history
        ├── paymentSummary.js      # Calculates totals, tax, and payment breakdown
        ├── products.js            # Provides product data to the frontend
        ├── reset.js               # Resets mock data to initial state (for testing)


This backend can be:

  A Node.js + Express API
  
  Or a mock API (JSON-based) used for learning and testing
  

🔄 Frontend ↔ Backend Interaction

  Frontend fetches data from backend APIs  
  
  Data-driven UI rendering
  
  Separation of concerns between UI and business logic
  
  Mimics real-world client–server communication

🚀 Running the Project

  Run Backend
    
    cd backend
    npm install
    npm start
    
  Run Frontend
  
    cd frontend
    npm install
    npm run dev


Both services run independently and must be running simultaneously for full functionality.

🧪 Testing

  Frontend Testing
  
  Component testing using Vitest
  
  Utility function testing
  
  Ensures predictable UI behavior

🧠 What This Project Demonstrates

  Clear frontend–backend separation
  
  Component-based React architecture
  
  API-driven UI development
  
  Scalable folder structure
  
  Testing mindset
  
  Real-world development workflow

📌 Future Enhancements

  Convert mock backend into Express REST API
  
  Add authentication & authorization
  
  Persist data using a database
  
  Introduce global state management

🧠 What I Learned From This Project

  Building applications using component-based architecture
  
  Managing UI through props and state
  
  Structuring React projects for scalability
  
  Writing unit tests for components and utilities
  
  Using Vite for fast development workflows
  
  Handling assets and styles in a real-world React app
