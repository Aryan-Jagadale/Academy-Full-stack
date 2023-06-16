import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { server } from "../../redux/store";
import axios from "axios";
import { buySubscription } from "../../redux/actions/user";
import logo from "../../assets/logo.png";

const Subscribe = ({ user }) => {
  const dispatch = useDispatch();
  const [key, setKey] = useState("");

  const { error, subscriptionId } = useSelector(
    (state) => state.subscription
  );

  const subscribeHandler = async () => {
    console.log("Subscribed");
    const {
      data: { key },
    } = await axios.get(`${server}/razorpaykey`);
    setKey(key);
    //console.log(key);

    dispatch(buySubscription());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }
    if (subscriptionId) {
      console.log(subscriptionId);
      console.log("Worked");

      const openPopup = () => {
        const options = {
          key,
          name: "iAcademy",
          description: "Get access to all premium content",
          image: logo,
          subscription_id: subscriptionId,
          callback_url: `${server}/paymentverification`,
          prefill: {
            name: user.name,
            email: user.email,
            contact: "+91 7378470187",
          },
          notes: {
            address: "Pimpri Chinchwad, Pune-19",
          },
          theme: {
            color: "#FFC800",
          },
        };

        const razor = new window.Razorpay(options);
        razor.open();
      };
      openPopup();
    }
  }, [dispatch, key, subscriptionId, user.name, user.email,error]);

  return (
    <div className="flex min-h-screen pt-[30px] px-[40px]">
      <div className="min-w-full">
        <p className="text-[#00153B] text-[20px] leading-[40px] font-semibold">
          Your Subscription
        </p>

        <div>
          <p className="text-[#717F87] text-[15px] leading-[27px] font-medium">
            Aliquam sagittis sapien in nibh tincidunt fermentum. Morbi eleifend
            faucibus.
          </p>
        </div>

        <div className="mt-[30px] inline-flex border border-[#E1E3E5] shadow-[0px 1px 2px #E1E3E5] divide-[#E1E3E5] divide-x rounded-[5px]">
          <button className="bg-white hover:bg-[#F6F6F7] hover:text-[#717F87] text-[#0E1823] leading-[16px] text-[13px] font-semibold font-bold py-[15px] px-[25px] rounded-l">
            Monthly
          </button>
          <button className="bg-white hover:bg-[#F6F6F7] hover:text-[#717F87] text-[#0E1823] text-[13px] leading-[16px] font-semibold font-bold py-[15px] px-[25px] rounded-r">
            Annual
          </button>
        </div>

        <div className="mt-[20px] grid grid-cols-1 gap-[20px] md:grid-cols-2">
          {/*Subscription */}
          <div
            key="2"
            className="w-full bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y"
          >
            <div className="pt-[15px] px-[25px] pb-[25px]">
              <div className="flex justify-end">
                <div className="bg-[#F6F6F7] rounded-[20px] flex justify-center align-center px-[12px]">
                  <p className="text-[#00153B] text-[12px] leading-[28px] font-bold">
                    Value
                  </p>
                </div>
              </div>

              <div>
                <p className="text-[#00153B] text-[19px] leading-[24px] font-bold">
                  Fast Start
                </p>
                <p className="text-[#00153B] text-[50px] leading-[63px] font-bold">
                  299
                </p>
              </div>

              <div>
                <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                  Unlimited access
                </p>
              </div>
            </div>

            <div className="pt-[25px] px-[25px] pb-[35px]">
              <div>
                <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                  Direct Phone Numbers
                </p>
              </div>

              <div className="mt-[25px]">
                <button
                  className="bg-[#006EF5] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold"
                  onClick={subscribeHandler}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/*<div
            key="3"
            className="w-full bg-[#fff] rounded-[10px] shadow-[0px 1px 2px #E1E3E5] border border-[#E1E3E5] divide-y"
          >
            <div className="pt-[15px] px-[25px] pb-[25px]">
              <div className="flex justify-end">
                <div className="bg-[#F6F6F7] rounded-[20px] flex justify-center align-center px-[12px]">
                  <p className="text-[#00153B] text-[12px] leading-[28px] font-bold">
                    Pro
                  </p>
                </div>
              </div>

              <div>
                <p className="text-[#00153B] text-[19px] leading-[24px] font-bold">
                  Accelerate
                </p>
                <p className="text-[#00153B] text-[50px] leading-[63px] font-bold">
                  $89
                </p>
              </div>

              <div>
                <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                  100 Credits per month
                </p>
                <p className="text-[#717F87] text-[18px] leading-[28px] font-medium">
                  Unlimited users
                </p>
              </div>
            </div>

            <div className="pt-[25px] px-[25px] pb-[35px]">
              <div>
                <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                  Direct Phone Numbers
                </p>
                <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                  Landline Phone Numbers
                </p>
                <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                  Corporate email addresses
                </p>
                <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                  Propsetcs
                </p>
                <p className="text-[#717F87] text-[14px] leading-[24px] font-medium">
                  Chrome Extension
                </p>
              </div>

              <div className="mt-[25px]">
                <button className="bg-[#006EF5] rounded-[5px] py-[15px] px-[25px] text-[#fff] text-[14px] leading-[17px] font-semibold">
                  Upgrade +
                </button>
              </div>
            </div>
  </div>*/}
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
