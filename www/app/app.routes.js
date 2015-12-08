(function(){
    app.config(function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $httpProvider, hammerDefaultOptsProvider) {

        // Load file in async behaviour
        $httpProvider.useApplyAsync(true);

        // Default url path 
        $urlRouterProvider.when('','/products');

        /*
         * Redirected to /notfound 
         * @if : URL not match with listed path
         */
        $urlRouterProvider.otherwise('/notfound');

        // Main state of application
        $stateProvider
        .state('main', {
            abstract: true,
            templateUrl: 'app/templates/main-view.html',
            resolve: {
                map: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        {
                            name: 'knitwearApp',
                            files: [
                                './app/services/sharedProperties.js'
                            ]
                        }
                    );
                }]
            }
        })

        // Main view for customization
        // Include navigation bas buttom bar
        .state('customemain', {
            //abstract: true,
            templateUrl: 'app/templates/customize/mainCustomize.html',
            controller: 'MainCustomizeController',
            resolve: {
                map: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        {
                            name: 'knitwearApp',
                            files: [
                                './app/controllers/customize/mainCustomize-controller.js',
                                './app/controllers/navigation/navigation-controller.js',
                                './app/directives/navigation/nav-bar.js',
                                './app/controllers/utility/customCheckbox-controller.js',
                                './app/directives/utility/file-upload.js',
                                './app/directives/utility/custom-checkbox.js',
                                './app/services/sharedProperties.js'
                            ]
                        }
                    );
                }]
            }
        })
        //show listing of products
        .state('main.products', {
            url: "/products",
            templateUrl: 'app/templates/product/products.html',
            controller: 'ProductController',
            resolve: {
                map:  ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        {
                            name: 'knitwearApp',
                            files: [
                                './app/controllers/product/product-controller.js'
                            ]
                        }
                    );
                }]
            }
        })
        // Customization for a product
        .state('customemain.customize', {
            url: "/customize/:productId",
            templateUrl: 'app/templates/customize/customize.html',
            controller: 'CustomizeController',
            resolve: {
                map:  ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        {
                            name: 'knitwearApp',
                            files: [
                                './app/controllers/customize/customize-controller.js'
                            ]
                        }
                    );
                }]
            }
        })
        // Path not found page
        .state('notfound', {
            url: "/notfound",
            templateUrl: 'app/templates/not-found.html'          
        });


    });
})();