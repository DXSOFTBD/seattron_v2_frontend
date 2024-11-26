import { Field, Form, Formik } from "formik";

const ProfilePublic = () => {
  return (
    <div className="">
      <div className="h-[300px] bg-slate-200 rounded-tl-[150px]"></div>
      <div className="grid  grid-cols-1 md:grid-cols-4 gap-20 relative">
        <div className="w-48 h-48 rounded-full bg-slate-400 -mt-10 "></div>
        <div className="space-y-10 col-span-2">
          <div className="mt-[10%]">
            <p className="text-2xl font-semibold mb-4">Profile</p>
            <p>Update Your Photo and Personal Details</p>
          </div>
          <div className="mt-20 w-full">
            <Formik
              initialValues={{
                term: "",
              }}
              //   validationSchema={termSchema}
              onSubmit={(values: any) => {
                console.log(values);
              }}
            >
              {({ errors, touched }) => (
                <Form className="text-start mt-20">
                  <div className="grid grid-cols-1   gap-y-2 gap-x-6">
                    <div className="relative grid grid-cols-2 gap-10 border-b">
                      <label htmlFor="" className="form_label">
                        User Name
                      </label>
                      <Field
                        name="bankName"
                        className="border-[1px] border-brand_color outline-none text-gray-800 bg-white w-full  h-8  text-sm px-2 py-1 my-1 rounded-md "
                      ></Field>
                      <div>
                        {errors.bankName && touched.bankName ? (
                          <small className="text-red-400 mt-1">
                            {/* {errors.bankName} */}
                          </small>
                        ) : null}
                      </div>
                    </div>
                    <div className="relative grid grid-cols-2 gap-10 border-b">
                      <label htmlFor="" className="form_label">
                        Password
                      </label>
                      <Field
                        name="bankAccountNumber"
                        type="text"
                        className="border-[1px] h-8 border-brand_color outline-none text-gray-800 bg-white w-full text-sm px-2 py-1 my-1 rounded-md "
                      ></Field>
                      <div>
                        {errors.bankAccountNumber &&
                        touched.bankAccountNumber ? (
                          <small className="text-red-400 mt-1">
                            {/* {errors.bankAccountNumber} */}
                          </small>
                        ) : null}
                      </div>
                    </div>
                    <div className="relative grid grid-cols-2 gap-10 border-b">
                      <label htmlFor="" className="form_label">
                        Photo
                      </label>
                      <Field
                        name="bankAccountTitle"
                        type="text"
                        className="border-[1px] h-8 border-brand_color outline-none text-gray-800 bg-white w-full text-sm px-2 py-1 my-1 rounded-md "
                      ></Field>
                      <div>
                        {errors.bankAccountTitle && touched.bankAccountTitle ? (
                          <small className="text-red-400 mt-1">
                            {/* {errors.bankAccountTitle} */}
                          </small>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <button
                    className="text-xl justify-center items-center  flex space-x- mt-6 mb-4 bg-brand_gradient px-4 py-2 rounded-lg text-white w-max"
                    type="submit"
                  >
                    Update
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePublic;
