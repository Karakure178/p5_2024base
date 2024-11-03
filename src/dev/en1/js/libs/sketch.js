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

    // p.push();
    // const rect_s = 100;
    // pg.push();
    // pg.translate(pg.width / 2, pg.height / 2);
    // pg.rect(0, 0, rect_s, rect_s);
    // pg.pop();

    // p.image(pg, 0, 0);
    //p.pop();

    base(p);
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

const base = (p) => {
  const num = 100;
  const angle = 360 / num;
  const r = 100;
  p.stroke(255);
  p.circle(0, 0, 100);
  for (let i = 0; i < num; i++) {
    let x = r * p.cos(p.radians(angle * i));
    let y = r * p.sin(p.radians(angle * i));
    p.strokeWeight(3);
    p.point(x, y);

    x = (r + 30) * p.cos(p.radians(angle * i));
    y = (r + 30) * p.sin(p.radians(angle * i));
    let xx = (r + 50) * p.cos(p.radians(angle * i));
    let yy = (r + 50) * p.sin(p.radians(angle * i));
    p.line(x, y, xx, yy);
  }

  let x = r * p.cos(p.radians(angle * 40));
  let y = r * p.sin(p.radians(angle * 40));
  p.strokeWeight(3);
  p.circle(x, y, 40);

  x = (r + 40) * p.cos(p.radians(angle * 60));
  y = (r + 40) * p.sin(p.radians(angle * 60));
  p.strokeWeight(3);
  p.circle(x, y, 70);
};
