class Tracker {
  constructor() {
    this._limit = 2000;
    this._remain = 0;
    this._gainAndLoss = 0;
    this._meals = [];
    this._workouts = [];
    
    this._showLimit();
    this._showGainAndLoss();
    this._showRemain();
    this._showConsumed();
    this._showWorkout();
    this._showProgress();
  }
  
  _showLimit() {
    const limitEl = document.querySelector("#limit");
    limitEl.innerHTML = this._limit;
  }
  
  _showGainAndLoss() {
    const gainAndLossEl = document.querySelector("#gain-and-loss");
    gainAndLossEl.innerHTML = this._gainAndLoss;
  }
  
  _showRemain() {
    const remainEl = document.querySelector("#remain");
    const remainCard = document.querySelector("#remain-card");
    
    this._remain = this._limit - this._gainAndLoss
    
    if (this._remain <= 0) {
      console.log(0)
      remainCard.classList.add("bg-danger", "text-light");
    } else {
      remainCard.classList.remove("bg-danger", "text-light");
    }
    remainEl.innerHTML = this._remain;
  }
  
  _showConsumed() {
    const consumedEl = document.querySelector("#consumed");
    const totalMeal = this._meals.reduce((total, item) => total += item.calories, 0);
    consumedEl.innerHTML = totalMeal;
  }
  
  _showWorkout() {
    const workoutEl = document.querySelector("#workout");
    const totalWorkout = this._workouts.reduce((total, item) => total += item.calories, 0);
    workoutEl.innerHTML = totalWorkout;
  }
  
  _showProgress() {
    const progress = document.querySelector("#progress-bar");
    let percent = (this._gainAndLoss / this._limit) * 100;
    
    percent <= 0 ? percent = 0 : percent = percent;
    
    if (percent >= 100) {
      progress.classList.remove("bg-success");
      progress.classList.add("bg-danger");
    }else {
      progress.classList.remove("bg-danger");
      progress.classList.add("bg-success");
    }
    
    progress.style.width = `${ Math.min(percent, 100) }%`;
  }
  
  addMeal(meal) {
    this._meals.push(meal);
    this._gainAndLoss += meal.calories
    this.render()
  }
  
  addWorkout(workout) {
    this._workouts.push(workout)
    this._gainAndLoss -= workout.calories;
    this.render()
  }
  
  render() {
    this._showLimit();
    this._showGainAndLoss();
    this._showRemain();
    this._showConsumed();
    this._showWorkout();
    this._showProgress();
  }
}

class Meal {
  constructor(name, calories) {
    this.id = Math.random(16).toString().slice(2);
    this.name = name;
    this.calories = calories;
  }
}

class Workout {
  constructor(name, calories) {
    this.id = Math.random(16).toString().slice(2);
    this.name = name;
    this.calories = calories;
  }
}

// class App {
//   constructor() {
//     const tracker = new Tracker();
    
//     document.querySelector("#limit-form").addEventListener.bind(this).("submit", this._setLimit)
//   }
  
//   _setLimit(e) {
//     e.preventDefault();
    
//     const limitEl = document.querySelector("#limit");
//     const limitInput = document.querySelector("#limit-input");
    
//     limitEl.innerHTML = limitInput.value
//   }
// }

const tracker = new Tracker();
const cheese = new Meal("cheese", 1000);
tracker.addMeal(cheese);
const cheese2 = new Meal("cheese", 10000);
tracker.addMeal(cheese2);
const run = new Workout("run", 20);
tracker.addWorkout(run);
const run2 = new Workout("run", 250);
tracker.addWorkout(run2);

// const app = new App()

