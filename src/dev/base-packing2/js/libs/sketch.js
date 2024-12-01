import gsap from "gsap";

/**
 * shader&base テンプレ
 * @param {p5} p - The p5.js instance.
 */
export const sketch = (p) => {
  let canvas;
  let pg;
  const colors = ["#D91656", "#FFB200"];

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
    //pg.translate(pg.width / 2, pg.height / 2);

    const num = 11;
    for (let i = 0; i < num; i++) {
      for (let j = 0; j < num; j++) {
        // tris(i*86,j*150,100);
        tris(p, pg, i * 86, j * 150, 100, colors, true);
      }
    }

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
  pg.fill(255);
  pg.noStroke();
};

const tris = (p, pg, x, y, r, colors, isFill) => {
  const num = 3;
  const rr = r / 2;
  const angle = 360 / num;

  pg.push();
  pg.translate(x, y);
  pg.rotate(p.radians(30));
  for (let i = 1; i < num; i++) {
    const xx = rr * p.cos(p.radians(angle * i));
    const yy = rr * p.sin(p.radians(angle * i));
    if (isFill) pg.fill(colors[i - 1]);
    //hexagon(p, pg, xx, yy, r);
    pg.circle(xx, yy, r / 2);
  }
  pg.pop();
};

const hexagon = (p, pg, x, y, r) => {
  const num = 6;
  const rr = r / 2;
  const angle = 360 / num;
  pg.push();
  pg.translate(x, y);
  pg.beginShape();
  for (let i = 0; i < num; i++) {
    const xx = rr * p.cos(pg.radians(angle * i));
    const yy = rr * p.sin(pg.radians(angle * i));
    pg.vertex(xx, yy);
  }
  pg.endShape(p.CLOSE);
  pg.pop();
};
