export class Food {
    public x: number;
    public y: number;
    public size: number;

    constructor(private canvasWidth: number, private canvasHeight: number) {
        this.x = Math.floor(Math.random() * (canvasWidth - 20)) + 10;
        this.y = Math.floor(Math.random() * (canvasHeight - 20)) + 10;
        this.size = 10;
    }

    public update() {
        // Update the position of the food
        this.x = Math.floor(Math.random() * (this.canvasWidth - 20)) + 10;
        this.y = Math.floor(Math.random() * (this.canvasHeight - 20)) + 10;
    }

    public render(context: CanvasRenderingContext2D) {
        // Render the food as a red square
        context.fillStyle = "#FF0000";
        context.fillRect(this.x, this.y, 10, 10);
        context.strokeStyle = "#000";
        context.strokeRect(this.x, this.y, 10, 10);
    }

    public getPosition(): { x: number; y: number } {
        // Return the position of the food
        return {x: this.x, y: this.y};
    }

    serialize() {
        return {
            x: this.x,
            y: this.y,
            size: this.size
        };
    }

    deserialize(data: any): void {
        this.x = data.x;
        this.y = data.y;
        this.size = data.size;
    }


}
