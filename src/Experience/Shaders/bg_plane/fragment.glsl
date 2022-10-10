uniform vec3 u_color_a; 
uniform vec3 u_color_b; 

varying vec2 v_uv; 
varying float v_noise; 

void main()
{   
    //gl_FragColor = vec4(v_dist, 0., 0., 1.0);
    gl_FragColor = vec4(u_color_a, 1.0);
    gl_FragColor.rgb += 0.1 * vec3(v_noise);
}