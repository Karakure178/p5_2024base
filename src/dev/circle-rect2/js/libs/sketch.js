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
  const colors_1 = ["#FFD95F", "#FFEFC8", "#B8D576", "#D70654"];
  const colors_2 = ["#FBF5DD", "#A6CDC6", "#16404D", "#DDA853"];
  const colors_3 = ["#FF8383", "#FFF574", "#A1D6CB", "#A19AD3"];

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
    pg.push();
    const colors_rand = p.random([colors_1, colors_2, colors_3]);
    grid(p, 10, pg, colors_rand);
    pg.pop();

    const shaderImage = () => {
      p.shader(theShader1);
      theShader1.setUniform(`u_tex`, pg);
      theShader1.setUniform("u_resolution", [pg.width, pg.height]);
      theShader1.setUniform(`u_time`, -p.frameCount / 35);
    };
    shaderImage();

    p.image(pg, 0, 0);
    p.pop();
    p.noLoop();
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
  pg.background("#09122C");
  pg.fill(255);
  pg.noStroke();
};

const cornersCircle = (p, pg, x, y, w, rand, colors) => {
  pg.push();
  pg.fill(colors[1]);
  pg.rect(x, y, w, w);
  let xx;
  let yy;
  let startPI;
  let endPI;

  if (rand < 0.25) {
    xx = x - w / 2;
    yy = y - w / 2;
    startPI = 0;
    endPI = p.HALF_PI;
  } else if (rand < 0.5) {
    xx = x + w / 2;
    yy = y - w / 2;
    startPI = p.HALF_PI;
    endPI = p.PI;
  } else if (rand < 0.75) {
    xx = x + w / 2;
    yy = y + w / 2;
    startPI = p.PI;
    endPI = p.PI + p.HALF_PI;
  } else {
    xx = x - w / 2;
    yy = y + w / 2;
    startPI = p.PI + p.HALF_PI;
    endPI = p.TWO_PI;
  }

  pg.translate(xx, yy);
  pg.fill(colors[0]);
  pg.arc(0, 0, w, w, startPI, endPI, p.PIE);
  pg.noFill();
  pg.stroke(colors[0]);
  pg.strokeWeight(3);
  pg.arc(0, 0, w * 1.25, w * 1.25, startPI, endPI, p.PIE);
  pg.pop();
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
      const colorPalette = getRandomColors(colors, 2);
      cornersCircle(
        p,
        pg,
        x + nw / 2,
        y + nw / 2,
        nw,
        Math.random(),
        colorPalette
      );
    }
  }
  pg.pop();
};

function getRandomColors(arr, num) {
  let shuffled = [...arr].sort(() => 0.5 - Math.random()); // 配列をシャッフル
  return shuffled.slice(0, num); // 先頭から必要な個数を取得
}
