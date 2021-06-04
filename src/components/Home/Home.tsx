import React, { useState } from 'react'
import { Button, Classes, FormGroup } from '@blueprintjs/core';
import { useHistory } from 'react-router-dom';
import ships from '../../assets/ships.png'
import styles from './Home.module.css';

const Home = () => {
    const history = useHistory()
    const [player1Name, setPlayer1Name] = useState<string>("Player1")
    const [player2Name, setPlayer2Name] = useState<string>("Player2")

    return (
        <div className={styles.container}>
            <img src={ships} alt="battleships" />
            <div className={styles.playerInfoBlock}>
                <div className={styles.headline}>BATTLESHIP</div>
                <FormGroup label="Player 1 Name" style={{ flex: 1 }}>
                    <input
                        className={Classes.INPUT}
                        style={{ width: "100%" }}
                        placeholder="Insert Player 1 name"
                        defaultValue={
                            "Player1"
                        }
                        onChange={(data) => setPlayer1Name(data.currentTarget.value)}
                    />
                </FormGroup>
                <FormGroup label="Player 2 Name" style={{ flex: 1 }}>
                    <input
                        className={Classes.INPUT}
                        style={{ width: "100%" }}
                        placeholder="Insert Player 2 name"
                        defaultValue={
                            "Player2"
                        }
                        onChange={(data) => setPlayer2Name(data.currentTarget.value)}
                    />
                </FormGroup>
                <Button
                    large
                    onClick={() => {
                        history.push('/play', {
                            player1Name: player1Name,
                            player2Name: player2Name
                        })
                    }}>
                    Play
                </Button>
            </div>
        </div>)
}

export default Home;