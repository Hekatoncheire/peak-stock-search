import { NextResponse } from "next/server";
import axios from "axios";

const API_KEY = process.env.ALPHAVANTAGE_API_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  console.log(query)

  const response = await axios.get(
    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${API_KEY}`
  );

  const data = response.data.bestMatches.map((match: any) => ({
    symbol: match["1. symbol"],
    name: match["2. name"],
  }));

  return NextResponse.json(data);
}
