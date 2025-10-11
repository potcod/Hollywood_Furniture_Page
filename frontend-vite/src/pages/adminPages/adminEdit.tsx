import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function AdminEdit() {
    
    const { productID } = useParams(); // get product id from URL
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: "",
        photo: "",
        description: "",
        price: "",
        category: "",
    });
    useEffect(() => {
        console.log("Fetching product data for id:", productID);
        async function fetchProduct() {
            try {
                const res = await fetch(`http://localhost:5000/admin/${productID}`)
                if (!res.ok) {
                    throw new Error("Failed to fetch product data");
                }
                const data = await res.json();
                console.log("Fetched product data:", data);
                setFormData(data);

            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        }
        if (productID) {
            console.log("ID is present, fetching product data");
            fetchProduct();
        }
    }, [productID]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/admin/${productID}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error("Failed to submit form");
            }
            console.log("Form submitted:", formData);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/admin/${productID}`, {
                method: "DELETE",
            });
            console.log("Delete response:", response);
            navigate(`/admin/`);

        } catch (error) {
            console.error("Error deleting product:", error);
        }
    }
    return (
        <div className="flex flex-col justify-center mx-[20%]">
            <h1 className="px-3">Edit Furniture</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-4">
                {/* Name */}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                {/* Photo */}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo">
                        Photo URL
                    </label>
                    <input
                        id="photo"
                        name="photo"
                        type="url"
                        value={formData.photo}
                        onChange={handleChange}
                        placeholder="https://example.com/photo.jpg"
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                        Description
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        rows={4}
                        required
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                        Price ($)
                    </label>
                    <input
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                        Category
                    </label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    >
                        <option value="">Select category</option>
                        <option value="bed">Bed</option>
                        <option value="chair">Chair</option>
                        <option value="table">Table</option>
                        <option value="couch">Couch</option>
                        <option value="dresser">Dresser</option>

                    </select>
                </div>

                <div className="flex flex-row">
                    <button type="submit" className="w-full !bg-blue-500 text-white font- py-2 px-4 rounded hover:bg-blue-600">
                        Submit
                    </button>

                    <button className ="mx-1 !bg-red-500 text-white font- py-2 px-4 rounded " onClick={handleDelete} type="button">
                        Delete
                    </button>
                </div>



            </form>
        </div>
    );

}