import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components'
import { socket } from './app'

const localKey = 'chicken-chess-user'
const defaultUserData = {
  userName: '',
  userId: uuidv4()
}

const getLocalUserData = () => {
  try {
    const localUserData = localStorage.getItem(localKey)
    if (!localUserData) {
      localStorage.setItem(localKey, JSON.stringify(defaultUserData))
      return defaultUserData
    } else {
      const userData = JSON.parse(localUserData)
      return userData
    }
  } catch (err) {
    return defaultUserData
  }
}

const setLocalUserData = data => {
  const oldData = getLocalUserData()
  localStorage.setItem(localKey, JSON.stringify({ ...oldData, ...data }))
}

const UserPanelStyle = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  input {
    width: 15em;
    margin-left: 10px;
  }

  label {
    margin: 0;
    margin-right: 10px;
  }
`
const BufferButton = styled.button`
  opacity: 0;
  pointer-events: none;
`
const UserPanel = () => {
  const [userName, setUserName] = React.useState(getLocalUserData().userName)

  const onSave = () => {
    setLocalUserData({ userName })
    socket.emit('update-user-data', getLocalUserData())
  }
  const onCancel = () => {
    setUserName(getLocalUserData().userName)
  }
  return (
    <UserPanelStyle className="nes-field">
      <BufferButton type="button" className="nes-btn">X</BufferButton>
      {
        userName !== getLocalUserData().userName
          ? <>
            <button type="button" className="nes-btn is-success" onClick={onSave}>Save</button>
            <button type="button" className="nes-btn is-error" onClick={onCancel}>X</button>
          </>
          : null
      }
      <input type="text" id="inline_field" className="nes-input" placeholder="Your Name" value={userName} onChange={e => setUserName(e.target.value)} />
    </UserPanelStyle>
  )
}

export default UserPanel
export { getLocalUserData }