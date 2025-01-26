import { LightningElement } from 'lwc';
import myImage from '@salesforce/resourceUrl/moviePng';
import moviesInfoApi from '@salesforce/apex/GetMovieInformationFromApi.getMovieByTitle';
import buyMovieFromList from '@salesforce/apex/SaveMovieInDatabase.createMovieRecord';

export default class AskAboutMoviesCollection extends LightningElement {
    data = []; 
    selectedMoviesToBuy = [];



    columns = [
        { label: 'Tytuł', fieldName: 'name' },
        { label: 'Data produkcji', fieldName: 'productionDate', type: 'date' },
        { label: 'Koszty produkcji', fieldName: 'productionPrice', type: 'currency' },
        { label: 'Cena wykupu', fieldName: 'price', type: 'currency' },
    ];

    movieSiteLogo = myImage;

    connectedCallback() {
        this.fetchMovies();
    }

    fetchMovies() {
        moviesInfoApi()
        .then(result => {
            console.log(result);
            this.data = Object.keys(result).map(key => ({
                id: key,
                ...result[key],
                price: this.createPrice(result[key])
            }));
        })
            .catch((error) => {
                this.error = error;
                console.error('Błąd pobierania filmów:', error);
            });
    }

    createPrice() {
        const min = 1000;
        const max = 9000;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    handleClick(event) {
        const movieId = event.target.dataset.id;
        const selectedMovie = this.data.find(movie => movie.id === movieId);
        if (selectedMovie) {
            const movieCopy = JSON.parse(JSON.stringify(selectedMovie));
            this.selectedMoviesToBuy = [...this.selectedMoviesToBuy, movieCopy];
        } else {
            console.error('Nie znaleziono filmu o podanym id:', movieId);
        }
    }
    
    
}
