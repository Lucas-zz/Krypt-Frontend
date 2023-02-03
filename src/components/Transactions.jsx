import { useContext, useEffect } from "react";
import { TransactionContext } from "../context/TransactionContext";
import useFetch from "../hooks/useFetch";
import { shortenAddres } from "../utils/shortenAddress";

const Transactions = () => {
  const { currentAccount, transactions } = useContext(TransactionContext);

  useEffect(() => {
  }, [currentAccount]);

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions py-20">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {
          currentAccount
            ? <h3 className="text-white text-3xl text-center my-2">Latest Transactions</h3>
            : <h3 className="text-white text-3xl text-center my-2">Connect your account to the see the latest transactions</h3>
        }

        <div className="flex flex-wrap justify-center items-center mt-10">
          {transactions.reverse().map((transaction, i) => (
            <TransactionCard key={i} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  );
}

const TransactionCard = ({ addressTo, addressFrom, timestamp, message, keyword, amount, url }) => {
  const gifURL = useFetch({ keyword });

  return (
    <div className="bg-[#181918] m-4 flex-1 flex flex-col p-3 rounded-md hover:shadow-2xl
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
    ">
      <div className="flex flex-col items-center w-full mt-3">
        <div className="flex justify-between w-full pb-4">
          <a
            href={`https://goerli.etherscan.io/address/${addressFrom}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-white text-base max-w-fit">
              From: {shortenAddres(addressFrom)}
            </p>
          </a>
          <a
            href={`https://goerli.etherscan.io/address/${addressTo}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className="text-white text-base max-w-fit">
              To: {shortenAddres(addressTo)}
            </p>
          </a>
        </div>
        <div className="w-full flex flex-col justify-center">
          <p className="text-white text-base text-start">Amount: {amount} ETH</p>
          {message && (
            <>
              <p className="text-white text-base mb-3 text-start">Message: {message}</p>
            </>
          )}
        </div>
      </div>
      <img
        src={gifURL || url}
        alt="gif"
        className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover"
      />
      <div className="w-full flex justify-center items-center">
        <div className="blue-glassmorphism p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37C7DA] text-opacity-70 font-bold">{timestamp}</p>
        </div>
      </div>
    </div>
  );
};

export default Transactions;