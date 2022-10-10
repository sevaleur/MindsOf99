import * as THREE from 'three'
import Experience from "../Experience";
import vertex from '../Shaders/bg_plane/vertex.glsl'
import fragment from '../Shaders/bg_plane/fragment.glsl'
import gsap from 'gsap'

export default class Room 
{
    constructor()
    {
        this.experience = new Experience()
        this.time = this.experience.time
        this.scene = this.experience.scene 
        this.sizes = this.experience.sizes
        this.camera = this.experience.camera
        this.mouse = this.experience.mouse
        this.raycaster = new THREE.Raycaster()
        this.currentIntersect = null; 

        this.setRoom()
    }

    setRoom()
    {
        this.room = new THREE.Group()

        this.room_geo = new THREE.PlaneBufferGeometry(this.sizes.width / 2, this.sizes.height - 100, 100, 100)

        this.room_mat = new THREE.ShaderMaterial(
        {
            vertexShader: vertex, 
            fragmentShader: fragment, 
            uniforms: 
            {
                u_color_a: { value: new THREE.Color(0x3fff00) },
                u_color_b: { value: new THREE.Color(0x0fff09) },
                u_time: { value: 0.0 },
                u_state: { value: 0 },
                u_hover_state: { value: 0 },
                u_hover: { value: new THREE.Vector2(0.5, 0.5) }
            }
        })

        this.bg = new THREE.Mesh(this.room_geo, this.room_mat)

        this.room.add(this.bg)

        this.scene.add(this.room)
        
    }

    update()
    {
        this.bg.material.uniforms.u_time.value = this.time.elapsed / 1000

        this.raycaster.setFromCamera(this.mouse.hover, this.camera.instance)

        const intersects = this.raycaster.intersectObjects(this.scene.children)

        if(intersects.length)
        {
            if(this.currentIntersect === null)
            {
                console.log('mouse enter')
                this.bg.material.uniforms.u_hover.value = intersects[0].uv
                gsap.to(this.bg.material.uniforms.u_hover_state,
                    {
                        value: 1, 
                        duration: 1
                    })
            }
    
            this.currentIntersect = intersects[0]
        } 
        else 
        {
            if (this.currentIntersect)
            {
                console.log('mouse leave')
                gsap.to(this.bg.material.uniforms.u_hover_state,
                    {
                        value: 0, 
                        duration: 1
                    })
            }
    
            this.currentIntersect = null
        }
    }
}