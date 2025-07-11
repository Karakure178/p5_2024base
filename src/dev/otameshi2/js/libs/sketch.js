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
  let circles = [];
  let triangles = [];
  let colorPhase = 0;
  let mouseHistory = [];

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

    // 円の初期化
    for (let i = 0; i < 15; i++) {
      circles.push({
        x: p.random(p.width),
        y: p.random(p.height),
        size: p.random(20, 60),
        speed: p.random(0.5, 2),
        angle: p.random(p.TWO_PI),
        color: p.random(360),
        orbit: p.random(50, 150),
      });
    }

    // 三角形の初期化
    for (let i = 0; i < 12; i++) {
      triangles.push({
        x: p.random(p.width),
        y: p.random(p.height),
        size: p.random(15, 40),
        rotation: p.random(p.TWO_PI),
        rotSpeed: p.random(-0.05, 0.05),
        color: p.random(360),
        pulsePhase: p.random(p.TWO_PI),
      });
    }
  };

  p.draw = () => {
    p.background(20);
    colorPhase += 0.01;
    p.translate(-p.width / 2, -p.height / 2);

    // マウス履歴を記録
    mouseHistory.push({ x: p.mouseX, y: p.mouseY });
    if (mouseHistory.length > 20) {
      mouseHistory.shift();
    }

    pg.push();
    pg.background(20, 30);
    pg.colorMode(p.HSB, 360, 100, 100, 100);

    // 円の描画とアニメーションs
    for (let i = 0; i < circles.length; i++) {
      const circle = circles[i];

      // マウスに向かって移動
      const mouseDistance = p.dist(p.mouseX, p.mouseY, circle.x, circle.y);
      if (mouseDistance < 100) {
        const force = p.map(mouseDistance, 0, 100, 0.02, 0);
        const angle = p.atan2(p.mouseY - circle.y, p.mouseX - circle.x);
        circle.x += p.cos(angle) * force;
        circle.y += p.sin(angle) * force;
      }

      // 軌道運動
      circle.angle += circle.speed * 0.01;
      circle.x += p.cos(circle.angle) * 0.5;
      circle.y += p.sin(circle.angle) * 0.5;

      // 境界チェック
      if (circle.x < 0 || circle.x > p.width) circle.x = p.width / 2;
      if (circle.y < 0 || circle.y > p.height) circle.y = p.height / 2;

      // 色の変化
      const hue = (circle.color + colorPhase * 50) % 360;
      const pulse = p.sin(p.frameCount * 0.02 + i) * 0.3 + 0.7;

      pg.fill(hue, 80, 90, 70);
      pg.ellipse(circle.x, circle.y, circle.size * pulse);

      // 内側の光る部分
      pg.fill(hue, 40, 100, 50);
      pg.ellipse(circle.x, circle.y, circle.size * 0.3 * pulse);
    }

    // 三角形の描画とアニメーション
    for (let i = 0; i < triangles.length; i++) {
      const triangle = triangles[i];

      // 回転
      triangle.rotation += triangle.rotSpeed;

      // パルス効果
      triangle.pulsePhase += 0.03;
      const pulse = p.sin(triangle.pulsePhase) * 0.5 + 1;

      // マウスとの相互作用
      const mouseDistance = p.dist(p.mouseX, p.mouseY, triangle.x, triangle.y);
      if (mouseDistance < 80) {
        const repelForce = p.map(mouseDistance, 0, 80, 2, 0);
        const angle = p.atan2(triangle.y - p.mouseY, triangle.x - p.mouseX);
        triangle.x += p.cos(angle) * repelForce;
        triangle.y += p.sin(angle) * repelForce;
      }

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

    // マウストレイルの描画
    if (mouseHistory.length > 1) {
      for (let i = 0; i < mouseHistory.length - 1; i++) {
        const alpha = p.map(i, 0, mouseHistory.length - 1, 0, 80);
        const hue = (colorPhase * 100 + i * 10) % 360;
        pg.stroke(hue, 60, 100, alpha);
        pg.strokeWeight(p.map(i, 0, mouseHistory.length - 1, 1, 5));
        pg.line(
          mouseHistory[i].x,
          mouseHistory[i].y,
          mouseHistory[i + 1].x,
          mouseHistory[i + 1].y
        );
      }
      pg.noStroke();
    }

    // 中央の動的な図形
    pg.push();
    pg.translate(pg.width / 2, pg.height / 2);

    const time = p.frameCount * 0.01;
    const mouseInfluence = p.map(
      p.dist(p.mouseX, p.mouseY, p.width / 2, p.height / 2),
      0,
      200,
      2,
      0.5
    );

    pg.rotate(time);
    pg.scale(mouseInfluence);

    for (let i = 0; i < 6; i++) {
      pg.rotate(p.PI / 3);
      const hue = (colorPhase * 60 + i * 60) % 360;

      // 外側の三角形
      pg.fill(hue, 80, 70, 40);
      pg.beginShape();
      pg.vertex(0, -40);
      pg.vertex(-34.6, 20);
      pg.vertex(34.6, 20);
      pg.endShape(p.CLOSE);

      // 内側の円
      pg.fill(hue, 40, 100, 60);
      pg.ellipse(0, -20, 15);
    }
    pg.pop();

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
