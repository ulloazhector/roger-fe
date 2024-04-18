'use client'
import { io } from 'socket.io-client'

const socket = io("http://localhost:5000")

socket.on("b-test", () => {
    console.log("b-test")
})

export default function Home() {
    const handleEmit = () => {
        socket.emit("e-test")
        console.log("evento test enviado desde FE")
    }

    return (
        <main>
            <h1>B0T web</h1>
            <button onClick={handleEmit}>click</button>
        </main>
    )
}
