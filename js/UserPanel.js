import React from 'react'
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components'

const localKey = 'chicken-chess-user'
const defaultUserData = {
  userName: 'unknown user',
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
    max-width: 35%;
  }

  label {
    margin: 0;
    margin-right: 10px;
  }
`
const UserPanel = () => {
  const [userName, setUserName] = React.useState(getLocalUserData().userName)

  const onSave = () => {
    setLocalUserData({ userName })
  }
  return (
    <UserPanelStyle className="nes-field">
      <label htmlFor="inline_field">Name</label>
      <input type="text" id="inline_field" className="nes-input" placeholder="Your Name" value={userName} onChange={e => setUserName(e.target.value)} />
      <button type="button" className="nes-btn is-primary" onClick={onSave}>Save</button>
    </UserPanelStyle>
  )
}

export default UserPanel
export { getLocalUserData }