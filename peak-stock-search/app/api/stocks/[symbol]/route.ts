import { NextResponse } from "next/server";
import axios from "axios";

const API_KEY = process.env.RAPIDAPI_KEY;

export async function GET(request: Request, { params }: { params: { symbol: string } }) {
  /* const options = {
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
  }; */

  const url = `https://alpha-vantage.p.rapidapi.com/query?function=TIME_SERIES_DAILY&symbol=${params.symbol}&outputsize=compact&datatype=json`;
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
    const data = Object.entries(result["Time Series (Daily)"]).map(([date, values]: any) => ({
      date,
      open: parseFloat(values["1. open"]),
      high: parseFloat(values["2. high"]),
      low: parseFloat(values["3. low"]),
      close: parseFloat(values["4. close"]),
    }));

    return NextResponse.json(data);
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch stock details" }, { status: 500 });
  }


}
