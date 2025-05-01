"use server"

import axios from "axios"

export async function createTokenAndContext() {
    const contextBody = JSON.stringify({
        "messages": [
            {
                "role": "system",
                "content": "You are a friendly assistant.",
            }
        ]
    })

<<<<<<< HEAD
    const contextRes = await axios.post("https://api.gabber.dev/v1/llm/context", contextBody, { headers: { "x-api-key": process.env.GABBER_API_KEY } });
    const usageTokenRes = await axios.post("https://api.gabber.dev/v1/usage/token", { human: "some-user-id", ttl_seconds: 3600 * 24 }, { headers: { "x-api-key": process.env.GABBER_API_KEY } });
    return { token: usageTokenRes.data.token, context: contextRes.data.id }
}
=======
    const human = "some-user-id"
    const contextRes = await axios.post("https://api.gabber.dev/v1/llm/context", contextBody, { headers: { "x-api-key": process.env.GABBER_API_KEY, "x-human-id": human } });
    const usageTokenRes = await axios.post("https://api.gabber.dev/v1/usage/token", { human, ttl_seconds: 3600 * 24 }, { headers: { "x-api-key": process.env.GABBER_API_KEY } });
    return { token: usageTokenRes.data.token, context: contextRes.data.id }
}
>>>>>>> a123166 (misc fixes)
