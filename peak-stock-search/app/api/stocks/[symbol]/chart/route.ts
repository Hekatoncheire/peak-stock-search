import { NextResponse } from "next/server";
import axios from "axios";

const API_KEY = process.env.RAPIDAPI_KEY;

export async function GET(request: Request, { params }: { params: { symbol: string } }) {
  const options = {
    method: 'GET',
    url: 'https://alpha-vantage.p.rapidapi.com/query',
    params: {
      function: 'TIME_SERIES_DAILY',
      symbol: params.symbol,
      outputsize: 'compact',
      datatype: 'json'
    },
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
    }
  };
  try {
    const response = await axios.request(options)
    const data = Object.entries(response.data["Time Series (Daily)"]).map(([date, values]: any) => ({
      date,
      price: parseFloat(values["4. close"]),
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch stock details" }, { status: 500 });
  }


}
