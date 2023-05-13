import canvasSketch from 'canvas-sketch';
import { random } from './utils';

const bgCol = '#535';
const fgCol = '#ffddff';

const settings = {
    dimensions: [1024, 1024],
    /* animate: true, */
    /* duration: 3, */
    /* fps: 30, */
};

function drawCircle(ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();
}

function particlesCircle(ctx, x, y, rIn, rOut) {
    for (let i = 0; i < 1000; i++) {
        const angle = random(0, 2 * Math.PI);
        const r = random(rIn, rOut);
        const x2 = x + r * Math.cos(angle);
        const y2 = y + r * Math.sin(angle);

        drawCircle(ctx, x2, y2, 0.5);
    }
}

function particlesRect(ctx, x, y, w, h) {
    /* ctx.fillRect(x, y, w, h); */
    for (let i = 0; i < 100 * h * 0.8; i++) {
        const x2 = random(x, x + w);
        const y2 = random(y, y + h);
        drawCircle(ctx, x2, y2, 0.4);
    }
}

const sketch = ({ context, width, height }) => {
    return ({ context, width, height }) => {
        context.fillStyle = bgCol;
        context.fillRect(0, 0, width, height);

        context.fillStyle = fgCol;
        const r = 200;
        /* drawCircle(context, width / 2, height / 2, r); */
        /* context.fillStyle = bgCol; */

        // Stripes
        const nums = 12;
        for (let i = 0; i < nums; i++) {
            const h = i * (r / nums);
            const w = Math.sqrt(r * r - h * h);
            particlesRect(context, width / 2 - w, height / 2 + h, w * 2, (r / nums) * i * 0.08 + 2);
        }

        context.fillStyle = fgCol;
        for (let i = 0; i < 20; i++) {
            particlesCircle(context, width / 2, height / 2, r, r * (1 + i * 0.03));
        }
    };
};

canvasSketch(sketch, settings);
