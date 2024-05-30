"use client";
import { useState, Fragment } from "react";
import Image from "next/image";


// Define the Table component
export default function Table({
  props,
 
}: {


    
  props?: {
    categories: string[];
    products: {
      name: string;
      code: string;
      brand: string;
      category: string;
      series: string;
      price: string;
      items: string;
      currency: string;
      overall_amount: string;
      deductions: string;
      total_amount: string;
      variants: {
        item: string;
        quantity: string;
        price: string;
        adjustment: string;
        amount: string;
        remark: string;
      }[];
    }[];
  };


}) {
  // Prioritize props over books, or default to an empty object if neither is provided
  const data = props || { categories: [], products: [] , variants: [] };
  const { categories, products } = data;

  // Define options for the dropdown
  const statusOptions = [
    "New & Popular",
    "Available",
    "Unavailable",
    "New",
    "Popular",
  ];

  // Initialize state to track the visibility of the second table for each row
  const [showSecondTable, setShowSecondTable] = useState(
    Array(products.length).fill(false)
  );
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Function to handle row click for the first table
  const handleFirstTableRowClick = (index: number) => {
    setShowSecondTable((prevShowSecondTable) => {
      const updatedShowSecondTable = [...prevShowSecondTable];
      updatedShowSecondTable[index] = !updatedShowSecondTable[index];
      return updatedShowSecondTable;
    });
  };

  // Function to handle row click for the second table (empty function)
  const handleSecondTableRowClick = () => {};

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenEditModal = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  // Initialize state to store the selected product
  const [selectedProduct, setSelectedProduct] = useState<{
    name: string;
    code: string;
    brand: string;
    category: string;
    series: string;
    price: string;
  } | null>(null);

  const [selectedEditProduct, setEditProduct] = useState<{
    name: string;
    code: string;
    brand: string;
    category: string;
    series: string;
    price: string;
  } | null>(null);

  // Function to handle selecting a product
  const handleSelectProduct = (product: {
    name: string;
    code: string;
    brand: string;
    category: string;
    series: string;
    price: string;
  }) => {
    setSelectedProduct(product);
    handleOpenModal();
  };

  const handleEditProduct = (product: {
    name: string;
    code: string;
    brand: string;
    category: string;
    series: string;
    price: string;
  }) => {
    setEditProduct(product);
    handleOpenEditModal();
  };
 
  return (
    <div className="w-full overflow-y-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-black font-thin uppercase bg-neutral-accent-500">
          {/* Table headers */}
          <tr>
            {/* Render headers for each category */}
            {categories.map((item, idx) => (
              <th key={idx} scope="col" className="px-6 py-3">
                {item}
              </th> 
            ))} 
            {/* Add headers for Status and Action columns */}
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-gray-100">
          {/* Render rows for each product */}
          {products.length === 0 && (
            <tr>
              <td colSpan={categories.length + 3} className="text-center py-4">
                No Records Found
              </td>
            </tr>
          )}
          {products.map((product, index) => (
            <Fragment key={index}>
              {/* Render data for each product */}
              <tr
                onClick={() => handleFirstTableRowClick(index)}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-200"
                  } border-b text-black`}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap text-black"
                >
                  {product.name}
                  
                </th>
                <td className="px-6 py-4">{product.code}</td>
                <td className="px-6 py-4">{product.brand}</td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">{product.series}</td>
                <td className="px-6 py-4">{product.price}</td>
                <td className="px-6 py-4">{product.items}</td>
                <td className="px-6 py-4">{product.currency}</td>
                <td className="px-6 py-4">{product.overall_amount}</td>
                <td className="px-6 py-4">{product.deductions}</td>
                <td className="px-6 py-4">{product.total_amount}</td>
                <td className="px-6 py-4">
                  <select className="font-medium text-black border p-1 rounded-md border-gray-500">
                    {statusOptions.map((option, index) => (
                      <option
                        key={index}
                        value={option.toLowerCase()}
                        className=""
                      >
                        {option}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 text-left">
                  <button
                    className="mr-3 border border-gray-500 bg-gray-200 rounded p-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditProduct(product);
                    }}
                  >
                    <Image
                      src="/editicon.svg"
                      alt="Edit Icon"
                      width={20}
                      height={20}
                    />
                  </button>
                  <button
                    className="border border-gray-500 bg-gray-200 rounded p-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectProduct(product);
                    }}
                  >
                    <Image
                      src="/eyeicon.svg"
                      alt="View Icon"
                      width={20}
                      height={20}
                    />
                  </button>
                </td>
              </tr>

              {/* Render the second table only if showSecondTable is true */}
              {showSecondTable[index] && product.variants && product.variants.length > 0 && (
                <tr>
                  <td colSpan={categories.length + 2}>
                    <table className="w-auto bg-neutral-accent-500 mx-auto overflow-y-auto shadow-md sm:rounded-lg mb-2 mt-2">
                      <thead>
                        <tr>
                          {/* Render headers for each variant property */}
                          {Object.keys(product.variants[0]).map((key, idx) => (
                            <th key={idx} scope="col" className="px-6 py-3 text-black font-semibold">
                              {key}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {/* Render rows for each variant */}
                        {product.variants.map((variant, idx) => (
                          <tr
                            key={`variant-${idx}`}
                            className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-100"} border-b text-black`}
                          >
                            {/* Render data for each variant */}
                            {Object.values(variant).map((value, idx) => (
                              <td key={idx} className="px-6 py-4">
                                {value}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}

            </Fragment>
          ))}
        </tbody>
      </table>

      {/* Modals */}
      {/* {selectedProduct && (
        <MyModal show={showModal} handleClose={handleCloseModal} formData={selectedProduct} />
      )}
      {selectedEditProduct && (
        <EditModal show={showEditModal} handleClose={handleCloseEditModal} formEditData={selectedEditProduct} />
      )} */}
    </div>
  );
}

