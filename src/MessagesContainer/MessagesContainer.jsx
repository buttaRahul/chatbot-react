import React, { useRef, useState } from 'react'
import { Box, Heading,InputGroup, InputRightElement,Textarea, Tooltip } from '@chakra-ui/react'
import { BsRobot } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import './messagescontainer.css'
import MessageBox from '../messagebox/MessageBox';
const MessagesContainer = () => {

  const API_KEY = import.meta.env.VITE_API_KEY
  const [toActivateSend, toggleActivate] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [toWait, setToWait] = useState(false)
  const [messages, setMessages] = useState([
    {
      message: "Hello, I am ChatBot! How can I help you today ?",
      sennder: "ChatGpt"
    },
  ])








  const handleInputChange = ({ target: { value } }) => {
    setInputValue(value)
    if (value != '') toggleActivate(true)
    else {
      toggleActivate(false)
    }
  }


  const handleSubmit = (message) => {

    const newMessage = {
      message: inputValue,
      sender: "user",
    }
    const newMessages = [...messages, newMessage]
    setMessages(newMessages)
    let apiMessages = newMessages.map((item) => {
      let role = ""
      if (item.sender == "ChatGPT") {
        role = "assistant"
      }
      else {
        role = "user"
      }

      return {
        role: role, content: item.message
      }
    })

    const systemMessage = {
      role: "system",
      content: "Explain everything in detail"
    }
    const options = {
      "method": "POST",
      "headers": {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": 'application/json'
      },
      "body": JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [
          systemMessage,
          ...apiMessages
        ]
      })
    }
    setToWait(true)
    fetch("https://api.openai.com/v1/chat/completions", options).then((resp) => {
      return resp.json()
    }).then((jsonData) => {

      setMessages(
        [...newMessages, {
          message: jsonData.choices[0].message.content,
          sender: "ChatGPT"
        }]
      )

      setToWait(false)
    })

    setInputValue('')
    toggleActivate(false)

  }
  return (
    <Box>
      <Box className='mainCard'>
        <Box className='viewBox' >
          <Box className='cardHeader'>
            <BsRobot className='headerLogo' size={25} />
            <Heading size='md'>ChatBot</Heading>
          </Box>

          <Box className='listContainer'>
            <MessageBox messages={messages} toWait={toWait} />
          </Box>
        </Box>

        <Box className='sendBox'>
          <InputGroup>
            <Textarea placeholder='Enter your message' value={inputValue} onChange={handleInputChange} />
            <InputRightElement>
            <Tooltip hasArrow label='Send message' bg='black' color='white' placement='top' className='tooltip'>
              <span>
                {toActivateSend ? (
                  <IoSend size={25} onClick={handleSubmit} className="iconBlack" />
                ) : (
                  <IoSend size={25} className="iconGray" style={{ pointerEvents: 'none' }} />
                )}
              </span>
            </Tooltip>
            </InputRightElement>
          </InputGroup>

        </Box>

      </Box>
    </Box>
  )
}

export default MessagesContainer