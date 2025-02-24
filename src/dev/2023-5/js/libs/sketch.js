import gsap from "gsap";
import fs from "./shader/normal.frag";
import vs from "./shader/normal.vert";

/**
 * shader&base テンプレ
 * @param {p5} p - The p5.js instance.
 */
export const sketch = (p) => {
  let canvas;
  let pg;
  let theShader1;
  let colors = ["#C1224F", "#F16F6F", "#94D2E6", "#FFF78F"];

  p.setup = () => {
    const init = () => {
      const canvasid = document.getElementById("mycanvas");
      canvas = p.createCanvas(
        canvasid.clientWidth,
        canvasid.clientHeight,
        p.WEBGL
      );
      canvas.parent(canvasid);
      p.imageMode(p.CENTER);
      p.textureMode(p.NORMAL);
      p.frameRate(24);
      p.noStroke();
    };
    init();

    pg = p.createGraphics(p.width, p.height);
    image_init(pg, p);

    theShader1 = p.createShader(vs, fs);
  };

  p.draw = () => {
    p.background(110);
    p.push();

    const shaderImage = () => {
      p.shader(theShader1);
      theShader1.setUniform(`u_tex`, pg);
      theShader1.setUniform("u_resolution", [pg.width, pg.height]);
      theShader1.setUniform(`u_time`, -p.frameCount / 35);
    };
    //shaderImage();

    squareRecusion(p, pg, 10, 10, pg.width - 20, 5, colors);
    p.image(pg, 0, 0);
    p.pop();
    p.noLoop();
  };

  p.keyPressed = () => {
    if (p.key === "s") {
      p.saveCanvas(canvas, "image", "png");
      p.saveGif("image", 4);
    }
  };
};

/** pgの初期化関数
 * @function image_init
 * @param {p5.Graphics} pg - p5.Graphics
 * @param {p5.canvas} p - p5インスタンス
 */
const image_init = (pg, p) => {
  pg.rectMode(p.CENTER);
  pg.background("#E1F5F2");
  pg.noFill();
  pg.strokeWeight(5);
  // pg.fill(255);
  // pg.noStroke();
};

function squareRecusion(p, pg, x, y, size, n, colors) {
  pg.stroke(p.random(colors));
  // pg.square(x, y, size);
  //pg.circle(x, y, size);
  drawHex(p, pg, x, y, size / 3);
  n--;
  // const rand = p.random(1);
  const rand = p.map(n, 0, n - 1, 0.5, 0);
  if (n >= 0) {
    if (p.random(1) > rand) {
      const hs = size / 2;
      squareRecusion(p, pg, x, y, hs, n, colors);
      squareRecusion(p, pg, x + hs, y, hs, n, colors);
      squareRecusion(p, pg, x + hs, y + hs, hs, n, colors);
      squareRecusion(p, pg, x, y + hs, hs, n, colors);
    } else {
      const hs = size / 2;
      // squareRecusion(p, pg, x, y, hs, n, colors);
      // squareRecusion(p, pg, x + hs, y, hs, n, colors);
      // squareRecusion(p, pg, x + hs, y + hs, hs, n, colors);
      // squareRecusion(p, pg, x, y + hs, hs, n, colors);
    }
  }
}

const drawHex = (p, pg, x, y, size) => {
  pg.beginShape();
  for (let i = 0; i < 6; i++) {
    const angle = (p.TWO_PI / 6) * i;
    const sx = x + p.cos(angle) * size;
    const sy = y + p.sin(angle) * size;
    pg.vertex(sx, sy);
  }
  pg.endShape(p.CLOSE);
};
