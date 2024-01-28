import React from 'react'
import { Box, ChakraProvider } from '@chakra-ui/react'
import './app.css'
import MessagesContainer from './MessagesContainer/MessagesContainer'

const App = () => {
  return (
    <Box className='appContainer'>
    <ChakraProvider>
      <MessagesContainer/>
    </ChakraProvider>
    </Box>
  )
}

export default App