export const getDistance = (x: number, y: number, encampment: { x: number, y: number }) => {
    return Math.abs(x - encampment.x) + Math.abs(y - encampment.y);
}
