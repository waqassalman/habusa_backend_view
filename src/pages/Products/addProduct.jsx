import React, { useState, useEffect, useRef } from 'react';
import PageWrapper from '../../layouts/PageWrapper';
import TagsInput from './tagsInput';
import { useDispatch } from "react-redux";
import { showToast } from "../../components/toastSlice";
import { useNavigate } from 'react-router-dom';
import { API } from "../../config/api";

const AddProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [images, setImages] = useState([]);
    const [is_featured, setFeatured] = useState(false);
    const [previews, setPreviews] = useState([]);
    const [ShortDescription, setShortDesc] = useState("");
    const [selectedCategory, setCategory] = useState("");
    const [newcategory, setNewCategory] = useState("");
    const [categories, setCategories] = useState([]);
    // 🎨 Colors
    const [colors, setColors] = useState([]);
    const [colorInput, setColorInput] = useState("#000000");
    const [colorName, setColorName] = useState("");
    const fileInputRef = useRef(null);
    const [tags, setTags] = useState([]);
    const attributes = { colors, sizes: [] }; // if you don’t have sizes yet

    const handleFiles = (files) => {
        const newFiles = Array.from(files); // Coverting FileList into an Array form
        //Append new files instead of replacing the array
        setImages((prevImages) => [...prevImages, ...newFiles]);


        // ✅ Generate new previews and append them too
        const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
        setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);

    };
    // ✅ Triggered when clicking the custom button
    const handleClickUpload = () => {
        fileInputRef.current.click();
    };

    // ✅ Handle drop event
    const handleDrop = (e) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };

    const handleDragOver = (e) => e.preventDefault();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", parseFloat(price));
        formData.append("quantity", parseInt(quantity));
        formData.append("category_id", selectedCategory);
        formData.append("short_description", ShortDescription);
        formData.append("is_featured", is_featured);
        formData.append("attributes", JSON.stringify({ colors, sizes: [] }));

        tags.forEach(tag => formData.append("tags[]", tag));

        images.forEach(file => formData.append("product_images", file));

        try {
            const res = await fetch(`${API}/api/products`, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (res.ok) {
                dispatch(showToast({ message: "✅ Product uploaded successfully!", type: "success" }));
                navigate("/products");
            } else {
                dispatch(showToast({ message: "❌ Upload failed: " + data.message, type: "error" }));
            }
        } catch (err) {
            dispatch(showToast({ message: "Something went wrong", type: "error" }));
        }
    };

    // ✅ Clean up previews to avoid memory leaks
    useEffect(() => {
        return () => previews.forEach((url) => URL.revokeObjectURL(url));
    }, [previews]);

    const addCategories = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API}/api/categories`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", // ✅ specify JSON
                },
                body: JSON.stringify({ name: newcategory }), // ✅ send JSON object
            });

            const data = await res.json();

            if (res.ok) {
                dispatch(showToast({ message: "✅ Category added successfully!", type: "success" }));
                fetchCategories(); // refresh category list
            } else {
                dispatch(showToast({ message: "❌ Category addition failed: " + data.message, type: "error" }));
            }
        } catch (err) {
            console.error("Error adding category:", err);
            dispatch(showToast({ message: "❌ Something went wrong", type: "error" }));
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await fetch(`${API}/api/categories`, {
                method: "GET",
            });
            if (!res.ok) throw new Error("Failed to fetch categories");
            const data = await res.json();
            setCategories(data);
        } catch (err) {
            console.error("Error fetching categories:", err);
        }
    };
    useEffect(() => {


        fetchCategories();
    }, []); // empty dependency array = run once on mount

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">

                        <label for="product-title" className="block text-sm/6 font-medium text-gray-900"><span className="text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*'] ...">Product Title</span></label>
                        <div class="mt-2">
                            <input id="name" type="text" name="name" onChange={(e) => setName(e.target.value)} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <label for="last-name" className="block text-sm/6 font-medium text-gray-900">Short Description</label>
                        <div class="mt-2">
                            <input id="short_desc" type="text" name="short_description" onChange={(e) => setShortDesc(e.target.value)} className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>
                </div>
                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label for="product-title" className="block text-sm/6 font-medium text-gray-900"><span className="text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*'] ...">Price</span></label>
                        <div className="flex items-center rounded-md bg-white mt-2 pl-3 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">
                            <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">$</div>
                            <input
                                id="price"
                                name="price"
                                type="text"
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="0.00"
                                className="block min-w-0 grow px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="last-name" className="block text-sm/6 font-medium text-gray-900"><span className="text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*'] ...">Quantity</span></label>
                        <div class="mt-2">
                            <input id="quantity" onChange={(e) => setQuantity(e.target.value)} type="number" name="quantity" className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
                        </div>
                    </div>
                </div>
                {/* Hidden file input */}
                <input
                    type="file"
                    accept="image/*"
                    name="product_images"
                    multiple={false}
                    ref={fileInputRef}
                    className="hidden"
                    onChange={(e) => handleFiles(e.target.files)}
                />

                {/* Drag & Drop zone */}
                <div className="mt-5">
                    <label for="last-name" className="block text-sm/6 font-medium text-gray-900"><span className="text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*'] ...">Product Images</span></label>

                    <div
                        className="mt-2 mb-5 border-2 border-dashed border-gray-400 p-6 text-center rounded cursor-pointer hover:border-blue-500"
                        onClick={handleClickUpload}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        <p>📂 Drag & Drop images here or click to upload</p>
                        <p className="text-sm text-gray-500 mt-1">You can select images one by one</p>
                    </div>
                </div>

                 {/* Previews */}
                 {previews.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-4 mb-4">
                        {previews.map((src, i) => (
                            <div key={i} className="relative group">
                                <img
                                    src={src.startsWith("blob:") ? src : `http://localhost:3000${src}`}
                                    alt={`preview-${i}`}
                                    className="w-30 h-30 object-contain rounded-xl shadow-sm bg-gray-100 p-2"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        // Remove from previews
                                        setPreviews(previews.filter((_, index) => index !== i));

                                        if (src.startsWith("blob:")) {
                                            // Remove new uploaded file
                                            setImages(images.filter(img => URL.createObjectURL(img) !== src));
                                        } else {
                                            // Remove existing server image
                                            setImages(images.filter(img => img !== src));
                                        }
                                    }}
                                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-1 rounded hidden group-hover:block"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                <div className="grid grid-cols-1">
                    <div className="sm:col-span-3">
                        <label className="text-sm/6 font-medium text-gray-900"> <span className="text-gray-700 after:ml-0.5 after:text-red-500 after:content-['*'] ...">Categories</span></label>
                        <div className="mt-2">
                            <select name="category_id" value={selectedCategory} onChange={(e) => setCategory(e.target.value)} className="rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6">
                                <option value="">-- Select Category --</option>
                                {categories.map((category) =>
                                    <option key={category._id} value={category._id}>{category.name}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="newcategory" className="block text-sm/6 font-medium text-gray-900">
                            Add Category
                        </label>
                        <div className="mt-2">
                            <input
                                id="newcategory"
                                type="text"
                                name="newcategory"
                                value={newcategory} // bind input value
                                onChange={(e) => setNewCategory(e.target.value)}
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                        <button
                            type="button"
                            onClick={(e) => addCategories(e)} // pass event
                            className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 text-sm mt-2"
                            disabled={loading} // optional: disable while loading
                        >
                            {loading ? "Adding..." : "Add Category"}
                        </button>
                    </div>

                </div>
                {/* Colors Field */}
                <div className="mt-5">
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                        Colors
                    </label>

                    {/* Selected Colors */}
                    <div className="flex flex-wrap gap-3 mb-2">
                        {colors.map((color, index) => (
                            <div
                                key={index}
                                className="relative w-10 h-10 rounded-full border-2 border-gray-300 shadow-sm"
                                style={{ backgroundColor: color.hex }}
                                title={color.name}
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        setColors(colors.filter((_, i) => i !== index))
                                    }
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1.5"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Add New Color */}
                    <div className="flex items-center gap-2">
                        <input
                            type="color"
                            value={colorInput}
                            onChange={(e) => setColorInput(e.target.value)}
                            className="w-10 h-10 p-0 border rounded cursor-pointer"
                        />
                        <input
                            type="text"
                            placeholder="Color name (e.g. Navy Blue)"
                            value={colorName}
                            onChange={(e) => setColorName(e.target.value)}
                            className="border border-gray-300 rounded px-2 py-1 text-sm w-44 focus:outline-indigo-500"
                        />
                        <button
                            type="button"
                            onClick={() => {
                                if (colorName.trim() !== "" && !colors.find(c => c.name === colorName)) {
                                    setColors([...colors, { name: colorName, hex: colorInput }]);
                                    setColorName("");
                                }
                            }}
                            className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 text-sm"
                        >
                            Add Color
                        </button>
                    </div>
                </div>



                <div className='mt-5'>
                    <label htmlFor="short_desc" className="block text-sm/6 font-medium text-gray-900">
                        <span class="text-gray-700">Features</span>
                    </label>
                    <div className="mt-2">
                        <div className="flex items-center rounded-md bg-white mb-2 outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600">

                            <textarea
                                id="features"
                                name="features"
                                rows="3"
                                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"></textarea>
                        </div>
                    </div>
                </div>
                <div className="mt-5 mb-5">
                    <label className="block text-sm font-medium text-gray-900">
                        Tags
                    </label>
                    <div className="mt-2">
                        <TagsInput tags={tags} setTags={setTags} />
                    </div>
                </div>
                {/* Featured */}
                <div className="mt-5 mb-5">
                    <label className="block text-sm font-medium text-gray-900">
                        Is Featured
                    </label>
                    <div className="mt-2 flex gap-6">
                        <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input
                                type="radio"
                                name="is_featured"
                                value="false"
                                checked={!is_featured}
                                onChange={() => setFeatured(false)}
                            />
                            No
                        </label>
                        <label className="flex items-center gap-2 text-sm text-gray-700">
                            <input
                                type="radio"
                                name="is_featured"
                                value="true"
                                checked={is_featured}
                                onChange={() => setFeatured(true)}
                            />
                            Yes
                        </label>
                    </div>
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Upload Product</button>

            </form>
        </div>
    )
}

export default PageWrapper(AddProduct);