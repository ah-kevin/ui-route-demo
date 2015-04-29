/**
 * Created by Lennon on 15/4/28.
 */
angular.module('uiRouterDemo.contacts', ["ui.router"])
    .config(['$stateProvider', "$urlRouterProvider", function ($stateProvider, $urlRouteProvider) {
        $stateProvider
            //////////////
            // Contacts //
            //////////////

            .state('contacts', {
                abstract: true,
                url: '/contacts',
                templateUrl: 'contacts/contacts.html',
                /* resolve在state配置参数中，是一个对象(key-value)，每一个value都是一个可以依赖注入的函数，并且返回                       的是一个promise(当然也可以是值，resloved defer)。 我们通常会在resolve中，进行数据获取的操作，然后返回一个promise*/
                resolve: {
                    contacts: ['contacts', function (contacts) {
                        return contacts.all();
                    }]
                },
                controller: ['$scope', '$state', 'contacts', 'utils',
                    function ($scope, $state, contacts, utils) {
                        $scope.contacts = contacts;
                        $scope.goToRandom = function () {
                            var randId = utils.newRandomKey($scope.contacts, "id", $state.params.contactId);
                            $state.go('contacts.detail', {contactId: randId});
                        }
                    }]

            })

            /////////////////////
            // Contacts > List //
            /////////////////////
            .state('contacts.list', {
                url: '',
                templateUrl: "contacts/contacts-list.html"
            })

            ///////////////////////
            // Contacts > Detail //
            ///////////////////////
            .state('contacts.detail',{
                url:'/{contactId:[0-9]{1,4}}',
                views:{
                    "":{
                        templateUrl:'contacts/contacts.detail.html',
                        controller:['$scope','$stateParams','utils', function ($scope,$stateParams,utils) {
                            $scope.contact=utils.findById($scope.contacts,$stateParams.contactId);
                        }]
                    },
                    'hint@':{
                        template:'This is contacts.detail populating the "hint" ui-view'
                    },

                    'menuTip':{
                        templateProvider:['$stateParams', function ($stateParams) {
                            return '<hr><small class="muted">Contact ID: ' + $stateParams.contactId + '</small>';
                        }]
                    }
                }
            })

         //////////////////////////////
        // Contacts > Detail > Item //
        //////////////////////////////

        .state('contacts.detail.item', {

          url: '/item/:itemId',
          views: {
            '': {
              templateUrl: 'contacts/contacts.detail.item.html',
              controller: ['$scope', '$stateParams', '$state', 'utils',
                function (  $scope,   $stateParams,   $state,   utils) {
                  $scope.item = utils.findById($scope.contact.items, $stateParams.itemId);

                  $scope.edit = function () {

                    $state.go('.edit', $stateParams);
                  };
                }]
            },

            // Here we see we are overriding the template that was set by 'contacts.detail'
            'hint@': {
              template: ' This is contacts.detail.item overriding the "hint" ui-view'
            }
          }
        })

                /////////////////////////////////////
        // Contacts > Detail > Item > Edit //
        /////////////////////////////////////

        // Notice that this state has no 'url'. States do not require a url. You can use them
        // simply to organize your application into "places" where each "place" can configure
        // only what it needs. The only way to get to this state is via $state.go (or transitionTo)
        .state('contacts.detail.item.edit', {
          views: {

            // This is targeting the unnamed view within the 'contacts.detail' state
            // essentially swapping out the template that 'contacts.detail.item' had
            // inserted with this state's template.
            '@contacts.detail': {
              templateUrl: 'contacts/contacts.detail.item.edit.html',
              controller: ['$scope', '$stateParams', '$state', 'utils',
                function (  $scope,   $stateParams,   $state,   utils) {
                  $scope.item = utils.findById($scope.contact.items, $stateParams.itemId);
                  $scope.done = function () {
                    // Go back up. '^' means up one. '^.^' would be up twice, to the grandparent.
                    $state.go('^', $stateParams);
                  };
                }]
            }
          }
        });

    }])