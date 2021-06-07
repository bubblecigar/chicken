import React from 'react'
import { v4 as uuidv4 } from 'uuid';

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
  localStorage.setItem(localKey, JSON.stringify(data))
}

const UserPanel = () => {
  const [userName, setUserName] = React.useState(getLocalUserData().userName)

  const onSave = () => {
    setLocalUserData({ userName })
  }
  return (
    <div>
      <input value={userName} onChange={e => setUserName(e.target.value)} />
      <button onClick={onSave}>Save</button>
    </div>
  )
}

export default UserPanel
export { getLocalUserData }