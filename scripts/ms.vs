precision mediump float;

attribute vec4 a_position;
uniform mat4 u_projectionMatrix;

uniform mat4 rot;
uniform float phase;

const float PI = 3.1415;
const float degToRad = PI / 180.0;

void main()
{
    vec4 pos = a_position;

    float phi = degToRad * phase;
    pos.z = 15. * cos(pos.x * PI * 20.0 + phi);

    gl_Position = u_projectionMatrix * rot * pos;
}
