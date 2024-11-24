import { LightningElement,api } from 'lwc';

export default class ParentComponent extends LightningElement {

    parentVariable = 'Inpute For Child';
    zmiennaZDziacka;

    changeChildsValue(){
        this.template.querySelector('c-child-component').jebac('pizda1') 
    }

    handleSendToParentevent(event){
        console.log(event.detail);
        this.zmiennaZDziacka = event.detail;
    }
}