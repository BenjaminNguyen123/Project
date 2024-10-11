const foodOptions = {
    1: 'Korean BBQ',
    2: 'Sushi',
    3: 'Hotpot',
    4: 'Steak'
};

const movieOptions = {
    1: '2 ngày 1 đêm',
    2: 'Rap Viet',
    3: 'Our Songs',
    4: 'Netflix',
    5: 'ỌC ỌC ỌC'
};

(function(){
    emailjs.init({
        publicKey: 'eu6Sal3fQ-UYRI7Wi',
    });
})();

function sendEmail(data) {
    emailjs.send("service_tf9yp36", "template_v374pbf", data)
        .then(function(response) {
            alert("Your email has been sent successfully!");
        }, function(error) {
            alert("Oops! Something went wrong.");
        });
}

function showIntermediateSlide() {
    document.getElementById('slide1').classList.remove('active');
    document.getElementById('slide2').classList.add('active');
}

function showDateSlide() {
    document.getElementById('slide2').classList.remove('active');
    document.getElementById('slide3').classList.add('active');
}

function confirmDate() {
    let selectedDate = document.getElementById('dateInput').value;
    let selectedTime = document.getElementById('timeInput').value;

    if (selectedDate && selectedTime) {
        document.getElementById('slide3').classList.remove('active');
        document.getElementById('activitySlide').classList.add('active');
        localStorage.setItem('selectedDate', selectedDate);
        localStorage.setItem('selectedTime', selectedTime);
    } else {
        alert('Please select both a date and a time!');
    }
}

let selectedActivity = null;
let selectedNetflixOption = null;
let selectedFoodOption = null;

function selectActivity(activity) {
    selectedActivity = activity;
    if (activity === 'netflix') {
        document.getElementById('activitySlide').classList.remove('active');
        document.getElementById('netflixOptionSlide').classList.add('active');
    } else {
        document.getElementById('activitySlide').classList.remove('active');
        document.getElementById('foodMenuSlide').classList.add('active');
    }
}

function selectNetflixOption(option) {
    selectedNetflixOption = option;
    document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
    document.getElementById(`option${option}`).classList.add('selected');
}

function continueNetflix() {
    if (selectedNetflixOption !== null) {
        document.getElementById('netflixOptionSlide').classList.remove('active');
        document.getElementById('ratingSlide').classList.add('active');
    } else {
        alert('Please select a Netflix option before continuing.');
    }
}

function selectOption(option) {
    selectedFoodOption = option;
    document.querySelectorAll('.food-option').forEach(opt => opt.classList.remove('selected'));
    document.getElementById(`food${option}`).classList.add('selected');
}

function continueSelection() {
    if (selectedFoodOption !== null) {
        document.getElementById('foodMenuSlide').classList.remove('active');
        document.getElementById('ratingSlide').classList.add('active');
    } else {
        alert('Please select a food option before continuing.');
    }
}

function submitRating() {
    const slider = document.getElementById('excitementSlider');
    let rating = slider.value;

    let selectedMovie = selectedNetflixOption ? movieOptions[selectedNetflixOption] : 'None';
    let selectedFood = selectedFoodOption ? foodOptions[selectedFoodOption] : 'None';

    const templateParams = {
        selected_date: localStorage.getItem('selectedDate'),
        selected_time: localStorage.getItem('selectedTime'),
        selected_activity: selectedActivity || 'None',
        selected_netflix_option: selectedMovie,
        selected_food_option: selectedFood,
        excitement_rating: rating
    };

    document.getElementById('ratingSlide').classList.remove('active');
    document.getElementById('seeYouSoonSlide').classList.add('active');
    document.getElementById('selectedDate').innerText = localStorage.getItem('selectedDate');
    document.getElementById('selectedTime').innerText = localStorage.getItem('selectedTime');

    sendEmail(templateParams);
}

window.onload = function() {
    document.getElementById('excitementSlider').oninput = function() {
        document.getElementById('excitementValue').innerText = this.value;
    };
};