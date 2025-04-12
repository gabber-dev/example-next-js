"use server"

import axios from "axios"

const GABBER_VOICE = "626c3b02-2d2a-4a93-b3e7-be35fd2b95cd"
const GABBER_LLM = "21892bb9-9809-4b6f-8c3e-e40093069f04"

export async function startSession() {
    const contextBody = JSON.stringify({
        "messages": [
            {
                "role": "system",
                "content": "You are a friendly assistant.",
            }
        ]
    })

    const contextRes = await axios.post("https://api.gabber.dev/v1/llm/context", contextBody, { headers: { "x-api-key": process.env.GABBER_API_KEY } });

    const startBody = {
        "config": {
            "general": {
                "save_messages": true
            },
            "input": {
                "interruptable": true,
                "parallel_listening": false
            },
            "generative": {
                "llm": GABBER_LLM,
                "voice_override": GABBER_VOICE,
                "context": contextRes.data.context_id,
            },
            "output": {
                "stream_transcript": true,
                "speech_synthesis_enabled": true,
                "answer_message": "Hello?"
            }
        },
    }
    const startRes = await axios.post("https://api.gabber.dev/v1/realtime/start", startBody, { headers: { "x-api-key": process.env.GABBER_API_KEY } });
    return startRes.data.connection_details
}