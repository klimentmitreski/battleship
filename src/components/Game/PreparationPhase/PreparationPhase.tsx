import { Button } from '@blueprintjs/core';
import React, { useEffect, useState } from 'react';
import ShipsRadio from '../ShipsRadio/ShipsRadio';
import Board from './PreparationBoard';
import { BoardBlockType, notEmpty, ShipType } from '../../../utils';
import styles1 from "./PreparationBoard.module.css";
import styles2 from "./PreparationPhase.module.css";


const PreparationPhase = (props: {
    gamePhase: "preparationPhasePlayer1" | "preparationPhasePlayer2" | "battlePhasePlayer1" | "battlePhasePlayer2" | undefined;
    setGamePhase: React.Dispatch<React.SetStateAction<"preparationPhasePlayer1" | "preparationPhasePlayer2" | "battlePhasePlayer1" | "battlePhasePlayer2" | undefined>>
    fullBoardSetup: BoardBlockType[]
    setFullBoardSetup: React.Dispatch<React.SetStateAction<BoardBlockType[]>>
}) => {
    const [selectedShip, setSelectedShip] = useState<ShipType | undefined>()
    const [placementDirection, setPlacementDirection] = useState<"horizontal" | "vertical">("horizontal")
    const [mouseOverBlock, setMouseOverBlock] = useState<BoardBlockType | undefined>()
    const [highlightedBlocks, setHighlightedBlocks] = useState<BoardBlockType[]>([])

    const [resetBoard, setResetBoard] = useState<boolean>(false)

    useEffect(() => {
        window.addEventListener('keypress', e => {
            if (e.code === "Space") {
                setPlacementDirection(prevDir => prevDir === "horizontal" ? "vertical" : "horizontal")
            }
        });
        return () => {
            window.removeEventListener('keydown', e => {
                console.log(e.code)
            });
        }
    }, [])

    const placedShips = Array.from(new Set(props.fullBoardSetup.filter(item => item.shipType !== undefined).map(item => item.shipType).filter(notEmpty)))

    useEffect(() => {
        const highlightAccordingToShipType = (block: BoardBlockType | undefined) => {
            let shipBlockSize: number = 0;
            if (block && selectedShip) {
                if (selectedShip === "Carrier") {
                    shipBlockSize = 4
                }
                else if (selectedShip === "Battleship") {
                    shipBlockSize = 3
                }
                else if (selectedShip === "Destroyer") {
                    shipBlockSize = 2
                }
                else if (selectedShip === "Submarine") {
                    shipBlockSize = 2
                }
                else if (selectedShip === "Patrol Boat") {
                    shipBlockSize = 1
                }
                if (placementDirection === "horizontal") {
                    let tempBlocks: BoardBlockType[] = [block];
                    let i = shipBlockSize + block.column;
                    while (i !== block.column) {
                        tempBlocks.push({ row: block.row, column: i })
                        i--;
                    }
                    setHighlightedBlocks(tempBlocks)
                }
                else if (placementDirection === "vertical") {
                    let tempBlocks: BoardBlockType[] = [block];
                    let i = shipBlockSize + block.row;
                    while (i !== block.row) {
                        tempBlocks.push({ row: i, column: block.column })
                        i--;
                    }
                    setHighlightedBlocks(tempBlocks)
                }
            }
        }

        highlightAccordingToShipType(mouseOverBlock)

    }, [mouseOverBlock, placementDirection, selectedShip])

    const { fullBoardSetup, setFullBoardSetup } = props;

    useEffect(() => {
        if (resetBoard || fullBoardSetup.length === 0) {
            let blocks: BoardBlockType[] = [];
            let i: number = 1;
            let j: number;
            while (i <= 10) {
                j = 1;
                while (j <= 10) {
                    blocks.push({ row: i, column: j })
                    j++;
                }
                i++;
            }
            setFullBoardSetup(blocks)
            if (resetBoard) {
                setResetBoard(false)
            }

        }

    }, [resetBoard, fullBoardSetup, setFullBoardSetup])

    const handleBlockClicked = () => {
        if (areBlocksAllowedToBeSelected()) {

            const tempBoard = [...fullBoardSetup]
            setFullBoardSetup(tempBoard.map(item => {
                let blockSelected: boolean = false;
                highlightedBlocks.forEach(block => {
                    if (!blockSelected) {
                        if (block.row === item.row && block.column === item.column) {
                            blockSelected = true
                        }
                    }
                })
                if (blockSelected) {
                    return {
                        ...item,
                        populated: true,
                        shipType: selectedShip
                    }
                }
                else return item;
            }))
            setSelectedShip(undefined)
            handleMouseLeaveBoard()
        }
    }

    const handleMouseLeaveBoard = () => {
        setMouseOverBlock(undefined)
        setHighlightedBlocks([])
    }

    const handleMouseOverBlock = (item: BoardBlockType) => {
        setMouseOverBlock(item)
    }

    const areBlocksAllowedToBeSelected = () => {
        if (selectedShip) {
            let check: boolean = true
            highlightedBlocks.forEach(block => {
                if (fullBoardSetup.find(item =>
                    (item.column === block.column && item.row === block.row && item.populated === true)
                ) || block.column > 10 || block.row > 10) {
                    check = false
                }
            })
            return check
        }
        else return undefined;
    }

    const getBlockBackgroundColor = (item: BoardBlockType) => {
        if (item.populated) {
            if (highlightedBlocks.find(block => block.row === item.row && block.column === item.column)) {
                return styles1.errorBlock
            }
            else return styles1.placedBlock
        }
        else if (highlightedBlocks.find(block => block.row === item.row && block.column === item.column)) {
            return styles1.hoverBlock
        }
        else return styles1.block
    }

    const UnderBoardComponent =
        <div className={styles2.underBoardContainer}>
            {placedShips.length < 5 ?
                <>
                    <ShipsRadio
                        selectedShip={selectedShip}
                        setSelectedShip={setSelectedShip}
                        placedShips={placedShips} />
                    <div className={styles2.underBoardContainerRight}>
                        <div>If you want to rotate the ship press SPACE or</div>
                        <Button
                            style={{ marginLeft: 5 }}
                            disabled={!selectedShip}
                            onClick={() => setPlacementDirection(prevDir => prevDir === "horizontal" ? "vertical" : "horizontal")}>
                            Click here
                    </Button>
                    </div>
                </>
                : <>
                    <Button onClick={() => setResetBoard(true)}>
                        Reset Board
                    </Button>
                    <Button onClick={() => {
                        if (props.gamePhase === "preparationPhasePlayer1") {
                            props.setGamePhase("preparationPhasePlayer2")
                        }
                        else props.setGamePhase("battlePhasePlayer1")
                    }}>
                        Confirm Board
                     </Button>
                </>
            }
        </div>

    return <div className={styles2.container}>
        <Board
            handleMouseLeaveBoard={handleMouseLeaveBoard}
            handleBlockClicked={handleBlockClicked}
            areBlocksAllowedToBeSelected={areBlocksAllowedToBeSelected}
            fullBoardSetup={fullBoardSetup}
            handleMouseOverBlock={handleMouseOverBlock}
            getBlockBackgroundColor={getBlockBackgroundColor}
        />
        {UnderBoardComponent}
    </div>
}

export default PreparationPhase;