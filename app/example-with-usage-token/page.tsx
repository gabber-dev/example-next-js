"use client"
import { RealtimeSessionEngineProvider } from "gabber-client-react"
import { useCallback, useState } from "react";
import { App } from "@/components/App";
import { createTokenAndContext } from "./actions";

const GABBER_VOICE = "626c3b02-2d2a-4a93-b3e7-be35fd2b95cd"
const GABBER_LLM = "21892bb9-9809-4b6f-8c3e-e40093069f04"

export default function Home() {
    const [details, setDetails] = useState<{ token: string, context: string } | undefined>(undefined);

    const generateConnectionDetails = useCallback(async () => {
        const { token, context: contextId } = await createTokenAndContext()
        console.log("Token: ", token, "Context: ", contextId)
        setDetails({ token, context: contextId })
    }, [])

    if (!details) {
        return (
            <div className="w-screen h-screen flex items-center justify-center bg-gray-50">
                <button className="p-2 bg-blue-400 rounded font-bold" onClick={async () => {
                    await generateConnectionDetails()
                }}>Start Session</button>
            </div>
        );
    }

    console.log("Details: ", details)

    return <RealtimeSessionEngineProvider connectionOpts={{
        token: details.token, config:
        {
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
                "context": details.context,
            },
            "output": {
                "stream_transcript": true,
                "speech_synthesis_enabled": true,
                "answer_message": "Hello?"
            }
        }
    }}>
        <App />
    </RealtimeSessionEngineProvider>
}
