// Created by Rohit Kumar Chaurasiya

//Column is the class
class Column {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.queue = [];
        this.color = {  //To give color to our cylinder
            r: 150,
            g: 150,
            b: 150
        }
    }


    //The yOffset parameter serves as a multiplier that controls the amplitude of the vertical oscillation effect during the object's movement towards a target location


    moveTo(loc, frameCount = 15, yOffset = 1) {
        for (let i = 1; i <= frameCount; i++) {
            const t = i / frameCount;

            const u = Math.sin(t * Math.PI);
            // u is used to create a vertical oscillation effect during the movement toward the target location

            this.queue.push({
                //Here, loc.x comes from loc argument
                x: lerp(this.x, loc.x, t),
                y: lerp(this.y, loc.y, t) + u * this.width / 2 * yOffset,

                //u adds a vertical offset that creates a smooth oscillating motion.

                // The y value is influenced by both the sine function and the yOffset. This creates a bouncy effect as the object moves toward the target location, making the movement appear more dynamic and fluid.


                //These has been given for color
                r: lerp(150, 255, u),
                g: lerp(150, 0, u),
                b: lerp(150, 0, u)

            });
            //The use of u in the code introduces a smooth oscillation in the y direction as the object moves to the target location. This enhances the visual appeal of the movement by adding a natural and dynamic feel to it, making it appear as if the object is gently bouncing or swaying as it travels.

        }
    }
    //This move function is to give animation type effect to our cylinders when they move from one location to another
    //lerp function is implemented in file Math.js


    jump(frameCount = 15) {
        for (let i = 1; i <= frameCount; i++) {
            const t = i / frameCount;
            const u = Math.sin(t * Math.PI);
            this.queue.push({
                x: this.x,
                y: this.y - u * this.width,  //to give this jump effect we change this value of y as this

                r: lerp(150, 50, u),
                g: lerp(150, 50, u),
                b: lerp(150, 50, u)
            });
        }
        //Same as above Function MoveTo;
    }


    //This is the draw function which draws the cyliender based on x,y,width,height
    draw(ctx) {

        let changed = false; //To track if we are working on one case then other cases will not execute

        if (this.queue.length > 0) {
            const { x, y, r, g, b } = this.queue.shift();
            this.x = x;
            this.y = y;
            this.color = { r, g, b };
            changed = true;
        }


        const left = this.x - this.width / 2;
        const top = this.y - this.height;
        const right = this.x + this.width / 2;

        ctx.beginPath();
        const { r, g, b } = this.color;
        ctx.fillStyle = `rgb(${r},${g},${b})`; //to fill color in our cylinder

        ctx.moveTo(left, top);
        ctx.lineTo(left, this.y);

        //for the down one half ellips
        ctx.ellipse(this.x, this.y, this.width / 2, this.width / 4, 0, Math.PI, Math.PI * 2, true);

        ctx.lineTo(right, top);

        //For the top one full ellipse
        ctx.ellipse(this.x, top, this.width / 2, this.width / 4, 0, 0, Math.PI * 2, true);

        ctx.fill();
        ctx.stroke();
        return changed;
    }
}