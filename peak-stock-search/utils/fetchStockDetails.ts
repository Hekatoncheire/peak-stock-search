import axios from "axios";

// Fetch stock details server-side
export async function fetchStockDetails(symbol: string) {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/stocks/${symbol}`);

        return response.data;
    } catch (error) {
        console.error("Failed to fetch stock details:", error);
        return null;
    }
}

// Fetch stock chart data server-side
export async function fetchStockChartData(symbol: string) {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/stocks/${symbol}/chart`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch stock chart data:", error);
        return null;
    }
}

export async function fetchStockName(symbol:string) {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/search?query=${symbol}`)
        console.log(response.data[0])
        return response.data[0]
    } catch (error) {
        console.error(error)
        return null
    }
}