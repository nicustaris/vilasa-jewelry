import React, { useState } from "react";

import * as yup from "yup";
import { Formik, Form, Field, FieldArray } from "formik";

import { MdOutlineCloudUpload } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

import { useDispatch } from "react-redux";
import { createProduct } from "./../../../store/product/productSlice";

const productSchema = yup.object().shape({
  name: yup.string().required().min(3).max(25),
  description: yup.string().required(),
  product_category: yup.string().required(),
  product_brand: yup.string().required(),
  product_stock: yup.number().required().positive().integer(),
  price: yup.number().required().positive(),
  cuttedPrice: yup.number().required().positive(),
  product_warranty: yup.number().integer(),
  product_discount: yup.number().max(100),
  highlights: yup.string().required(),
  specifications: yup.array().of(
    yup.object().shape({
      title: yup.string().required(),
      description: yup.string().required(),
    })
  ),
});

const AddProduct = () => {
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        name: "",
        description: "",
        product_category: "",
        product_brand: "",
        product_stock: "",
        price: "",
        cuttedPrice: "",
        product_warranty: 0,
        product_discount: 0,
        highlights: [],
        specifications: [{ title: "", description: "" }],
      }}
      validationSchema={productSchema}
      onSubmit={(productData, { resetForm }) => {
        try {
          dispatch(createProduct(productData));
          resetForm();
        } catch (error) {
          console.error("Error:", error);
        }
      }}
    >
      {(formikProps) => (
        <div className="w-full h-auto p-10 bg-gray-100">
          <h1 className="text-2xl font-bold">Dashboard / Add new product</h1>
          <Form>
            <div className="grid grid-cols-4 mt-10">
              <div className="col-span-3 w-auto px-3">
                <h2 className="text-xl font-medium mt-5">
                  Product Information
                </h2>
                <div className="mt-5">
                  <h3 className="font-medium">Jewelry Name</h3>
                  <Field type="text" name="name" className="custum-input" />
                  {formikProps.touched.name && formikProps.errors.name ? (
                    <div className="text-red-500 font-medium">
                      {formikProps.errors.name}
                    </div>
                  ) : null}
                </div>
                <div className="mt-5">
                  <h3 className="font-medium">Description</h3>
                  <Field
                    as="textarea"
                    name="description"
                    className="custum-input"
                  />
                  {formikProps.touched.description &&
                  formikProps.errors.name ? (
                    <div className="text-red-500 font-medium">
                      {formikProps.errors.description}
                    </div>
                  ) : null}
                </div>
                <div className="flex mt-5 space-x-5">
                  <div className="w-[33.3%]">
                    <h3 className="font-medium">Category</h3>
                    <Field
                      as="select"
                      name="product_category"
                      className="custum-input"
                    >
                      <option value="">Select category</option>
                      <option value="category1">Category 1</option>
                      <option value="category2">Category 2</option>
                    </Field>
                    {formikProps.touched.product_category &&
                    formikProps.errors.product_category ? (
                      <div className="text-red-500 font-medium">
                        {formikProps.errors.product_category}
                      </div>
                    ) : null}
                  </div>
                  <div className="w-[33.3%]">
                    <h3 className="font-medium">Brand</h3>
                    <Field
                      as="select"
                      name="product_brand"
                      className="custum-input"
                    >
                      <option value="">Select brand</option>
                      <option value="brand1">Brand 1</option>
                      <option value="brand2">Brand 2</option>
                    </Field>
                    {formikProps.touched.product_brand &&
                    formikProps.errors.product_brand ? (
                      <div className="text-red-500 font-medium">
                        {formikProps.errors.product_brand}
                      </div>
                    ) : null}
                  </div>
                  <div className="w-[33.3%]">
                    <h3 className="font-medium">Stock</h3>
                    <Field
                      type="text"
                      name="product_stock"
                      className="custum-input"
                    />
                    {formikProps.touched.product_stock &&
                    formikProps.errors.product_stock ? (
                      <div className="text-red-500 font-medium">
                        {formikProps.errors.product_stock}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="flex mt-5 justify-between">
                  <div className="w-[33.3%] pr-5">
                    <h3 className="font-medium">Price</h3>
                    <Field type="text" name="price" className="custum-input" />
                    {formikProps.touched.price && formikProps.errors.price ? (
                      <div className="text-red-500 font-medium">
                        {formikProps.errors.price}
                      </div>
                    ) : null}
                  </div>
                  <div className="w-[33.3%] pr-5">
                    <h3 className="font-medium">Cutted price</h3>
                    <Field name="cuttedPrice" className="custum-input" />
                    {formikProps.touched.cuttedPrice &&
                    formikProps.errors.cuttedPrice ? (
                      <div className="text-red-500 font-medium">
                        {formikProps.errors.cuttedPrice}
                      </div>
                    ) : null}
                  </div>
                  <div className="w-[33.3%]">
                    <h3 className="font-medium">Warranty</h3>
                    <Field name="product_warranty" className="custum-input" />
                    {formikProps.touched.product_warranty &&
                    formikProps.errors.product_warranty ? (
                      <div className="text-red-500 font-medium">
                        {formikProps.errors.product_warranty}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="flex mt-5">
                  <div className="pr-5">
                    <h3 className="font-medium">Discount</h3>
                    <Field name="product_discount" className="custum-input" />
                    {formikProps.touched.product_discount &&
                    formikProps.errors.product_discount ? (
                      <div className="text-red-500 font-medium">
                        {formikProps.errors.product_discount}
                      </div>
                    ) : null}
                  </div>
                  <div className="w-full">
                    <h3 className="font-medium">Highlights</h3>
                    <Field name="highlights" className="custum-input" />
                    {formikProps.touched.highlights &&
                    formikProps.errors.highlights ? (
                      <div className="text-red-500 font-medium">
                        {formikProps.errors.highlights}
                      </div>
                    ) : null}
                  </div>
                </div>
                <FieldArray
                  name="specifications"
                  render={({ remove, push, form }) => (
                    <>
                      <div className="flex flex-col mt-5">
                        <h2 className="text-xl font-medium mt-5">
                          Product Specification
                        </h2>
                        {form.values.specifications.map((_, index) => (
                          <div key={index}>
                            <div className="mt-5">
                              <h3 className="font-medium">Title</h3>
                              <Field
                                type="text"
                                name={`specifications[${index}].title`}
                                className="custum-input"
                              />
                              {formikProps.touched.specifications &&
                              formikProps.touched.specifications[index] &&
                              formikProps.touched.specifications[index].title &&
                              formikProps.errors &&
                              formikProps.errors.specifications &&
                              formikProps.errors.specifications[index] &&
                              formikProps.errors.specifications[index].title ? (
                                <div className="text-red-500 font-medium">
                                  {
                                    formikProps.errors.specifications[index]
                                      .title
                                  }
                                </div>
                              ) : null}
                            </div>
                            <div className="mt-5">
                              <h3 className="font-medium">Specification</h3>
                              <Field
                                as="textarea"
                                name={`specifications[${index}].description`}
                                className="custum-input"
                              />
                              {formikProps.touched.specifications &&
                              formikProps.touched.specifications[index] &&
                              formikProps.touched.specifications[index]
                                .description &&
                              formikProps.errors &&
                              formikProps.errors.specifications &&
                              formikProps.errors.specifications[index] &&
                              formikProps.errors.specifications[index]
                                .description ? (
                                <div className="text-red-500 font-medium">
                                  {
                                    formikProps.errors.specifications[index]
                                      .description
                                  }
                                </div>
                              ) : null}
                            </div>
                            <div>
                              <button
                                type="button"
                                className="bg-red-500 p-2 mt-2 rounded-md text-white"
                                onClick={() => remove(index)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                        <div>
                          <button
                            type="button"
                            className="mt-3 bg-gray-200 p-3 rounded-md"
                            onClick={() => push({ title: "", description: "" })}
                          >
                            <FaPlus size={25} />
                          </button>
                        </div>
                      </div>
                      <div className="mt-5">
                        <button
                          type="submit"
                          className="bg-gray-500 p-3 rounded-md text-white font-medium"
                        >
                          Confirm
                        </button>
                      </div>
                    </>
                  )}
                />
              </div>

              <div className="flex flex-col items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 hover:bg-gray-200 border-dashed rounded-lg cursor-pointer"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <MdOutlineCloudUpload size={45} />
                    <p className="mb-2 text-sm">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs">SVG, PNG, JPG or JPEG.</p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={(e) => console.log(e)}
                  />
                </label>
              </div>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default AddProduct;
