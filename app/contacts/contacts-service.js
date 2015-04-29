/**
 * Created by Lennon on 15/4/28.
 */
angular.module('uiRouterDemo.contacts.service', [])


    .factory('contacts', ["$http", 'utils', function ($http, utils) {
        var path='data/contacts.json';
        var contacts=$http.get(path).then(function (resp) {
            return resp.data.contacts;
        });

        var factory={};
        factory.all= function () {
            return contacts;
        };

        factory.get = function (id) {
            return contacts.then(function () {
                return utils.findById(contacts,id);
            })
        };
        return factory;
    }]);