// import { auth0 } from "@/lib/auth0";
// import { NextRequest, NextResponse } from "next/server";
import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";

interface Agent {
    id: number;
    name: string;
    description: string;
    lastModified: string;
    status: 'active' | 'on-hold';
    ragFiles: number;
}
export async function GET() {
  try {
    const { token, expiresAt } = await auth0.getAccessToken({ refresh: true });

    // call external API with token...
    const agentsUrl = `${process.env.POLIGONO_API_URL}/agents`; // Backend server URL
    const agentsResponse = await fetch(agentsUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const response = await agentsResponse.json();
    const agents: Agent[] = response.data || response;
    
    return NextResponse.json(agents);
  } catch (err) {
    return NextResponse.json({ 
      error: 'Internal server error',
      details: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 });
  }

}
