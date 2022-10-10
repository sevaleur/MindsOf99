import * as THREE from 'three'
import Experience from './Experience'

export default class Mouse 
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.mouse = new THREE.Vector2()
        this.hover = new THREE.Vector2()

        this.mouseMove()
        this.hoverMove()
    }

    mouseMove()
    {
        window.addEventListener('mousemove', (e) =>
        {
            this.mouse.x = e.clientX / this.sizes.width
            this.mouse.y = 1.0 - e.clientY / this.sizes.height
        }, false)
    }

    hoverMove()
    {
        window.addEventListener('mousemove', (e) =>
        {
            this.hover.x = e.clientX / this.sizes.width * 2 - 1
            this.hover.y = -(e.clientY / this.sizes.height * 2 - 1)
        })
    }
}