import gsap from "gsap";

/**
 * shader&base テンプレ
 * @param {p5} p - The p5.js instance.
 */
export const sketch = (p) => {
  let canvas;
  let colors = ["#453368", "#e6b352", "#e4681b"];
  let pgs = [];
  let pgs2 = [];
  let rands = [];
  let w;

  const num = 5;
  const rand = 5;

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

    w = p.width / num;
    for (let i = 0; i < num; i++) {
      pgs.push([]);
      pgs2.push([]);
      rands.push([]);
      for (let j = 0; j < num; j++) {
        pgs[i].push(p.createGraphics(w, w));
        pgs2[i].push(p.createGraphics(w, w));
        pgs[i][j].noStroke();
        rands[i].push(Math.floor(p.random(1, rand)));
      }
    }
  };

  p.draw = () => {
    p.translate(-p.width / 2, -p.height / 2);
    p.background("#e3e9e3");
    p.push();

    grid(p, num, pgs, colors, rands);
    gridStroke(p, num, pgs2, rands);

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

const grid = (p, num, pgs, colors, rands) => {
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      p.push();
      p.translate(pgs[i][j].width * i, pgs[i][j].height * j);

      pgs[i][j].fill(p.random(colors));
      base(p, pgs[i][j], rands[i][j]);
      p.image(pgs[i][j], pgs[i][j].width / 2, pgs[i][j].height / 2);
      p.pop();
    }
  }
};

const gridStroke = (p, num, pgs, rands) => {
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      p.push();
      p.translate(pgs[i][j].width * i, pgs[i][j].height * j);

      pgs[i][j].noFill();
      pgs[i][j].stroke(0);
      pgs[i][j].strokeWeight(2);

      base(p, pgs[i][j], rands[i][j]);
      p.image(pgs[i][j], pgs[i][j].width / 2 + 10, pgs[i][j].height / 2 + 10);
      p.pop();
    }
  }
};

const base = (p, pg, num) => {
  const n1 = num + 1;

  const margin_left = pg.width / n1 / n1;
  const margin_bottom = pg.height / n1 / n1;

  const nw = pg.width / n1;
  const nh = pg.height / n1;

  pg.push();
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      const x = nw * i + margin_left * (i + 1);
      const y = nh * j + margin_bottom * (j + 1);
      pg.circle(x + nw / 2, y + nw / 2, nw);
    }
  }
  pg.pop();
};
