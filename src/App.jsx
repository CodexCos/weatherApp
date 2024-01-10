import React from "react"
import Home from "./components/Home"
import { ChakraProvider } from "@chakra-ui/react"

export default function App() {
  return (
    <ChakraProvider>
      <Home />
    </ChakraProvider>
  )
}



