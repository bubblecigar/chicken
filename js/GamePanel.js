import React from 'react'
import styled from 'styled-components'
import { GlobalContext, socket } from './app'
import UserPanel, { getLocalUserData } from './UserPanel'
import getMethods from '../gameMethods.js'
import _ from 'lodash'

const Player = ({ player, color, onSubscribe }) => {
  const { gameObject } = React.useContext(GlobalContext)
  const isReady = color === 'red' ? gameObject.redPlayerReady : gameObject.bluePlayerReady
  const btnClass = isReady ? 'is-disabled' : (
    color === 'red' ? 'is-error' : 'is-primary'
  )
  return player ? (
    <button type="button" className={`nes-btn ${btnClass}`} >
      {player.userName || '?'}
    </button >
  ) : (
      <button type="button" className="nes-btn" onClick={onSubscribe}>empty +</button>
    )
}

const GamePanelStyle = styled.div`
  margin: 20px;
`
const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    margin: 10px;
  }
`
const GamePanel = () => {
  const { gameObject, setGameObject } = React.useContext(GlobalContext)

  const takeColor = color => () => {
    socket.emit('take-color', color)
    const gameMethods = getMethods(gameObject)
    gameMethods.takeColor(getLocalUserData(), color)
    setGameObject(_.cloneDeep(gameObject))
  }
  const leaveGame = () => {
    socket.emit('leave-game')
    const gameMethods = getMethods(gameObject)
    gameMethods.leaveGame(getLocalUserData())
    setGameObject(_.cloneDeep(gameObject))
  }
  const onReady = () => {
    socket.emit('player-ready')
    const gameMethods = getMethods(gameObject)
    gameMethods.togglePlayerReady(getLocalUserData())
    setGameObject(_.cloneDeep(gameObject))
  }

  const isInGame = () => {
    const user = getLocalUserData()
    if (gameObject) {
      const { redPlayer, bluePlayer } = gameObject
      if (redPlayer && redPlayer.userId === user.userId) {
        return true
      }
      if (bluePlayer && bluePlayer.userId === user.userId) {
        return true
      }
      return false
    }
  }
  const isReady = () => {
    const user = getLocalUserData()
    if (gameObject) {
      const { redPlayer, bluePlayer } = gameObject
      if (redPlayer && redPlayer.userId === user.userId) {
        return gameObject.redPlayerReady
      }
      if (bluePlayer && bluePlayer.userId === user.userId) {
        return gameObject.bluePlayerReady
      }
      return null
    }
  }
  const enoughPlayer = () => {
    if (gameObject) {
      const { redPlayer, bluePlayer } = gameObject
      return redPlayer && bluePlayer
    }
  }
  return gameObject ? (
    <GamePanelStyle className="nes-container with-title is-centered">
      <p className="title">game status - {gameObject.status}</p>
      <ButtonGroup>
        <div>
          <Player player={gameObject.redPlayer} color={'red'} onSubscribe={takeColor('red')} />
          <span style={{ margin: '0 15px' }} className="nes-text is-disabled">vs</span>
          <Player player={gameObject.bluePlayer} color={'blue'} onSubscribe={takeColor('blue')} />
        </div>
        <div>
          {
            isInGame() && enoughPlayer() && (gameObject.status === 'blue-win' || gameObject.status === 'red-win')
              ? <button onClick={onReady} type="button" className="nes-btn is-success">{isReady() ? 'X' : 'Ready'}</button>
              : null
          }
          {
            isInGame() && gameObject.status !== 'countDown'
              ? <button onClick={leaveGame} type="button" className="nes-btn">leave</button>
              : null
          }
          {
            isInGame() && enoughPlayer() && gameObject.status === 'waiting'
              ? <button onClick={onReady} type="button" className="nes-btn is-success">{isReady() ? 'X' : 'Ready'}</button>
              : null
          }
          {
            !isInGame() && !enoughPlayer() && <UserPanel />
          }
        </div>
      </ButtonGroup>
    </GamePanelStyle>
  ) : null
}

export default GamePanel