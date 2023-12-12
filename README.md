# Metacrafters ATM

Welcome to the Metacrafters ATM, a simple decentralized application (DApp) built on the Ethereum blockchain using Solidity for the smart contract and React for the frontend. This application allows users to interact with a smart contract named "Assessment" to deposit, withdraw, request and repay gold loans, and visualize their account balance over time.

## Smart Contract (Solidity)

### Assessment.sol
This Solidity smart contract provides the core functionality for the Metacrafters ATM. It includes the following features:

- **Deposit**: The owner (assumed to be the user deploying the contract) can deposit funds into the contract.
- **Withdraw**: The owner can withdraw funds from the contract, provided they have a sufficient balance.
- **Gold Loan**: The owner can request a gold loan, repay the loan, check the outstanding loan amount, and forgive the loan.
- **Modify Gold Loan**: The owner can modify the gold loan amount.

## Frontend (React)

### HomePage.js
The React component `HomePage` serves as the frontend for the Metacrafters ATM. It utilizes the `ethers` library to interact with the Ethereum blockchain. The key features include:

- **Connection to Metamask**: Users are prompted to connect their Metamask wallet to interact with the ATM.
- **Account Information**: Displays the connected account and provides options to deposit, withdraw, and fetch the account balance.
- **Chart Visualization**: Visualizes the account balance over time using the `react-chartjs-2` library.

# Starter Next/Hardhat Project

After cloning the github, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type:
npm install react-chartjs-2 chart.js
then type  npm i in the same terminal 
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. 
Typically at http://localhost:3000/

## mohammed sahid

cooldudeesahil098@gmail.com
