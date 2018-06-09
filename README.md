# Ultimate-Tic-Tac-Toe
This is my attempt at creating an Ultimate Tic Tac Toe game.
This game was created so that I can learn more about JavaScript and HTML/CSS as well as gaining experience with implementing an effective AI with the help of my Computer Science courses.

What is Ultimate Tic-Tac-Toe?
Ultimate Tic-Tac-Toe is your classic Tic-Tac-Toe game with a twist.
It is a large Tic-Tac-Toe board but in each section, there is another Tic-Tac-Toe board, counting for 9 small Tic-Tac-Toe boards and 1 large one.

Objective:
The objective of the game is the same as the usual Tic-Tac-Toe game, try to get three in a row horizontally, vertically, or diagonally.
However, to win the game you have to do this on the larger board, which involves winning smaller games of Tic-Tac-Toe.

Rules:
The rules are mostly the same as the original Tic-Tac-Toe game. However there are naturally a few twists.
The first player can play any where on the board. As shown below.

![tic-tac-toe](https://user-images.githubusercontent.com/10607463/41195924-6188683a-6c04-11e8-9ff0-759addf7ceaf.png)

However, the next player has to play in the section the first player placed their piece. 
For example, say the first player plays in the upper middle of any board, then the next player would have to play in the upper middle section of the Tic-Tac-Toe board. As shown below.

![tic-tac-toe-example1](https://user-images.githubusercontent.com/10607463/41195947-a0d63986-6c04-11e8-85cb-107a137eca80.png)

Similarly, the next person has to play in the section you just put your piece. As shown below.

![tic-tac-toe-example2](https://user-images.githubusercontent.com/10607463/41195988-5dff4958-6c05-11e8-80ea-52b37b9e2305.png)

This keeps going until eventually, someone will win or tie on a particular Tic-Tac-Toe board. In this case, that section becomes a wildcard for the remainder of the game. What this means is that if a player ever picks a section that has already been won in their particular tic-tac-toe board then the next player is allowed to play on any board that has not yet been completed. Below X has just played in the middle square on the bottom left section and since that section has been won by a player, O can now play anywhere.

![tic-tac-toe-example3](https://user-images.githubusercontent.com/10607463/41196015-e6fbcc04-6c05-11e8-9601-9ba0c40ac83c.png)

Finally, the game ends when a player has 3 in a row on the bigger board, as you can see below, O has the middle 3 boards won, and thus wins the game! 

![tic-tac-toe-example4](https://user-images.githubusercontent.com/10607463/41196044-38b10dde-6c06-11e8-8059-331242f2caaa.png)

