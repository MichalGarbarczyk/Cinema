public without sharing class GetMovieInformationFromApi {
    public static void getMovieByTitle() {
        List<String> poka = new List<String>();
        Http http = new Http();
        HttpRequest request = new HttpRequest(); 

        while (poka.size() < 5) { 
            String movieID = createRandomnumber(); 
            request.setEndpoint('http://www.omdbapi.com/?apikey=3c14de19&i=tt' + movieID);
            request.setMethod('GET');

            try {
                HttpResponse response = http.send(request);

                if (response.getStatusCode() == 200) {
                    Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
                    String movieTitle = String.valueOf(results.get('Title'));
                    if (results.containsKey('Plot') && results.get('Plot') != 'N/A' && results.get('Plot') != null && !movieTitle.contains('#')) {
                        String title = (String) results.get('Title');
                        if (!poka.contains(title)) { 
                            poka.add(title);
                        }
                    }

                    // if (results.containsKey('Ratings')) {
                    //     List<Object> ratings = (List<Object>) results.get('Ratings');
                    //     for (Object ratingObj : ratings) {
                    //         Map<String, Object> rating = (Map<String, Object>) ratingObj;
                    //         System.debug('Ocena z ' + rating.get('Source') + ': ' + rating.get('Value'));
                    //     }
                    //f }
                } else {
                    System.debug('Error: ' + response.getStatusCode());
                }
            } catch (Exception e) {
                System.debug('Exception occurred: ' + e.getMessage());
            }
        }

        System.debug('Lista tytułów filmów: ' + poka);
    }

    public static String createRandomnumber() {
        Integer randomNumber = Math.mod(Math.abs(Crypto.getRandomInteger()), 9000000) + 1000000;
        return String.valueOf(randomNumber);
    }
}
