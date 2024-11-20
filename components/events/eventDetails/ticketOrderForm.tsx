import React, { useState } from "react";
import { useRouter } from "next/router";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "@/axios/config";
import { useAppDispatch } from "redux/hooks";
import { setPopup } from "redux/slices/popupslice";

const TicketOrderForm = ({ event }: any) => {
  const {
    userAge,
    userCity,
    userCountry,
    userGender,
    userOccupation,
    userPhone,
    userPostal_code,
    userId_type,
    isTShirt,
    userGuest_adult,
    userGuest_chield,
    userGuest_infant,
  } = event;
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const [selectedTicket, setSelectedTicket] = useState<any>(event.tickets[0]);
  const [guestQuantity, setGuestQuantity] = useState<number>(0);
  const [guestTotalPrice, setGuestTotalPrice] = useState<number>(0);

  // New states for additional fields
  const [isGuestSecondary, setIsGuestSecondary] = useState<boolean>(false);
  const [priceGuestTertiary, setPriceGuestTertiary] = useState<number>(0);
  const [priceSouvenir, setPriceSouvenir] = useState<number>(0);

  const [guestSecondaryQuantity, setGuestSecondaryQuantity] = useState(0);
  const [guestSecondaryTotalPrice, setGuestSecondaryTotalPrice] = useState(0);

  const [guestTertiaryQuantity, setGuestTertiaryQuantity] = useState(0);
  const [guestTertiaryTotalPrice, setGuestTertiaryTotalPrice] = useState(0);

  const [souvenirQuantity, setSouvenirQuantity] = useState(0);
  const [souvenirTotalPrice, setSouvenirTotalPrice] = useState(0);

  const [tshirtQuantity, setTShirtQuantity] = useState(0);
  const [tshirtTotalPrice, setTShirtTotalPrice] = useState(0);

  const [contributionAmount, setContributionAmount] = useState(0);

  // Calculate total amount
  const calculateTotalAmount = () => {
    const guestSecondaryPrice = isGuestSecondary
      ? selectedTicket.priceGuestSecondary || 0
      : 0;
    return (
      selectedTicket.price +
      guestTotalPrice +
      guestSecondaryPrice +
      priceGuestTertiary +
      priceSouvenir
    );
  };

  // Calculate total quantity
  const calculateTotalQuantity = () => {
    return guestQuantity + guestSecondaryQuantity + guestTertiaryQuantity;
  };

  const calculateTotalQuantityByCategory = () => {
    return {
      family: guestQuantity,
      childrenOver10: guestSecondaryQuantity,
      childrenBelow10: guestTertiaryQuantity,
    };
  };

  const orderTicketSchema = Yup.object().shape({
    name: Yup.string().required("This is required"),
    email: Yup.string()
      .email("Enter a valid email id")
      .required("This is required"),
    phone: userPhone
      ? Yup.string().min(8, "Too Short!").required("Phone number is required")
      : Yup.string(),
    age: userAge ? Yup.number().required("Age is required") : Yup.number(),
    gender: userGender
      ? Yup.string().required("Gender is required")
      : Yup.string(),
    id_number: Yup.string(),
    city: userCity ? Yup.string().required("City is required") : Yup.string(),
    country: userCountry
      ? Yup.string().required("Country is required")
      : Yup.string(),
    postal_code: userPostal_code
      ? Yup.string().required("Postal Code is required")
      : Yup.string(),
    occupation: userOccupation
      ? Yup.string().required("Occupation is required")
      : Yup.string(),
  });
  const createOrderHandler = (data: any) => {
    if (selectedTicket.isAcceptContribution && contributionAmount < 1500) {
      dispatch(
        setPopup({
          type: "failed",
          message: "Minimum contribution amount is 1500 BDT",
          show: true,
        })
      );
      return;
    }
    axios
      .post("ticket-order/", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log(res);
        // console.log('one');
        if (res.data.data.paid === true) {
          dispatch(
            setPopup({
              type: "success",
              message: "Ticket purchased successfully!",
              show: true,
            })
          );
          setTimeout(() => {
            dispatch(setPopup({ show: false, type: "", message: "" }));
          }, 5000);
          // window.location.href = `${process.env.NEXT_PUBLIC_CLIENT_HOST}/events/ticket-order/success`;
          // push(`${process.env.NEXT_PUBLIC_CLIENT_HOST}/events/ticket-order/success`)
          axios
            .get(`/ticket-order/free/${res.data.data._id}`)
            .then((res) => {
              push(
                `${process.env.NEXT_PUBLIC_CLIENT_HOST}/events/ticket-order/success`
              );
            })
            .catch((err) => {
              dispatch(
                setPopup({
                  type: "failed",
                  message: "Something went wrong!",
                  show: true,
                })
              );
              setTimeout(() => {
                dispatch(setPopup({ show: false, type: "", message: "" }));
              }, 5000);
            });
        } else {
          axios
            .post(
              `/ticket-order/payment/init`,
              {
                _id: res.data.data._id,
              },
              {
                headers: {
                  "Content-type": "application/json",
                },
              }
            )
            .then((res) => {
              // console.log("gateway url")
              // console.log(res)
              window.location.href = res.data.data;
            })
            .catch((err) => {
              // window.location.reload();
              // console.log(err);
            });

          dispatch(
            setPopup({
              type: "success",
              message: "Order created successfully",
              show: true,
            })
          );

          setTimeout(() => {
            dispatch(setPopup({ show: false, type: "", message: "" }));
          }, 5000);
        }
      })
      .catch((err) => {
        // console.log(err);
        dispatch(
          setPopup({
            type: "failed",
            message: "Failed to create Order",
            show: true,
          })
        );
        setTimeout(() => {
          dispatch(setPopup({ show: false, type: "", message: "" }));
        }, 5000);
      });
  };
  console.log(selectedTicket);

  return (
    <div
      className="lg:my-12 my-6 p-3 md:p-20 lg:p-0  max-w-[1050px] mx-auto font-lato"
      id="ticketForm"
    >
      <p className="text-brand_color  ui_title">BOOK YOUR SEAT</p>
      {/* <Breadcrumb from='giftCard' /> */}
      <div className="w-full bg-gray-800 text-white rounded-md p-4 ">
        <div className="mt-4 text-white ">
          <div>
            <p className="text-xl font-semibold text-white">
              Provide information for booking ticket.
            </p>

            {/* for someone else information */}

            <div className="my-4">
              <Formik
                initialValues={{
                  package: "",
                  name: "",
                  email: "",
                  phone: "",
                  gender: "",
                  age: "",
                  city: "",
                  country: "",
                  postal_code: "",
                  occupation: "",
                  id_number: "",
                }}
                validationSchema={orderTicketSchema}
                onSubmit={(values: any) => {
                  const totalQuantity =
                    guestQuantity +
                    guestSecondaryQuantity +
                    guestTertiaryQuantity;

                  const totalAmount =
                    selectedTicket.price +
                    guestTotalPrice +
                    guestSecondaryTotalPrice +
                    priceGuestTertiary +
                    souvenirTotalPrice +
                    contributionAmount;

                  const orderDetails: any = {
                    ticket: selectedTicket._id,
                    name: values.name,
                    email: values.email,
                    phone: values.phone,
                    age: values.age,
                    gender: values.gender,
                    id_type: userId_type,
                    id_number: values.id_number,
                    occupation: values.occupation,
                    city: values.city,
                    country: values.country,
                    postal_code: values.postal_code,
                    total_quantity: totalQuantity,
                    contribution_amount: contributionAmount, // Add contribution amount
                    souvenir_quantity: souvenirQuantity, // Add souvenir quantity
                    total_amount: totalAmount, // Add total amount
                    family: calculateTotalQuantityByCategory().family, // Add family quantity
                    childrenOver10:
                      calculateTotalQuantityByCategory().childrenOver10, // Add children over 10
                    childrenBelow10:
                      calculateTotalQuantityByCategory().childrenBelow10, // Add children below 10
                  };

                  const newOrderDetails = Object.entries(orderDetails).reduce(
                    (a: any, [k, v]) => (v ? ((a[k] = v), a) : a),
                    {}
                  );
                  console.log("Order Details on Submit:", newOrderDetails);
                  // createOrderHandler(newOrderDetails);
                }}
              >
                {({ errors, touched }: any) => (
                  <Form className="mt-8 text-center">
                    <div>
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="flex flex-col flex-nowrap justify-start items-start space-y-6 mb-6 md:mb-0">
                          <div className="flex items-start justify-start gap-10">
                            <div className="flex">
                              <p className="text-start">
                                Select Ticket Category
                              </p>
                            </div>
                            <div className="relative">
                              <Field
                                as="select"
                                name="package"
                                value={selectedTicket._id}
                                onChange={(e: any) => {
                                  setSelectedTicket(
                                    event.tickets.find(
                                      (ticket: any) =>
                                        ticket._id === e.target.value
                                    )
                                  );
                                }}
                                className="border-2 outline-none text-black bg-white w-full md:w-300  h-d8  text-sm px-2 py-1 rounded-md "
                              >
                                {event?.tickets?.map((c: any) => (
                                  <option
                                    key={c.package}
                                    value={c._id}
                                    className="text-black"
                                  >
                                    {c.package}
                                  </option>
                                ))}
                              </Field>
                              <div>
                                {errors.package && touched.package ? (
                                  <small className="text-red-300 text-sm absolute left-0 top-8">
                                    {errors.package}
                                  </small>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          {/* <div className='flex items-center justify-start'>
                        <p className='md:w-174 w-150 text-start'>
                          Ticket Price
                        </p>
                        <div className='relative'>
                          <p className='text-white text-xl font-semibold'>
                            BDT {price}
                          </p>
                        </div>
                      </div> */}
                          <div className="h-full w-full p-4 text-start rounded-md bg-gray-600 text-white">
                            <div className="font-semibold flex justify-between gap-10">
                              <div>
                                <p className="text-lg font-semibold">
                                  Basic Entry Fee:
                                </p>
                              </div>
                              <div>
                                <span>{selectedTicket.price} BDT</span>
                              </div>
                            </div>
                            {selectedTicket.isGuestPrimary ||
                            selectedTicket.isGuestSecondary ||
                            selectedTicket.isGuestTertiary ? (
                              <div className="flex flex-col gap-4 mt-4">
                                <p className="text-lg font-semibold">
                                  Guest Entry Fee:
                                </p>

                                {/* Guest Price */}
                                {selectedTicket.isGuestPrimary ? (
                                  <div className="grid grid-cols-4 gap-4 items-center">
                                    <div className="col-span-2">
                                      <p className="text-md">
                                        Family: (
                                        {selectedTicket.priceGuestPrimary}
                                        BDT)
                                      </p>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                      <label
                                        htmlFor="guestQuantity"
                                        className="text-md"
                                      >
                                        Att:
                                      </label>
                                      <input
                                        type="number"
                                        id="guestQuantity"
                                        name="guestQuantity"
                                        value={guestQuantity}
                                        min="0"
                                        max="2"
                                        onChange={(e) => {
                                          const quantity = Math.max(
                                            0,
                                            parseInt(e.target.value) || 0
                                          );
                                          setGuestQuantity(quantity);
                                          setGuestTotalPrice(
                                            quantity *
                                              selectedTicket.priceGuestPrimary
                                          );
                                        }}
                                        className="w-16 text-black px-2 py-1 border rounded"
                                      />
                                    </div>
                                    <div className="flex gap-2">
                                      <p className="text-md">=</p>
                                      <span>{guestTotalPrice} BDT</span>
                                    </div>
                                  </div>
                                ) : (
                                  ""
                                )}

                                {/* Secondary Guest Price */}
                                {selectedTicket.isGuestSecondary ? (
                                  <div className="grid grid-cols-4 gap-4 items-center">
                                    <div className="col-span-2">
                                      <p className="text-md">
                                        Children over 10y: (
                                        {selectedTicket.priceGuestSecondary ||
                                          0}{" "}
                                        BDT)
                                      </p>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                      <label
                                        htmlFor="guestSecondaryQuantity"
                                        className="text-md"
                                      >
                                        Att:
                                      </label>
                                      <input
                                        type="number"
                                        id="guestSecondaryQuantity"
                                        name="guestSecondaryQuantity"
                                        value={guestSecondaryQuantity}
                                        min="0"
                                        max="2"
                                        onChange={(e) => {
                                          const quantity = Math.max(
                                            0,
                                            parseInt(e.target.value) || 0
                                          );
                                          setGuestSecondaryQuantity(quantity);
                                          setGuestSecondaryTotalPrice(
                                            quantity *
                                              selectedTicket.priceGuestSecondary
                                          );
                                        }}
                                        className="w-16 text-black px-2 py-1 border rounded"
                                      />
                                    </div>
                                    <div className="flex gap-2 items-center">
                                      <p className="text-md">=</p>
                                      <span>
                                        {guestSecondaryTotalPrice} BDT
                                      </span>
                                    </div>
                                  </div>
                                ) : (
                                  ""
                                )}

                                {/* Tertiary Guest Price */}
                                {selectedTicket.isGuestTertiary ? (
                                  <div className="grid grid-cols-4 gap-4 items-center">
                                    <div className="col-span-2">
                                      <p className="text-md">
                                        Children below 10y: (
                                        {selectedTicket.priceGuestTertiary || 0}{" "}
                                        BDT)
                                      </p>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                      <label
                                        htmlFor="guestTertiaryQuantity"
                                        className="text-md"
                                      >
                                        Att:
                                      </label>
                                      <input
                                        type="number"
                                        id="guestTertiaryQuantity"
                                        name="guestTertiaryQuantity"
                                        value={guestTertiaryQuantity}
                                        min="0"
                                        max="2"
                                        onChange={(e) => {
                                          const quantity = Math.max(
                                            0,
                                            parseInt(e.target.value) || 0
                                          );
                                          setGuestTertiaryQuantity(quantity);
                                          setGuestTertiaryTotalPrice(
                                            quantity *
                                              selectedTicket.priceGuestTertiary
                                          );
                                        }}
                                        className="w-16 text-black px-2 py-1 border rounded"
                                      />
                                    </div>
                                    <div className="flex gap-2 items-center">
                                      <p className="text-md">=</p>
                                      <span>{guestTertiaryTotalPrice} BDT</span>
                                    </div>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            ) : (
                              ""
                            )}

                            {selectedTicket.isSouvenir ||
                            selectedTicket.isTShirt ? (
                              <div className="flex flex-col gap-4 mt-4">
                                {/* Souvenir Price */}
                                {selectedTicket.isSouvenir ? (
                                  <div className="grid grid-cols-4 gap-4 items-center">
                                    <div className="col-span-2">
                                      <p className="text-md">
                                        Souvenir: (
                                        {selectedTicket.priceSouvenir} BDT)
                                      </p>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                      <label
                                        htmlFor="souvenirQuantity"
                                        className="text-md"
                                      >
                                        Qty:
                                      </label>
                                      <input
                                        type="number"
                                        id="souvenirQuantity"
                                        name="souvenirQuantity"
                                        value={souvenirQuantity}
                                        min="0"
                                        max="1"
                                        onChange={(e) => {
                                          const quantity = Math.max(
                                            0,
                                            parseInt(e.target.value) || 0
                                          );
                                          setSouvenirQuantity(quantity);
                                          setSouvenirTotalPrice(
                                            quantity *
                                              selectedTicket.priceSouvenir
                                          );
                                        }}
                                        className="w-16 text-black px-2 py-1 border rounded"
                                      />
                                    </div>
                                    <div className="flex gap-2 items-center">
                                      <p className="text-md">=</p>
                                      <span>{souvenirTotalPrice} BDT</span>
                                    </div>
                                  </div>
                                ) : (
                                  ""
                                )}

                                {/* T-Shirt Amount */}
                                {selectedTicket.isTShirt ? (
                                  <div className="grid grid-cols-4 gap-4 items-center">
                                    <div className="col-span-2">
                                      <p className="text-md">
                                        T-Shirt: ({selectedTicket.priceTShirt}{" "}
                                        BDT)
                                      </p>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                      <label
                                        htmlFor="tshirtQuantity"
                                        className="text-md"
                                      >
                                        Qty:
                                      </label>
                                      <input
                                        type="number"
                                        id="tshirtQuantity"
                                        name="tshirtQuantity"
                                        value={tshirtQuantity}
                                        min="0"
                                        max="1"
                                        onChange={(e) => {
                                          const quantity = Math.max(
                                            0,
                                            parseInt(e.target.value) || 0
                                          );
                                          setTShirtQuantity(quantity);
                                          setTShirtTotalPrice(
                                            quantity *
                                              selectedTicket.priceTShirt
                                          );
                                        }}
                                        className="w-16 text-black px-2 py-1 border rounded"
                                      />
                                    </div>
                                    <div className="flex gap-2 items-center">
                                      <p className="text-md">=</p>
                                      <span>{tshirtTotalPrice} BDT</span>
                                    </div>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </div>
                            ) : (
                              ""
                            )}

                            {selectedTicket.isAcceptContribution ? (
                              <div className="flex flex-col gap-4 mt-4">
                                <div className="grid grid-cols-4 gap-4 items-center">
                                  <div className="col-span-2">
                                    <p className="text-md">Contribution:</p>
                                  </div>
                                  <div className="flex gap-2 items-center">
                                    <label
                                      htmlFor="contributionAmount"
                                      className="text-md"
                                    >
                                      Amt
                                    </label>
                                    <input
                                      type="number"
                                      id="contributionAmount"
                                      name="contributionAmount"
                                      value={contributionAmount || ""}
                                      placeholder="Enter contribution"
                                      onChange={(e) => {
                                        const amount =
                                          parseInt(e.target.value) || 0;
                                        setContributionAmount(amount);
                                      }}
                                      onBlur={() => {
                                        if (contributionAmount < 1500) {
                                          setContributionAmount(1500);
                                        }
                                      }}
                                      className="w-16 text-black px-2 py-1 border rounded"
                                    />
                                  </div>
                                  <div className="flex gap-2 items-center">
                                    <p className="text-md">=</p>
                                    <span>{contributionAmount} BDT</span>
                                  </div>
                                </div>
                                {contributionAmount < 1500 && (
                                  <p className="text-red-500 text-sm mt-1">
                                    Minimum contribution amount is 1500 BDT.
                                  </p>
                                )}
                              </div>
                            ) : (
                              ""
                            )}

                            <div className="flex flex-col gap-4 mt-4">
                              {/* Total Amount */}
                              <div className="flex justify-between items-center mt-6 text-lg">
                                <p>Total Amount:</p>
                                <p>
                                  {selectedTicket.price +
                                    guestTotalPrice +
                                    guestSecondaryTotalPrice +
                                    priceGuestTertiary +
                                    souvenirTotalPrice +
                                    contributionAmount}{" "}
                                  BDT
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-4 text-white ">
                          <div className="flex items-center justify-start">
                            <p className="w-full text-start">Full Name</p>
                            <div className="relative w-full">
                              <Field
                                name="name"
                                type="text"
                                className="bg-gray-50 text-gray-800 text-red border-2 focus:outline-blue-300 focus:outline-1 text-sm py-1 h-d8 w-full md:w-300 px-2 rounded-md outline-none"
                                placeholder="Enter name"
                              />

                              <div>
                                {errors.name && touched.name ? (
                                  <small className="text-red-300 text-sm absolute left-0 top-8">
                                    {errors.name}
                                  </small>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-start">
                            <p className="w-full text-start"> Email</p>
                            <div className="relative w-full">
                              <Field
                                name="email"
                                type="email"
                                className="bg-gray-50 text-gray-800 text-red border-2 focus:outline-blue-300 focus:outline-1 text-sm py-1 h-d8 w-full md:w-300  px-2 rounded-md outline-none"
                                placeholder="Enter email"
                              />
                              <div>
                                {errors.email && touched.email ? (
                                  <small className="text-red-300 text-sm absolute left-0 top-8">
                                    {errors.email}
                                  </small>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          {userId_type && (
                            <div className="flex items-center justify-start">
                              <p className="w-full text-start capitalize">
                                {userId_type}
                              </p>
                              <div className="relative w-full">
                                <Field
                                  name="id_number"
                                  className="bg-gray-50 text-gray-800 text-red border-2 focus:outline-blue-300 focus:outline-1 text-sm py-1 h-d8 w-full md:w-300  px-2 rounded-md outline-none"
                                  placeholder="Enter your ID"
                                />
                                <div>
                                  {errors.id_number && touched.id_number ? (
                                    <small className="text-red-300 text-sm absolute left-0 top-8">
                                      {errors.id_number}
                                    </small>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          )}

                          {/* {isTShirt && ( */}
                            <div className="flex items-center justify-start">
                              <div className="w-full">
                                <p className="text-start"> T-Shirt Size</p>
                              </div>
                              <div className="relative w-full">
                                <Field
                                  name="tshirtSize"
                                  type="tshirtSize"
                                  as="select"
                                  className="bg-gray-50 text-gray-800 text-red border-2 focus:outline-blue-300 focus:outline-1 text-sm py-1 h-d8 w-full md:w-300  px-2 rounded-md outline-none"
                                  placeholder="Enter T-Shirt Size"
                                >
                                  <option>Select Size</option>
                                  <option value="Small">S</option>
                                  <option value="Medium">M</option>
                                  <option value="Large">L</option>
                                  <option value="XLarge">XL</option>
                                  <option value="XXLarge">XXL</option>
                                </Field>
                                <div>
                                  {errors.tshirtSize && touched.tshirtSize ? (
                                    <small className="text-red-300 text-sm absolute left-0 top-8">
                                      {errors.tshirtSize}
                                    </small>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          {/* )} */}

                          {userPhone && (
                            <div className="flex items-center justify-start">
                              <p className="w-full text-start"> Phone number</p>
                              <div className="relative w-full">
                                <Field
                                  name="phone"
                                  type="phone"
                                  className="bg-gray-50 text-gray-800 text-red border-2 focus:outline-blue-300 focus:outline-1 text-sm py-1 h-d8 w-full md:w-300  px-2 rounded-md outline-none"
                                  placeholder="Enter phone number"
                                />
                                <div>
                                  {errors.phone && touched.phone ? (
                                    <small className="text-red-300 text-sm absolute left-0 top-8">
                                      {errors.phone}
                                    </small>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          )}
                          {userGender && (
                            <div className="flex items-center justify-start">
                              <div className="w-full">
                                <p className="text-start"> Gender</p>
                              </div>
                              <div className="relative w-full">
                                <Field
                                  name="gender"
                                  type="gender"
                                  as="select"
                                  className="bg-gray-50 text-gray-800 text-red border-2 focus:outline-blue-300 focus:outline-1 text-sm py-1 h-d8 w-full md:w-300  px-2 rounded-md outline-none"
                                  placeholder="Enter Gender"
                                >
                                  <option>Select</option>
                                  <option value="male">Male</option>
                                  <option value="female">Female</option>
                                  <option value="other">Other</option>
                                </Field>
                                <div>
                                  {errors.gender && touched.gender ? (
                                    <small className="text-red-300 text-sm absolute left-0 top-8">
                                      {errors.gender}
                                    </small>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          )}
                          {userAge && (
                            <div className="flex items-center justify-start">
                              <p className="w-full text-start"> Age</p>
                              <div className="relative w-full">
                                <Field
                                  name="age"
                                  type="number"
                                  className="bg-gray-50 text-gray-800 text-red border-2 focus:outline-blue-300 focus:outline-1 text-sm py-1 h-d8 w-full md:w-300  px-2 rounded-md outline-none"
                                  placeholder="Enter your age"
                                />
                                <div>
                                  {errors.age && touched.age ? (
                                    <small className="text-red-300 text-sm absolute left-0 top-8">
                                      {errors.age}
                                    </small>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          )}
                          {userOccupation && (
                            <div className="flex items-center justify-start">
                              <p className="w-full text-start"> Occupation</p>
                              <div className="relative w-full">
                                <Field
                                  name="occupation"
                                  type="occupation"
                                  className="bg-gray-50 text-gray-800 text-red border-2 focus:outline-blue-300 focus:outline-1 text-sm py-1 h-d8 w-full md:w-300  px-2 rounded-md outline-none"
                                  placeholder="Enter your occupation"
                                />
                                <div>
                                  {errors.occupation && touched.occupation ? (
                                    <small className="text-red-300 text-sm absolute left-0 top-8">
                                      {errors.occupation}
                                    </small>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          )}

                          {userCity && (
                            <div className="flex items-center justify-start">
                              <p className="w-full text-start"> City</p>
                              <div className="relative w-full">
                                <Field
                                  name="city"
                                  type="city"
                                  className="bg-gray-50 text-gray-800 text-red border-2 focus:outline-blue-300 focus:outline-1 text-sm py-1 h-d8 w-full md:w-300  px-2 rounded-md outline-none"
                                  placeholder="Enter your city"
                                />
                                <div>
                                  {errors.city && touched.city ? (
                                    <small className="text-red-300 text-sm absolute left-0 top-8">
                                      {errors.city}
                                    </small>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          )}
                          {userCountry && (
                            <div className="flex items-center justify-start">
                              <p className="w-full text-start"> Country</p>
                              <div className="relative w-full">
                                <Field
                                  name="country"
                                  type="country"
                                  className="bg-gray-50 text-gray-800 text-red border-2 focus:outline-blue-300 focus:outline-1 text-sm py-1 h-d8 w-full md:w-300  px-2 rounded-md outline-none"
                                  placeholder="Enter your country"
                                />
                                <div>
                                  {errors.country && touched.country ? (
                                    <small className="text-red-300 text-sm absolute left-0 top-8">
                                      {errors.country}
                                    </small>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          )}
                          {userPostal_code && (
                            <div className="flex items-center justify-start">
                              <p className="w-full text-start"> Postal Code</p>
                              <div className="relative w-full">
                                <Field
                                  name="postal_code"
                                  type="postal_code"
                                  className="bg-gray-50 text-gray-800 text-red border-2 focus:outline-blue-300 focus:outline-1 text-sm py-1 h-d8 w-full md:w-300  px-2 rounded-md outline-none"
                                  placeholder="Enter postal code"
                                />
                                <div>
                                  {errors.postal_code && touched.postal_code ? (
                                    <small className="text-red-300 text-sm absolute left-0 top-8">
                                      {errors.postal_code}
                                    </small>
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="my-2 mt-4  p-4 md:flex justify-start gap-10 rounded-md bg-gray-600 text-white">
                        <div>
                          <p className="text-lg">Description:</p>
                        </div>
                        <div
                          className="rich_text -mt-4  -ml-4"
                          dangerouslySetInnerHTML={{
                            __html: selectedTicket
                              ? selectedTicket.details
                              : null,
                          }}
                        />
                      </div>
                      <div className="text-left space-y-2">
                        <p>
                          Family: {calculateTotalQuantityByCategory().family}
                          persons
                        </p>
                        <p>
                          Children over 10 years: =
                          {calculateTotalQuantityByCategory().childrenOver10}
                          persons
                        </p>
                        <p>
                          Children Below 10 years: =
                          {calculateTotalQuantityByCategory().childrenBelow10}
                          person
                        </p>
                        <p>
                          Total Quantity: {calculateTotalQuantity()} persons
                        </p>
                      </div>
                    </div>
                    <button
                      className="py-2 mt-8 mb-2 px-2 w-fit rounded-md border-[1px] border-brand_color bg-gray-800 hover:bg-brand_color text-white"
                      type="submit"
                    >
                      Proceed to payment
                    </button>
                  </Form>
                )}
              </Formik>
            </div>

            {/* gift card for myself form */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketOrderForm;
