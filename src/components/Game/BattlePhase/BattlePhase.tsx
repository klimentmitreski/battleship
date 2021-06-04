import { Button, Intent, ProgressBar } from '@blueprintjs/core';
import React, { useEffect, useState } from 'react'
import BattleBoard from './BattleBoard';
import { BoardBlockType, ShipType } from '../../../utils';
import Scoreboard from '../Scoreboard/ScoreBoard';
import { getOccurrence, notEmpty } from '../../../utils';
import styles from './BattlePhase.module.css';

const BattlePhase = (props: {
    player1BoardSetup: BoardBlockType[];
    player2BoardSetup: BoardBlockType[];
    gameWinner: "Player1" | "Player2" | undefined;
    setGameWinner: React.Dispatch<React.SetStateAction<"Player1" | "Player2" | undefined>>;
    gamePhase: "preparationPhasePlayer1" | "preparationPhasePlayer2" | "battlePhasePlayer1" | "battlePhasePlayer2" | undefined;
    setGamePhase: React.Dispatch<React.SetStateAction<"preparationPhasePlayer1" | "preparationPhasePlayer2" | "battlePhasePlayer1" | "battlePhasePlayer2" | undefined>>
}) => {
    const [player1BattleBoard, setPlayer1BattleBoard] = useState<(BoardBlockType & { revealed: boolean })[]>()
    const [player2BattleBoard, setPlayer2BattleBoard] = useState<(BoardBlockType & { revealed: boolean })[]>()
    const [player1DestroyedShips, setPlayer1DestroyedShips] = useState<ShipType[]>([])
    const [player2DestroyedShips, setPlayer2DestroyedShips] = useState<ShipType[]>([])
    const [player1Hits, setPlayer1Hits] = useState<number>(0)
    const [player2Hits, setPlayer2Hits] = useState<number>(0)
    const [timerDuration, setTimerDuration] = useState<number>(30)

    const { player1BoardSetup, player2BoardSetup } = props;

    useEffect(() => {
        if (player1BoardSetup?.length > 0) {
            setPlayer1BattleBoard(player1BoardSetup?.map(item => {
                return {
                    ...item,
                    revealed: false
                }
            }))
        }
        if (player2BoardSetup?.length > 0) {
            setPlayer2BattleBoard(player2BoardSetup?.map(item => {
                return {
                    ...item,
                    revealed: false
                }
            }))
        }
    }, [player1BoardSetup, player2BoardSetup])

    const revealBlock = (block: BoardBlockType & { revealed: boolean }) => {
        if (props.gamePhase === "battlePhasePlayer1") {
            setPlayer2BattleBoard(player2BattleBoard?.map(item => {
                if (item.row === block.row && item.column === block.column) {
                    return {
                        ...item,
                        revealed: true
                    }
                }
                else return item
            }))
            props.setGamePhase("battlePhasePlayer2")
        }
        else if (props.gamePhase === "battlePhasePlayer2") {
            setPlayer1BattleBoard(player1BattleBoard?.map(item => {
                if (item.row === block.row && item.column === block.column) {
                    return {
                        ...item,
                        revealed: true
                    }
                }
                else return item
            }))
            props.setGamePhase("battlePhasePlayer1")
        }
    }

    const { setGameWinner, gamePhase, setGamePhase } = props;

    useEffect(() => {
        setTimerDuration(30)
    }, [gamePhase, setTimerDuration])

    useEffect(() => {
        const timer = setTimeout(() => { setTimerDuration(timerDuration - 1) }, 1000);;
        if (timerDuration === 0) {
            if (gamePhase === 'battlePhasePlayer1')
                setGamePhase("battlePhasePlayer2")
            else if (gamePhase === "battlePhasePlayer2")
                setGamePhase("battlePhasePlayer1")
        }
        return () => clearTimeout(timer)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timerDuration]);

    const chechWhichShipTypesAreDestroyed = (shipHits: ShipType[]) => {
        const carrierHits = getOccurrence(shipHits, "Carrier")
        const battleshipHits = getOccurrence(shipHits, "Battleship")
        const destroyerHits = getOccurrence(shipHits, "Destroyer")
        const submarineHits = getOccurrence(shipHits, "Submarine")
        const patrolBoatHits = getOccurrence(shipHits, "Patrol Boat")
        let destroyedShips: ShipType[] = []
        if (carrierHits === 5) {
            destroyedShips.push("Carrier")
        }
        if (battleshipHits === 4) {
            destroyedShips.push("Battleship")
        }
        if (destroyerHits === 3) {
            destroyedShips.push("Destroyer")
        }
        if (submarineHits === 3) {
            destroyedShips.push("Submarine")
        }
        if (patrolBoatHits === 2) {
            destroyedShips.push("Patrol Boat")
        }
        return destroyedShips;
    }

    useEffect(() => {
        const player1HitShips = player1BattleBoard?.filter(item => item.revealed === true && item.populated === true)
        const player2HitShips = player2BattleBoard?.filter(item => item.revealed === true && item.populated === true)
        if (player1HitShips) {
            setPlayer1Hits(player1HitShips.length)
            setPlayer1DestroyedShips(chechWhichShipTypesAreDestroyed(player1HitShips?.map(item => item.shipType).filter(notEmpty)))
        }
        if (player2HitShips) {
            setPlayer2Hits(player2HitShips.length)
            setPlayer2DestroyedShips(chechWhichShipTypesAreDestroyed(player2HitShips?.map(item => item.shipType).filter(notEmpty)))
        }
        if (player1HitShips?.length === 17) {
            setGameWinner("Player2")
        }
        else if (player2HitShips?.length === 17) {
            setGameWinner("Player1")
        }
    }, [player1BattleBoard, player2BattleBoard, setGameWinner])

    let progressBarColor: Intent = 'success'
    if (timerDuration < 10)
        progressBarColor = "danger"
    else if (timerDuration < 20)
        progressBarColor = "primary"

    return (
        <div className={styles.container}>
            <div className={styles.progressBar}>
                {!props.gameWinner && <ProgressBar stripes={false} intent={progressBarColor} value={timerDuration * 3.3 / 100} />}
            </div>
            <div className={styles.alternateContainer}>
                <div className={styles.container}>
                    <div style={{ paddingBottom: 10 }}>
                        <Scoreboard hitsNumber={player2Hits} destroyedShips={player2DestroyedShips} />
                        <Button onClick={() => setGameWinner("Player2")}
                            disabled={props.gamePhase === "battlePhasePlayer2"}
                        >
                            Forfeit
                    </Button></div>
                    <BattleBoard
                        gameWinner={props.gameWinner}
                        boardForPlayer={"Player1"}
                        battleBoard={player1BattleBoard}
                        gamePhase={props.gamePhase}
                        revealBlock={revealBlock}
                        destroyedShips={player1DestroyedShips} />
                </div>
                <div className={styles.container}>
                    <div style={{ paddingBottom: 10 }}>
                        <Scoreboard hitsNumber={player1Hits} destroyedShips={player1DestroyedShips} />
                        <Button onClick={() => setGameWinner("Player1")}
                            disabled={props.gamePhase === "battlePhasePlayer1"}
                        >
                            Forfeit
                    </Button>
                    </div>
                    <BattleBoard
                        gameWinner={props.gameWinner}
                        boardForPlayer={"Player2"}
                        battleBoard={player2BattleBoard}
                        gamePhase={props.gamePhase}
                        revealBlock={revealBlock}
                        destroyedShips={player2DestroyedShips} />
                </div>
            </div>
        </div>
    )
}

export default BattlePhase;