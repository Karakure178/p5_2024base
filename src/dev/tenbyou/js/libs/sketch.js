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
    //p.translate(-p.width / 2, -p.height / 2);
    p.push();

    pg.push();
    pg.translate(p.width / 2, p.height / 2);
    enbase(p, pg);
    pg.pop();

    p.image(pg, 0, 0);
    p.pop();
    p.noLoop();
  };

  p.keyPressed = () => {
    if (p.key === "s") {
      p.saveCanvas(canvas, "image", "png");
      // p.saveGif("image", 4);
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
  pg.strokeWeight(0.4);
};

const enbase = (p, pg) => {
  const num = 5;

  for (let i = num; i > 0; i--) {
    pg.push();
    pg.fill(255);
    pg.circle(0, 0, 30 * i);

    const radius = (30 * i) / 2;

    for (let j = 0; j < 100000; j++) {
      const randx = p.random(-30 * i, 30 * i);
      const randy = p.random(-30 * i, 30 * i);

      // 円の中に入っているかチェック
      let distance = p.dist(randx, randy, 0, 0);
      if (distance <= radius) {
        // 円の中なら点を描画
        pg.stroke(30 * i, 0, 0);
        pg.point(randx, randy);
      }
    }
    pg.pop();
  }
};
