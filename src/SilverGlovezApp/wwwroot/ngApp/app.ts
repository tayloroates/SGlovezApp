namespace SilverGlovezApp {

    angular.module('SilverGlovezApp', ['ui.router', 'ngResource', 'ui.bootstrap']).config((
        $stateProvider: ng.ui.IStateProvider,
        $urlRouterProvider: ng.ui.IUrlRouterProvider,
        $locationProvider: ng.ILocationProvider
    ) => {
        // Define routes
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '/ngApp/views/home.html',
                controller: SilverGlovezApp.Controllers.HomeController,
                controllerAs: 'controller'
            })
            .state('secret', {
                url: '/secret',
                templateUrl: '/ngApp/views/secret.html',
                controller: SilverGlovezApp.Controllers.SecretController,
                controllerAs: 'controller'
            })
            .state('login', {
                url: '/login',
                templateUrl: '/ngApp/views/login.html',
                controller: SilverGlovezApp.Controllers.LoginController,
                controllerAs: 'controller'
            })
            .state('register', {
                url: '/register',
                templateUrl: '/ngApp/views/register.html',
                controller: SilverGlovezApp.Controllers.RegisterController,
                controllerAs: 'controller'
            })
            .state('externalRegister', {
                url: '/externalRegister',
                templateUrl: '/ngApp/views/externalRegister.html',
                controller: SilverGlovezApp.Controllers.ExternalRegisterController,
                controllerAs: 'controller'
            }) 
            .state('about', {
                url: '/about',
                templateUrl: '/ngApp/views/about.html',
                controller: SilverGlovezApp.Controllers.AboutController,
                controllerAs: 'controller'
            })
            .state('contact', {
                url: '/contact',
                templateUrl: '/ngApp/views/contact.html',
                controller: SilverGlovezApp.Controllers.ContactController,
                controllerAs: 'controller'
            })
            .state('apply', {
                url: '/apply',
                templateUrl: '/ngApp/views/apply.html',
                controller: SilverGlovezApp.Controllers.ApplyController,
                controllerAs: 'controller',
                data: {
                    requiresAuthentication: true
                }
            })
            .state('manage', {
                url: '/manage',
                templateUrl: '/ngApp/views/manage.html',
                controller: SilverGlovezApp.Controllers.ManageController,
                controllerAs: 'controller',
                 data: {
                    requiresAuthentication: true
                }
            })
            .state('delete', {
                url: '/delete/:id',
                templateUrl: '/ngApp/views/delete.html',
                controller: SilverGlovezApp.Controllers.ManageDeleteController,
                controllerAs: 'controller',
                data: {
                    requiresAuthentication: true
                }
            })
            .state('edit', {
                url: '/edit/:id',
                templateUrl: '/ngApp/views/edit.html',
                controller: SilverGlovezApp.Controllers.ManageEditController,
                controllerAs: 'controller',
                data: {
                    requiresAuthentication: true
                }
            })
            .state('details', {
                url: '/details/:id',
                templateUrl: '/ngApp/views/details.html',
                controller: SilverGlovezApp.Controllers.PlayerDetailController,
                controllerAs: 'controller',
                data: {
                    requiresAuthentication: true
                }
            })
            .state('signup', {
                url: '/signup',
                templateUrl: '/ngApp/views/signup.html',
                controller: SilverGlovezApp.Controllers.SignupController,
                controllerAs: 'controller'
               
            })
            .state('notFound', {
                url: '/notFound',
                templateUrl: '/ngApp/views/notFound.html'
            });

        // Handle request for non-existent route
        $urlRouterProvider.otherwise('/notFound');

        // Enable HTML5 navigation
        $locationProvider.html5Mode(true);
    });

    
    angular.module('SilverGlovezApp').factory('authInterceptor', (
        $q: ng.IQService,
        $window: ng.IWindowService,
        $location: ng.ILocationService
    ) =>
        ({
            request: function (config) {
                config.headers = config.headers || {};
                config.headers['X-Requested-With'] = 'XMLHttpRequest';
                return config;
            },
            responseError: function (rejection) {
                if (rejection.status === 401 || rejection.status === 403) {
                    $location.path('/login');
                }
                return $q.reject(rejection);
            }
        })
    );

    angular.module('SilverGlovezApp').config(function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    });

    angular.module('SilverGlovezApp').run((
        $rootScope: ng.IRootScopeService,
        $state: ng.ui.IStateService,
        accountService: SilverGlovezApp.Services.AccountService
    ) => {
        $rootScope.$on('$stateChangeStart', (e, to) => {
            // protect non-public views
            if (to.data && to.data.requiresAuthentication) {
                if (!accountService.isLoggedIn()) {
                    e.preventDefault();
                    $state.go('login');
                }
            }
        });
    });

}
