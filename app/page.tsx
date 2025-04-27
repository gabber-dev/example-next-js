"use client"
import { RealtimeSessionEngineProvider } from "gabber-client-react";
import { startSession } from "./actions";
import { RealtimeSessionConnectionDetails } from "gabber-client-core";
import { useState } from "react";
import { App } from "@/components/App";

export default function Home() {
  const [connectionDetails, setConnectionDetails] = useState<RealtimeSessionConnectionDetails | undefined>(undefined);

  if (!connectionDetails) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-gray-50">
        <button className="p-2 bg-blue-400 rounded font-bold" onClick={async () => {
          const conDetails = await startSession()
          setConnectionDetails(conDetails)
        }}>Start Session</button>
      </div>
    );
  }

  return <RealtimeSessionEngineProvider connectionOpts={{ connection_details: connectionDetails }}>
    <App />
  </RealtimeSessionEngineProvider>
}

