'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');


class App {
    #map;
    #mapEvent;
    constructor() {
        this.getLocation()
        form.addEventListener("submit",this.newWorkout.bind(this    ))
        inputType.addEventListener("change", this.onSubmit.bind(this))
     }

    getLocation() {
        //autometically pass the arg 
        navigator.geolocation.getCurrentPosition(this.loadMap.bind(this), () => console.log("Error occured"))
    }

    loadMap(position) {
        const { latitude, longitude } = position.coords
        console.log(latitude,longitude)
        console.log(`https://www.google.co.in/maps/@${latitude},${longitude},12.38z?entry=ttu&g_ep=EgoyMDI1MDYwMS4wIKXMDSoASAFQAw%3D%3D`)

        let coords = [latitude, longitude]


        this.#map = L.map('map').setView(coords, 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.#map);

        this.#map.addEventListener("click",this.showForm.bind(this))
    }

    showForm(e){
        console.log(e)
         this.#mapEvent = e
            form.classList.remove("hidden")
            inputDistance.focus()
    }

    newWorkout(e){
    e.preventDefault()
    inputDistance.value = inputCadence.value = inputDuration.value = inputElevation.value = ''
    const { lat, lng } = this.#mapEvent.latlng
    L.marker([lat, lng]).addTo(this.#map).bindPopup(L.popup({ autoClose: false, closeOnClick: false })).openPopup();
    }

    onSubmit(){
    inputElevation.closest('.form__row').classList.toggle("form__row--hidden")
    inputCadence.closest('.form__row').classList.toggle("form__row--hidden")
    }


}

const newApp=new App()









