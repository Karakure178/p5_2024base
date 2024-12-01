import gsap from "gsap";

/**
 * shader&base テンプレ
 * @param {p5} p - The p5.js instance.
 */
export const sketch = (p) => {
  let canvas;
  let pg;

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
  };

  p.draw = () => {
    p.background(110);
    p.push();

    pg.push();
    pg.translate(pg.width / 2, pg.height / 2);
    base(p, pg);
    pg.pop();

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
  pg.background(110);
  // pg.fill(255);
  pg.noFill();
};

const base = (p, pg) => {
  const r = 100;
  const rands = [60, 90, 120, 150, 180, 210, 270, 300];
  const rand = Math.floor(p.random(rands));
  pg.beginShape();
  for (let i = 0; i < 360; i++) {
    if (rand === i) {
      pg.endShape(p.CLOSE);
      return;
    }
    let x = r * p.cos(p.radians(i));
    let y = r * p.sin(p.radians(i));
    pg.vertex(x, y);
  }
};
