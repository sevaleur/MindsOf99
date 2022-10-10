uniform float u_time; 
uniform vec2 u_hover;
uniform float u_hover_state; 

varying vec2 v_uv; 
varying float v_noise;

void main()
{
    vec3 newPos = position; 

    float dist = distance(uv, u_hover);

    newPos.z += u_hover_state * 10. * sin(dist * 10. + u_time);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);

    v_uv = uv; 
    v_noise = u_hover_state*sin(dist * 1. + u_time);
}