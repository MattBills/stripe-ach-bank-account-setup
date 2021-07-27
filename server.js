const express = require('express');
const plaid = require('plaid');
const stripe = require('stripe');

require('dotenv').config();
const port = process.env.PORT;

const app = express();
app.use(express.json());

const plaidClient = new plaid.Client({
  clientID: process.env.PLAID_CLIENT_ID,
  secret: process.env.PLAID_SANDBOX_SECRET,
  // TODO: Change environment for prod
  env: plaid.environments.sandbox,
});

app.get('/', (_req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

app.get('/verify', (_req, res) => {
  res.sendFile(__dirname + '/client/verify.html');
});

app.get('/manual', (_req, res) => {
  res.sendFile(__dirname + '/client/manual.html');
});

app.get('/public-keys', (_req, res) => {
  res.json({
    stripe: {
      pk: process.env.STRIPE_PUBLISHABLE_KEY,
    },
    plaid: {
      clientId: process.env.PLAID_CLIENT_ID,
    },
  });
});

app.get('/link-token', async (req, res) => {
  try {
    const tokenResponse = await plaidClient.createLinkToken(
      {
        user: {
          client_user_id: process.env.PLAID_CLIENT_ID,
        },
        client_name: 'Stripe/Plaid: test app',
        products: ['auth'],
        country_codes: ['US'],
        language: 'en',
      }
    );

    res.status(200).json(tokenResponse);
  } catch (error) {
    console.log(error);
  }
});

app.post('/exchange-tokens', async (req, res) => {
  try {
    const { publicToken, accountId } = req.body;
    const { access_token: accessToken } =
      await plaidClient.exchangePublicToken(publicToken);
    const { stripe_bank_account_token: bankAccountToken } =
      await plaidClient.createStripeToken(
        accessToken,
        accountId
      );

    res.status(200).json(bankAccountToken);
    console.log(bankAccountToken);
  } catch (error) {
    console.log(error);
  }
  //  Exchange plaid link public token for an access token
  //   plaidClient.exchangePublicToken(
  //     publicToken,
  //     (_error, res) => {
  //       // TODO: Handle Error

  //       const accessToken = res.access_token;

  //       // Create a plaid<==>stripe token with the access token and the account id returned
  //       plaidClient.createStripeToken(
  //         accessToken,
  //         accountId,
  //         (_error, res) => {
  //           // TODO: handle error

  //           const bankAccountToken =
  //             res.stripe_bank_account_token;

  //           console.log(bankAccountToken);
  //         }
  //       );
  //     }
  //   );
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
