import React, { useState } from 'react';
import axios from 'axios';

export default function EnterData() {
    const [formData, setFormData] = useState({
        name: '',
        field: '',
        gender: '',
        phone: '',
        email: '',
        status: ''

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/saveData', formData);
            console.log('Form submitted successfully:', response.data);
            window.location.reload();
            // Optionally, you can update the UI here (e.g., show a success message)
        } catch (error) {
            console.error('There was a problem with the submission:', error);
            // Optionally, you can update the UI here (e.g., show an error message)
        }
        console.log('Form submitted:', formData);
    };

    return (
        <div className="m-12 p-4 border border-gray-400 rounded">
            <h2 className="text-lg font-bold mb-4">Enter data</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2 font-medium">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-400 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-medium">
                        Field
                    </label>
                    <input
                        type="text"
                        id="field"
                        name="field"
                        value={formData.field}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-400 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-medium">Gender</label>
                    <div className="flex items-center">
                        <input
                            type="radio"
                            id="male"
                            name="gender"
                            value="male"
                            onChange={handleChange}
                            checked={formData.gender === 'male'}
                            className="mr-2"
                        />
                        <label htmlFor="male" className="mr-4">Male</label>
                        <input
                            type="radio"
                            id="female"
                            name="gender"
                            value="female"
                            onChange={handleChange}
                            checked={formData.gender === 'female'}
                            className="mr-2"
                        />
                        <label htmlFor="female" className="mr-4">Female</label>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-medium">
                        Phone Number
                    </label>
                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-400 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-medium">
                        Email
                    </label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-400 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 font-medium">
                        Current status
                    </label>
                    <input
                        type="text"
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-400 rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
