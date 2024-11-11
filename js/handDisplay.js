const cards = [];
const hand = document.querySelector(".hand");
const { width, height } = hand.getBoundingClientRect();

const SUITS = ["diamonds", "hearts", "clubs", "spades"];
const CENTER = {
  x: width / 2,
  y: height / 2,
};

for (let i = 0; i < 12; i++) {
  const randomChoice = Math.floor(Math.random() * SUITS.length);
  const card = createCard(i, SUITS[randomChoice]);
  hand.appendChild(card);
  cards.push(card);
}

function renderCards(cards, radiusY = 290, radiusX = 420, influence = 0.6) {
  cards.forEach((card, index) => {
    const increment = Math.PI / cards.length;
    const angle = (index + 0.5) * increment - Math.PI;

    const translationY = Math.sin(angle) * radiusY + CENTER.y;
    const translationX = Math.cos(angle) * radiusX + CENTER.x;

    const cardAngle = (angle + Math.PI / 2) * influence;

    card.style.left = `${translationX}px`;
    card.style.top = `${translationY}px`;
    card.style.rotate = `${cardAngle}rad`;
  });
}

function createCard(rank, suit) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <div style="display: flex; justify-content: space-between">
    <div>${rank}</div>
    <div class=${suit}></div>
    </div>
    <div style="postion: relative">
        <div class="${suit}" style="position: absolute; top: 60%; left: 50%; transform: translate(-50%, -50%) scale(2)">
    </div>
  `;

  return card;
}

const radiusX = document.querySelector("#radiusX");
const radiusY = document.querySelector("#radiusY");
const influence = document.querySelector("#influence");

renderCards(cards);

radiusX.addEventListener("input", updateCards);
radiusY.addEventListener("input", updateCards);
influence.addEventListener("input", updateCards);

function updateCards() {
  renderCards(cards, radiusY.value, radiusX.value, influence.value);
}
