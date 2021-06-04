import React from 'react';
import { Radio, RadioGroup } from "@blueprintjs/core";
import { notEmpty } from '../../../utils';
import { ShipType } from '../../../utils';

const ShipsRadio = (props: {
    selectedShip: ShipType | undefined;
    setSelectedShip: React.Dispatch<React.SetStateAction<ShipType | undefined>>;
    placedShips: ShipType[];
}) => {

    const allShipsArray: ShipType[] = ["Carrier", "Battleship", "Destroyer", "Submarine", "Patrol Boat"]
    const handleRadioChange = (data: string) => {
        switch (data) {
            case "Carrier":
                props.setSelectedShip("Carrier")
                break;
            case "Battleship":
                props.setSelectedShip("Battleship")
                break;
            case "Destroyer":
                props.setSelectedShip("Destroyer")
                break;
            case "Submarine":
                props.setSelectedShip("Submarine")
                break;
            case "Patrol Boat":
                props.setSelectedShip("Patrol Boat")
                break;
            default:
                props.setSelectedShip(undefined)
        }
    }

    let shipsToDisplay: ShipType[] = allShipsArray.map(item => {
        if (!props.placedShips.find(ship => ship === item))
            return item;
        else return null;
    }).filter(notEmpty)

    return (
        <>
            <RadioGroup
                inline={false}
                label="Pick your ship"
                name="shipType"
                onChange={(event) => handleRadioChange(event.currentTarget.value)}
                selectedValue={props.selectedShip}
            >
                {shipsToDisplay.map(ship => (
                    <Radio label={ship} value={ship} key={ship} />
                ))}
            </RadioGroup></>
    )
}

export default ShipsRadio;