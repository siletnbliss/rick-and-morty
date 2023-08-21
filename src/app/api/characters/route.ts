import { RickAndMortyService } from "@/lib/services/rick-and-morty.service";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "url";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const query = parse(req.url, true).query;

    const result = await RickAndMortyService.getCharacters(query);
    return NextResponse.json(result);
  } catch (error) {
    NextResponse.json({ error: error }, { status: 500 });
  }
}
