import { NextResponse } from "next/server";

// Fetch top-performing stocks
export async function GET() {
    const API_KEY = process.env.RAPIDAPI_KEY;
    const url = 'https://alpha-vantage.p.rapidapi.com/query?function=TOP_GAINERS_LOSERS';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': API_KEY as string,
            'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        return NextResponse.json(result)
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch top-performing stocks!" }, { status: 500 });
    }
}
