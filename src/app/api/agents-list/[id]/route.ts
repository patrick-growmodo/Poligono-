import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { token, expiresAt } = await auth0.getAccessToken({ refresh: true });
    const agentId = params.id;

    console.log('🗑️ Deleting agent with ID:', agentId);

    const url = `${process.env.POLIGONO_API_URL}/agents/${agentId}`;
    const deleteResponse = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('📡 External API Delete Response Status:', deleteResponse.status);

    if (deleteResponse.ok) {
      console.log('✅ Agent deleted successfully from external API');
      return NextResponse.json({ 
        message: 'Agent deleted successfully',
        agentId: agentId
      });
    } else {
      const errorData = await deleteResponse.json();
      console.error('❌ External API Delete Error:', errorData);
      return NextResponse.json({ 
        error: 'Failed to delete agent',
        details: errorData 
      }, { status: deleteResponse.status });
    }

  } catch (error) {
    console.error('❌ Error in agent deletion API:', error);
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}


export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { token, expiresAt } = await auth0.getAccessToken({ refresh: true });
  const agentId = params.id;

  const url = `${process.env.POLIGONO_API_URL}/agents/${agentId}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ External API Get Error:', errorData);
      return NextResponse.json({ error: 'Failed to get agent' }, { status: response.status });
    }
    
    const data = await response.json();
    console.log('🎯 Agents data:', data);

    return NextResponse.json(data);
  } catch (error) {
    console.error('❌ Error in agent get API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}