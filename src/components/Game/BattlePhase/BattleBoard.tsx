import React from 'react';
import styles from './BattleBoard.module.css';
import { BoardBlockType, ShipType } from '../../../utils';

const BattleBoard = (props: {
    boardForPlayer: "Player1" | "Player2";
    gamePhase: "preparationPhasePlayer1" | "preparationPhasePlayer2" | "battlePhasePlayer1" | "battlePhasePlayer2" | undefined;
    battleBoard: (BoardBlockType & { revealed: boolean })[] | undefined;
    revealBlock: (block: BoardBlockType & {
        revealed: boolean;
    }) => void
    gameWinner: "Player1" | "Player2" | undefined;
    destroyedShips: ShipType[]
}) => {
    const getBoardStyleClassName = () => {
        if (props.gameWinner) {
            return styles.board
        }
        else if (props.gamePhase?.includes(props.boardForPlayer)) {
            return styles.smallBoard
        }
        else return styles.bigBoard
    }

    const getBackgroundColorForBlock = (item: BoardBlockType & {
        revealed: boolean;
    }) => {
        if (item.revealed && item.populated) {
            if (props.destroyedShips.find(ship => item.shipType === ship)) {
                return 'black'
            }
            else return 'red'
        }
        else if (item.revealed) {
            return "#AFEEEE"
        }
        else return undefined
    }


    return (<div className={getBoardStyleClassName()}>
        {props.battleBoard?.map(item =>
            <div className={styles.block}
                onClick={() => {
                    props.revealBlock(item)
                }}
                key={`${item.row}, ${item.column}`}
                style={{
                    backgroundColor: getBackgroundColorForBlock(item),
                    pointerEvents: item.revealed ? "none" : undefined,
                    cursor: item.revealed ? undefined : "pointer"
                }}
            >
            </div>)}
    </div>)
}

export default BattleBoard;