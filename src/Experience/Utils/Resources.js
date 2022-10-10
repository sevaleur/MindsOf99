import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import EventEmitter from './EventEmitter.js'

export default class Resources extends EventEmitter
{
    constructor(sources)
    {
        super()
        
        this.items = {}
        this.sources = sources 
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()
    }

    setLoaders()
    {
        this.loaders = {}
        this.loaders.textureLoader = new THREE.TextureLoader()
        this.loaders.gltfLoader = new GLTFLoader()
    }

    startLoading()
    {
        for(const source of this.sources)
        {
            switch(source.type)
            {
                case 'texture':
                    this.loaders.textureLoader.load(
                        source.path,
                        (file) =>
                        {
                            this.sourceLoaded(source, file)
                        }
                    )
                    break
                case 'gltf':
                    this.loaders.gltfLoader.load(
                        source.path, 
                        (file) =>
                        {
                            this.sourceLoaded(source, file)
                        }
                    )
                    break
                default: 
                    break
            }
        }
    }

    sourceLoaded(source, file)
    {
        this.items[source.name] = file
        console.log(this.items)

        this.loaded++ 

        if(this.loaded === this.toLoad)
        {
            this.trigger('ready')
        }
    }
}