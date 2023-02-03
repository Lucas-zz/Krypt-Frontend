import { createContext, useEffect, useState } from "react";
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';
import { toast } from "react-hot-toast";

export const TransactionContext = createContext();

const { ethereum } = window;

function getEthereumContract() {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

  return transactionContract;
}

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAcount] = useState('');
  const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });
  const [transactionCount, setTransactionCount] = useState(localStorage.getItem('transactionCount'));
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function getAllTransactions() {
    try {
      !ethereum && toast.error("Please, install MetaMask.");

      const transactionContract = getEthereumContract();
      const availableTransactions = await transactionContract.getAllTransactions();

      const structuredTransations = availableTransactions.map((transaction) => ({
        addressTo: transaction.receiver,
        addressFrom: transaction.sender,
        timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
        message: transaction.message,
        keyword: transaction.keyword,
        amount: parseInt(transaction.amount._hex) / (10 ** 18)
      }));
      setTransactions(structuredTransations);
    } catch (error) {
      console.error(error);
    };
  };

  async function checkIfWalletIsConnected() {
    try {
      let accounts = [];

      if (!ethereum) {
        toast.error("Please, install MetaMask.");
        return false;
      } else {
        accounts = await ethereum.request({ method: 'eth_accounts' });
      }

      if (accounts.length) {
        setCurrentAcount(accounts[0]);
        await getAllTransactions();
      } else {
        console.log("No accounts found.");
        return false;
      }

      return true;
    } catch (error) {
      console.error(error);
      throw new Error("No Ethereum object.");
    };
  };

  async function checkIfTransactionsExist() {
    try {
      if (!ethereum) {
        toast.error("Please, install MetaMask.");
        return;
      }

      const transactionContract = getEthereumContract();
      const transactionCount = await transactionContract?.getTransactionCount();

      window.localStorage.setItem("transactionCount", transactionCount);
    } catch (error) {
      console.error(error);
      throw new Error("No Ethereum object.");
    };
  };

  async function connectWallet() {
    try {
      let accounts = [];

      !ethereum
        ? toast.error("Please, install MetaMask.")
        : accounts = await ethereum.request({ method: 'eth_requestAccounts' });

      accounts.length
        ? (setCurrentAcount(accounts[0]), toast.success("Conta conectada!"))
        : toast.error("Error connecting to MetaMask. Try again.");

    } catch (error) {
      console.error(error);
      throw new Error("No Ethereum object.");
    };
  };

  async function sendTransaction() {
    try {
      !ethereum && toast.error("Please, install MetaMask.");

      const { addressTo, amount, keyword, message } = formData;
      const transactionContract = getEthereumContract();

      const parsedAmount = ethers.utils.parseEther(amount);

      await ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: currentAccount,
          to: addressTo,
          gas: '0x5208', // 21000 GWei
          value: parsedAmount._hex // 0.00001 ETH
        }]
      });

      const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);

      setLoading(true);
      console.log(`Loading - ${transactionHash.hash}`);

      await transactionHash.wait();

      setLoading(false);
      console.log(`Success - ${transactionHash.hash}`);
      toast.success("Success! The amount was sent.",
        {
          style: {
            background: '#333',
            color: '#fff',
          },
        }
      );

      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());

    } catch (error) {
      console.error(error);
      throw new Error("No Ethereum object.");
    };
  };

  useEffect(() => {
    let result;

    async function checkWallet() {
      result = await checkIfWalletIsConnected();
    }

    checkWallet();

    if (result) {
      checkIfWalletIsConnected();
      checkIfTransactionsExist();
    }
  }, []);

  return (
    <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction, transactions, isLoading }}>
      {children}
    </TransactionContext.Provider>
  );
};