angular.module('mainApp', ['ngMessages'])
    .config(function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
    })
    .controller('RootCtrl', function($http, $sce) {
        var vm = this;
        vm.searchWord = '';
				vm.formInvalid = false;

				vm.trustSrc = function(src) {
				  return $sce.trustAsResourceUrl(src);
				};

        vm.submitForm = function() {
            if (vm.searchForm.$valid) {
                vm.searchWord = vm.searchText;
                vm.searchText = null;
								vm.clearResultsArea();
                vm.searchFlickr(vm.searchWord);
								vm.formInvalid = false;
            } else {
								vm.formInvalid = true;
						};
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
                    },
                    function(response) {
                        alert('error');
                    });
        };

				vm.clearResultsArea = function() {
					var el = document.querySelectorAll('img.image');
					el.innerHTML = '';
				};

    });
