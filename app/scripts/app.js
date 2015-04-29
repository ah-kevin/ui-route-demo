/* jshint devel:true */
//创建app主模块,依赖2个模块
var uiRouterDemo = angular.module('uiRouterDemo', [
    'ui.router',
    'ngAnimate',
    'uiRouterDemo.contacts',
    'uiRouterDemo.contacts.service',
    'uiRouterDemo.utils.service',
]);
/**
 * 由于整个应用都会和路由打交道，所以这里把$state和$stateParams这两个对象放到$rootScope上，方便其它地方引用和注入。
 * 这里的run方法只会在angular启动的时候运行一次。
 * @param  {[type]} $rootScope
 * @param  {[type]} $state
 * @param  {[type]} $stateParams
 * @return {[type]}
 */
uiRouterDemo.run(['$rootScope', '$state', "$stateParams", function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
}]);

//配置路由
/*
 $urlRouterProvider(服务提供者) ——— 用来配置路由重定向
 $urlRouter(服务)
 $stateProvider(服务提供者) ——— 用来配置路由
 */
uiRouterDemo.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouteProvider) {
        $urlRouteProvider.otherwise("/")
            .when('/c?id', '/contacts/:id')
            .when('/user/:id', '/contacts/:id')

        $stateProvider

            //////////
            // Home //
            //////////
            .state("home", {
                url: '/',
                template: '<p class="lead">欢迎来到UI-route-Deom</p>' +
                '<p>Use the menu above to navigate. ' +
                'Pay attention to the <code>$state</code> and <code>$stateParams</code> values below.</p>' +
                '<p>Click these links—<a href="#/c?id=1">Alice</a> or ' +
                '<a href="#/user/42">Bob</a>—to see a url redirect in action.</p>'
            })
            //////////
            // 关于我 //
            //////////
            .state("about", {
                url: '/about',
                ///Showing off how you could return a promise from templateProvider
                templateProvider: ['$timeout', function ($timeout) {
                    return $timeout(function () {
                        return '<p class="lead">UI-Router Resources</p><ul>' +
                            '<li><a href="www.hf520.net">个人主页</a></li>'
                    }, 100);
                }]

            })
    }]
);