import { createContext, useEffect, useState } from "react";
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

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
  const [isLoading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function checkIfWalletIsConnected() {
    try {
      let accounts = [];

      !ethereum
        ? alert("Please, install MetaMask.")
        : accounts = await ethereum.request({ method: 'eth_accounts' });

      accounts.length
        ? setCurrentAcount(accounts[0])
        : console.log("No accounts found.");

    } catch (error) {
      console.error(error);
      throw new Error("No Ethereum object.");
    };
  };

  async function connectWallet() {
    try {
      let accounts = [];

      !ethereum
        ? alert("Please, install MetaMask.")
        : accounts = await ethereum.request({ method: 'eth_requestAccounts' });

      accounts.length
        ? setCurrentAcount(accounts[0])
        : console.error("Error connecting to MetaMask. Try again.");

    } catch (error) {
      console.error(error);
      throw new Error("No Ethereum object.");
    };
  };

  async function sendTransaction() {
    try {
      !ethereum && alert("Please, install MetaMask.");

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

      const transactionCount = await transactionContract.getTransactionCount();
      setTransactionCount(transactionCount.toNumber());

    } catch (error) {
      console.error(error);
      throw new Error("No Ethereum object.");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  return (
    <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
}