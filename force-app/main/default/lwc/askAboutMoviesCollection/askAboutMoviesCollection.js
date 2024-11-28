import { LightningElement } from 'lwc';
import myImage from '@salesforce/resourceUrl/moviePng';
import moviesInfoApi from '@salesforce/apex/GetMovieInformationFromApi.getMovieByTitle';

export default class AskAboutMoviesCollection extends LightningElement {
    filmy =[];
    data = [
        {
            id: '1',
            name: 'Inception',
            productionYear: '1996',
            price: 10000,
            time: '2024-11-01',
        },
        {
            id: '2',
            name: 'Inception',
            productionYear: '1996',
            price: 10000,
            time: '2024-11-01',
        }
    ];

    columns = [
        { label: 'Tytuł', fieldName: 'name' },
        { label: 'Rok produkcji', fieldName: 'productionYear' },
        { label: 'Cena', fieldName: 'price',type: 'currency'},
        { label: 'Okres trwania wykupu', fieldName: 'time', type: 'date' },
    ];



    movieSiteLogo = myImage;
    todayDate;
    currentMonth;
    currentMonthName;
    monthNames = [
        'styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec',
        'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'
    ];

    async connectedCallback() {
        const today = new Date();
        this.currentMonthName = this.monthNames[today.getMonth()];
        await moviesInfoApi().then(data => {
            this.filmy = data;
            console.log(this.filmy);
        }).catch(error => {
            console.log(error);
        });
    }
}
