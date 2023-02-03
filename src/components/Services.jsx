import { BsShieldFillCheck } from 'react-icons/bs';
import { BiSearchAlt } from 'react-icons/bi';
import { RiHeart2Fill } from 'react-icons/ri';

const Services = () => {
  return (
    <div className="flex w-full justify-center items-center gradient-bg-services">
      <div className="flex lg:flex-row flex-col m-auto">
        <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
          <div className="flex-1 flex flex-col justify-start items-start">
            <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient">
              Services that
              <br />
              continue to improve
            </h1>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-start items-center sm:m-10 m-2">
          <ServiceCard
            color="bg-[#2952E3]"
            title="Secutiry Guaranteed"
            icon={<BsShieldFillCheck fontSize={21} className="text-white" />}
            subtitle="Secutiry is guaranteed. We always mantain privacy and maintain the quality of our products."
          />
          <ServiceCard
            color="bg-[#8945F8]"
            title="Best Exchange Rates"
            icon={<BiSearchAlt fontSize={21} className="text-white" />}
            subtitle="Due to our lower charge fee, we have the best exhange rates on the market!"
          />
          <ServiceCard
            color="bg-[#F84550]"
            title="Fastest Transactions"
            icon={<RiHeart2Fill fontSize={21} className="text-white" />}
            subtitle="Throught the Blockchain, our transactions are processed near-instantaneous without any intermediary."
          />
        </div>
      </div>
    </div>
  );
}

const ServiceCard = ({ color, title, icon, subtitle }) => (
  <div className="max-w-lg flex flex-row justify-start items-start white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
    <div className={`w-10 h-10 mt-2 ml-2 rounded-full flex justify-center items-center ${color}`}>
      {icon}
    </div>
    <div className="flex-1 flex flex-col max-w-md ml-5">
      <h1 className="text-white text-lg max-w-fit">
        {title}
      </h1>
      <p className="text-white text-sm md:w-4/5">
        {subtitle}
      </p>
    </div>
  </div>
);

export default Services;