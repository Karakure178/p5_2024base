import gsap from "gsap";

/**
 * shader&base テンプレ
 * @param {p5} p - The p5.js instance.
 */
export const sketch = (p) => {
  let canvas;
  let pg;
  let colors = ["#690B22", "#E07A5F", "#1B4D3E"];

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

    const num = 10;
    const angle = 360 / num;
    const r = 100;
    pg.push();
    pg.noFill();
    pg.stroke(255);
    pg.strokeWeight(3);
    pg.beginShape();
    for (let i = 0; i < 360; i++) {
      let x = r * p.cos(p.radians(i * angle));
      let y = r * p.sin(p.radians(i * angle));
      pg.vertex(x, y);
    }
    pg.endShape(p.CLOSE);
    pg.pop();

    pg.push();
    pg.noFill();
    pg.stroke(255);
    pg.strokeWeight(3);
    pg.beginShape();
    for (let i = 0; i < 360; i++) {
      let x = r * 2 * p.cos(p.radians(i * angle));
      let y = r * 2 * p.sin(p.radians(i * angle));
      pg.vertex(x, y);
    }
    pg.endShape(p.CLOSE);
    pg.pop();

    pg.push();
    pg.noFill();
    pg.stroke(255);
    pg.strokeWeight(3);
    pg.beginShape();
    for (let i = 0; i < 360; i++) {
      let x = r * 3 * p.cos(p.radians(i * angle));
      let y = r * 3 * p.sin(p.radians(i * angle));
      pg.vertex(x, y);
    }
    pg.endShape(p.CLOSE);
    pg.pop();

    for (let i = 0; i < num; i++) {
      pg.fill(p.random(colors));
      let x = r * p.cos(p.radians(i * angle));
      let y = r * p.sin(p.radians(i * angle));
      pg.circle(x, y, p.random(10, 50));
    }

    for (let i = 0; i < num; i++) {
      pg.fill(p.random(colors));
      let x = r * 2 * p.cos(p.radians(i * angle));
      let y = r * 2 * p.sin(p.radians(i * angle));
      pg.circle(x, y, p.random(10, 50));
    }

    for (let i = 0; i < num; i++) {
      pg.fill(p.random(colors));

      let x = r * 3 * p.cos(p.radians(i * angle));
      let y = r * 3 * p.sin(p.radians(i * angle));
      pg.circle(x, y, p.random(10, 50));
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
  pg.background("#F1E3D3");
  pg.fill(255);
  pg.noStroke();
};
