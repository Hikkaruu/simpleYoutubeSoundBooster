var videoElement = document.querySelector("video");
var audioCtx = new AudioContext();
var source = audioCtx.createMediaElementSource(videoElement);
var gainNode = audioCtx.createGain();
gainNode.gain.value = 1;
source.connect(gainNode);
gainNode.connect(audioCtx.destination);

function initializeSoundBooster() {
    var ownerDiv = document.getElementById("owner");

    var boostPercentage = 100;
    var continuousChangeDelay = 500; // Delay before continuous volume adjustment (in milliseconds)
    var continuousChangeInterval = 200; // Interval for continuous volume adjustment (in milliseconds)
    var changeTimeoutId = null;

    var minusButton = document.createElement("button");
    minusButton.innerText = "-";
    minusButton.addEventListener("mousedown", function () {
        changeVolume(-10); // Decrease volume when button is pressed
        changeTimeoutId = setTimeout(function () {
            startContinuousChange(-10);
        }, continuousChangeDelay);
    });
    minusButton.addEventListener("mouseup", stopContinuousChange);
    minusButton.addEventListener("mouseleave", stopContinuousChange);
    applyButtonStyles(minusButton, "#242424");

    var counterElement = document.createElement("span");
    counterElement.id = "counter";
    counterElement.innerText = boostPercentage + "%";
    counterElement.style.fontSize = "20px";

    var plusButton = document.createElement("button");
    plusButton.innerText = "+";
    plusButton.addEventListener("mousedown", function () {
        changeVolume(10); // Increase volume when button is pressed
        changeTimeoutId = setTimeout(function () {
            startContinuousChange(10);
        }, continuousChangeDelay);
    });
    plusButton.addEventListener("mouseup", stopContinuousChange);
    plusButton.addEventListener("mouseleave", stopContinuousChange);
    applyButtonStyles(plusButton, "#242424");

    ownerDiv.appendChild(minusButton);
    ownerDiv.appendChild(counterElement);
    ownerDiv.appendChild(plusButton);

    function startContinuousChange(delta) {
        changeTimeoutId = setInterval(function () {
            changeVolume(delta);
        }, continuousChangeInterval);
    }

    function stopContinuousChange() {
        clearInterval(changeTimeoutId);
    }

    function changeVolume(delta) {
        var newBoost = boostPercentage + delta;
        if (newBoost >= 100 && newBoost <= 1000) {
            boostPercentage = newBoost;
            updateCounter();
        }
    }

    function updateCounter() {
        counterElement.textContent = boostPercentage + "%";
        gainNode.gain.value = boostPercentage / 100;
    }

    updateCounter();

    function applyButtonStyles(button, color) {
        button.style.width = "38px";
        button.style.height = "36px";
        button.style.borderRadius = "10px";
        button.style.backgroundColor = color;
        button.style.color = "#FFFFFF";
        button.style.border = "none";
        button.style.margin = "6px";
        button.style.fontSize = "20px";
    }
}

setTimeout(function () {
    initializeSoundBooster();
}, 2000); // 2-second delay
