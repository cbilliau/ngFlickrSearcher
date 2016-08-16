angular.module('mainApp', ['ngMessages'])
    .config(function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
    })
    .controller('RootCtrl', function($http, $sce) {
        var vm = this;
        vm.searchWord = '';

        vm.submitForm = function() {
            if (vm.searchForm.$valid) {
                vm.searchWord = vm.searchText;
                vm.searchText = null;
                vm.searchFlickr(vm.searchWord);
            } else {};
        };

        vm.searchFlickr = function(keyword) {
            var url = 'https://api.flickr.com/services/rest';
            var api_key = '0c16967dc22fc2735d116f0fbb40a677';
            var request = {
                method: 'flickr.photos.search',
                api_key: api_key,
                tags: keyword,
                format: 'json',
                nojsoncallback: 1
            };
            $http({
                    method: 'GET',
                    url: url,
                    params: request
                })
                .then(function(response) {
                        vm.results = response.data.photos.photo;
                        console.log(vm.results.length);
                    },
                    function(response) {
                        alert('error');
                    });
        };

    });
