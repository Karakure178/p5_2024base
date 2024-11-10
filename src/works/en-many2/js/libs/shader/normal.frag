precision highp float;
precision highp int;

varying vec2 vTexCoord;

uniform sampler2D u_tex;
uniform sampler2D u_tex2;
uniform float u_time;
uniform vec2 u_resolution;

float pi=3.14159265358979;

// ボロノイ図をUVの値につかう
float rand(vec2 x){
  return fract(cos(mod(dot(x,vec2(13.9898,8.141)),3.14))*43758.5453);
}

vec2 rand2(vec2 x){
  return fract(cos(mod(vec2(dot(x,vec2(13.9898,8.141)),
  dot(x,vec2(3.4562,17.398))),vec2(3.14)))*43758.5453);
}

// Based on https://www.shadertoy.com/view/ldl3W8
// The MIT License
// Copyright © 2013 Inigo Quilez
vec3 iq_voronoi(vec2 x,vec2 size,vec2 stretch,float randomness,vec2 seed){
  vec2 n=floor(x);
  vec2 f=fract(x);
  
  vec2 mg,mr,mc;
  float md=8.;
  for(int j=-1;j<=1;j++)
  for(int i=-1;i<=1;i++){
    vec2 g=vec2(float(i),float(j));
    vec2 o=randomness*rand2(seed+mod(n+g+size,size));
    vec2 c=g+o;
    vec2 r=c-f;
    vec2 rr=r*stretch;
    float d=dot(rr,rr);
    
    if(d<md){
      mc=c;
      md=d;
      mr=r;
      mg=g;
    }
  }
  
  md=8.;
  for(int j=-2;j<=2;j++)
  for(int i=-2;i<=2;i++){
    vec2 g=mg+vec2(float(i),float(j));
    vec2 o=randomness*rand2(seed+mod(n+g+size,size));
    vec2 r=g+o-f;
    vec2 rr=(mr-r)*stretch;
    if(dot(rr,rr)>.00001)
    md=min(md,dot(.5*(mr+r)*stretch,normalize((r-mr)*stretch)));
  }
  
  return vec3(md,mc+n);
}

vec4 voronoi(vec2 uv,vec2 size,vec2 stretch,float intensity,float randomness,float seed){
  uv*=size;
  vec3 v=iq_voronoi(uv,size,stretch,randomness,rand2(vec2(seed,1.-seed)));
  return vec4(v.yz,intensity*length((uv-v.yz)*stretch),v.x);
}

const float scale_x=10.;
const float scale_y=10.;
const float stretch_x=1.62;
const float stretch_y=1.;
const float intensity=1.;
const float randomness=.85;

  float random(vec2 c){
    return fract(sin(dot(c.xy ,vec2(12.9898,78.233))) * 43758.5453);
  }

void main(){
    vec2 uv=vTexCoord;
  
    float minSize=min(u_resolution.x,u_resolution.y);
    vec4 voronoiColor=voronoi((uv),vec2(scale_x,scale_y),vec2(stretch_y,stretch_x),intensity,randomness,0.);
    float celler=voronoiColor.z;
  
    // fractでリピートできる
    vec4 tex=texture2D(u_tex,fract((uv+(celler*0.08))));
    //vec4 tex2=texture2D(u_tex2,uv);
    vec4 tex2=texture2D(u_tex2,fract((sin(uv)+(celler*0.2))));
    
    // white noise用
    float interval = 3.0;
    float strength = smoothstep(interval * 0.5, interval, interval - mod(u_time, interval));
    float whiteNoise = (random(uv + mod(u_time, 10.0)) * 2.0 - 1.0) * (0.15 + strength * 0.15);

    
    // step 関数でしきい値処理 tex1.a が完全に 0 のピクセルだけを tex2 の色に置き換えると、アンチエイリアスで tex1.a が 0 に近い中間値になったピクセルが境界線のように見えてしまいます。そのため、しきい値を使って境界付近をなめらかに処理することが効果的です。
    // αチャンネルのしきい値を設定
    float threshold = 0.6;

    // tex1のα値がthreshold以下ならtex2の色を使う
    float mask = step(threshold, tex2.a);
    
    
    tex = mix(tex, tex2, mask);
    gl_FragColor = tex  + whiteNoise;
    //gl_FragColor = vec4(0.58, 0.64, 0.95, 1.00);
}