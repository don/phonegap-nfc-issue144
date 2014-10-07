var app = {
    initialize: function () {
        this.bindEvents();
    },
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function () {
        var element = document.querySelector('html');
        angular.bootstrap(element, ["nfcApp"]);
        console.log("device ready");
    }
};

angular.module('nfcApp', [])
    .controller('MainController', function ($scope, nfcService) {
        $scope.$on('nfcScanned', function (event, data) {
            $scope.$apply(function () {
                $scope.tagId = data;
            });
        });
    })
    .factory('nfcService', function ($rootScope) {
        nfc.addNdefListener(function (nfcEvent) {
            var tagId = nfc.bytesToHexString(nfcEvent.tag.id);
            $rootScope.$broadcast('nfcScanned', tagId);
        }, function () {
            alert("Listening for NDEF Tags.");
        }, function (reason) {
            alert("Error adding NFC Listener " + reason);
        });

    });

app.initialize();
