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
Set of strategies one for each player in the game. 
