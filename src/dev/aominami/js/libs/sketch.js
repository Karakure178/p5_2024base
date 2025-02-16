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
  let colors1 = ["#DDEB9D", "#A0C878"];
  let colors2 = ["#DDEB9D", "#27667B"];
  let colors3 = ["#DDEB9D", "#143D60"];
  let colors4 = ["#27667B", "#A0C878"];
  let colors5 = ["#143D60", "#A0C878"];

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

    theShader1 = p.createShader(vs, fs);
  };

  p.draw = () => {
    p.background(110);

    p.push();
    const rect_s = 100;
    pg.push();
    pg.translate(pg.width / 2, pg.height / 2);
    pg.rect(0, 0, rect_s, rect_s);
    pg.pop();

    const shaderImage = () => {
      p.shader(theShader1);
      theShader1.setUniform(`u_tex`, pg);
      theShader1.setUniform("u_resolution", [pg.width, pg.height]);
      theShader1.setUniform(`u_time`, -p.frameCount / 35);
    };
    shaderImage();
    let colors = p.random([colors1, colors2, colors3, colors4, colors5]);
    seigaiha(p, pg, colors);
    p.image(pg, 0, 0);
    p.noLoop();
    p.pop();
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
  pg.background(110);
  pg.fill(255);
  pg.noStroke();
};

// https://gin-graphic.hatenablog.com/entry/2021/04/24/171256
const seigaiha = (p, pg, set_color) => {
  const draw_num = 4; //一方向に円を何個並べるか
  const draw_size = p.width / draw_num; //円一個の大きさ
  const mark_num = 8; //円一つ当たり何個の円で描くか
  const mark_size = draw_size / mark_num;
  for (let j = 0; j < 4 * (draw_num + 1); j++) {
    const y = (draw_size / 4) * j; //縦方向は円の大きさの４分の１ずつ移動させる
    const dx = j % 2 == 1 ? draw_size / 2 : 0; //縦方向が奇数番目であれば横方向に円半個分移動

    for (let i = 0; i < draw_num + 1; i++) {
      const x = draw_size * i; //横方向は円一個分ずつ移動
      pg.push();
      pg.translate(x + dx, y);

      //一つの描画
      for (let k = 0; k < mark_num; k++) {
        pg.fill(set_color[k % 2]); //二色を交互に設定する
        pg.circle(0, 0, mark_size * (mark_num - k)); //外側の円描いていく
      }

      pg.pop();
    }
  }
};
