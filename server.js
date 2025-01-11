const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes=require("./routes/authRoutes.js")
const dashRoutes=require('./routes/dashboardRoutes.js');
const PersonnelRoutes=require('./routes/deliveryPersonnelRoutes');
const DeliveryRoutes=require('./routes/deliveryTrackingRoutes')
const DietRoutes=require('./routes/dietChartRoutes')
const NotificationRoutes=require('./routes/notificationRoutes')
const PantryRoutes=require('./routes/pantryStaffRoutes')
const PatientRoutes= require('./routes/patientRoutes')
const TaskRoutes=require('./routes/taskRoutes')

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/dashboard',dashRoutes);
app.use('api/deliveryPersonnel',PersonnelRoutes)
app.use('/api/deliveries',DeliveryRoutes);
app.use('/api/dietcharts', DietRoutes);
app.use('/api/notifications',NotificationRoutes);
app.use('/api/pantryStaff', PantryRoutes);
app.use('/api/patients',PatientRoutes);
app.use('/api/tasks', TaskRoutes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
