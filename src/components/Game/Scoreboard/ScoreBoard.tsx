import React, { useEffect, useState } from 'react'
import { ShipType } from '../../../utils';

const Scoreboard = (props: {
    hitsNumber: number;
    destroyedShips: ShipType[];
}) => {
    const [score, setScore] = useState<number>(0)
    const { destroyedShips, hitsNumber } = props;
    useEffect(() => {
        let destructionScore: number = 0;
        destroyedShips.forEach(ship => {
            if (ship === "Carrier")
                destructionScore = destructionScore + 420
            if (ship === "Battleship")
                destructionScore = destructionScore + 320
            if (ship === "Destroyer")
                destructionScore = destructionScore + 220
            if (ship === "Submarine")
                destructionScore = destructionScore + 220
            if (ship === "Patrol Boat")
                destructionScore = destructionScore + 120
        })
        setScore((hitsNumber * 100) + destructionScore)
    }, [hitsNumber, destroyedShips])

    return <div style={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'fantasy' }} >Score: {score}</div>
}

export default Scoreboard;