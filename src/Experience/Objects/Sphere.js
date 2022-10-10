import * as THREE from 'three'
import Experience from "../Experience";
import vShader from '../Shaders/sphere/vertex.glsl'
import fShader from '../Shaders/sphere/fragment.glsl'
import gsap from 'gsap'

export default class Sphere 
{
    constructor()
    {
        this.experience = new Experience()
        this.time = this.experience.time
        this.scene = this.experience.scene 
        this.resources = this.experience.resources
        this.sizes = this.experience.sizes
        this.camera = this.experience.camera
        this.debug = this.experience.debug
        this.mouse = this.experience.mouse

        this.setSphere()
        this.debugScene()
    }

    setSphere()
    {
        this.geo = new THREE.SphereBufferGeometry(70, 54, 54)

        this.debug.debug_object.depth_color = 0x102101
        this.debug.debug_object.surface_color = 0x000000

        this.mat = new THREE.ShaderMaterial({
            uniforms: 
            {
                u_time: { value: 0.0 },

                // big distortion
                u_big_dist: { value: 1.7 },
                u_big_dist_freq: { value: new THREE.Vector2(0.304, 1.931) },
                u_big_dist_speed: { value: 4.2 },

                // small distortion
                u_sm_dist: { value: 20.0 },
                u_sm_dist_freq: { value: 10.0 },
                u_sm_dist_speed: { value: 8.3 },

                // color
                u_depth_color: { value: new THREE.Color(this.debug.debug_object.depth_color) },
                u_surface_color: { value: new THREE.Color(this.debug.debug_object.surface_color) },
                u_color_offset: { value: 65. },
                u_color_multiplier: { value: 0.2 }
            },
            vertexShader: vShader,
            fragmentShader: fShader,
        })

        this.mesh = new THREE.Mesh(this.geo, this.mat)
        this.mesh.position.set(0, 0, 0)
        this.scene.add(this.mesh)
    }

    debugScene()
    {
        if(this.debug.active)
        {
            // debug big distortion
            this.debug.ui.add(this.mat.uniforms.u_big_dist, 'value').min(0).max(500).step(0.001).name('big distortion')
            this.debug.ui.add(this.mat.uniforms.u_big_dist_freq.value, 'x').min(0).max(10).step(0.001).name('bigdist freq X')
            this.debug.ui.add(this.mat.uniforms.u_big_dist_freq.value, 'y').min(0).max(10).step(0.001).name('bigdist freq Y')
            this.debug.ui.add(this.mat.uniforms.u_big_dist_speed, 'value').min(0).max(5).step(0.001).name('big dist speed')

            // debug small distortion
            this.debug.ui.add(this.mat.uniforms.u_sm_dist, 'value').min(0).max(20).step(0.001).name('small dist')
            this.debug.ui.add(this.mat.uniforms.u_sm_dist_freq, 'value').min(0).max(10).step(0.001).name('small dist freq')
            this.debug.ui.add(this.mat.uniforms.u_sm_dist_speed, 'value').min(0).max(10).step(0.001).name('small dist speed')

            // debug color
            this.debug.ui.add(this.mat.uniforms.u_color_offset, 'value').min(0).max(100).step(0.0001).name('color offset')
            this.debug.ui.add(this.mat.uniforms.u_color_multiplier, 'value').min(0).max(10).step(0.001).name('color multiplier')
            this.debug.ui.addColor(this.debug.debug_object, 'depth_color').onChange(() => { this.mat.uniforms.u_depth_color.value.set(this.debug.debug_object.depth_color) })
            this.debug.ui.addColor(this.debug.debug_object, 'surface_color').onChange(() => { this.mat.uniforms.u_surface_color.value.set(this.debug.debug_object.surface_color) })
        }
    }

    update()
    {
        if(this.mesh)
        {
            this.mesh.material.uniforms.u_time.value = this.time.elapsed / 3000

            gsap.to(this.camera.instance.position, 
                {
                    x: this.mouse.hover.x * 10,
                    duration: 1
                })
            this.camera.instance.lookAt(0, 0, 0)
            gsap.to(this.mesh.position, 
                {
                    y: this.mouse.hover.y * 10,
                    duration: 1
                })
        }
    }
}