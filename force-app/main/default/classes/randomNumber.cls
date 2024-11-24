public with sharing class randomNumber {

    public static List<String> randomWithLimit(Integer upperLimit){
        List<String> randomNumbers = new List<String>();
        for (Integer i = 0; i < 4; i++) {
            Integer randomNumber = Math.mod(Math.abs(Crypto.getRandomInteger()), 9000000) + 1000000;
            String randomNumberString = String.valueOf(randomNumber);
            randomNumbers.add(randomNumberString);
        }
       return randomNumbers;
    }
}