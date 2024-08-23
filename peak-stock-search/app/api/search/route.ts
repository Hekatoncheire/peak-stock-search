import { NextResponse } from "next/server";
import axios from "axios";

const API_KEY = process.env.RAPIDAPI_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  console.log(query)

  const options = {
    method: 'GET',
    url: 'https://alpha-vantage.p.rapidapi.com/query',
    params: {
      datatype: 'json',
      keywords: query,
      function: 'SYMBOL_SEARCH'
    },
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
    }
  }

  try {
    const response = await axios.request(options)
    const data = response.data.bestMatches.map((match: any) => ({
      symbol: match["1. symbol"],
      name: match["2. name"],
    }));
    return NextResponse.json(data);

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch stock details" }, { status: 500 });
  }
}
