import { LightningElement,api } from 'lwc';

export default class SecoundComponent extends LightningElement {
 
    _coolProperty;

    @api
    get coolProperty () {
        return this._coolProperty;
    }
    set coolProperty(valeu){
        this._coolProperty = valeu.toUpperCase();

    }
}