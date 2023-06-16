import React from 'react'
import { Link } from 'react-router-dom'


const PaymentFail = () => {
  return (
    <div className="bg-white-100 h-[90vh]">
      <div className="bg-white p-6  md:mx-auto">
        
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment fail!
          </h3>
        
          <div className="py-10 text-center">
            <Link
              to="/subscribe"
              className="px-12 bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3"
            >
              Try again
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentFail