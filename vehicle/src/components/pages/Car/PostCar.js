import "./PostCar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PostCar = () => {
    const [formData, setFormData] = useState({
        brandname: "",
        name: "",
        color: "",
        type: "",
        transmission: "",
        modelyear: "",
        price: "",
        description: "",
        image: null, // Image file state
    });

    const [imagePreview, setImagePreview] = useState(null); // To store image preview

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSelectChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle image selection
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setFormData({
            ...formData,
            image: file,
        });
        setImagePreview(URL.createObjectURL(file)); // Set the image preview
    };

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create form data to include the image file
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        try {
            const response = await fetch("http://localhost:8000/api/car", {
                method: 'POST',
                body: formDataToSend, // Send form data including image
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("Success:", data);
            navigate("/dashboard"); // Redirect after success
        } catch (error) {
            console.log("Error creating car:", error.message);
        }
    };

    const colorOptions = [
        'Red', 'Blue', 'Black', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink', 'Brown', 'Gray', 'White', 'Silver', 'Gold'
    ];

    const typeOptions = ['Hybrid', 'Electric', 'Gasoline', 'Diesel'];

    const transmissionOptions = ['Automatic', 'Manual'];

    const brandOptions = ['Ferrari', 'Toyota', 'BMW', 'Audi', 'Mercedes', 'Volkswagen', 'Nissan', 'Chevrolet'];

    return (
        <div className="center-form">
            <h1>New Car</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group">
                    <label htmlFor="name"></label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Enter name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="brandname"></label>
                    <select
                        name="brandname"
                        id="brandname"
                        value={formData.brandname}
                        onChange={handleSelectChange}
                        required
                    >
                        <option value="">Select Brand</option>
                        {brandOptions.map(brand => (
                            <option key={brand} value={brand}>{brand}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="color"></label>
                    <select
                        name="color"
                        id="color"
                        value={formData.color}
                        onChange={handleSelectChange}
                        required
                    >
                        <option value="">Select Color</option>
                        {colorOptions.map(color => (
                            <option key={color} value={color}>{color}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="type"></label>
                    <select
                        name="type"
                        id="type"
                        value={formData.type}
                        onChange={handleSelectChange}
                        required
                    >
                        <option value="">Select Type</option>
                        {typeOptions.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="transmission"></label>
                    <select
                        name="transmission"
                        id="transmission"
                        value={formData.transmission}
                        onChange={handleSelectChange}
                        required
                    >
                        <option value="">Select Transmission</option>
                        {transmissionOptions.map(transmission => (
                            <option key={transmission} value={transmission}>{transmission}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="modelyear"></label>
                    <input
                        type="number"
                        id="modelyear"
                        name="modelyear"
                        placeholder="Enter model year"
                        value={formData.modelyear}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price"></label>
                    <input
                        type="text"
                        id="price"
                        name="price"
                        placeholder="Enter price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description"></label>
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Enter description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image"></label>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        onChange={handleImageChange}
                        accept="image/*"
                        required
                    />
                </div>

                {/* Image preview */}
                {imagePreview && (
                    <div className="image-preview-container">
                        <img src={imagePreview} alt="Car Preview" className="image-preview" />
                    </div>
                )}

                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    );
};

export default PostCar;
