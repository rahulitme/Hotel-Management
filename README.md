# Hotel Booking System

A full-stack hotel booking application built with React and Express.js.

## 🏨 Features

- **Room Management**: Browse and view detailed room information
- **User Authentication**: Register, login, and user profiles
- **Booking System**: Make reservations with date validation
- **Dashboard**: View booking history and manage reservations
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Real-time Validation**: Client and server-side validation

## 🛠 Tech Stack

### Frontend
- **React 18.2.0** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **React Router DOM** - Navigation

### Backend
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/hotel-booking-system.git
   cd hotel-booking-system
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**
   
   Create `server/.env` file:
   ```env
   PORT=5003
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/hotel-booking
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRE=30d
   ```

5. **Seed the database**
   ```bash
   cd server
   node seedDatabase.js
   ```

## 🏃‍♂️ Running the Application

### Start Backend Server
```bash
cd server
npm start
# Server runs on http://localhost:5003
```

### Start Frontend Development Server
```bash
cd client
npm run dev
# Client runs on http://localhost:3000
```

## 👤 Default Admin Credentials

- **Email**: admin@hotel.com
- **Password**: admin123

## 📁 Project Structure

```
hotel-booking-system/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── contexts/      # React contexts
│   │   ├── data/          # Mock data
│   │   └── pages/         # Page components
│   └── package.json
├── server/                # Express backend
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   └── package.json
└── README.md
```

## 🎯 Key Features Implemented

- ✅ User registration and authentication
- ✅ Room browsing with filtering
- ✅ Booking creation and management
- ✅ User dashboard with booking history
- ✅ Responsive design
- ✅ Form validation
- ✅ Error handling

## 🔮 Future Enhancements

- Payment integration
- Email notifications
- Admin panel for room management
- Review and rating system
- Advanced search filters

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.
