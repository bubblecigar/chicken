import React from 'react'

const localKey = 'chicken-chess-user'
const defaultUserData = {
  userName: Math.random()
}

const getLocalUserData = () => {
  const localUserData = localStorage.getItem(localKey)
  if (!localUserData) {
    localStorage.setItem(localKey, JSON.stringify(defaultUserData))
    return defaultUserData
  } else {
    const userData = JSON.parse(localUserData)
    return userData
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