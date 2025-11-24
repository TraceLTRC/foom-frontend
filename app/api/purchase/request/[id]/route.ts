import { getApiEndpoint } from "@/utils/http";
import { NextRequest } from "next/server";

export async function DELETE(_req: NextRequest, ctx: RouteContext<"/api/purchase/request/[id]">) {
    const { id } = await ctx.params

    const resp = await fetch(getApiEndpoint("/purchase/request/" + id), {
        method: "DELETE",
    });

    if (resp.ok) {
        return Response.json({ success: true, error: null })
    } else {
        return Response.json({ success: false, error: (await resp.json()).error }, { status: resp.status })
    }
}

export async function PUT(req: NextRequest, ctx: RouteContext<"/api/purchase/request/[id]">) {
    const { id } = await ctx.params
    const body = await req.json();

    const resp = await fetch(getApiEndpoint("/purchase/request/" + id), {
        method: "PUT",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
    });

    if (resp.ok) {
        return Response.json({ success: true, error: null })
    } else {
        return Response.json({ success: false, error: (await resp.json()).error }, { status: resp.status })
    }
}
