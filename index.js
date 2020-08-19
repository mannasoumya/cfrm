const ROCK = 0,
  PAPER = 1,
  SCISSORS = 2,
  NUM_ACTIONS = 3;
let random = Math.random();
let regretSum = new Array(NUM_ACTIONS),
  strategy = new Array(NUM_ACTIONS),
  strategySum = new Array(NUM_ACTIONS),
  oppStrategy = [0.4, 0.55, 0.05];

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

train(1000000);
console.log(getAverageStrategy());

// let strategy_i = getStrategy();
// console.log(getAction(strategy_i));
