import Vector3 = BABYLON.Vector3;
export class Grid {
    private _tiles: Array<GridTile>;

    /**
     * Creates a new Grid
     * @param x The number of tiles on the x axis
     * @param y The number of tiles on the y axis
     */
    constructor(x:number, y:number){

    }
}

export class GridTile {
    position:Vector3;
}