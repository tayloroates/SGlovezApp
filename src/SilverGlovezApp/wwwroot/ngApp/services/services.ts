namespace SilverGlovezApp.Services {
    export class ManageService {
        public PlayerResource;

        public getPlayers() {
           return this.PlayerResource.query();
        }
        public save(player) {
            return this.PlayerResource.save(player).$promise;
        }
        public deletePlayer(id: number) {
            return this.PlayerResource.delete({ id: id }).$promise;
        }
        public getPlayer(id) {
            return this.PlayerResource.get({ id: id });
        }
        constructor($resource: ng.resource.IResourceService) {
            this.PlayerResource = $resource('/api/player/:id');
        }
    }
    angular.module('SilverGlovezApp').service('ManageService', ManageService);
    }
