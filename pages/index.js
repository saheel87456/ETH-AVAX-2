import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, LineController, PointElement, LineElement } from 'chart.js';

Chart.register(CategoryScale, LinearScale, LineController, PointElement, LineElement);

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Balance Over Time",
        data: [],
        fill: false,
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  });
  const [action, setAction] = useState(""); // "deposit" or "withdraw"
  const [amount, setAmount] = useState(1);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(accounts);
    }
  };

  const handleAccount = (accounts) => {
    if (accounts.length > 0) {
      console.log("Account connected: ", accounts[0]);
      setAccount(accounts[0]);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // once the wallet is set, we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      const currentBalance = (await atm.getBalance()).toNumber();
      setBalance(currentBalance);

      // Update chart data
      setChartData((prevChartData) => ({
        labels: [...prevChartData.labels, new Date().toLocaleTimeString()],
        datasets: [
          {
            ...prevChartData.datasets[0],
            data: [...prevChartData.datasets[0].data, currentBalance],
          },
        ],
      }));
    }
  };

  const handleTransaction = async (action) => {
    if (atm && amount > 0) {
      let tx;
      if (action === "deposit") {
        tx = await atm.deposit(amount);
      } else if (action === "withdraw") {
        tx = await atm.withdraw(amount);
      }

      if (tx) {
        await tx.wait();
        getBalance();
      }
    }
  };

  const fetchBalance = () => {
    getBalance();
  };

  const initUser = () => {
    // Check to see if the user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask to use this ATM.</p>;
    }

    // Check to see if the user is connected. If not, connect to their account
    if (!account) {
      return (
        <div>
          <button onClick={connectAccount}>
            Please connect your Metamask wallet
          </button>
        </div>
      );
    }

    if (balance === undefined) {
      getBalance();
    }

    return (
      <div>
        <div>
          <p>Your Account: {account}</p>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={() => handleTransaction("deposit")}>Deposit</button>
          <button onClick={() => handleTransaction("withdraw")}>Withdraw</button>
          <button onClick={fetchBalance}>Fetch Balance</button>
          {balance !== undefined && <p>Your Balance: {balance}</p>}
        </div>
        <div>
          <Line data={chartData} />
        </div>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header>
        <h1>Welcome to the Metacrafters ATM!</h1>
      </header>
      {initUser()}
      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          background-color: #d2b48c; /* Light Brown background color */
          min-height: 100vh; /* Set minimum height to full viewport height */
        }
      `}</style>
    </main>
  );
}
