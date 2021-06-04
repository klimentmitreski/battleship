import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BoardBlockType } from '../../utils';
import BattlePhase from './BattlePhase/BattlePhase';
import Header from './Header/Header';
import PreparationPhase from './PreparationPhase/PreparationPhase';
import WinnerDialog from './WinnerDialog/WinnerDialog';

const Game = () => {
  const history = useHistory<{ player1Name: string, player2Name: string }>()
  const player1Name: string = history.location.state.player1Name
  const player2Name: string = history.location.state.player2Name

  const [gamePhase, setGamePhase] = useState<"preparationPhasePlayer1" | "preparationPhasePlayer2" | "battlePhasePlayer1" | "battlePhasePlayer2" | undefined>(undefined)

  const [player1BoardSetup, setPlayer1BoardSetup] = useState<BoardBlockType[]>([])
  const [player2BoardSetup, setPlayer2BoardSetup] = useState<BoardBlockType[]>([])

  const [gameWinner, setGameWinner] = useState<"Player1" | "Player2" | undefined>();

  useEffect(() => {
    if (gamePhase === undefined) {
      setPlayer1BoardSetup([])
      setPlayer2BoardSetup([])
      setGamePhase('preparationPhasePlayer1')
    }
  }, [gamePhase])

  const resetGame = () => {
    setGamePhase('preparationPhasePlayer1')
    setGameWinner(undefined)
    setPlayer1BoardSetup([])
    setPlayer2BoardSetup([])
  }

  const renderCorrectPhase = () => {
    if (gamePhase === "preparationPhasePlayer1") {
      return (<PreparationPhase
        gamePhase={gamePhase}
        setGamePhase={setGamePhase}
        fullBoardSetup={player1BoardSetup}
        setFullBoardSetup={setPlayer1BoardSetup} />)
    }
    else if (gamePhase === "preparationPhasePlayer2") {
      return (<PreparationPhase
        gamePhase={gamePhase}
        setGamePhase={setGamePhase}
        fullBoardSetup={player2BoardSetup}
        setFullBoardSetup={setPlayer2BoardSetup} />)
    }
    else if (gamePhase === "battlePhasePlayer1" || gamePhase === "battlePhasePlayer2") {
      return (<BattlePhase
        player1BoardSetup={player1BoardSetup}
        player2BoardSetup={player2BoardSetup}
        gameWinner={gameWinner}
        setGameWinner={setGameWinner}
        gamePhase={gamePhase}
        setGamePhase={setGamePhase} />)
    }
  }
  return (
    <div style={{ height: '100%', padding: 10 }}>
      <Header gamePhase={gamePhase} player1Name={player1Name} player2Name={player2Name} gameWinner={gameWinner} />
      {renderCorrectPhase()}
      <WinnerDialog gameWinner={gameWinner} player1Name={player1Name} player2Name={player2Name} resetGame={resetGame} />
    </div>
  );
}

export default Game;
