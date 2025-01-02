//require dotenv
require('dotenv').config({ path: './config/.env' });

//require express
const express = require('express');
const app = express();
const path = require('path')
//require cors
const cors = require('cors');

//require routes
const routes = require('./routes/routes.js');
const cookieParser = require('cookie-parser');
const dealerRoutes = require('./routes/dealerRoutes.js');


app.use("/uploads/vehicles", express.static(path.join(__dirname, "uploads/vehicles")));
//connect database
require('./config/database.js').connectDatabase();

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(process.env.LOCAL_URL, routes);
app.use(process.env.LOCAL_URL, dealerRoutes);

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + '/build/index.html'));
// });

app.use(require('./middleware/error'));

app.listen(process.env.PORT, console.log("Listening on port 8080"));
