var WeatherStation = /** @class */ (function () {
    function WeatherStation() {
        this.observers = [];
    }
    WeatherStation.prototype.registerObserver = function (o) {
        return this.observers.push(o);
    };
    WeatherStation.prototype.removeObserver = function (o) {
        var index = this.observers.indexOf(o);
        this.observers.splice(index, 1);
    };
    WeatherStation.prototype.notifyObservers = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.update(this.temprature);
        }
    };
    WeatherStation.prototype.setTemprature = function (temp) {
        console.log("WeatherStation: new temperature measurement: " + temp);
        this.temprature = temp;
        this.notifyObservers();
    };
    return WeatherStation;
}());
var DisplayWeather = /** @class */ (function () {
    function DisplayWeather(weatherStation) {
        this.subject = weatherStation;
        weatherStation.registerObserver(this);
    }
    DisplayWeather.prototype.update = function (temprature) {
        console.log("TemperatureDisplay: I need to update my display");
    };
    return DisplayWeather;
}());
var Fan = /** @class */ (function () {
    function Fan(weatherStation) {
        this.subject = weatherStation;
        weatherStation.registerObserver(this);
    }
    Fan.prototype.update = function (temprature) {
        if (temprature < 25) {
            console.log("Fan: Its hot here, turning myself on...");
        }
        else {
            console.log("Fan: Its nice and cool, turning myself off...");
        }
    };
    return Fan;
}());
var weatherStations = new WeatherStation();
var displayWeather = new DisplayWeather(weatherStations);
var fan = new Fan(weatherStations);
weatherStations.setTemprature(20);
weatherStations.setTemprature(30);
