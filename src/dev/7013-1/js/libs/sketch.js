import gsap from "gsap";
import fs from "./shader/normal.frag";
import vs from "./shader/normal.vert";

/**
 * shader&base テンプレ
 * @param {p5} p - The p5.js instance.
 */
export const sketch = (p) => {
  let canvas;
  let pg;
  let theShader1;
  let angle = 0;
  let radius = 200;
  let colorShift = 0;
  let pulseScale = 1;
  let colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#F0FF33",
    "#FF33F0",
    "#33FFF0",
    "#F033FF",
  ];
  let num = 20; // 球体の数
  let colorsNum = [];

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

    pg = p.createGraphics(p.width, p.height, p.WEBGL);
    image_init(pg, p);

    theShader1 = p.createShader(vs, fs);

    for (let i = 0; i < num; i++) {
      colorsNum.push(p.random(colors));
    }
  };

  p.draw = () => {
    p.background("#273F4F");
    pg.clear();
    pg.push();
    pg.orbitControl(); // Allows camera control with the mouse

    // パルス効果
    pulseScale = 1 + p.sin(angle * 0.1) * 0.3;
    pg.scale(pulseScale);

    pg.shininess(80);
    pg.noStroke();

    grid(pg, 4, num, colorsNum);
    pg.pop();

    // Increment the angle for the next frame
    angle += 1.2; // アニメーション速度を上げる
    colorShift += 0.08; // 色変化の速度

    const shaderImage = () => {
      p.shader(theShader1);
      theShader1.setUniform(`u_tex`, pg);
      theShader1.setUniform("u_resolution", [pg.width, pg.height]);
      theShader1.setUniform(`u_time`, -p.frameCount / 35);
    };
    shaderImage();

    p.image(pg, 0, 0);
  };

  p.keyPressed = () => {
    if (p.key === "s") {
      p.saveCanvas(canvas, "image", "png");
      p.saveGif("image", 4);
    }
  };

  function drawSphere(pg, num, colors) {
    for (let i = 0; i < num; i++) {
      let a = 360 / num;

      // より複雑な軌道
      let radiusVariation = radius + pg.sin(angle * 0.05 + i) * 50;
      let x = radiusVariation * pg.cos(pg.radians(angle + i * a));
      let y =
        radiusVariation * pg.cos(pg.radians(0 * 0.7)) +
        pg.sin(pg.radians(0 + i * a)) * 80;
      let z = radiusVariation * pg.sin(pg.radians(angle + i * a));

      pg.push();
      pg.translate(x, y, z);

      pg.fill(colors[i]);

      // 球体のサイズも動的に変化
      let sphereSize = 15 + pg.sin(angle * 0.15 + i) * 8;
      pg.sphere(sphereSize);
      pg.pop();
    }
  }

  /** num個で分割したグリッドを画面いっぱいに生成する
   * @method grid
   * @param  {Number}        num           画面の分割数
   */
  const grid = (pg, num, sphereNum, colors) => {
    const n1 = num + 1;

    const margin_left = pg.width / n1 / n1;
    const margin_bottom = pg.height / n1 / n1;

    const nw = pg.width / n1;
    const nh = pg.height / n1;
    const particles = [];

    for (let i = 0; i < num; i++) {
      for (let j = 0; j < num; j++) {
        const x = nw * i + margin_left * (i + 1);
        const y = nh * j + margin_bottom * (j + 1);
        pg.push();
        pg.translate(-pg.width / 2 + x, -pg.height / 2 + y);
        drawSphere(pg, sphereNum, colors);
        pg.pop();
      }
    }
    return particles;
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
