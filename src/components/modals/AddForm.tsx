
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const AddForm: React.FC<{ show: boolean; handleClose: () => void; updateTableData: () => void }> = ({ show, handleClose, updateTableData }) => {

    const [formData, setFormData] = useState({
        referenceType: '',
        referenceId: '',
        morphType: '',
        morphId: '',
    });

    const [referenceIdSearch, setReferenceIdSearch] = useState("");
    const [morphIdSearch, setMorphIdSearch] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prevState => ({ ...prevState, [id]: value }));
    };

    const handleSubmit = () => {
        // if (!formData.referenceType || !formData.referenceId || !formData.morphType || !formData.morphId) {
        //     alert('Add Failed : Please check all fields before submitting.'); // Show an error message
        //     return; // Prevent form submission
        // }
        // Prepare the data for the POST request
        const postData = {
            reference_type: parseInt(formData.referenceType),
            reference_id: parseInt(formData.referenceId),
            morph_type: parseInt(formData.morphType),
            morph_id: parseInt(formData.morphId)
        };

        // Make the POST request
        fetch('https://pc-dev.qbeep.my/api/link/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
            .then(response => response.json())
            .then(data => {
                console.log('Response:', data);
                // Close the modal after successful submission
                handleClose();
                updateTableData();
                setFormData({
                    referenceType: '',
                    referenceId: '',
                    morphType: '',
                    morphId: '',
                });
                // window.location.reload();
            })
            .catch(error => console.error('Error submitting data:', error));
    };

    // Fetch configuration data from API endpoint
    useEffect(() => {
        fetch('https://pc-dev.qbeep.my/api/link/config')
            .then(response => response.json())
            .then(data => {
                if (data && data.data) {
                    const { reference_type, morph_type } = data.data;

                    // Set reference type options
                    setReferenceTypeOptions(reference_type);

                    // Set morph type options
                    setMorphTypeOptions(morph_type);
                }
            })
            .catch(error => console.error('Error fetching configuration data:', error));
    }, []);

    // Dropdown options for reference types
    const [referenceTypeOptions, setReferenceTypeOptions] = useState<{ id: number; name: string }[]>([]);

    // Dropdown options for morph types
    const [morphTypeOptions, setMorphTypeOptions] = useState<{ [key: string]: { id: number, name: string }[] }>({});
    const [filteredMorphTypeOptions, setFilteredMorphTypeOptions] = useState<{ id: number; name: string }[]>([]);
    // Update morph type options when reference type changes
    useEffect(() => {
        if (formData.referenceType && morphTypeOptions[formData.referenceType]) {
            setFilteredMorphTypeOptions(morphTypeOptions[formData.referenceType]);
        }
    }, [formData.referenceType, morphTypeOptions]);

    // Fetch reference IDs based on selected reference type
    useEffect(() => {
        if (formData.referenceType && formData.referenceType === '3') {
            fetch('https://pc-dev.qbeep.my/api/link/product')
                .then(response => response.json())
                .then(data => {
                    if (data && data.data) {
                        // Set reference ID options
                        setReferenceIdOptions(data.data.map((item: any) => ({ id: item.id, name: item.name || item.title })));
                    }
                })
                .catch(error => console.error('Error fetching reference IDs:', error));
        } else if (formData.referenceType && formData.referenceType === '7') {
            fetch('https://pc-dev.qbeep.my/api/link/video')
                .then(response => response.json())
                .then(data => {
                    if (data && data.data) {
                        // Set reference ID options
                        setReferenceIdOptions(data.data.map((item: any) => ({ id: item.id, name: item.name || item.title })));
                    }
                })
                .catch(error => console.error('Error fetching reference IDs:', error));
        }
    }, [formData.referenceType]);
    // Fetch Morph IDs based on selected Morph Type
    useEffect(() => {
        if (formData.morphType === '3') {
            fetch('https://pc-dev.qbeep.my/api/link/product')
                .then(response => response.json())
                .then(data => {
                    if (data && data.data) {
                        // Set Morph ID options
                        setMorphIdOptions(data.data.map((item: any) => ({ id: item.id, name: item.name })));
                    }
                })
                .catch(error => console.error('Error fetching Morph IDs:', error));
        } else if (formData.morphType === '7') {
            fetch('https://pc-dev.qbeep.my/api/link/video')
                .then(response => response.json())
                .then(data => {
                    if (data && data.data) {
                        // Set Morph ID options
                        setMorphIdOptions(data.data.map((item: any) => ({ id: item.id, name: item.title })));
                    }
                })
                .catch(error => console.error('Error fetching Morph IDs:', error));
        } else if (formData.morphType === '12') {
            fetch('https://pc-dev.qbeep.my/api/link/publication')
                .then(response => response.json())
                .then(data => {
                    if (data && data.data) {
                        // Set Morph ID options
                        setMorphIdOptions(data.data.map((item: any) => ({ id: item.id, name: item.title })));
                    }
                })
                .catch(error => console.error('Error fetching Morph IDs:', error));
        } else if (formData.morphType === '23') {
            fetch('https://pc-dev.qbeep.my/api/link/brochure')
                .then(response => response.json())
                .then(data => {
                    if (data && data.data) {
                        // Set Morph ID options
                        setMorphIdOptions(data.data.map((item: any) => ({ id: item.id, name: item.title })));
                    }
                })
                .catch(error => console.error('Error fetching Morph IDs:', error));
        }
    }, [formData.morphType]);
    // Dropdown options for reference IDs
    const [referenceIdOptions, setReferenceIdOptions] = useState<{ id: number; name: string }[]>([]);

    const [morphIdOptions, setMorphIdOptions] = useState<{ id: number; name: string }[]>([]);

    // Filter reference ID options based on search query
    const filteredReferenceIdOptions = referenceIdOptions.filter(option =>
        option.name.toLowerCase().includes(referenceIdSearch.toLowerCase())
    );

    // Filter morph ID options based on search query
    const filteredMorphIdOptions = morphIdOptions.filter(option =>
        option.name.toLowerCase().includes(morphIdSearch.toLowerCase())
    );

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton />
                <Modal.Body>
                    <div className="fixed inset-0 grid justify-center items-center w-full h-full bg-black bg-opacity-70">
                        <div className="bg-white p-4 rounded-lg ms-60 mx-60 shadow-sm outline outline-white/10 outline-1 text-black text-xl font-semibold w-[1900px] ">
                            Add Link

                            <div className="bg-white p-4 rounded-lg shadow-sm">
                                <label className="block text-gray-700   mb-2" htmlFor="referenceType">
                                    Reference Type
                                </label>
                                <select
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-[url('/dropdown.svg')] bg-no-repeat  bg-[1800px] "
                                    id="referenceType"
                                    value={formData.referenceType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Reference Type</option>
                                    {referenceTypeOptions.map(option => (
                                        <option key={option.id} value={option.id}>{option.name}</option>
                                    ))}
                                </select>

                                <label className="block text-gray-700 text-xl  mt-4 mb-2" htmlFor="referenceId">
                                    Reference ID
                                </label>
                                <input
                                    type="text"
                                    className="shadow appearance-none border rounded w-full py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-[url('/search.svg')] bg-no-repeat bg-left  bg-[13px] "
                                    placeholder="Search Reference ID"
                                    value={referenceIdSearch}
                                    onChange={(e) => setReferenceIdSearch(e.target.value)}
                                />


                                <select
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-[url('/dropdown.svg')] bg-no-repeat  bg-[1800px]"
                                    id="referenceId"
                                    value={formData.referenceId}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Reference ID</option>
                                    {filteredReferenceIdOptions.map(option => (
                                        <option key={option.id} value={option.id}>{option.name}</option>
                                    ))}
                                </select>

                                <label className="block text-gray-700 text-xl  mt-4 mb-2" htmlFor="morphType">
                                    Morph Type
                                </label>

                                <select
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-[url('/dropdown.svg')] bg-no-repeat  bg-[1800px]"
                                    id="morphType"
                                    value={formData.morphType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Morph Type</option>
                                    {filteredMorphTypeOptions.map(option => (
                                        <option key={option.id} value={option.id}>{option.name}</option>
                                    ))}
                                </select>
                                <label className="block text-gray-700 text-xl  mt-4 mb-2" htmlFor="morphId">
                                    Morph ID
                                </label>

                                <input
                                    type="text"
                                    className="shadow appearance-none border rounded w-full py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-[url('/search.svg')] bg-no-repeat bg-left  bg-[13px]"
                                    placeholder="Search Morph ID"
                                    value={morphIdSearch}
                                    onChange={(e) => setMorphIdSearch(e.target.value)}
                                />

                                <select
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white bg-[url('/dropdown.svg')] bg-no-repeat  bg-[1800px]"
                                    id="morphId"
                                    value={formData.morphId}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Morph Type</option>
                                    {filteredMorphIdOptions.map(option => (
                                        <option key={option.id} value={option.id}>{option.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex justify-end space-x-2 mt-4">
                                <Button
                                    className="w-40 h-10 m-2 border bg-gray-100 rounded text-xl text-black hover:bg-gray-50"
                                    variant="secondary"
                                    onClick={handleClose}
                                >
                                    Close
                                </Button>
                                <Button
                                    className=" w-40 h-10 m-2 border bg-teal-700 rounded text-xl text-white bg-blue-600 hover:bg-blue-700"
                                    variant="primary"
                                    onClick={handleSubmit}
                                >
                                    Confirm
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer />
            </Modal>
        </>
    );
};

export default AddForm;

