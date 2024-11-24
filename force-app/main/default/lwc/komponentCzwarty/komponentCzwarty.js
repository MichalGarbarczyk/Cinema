import { LightningElement } from 'lwc';

export default class KomponentCzwarty extends LightningElement {

    zapisuje;  // @track not needed for primitive types
    handleClickButton(event) {
        const inputInnerText = this.template.querySelector('lightning-input').value;
        console.log(inputInnerText);
        this.zapisuje = inputInnerText;  // Use the input value instead of event.target.value
        console.log(this.zapisuje);  // Corrected spelling of zapisuje
    }
}