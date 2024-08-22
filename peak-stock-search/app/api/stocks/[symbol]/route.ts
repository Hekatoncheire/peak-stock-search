import { NextResponse } from "next/server";
import axios from "axios";

const API_KEY = process.env.ALPHAVANTAGE_API_KEY;

export async function GET({ params }: { params: { symbol: string } }) {
  const { symbol } = params;

  try {
    const response = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
    );

    const data = {
      symbol: response.data["Global Quote"]["01. symbol"],
      price: response.data["Global Quote"]["05. price"],
      open: response.data["Global Quote"]["02. open"],
      high: response.data["Global Quote"]["03. high"],
      low: response.data["Global Quote"]["04. low"],
    };

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch stock details" }, { status: 500 });
  }
}
