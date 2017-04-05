namespace SilverGlovezApp.Controllers {

    export class HomeController {
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
            this.player = this.PlayerResource.query();
        }
        public save() {
            this.PlayerResource.save(this.player).$promise.then(() => {
                this.player = null;
            });
        }

        public addPlayer() {
            this.PlayerResource.save(this.player).$promise.then(() =>
            { this.addPlayer = null });
        }
        constructor($resource: ng.resource.IResourceService) {
            this.TeamResource = $resource("/api/teams/:id");
            this.PlayerResource = $resource("/api/player/:id")
            this.getTeams();
            this.getPlayers();

        }
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
            this.player = this.PlayerResource.query();
        }
        public save() {
            this.PlayerResource.save(this.player).$promise.then(() => {
                this.player = null;
            });
        }
        
        public addPlayer() {
            this.PlayerResource.save(this.player).$promise.then(() =>
            { this.addPlayer = null });
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

    export class FormController {
     
        public fname;
        public lname;
        public age;
        public school;
        public email;
        public position;
        public size;

        public add() {
            console.log(`${this.fname} ${this.lname} ${this.age} ${this.school}
            ${this.email} ${this.position} ${this.size}`);
        }
       
    }
    angular.module('SilverGlovezApp').controller('FormController', FormController);

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
