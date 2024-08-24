import { NextResponse } from "next/server";

const API_KEY = process.env.RAPIDAPI_KEY;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  console.log(query)

  const url = `https://alpha-vantage.p.rapidapi.com/query?datatype=json&keywords=${query}&function=SYMBOL_SEARCH`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': API_KEY as string,
        'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
      },
    });
    const result = await response.json();
    const data = result.bestMatches.map((match: any) => ({
      symbol: match["1. symbol"],
      name: match["2. name"],
    }));
    console.log(NextResponse.json(data))
    return NextResponse.json(data);

  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Failed to fetch stock details" }, { status: 500 });
  }
}
