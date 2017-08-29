(function () {
    "use strict";

    angular.module('app.demo')
            .controller('DemoController', DemoController);

    DemoController.$inject = ['$log', '$scope', '$rootScope'];

    function DemoController($log, $scope, $rootScope)
    {
        var vm = this;
        vm.pattern1 = /^([A-Za-z0-9äüö]+[- ]?)*([(]{1}(([A-Za-z0-9äüö]+[- ]?)|([A-Za-z0-9äüö]+[/]{1}[A-Za-z0-9äüö]+))+[)]{1})?$/;
        vm.pattern2 = /^([/]{0,1}[a-z]{1}[A-Za-z0-9]*)+$/;
        
        vm.edit = true;
        vm.title = "Meine Anwendung";
        vm.values = ["Max", "Peter", "Joel", "Jeffrey"];
        vm.values2 = {
            de: "deutsch",
            en: "englisch",
            fr: "französisch"
        };
        vm.cols = 7;
        vm.getCol1Span = getCol1Span;
        vm.getCol2Span = getCol2Span;
        vm.log = log;


        //////////////////////////////////////////////////////////////////////////////////////

        (function init()
        {

        })();

        //////////////////////////////////////////////////////////////////////////////////////
        function log(val)
        {
            $log.debug("Wert: ", val);
        }
        
        function getCol1Span()
        {
//            var offset = Math.floor((12 - vm.cols) / 2);
//            offset = (vm.cols % 2 !== 0) ? offset + 1 : offset;
//            return "col-md-" + vm.cols + " col-md-offset-" + offset;

            return (vm.cols && angular.isNumber(vm.cols) && vm.cols >= 3) ? "col-md-" + vm.cols : "col-md-6";
        }

        function getCol2Span()
        {
            var diff = 12 - vm.cols;
            return (vm.cols && diff > 0 && angular.isNumber(diff)) ? "col-md-" + diff : "col-md-6";
        }
    }
})();
