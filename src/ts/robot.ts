import { Vector } from "./vector"
import { px, py, PI, SCREEN_WIDTH, SCREEN_HEIGHT } from "./conversions"
import * as p5 from 'p5';

export class Robot {
    pos: Vector = new Vector(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
    velocity: number = 0.0;
    angle: number = PI / 2;
    angularVelocity: number = 0.0;

    leftSpeed: number = 0.0;
    rightSpeed: number = 0.0;

    constructor() {
        
    }

    update(frameRate: number, driveWidth: number) {
        this.velocity = (this.leftSpeed + this.rightSpeed) / 2;
        this.angularVelocity = -(this.leftSpeed - this.rightSpeed) / driveWidth;

        if(isNaN(frameRate) || frameRate == 0) frameRate = 60;
        this.angle += this.angularVelocity / frameRate;

        if(this.angle < 0) this.angle += 2 * PI;
        if(this.angle >= 2 * PI) this.angle -= 2 * PI;

        this.pos = this.pos.add(new Vector(this.velocity * Math.cos(this.angle), 
            this.velocity * Math.sin(this.angle)).mult(1 / frameRate));

        this.leftSpeed = 0;
        this.rightSpeed = 0;
    }

    draw(sketch: p5, driveWidth: number) {
        sketch.rectMode(sketch.CENTER);
        sketch.fill(120);
        sketch.stroke(0);
        sketch.push();
            sketch.translate(px(this.pos.x, sketch.width), py(this.pos.y, sketch.height));
            sketch.rotate(-this.angle + PI / 2);
            sketch.rect(0, 0, px(driveWidth, sketch.width), px(driveWidth * 1.5, sketch.width));
        sketch.pop();
    }
}
