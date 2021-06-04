import React from 'react'
import styles from "./Header.module.css";

const Header = (props: {
    gameWinner: "Player1" | "Player2" | undefined;
    gamePhase: "preparationPhasePlayer1" | "preparationPhasePlayer2" | "battlePhasePlayer1" | "battlePhasePlayer2" | undefined
    player1Name: string;
    player2Name: string;
}) => {
    let subHeader: string = "";
    if (props.gameWinner) {
        if (props.gameWinner === "Player1")
            subHeader = `${props.player1Name} won`
        else if (props.gameWinner === "Player2")
            subHeader = `${props.player2Name} won`
    }
    else if (props.gamePhase === "preparationPhasePlayer1")
        subHeader = `${props.player1Name} select your board`
    else if (props.gamePhase === "preparationPhasePlayer2")
        subHeader = `${props.player2Name} select your board`
    else if (props.gamePhase === "battlePhasePlayer1")
        subHeader = `${props.player1Name}'s turn`
    else if (props.gamePhase === "battlePhasePlayer2")
        subHeader = `${props.player2Name}'s turn`

    return (<div className={styles.header}>
        <h1>Battleship</h1>
        <h3>{subHeader}</h3>
    </div>)
}

export default Header;