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
  let triangles = [];
  let colorPhase = 0;
  let num = 60;

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
      p.frameRate(60);
      p.noStroke();
    };
    init();

    pg = p.createGraphics(p.width, p.height);
    image_init(pg, p);

    theShader1 = p.createShader(vs, fs);

    // 三角形の初期化
    triangles = pgGrid(p, num, pg, triangles);
  };

  p.draw = () => {
    p.background(20);
    colorPhase += 0.01;
    p.translate(-p.width / 2, -p.height / 2);

    pg.push();
    pg.background(20, 30);
    pg.colorMode(p.HSB, 360, 100, 100, 100);

    // 三角形の描画とアニメーション
    for (let i = 0; i < triangles.length; i++) {
      const triangle = triangles[i];

      // 回転
      triangle.rotation += triangle.rotSpeed;

      // パルス効果
      triangle.pulsePhase += 0.03;
      const pulse = p.sin(triangle.pulsePhase) * 0.5 + 1;

      // 自然な動き
      triangle.x += p.sin(p.frameCount * 0.005 + i) * 0.2;
      triangle.y += p.cos(p.frameCount * 0.007 + i) * 0.2;

      // 境界チェック
      if (triangle.x < 0) triangle.x = p.width;
      if (triangle.x > p.width) triangle.x = 0;
      if (triangle.y < 0) triangle.y = p.height;
      if (triangle.y > p.height) triangle.y = 0;

      // 三角形を描画
      pg.push();
      pg.translate(triangle.x, triangle.y);
      pg.rotate(triangle.rotation);

      const hue = (triangle.color + colorPhase * 30) % 360;
      pg.fill(hue, 70, 80, 60);

      const size = triangle.size * pulse;
      pg.beginShape();
      pg.vertex(0, -size);
      pg.vertex(-size * 0.866, size * 0.5);
      pg.vertex(size * 0.866, size * 0.5);
      pg.endShape(p.CLOSE);

      // 三角形の中心に小さな円
      pg.fill(hue, 30, 100, 80);
      pg.ellipse(0, 0, size * 0.2);

      pg.pop();
    }

    pg.colorMode(p.RGB, 255);
    pg.pop();

    // シェーダーを適用
    p.shader(theShader1);
    theShader1.setUniform(`u_tex`, pg);
    theShader1.setUniform("u_resolution", [pg.width, pg.height]);
    theShader1.setUniform(`u_time`, p.frameCount / 60);

    p.rect(0, 0, p.width, p.height);
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
  pg.background(20);
  pg.fill(255);
  pg.noStroke();
};

/** pg用、num個で分割したグリッドを画面いっぱいに生成する
 * @method pgGrid
 * @param  {Number}        num           画面の分割数
 */
const pgGrid = (p, num, pg, triangles) => {
  const n1 = num + 1;
  const margin_left = pg.width / n1 / n1;
  const margin_bottom = pg.height / n1 / n1;

  const nw = pg.width / n1;
  const nh = pg.height / n1;

  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      const x = nw * i + margin_left * (i + 1);
      const y = nh * j + margin_bottom * (j + 1);
      triangles.push({
        x: x,
        y: y,
        size: pg.random(15, 40),
        rotation: pg.random(p.TWO_PI),
        rotSpeed: pg.random(-0.05, 0.05),
        color: pg.random(360),
        pulsePhase: pg.random(p.TWO_PI),
      });
    }
  }
  return triangles;
};
