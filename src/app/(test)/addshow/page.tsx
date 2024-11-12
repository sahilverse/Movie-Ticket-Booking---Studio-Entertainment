"use client";

import React, { useState } from 'react';
import { addShow } from '@/actions/addMovie'; // Assuming addShow is imported correctly


const AddShow = () => {


    const [loading, setLoading] = useState(false);

    interface FormData {
        movieId: string;
        screenId: string;
        startTime: string

    }

    const [formData, setFormData] = useState<FormData>({
        movieId: '',
        screenId: '',
        startTime: '',

    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            await addShow(formData);

        } catch (error) {
            alert('An error occurred. Please try again later.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Add a New Movie Show</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="movieId" className="block text-sm font-medium text-gray-700">Movie ID</label>
                    <input
                        type="text"
                        id="movieId"
                        name="movieId"
                        value={formData.movieId}
                        onChange={onChange}
                        required
                        className="w-full px-4 py-2 mt-1 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="screenId" className="block text-sm font-medium text-gray-700">Screen ID</label>
                    <input
                        type="text"
                        id="screenId"
                        name="screenId"
                        value={formData.screenId}
                        onChange={onChange}
                        required
                        className="w-full px-4 py-2 mt-1 border border-gray-300 text-black  rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
                    <input
                        type="datetime-local"
                        id="startTime"
                        name="startTime"
                        value={formData.startTime}
                        onChange={onChange}
                        required
                        className="w-full px-4 py-2 mt-1 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>



                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2 px-4 bg-indigo-600  text-black  font-semibold rounded-md hover:bg-indigo-700 disabled:opacity-50"
                    >
                        {loading ? 'Creating Show...' : 'Add Show'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddShow;
