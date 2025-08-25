import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";

export async function POST(request: Request) {
    try {
        console.log('🚀 API Route Started');
        
        const { token, expiresAt } = await auth0.getAccessToken({ refresh: true });
        console.log('🔑 Auth token obtained:', token ? 'Present' : 'Missing');
        
        const data = await request.json();
        console.log('📥 Received Data:', data);
        
        const agentName = data.agentName;
        const systemPrompt = data.systemPrompt;
        const description = data.description;
        
        console.log('🔍 Extracted Fields:');
        console.log('  - Agent Name:', agentName);
        console.log('  - System Prompt:', systemPrompt);
        console.log('  - Description:', description);
        
        const agentData = {
            name: agentName,
            system_prompt: systemPrompt,
            description: description
        };

        const url = 'https://api.poligono.ai/v1/agents';
        console.log('🌐 Calling External API URL:', url);
        console.log('📤 Sending data to external API:', JSON.stringify(agentData, null, 2));
        
        const agentsResponse = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(agentData)
        });

        console.log('📡 External API Response Status:', agentsResponse.status);
        console.log('📡 External API Response OK:', agentsResponse.ok);
        
        const responseData = await agentsResponse.json();
        console.log('📡 External API Response Data:', responseData);

        if (agentsResponse.ok) {
            console.log('✅ External API call successful');
            return NextResponse.json({
                message: 'Agent created successfully',
                data: responseData,
                status: 200
            });
        } else {
            console.log('❌ External API call failed');
            return NextResponse.json({
                error: 'Failed to create agent in external API',
                details: responseData,
                status: agentsResponse.status
            }, { status: agentsResponse.status });
        }

    } catch (error) {
        console.error('❌ Error in agent creation API:', error);
        console.error('❌ Error stack:', error instanceof Error ? error.stack : 'No stack trace');
        return NextResponse.json({ 
            error: 'Internal server error',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}