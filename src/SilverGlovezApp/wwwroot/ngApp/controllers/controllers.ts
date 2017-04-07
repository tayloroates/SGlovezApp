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
        public savePlayer() {
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
    export class ManageEditController {
        public playerToEdit;

        public editPlayer() {
            this.ManageService.save(this.playerToEdit).then(() =>
                this.$state.go('manage')
            );
        }
        constructor(private ManageService: SilverGlovezApp.Services.ManageService, private $state: ng.ui.IStateService,
            $stateParams: ng.ui.IStateParamsService) {
            this.playerToEdit = ManageService.getPlayer($stateParams['id'])
        }
    }
    export class ManageDeleteController {
        public delete;

        public deletePlayer() {
            this.ManageService.deletePlayer(this.delete.id).then(() =>
                this.$state.go('manage')
            );
        }
        constructor(private ManageService: SilverGlovezApp.Services.ManageService, private $state: ng.ui.IStateService,
            $stateParams: ng.ui.IStateParamsService) {
            this.DeletePlayer = ManageService.getPlayer($stateParams['id'])
        }
       
    }
    angular.module('SilverGlovezApp').controller('ManageDeleteController', ManageDeleteController);

    export class PlayerAddController {
        public AddPlayer;

        addPlayer() {
            this.ManageService.save(this.AddPlayer).then(() => this.$state.go('manage')
            );
        }
        constructor(private ManageService: SilverGlovezApp.Services.ManageService, private $state: ng.ui.IStateService){ }
    }
    angular.module('SilverGlovezApp').controller('SilverGlovezApp', PlayerAddController);

    export class PlayerController {
        public manage;
        public players;

        constructor($http: ng.IHttpService, private ManageService: SilverGlovezApp.Services.ManageService) {
            this.players = this.ManageService.getPlayers();
        }

    }
    export class PlayerDetailController {
        public player;
        constructor($stateParams: ng.ui.IStateParamsService, private ManageService: SilverGlovezApp.Services.ManageService) {
            this.player = this.ManageService.getPlayer($stateParams["id"]);
        }
    }
    angular.module('SilverGlovezApp').controller('PlayerDetailController', PlayerDetailController);

    export class ContactController {
        public ContactResource;
        public contact;
        public contacts;
       

        public getTeams() {
            this.contacts = this.ContactResource.query();
        }

        public getContacts() {
            this.contacts = this.ContactResource.query();
        }
        public saveContact() {
            this.ContactResource.save(this.contact).$promise.then(() => {
                this.contact = null;
                this.getContacts();
            });
        }

        constructor($resource: ng.resource.IResourceService) {
            this.ContactResource = $resource("/api/contact/:id");
            this.getContacts();

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

    export class SignupController {
     
        public fname;
        public lname;
        public age;
        public school;
        public email;
        public position;
        public size;

        public add() {
            console.log(`Name: ${this.fname} ${this.lname} Age: ${this.age} High School: ${this.school}
           Email: ${this.email} Position: ${this.position} Shirt Size: ${this.size}`);
        }
       
    }
    angular.module('SilverGlovezApp').controller('SignupController', SignupController);

    export class AboutController {
        public message = 'Hello from the about page!';
    }

    export class ApplyController {
        public message = 'Hello from the about page!';
    }
   

}
