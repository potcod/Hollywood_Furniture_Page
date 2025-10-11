import { useState } from "react";
import type { Product } from "../models/Product.js";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    photoURL: "",
    description: "",
    price: "",
    category: "",
  });

  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    console.log("Admin fetching products");
    fetch("http://localhost:5000/admin")
      .then((res) => res.json())
      .then((data) => {
        // data is an array of objects from your backend
        setProducts(data.products);
        console.log("Shop has fetched products:", data.products);
      })
      .catch((err) => {
        console.error("Failed to fetch products", err);
      });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/admin/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      setFormData({
        name: "",
        photoURL: "",
        description: "",
        price: "",
        category: "",
      });

      console.log("Form submitted:", formData);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleProductClick = (product: Product) => {
    navigate(`/admin/${product.id}`);
  }
  return (
    <div className="mx-[10%] my-8 flex flex-row gap-8">

      <div className="w-1/3 bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-bold mb-4">Product List</h2>
        <ul className="space-y-4 max-h-[600px] overflow-y-auto">
          {products.map((product) => (
            <li key={product.name} className="bg-white px-2 py-0.5 rounded shadow flex flex-col" onClick={() => handleProductClick(product)}>
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600">${product.price}</p>
              <p className="text-sm text-gray-600">Category: {product.category}</p>

            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col justify-start w-2/3">
        <h1 className="px-3">Add Furniture</h1>
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
              name="photoURL"
              type="url"
              value={formData.photoURL}
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

          {/* Submit */}
          <button
            type="submit"
            className="w-full !bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"

          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
