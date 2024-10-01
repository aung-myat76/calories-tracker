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
    this._showMeals();
    this._showWorkouts();
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
  
  _showMeals() {
    this._meals.forEach(item => {
      
      const meal = document.createElement("div");
      
      meal.innerHTML = `
      <div class="col-12 my-2 meal" data-id=${ item.id }>
          <div class="card border-3 border-danger">
            <div class="card-body fw-bold d-flex align-items-center justify-content-between">
              <span>${ item.name }</span>
              <span class="card-text">${ item.calories }</span>
              <button class="btn">
                <i class="bi bi-trash3 text-danger"></i>
              </button>
            </div>
          </div>
        </div>`;
       document.querySelector("#items-list").appendChild(meal);
    })
    }
    
  _showWorkouts() {
    // document.querySelector("#items-list").innerHTML = "";
    
    this._workouts.forEach(item => {
      const workout = document.createElement("div");
      
      workout.innerHTML = `
      <div class="col-12 my-2 workout" data-id=${ item.id }>
          <div class="card border-3 border-success">
            <div class="card-body fw-bold d-flex align-items-center justify-content-between">
              <span>${ item.name }</span>
              <span class="card-text">${ item.calories }</span>
              <button class="btn">
                <i class="bi bi-trash3 text-danger"></i>
              </button>
            </div>
          </div>
        </div>`;
       document.querySelector("#items-list").appendChild(workout);
    })
    }
  
  
  addMeal(meal) {
    this._meals.push(meal);
    this._gainAndLoss += meal.calories
    this.render();
  }
  
  removeMeal(id) {
    const index = this._meals.findIndex((meal) => meal.id === id);
    
    this._gainAndLoss -= this._meals[index].calories;
    this._meals.splice(index, 1);
    
    this.render();
  }
  
  addWorkout(workout) {
    this._workouts.push(workout)
    this._gainAndLoss -= workout.calories;
    this.render()
  }
  
  removeWorkout(id) {
    const index = this._workouts.findIndex((workout) => workout.id === id);
    
    this._gainAndLoss += this._workouts[index].calories;
    this._workouts.splice(index, 1);
    
    this.render();
  }
  
  render() {
    this._showLimit();
    this._showGainAndLoss();
    this._showRemain();
    this._showConsumed();
    this._showWorkout();
    this._showProgress();
    
    document.querySelector("#items-list").innerHTML = "";
    this._showMeals();
    this._showWorkouts();
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

class App {
  constructor() {
    this.tracker = new Tracker();
    
    document.querySelector("#meal-form")
      .addEventListener("submit", this._createItem.bind(this, "meal"));
    
    document.querySelector("#workout-form")
      .addEventListener("submit", this._createItem.bind(this, "workout"));
    
    document.querySelector("#items-list")
      .addEventListener("click", this._deleteItem.bind(this));
      
    
  }
  
  _createItem(type, e) {
    e.preventDefault();
    
    const name = document.querySelector(`#${ type }-name`);
    const calories = document.querySelector(`#${ type }-calories`);
    
    if (name.value === "" || calories.value === "") {
      const wrapper = document.querySelector(".wrapper");
      
      wrapper.innerHTML = `
      <div class="alert alert-danger my-3 text-center" role="alert">
        Missing input
      </div>`;
      
      setTimeout(function() {
        wrapper.innerHTML = "";
      }, 3000);
      
      
      return;
    }
    
    if (type === "meal") {
      const meal = new Meal(name.value.toLowerCase(), +calories.value);
      this.tracker.addMeal(meal);
    } else {
      const workout = new Workout(name.value.toLowerCase(), +calories.value);
      this.tracker.addWorkout(workout);
    }
    
    name.value = "";
    calories.value = "";
  }
  
  _deleteItem(e) {
    const item = e.target.closest(".col-12");
    const id = item.getAttribute("data-id");
    let isMeal = item.classList.contains("meal");
    
    if (isMeal) {
      this.tracker.removeMeal(id);
    } else {
      this.tracker.removeWorkout(id);
    }
    
    item.remove();
  }
}

// const tracker = new Tracker();
// const cheese = new Meal("cheese", 1000);
// tracker.addMeal(cheese);
// const cheese2 = new Meal("cheese", 100);
// tracker.addMeal(cheese2);
// const run = new Workout("run", 20);
// tracker.addWorkout(run);
// const run2 = new Workout("run", 250);
// tracker.addWorkout(run2);

const app = new App()

