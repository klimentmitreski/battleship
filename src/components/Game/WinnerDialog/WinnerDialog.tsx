import React from 'react'
import { Button, Dialog } from '@blueprintjs/core';
import { useHistory } from 'react-router';

const WinnerDialog = (props: {
    gameWinner: "Player1" | "Player2" | undefined;
    player1Name: string;
    player2Name: string;
    resetGame: () => void;
}) => {
    const history = useHistory()
    let winner: string = ""
    let loser: string = ""
    if (props.gameWinner === "Player1") {
        winner = props.player1Name;
        loser = props.player2Name;
    }
    else if (props.gameWinner === "Player2") {
        winner = props.player2Name;
        loser = props.player1Name;
    }
    return (
        <Dialog
            isCloseButtonShown={false}
            isOpen={props.gameWinner !== undefined}
            title={"Congratulations " + winner}
            style={{ backgroundColor: "#fff", padding: 10 }}
        >
            <div style={{ padding: 10 }}>
                You have managed to defeat {loser} in a game of Battleship. Time to rub it in their face.
            </div>
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end"
                }}
            >
                <Button
                    onClick={() => { history.replace("/") }}
                >
                    Go Home
                </Button>
                <Button
                    onClick={props.resetGame}
                >
                    Rematch
                </Button>
            </div>
        </Dialog>
    )
}

export default WinnerDialog;