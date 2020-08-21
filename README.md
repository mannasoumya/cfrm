# CounterFactual Regret Minimization Implementation in Node JS

Work in progress
<br>
For the original paper refer <a href="http://modelai.gettysburg.edu/2013/cfr/cfr.pdf">here</a>.
<br>
An excellent Quora link <a href="https://qr.ae/pN21tl">here</a>.

## Some Notes:
### Optimal Strategy 
A strategy is optimal when it can do no worse than tie against any oppponent.

### Roughly defining Regret at Each Decision Point 
How much better would it have done over all the games so far if it had always played this one action at this decision, instead of choosing whatever mixture over actions that the strategy (not optimal always) said it to use.
Positive regret means that it would have done better if it had taken that action more often. 
Negative regret means that it would have done better by not taking that action at all.

### Nash Equilibrium
<i>Set of strategies one for each player in the game. </i>
If the game is two-player and zero-sum, and if the players alternate positions to even out the advantage of playing in each position (as in poker games), then a **Nash Equilibrium** has a useful theoretical property: it can do no worse than tie, on expectation, against any other opponent strategy. In a game such as poker, that "on expectation" is important: due to the luck in the game from the cards being randomly dealt, there is no guarantee that a **Nash Equilibrium** (or any strategy!) will win every single hand. However, if average is taken  over a large set of hands, or compute the expectation exactly, then it cannot to any worse than tie against anyone.
If the opponent also plays a **Nash equilibrium** strategy then it will tie; if the opponent carefully considers the Nash equilibrium strategy and computes a perfect counter-strategy then it will also tie. If the opponent makes mistakes, however, then it can lose value, allowing the Nash equilibrium strategy to win. 
