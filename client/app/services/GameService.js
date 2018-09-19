import Card from './Card';
import rankingController from '../components/home/ranking.controller';
import rankingTmpl from '../components/home/ranking.tmpl.html';

class GameService {
  constructor($rootScope, $timeout, $interval, $mdToast, $mdDialog, FirebaseService) {
    this.$rootScope = $rootScope;
    this.$timeout = $timeout;
    this.$interval = $interval;
    this.$mdToast = $mdToast;
    this.$mdDialog = $mdDialog;

    this.width = 0;
    this.height = 0;
    this.grid = [[]];

    this.timer = null;
    this.$rootScope.clock = 0;
    this.clockTimer = null;
    this.idPool = null;
    this.flippedCards = [];

    $rootScope.$watch('user', () => {
      if ($rootScope.user === undefined || $rootScope.user === null) return;
      if ($rootScope.highScore !== undefined) return;
      FirebaseService.getHighestScore();
    })
    $rootScope.$watch('score', () => {
      if ($rootScope.user === undefined || $rootScope.user === null) return;
      if ($rootScope.score > $rootScope.highScore.$value) {
        FirebaseService.saveHighestScore($rootScope.score);
      }

    })




  }

  resetWithoutStartingGame() {
    this.$rootScope.score = 50; // starting score
    this.$rootScope.clock = 0;
    this.$timeout.cancel(this.timer);
    this.$interval.cancel(this.clockTimer);
  }

  reset(width, height) {
    this.$rootScope.score = 50; // starting score
    this.$rootScope.clock = 0;
    this.width = width;
    this.height = height;
    this.idPool = null;
    if (this.timer !== null) {
      this.$timeout.cancel(this.timer);
    }
    if (this.clockTimer !== null) {
      this.$interval.cancel(this.clockTimer);
    }

    this.clockTimer = this.$interval(() => {
      ++this.$rootScope.clock;
    }, 1000);

    this.timer = this.$timeout(() => {
      this.die();
    }, 180000); // 180 s per game


    this.generateCards();
  }

  generateCards() {
    this.grid = Array.from({length: this.height}, () => Array.from({length: this.width}, () => null));
    var cards = Array.from({length: this.height * this.width}, () => new Card(0, "https://vignette.wikia.nocookie.net/breakingbad/images/d/dd/Unknown.png/revision/latest?cb=20170620074945")); // TODO
    for (var i = 0; i < this.width; i++) {
      for (var j = 0; j < this.height; j++) {
        var id = this.generateId(i, j);
        this.grid[i][j] = new Card(id,
          "https://vignette.wikia.nocookie.net/breakingbad/images/d/dd/Unknown.png/revision/latest?cb=20170620074945");
      }
    }
    this.$rootScope.grid = this.grid;
  }


  flip(i, j) {
    console.log(i, j);
    var card = this.grid[i][j];
    if (this.ifWin()) {
      this.showWinDialog();
    }
    if (card.hidden === false || this.flippedCards.length >= 2) return; // prevent flip card if already showed
    card.changeState();

    this.flippedCards.push(card);
    if (this.flippedCards.length === 2) {
      if (this.flippedCards[0].compare(this.flippedCards[1])) {
        this.showToast('Matched! + 10 😀');
        this.$rootScope.score += 10;
        this.flippedCards.forEach((e) => {
          e.invalid = true;
        });
        this.flippedCards = []
      }
      else {
        // missed
        this.showToast('Missed! - 5 😑');
        this.$rootScope.score -= 5;
        this.$timeout(() => {
          this.flippedCards.forEach((e) => {
            e.changeState();
          });
          this.flippedCards = []
        }, 500); // rest for 0.5 s

      }

    }
    // setTimeout(() => {
    //   this.hidden = true;
    //   this.image = this.defaultImg;
    // }, 3000);
  }

  generateId(i, j) {
    // id should be range from
    // 0 ~ 161
    // and it should have at least 2 items (1 pairs)
    // so it is more playable
    if (this.idPool === null) {
      this.index = 0;
      this.idPool = Array.from({length: this.width * this.height / 4}, () => Math.floor(Math.random() * 160 + 1));
      this.idPool = this.idPool.concat(this.idPool.concat(this.idPool.concat(this.idPool)));
      this.shuffle(this.idPool);
      // console.log(this.idPool);
    }
    return this.idPool[i * this.width + j];
  }

  getGrid() {
    console.log(this.grid);
    return this.grid;
  }

  ifWin() {
    for (var i = 0; i < this.width; i++) {
      for (var j = 0; j < this.height; j++) {
        if (this.grid[i][j].invalid === false) return false;
      }
    }
    return true;
  }

  shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  die() {
    // reset timers
    this.$timeout.cancel(this.timer);
    this.$interval.cancel(this.clockTimer);
    // show die dialog
    this.showDieDialog();
  }

  showToast(txt) {
    this.$mdToast.show(
      this.$mdToast.simple()
        .textContent(txt)
        .position('top right')
        .hideDelay(500)
    );
  }


  showDieDialog() {
    var confirm = this.$mdDialog.confirm()
      .title('Game Over')
      .textContent('Try again?')
      .ok('OK')
      .cancel('Cancel');

    this.$mdDialog.show(confirm).then(() => {
      this.reset(6, 6);
    }, function () {
    });
  };

  showWinDialog() {
    var confirm = this.$mdDialog.confirm()
      .title('Congrats!')
      .textContent('Try again?')
      .ok('OK')
      .cancel('Cancel');

    this.$mdDialog.show(confirm).then(() => {
      this.reset(6, 6);
    }, function () {
    });
  };

  showRanking(){
    this.$mdDialog
      .show({
        controller: rankingController,
        template: rankingTmpl,
        parent: angular.element(document.body),
        clickOutsideToClose: true,
        fullscreen: false  // Only for -xs, -sm breakpoints.
      })
      .then(
        function(answer) {

        },
        function() {

        });
  }
}


GameService.$inject = ["$rootScope", "$timeout", "$interval", "$mdToast", "$mdDialog", "FirebaseService"];
export default GameService;
