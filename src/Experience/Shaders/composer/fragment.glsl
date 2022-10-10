uniform float u_time;
uniform sampler2D tDiffuse;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_velo;

varying vec2 v_uv;

float circle(vec2 uv, vec2 disc_center, float disc_radius, float border_size) {
		uv -= disc_center;
		uv *= u_resolution;
		float dist = sqrt(dot(uv, uv));
		return smoothstep(disc_radius + border_size, disc_radius-border_size, dist);
	}

void main()
{
    vec2 newUv = v_uv;

    float c = circle(v_uv, u_mouse, 0.0, 0.2);

    float r = texture2D(tDiffuse, newUv.xy += c * (0.1 * .5)).x;
    float g = texture2D(tDiffuse, newUv.xy += c * (0.1 * .525)).y;
    float b = texture2D(tDiffuse, newUv.xy += c * (0.1 * .55)).z;

    vec4 color = vec4(r, g, b, 1.);

    gl_FragColor = color;
}