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
    p.background("#f1f2f7");
    p.translate(-p.width / 2, -p.height / 2); // brushでtranslateを使うとバグる
    p.push();
    p.strokeWeight(3);
    p.noFill();
    base(p, palette);
    p.pop();
  };

  p.keyPressed = () => {
    if (p.key === "s") {
      p.saveCanvas(canvas, "image", "png");
      //p.saveGif("image", 4);
    }
  };
};

const base = (p, colors) => {
  p.push();
  p.translate(p.width / 2, p.height / 2); //描いたものを中心に移す
  let angle = 0;
  let r = 10;
  for (let i = 0; i < 1000; i++) {
    let t = p.radians(angle);
    let x = p.cos(t) * r;
    let y = p.sin(t) * r;
    brush.set("marker2", p.random(colors), 1);
    p.fill(100);
    p.ellipse(x, y, 10, 10);
    angle += 10; //角度は2ずつ増える
    r += 1 / 2; //半径を増やして螺旋を描く
  }
  p.pop();
};
