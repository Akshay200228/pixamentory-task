"use client"
import React, { useState, useEffect } from 'react';

const WeatherIcons = {
    Clear: '☀️',
    PartlyCloudy: '⛅',
    Cloudy: '☁️',
    Rainy: '🌧️',
    Snowy: '❄️',
    Thunderstorm: '⛈️',
};

export default function Weather({ onWeatherUpdate }) {
    const [locationName, setLocationName] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLocationChange = (e) => {
        setLocationName(e.target.value);
    };

    const handleLatitudeChange = (e) => {
        setLatitude(e.target.value);
    };

    const handleLongitudeChange = (e) => {
        setLongitude(e.target.value);
    };

    const fetchLocationData = async () => {
        try {
            // Use the Nominatim API to get location data based on the entered city name
            const locationQuery = encodeURIComponent(locationName);
            const nominatimUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${locationQuery}`;
            const locationResponse = await fetch(nominatimUrl);

            if (locationResponse.ok) {
                const locationData = await locationResponse.json();

                // Extract latitude and longitude from the first result
                if (locationData.length > 0) {
                    setLatitude(locationData[0].lat);
                    setLongitude(locationData[0].lon);
                } else {
                    console.error('Location not found.');
                }
            } else {
                console.error('Failed to fetch location data.');
            }
        } catch (error) {
            console.error('Error fetching location data:', error);
        }
    };

    const fetchWeatherData = async () => {
        setIsLoading(true);

        try {
            if (latitude && longitude) {
                // Fetch weather data using latitude and longitude
                const weatherResponse = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
                );

                if (weatherResponse.ok) {
                    const weatherData = await weatherResponse.json();
                    setWeatherData(weatherData);
                    onWeatherUpdate(weatherData);
                } else {
                    console.error('Failed to fetch weather data.');
                }
            } else {
                console.error('Latitude and longitude are required.');
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (latitude && longitude) {
            fetchWeatherData();
        }
    }, [latitude, longitude]);

    return (
        <div className="my-8 flex justify-center items-center h-auto">
            <div className="w-full max-w-md p-6 rounded-lg shadow-xl text-white bg-gradient-to-b from-gray-400 to-lightblue-400">
                <h2 className="text-2xl text-black font-semibold mb-4">Weather Data</h2>
                <form className="mb-4">
                    <div className="mb-4">
                        <label htmlFor="locationName" className="block text-neutral-800 mb-1">
                            City Name:
                        </label>
                        <input
                            type="text"
                            id="locationName"
                            name="locationName"
                            value={locationName}
                            onChange={handleLocationChange}
                            className="w-full px-3 py-2 bg-gray-200 text-gray-800 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter city name"
                        />
                        <p className="text-red-700 text-sm font-bold mt-2">
                            If you enter a city name, latitude & longitude will be automatically added.
                        </p>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="latitude" className="block text-neutral-800 mb-1">
                            Latitude:
                        </label>
                        <input
                            type="text"
                            id="latitude"
                            name="latitude"
                            value={latitude}
                            onChange={handleLatitudeChange}
                            className="w-full px-3 py-2 bg-gray-200 text-gray-800 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter latitude"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="longitude" className="block text-neutral-800 mb-1">
                            Longitude:
                        </label>
                        <input
                            type="text"
                            id="longitude"
                            name="longitude"
                            value={longitude}
                            onChange={handleLongitudeChange}
                            className="w-full px-3 py-2 bg-gray-200 text-gray-800 placeholder-gray-400 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter longitude"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={fetchLocationData}
                        className="bg-gradient-to-r from-teal-400 to-teal-600 text-white py-2 px-4 rounded-md"
                    >
                        Get Weather Data
                    </button>
                </form>
                {isLoading && (
                    <div className="w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin mt-4 mx-auto" />
                )}
                {weatherData && (
                    <div className="mt-4">
                        <div className="bg-lightblue-200 rounded-lg p-6 shadow-lg">
                            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                                Current Weather
                            </h3>
                            <div className="space-y-2 text-gray-800">
                                <p className="text-xl">
                                    Temperature: {weatherData.current_weather.temperature}°C
                                </p>
                                <p className="text-xl">
                                    Time: {weatherData.current_weather.time}
                                </p>
                                <p className="text-xl">
                                    Wind Direction: {weatherData.current_weather.winddirection}
                                </p>
                                <p className="text-xl">
                                    Wind Speed: {weatherData.current_weather.windspeed} km/h
                                </p>
                            </div>
                        </div>
                    </div>

                )}
            </div>
        </div>
    );
}
