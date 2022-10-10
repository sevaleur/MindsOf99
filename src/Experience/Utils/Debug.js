import dat from 'dat.gui'

export default class debug
{
    constructor()
    {
        this.active = window.location.hash === '#debug'

        this.debug_object = {}

        if(this.active)
        {
            this.ui = new dat.GUI()
        }
    }
}