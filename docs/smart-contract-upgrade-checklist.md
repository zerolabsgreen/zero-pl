# How to perform a smart contract upgrade

0. Backup all existing databases for API and Tokenization
1. Prepare the Typescript codebase to work with the upgraded smart contracts
2. (prod only) Start maintenance mode on Heroku for the API, Tokenization and UI
3. Upgrade the smart contracts (from the tokenization repo)
4. Deploy the upgraded Heroku codebase to Heroku
