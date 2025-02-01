import { LightningElement,wire } from 'lwc';
import testChannel from '@salesforce/messageChannel/testChannel__c';
import { subscribe,MessageContext,APPLICATION_SCOPE,unsubscribe } from 'lightning/messageService';

export default class BuyButton extends LightningElement {

    @wire(MessageContext) 
    messageContext;
    secoundSelectedMoviesToBuy =[];
    connectedCallback(){
        console.log('kutas');
        this.subscription = subscribe(this.messageContext,testChannel,(message)=>{
          this.handleMessage(message)  
        },{scope : APPLICATION_SCOPE});
    }

    handleMessage(message) {
        console.log('Odebrana wiadomość:', message);
    
        if (message && message.selectedMoviesToBuy) {
            this.secoundSelectedMoviesToBuy = [...message.selectedMoviesToBuy];
        } else {
            console.error('Niepoprawna wiadomość:', message);
        }
    
        console.log('Zaktualizowana lista filmów:', this.secoundSelectedMoviesToBuy);
    }
}