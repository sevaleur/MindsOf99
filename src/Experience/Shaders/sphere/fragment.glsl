uniform float u_time; 
uniform vec3 u_surface_color;
uniform vec3 u_depth_color; 
uniform float u_color_offset; 
uniform float u_color_multiplier; 

varying float v_elevation;

void main()
{
    float mixed_strength = (v_elevation + u_color_offset) * u_color_multiplier; 

    vec3 mix_color = mix(u_depth_color, u_surface_color, mixed_strength);

    gl_FragColor = vec4(mix_color, 1.0);
}