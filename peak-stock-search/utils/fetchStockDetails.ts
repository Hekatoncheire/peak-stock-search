import axios from "axios";

// Fetch stock chart data server-side
export async function fetchStockData(symbol: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stocks/${encodeURIComponent(symbol)}`, {
            cache: 'force-cache'
        });
        return response.json();
    } catch (error) {
        console.error("Failed to fetch stock chart data:", error);
        return null;
    }
}

export async function fetchStockName(symbol: string) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/search?query=${encodeURIComponent(symbol)}`, {
            cache: 'force-cache'
        });
        const data = await response.json();
        return data[0]
    } catch (error) {
        console.error(error)
        return null
    }
}