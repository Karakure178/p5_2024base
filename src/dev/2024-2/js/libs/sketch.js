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
  let num = 10;
  let colors = [];

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
    for (let i = 0; i < num + 1; i++) {
      for (let j = 0; j < num + 1; j++) {
        colors.push("#8D0B41");
        //colors.push(p.color(p.random(255), p.random(255), p.random(255)));
      }
    }
  };

  p.draw = () => {
    pg.background(110);
    p.push();

    const shaderImage = () => {
      p.shader(theShader1);
      theShader1.setUniform(`u_tex`, pg);
      theShader1.setUniform("u_resolution", [pg.width, pg.height]);
      theShader1.setUniform(`u_time`, -p.frameCount / 35);
    };
    //shaderImage();
    grid(p, num, pg, colors);

    p.image(pg, 0, 0);
    p.pop();
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
  pg.background(110);
  pg.fill(255);
  pg.noStroke();
};

const anime = (p, pg, x, y) => {
  pg.push();
  pg.translate(x, y);
  let r = 100 + p.abs(20 * p.sin(p.radians(p.frameCount * 10)));
  let num = 2;
  let angle = 360 / num;
  for (let i = 0; i < num; i++) {
    let x = r * p.cos(p.radians(i * angle));
    let y = r * p.sin(p.radians(i * angle));

    let xx = r * p.cos(p.radians((i + 1) * angle));
    let yy = r * p.sin(p.radians((i + 1) * angle));
    pg.circle(x, y, 40);
    base(p, pg, x, y, xx, yy, 5);
  }
  pg.pop();
};

function base(p, pg, startX, startY, endX, endY, n) {
  for (let i = 0; i <= n; i++) {
    let t = i / n;
    let x = p.lerp(startX, endX, t);
    let y = p.lerp(startY, endY, t);

    // 計算した座標に点を描画

    pg.ellipse(x, y, 10, 10); // 半径5の円を描く
  }
}

function drawHex(p, pg, x, y, r, num) {
  let angle = 360 / num;
  pg.push();
  pg.beginShape();
  pg.translate(x, y);
  for (let i = 0; i < num; i++) {
    let xx = r * p.cos(p.radians(i * angle));
    let yy = r * p.sin(p.radians(i * angle));
    pg.vertex(xx, yy);
  }
  pg.endShape(p.CLOSE);
  pg.pop();
}

const grid = (p, num, pg, colors) => {
  const n1 = num + 1;

  const margin_left = pg.width / n1 / n1;
  const margin_bottom = pg.height / n1 / n1;

  const nw = pg.width / n1;
  const nh = pg.height / n1;

  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      const x = nw * i + margin_left * (i + 1);
      const y = nh * j + margin_bottom * (j + 1);
      pg.push();
      pg.translate(x + nw / 2, y + nw / 2);
      pg.fill("#F1F0E9");
      base(p, pg, nw, nw / 10);
      anime(p, pg, x, y);
      pg.pop();
    }
  }
};
