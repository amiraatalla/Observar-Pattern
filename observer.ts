interface Subject {
  registerObserver(o: Observer);
  removeObserver(o: Observer);
  notifyObservers();
}

interface Observer {
  update(temprature: number);
}

class WeatherStation implements Subject {
  private temprature: number;
  private observers: Observer[] = [];

  registerObserver(o: Observer) {
    return this.observers.push(o);
  }
  removeObserver(o: Observer) {
    let index = this.observers.indexOf(o);
    this.observers.splice(index, 1);
  }
  notifyObservers() {
    for (let observer of this.observers) {
      observer.update(this.temprature);
    }
  }

  setTemprature(temp: number) {
    console.log("WeatherStation: new temperature measurement: " + temp);
    this.temprature = temp;
    this.notifyObservers();
  }
}

class DisplayWeather implements Observer {
  subject: Subject;
  constructor(weatherStation: Subject) {
    this.subject = weatherStation;
    weatherStation.registerObserver(this);
  }
  update(temprature: number) {
    console.log("TemperatureDisplay: I need to update my display");
  }
}

class Fan implements Observer {
  subject: Subject;
  constructor(weatherStation: Subject) {
    this.subject = weatherStation;
    weatherStation.registerObserver(this);
  }
  update(temprature: number) {
    if (temprature < 25) {
      console.log("Fan: Its hot here, turning myself on...");
    } else {
      console.log("Fan: Its nice and cool, turning myself off...");
    }
  }
}

let weatherStations = new WeatherStation();
let displayWeather = new DisplayWeather(weatherStations);
let fan = new Fan(weatherStations);

weatherStations.setTemprature(20);
weatherStations.setTemprature(30);
