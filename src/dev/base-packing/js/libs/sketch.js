import gsap from "gsap";

/**
 * shader&base テンプレ
 * @param {p5} p - The p5.js instance.
 */
export const sketch = (p) => {
  let canvas;
  let pg;
  let frame;
  let rand;
  const colors = ["#D91656", "#FFB200"];
  const colors2 = ["#640D5F", "#EB5B00"];

  p.setup = () => {
    const init = () => {
      const canvasid = document.getElementById("mycanvas");
      canvas = p.createCanvas(canvasid.clientWidth, canvasid.clientHeight);
      canvas.parent(canvasid);
      p.imageMode(p.CENTER);
      p.textureMode(p.NORMAL);
      p.frameRate(24);

      p.noStroke();
    };
    init();

    pg = p.createGraphics(p.width, p.height);
    image_init(pg, p);

    frame = p.createGraphics(p.width, p.height);
    image_init(frame, p);
    frame.rectMode(p.CORNER);
    frame.fill("#EFB6C8");
    frame.rect(0, 0, frame.width, frame.height);
    frame.erase();
    frame.rectMode(p.CENTER);
    frame.rect(
      frame.width / 2,
      frame.height / 2,
      frame.width * 0.9,
      frame.height * 0.9
    );
    frame.noErase();
  };

  p.draw = () => {
    p.background(110);
    p.push();

    pg.push();

    const num = 11;
    for (let i = 0; i < num; i++) {
      for (let j = 0; j < num; j++) {
        let c;
        rand = p.random(1);

        if (rand < 0.5) {
          c = colors; //p.random(colors);
        } else {
          c = colors2; //p.random(colors2);
        }
        tris(p, pg, i * 86, j * 150, 100, c);
      }
    }

    pg.pop();
    p.translate(p.width / 2, p.height / 2);
    p.drawingContext.filter = "drop-shadow(8px 8px 8px rgba(46,46,46,0.7))";
    p.image(pg, 0, 0);
    p.image(frame, 0, 0);
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
  // pg.background(110);
  pg.fill(255);
  pg.noStroke();
};

const tris = (p, pg, x, y, r, colors) => {
  const num = 3;
  const rr = r / 2;
  const angle = 360 / num;

  pg.push();
  pg.translate(x, y);
  pg.rotate(p.radians(30));
  for (let i = 1; i < num; i++) {
    const xx = rr * p.cos(p.radians(angle * i));
    const yy = rr * p.sin(p.radians(angle * i));
    pg.fill(colors[i - 1]);
    pg.circle(xx, yy, p.random(r / 2, r));
  }
  pg.pop();
};
