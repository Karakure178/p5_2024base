import gsap from "gsap";
import * as brush from "p5.brush";

/**
 * shader&base テンプレ
 * @param {p5} p - The p5.js instance.
 */
export const sketch = (p) => {
  let canvas;
  let pg;
  brush.instance(p);

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
    brush.load(); // これ必須

    let palette = ["#e2788c", "#edd0ca", "#83adf0"];
    brush.set("marker2", "#F2C166", 1);
    p.background("#f1f2f7");
    // p.translate(-p.width / 2, -p.height / 2); // brushでtranslateを使うとバグる
    p.push();
    p.strokeWeight(3);
    p.noFill();

    const N = 15;
    const d = p.width / N;
    for (let j = 0; j < N; j++) {
      const y = d * j;
      const dx = j % 2 == 1 ? -d : 0;
      for (let i = 0; i < N; i++) {
        const x = 2 * d * i;
        p.push();
        brush.push();
        brush.set("marker2", p.random(palette), 1);
        brush.rect(x + dx - p.width / 2, y - p.height / 2, 2 * d, d);
        brush.pop();
        p.pop();
      }
    }

    let r = 80;
    let colors = ["#FFD95F", "#FFEFC8", "#B8D576", "＃D70654"];
    brush.push();
    p.translate(-p.width / 2, -p.height / 2);
    brush.set("marker", p.random(colors), 1);
    brush.strokeWeight(1);
    for (let j = -r; j < p.height; j = j + r / 2) {
      for (let i = -r; i < p.width; i = i + r) {
        let ii = i + r / 2;
        let jj = j + r / 2;
        if (j % ((r / 2) * 2)) {
          ii = i + r;
        }

        brush.circle(ii, jj, r);
      }
    }
    brush.pop();
    p.pop();
  };

  // p.draw = () => {
  //   p.noLoop();
  // };

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
  pg.background(110);
  pg.fill(255);
  pg.noStroke();
};
