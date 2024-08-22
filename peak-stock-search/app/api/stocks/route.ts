import { NextResponse } from "next/server";
import axios from "axios";

//const API_KEY = process.env.ALPHAVANTAGE_API_KEY;

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
      'x-rapidapi-key': '9f35510a13mshf6e1b047b48a10fp1d3e99jsn881635090403',
      'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
    }
  }

  try {
    const response = await axios.request(options)
    console.log(response.data)
    const data = response.data.bestMatches.map((match: any) => ({
      symbol: match["1. symbol"],
      name: match["2. name"],
    }));
    return NextResponse.json(data);

  } catch (error) {
    console.error(error)
  }
}
