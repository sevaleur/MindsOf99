import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import Experience from './Experience'
import vShader from './Shaders/composer/vertex.glsl'
import fShader from './Shaders/composer/fragment.glsl'

export default class Renderer
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes 
        this.time = this.experience.time
        this.canvas = this.experience.canvas 
        this.scene = this.experience.scene 
        this.camera = this.experience.camera
        this.mouse = this.experience.mouse

        this.setInstance()
        this.composerPass()
    }

    setInstance()
    {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas, 
            alpha: true, 
            antialias: true,
        })
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
        this.instance.setClearColor(new THREE.Color(0x0400ff))
    }

    composerPass()
    {
        this.composer = new EffectComposer(this.instance)
        this.renderPass = new RenderPass(this.scene, this.camera.instance)
        this.composer.addPass(this.renderPass)

        this.effect = {
            uniforms: 
            {
                'tDiffuse': { value: null },
                'u_resolution': { value: new THREE.Vector2(1., this.sizes.width / this.sizes.height) },
                'u_mouse': { value: new THREE.Vector2(-10, -10) },
                'u_velo': { value: 0 },
            },
            vertexShader: vShader,
            fragmentShader: fShader, 
        }

        this.customPass = new ShaderPass(this.effect)
        this.customPass.renderToScreen = true 

        this.composer.addPass(this.customPass)
    }

    resize()
    {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    update()
    {
        this.customPass.uniforms.u_mouse.value = this.mouse.mouse
        this.composer.render()
        /* this.instance.render(this.scene, this.camera.instance) */
    }
}