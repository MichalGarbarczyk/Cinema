
public without sharing class GetMovieInformationFromApi {
    @AuraEnabled
    public static Map<String, Object> getMovieByTitle() {
        Map<String, Object> movieDetailsMap = new Map<String, Object>();
        List<String> movieIdImdbList = new List<String>{'1375666', '0816692','1853728','0361748','0137523'};
        
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        for(String moId :movieIdImdbList) {
        request.setEndpoint('http://www.omdbapi.com/?apikey=' + getApiKey() + '&i=tt' + moId);
        request.setMethod('GET');

        try {
            HttpResponse response = http.send(request);
            if (response.getStatusCode() == 200) {
                Map<String, Object> apiResponse = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
                String movieTitle = String.valueOf(apiResponse.get('Title'));

          
                    movieDetailsMap.put(movieTitle, apiResponse);

            } else {
                System.debug('Nieudane żądanie. Kod statusu: ' + response.getStatusCode());
            }
        } catch (Exception e) {
            System.debug('Wystąpił wyjątek: ' + e.getTypeName() + ' - ' + e.getMessage());
        }
    }
        System.debug('Zwrócone dane o filmach: ' + movieDetailsMap);
        return movieDetailsMap;
    }

    public static String getApiKey() {
        return '3c14de19';
    }
}
