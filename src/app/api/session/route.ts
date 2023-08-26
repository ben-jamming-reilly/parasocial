import { getServerAuthSession } from "~/server/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const session = await getServerAuthSession();

    if (!session) {
        return new NextResponse(
            JSON.stringify({ status: "fail", message: "You are not logged in" }),
            { status: 401 }
        );
    }

    return NextResponse.json({
        authenticated: !!session,
        session,
    });
}