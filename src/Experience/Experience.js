import * as THREE from 'three'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Resources from './Utils/Resources.js'
import sources from './sources.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import Mouse from './Mouse.js'
import Objects from './Objects/Objects.js'
import Debug from './Utils/Debug.js'

let instance = null 

export default class Experience
{
    constructor(canvas)
    {
        if(instance)
        {
            return instance
        }

        instance = this

        this.canvas = canvas 
        this.sizes = new Sizes()
        this.time = new Time()
        this.resources = new Resources(sources)
        this.debug = new Debug()
        this.scene = new THREE.Scene()
        this.camera = new Camera()
        this.mouse = new Mouse()
        this.renderer = new Renderer()
        this.objects = new Objects()

        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        this.time.on('update', () =>
        {
            this.update()
        })
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    update()
    {
        this.objects.update()
        this.renderer.update()
    }
}