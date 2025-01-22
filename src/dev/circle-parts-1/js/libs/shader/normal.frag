precision highp float;
precision highp int;

varying vec2 vTexCoord;

uniform sampler2D u_tex;
uniform float u_time;
uniform vec2 u_resolution;

const float intensity=1.;
const float randomness=.85;

  float random(vec2 c){
    return fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453);
  }

void main(){
    vec2 uv=vTexCoord;  
    
    // white noise用
    float interval = 3.0;
    float strength = smoothstep(interval * 0.5, interval, interval - mod(u_time, interval));
    float whiteNoise = (random(uv + mod(u_time, 10.0)) * 2.0 - 1.0) * (0.15 + strength * 0.15);
    
    // 参考
    //https://qiita.com/edo_m18/items/d166653ac0dccbc607dc
    uv = floor(uv * 200.0) / 200.0;
    vec4 tex = texture2D(u_tex, uv);
    gl_FragColor = tex + whiteNoise;
}