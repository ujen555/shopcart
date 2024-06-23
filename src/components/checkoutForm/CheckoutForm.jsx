// import React, { useEffect, useState } from "react";
// import "./CheckoutForm.scss";
// import CheckoutDetails from "../../pages/checkout/CheckoutDetails";
// import CheckoutSummary from "../checkoutSummary/CheckoutSummary";
// import master from "../../assets/logo/master.png";
// import visa from "../../assets/logo/visa.png";
// import rupay from "../../assets/logo/rupay.png";
// import upi from "../../assets/logo/upi.png";
// import { usePaymentInputs } from "react-payment-inputs";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   CALCULATE_SUBTOTAL,
//   CALCULATE_TOTAL_QUANTITY,
//   CLEAR_CART,
//   selectCartItems,
//   selectCartTotalAmount,
// } from "../../redux/slice/cartSlice";
// import { selectShippingAddress } from "../../redux/slice/checkoutSlice";
// import { toast } from "react-toastify";
// import { selectEmail, selectUserID } from "../../redux/slice/authSlice";
// import { useNavigate } from "react-router-dom";
// import { addDoc, collection, Timestamp } from "firebase/firestore";
// import { db } from "../../firebase/config";
// import { SmallLoader } from "../loader/Loader";

// const CheckoutForm = () => {
//   const [showPayment, setShowPayment] = useState("paypal");
//   const [isLoading, setIsLoading] = useState(false);
//   const [cardNumber, setCardNumber] = useState(null);
//   const [expiryDate, setExpiryDate] = useState(null);
//   const [cvc, setCvc] = useState(null);
//   const cartTotalAmount = useSelector(selectCartTotalAmount);
//   const userID = useSelector(selectUserID);
//   const userEmail = useSelector(selectEmail);
//   const cartItems = useSelector(selectCartItems);
//   const shippingAddress = useSelector(selectShippingAddress);
//   const [coupon, setCoupon] = useState("GETOFFER");
//   const [discount, setDiscount] = useState(0);
//   const [tax, setTax] = useState(0);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps } =
//     usePaymentInputs();

//   let discountAmount = (cartTotalAmount * 15) / 100;
//   useEffect(() => {
//     if (coupon === "GETOFFER") {
//       setDiscount(discountAmount);
//     } else {
//       setDiscount(0);
//     }
//   }, [discountAmount, coupon]);

//   let taxAmount = (cartTotalAmount * 10) / 100;
//   useEffect(() => {
//     setTax(taxAmount);
//   }, [taxAmount]);

//   const totalAmount = cartTotalAmount + tax - discount;

//   function handleShow(e) {
//     if (e.target.value === "cashOnDelivery") {
//       setShowPayment("cashOnDelivery");
//     }
//     if (e.target.value === "upi") {
//       setShowPayment("upi");
//     }
//     if (e.target.value === "debitCard") {
//       setShowPayment("debitCard");
//     }
//     if(e.target.value==="paypal"){
//       setShowPayment("paypal");
//     }
//   }

//   function handleChangeCardNumber(e) {
//     setCardNumber(e.target.value);
//   }
//   function handleChangeExpiryDate(e) {
//     setExpiryDate(e.target.value);
//   }
//   function handleChangeCVC(e) {
//     setCvc(e.target.value);
//   }
 

