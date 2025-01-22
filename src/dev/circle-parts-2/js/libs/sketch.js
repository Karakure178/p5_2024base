import fs from "./shader/normal.frag";
import vs from "./shader/normal.vert";
/**
 * shader&base テンプレ
 * @param {p5} p - The p5.js instance.
 */
export const sketch = (p) => {
  let canvas;
  let colors_1 = ["#84c46e", "#c0ebe6", "#78a991"];
  let colors_2 = ["#3f9c54", "#de6079", "#e7e7e3"];
  let colors = [colors_1, colors_2];
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

    const rand = Math.floor(p.random(colors.length));
    grid(p, 50, pg, colors[rand]);

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

const circleParts = (p, num, r, rotate) => {
  p.push();
  const angle = 360 / num;
  let x = r * p.cos(p.radians(angle * 0));
  let xx = r * p.cos(p.radians(angle * 1));
  let y = r * p.sin(p.radians(angle * 0));
  let yy = r * p.sin(p.radians(angle * 1));
  p.rotate(p.radians(rotate));

  p.beginShape();
  p.vertex(0, 0);
  p.vertex(x, y);
  p.vertex(xx, yy);
  p.endShape(p.CLOSE);

  p.pop();
};

const circles = (p, x, y, colors) => {
  p.push();
  p.translate(x, y);
  const n = 150;
  const angle = 360 / n;
  for (let i = 0; i < n; i++) {
    if (p.random(0, 2) > 1) {
      p.fill(p.random(colors));
      circleParts(p, 30, p.random(30, 60), angle * i);
    }
  }
  p.pop();
};

const grid = (p, num, pg, colors) => {
  const n1 = num + 1;

  const margin_left = pg.width / n1 / n1;
  const margin_bottom = pg.height / n1 / n1;

  const nw = pg.width / n1;
  const nh = pg.height / n1;

  pg.push();
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      const x = nw * i + margin_left * (i + 1);
      const y = nh * j + margin_bottom * (j + 1);
      circles(pg, x + nw / 2, y + nw / 2, colors);
    }
  }
  pg.pop();
};
