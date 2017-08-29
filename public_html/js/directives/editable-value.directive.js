(function () {
    "use strict";

    angular.module('pFormBuilder.directives')
            .directive('editableValue', EditableValueDirective);

    EditableValueDirective.$inject = [];

    function EditableValueDirective()
    {
        return {
            restrict: 'EA',
            replace: false,
            scope: {
                linkedValue: "=value",
                linkedSave: "&?save",
                linkedLabel: '@?label',
                placeholder: '@?placeholder',
                pattern: '=?',
                values: "=?",
                orientation: "@?",
                type: "@?",
                editMode: "=?",
                size: "@?",
                min: "=",
                max: "=",
                step: "="
            },
            templateUrl: "js/directives/editable-value.directive.html",
            controllerAs: 'vm',
            controller: EditableValueController
        };
    }

    EditableValueController.$inject = ['$scope', '$log'];

    function EditableValueController($scope, $log) {
        var orientations = ["default", "inline", "horizontal"];

        var vm = this;
        vm.editMode = (angular.isDefined($scope.editMode) && $scope.editMode) ? true : false;
        vm.save = save;
        vm.cancel = cancel;
        vm.switchEditMode = switchEditMode;
        vm.getClass = getClass;

        vm.data = {
            value: undefined,
            templates: {
                text: "js/directives/editable-value.text.template.html",
                select: "js/directives/editable-value.select.template.html",
                number: "js/directives/editable-value.number.template.html",
                default: "js/directives/editable-value.default.template.html"
            }
        };

        (function init() {
            if (angular.isUndefined($scope.linkedLabel))
                $scope.linkedLabel = "";

            if (angular.isDefined($scope.values))
            {
                if (angular.isArray($scope.values))
                    $scope.isAnArray = true;
                else if (angular.isObject($scope.values))
                    $scope.isAnObject = true;
            }
        })();

        //////////////////////////////////////////////////////////////////////////////////////

        function save()
        {
            if (angular.isDefined($scope.linkedSave)) {
                $scope.linkedSave({value: vm.data.value});
                vm.data.value = $scope.linkedValue;
            } else {
                $scope.linkedValue = vm.data.value;
            }

            vm.switchEditMode(false);
        }

        function cancel()
        {
            vm.data.value = $scope.linkedValue;
            vm.switchEditMode(false);
        }

        function switchEditMode(bool)
        {
            if (angular.isDefined(bool))
                vm.editMode = bool;
            else
                vm.editMode = !vm.editMode;

            $scope.editMode = vm.editMode;
        }

        function getClass(classStr)
        {
            if (angular.isDefined($scope.size))
                return classStr + "-" + $scope.size;
            else
                return "";
        }

        function hasLabel()
        {
            return angular.isDefined($scope.linkedLabel);
        }

        //////////////////////////////////////////////////////////////////////////////////////

        $scope.$watch('linkedValue', function (current, original) {
            if (angular.isDefined(current))
            {
                vm.data.value = current;
            }
        });
        
        $scope.$watch("editMode", function (b) {
            if (angular.isDefined(b))
            {
                switchEditMode(b);
            }
        });
    }
})();