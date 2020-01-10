new Vue({
   el: "#app",
   data: {
       gameStarted: false,
       playerHealth: 100,
       monsterHealth: 100,
       moveResults: []
   },
    methods: {
        attack: function() {
            var damage = this.calculateDamage(1,10);
           this.monsterHealth = Math.max(0,this.monsterHealth - damage);
            this.moveResults.push({message: "Player hits Monster for " + damage,class:"player-turn"});
            this.monsterTurn();
        },
        heal: function() {
            var health = this.calculateDamage(15,20);
            this.playerHealth = Math.min(100, this.playerHealth + health);
            this.moveResults.push({message: "Player heals for " + health, class:"player-turn"});
            this.monsterTurn();
        },
        specialAttack: function() {
            var damage = this.calculateDamage(10,20);
            this.monsterHealth = Math.max(0,this.monsterHealth - damage);
            this.moveResults.push({message: "Player hits Monster for " + damage, class:"player-turn"});
            this.monsterTurn();
        },
        restartGame: function() {
            this.moveResults = [];
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.gameStarted = true;
        },
        monsterTurn: function() {
            var damage = this.calculateDamage(5,15);
            this.playerHealth = Math.max(0,this.playerHealth - damage);
            this.moveResults.push({message: "Monster hits Player for " + damage,class:"monster-turn"});
            this.checkWin();
        },
        checkWin: function() {
            if(this.playerHealth <= 0) {
                this.endGame("You lose :-( Play again?");
            } else if(this.monsterHealth <= 0) {
                this.endGame("You win!, Play again?");
            }
        },
        endGame: function(message) {
            if(confirm(message)) {
                this.restartGame();
            } else {
                this.gameStarted = false;
            }
        },
        calculateDamage: function(min,max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        }
    }
});