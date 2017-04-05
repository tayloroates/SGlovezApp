namespace SilverGlovezApp.Controllers {

    export class HomeController {
        public message = 'Hello from the home page!';                
    }
    export class ManageController {
        public message = 'Hello from the home page!';
        public PlayerResource;
        public TeamResource;
        public team;
        public teams;
        public player;
        public players;

        public getTeams() {
            this.teams = this.TeamResource.query();
        }
        
        public getPlayers() {
            this.players = this.PlayerResource.query();
        }
        public save() {
            this.PlayerResource.save(this.player).$promise.then(() => {
                this.player = null;
                this.getPlayers();
            });
        }
       
        constructor($resource: ng.resource.IResourceService) {
            this.TeamResource = $resource("/api/teams/:id");
            this.PlayerResource = $resource("/api/player/:id")
            this.getTeams();
            this.getPlayers();
          
        }
    }

    
    export class SecretController {
        public secrets;

        constructor($http: ng.IHttpService) {
            $http.get('/api/secrets').then((results) => {
                this.secrets = results.data;
            });
        }
    }


    export class AboutController {
        public message = 'Hello from the about page!';
    }

    export class ApplyController {
        public message = 'Hello from the about page!';
    }
    export class ContactController {
        public message = 'Hello from the about page!';
    }
}
