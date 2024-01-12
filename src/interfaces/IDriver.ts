export interface IDriver {
    id: string,
    name: string,
    email: string,
    showPosition: boolean,
    currentPosLatitude: number,
    currentPosLongitude: number,
}

export interface IDriverPosition {
    id: string,
    currentPosLatitude: number,
    currentPosLongitude: number,
}