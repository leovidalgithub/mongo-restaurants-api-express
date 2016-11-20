angular.module('myServices')
	.factory("DataService", function( $http, $rootScope, $location ) {

			const limit = 10;
			$rootScope.maxSize = 5;

			function getPages( page, d ) {
				const { data } = d;
				$rootScope.totalResults = data.total;
				$rootScope.totalPages = Math.round(data.total/limit);
				$rootScope.currentPage = page;
				return data.docs;
			}

			function getRestaurants( page ) {
				const url = '/restaurants';
				return $http.get( url, { params: { limit, page } } )
											.then( getPages.bind(null, page) )
			}

			function getRestaurantsByBorough( page, borough ) {
				const url = `/restaurants/borough/${borough}`;
				return $http.get( url, { params: { limit, page } } )
											.then( getPages.bind(null, page) )
			}

			function getRestaurantsByCuisine( page, borough ) {
				const url = `/restaurants/cuisine/${borough}`;
				return $http.get( url, { params: { limit, page } } )
											.then( getPages.bind(null, page) )
			}

			function getBoroughs() {
				const url = '/boroughs';
				return $http.get( url ).then( d => d.data )
			}

			function getCuisines() {
				const url = '/cuisines';
				return $http.get( url ).then( d => d.data )
			}

			function getRestaurantDetails(id) {
				const url = `/restaurant/${id}`;
				return $http.get( url ).then( d => d.data )
			}

			function updateRestaurant(id, data) {
				const url = `/restaurant/${id}`;
				const method = 'POST';
				//const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
				console.log("updating restaurant " + id)
				return $http( { url, method, data } )
									.catch( err => console.log("someting went worng w/ the update!") )
			}

			return { getRestaurants, getBoroughs, getRestaurantsByBorough, getRestaurantsByCuisine, getCuisines, getRestaurantDetails, updateRestaurant }

	})