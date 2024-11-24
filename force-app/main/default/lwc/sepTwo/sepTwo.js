import { LightningElement, wire,api } from 'lwc';
import testChanell from '@salesforce/messageChannel/testChannel__c';
import { subscribe, MessageContext, APPLICATION_SCOPE, unsubscribe } from 'lightning/messageService';
import { publish } from 'lightning/messageService';

export default class SepTwo extends LightningElement {
    @api recordId;
    subscription;
    displayIcon = false;
    textHere = '';

    @wire(MessageContext)
    messageContext;

    // Subskrypcja wiadomości
    connectedCallback(){
        this.subscription = subscribe(this.messageContext, testChanell, (message) => {
            this.handleMessage(message);
        }, {scope: APPLICATION_SCOPE});
    }

    handleMessage(message){
        console.log('Otrzymana wiadomość w SepTwo:', message);
        this.displayIcon = message.displayIcon || false;
        this.textHere = message.textHere || '';
    }

    // Wysyłanie wiadomości zwrotnej
    handleClickzwrot(){
        const message = {
            textHereSrakawraca: 'To jest wiadomość zwrotna z SepTwo'
        };
        publish(this.messageContext, testChanell, message);
    }

    disconnectedCallback() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }
}
