import React from 'react'
import { BoardBlockType } from '../../../utils';
import styles from "./PreparationBoard.module.css";

const Board = (props: {
    handleMouseLeaveBoard: () => void;
    handleBlockClicked: () => void;
    fullBoardSetup: BoardBlockType[];
    handleMouseOverBlock: (item: BoardBlockType) => void;
    areBlocksAllowedToBeSelected: () => boolean | undefined;
    getBlockBackgroundColor: (item: BoardBlockType) => string | undefined
}) => {

    const getCursorStyle = () => {
        if (props.areBlocksAllowedToBeSelected() === undefined) {
            return undefined
        }
        else if (props.areBlocksAllowedToBeSelected()) {
            return "pointer"
        }
        else return "not-allowed"
    }

    return (
        <div className={styles.board} onMouseLeave={props.handleMouseLeaveBoard}>
            {props.fullBoardSetup.map(item =>
                <div className={props.getBlockBackgroundColor(item)}
                    onClick={props.handleBlockClicked}
                    key={`${item.row}, ${item.column}`}
                    onMouseOver={() => props.handleMouseOverBlock(item)}
                    style={{
                        cursor: getCursorStyle()
                    }}
                >
                </div>
            )}
        </div>
    )
}

export default Board;