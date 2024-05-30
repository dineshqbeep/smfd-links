"use client";
import React, { useState, useEffect } from 'react';
import AddForm from '@/components/modals/AddForm';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Table from '@/components/table';

export default function Home() {
  const [selectedValue, setSelectedValue] = useState('');
  const [tableData, setTableData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleSelectChange = (value: any) => {
    setSelectedValue(value);
  };

  const handleAddButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const tableHeaders = selectedValue === 'Product' 
    ? ["Name", "Morph Type", "Morph Name", "Actions"] 
    : selectedValue === 'Video' 
    ? ["Name", "Morph Type", "Morph Name", "Actions"] 
    : [];

  const fetchData = () => {
    if (selectedValue) {
      const url = selectedValue === 'Product' 
        ? 'https://pc-dev.qbeep.my/api/link/productable'
        : 'https://pc-dev.qbeep.my/api/link/videoable';

      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data.status === 1) {
            setTableData(data.data);
          } else {
            setTableData([]);
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setTableData([]);
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, [selectedValue]);

  const handleDelete = (referenceType: any, referenceId: any, morphType: any, morphId: any) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this data?");
    if (!confirmDelete) {
        return; 
    }
    const url = 'https://pc-dev.qbeep.my/api/link/delete';
    const body = JSON.stringify({
      reference_type: referenceType,
      reference_id: referenceId,
      morph_type: morphType,
      morph_id: morphId,
    });

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 1) {
        // Refresh the table data
        fetchData();
      } else {
        console.error('Error deleting data:', data.message);
      }
    })
    .catch(error => {
      console.error('Error deleting data:', error);
    });
  };
  const updateTableData = () => {
    fetchData();
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="grid grid-cols-1 w-full ">
        <h2 className="text-2xl font-bold text-left w-full">CMS Links</h2>
        <div className="grid grid-cols-9 justify-between items-center space-x-2 pt-2">
          <Select onValueChange={handleSelectChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Links Here" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Product">Product</SelectItem>
              <SelectItem value="Video">Video</SelectItem>
            </SelectContent>
          </Select>

          {selectedValue && (
            <div className="flex space-x-2">
              <Button className="hover:bg-green-400" onClick={handleAddButtonClick}>Add</Button>
            </div>
          )}
        </div>
        <div className="pt-2 w-full">
          {selectedValue && <Table categories={tableHeaders} products={tableData} onDelete={handleDelete} />}
        </div>
      </div>
      
      <AddForm show={showModal} handleClose={handleCloseModal}updateTableData={updateTableData} />
      
    </main>
  );
}
