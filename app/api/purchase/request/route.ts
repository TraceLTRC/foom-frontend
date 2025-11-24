import { getApiEndpoint } from "@/utils/http";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const body = await req.json();

    const resp = await fetch(getApiEndpoint("/purchase/request"), {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    });

    if (resp.ok) {
        return Response.json({ success: true, error: null })
    } else {
        return Response.json({ success: false, error: (await resp.json()) }, { status: resp.status })
    }
}
