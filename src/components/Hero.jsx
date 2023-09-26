"use client"
import React from 'react';
import Weather from "./Weather";


const handleWeatherUpdate = (weatherData) => {
    // Handle the updated weather data here as needed
    console.log('Weather data updated:', weatherData);
};

export default function Hero() {
    return (
        <div className="h-screen" style={{ maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}>
            {/* Banner Section */}
            <div className="py-16 text-white bg-gray-800 m">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl font-bold">Welcome to Our Site</h1>
                    <p className="mt-4 text-gray-300">Some description goes here...</p>
                </div>
            </div>
            
            <Weather onWeatherUpdate={handleWeatherUpdate} />
        </div>
    )
}
