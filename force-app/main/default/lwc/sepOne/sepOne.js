import { LightningElement, wire } from 'lwc';
import testChanell from '@salesforce/messageChannel/testChannel__c';
import { publish, subscribe, MessageContext, APPLICATION_SCOPE, unsubscribe } from 'lightning/messageService';

export default class SepOne extends LightningElement {
    subscription;
    textHereSrakawraca = '';

    @wire(MessageContext)
    messageContext;

    // Wysyłanie wiadomości
    handleClick(){
        const message = {
            displayIcon: true,
            textHere: 'To jest wiadomość początkowa z SepOne'
        };
        publish(this.messageContext, testChanell, message);
    }

    // Subskrypcja wiadomości
    connectedCallback(){
        this.subscription = subscribe(this.messageContext, testChanell, (message) => {
            this.handleMessage(message);
        }, {scope: APPLICATION_SCOPE});
    }

    handleMessage(message){
        console.log('Otrzymana wiadomość w SepOne:', message);
        // Odbiór wiadomości zwrotnej
        this.textHereSrakawraca = message.textHereSrakawraca || 'Brak wiadomości zwrotnej';
    }

    disconnectedCallback() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }
}
