const ROCK = 0,
  PAPER = 1,
  SCISSORS = 2,
  NUM_ACTIONS = 3;
let random = Math.random();
let regretSum = new Array(NUM_ACTIONS).fill(0),
  strategy = new Array(NUM_ACTIONS).fill(0),
  strategySum = new Array(NUM_ACTIONS).fill(0),
  oppStrategy = [0.4, 0.05, 0.55];

function getStrategy() {
  let normalizingSum = 0;
  for (let a = 0; a < NUM_ACTIONS; a++) {
    strategy[a] = regretSum[a] > 0 ? regretSum[a] : 0;
    normalizingSum += strategy[a];
  }
  for (let a = 0; a < NUM_ACTIONS; a++) {
    strategy[a] =
      normalizingSum > 0 ? strategy[a] / normalizingSum : 1 / NUM_ACTIONS;
    strategySum[a] += strategy[a];
  }
  return strategy;
}

function getAction(strategy) {
  let r = Math.random();
  let a = 0,
    cumulativeProb = 0;
  while (a < NUM_ACTIONS - 1) {
    cumulativeProb += strategy[a];
    if (r < cumulativeProb) {
      break;
    }
    a++;
  }
  return a;
}

//TRAIN the strategy model
function train(iters) {
  let actionUtility = new Array(NUM_ACTIONS);
  for (let i = 0; i < iters; i++) {
    //Get regret-matched mixed-strategy actions
    let strategy = getStrategy();
    let myaction = getAction(strategy);
    
    let otheraction = getAction(oppStrategy);
    // oppStrategy=getStrategy(); if opponent is intelligent and uses optimal strategy everytime
    //Compute action utilities
    actionUtility[otheraction] = 0;
    actionUtility[otheraction == NUM_ACTIONS - 1 ? 0 : otheraction + 1] = 1;
    actionUtility[otheraction == 0 ? NUM_ACTIONS - 1 : otheraction - 1] = -1;

    //Accumulate action regrets
    for (let a = 0; a < NUM_ACTIONS; a++)
      regretSum[a] += actionUtility[a] - actionUtility[myaction];
  }
}

//Get average mixed strategy across all training iterations
function getAverageStrategy() {
  let avgStrategy = new Array(NUM_ACTIONS);
  let normalizingSum = 0;
  for (let a = 0; a < NUM_ACTIONS; a++) normalizingSum += strategySum[a];
  for (let a = 0; a < NUM_ACTIONS; a++) {
    if (normalizingSum > 0) {
      avgStrategy[a] = strategySum[a] / normalizingSum;
    } else {
      avgStrategy[a] = 1 / NUM_ACTIONS;
    }
  }
  return avgStrategy;
}

for (let i = 0; i < 100; i++) {
  train(100);
  // console.log((1 - getAverageStrategy()[1]).toPrecision(6));
  console.log(getAverageStrategy());
}
