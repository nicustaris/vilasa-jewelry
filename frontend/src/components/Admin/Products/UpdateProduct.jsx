import React, { useEffect, useState } from "react";

import * as yup from "yup";
import { Formik, Form, Field, FieldArray } from "formik";

import { MdOutlineCloudUpload } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../../../store/brands/brandsSlice";
import { getCategories } from "../../../store/categories/categoriesSlice";
import { getProduct } from "../../../store/product/productSlice";
import { useParams } from "react-router-dom";

const productSchema = yup.object().shape({
  name: yup.string().required().min(3).max(25),
  description: yup.string().required(),
  category: yup.string().required(),
  brand: yup.string().required(),
  stock: yup.number().required().positive().integer(),
  price: yup.number().required().positive(),
  cuttedPrice: yup.number().required().positive(),
  warranty: yup.number().integer(),
  discount: yup.number().max(100),
  highlights: yup.array().required(),
  specifications: yup.array().of(
    yup.object().shape({
      title: yup.string().required(),
      description: yup.string().required(),
    })
  ),
});

const UpdateProduct = () => {
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();

  const { id } = useParams();
  const { product } = useSelector((state) => state.product);

  const { brands } = useSelector((state) => state.brands);
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getProduct(id));
    dispatch(getBrands());
    dispatch(getCategories());
  }, [id]);

  useEffect(() => {
    if (product?.images && product?.images.length > 0) {
      const fetchDataUrls = async () => {
        const dataUrls = await Promise.all(
          product.images.map(async (image) => {
            try {
              const response = await fetch(image.url);
              if (!response.ok) {
                throw new Error("Failed to fetch");
              }
              const blob = await response.blob();
              return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onload = () => {
                  resolve(reader.result);
                };
                reader.readAsDataURL(blob);
              });
            } catch (error) {
              console.error("Error fetching image:", error);
              return null;
            }
          })
        );
        setImages(dataUrls.filter((dataUrl) => dataUrl !== null));
      };
      fetchDataUrls();
    }
  }, [product?.images]);

  console.log(images);

  const handleImage = (event) => {
    const files = event.target.files;
    if (files) {
      const imagesArray = [];
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        promises.push(
          new Promise((resolve, reject) => {
            reader.onload = () => {
              imagesArray.push(reader.result);
              resolve();
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
        );
      }

      Promise.all(promises)
        .then(() => {
          setImages((prev) => [...prev, ...imagesArray]);
        })
        .catch((error) => {
          console.error("Error reading files:", error);
        });
    }
  };

  const formInitialValues = product
    ? {
        name: product.name,
        description: product.description,
        category: product.category,
        brand: product.brand,
        stock: product.stock,
        price: product.price,
        cuttedPrice: product.cuttedPrice,
        warranty: product.warranty,
        discount: product.discount,
        highlights: product.highlights,
        specifications: product.specifications,
        images: product.images,
      }
    : {
        name: "",
        description: "",
        category: "",
        brand: "",
        stock: 0,
        price: 0,
        cuttedPrice: 0,
        warranty: 0,
        discount: 0,
        highlights: [],
        specifications: [{ title: "", description: "" }],
        images: [],
      };

  return (
    <Formik
      enableReinitialize
      initialValues={formInitialValues}
      validationSchema={productSchema}
      onSubmit={(productData, { resetForm }) => {
        productData.images = images;
        console.log(productData);
        // try {
        //   dispatch(createProduct(productData));
        //   resetForm();
        // } catch (error) {
        //   console.error("Error:", error);
        // }
      }}
    >
      {(formikProps) => (
        <div className="w-full h-auto p-10 bg-gray-100">
          <h1 className="text-2xl font-bold">Update product</h1>
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
                    <Field as="select" name="category" className="custum-input">
                      <option value="">Select category</option>
                      {categories?.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.title}
                        </option>
                      ))}
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
                    <Field as="select" name="brand" className="custum-input">
                      <option value="">Select brand</option>
                      {brands?.map((brand) => (
                        <option key={brand._id} value={brand._id}>
                          {brand.title}
                        </option>
                      ))}
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
                    <Field type="text" name="stock" className="custum-input" />
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
                    <Field name="warranty" className="custum-input" />
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
                    <Field name="discount" className="custum-input" />
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
                        {form?.values?.specifications?.map((_, index) => (
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
                  <FieldArray
                    render={({ push, remove, form }) => (
                      <div>
                        <input
                          id="dropzone-file"
                          type="file"
                          name="images"
                          className="hidden"
                          multiple
                          onChange={(event) => handleImage(event)}
                        />
                        {images && images.length > 0 ? (
                          <div className="flex space-x-2">
                            {images.map((image, index) => (
                              <div key={index} className="w-[40px] h-[40px]">
                                <img
                                  src={image}
                                  alt={`Product Image ${index}`}
                                />
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    )}
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

export default React.memo(UpdateProduct);
