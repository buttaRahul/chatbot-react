import React from 'react'
import './messagebox.css'
import { Box, Fade, Text, useDisclosure } from '@chakra-ui/react'

const MessageBox = ({ messages, toWait }) => {

  return (
    <Box className='messageContainer'>
      {

        messages.map((item, i) => (
          <Box key={i} className={(item['sender'] == 'user') ? 'rightBox' : 'leftBox'}>

            {
              <Text> {item['message']} </Text>
            }
          </Box>

        ))


      }
      {toWait && <Box className='leftBox' ><Text> ChatBot is Typing ...</Text></Box>}

    </Box>
  )
}

export default MessageBox