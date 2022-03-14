const Player1 = {
  team: "Warrior",
  name: "Stephen Curry",
  game(component, point) {
    console.log(
      `${this.name} has scored ${point} for ${this.team} on the game with ${component}`
    );
  },
};
// 目前this指向调用时的对象， 没问题
Player1.game("Laker", 50);

// 当我们有了第二个对象，并且想要调用player1中的game 方法
// 这个时候就需要改变this的指向，否则，this会指向undefined

const Player2 = {
  team: "Laker",
  name: "Lebron James",
};

const game = Player1.game;
game("Nuggets", "33"); // 返回undefined

// 这个时候我们需要一些手段来改变this的指向
// call function 将game中的this指向改变到了Player2中
game.call(Player2, "Jazz", "33"); // Lebron James has scored 33 for Laker on the game with Jazz

const Player3 = {
  team: "Nets",
  name: "James Harden",
};

// apply 方法用法与apply基本相同， 唯一的不同在于入参的形式
// 用数组的方式传参
game.apply(Player3, ["Celties", "6"]);

// bind 的不同点在于返回值是一个this指向的函数引用，而并非一个立即执行函数
const bindGame = game.bind(Player2);
// 此处的返回需要经历过一次调用。
bindGame("Clipper", "44"); //Lebron James has scored 44 for Laker on the game with Clipper

const gameAgainstSpurs = game.bind(Player1, "Spurs");
gameAgainstSpurs("50"); //Stephen Curry has scored 50 for Warrior on the game with Spurs
