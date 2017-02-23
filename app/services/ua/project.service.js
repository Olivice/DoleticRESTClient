(function () {
    'use strict';

    angular
        .module('doleticApp')
        .factory('ProjectService', ProjectService);

    ProjectService.$inject = ['$http', 'SERVER_CONFIG'];

    function ProjectService($http, SERVER_CONFIG) {
        var server = SERVER_CONFIG.url;
        var urlBase = '/api/ua/project';
        var projectFactory = {};

        // GET

        projectFactory.getAllUnsignedProjects = function (cache) {
            if (!cache) {
                delete projectFactory.unsignedProjects;
            } else if (projectFactory.unsignedProjects) {
                return;
            }
            return $http.get(server + urlBase + "s/unsigned").success(function (data) {
                projectFactory.unsignedProjects = data.projects;
            }).error(function (data) {
                console.log(data);
            });
        };

        projectFactory.getAllCurrentProjects = function (cache) {
            if (!cache) {
                delete projectFactory.currentProjects;
            } else if (projectFactory.currentProjects) {
                return;
            }
            return $http.get(server + urlBase + "s/current").success(function (data) {
                projectFactory.currentProjects = data.projects;
            }).error(function (data) {
                console.log(data);
            });
        };

        projectFactory.getAllArchivedProjects = function (cache) {
            if (!cache) {
                delete projectFactory.archivedProjects;
            } else if (projectFactory.archivedProjects) {
                return;
            }
            return $http.get(server + urlBase + "s/archived").success(function (data) {
                projectFactory.archivedProjects = data.projects;
            }).error(function (data) {
                console.log(data);
            });
        };

        projectFactory.getAllDisabledProjects = function (cache) {
            if (!cache) {
                delete projectFactory.disabledProjects;
            } else if (projectFactory.disabledProjects) {
                return;
            }
            return $http.get(server + urlBase + "s/disabled").success(function (data) {
                projectFactory.disabledProjects = data.projects;
            }).error(function (data) {
                console.log(data);
            });
        };

        projectFactory.getProjectByManagerId = function (id) {
            return $http.get(server + urlBase + "s/manager/" + id);
        };

        projectFactory.getProjectByAuditorId = function (id) {
            return $http.get(server + urlBase + "s/auditor/" + id);
        };

        projectFactory.getProjectByConsultantId = function (id) {
            return $http.get(server + urlBase + "s/consultant/" + id);
        };

        // POST
        projectFactory.postProject = function (project) {
            project.status = 1;
            return $http.post(server + urlBase, project).success(function (data) {
                projectFactory.unsignedProjects = angular.equals(projectFactory.unsignedProjects, []) ?
                    {} : projectFactory.unsignedProjects;
                projectFactory.unsignedProjects[data.project.id] = data.project;
            }).error(function (error) {
                console.log(error);
            });
        };

        return projectFactory;
    }

})();