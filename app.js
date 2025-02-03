//require dotenv
require('dotenv').config({ path: './config/.env' });

//require express
const express = require('express');
const app = express();
const path = require('path')
//require cors
const cors = require('cors');
const stripe = require('stripe')('sk_test_tR3PYbcVNZZ796tH88S4VQ2u');
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


app.use('/elstar-local', routes);
app.use('/elstar-local', dealerRoutes);

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname + '/build/index.html'));
// });

app.use(require('./middleware/error'));

app.post('/elstar-local/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'T-shirt',
          },
          unit_amount: 2000,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `http://localhost:3000/?success=true`,
    cancel_url: `http://localhost:3000/?canceled=true`,
});

  res.redirect(303, session.url);
});

const port = process.env.PORT || 1024;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});