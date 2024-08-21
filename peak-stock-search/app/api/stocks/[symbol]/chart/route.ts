import { NextResponse } from "next/server";
import axios from "axios";

const API_KEY = process.env.ALPHAVANTAGE_API_KEY;

export async function GET(request: Request, { params }: { params: { symbol: string } }) {
  const response = await axios.get(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${params.symbol}&apikey=${API_KEY}`
  );

  const data = Object.entries(response.data["Time Series (Daily)"]).map(([date, values]: any) => ({
    date,
    price: parseFloat(values["4. close"]),
  }));

  return NextResponse.json(data);
}
