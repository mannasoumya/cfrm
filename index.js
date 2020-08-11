const ROCK = 0,
  PAPER = 1,
  SCISSORS = 2,
  NUM_ACTIONS = 3;
let random = Math.random();
let regretSum = new Array(NUM_ACTIONS),
  strategy = new Array(NUM_ACTIONS),
  strategySum = new Array(NUM_ACTIONS),
  oppStrategy = [0.4, 0.3, 0.3];

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

// let strategy_i = getStrategy();
// console.log(getAction(strategy_i));
