"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Cloud, Sun, CloudRain, CloudSnow, MapPin, Wind, Droplets } from "lucide-react";

interface WeatherData {
    temp: number;
    condition: string;
    high: number;
    low: number;
    wind: number;
    humidity: number;
    city: string;
}

export function WeatherWidget() {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const { latitude, longitude } = position.coords;

                        // Reverse geocoding for city name using a free open API
                        const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                        const geoData = await geoRes.json();
                        const city = geoData.address.city || geoData.address.town || geoData.address.state || "Unknown Location";

                        // Fetch weather using Open-Meteo (No API key required)
                        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`);
                        const data = await weatherRes.json();

                        // Map WMO Weather codes to simple strings
                        const code = data.current.weather_code;
                        let condition = "Clear";
                        if (code >= 1 && code <= 3) condition = "Overcast";
                        if (code >= 51 && code <= 67) condition = "Rain";
                        if (code >= 71 && code <= 82) condition = "Snow";

                        setWeather({
                            temp: Math.round(data.current.temperature_2m),
                            condition,
                            high: Math.round(data.daily.temperature_2m_max[0]),
                            low: Math.round(data.daily.temperature_2m_min[0]),
                            wind: data.current.wind_speed_10m,
                            humidity: data.current.relative_humidity_2m,
                            city,
                        });
                        setLoading(false);
                    } catch (err) {
                        setError(true);
                        setLoading(false);
                    }
                },
                () => {
                    setError(true);
                    setLoading(false);
                }
            );
        } else {
            setError(true);
            setLoading(false);
        }
    }, []);

    const getWeatherIcon = (condition: string) => {
        switch (condition) {
            case "Clear": return <Sun className="w-8 h-8" />;
            case "Rain": return <CloudRain className="w-8 h-8" />;
            case "Snow": return <CloudSnow className="w-8 h-8" />;
            default: return <Cloud className="w-8 h-8" />;
        }
    };

    return (
        <motion.div
            className="glass-panel rounded-3xl p-5 flex flex-col justify-between h-full w-full clickable"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            {loading ? (
                <div className="animate-pulse flex flex-col gap-4 h-full justify-center">
                    <div className="h-8 w-16 bg-foreground/10 rounded-md" />
                    <div className="h-4 w-24 bg-foreground/10 rounded-md" />
                </div>
            ) : error || !weather ? (
                <div className="flex flex-col items-center justify-center h-full text-foreground/50 text-sm text-center">
                    <MapPin className="w-6 h-6 mb-2 opacity-50" />
                    <p>Location access required for weather forecast.</p>
                </div>
            ) : (
                <>
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                            <span className="text-4xl font-light tracking-tighter">{weather.temp}°</span>
                            <div className="flex items-center gap-2 mt-2 text-foreground/80">
                                {getWeatherIcon(weather.condition)}
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium">{weather.condition}</span>
                                    <span className="text-xs text-foreground/50">Feels like {weather.temp - 2}°</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-end text-xs text-foreground/60 gap-1">
                            <div className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> {weather.city}
                            </div>
                            <div className="mt-4">
                                H:{weather.high}° L:{weather.low}°
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-6 text-xs text-foreground/50 pt-4 border-t border-white/5">
                        <div className="flex items-center gap-1">
                            <Droplets className="w-3 h-3" /> {weather.humidity}%
                        </div>
                        <div className="flex items-center gap-1">
                            <Wind className="w-3 h-3" /> {weather.wind} km/h
                        </div>
                    </div>
                </>
            )}
        </motion.div>
    );
}