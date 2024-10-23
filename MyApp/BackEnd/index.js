const express = require('express');
const connectDB = require('./config/config');
const cors = require('cors')
const userRoutes = require('./routes/userRoutes'); // Adjust path as necessary

const app = express();
const PORT = 2000;

// Connect to the database
connectDB();

app.use(express.json());

app.use(cors())

// Use the user routes
app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
