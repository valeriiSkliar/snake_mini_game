export class Food {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.x = Math.floor(Math.random() * (canvasWidth - 20)) + 10;
        this.y = Math.floor(Math.random() * (canvasHeight - 20)) + 10;
        this.size = 10;
    }
    update() {
        this.x = Math.floor(Math.random() * (this.canvasWidth - 20)) + 10;
        this.y = Math.floor(Math.random() * (this.canvasHeight - 20)) + 10;
    }
    render(context) {
        context.fillStyle = "#FF0000";
        context.fillRect(this.x, this.y, 10, 10);
        context.strokeStyle = "#000";
        context.strokeRect(this.x, this.y, 10, 10);
    }
    getPosition() {
        return { x: this.x, y: this.y };
    }
    serialize() {
        return {
            x: this.x,
            y: this.y,
            size: this.size
        };
    }
    deserialize(data) {
        this.x = data.x;
        this.y = data.y;
        this.size = data.size;
    }
}
