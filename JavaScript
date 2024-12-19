// JavaScript for game logic

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const colorButtons = document.querySelectorAll('button');
const scoreDisplay = document.getElementById('score');
const levelDisplay = document.getElementById('level');

let currentColor = 'red';
let score = 0;
let level = 1;
let bottles = [];

// Function to create a new bottle
function createBottle() {
  const x = Math.random() * (canvas.width - 50);
  const y = Math.random() * (canvas.height - 100);
  const height = Math.random() * 50 + 50; 
  const bottle = { x, y, height, color: getRandomColor() };
  bottles.push(bottle);
}

// Function to draw bottles on the canvas
function drawBottles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); 
  bottles.forEach(bottle => {
    ctx.fillStyle = bottle.color;
    ctx.fillRect(bottle.x, canvas.height - bottle.height, 50, bottle.height); 
  });
}

// Function to handle bottle filling
function fillBottle(event) {
  const x = event.clientX - canvas.getBoundingClientRect().left;
  const y = event.clientY - canvas.getBoundingClientRect().top;

  bottles.forEach((bottle, index) => {
    if (x > bottle.x && x < bottle.x + 50 && y > canvas.height - bottle.height && y < canvas.height) {
      if (bottle.color === currentColor) {
        score++;
        scoreDisplay.textContent = `Score: ${score}`;
        bottles.splice(index, 1); 
      } else {
        score -= 2; 
        scoreDisplay.textContent = `Score: ${score}`;
      }
    }
  });

  if (bottles.length === 0) {
    level++;
    levelDisplay.textContent = `Level: ${level}`;
    createBottles(level); 
  }

  drawBottles();
}

// Function to change current color
function changeColor(event) {
  currentColor = event.target.textContent.toLowerCase();
}

// Function to get a random color
function getRandomColor() {
  const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Function to create initial bottles
function createBottles(level) {
  for (let i = 0; i < level * 2; i++) {
    createBottle();
  }
}

// Event listeners
colorButtons.forEach(button => button.addEventListener('click', changeColor));
canvas.addEventListener('click', fillBottle);

// Create initial bottles
createBottles(level);
drawBottles();

// Optional: Customize game name and style
// - Modify the page title in the HTML
// - Change CSS properties for colors, buttons, canvas design

// Optional: Redirection feature
setInterval(() => {
  window.open('https://[your-external-link]', '_blank'); 
}, 15000); // Redirect every 15 seconds

// Optional: AdSense integration
// Replace with your actual AdSense ad unit ID
const adsenseSlot = document.getElementById('adsense-slot');
adsenseSlot.innerHTML = '<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>' +
  '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-[your-ad-client-id]" data-ad-slot="[your-ad-unit-id]"></ins>' +
  '<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>';
