import { NextResponse } from "next/server";
import axios from "axios";

const API_KEY = process.env.RAPIDAPI_KEY;

export async function GET(request: Request, { params }: { params: { symbol: string } }) {
  const options = {
    method: 'GET',
    url: 'https://alpha-vantage.p.rapidapi.com/query',
    params: {
      function: 'GLOBAL_QUOTE',
      symbol: params.symbol,
      datatype: 'json'
    },
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
    }
  };
  try {
    const response = await axios.request(options)

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
