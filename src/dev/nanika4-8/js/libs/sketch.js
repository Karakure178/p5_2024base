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
    drawHexGroup(p, pg, 100);

    p.image(pg, 0, 0);
    p.noLoop();
    p.pop();
  };

  p.keyPressed = () => {
    if (p.key === "s") {
      p.saveCanvas(canvas, "image", "png");
      //p.saveGif("image", 4);
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
  pg.background("#FEF9E1");
  pg.fill(255);
  pg.noStroke();
};

const drawHex = (p, pg, r, w, h) => {
  pg.push();
  pg.beginShape();
  const angle = 360 / 6;
  pg.translate(w, h);
  let colors = ["#16C47F", "#FFD65A", "#FF9D23", "#F93827"];
  pg.fill(p.random(colors));
  for (let i = 0; i < 6; i++) {
    let x = r * p.cos(p.radians(angle * i));
    let y = r * p.sin(p.radians(angle * i));
    pg.vertex(x, y);
  }
  pg.endShape(p.CLOSE);
  pg.pop();
};

const drawHexGroup = (p, pg, r) => {
  let maxX = pg.width / r;
  let maxY = pg.height / r;

  let addX = p.sqrt(3) * r;
  let addY = r * 1.5;
  for (let i = 0; i < maxX; i++) {
    for (let j = 0; j < maxY; j++) {
      let x = i * addX * 2;
      let y = j * addY;
      if (j % 2 === 1) {
        x += addX;
      }
      drawHex(p, pg, r + r / 2, x, y);
    }
  }
};
