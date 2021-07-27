To run and test this program:

    - First:
        a) Create a business stripe account and enable ACH. You can find more info here: https://stripe.com/docs/ach

        b) Create a plaid account and connect it to stripe. Find more info here: https://plaid.com/docs/auth/partnerships/stripe/

    - Second:
        a) Make sure you have your ".env" set up as the ".env.example" file.
        b) Run "npm run dev"

    - Third:
        a) Open the console to check logs. Also notice the logs on the stripe checkout component, first message should be either "Fetched and parsed keys!" if everything is good, or "Error fetching keys!!!" if the link token fetch failed.
        b) When the message is "Fetched and parsed keys!", that means that a linkHandler has been assigned to the "Connect Bank Account" button. Click on it and you should see a plaid pop-up asking you to move forward with connecting your bank account.
        c) Choose any bank account and use the credentials shown here: https://plaid.com/docs/sandbox/test-credentials/

    - Finally:
        Once you have completed the plaid process you should the following sequence of messages below the component:
        - Fetched and parsed keys!
        - Plaid link set up SUCCESS!
        - exchanging tokens...
        - Exhanged tokens successfully!

        Also, you will notice the generated stripe bank account token in your console :)
        You can now use this implementation to charge ACH accounts with instant verification provided by Plaid: https://plaid.com


        THANKS, ENJOY
