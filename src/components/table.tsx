"use client";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";

export default function Table({
  categories,
  products,
  onDelete,
}: {
  categories: string[];
  products: {
    reference_type: number;
    reference_id: number;
    morph_type: number;
    morph_id: number;
    name: string;
    morph_type_name: string;
    morph_name: string;
  }[];
  onDelete: (referenceType: number, referenceId: number, morphType: number, morphId: number) => void;
}) {
  return (
    <div className="w-full overflow-y-auto rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400  ">
        <thead className="text-xs text-white font-thin uppercase bg-blue-600 ">
          <tr>
            {categories.map((item, idx) => (
              <th key={idx} scope="col" className="px-6 py-3">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-gray-100">
          {products.length === 0 && (
            <tr>
              <td colSpan={categories.length} className="text-center py-4">
                No Records Found
              </td>
            </tr>
          )}
          {products.map((product, index) => (
            <Fragment key={index}>
              <tr className={`${index % 2 === 0 ? "bg-white" : "bg-gray-200"} border-b text-black`}>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.morph_type_name}</td>
                <td className="px-6 py-4">{product.morph_name}</td>
                <td className="px-6 py-4">
                  <Button className="hover:bg-red-400" onClick={() => onDelete(product.reference_type, product.reference_id, product.morph_type, product.morph_id)}>Delete</Button>
                </td>
              </tr>
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
