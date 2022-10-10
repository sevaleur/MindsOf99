import * as THREE from 'three'
import Experience from './Experience.js'

export default class Camera 
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        
        this.setInstance()
    }

    setInstance()
    {
        this.camera_group = new THREE.Group()
        this.scene.add(this.camera_group)

        this.instance = new THREE.PerspectiveCamera(
            2 * Math.atan((this.sizes.height / 2) / 600) * (180 / Math.PI),
            this.sizes.width / this.sizes.height,
            0.01,
            2000
        )
        this.instance.position.set(0, 0, 600)
        this.camera_group.add(this.instance)
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }
}