//   // Save order to Order History
//   const saveOrder = async () => {
//     const today = new Date();
//     const date = today.toDateString();
//     const time = today.toLocaleTimeString();
//     const orderConfig = {
//       userID,
//       userEmail,
//       orderDate: date,
//       orderTime: time,
//       orderAmount: totalAmount,
//       orderStatus: "Order Placed...",
//       cartItems,
//       shippingAddress,
//       createdAt: Timestamp.now().toDate(),
//     };
//     try {
//       await addDoc(collection(db, "orders"), orderConfig);
//       dispatch(CLEAR_CART());
//       toast.success("Order saved");
//       navigate("/checkout-success");
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   function handleSubmit(e) {
//     e.preventDefault();

//     if (!shippingAddress.name) {
//       toast.error("Please enter the delivery information");
//       return;
//     }
//     setIsLoading(true);

//     if (showPayment === "debitCard" && !cardNumber && !expiryDate && !cvc) {
//       toast.error("Please enter the payment information");
//       setIsLoading(false);
//       return;
//     }

//     if (cartItems.length <= 0) {
//       toast.error("Please add items to ship");
//       setIsLoading(false);
//       return;
//     }

//     saveOrder();

//     if (showPayment !== "cashOnDelivery") {
//       toast.success("Payment successful");
//     }
//     setIsLoading(false);
//   }

//   useEffect(() => {
//     dispatch(CALCULATE_SUBTOTAL());
//     dispatch(CALCULATE_TOTAL_QUANTITY());
//   }, [cartItems, dispatch]);

//   return (
//     <div className="container checkout">
//       <div className="summary-delivery-info">
//         <h3 style={{ marginBottom: "10px" }}>Checkout</h3>
//         <div className="checkout-summary">
//           <h4>Review Item And Shipping</h4>
//           <CheckoutSummary />
//         </div>
   
//       </div>
//       <div className="orderSummary">
//         <div className="orderSummary-wrap">
//           <h4>Order Summary</h4>
         
//           <div className="orderSummary__payDetails">
//             <p className="orderSummary__payDetails-title">Payment Details</p>
//             <form onSubmit={handleSubmit}>
//               <div className="orderSummary__totalAmount">
//                 <div className="orderSummary__subTotal">
//                   <div className="key">Sub Total</div>
//                   <div className="value">Rs.{cartTotalAmount.toFixed(2)}</div>
//                 </div>
           
//                 <div className="orderSummary__total">
//                   <div className="total-key">Total</div>
//                   <div className="total-value">Rs.{totalAmount.toFixed(2)}</div>
//                 </div>
//               </div>
//               {isLoading ? (
//                 <button
//                   className="--btn --block"
//                   disabled
//                   style={{ background: "#6edd69", cursor: "default" }}
//                 >
//                   <SmallLoader />
//                 </button>
//               ) : (
//               <PayPalScriptProvider options={{"client-id":"AaNqb6XoGyb4GwXEPKJLGMxfq6GHYKQMv53dEA52S1cOR9RNMglg5vV9fG5RwCYs3xdmsAXcDs65ZXSH"}}>
//                 <PayPalButtons   
//                createOrder={(data, actions) => {
//                 return actions.order.create({
//                     purchase_units: [
//                         {
//                             amount: {
//                                 value: totalAmount.toFixed(2),
//                             },
//                         },
//                     ],
//                 });
//               }}
//               onApprove={(data, actions) => {
//                 return actions.order.capture().then((details) => {
//                     const name = details.payer.name.given_name;
//                     alert(`Transaction completed by ${name}`);
//                 });
//             }}
//                 />
//               </PayPalScriptProvider>
//               )}
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutForm;

import React, { useEffect, useState } from "react";
import "./CheckoutForm.scss";
import CheckoutSummary from "../checkoutSummary/CheckoutSummary";
import { usePaymentInputs } from "react-payment-inputs";
import { useDispatch, useSelector } from "react-redux";
import {
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_CART,
  selectCartItems,
  selectCartTotalAmount,
} from "../../redux/slice/cartSlice";
import { selectShippingAddress } from "../../redux/slice/checkoutSlice";
import { toast } from "react-toastify";
import { selectEmail, selectUserID } from "../../redux/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/config";
import { SmallLoader } from "../loader/Loader";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";


const CheckoutForm = () => {
  const [showPayment, setShowPayment] = useState("debitCard");
  const [isLoading, setIsLoading] = useState(false);

  const [cvc, setCvc] = useState(null);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const userID = useSelector(selectUserID);
  const userEmail = useSelector(selectEmail);
  const cartItems = useSelector(selectCartItems);
  const shippingAddress = useSelector(selectShippingAddress);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps } =
    usePaymentInputs();

 


  const totalAmount = cartTotalAmount;



  // Save order to Order History
  const saveOrder = async () => {
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();
    const orderConfig = {
      userID,
      userEmail,
      orderDate: date,
      orderTime: time,
      orderAmount: totalAmount,
      orderStatus: "Order Placed...",
      cartItems,
      shippingAddress,
      createdAt: Timestamp.now().toDate(),
    };
    try {
      await addDoc(collection(db, "orders"), orderConfig);
      dispatch(CLEAR_CART());
      toast.success("Order saved");
      navigate("/checkout-success");
    } catch (error) {
      toast.error(error.message);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();

    if (!shippingAddress.name) {
      toast.error("Please enter the delivery information");
      return;
    }
  
    if (cartItems.length <= 0) {
      toast.error("Please add items to ship");
      return;
    }
  
    saveOrder();
  }

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [cartItems, dispatch]);

  return (
    <div className="container checkout">
      <div className="summary-delivery-info">
        <h3 style={{ marginBottom: "10px" }}>Checkout</h3>
        <div className="checkout-summary">
          <h4>Review Item And Shipping</h4>
          <CheckoutSummary />
        </div>
       
      </div>
      <div className="orderSummary">
        <div className="orderSummary-wrap">
          <h4>Order Summary</h4>
          <div className="orderSummary__payDetails">
            <p className="orderSummary__payDetails-title">Payment Details</p>
           
            <form onSubmit={handleSubmit}>
            
              <div className="orderSummary__totalAmount">
                <div className="orderSummary__subTotal">
                  <div className="key">Sub Total</div>
                  <div className="value">₹{cartTotalAmount.toFixed(2)}</div>
                </div>
                <div className="orderSummary__total">
                  <div className="total-key">Total</div>
                  <div className="total-value">₹{totalAmount.toFixed(2)}</div>
                </div>
              </div>
              {isLoading ? (
                <button
                  className="--btn --block"
                  disabled
                  style={{ background: "#6edd69", cursor: "default" }}
                >
                  <SmallLoader />
                </button>
              ) : (
                <PayPalScriptProvider
                options={{
                  "client-id": "AaNqb6XoGyb4GwXEPKJLGMxfq6GHYKQMv53dEA52S1cOR9RNMglg5vV9fG5RwCYs3xdmsAXcDs65ZXSH",
                }}
              >
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: totalAmount.toFixed(2),
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      saveOrder(); // Call your saveOrder function here
                    });
                  }}
                />
              </PayPalScriptProvider>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;

