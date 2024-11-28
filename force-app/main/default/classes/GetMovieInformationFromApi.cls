public without sharing class GetMovieInformationFromApi {
    @AuraEnabled
    public static Map<String,Object> getMovieByTitle() {
        List<String> poka = new List<String>();
        Map<String,Object> poka1 = new Map<String,Object>();
        Http http = new Http();
        HttpRequest request = new HttpRequest(); 
        Integer maxAttempts = 50;
        Integer attempts = 0;

        while (poka.size() < 5 && attempts < maxAttempts) { 
            attempts++;
            String movieID = createRandomnumber(); 
            request.setEndpoint('http://www.omdbapi.com/?apikey=' + getApiKey() + '&i=tt' + movieID);
            request.setMethod('GET');

            try {
                HttpResponse response = http.send(request);

                if (response.getStatusCode() == 200) {
                    Map<String, Object> results = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
                    if (results.containsKey('Response') && String.valueOf(results.get('Response')).equalsIgnoreCase('True')) {
                        String movieTitle = String.valueOf(results.get('Title'));
                        if (results.containsKey('Plot') && results.get('Plot') != 'N/A' && results.get('Plot') != null && !movieTitle.contains('#')) {
                            if (!poka.contains(movieTitle)) { 
                                poka.add(movieTitle);
                                poka1.put(movieTitle, results);
                            }
                        }
                    } 
                }
            } catch (Exception e) {
                System.debug('Exception occurred: ' + e.getTypeName() + ' - ' + e.getMessage());
            }
        }

        if (attempts == maxAttempts) {
            System.debug('Osiągnięto maksymalną liczbę prób.');
        }

        System.debug('Lista tytułów filmów: ' + poka);
        System.debug('mapa' + poka1);

        return poka1;
    }

    public static String createRandomnumber() {
        Integer randomNumber = Math.mod(Math.abs(Crypto.getRandomInteger()), 9000000) + 1000000;
        return String.valueOf(randomNumber);
    }

    public static String getApiKey() {
        // Zamiast tego użyj Custom Settings lub Custom Metadata
        return '3c14de19';
    }
}
