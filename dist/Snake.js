class Snake {
    constructor(size, canvasWidth, canvasHeight) {
        this.collidesWithSelf = false;
        this.segments = [{ x: 0, y: 0 }];
        this.size = size;
        this.sessionScore = 0;
        this.direction = 'left';
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.update = this.update.bind(this);
    }
    update(event = null) {
        const updateDirection = (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    this.direction = 'up';
                    break;
                case 'ArrowLeft':
                    this.direction = 'left';
                    break;
                case 'ArrowRight':
                    this.direction = 'right';
                    break;
                case 'ArrowDown':
                    this.direction = 'down';
                    break;
            }
        };
        if (event) {
            updateDirection(event);
        }
        const head = this.segments[this.segments.length - 1];
        let x = head.x;
        let y = head.y;
        switch (this.direction) {
            case 'up':
                y -= this.size - 9;
                break;
            case 'down':
                y += this.size - 9;
                break;
            case 'left':
                x -= this.size - 9;
                break;
            case 'right':
                x += this.size - 9;
                break;
        }
        if (x >= this.canvasWidth) {
            x = 0;
        }
        else if (x < -this.size) {
            x = this.canvasWidth - this.size;
        }
        else if (y >= this.canvasHeight) {
            y = 0;
        }
        else if (y < -this.size) {
            y = this.canvasHeight - this.size;
        }
        for (let i = 0; i < this.segments.length - 1; i++) {
            const segment = this.segments[i];
            if (segment.x === x && segment.y === y) {
                this.segments = [{ x, y }];
                this.sessionScore = 0;
                this.collidesWithSelf = true;
            }
        }
        this.segments.push({ x, y });
        this.segments.shift();
    }
    draw(ctx) {
        ctx.fillStyle = 'green';
        this.segments.forEach(segment => {
            ctx.fillRect(segment.x, segment.y, this.size, this.size);
        });
    }
    grow() {
        const tail = this.segments[0];
        const newTail = { x: tail.x, y: tail.y };
        this.segments.unshift(newTail);
        this.sessionScore += 1;
    }
    collidesWith(x, y, size) {
        const head = this.segments[this.segments.length - 1];
        return (head.x < x + size &&
            head.x + this.size > x &&
            head.y < y + size &&
            head.y + this.size > y);
    }
    serialize() {
        return {
            segments: this.segments,
            size: this.size,
            direction: this.direction,
            canvasWidth: this.canvasWidth,
            canvasHeight: this.canvasHeight,
            sessionScore: this.sessionScore,
        };
    }
    deserialize(data) {
        this.segments = data.segments;
        this.size = data.size;
        this.direction = data.direction;
        this.canvasWidth = data.canvasWidth;
        this.canvasHeight = data.canvasHeight;
        this.sessionScore = data.sessionScore;
    }
    reset(size, canvasWidth, canvasHeight) {
        this.segments = [{ x: 0, y: 0 }];
        this.size = size;
        this.sessionScore = 0;
        this.direction = 'left';
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }
}
export { Snake };
