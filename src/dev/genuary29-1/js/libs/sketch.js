import gsap from "gsap";
import { Scribble } from "./p5.scribble";

/**
 * shader&base テンプレ
 * @param {p5} p - The p5.js instance.
 */
export const sketch = (p) => {
  let canvas;
  let colors = ["#A04747", "#D8A25E", "#EEDF7A"];
  let pg;
  let sb;

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
    sb = new Scribble(p);
  };

  p.draw = () => {
    p.translate(-p.width / 2, -p.height / 2);
    p.background("#343131");
    p.push();

    sbgrid(p, 5, sb, colors);
    p.noLoop();
  };

  p.keyPressed = () => {
    if (p.key === "s") {
      p.saveCanvas(canvas, "image", "png");
      // p.saveGif("image", 4);
    }
  };
};

const sbgrid = (p, num, sb, colors) => {
  p.push();
  p.noFill();
  const n1 = num + 1;

  const margin_left = p.width / n1 / n1;
  const margin_bottom = p.height / n1 / n1;

  const nw = p.width / n1;
  const nh = p.height / n1;

  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      p.strokeWeight(2);
      const x = nw * i + margin_left * (i + 1);
      const y = nh * j + margin_bottom * (j + 1);

      // 大
      p.stroke(p.random(colors));
      sbRectBig(p, x, y, nw, sb);

      // 中
      p.stroke(p.random(colors));
      sbRectMiddle(p, x, y, nw, sb);

      // 小
      p.stroke(p.random(colors));
      sbRectSmall(p, x, y, nw, sb);
    }
  }
  p.pop();
};

const sbRectBig = (p, x, y, nw, sb) => {
  p.push();
  p.translate(0, 0);
  sb.scribbleLine(x, y, x + nw, y);
  sb.scribbleLine(x, y + nw / 3, x + nw, y + nw / 3);
  sb.scribbleLine(x, y, x, y + nw / 3);
  sb.scribbleLine(x + nw, y, x + nw, y + nw / 3);
  sb.scribbleFilling(
    [x, x + nw, x + nw, x],
    [y, y, y + nw / 3, y + nw / 3],
    10,
    45
  );
  p.pop();
};

const sbRectMiddle = (p, x, y, nw, sb) => {
  p.push();
  p.translate(0, nw / 3);
  sb.scribbleLine(x, y, x + (nw / 3) * 2, y);
  sb.scribbleLine(x, y + nw / 3, x + (nw / 3) * 2, y + nw / 3);
  sb.scribbleLine(x, y, x, y + nw / 3);
  sb.scribbleLine(x + (nw / 3) * 2, y, x + (nw / 3) * 2, y + nw / 3);
  sb.scribbleFilling(
    [x, x + (nw / 3) * 2, x + (nw / 3) * 2, x],
    [y, y, y + nw / 3, y + nw / 3],
    5,
    45
  );

  p.pop();
};

const sbRectSmall = (p, x, y, nw, sb) => {
  p.push();
  p.translate(0, (nw / 3) * 2);
  sb.scribbleLine(x, y, x + nw / 3, y);
  sb.scribbleLine(x, y + nw / 3, x + nw / 3, y + nw / 3);

  sb.scribbleLine(x, y, x, y + nw / 3);
  sb.scribbleLine(x + nw / 3, y, x + nw / 3, y + nw / 3);
  sb.scribbleFilling(
    [x, x + nw / 3, x + nw / 3, x],
    [y, y, y + nw / 3, y + nw / 3],
    2,
    45
  );

  p.pop();
};
