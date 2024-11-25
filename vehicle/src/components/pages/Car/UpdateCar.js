import './UpdateCar.css';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateCar = () => {
    const { id } = useParams(); // Fetching car ID from URL parameters
    const navigate = useNavigate();

    // State for form data and image preview
    const [formData, setFormData] = useState({
        brandname: "",
        name: "",
        color: "",
        type: "",
        transmission: "",
        modelyear: "",
        price: "",
        description: "",
        image: null, // Image file state for new image
    });

    const [imagePreview, setImagePreview] = useState(null); // For selected image preview
    const [existingImage, setExistingImage] = useState(null); // To store the existing image URL

    // Handle form input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle select dropdown changes
    const handleSelectChange = (selectedOption, actionMeta) => {
        setFormData({
            ...formData,
            [actionMeta.name]: selectedOption.value,
        });
    };

    // Handle image change and preview
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setFormData({
            ...formData,
            image: file,
        });
        setImagePreview(URL.createObjectURL(file)); // Set the new image preview
    };

    // Fetch car details (including previously uploaded image)
    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/car/${id}`);
                const data = await response.json();
                setFormData({
                    brandname: data.brandname,
                    name: data.name,
                    color: data.color,
                    type: data.type,
                    transmission: data.transmission,
                    modelyear: data.modelyear,
                    price: data.price,
                    description: data.description,
                    image: null, // Set image to null (only use image if updated)
                });
                // Set the existing image URL if available
                setExistingImage(`http://localhost:8000/api/car/${id}/image`);
            } catch (error) {
                console.error('Error fetching car details:', error.message);
            }
        };

        fetchCarDetails();
    }, [id]);

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formDataToSend = new FormData();

        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        try {
            const response = await fetch(`http://localhost:8000/api/car/${id}`, {
                method: 'PATCH',
                body: formDataToSend, // Send the form data including new image if updated
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            navigate('/dashboard'); // Redirect to the home page after update
        } catch (error) {
            console.error("Error updating car:", error.message);
        }
    };

    // Dropdown options for car details
    const colorOptions = [
        { value: 'red', label: 'Red' },
        { value: 'blue', label: 'Blue' },
        { value: 'black', label: 'Black' },
        { value: 'green', label: 'Green' },
        { value: 'yellow', label: 'Yellow' },
        { value: 'purple', label: 'Purple' },
        { value: 'orange', label: 'Orange' },
        { value: 'pink', label: 'Pink' },
        { value: 'brown', label: 'Brown' },
        { value: 'gray', label: 'Gray' },
        { value: 'white', label: 'White' },
        { value: 'silver', label: 'Silver' },
        { value: 'gold', label: 'Gold' },
    ];

    const typeOptions = [
        { value: 'hybrid', label: 'Hybrid' },
        { value: 'electric', label: 'Electric' },
        { value: 'gasoline', label: 'Gasoline' },
        { value: 'diesel', label: 'Diesel' },
    ];

    const transmissionOptions = [
        { value: 'auto', label: 'Automatic' },
        { value: 'manual', label: 'Manual' },
    ];

    const brandOptions = [
        { value: 'ferrari', label: 'Ferrari' },
        { value: 'toyota', label: 'Toyota' },
        { value: 'bmw', label: 'BMW' },
        { value: 'audi', label: 'Audi' },
        { value: 'mercedes', label: 'Mercedes' },
        { value: 'volkswagen', label: 'Volkswagen' },
        { value: 'nissan', label: 'Nissan' },
        { value: 'chevrolet', label: 'Chevrolet' },
    ];

    return (
        <div className="center-form">
            <h1>Edit Car</h1>
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
                <Form.Group controlId="formBasicName">
                    <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                {/* Brand Name Selection */}
                <Form.Group controlId="formBasicBrandName" className="select-container">
                    <Select
                        name="brandname"
                        options={brandOptions}
                        placeholder="Select brand name"
                        value={brandOptions.find(option => option.value === formData.brandname)}
                        onChange={handleSelectChange}
                        required
                    />
                </Form.Group>

                {/* Color Selection */}
                <Form.Group controlId="formBasicColor" className="select-container">
                    <Select
                        name="color"
                        options={colorOptions}
                        placeholder="Select color"
                        value={colorOptions.find(option => option.value === formData.color)}
                        onChange={handleSelectChange}
                        required
                    />
                </Form.Group>

                {/* Type Selection */}
                <Form.Group controlId="formBasicType" className="select-container">
                    <Select
                        name="type"
                        options={typeOptions}
                        placeholder="Select type"
                        value={typeOptions.find(option => option.value === formData.type)}
                        onChange={handleSelectChange}
                        required
                    />
                </Form.Group>

                {/* Transmission Selection */}
                <Form.Group controlId="formBasicTransmission" className="select-container">
                    <Select
                        name="transmission"
                        options={transmissionOptions}
                        placeholder="Select transmission type"
                        value={transmissionOptions.find(option => option.value === formData.transmission)}
                        onChange={handleSelectChange}
                        required
                    />
                </Form.Group>

                {/* Model Year Input */}
                <Form.Group controlId="formBasicModelYear">
                    <Form.Control
                        type="number"
                        name="modelyear"
                        placeholder="Enter the Model Year"
                        value={formData.modelyear}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                {/* Price Input */}
                <Form.Group controlId="formBasicPrice">
                    <Form.Control
                        type="text"
                        name="price"
                        placeholder="Enter price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                {/* Description Input */}
                <Form.Group controlId="formBasicDescription">
                    <Form.Control
                        as="textarea"
                        name="description"
                        placeholder="Enter description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                </Form.Group>

                {/* Image Upload */}
                <Form.Group controlId="formBasicImage">
                    <Form.Label>Upload New Car Image</Form.Label>
                    <Form.Control type="file" name="image" onChange={handleImageChange} accept="image/*" />
                </Form.Group>

                {/* Image Preview */}
                {existingImage && !imagePreview && (
                    <div className="image-preview-container">
                        <img src={existingImage} alt="Existing Car" className="image-preview round-border" />
                    </div>
                )}
                {imagePreview && (
                    <div className="image-preview-container">
                        <img src={imagePreview} alt="New Car Preview" className="image-preview round-border" />
                    </div>
                )}

                {/* Submit Button */}
                <Button variant="primary" type="submit" className="w-100">Update</Button>
            </Form>
        </div>
    );
};

export default UpdateCar;
