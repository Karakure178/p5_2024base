import gsap from "gsap";
import * as brush from "p5.brush";

/**
 * shader&base テンプレ
 * @param {p5} p - The p5.js instance.
 */
export const sketch = (p) => {
  let canvas;
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

    let palette = ["#5C7285", "#818C78", "#A7B49E", "#E2E0C8"];
    p.background("#f1f2f7");
    p.push();
    p.strokeWeight(3);
    p.noFill();
    for (let i = 0; i < 10; i++) {
      base(p, brush, palette, Math.floor(p.random(3, 10)), 100 + i * 40);
    }
    p.pop();
  };

  p.keyPressed = () => {
    if (p.key === "s") {
      p.saveCanvas(canvas, "image", "png");
      //p.saveGif("image", 4);
    }
  };
};

const base = (p, brush, colors, num, r) => {
  const d = 360 / num;
  for (let i = 0; i < num; i++) {
    let x = r * p.cos(p.radians(d * i));
    let y = r * p.sin(p.radians(d * i));
    p.push();
    p.translate(x, y);
    brush.set("marker2", p.random(colors), 1);
    const size = p.random(10, 50);
    brush.circle(0, 0, size, size);
    p.pop();
  }
};
