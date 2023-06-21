import React, { useEffect } from "react";
import { RiArrowDownLine, RiArrowUpLine } from "react-icons/ri";
import { DoughnutChart } from "./Chart";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardStats } from "../../../redux/actions/admin";

const Databox = ({ title, qty, qtyPercentage, profit }) => (
  <div className="bg-blue-100 to-white/5 rounded-lg">
    <div className="flex flex-row items-center">
      <div className="text-3xl p-4">
        {profit ? (
          <RiArrowUpLine color="green" />
        ) : (
          <RiArrowDownLine color="red" />
        )}
      </div>
      <div className="p-2">
        <p className="text-xl font-bold">{title}</p>
        <p className="text-gray-500 font-medium">{qty}</p>
        <p className="text-green-900 text-sm ">{`${qtyPercentage}%`}</p>
      </div>
    </div>
    <div className="border-t border-white/5 p-4">
      <p className="inline-flex space-x-2 items-center text-center">
        <span>Since last month</span>
      </p>
    </div>
  </div>
);

const Bar = ({ title, value, profit }) => (
  <div>
    <h1 className="text-black m-3">
      {title}
      <span className={`text-xs`}>&nbsp;{value}%</span>
    </h1>
    <div className=" h-4 relative w-60 rounded-full overflow-hidden">
      <div className=" w-full h-full bg-white absolute "></div>
      <div
        className={`h-full absolute text-[${profit ? "green" : "red"}]`}
        style={{
          width: `${value}%`,
          backgroundColor:`${profit ? "green" : "red"}`
        }}
      ></div>
    </div>
  </div>
);

const DashBoard = () => {
  const dispatch = useDispatch();

  const {
    //loading,
    //stats,
    viewsCount,
    subscriptionCount,
    usersCount,
    subscriptionPercentage,
    viewsPercentage,
    usersPercentage,
    subscriptionProfit,
    viewsProfit,
    usersProfit,
  } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);

  console.log("Usercounts", usersCount);
  return (
    <div className="min-h-screen">
      <p className="text-center text-base p-2">
        Last change was on {String(new Date()).split("G")[0]}
      </p>
      <h1 className="text-center text-xl p-4">Dashboard</h1>

      <div
        id="stats"
        class=" p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4"
      >
        <Databox
          title="Views"
          qty={viewsCount}
          qtyPercentage={viewsPercentage}
          profit={viewsProfit}
        />
        <Databox
          title="Users"
          qty={usersCount === undefined ? "0" : usersCount}
          qtyPercentage={usersPercentage === null ? "0" : usersPercentage}
          profit={usersProfit}
        />
        <Databox
          title="Subscription"
          qty={subscriptionCount}
          qtyPercentage={subscriptionPercentage}
          profit={subscriptionProfit}
        />
      </div>

      <div className="flex bg-blue-100 w-full">
        <section className="p-4 w-1/2 flex items-center flex-col justify-center">
          <h3>Progress bar</h3>
          <section>
            <Bar profit={viewsProfit} title="Views" value={viewsPercentage} />
            <Bar profit={usersProfit} title="Users" value={usersPercentage === null ? "0" : usersPercentage} />
            <Bar
              profit={subscriptionProfit}
              title="Subscription"
              value={subscriptionPercentage}
            />
          </section>
        </section>

        <section className="py-4 box-border w-2/6">
          <h4 className="text-center mb-4">Users</h4>
          <DoughnutChart
            users={[subscriptionCount, usersCount - subscriptionCount]}
          />
        </section>
      </div>
    </div>
  );
};

export default DashBoard;
