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
    userGuest_adult,
    userGuest_chield,
    userGuest_infant,
  } = event;
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const [selectedTicket, setSelectedTicket] = useState<any>(event.tickets[0]);

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
  console.log(selectedTicket)

  return (
    <div
      className="lg:my-12 my-6 p-4 md:p-20 lg:p-0  max-w-[1050px] mx-auto font-lato"
      id="ticketForm"
    >
      <p className="text-brand_color  ui_title">BOOK YOUR SEAT</p>
      {/* <Breadcrumb from='giftCard' /> */}
      <div className="w-full bg-gray-800 text-white rounded-md p-8 ">
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
                  };

                  const newOrderDetails = Object.entries(orderDetails).reduce(
                    (a: any, [k, v]) => (v ? ((a[k] = v), a) : a),
                    {}
                  );
                  // console.log(newOrderDetails);
                  createOrderHandler(newOrderDetails);
                }}
              >
                {({ errors, touched }: any) => (
                  <Form className="mt-8 text-center">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      <div className="flex flex-col flex-nowrap justify-start items-start space-y-6 mb-6 md:mb-0">
                        <div className="flex items-start justify-start">
                          <p className="md:md:w-174 w-150 text-start">
                            Select Ticket Category
                          </p>
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
                          <div className="font-semibold flex justify-start gap-10">
                            <div>
                              <p className="text-lg font-semibold w-28">
                                Price:
                              </p>
                            </div>
                            <div>
                              <span> {selectedTicket.price} BDT</span>
                            </div>
                          </div>
                          {selectedTicket.isGuestPrimary ? (<div className="font-semibold flex justify-start gap-10">
                            <div>
                              <p className="text-lg font-semibold w-28">
                                Guest Price:
                              </p>
                            </div>
                            <div>
                              <span> {selectedTicket.priceGuestPrimary} BDT</span>
                            </div>
                          </div>) : "AA"}


                          <div className="my-2 mt-4 md:flex justify-start gap-10">
                            <div>
                              <p className="text-lg font-semibold w-28">
                                Description:
                              </p>
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
                        </div>
                      </div>
                      <div className="flex flex-col space-y-4 text-white ">
                        <div className="flex items-center justify-start">
                          <p className="w-full text-start">Name</p>
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
