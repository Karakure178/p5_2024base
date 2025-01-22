import fs from "./shader/normal.frag";
import vs from "./shader/normal.vert";
/**
 * shader&base テンプレ
 * @param {p5} p - The p5.js instance.
 */
export const sketch = (p) => {
  let canvas;
  let colors = ["#84c46e", "#c0ebe6", "#78a991"];
  let pg;
  let theShader1;

  p.setup = () => {
    const canvasid = document.getElementById("mycanvas");
    canvas = p.createCanvas(
      canvasid.clientWidth,
      canvasid.clientHeight,
      p.WEBGL
    );
    canvas.parent(canvasid);

    init(p);

    pg = p.createGraphics(p.width, p.height);
    image_init(pg, p);
    theShader1 = p.createShader(vs, fs);
  };

  p.draw = () => {
    p.translate(-p.width / 2, -p.height / 2);

    pg.background("#fffefd");
    pg.translate(p.width / 2, p.height / 2);
    const n = 150;
    const angle = 360 / n;
    for (let i = 0; i < n; i++) {
      if (p.random(0, 2) > 1) {
        pg.fill(p.random(colors));
        base(p, pg, 15, p.random(100, 200), angle * i);
      }
    }

    const shaderImage = () => {
      p.shader(theShader1);
      theShader1.setUniform(`u_tex`, pg);
      theShader1.setUniform("u_resolution", [pg.width, pg.height]);
      theShader1.setUniform(`u_time`, -p.frameCount / 35);
    };
    shaderImage();

    p.image(pg, 0, 0);
    p.noLoop();
  };

  p.keyPressed = () => {
    if (p.key === "s") {
      p.saveCanvas(canvas, "image", "png");
      //p.saveGif("image", 4);
    }
  };
};

const init = (p) => {
  p.textureMode(p.NORMAL);
  p.frameRate(24);
  p.noStroke();
};

const image_init = (pg, p) => {
  pg.rectMode(p.CENTER);
  pg.background(110);
  pg.fill(255);
  pg.noStroke();
};

const base = (p, pg, num, r, rotate) => {
  pg.push();
  const angle = 360 / num;
  let x = r * p.cos(p.radians(angle * 0));
  let xx = r * p.cos(p.radians(angle * 1));
  let y = r * p.sin(p.radians(angle * 0));
  let yy = r * p.sin(p.radians(angle * 1));
  pg.rotate(p.radians(rotate));

  pg.beginShape();
  pg.vertex(0, 0);
  pg.vertex(x, y);
  pg.vertex(xx, yy);
  pg.endShape(p.CLOSE);

  pg.pop();
};
