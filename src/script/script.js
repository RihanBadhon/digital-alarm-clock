'use strict';
const alarmSound = new Audio('./src/audio/Buzzer sound.wav');
const alarmTimeInput = document.getElementById('alarm-time');
const setAlarmButton = document.getElementById('set-alarm-btn');
const alarmStatus = document.getElementById('alarm-status');
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
let alarmTime = null;
let alarmIntervalId = null;
function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  hoursElement.textContent = hours;
  minutesElement.textContent = minutes;
}
function startAlarm() {
  alarmStatus.textContent = 'Alarm is Set for ' + alarmTime + '!';
  setAlarmButton.disabled = true;
  alarmIntervalId = setInterval(() => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const currentTime = hours + ':' + minutes;
    if (alarmTime === currentTime) {
      alarmSound.play();
      clearInterval(alarmIntervalId);
      alarmStatus.textContent = 'Alarm ringing!';
      setAlarmButton.disabled = false;
    // The botton line below trigger to  Stop the sound after 60 seconds
    // and reset the status message
      setTimeout(() => {                  
        alarmSound.pause();
        alarmSound.currentTime = 0;
        alarmStatus.textContent = '';
      }, 60000);
    }
  }, 1000);
}
function setAlarm() {
  const regExp = /^([01]\d|2[0-3]):([0-5]\d)$/;   
  // this function above validate or check 
  // if the time input in the HH:MM
  // fformat or not
  if (regExp.test(alarmTimeInput.value)) {      
    alarmTime = alarmTimeInput.value;           
    startAlarm();
    } else {
    alarmStatus.innerText = 'Invalid Input, Enter The Time in HH:MM Format.';
    }
}
setInterval(updateClock, 1000);
setAlarmButton.addEventListener('click', setAlarm);
