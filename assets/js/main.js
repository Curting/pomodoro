document.addEventListener("DOMContentLoaded", function(event) { 

	var DURATION = 25 * 60;
	var BREAK_DURATION = 5 * 60;
	var t = undefined;
	var count = DURATION;
	var pomoCount = 0;

	var onBreak = true;
	var onDemo = false;

	var startButton = document.getElementById('startButton');
	var stopButton = document.getElementById('stopButton');
	var pomodoroTimer = document.getElementById('pomodoroTimer')
	var status = document.getElementById('status')
	var demo = document.getElementById('demo')

	var alarm = new Audio('assets/sounds/alarm.mp3');

	display();

	function minutes(count) {
		// Return minutes from count - add padding in case seconds < 10
		var minutes = Math.floor(count / 60)
		if (minutes < 10) {
			return "0" + minutes
		} else {
			return minutes
		}
	}

	function seconds(count) {
		// Return seconds from count - add padding in case seconds < 10
		var seconds = Math.floor(count % 60)
		if (seconds < 10) {
			return "0" + seconds
		} else {
			return seconds
		}
	}

	function display() {
		// Display countdown
		pomodoroTimer.innerHTML = minutes(count) + ":" + seconds(count);
		document.title = pomodoroTimer.innerHTML + " – 🍅 Pomodoro Timer"
		// Display total pomodoros
		document.getElementById('pomodoros').innerHTML = pomoCount;
	};

	function countdown() {
		// Start countdown
		display();
		if (count == 0) {
			// Time is up
			document.title ="🚨 Time is up! – 🍅 Pomodoro Timer"
			stopButton.classList.toggle("hidden");
			alarm.play();

			if (onBreak == false) {
				breakButton.classList.toggle("hidden");
				pomoCount++
			} else {
				stopButton.classList.toggle("hidden");
			}
		} else {
			count--;
			t = setTimeout(countdown, 1000);
		};
	};

	function reset(time) {
		// Reset coundown to either 25 min or 5 min
		clearTimeout(t);
		count = time
		display();
	};

	function toggleButtons(x, y) {
		x.classList.toggle("hidden");
		y.classList.toggle("hidden");
	}

	startButton.addEventListener('click', function() { 
		// Change button
		toggleButtons(startButton, stopButton);
		onBreak = !onBreak
		// Change status
		status.innerHTML = "Time until break:"
		// Start countdown
		reset(DURATION);
		countdown();
	})
	stopButton.addEventListener('click', function() {
		// Change button
		toggleButtons(startButton, stopButton);
		onBreak = !onBreak
		// Reset countdown
		reset(DURATION);
	})
	breakButton.addEventListener('click', function() {
		// Change button
		toggleButtons(breakButton, startButton)
		onBreak = !onBreak
		// Change status
		status.innerHTML = "Good job. You can rest for:"
		// Reset countdown
		reset(BREAK_DURATION);
		countdown();
	})
	demo.addEventListener('click', function() {
		if (onDemo == false) {
			// I know constants shouldn't change. Sorry! :-|
			DURATION = 6;
			BREAK_DURATION = 3;
			count = DURATION;
			display();
			demo.innerHTML = "« Go back to normal time durations"
		} else {
			DURATION = 25 * 60;
			BREAK_DURATION = 5 * 60;
			count = DURATION;
			display();
			demo.innerHTML = "Try demo with shorter time durations »"
		}
		onDemo = !onDemo;
	})

});

