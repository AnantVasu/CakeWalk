'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('mainCtrl', ['$scope', 'sharedProperties', function($scope, sharedProperties) {
        $scope.title = "Cake Walk"
        $scope.leftMainTab = function(){
            return sharedProperties.getLeftMainTab();
        }
        $scope.leftTabHref = sharedProperties.getLeftMainTabHref();

  }])
  //Controller for initial user login form
  .controller('loginCtrl', ['$scope','$http', '$location', 'sharedProperties', function($scope, $http, $location, sharedProperties) {
        $scope.inputName=  "",
        $scope.inputPassword= "",
        $scope.loginBool = false,
        //Retrieve and set contestant data
        $http.get('data/userData.json')
            .then(function(res){
            $scope.userData = res.data;
        }),
        $scope.leftTabHref = sharedProperties.getLeftMainTabHref()
        ,
        //Check user entered login form data against contestant data
        $scope.validate = function(){
            for(var i=0; i < $scope.userData.length ; i++){
                if(($scope.inputPassword) === ($scope.userData[i].passcode) && ($scope.inputName) === ($scope.userData[i].username) ){
                    $scope.loginBool = true;
                }
            }
            if($scope.loginBool){
                //Upon success change left nav-tab functionality
                sharedProperties.setLeftMainTab('Contestant View');
                $('#leftTab').attr('href','#/contestant');
                $location.path('/contestant');

            }
            else{
                alert("Invalid username or password");
                $scope.inputName = "";
                $scope.inputPassword = "";
            }
        }

  }])
  .controller('contestantCtrl', ['$scope', '$http', 'sharedProperties', function($scope, $http, sharedProperties) {
        $scope.totalReviews= sharedProperties.getAllReviews();
        $scope.lastindex = sharedProperties.getAllReviews().length;
        $scope.cursor = sharedProperties.getAllReviews().length;
        $scope.locations= [
            {name: "Glazed and Infused", address: "813 W Fulton Market", imgUrl: "img/glazed_and_infused.jpg"},
            {name: "Little Goat Bread", address: "820 W Randolph St.", imgUrl: "img/little_goat_bread.jpg"},
            {name: "Insomnia Cookies", address: "2260 N Lincoln Ave.", imgUrl: "img/insomnia_cookies.jpg"},
            {name: "Hoosier Mama Pie Company", address: "1618 ½ W. Chicago Ave.", imgUrl: "img/hoosier.jpg"},
            {name: "Floriole", address: "1220 W. Webster Ave.", imgUrl: "img/floriole.jpg" },
            {name: "Peerless Bread & Jam", address: "1400 W. 46th St.", imgUrl: "img/peerless_bread_and_jam.jpg"},
            {name: "Bang Bang Pie Shop", address: "2051 N. California Ave.", imgUrl: "img/bang_bang_pie_shop.jpg"},
            {name: "Weber's Bakery", address: "7055 W. Archer Ave.", imgUrl: "img/webers_bakery.jpg"},
            {name: "Dinkel's", address: "3329 N. Lincoln Ave.", imgUrl: "img/dinkels.jpg"},
            {name: "Delightful Pastries", address: "131 N. Clinton Ave.", imgUrl: "img/delightful_pasteries.jpg"}
        ],
        $scope.currentLocation = $scope.locations[$scope.cursor];
        $scope.review = {
            dessert: "",
            impressions: ""
        }
        $scope.submit = function() {
            /*BUG: HTTP POST NON-FUNCTIONAL
            $http({
                url: "data/reviewData.json",
                method: "POST",
                data: {   name: $scope.currentLocation.name,
                    dessert: $scope.review.dessert,
                    review: $scope.review.impressions,
                    date: new Date()
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .then(function (response) {
                    console.log("Posted data: " + data);
             });*/

            //Alternative to provide functionality - Saved as global data
            $scope.currentReview = {
                name: $scope.currentLocation.name,
                dessert: $scope.review.dessert,
                review: $scope.review.impressions,
                date: new Date()
            }

            $scope.totalReviews[$scope.lastindex]= $scope.currentReview;
            $scope.cursor= sharedProperties.getAllReviews().length;
            $scope.lastindex = $scope.lastindex = sharedProperties.getAllReviews().length;
            $scope.currentLocation = $scope.locations[$scope.cursor];
            $scope.review.impressions = "";
            $scope.review.dessert = "";
        }
    }])
  .controller('trackerCtrl', ['$scope', 'sharedProperties', function($scope,sharedProperties ) {
        $scope.totalReviews= sharedProperties.getAllReviews();

  }]);

