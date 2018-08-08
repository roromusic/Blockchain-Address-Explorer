# Blockchain Address Explorer
Enter a blockchain address to see its balance and transactions.
The transactions are updated several times per minute - no need to refresh to see new transactions. 

## APIs Used

https://blockchain.info/rawaddr/$bitcoin_address

https://www.blockchain.com/api/exchange_rates_api

## Technologies Used
Front End - React and React Router

Back End - Node

## Viewing The Project
The easiest way to view the project is the one hosted on Glitch:

https://blockchain-address.glitch.me/

### To view on your own environment:
Because the Blockchain API does not allow CORS, the node server acts as a CORS proxy. 

To run the server:
```
cd ./server
node server.js
```

After running the server, fire up the react app:
```
cd ../client
npm start
```