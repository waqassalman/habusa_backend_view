
import React, { useState } from "react";

import {
  PayPalScriptProvider,
  usePayPalCardFields,
  PayPalCardFieldsProvider,
  PayPalCardFieldsForm,
  PayPalButtons,
} from "@paypal/react-paypal-js";

export default function PaypalCheckout() {
  const [isPaying, setIsPaying] = useState(false);
  const [billingAddress, setBillingAddress] = useState({
    addressLine1: "",
    addressLine2: "",
    adminArea1: "",
    adminArea2: "",
    countryCode: "",
    postalCode: "",
  });

  async function createOrder(data) {
    return fetch('myserver.com/api/paypal', {
      method: "POST",
      // Use the "body" parameter to optionally pass additional order information
      body: JSON.stringify({
        cart: [
          {
            sku: "1blwyeo8",
            quantity: 2,
          },
        ],
        card: {
          attributes: {
            verification: {
              method: "SCA_ALWAYS",
            },
          },
        },
      }),
    })
      .then((response) => response.json())
      .then((order) => order.id)
      .catch((err) => {
        console.error(err);
      });
  }

  function onApprove(data) {
    return fetch(`myserver.com/api/paypal/orders/${data.orderID}/capture`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((orderData) => {
        // Successful capture!
      })
      .catch((err) => {});
  }

  function onError(error) {
    // Do something with the error from the SDK
  }

  function handleBillingAddressChange(field, value) {
    setBillingAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  return (
    <PayPalScriptProvider
      options={{
        clientId: "<%= clientId %>",
        components: "card-fields,buttons",
      }}
    >
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />
      <PayPalCardFieldsProvider
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      >
        <PayPalCardFieldsForm />
        <input
          type="text"
          id="card-billing-address-line-2"
          name="card-billing-address-line-2"
          placeholder="Address line 1"
          onChange={(e) =>
            handleBillingAddressChange("addressLine1", e.target.value)
          }
        />
        <input
          type="text"
          id="card-billing-address-line-2"
          name="card-billing-address-line-2"
          placeholder="Address line 2"
          onChange={(e) =>
            handleBillingAddressChange("addressLine2", e.target.value)
          }
        />
        <input
          type="text"
          id="card-billing-address-admin-area-line-1"
          name="card-billing-address-admin-area-line-1"
          placeholder="Admin area line 1"
          onChange={(e) =>
            handleBillingAddressChange("adminArea1", e.target.value)
          }
        />
        <input
          type="text"
          id="card-billing-address-admin-area-line-2"
          name="card-billing-address-admin-area-line-2"
          placeholder="Admin area line 2"
          onChange={(e) =>
            handleBillingAddressChange("adminArea2", e.target.value)
          }
        />
        <input
          type="text"
          id="card-billing-address-country-code"
          name="card-billing-address-country-code"
          placeholder="Country code"
          onChange={(e) =>
            handleBillingAddressChange("countryCode", e.target.value)
          }
        />
        <input
          type="text"
          id="card-billing-address-postal-code"
          name="card-billing-address-postal-code"
          placeholder="Postal/zip code"
          onChange={(e) =>
            handleBillingAddressChange("postalCode", e.target.value)
          }
        />
        {/* Custom client component to handle card fields submission */}
        <SubmitPayment
          isPaying={isPaying}
          setIsPaying={setIsPaying}
          billingAddress={billingAddress}
        />
      </PayPalCardFieldsProvider>
    </PayPalScriptProvider>
  );
}

const SubmitPayment = ({ isPaying, setIsPaying, billingAddress }) => {
  const { cardFieldsForm, fields } = usePayPalCardFields();

  const handleClick = async () => {
    if (!cardFieldsForm) {
      const childErrorMessage =
        "Unable to find any child components in the <PayPalCardFieldsProvider />";

      throw new Error(childErrorMessage);
    }
    const formState = await cardFieldsForm.getState();

    if (!formState.isFormValid) {
      return alert("The payment form is invalid");
    }
    setIsPaying(true);

    cardFieldsForm.submit({ billingAddress }).catch((err) => {
      setIsPaying(false);
    });
  };

  return (
    <button
      className={isPaying ? "btn" : "btn btn-primary"}
      style={{ float: "right" }}
      onClick={handleClick}
    >
      {isPaying ? <div className="spinner tiny" /> : "Pay"}
    </button>
  );
};             
