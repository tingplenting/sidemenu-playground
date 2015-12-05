angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('BrowseCtrl', function($scope) {

    $scope.num = {n1: 0, n2: 0 };
    // $scope.n1 = 1;
    // $scope.n2 = 1;
    $scope.sum = function() { return $scope.num.n1 + $scope.num.n2; }

  $scope.data = {
    'a': 0,
    'b': 0,
    'x': 0,
    'u': 0
  }

  $scope.result = function() {
    $scope.data.u = $scope.data.a + $scope.data.b + $scope.data.x;
    return $scope.data.u;
  }

})

// .controller('PlaylistsCtrl', function($scope) {
//   $scope.playlists = [
//     { title: 'Reggae', id: 1 },
//     { title: 'Chill', id: 2 },
//     { title: 'Dubstep', id: 3 },
//     { title: 'Indie', id: 4 },
//     { title: 'Rap', id: 5 },
//     { title: 'Cowbell', id: 6 }
//   ];
// })

.controller('PlaylistsCtrl', function($scope, $http) {

    $http.get('http://api.soundcloud.com/users/8553751/playlists.json?client_id='+client_id+'&limit=10')
    .success(function(data){
      $scope.playlists = data;
    });

})

.controller('PlaylistCtrl', function($scope, $stateParams, $http) {
  var playlistId = $stateParams.playlistId;

  $http.get('http://api.soundcloud.com/playlists/'+playlistId+'?client_id='+client_id)
  .success(function(data) {
    $scope.playlist = data.tracks;
  });

})

.controller('PlayCtrl', function($scope, $stateParams, $http) {
  var playId = $stateParams.playId;

  $http.get('http://api.soundcloud.com/tracks/'+playId+'?client_id='+client_id)
  .success(function(data) {
    // var artwork_url = data.artwork_url;
    // $scope.tracks = data;
    $scope.title = data.title;
    $scope.taglist = data.tag_list;
    $scope.description = data.description;
    $scope.artwork = data.artwork_url.replace('-large', '-t500x500');
    $scope.user = data.user.username;

  });
})

.controller('ItemlistCtrl',  function($rootScope){

  $rootScope.itemlist = [
    { title : 'Otomotif', 
      slug : 'otomotif',
      jenis : [
        { barang : 'Mobil', slug : 'mbl', id : 1 },
        { barang : 'Motor', slug : 'mtr', id : 2 }
      ],
      id : 1 },
    { title : 'Komputer', 
      slug : 'komputer',
      jenis : [
        { barang : 'hardware', slug : 'hdw', id : 1 },
        { barang : 'software', slug : 'sfw', id : 2 },
        { barang : 'aksessoris', slug : 'aks', id : 3 }
      ], 
      id : 2 },
    { title : 'Gadget',
      slug : 'gadget',
      jenis : [
        { barang : 'smartphones', slug : 'smp', id: 1 },
        { barang : 'tablet', slug : 'tbl', id: 2 }
      ], 
      id : 3 },
    { title : 'Kamera', 
      slug : 'kamera',
      jenis : [
        { barang : 'DSLR', slug : 'dslr', id : 1 },
        { barang : 'pocket', slug : 'pct', id : 2 }
      ],
      id : 4 }
  ];

})

.controller('ItemCtrl', function($scope, $stateParams, $rootScope){

  // itemSlug ada di app.js state 'app.item'
  var slug = $stateParams.itemSlug;
  $scope.title = "";
  $scope.jenis = "";
  $scope.slug = $stateParams.itemSlug;

  for (var i = 0; i < $rootScope.itemlist.length; i++) {
    if (slug == $rootScope.itemlist[i].slug) {
      $scope.title = $rootScope.itemlist[i].title;
      $scope.jenis = $rootScope.itemlist[i].jenis;
    }
  }

})

.controller('BarangCtrl', function($scope, $stateParams, $rootScope){

  var slug = $stateParams.itemSlug;
  var barang = $stateParams.barangSlug;

  $scope.jenisBarang = "";
  $scope.jenisSlug = "";
  $scope.jenisId = "";

  for (var i = 0; i < $rootScope.itemlist.length; i++) {
    if (slug = $rootScope.itemlist[i].slug) {
      for (var j = 0; j < $rootScope.itemlist[i].jenis.length; j++) {
        if (barang == $rootScope.itemlist[i].jenis[j].slug) {
          $scope.jenisBarang = $rootScope.itemlist[i].jenis[j].barang;
          $scope.jenisSlug = $rootScope.itemlist[i].jenis[j].slug;
          $scope.jenisId = $rootScope.itemlist[i].jenis[j].id;
        }
      }
    }
  }
})

// lanjutkan untuk nested, jangan lupa titik comma
;
