export function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
    return value !== null && value !== undefined;
}

export function getOccurrence<TValue>(array:TValue[], value:TValue) {
    return array.filter((v) => (v === value)).length;
}

export type ShipType = "Carrier" | "Battleship" | "Destroyer" | "Submarine" | "Patrol Boat";

export type BoardBlockType = {
    row: number;
    column: number;
    populated?: boolean;
    shipType?: ShipType;
}