
public with sharing class firstComponentCOntroller {
   
    @AuraEnabled(Cacheable=true)
    public static List<Account> getAccounts(){
        try {
            return [SELECT  id,Name,AccountNumber FROM Account LIMIT 5 ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}