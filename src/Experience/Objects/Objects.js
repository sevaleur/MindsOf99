import Sphere from "./Sphere";
import Room from "./Room";

export default class Objects 
{
    constructor()
    {
        this.sphere = new Sphere()
        this.room = new Room()

    }

    update()
    {
        this.sphere.update()
        this.room.update()
    }
}