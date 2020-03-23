const items = [...document.querySelectorAll('.banner li')].map(node => node.innerText);

let next = 0;

const banner = document.querySelector('.banner');
banner.innerHTML = '';
const thisNode = document.createElement('li');
const thatNode = document.createElement('li');
banner.appendChild(thisNode);
banner.appendChild(thatNode);

function swap() {
  const thisOne = items[next];
  const followingOne = items[(next + 1) % items.length];

  thisNode.innerText = thisOne;
  thatNode.innerText = followingOne;
  next = (next + 1) % items.length;
}

swap();

banner.addEventListener('animationiteration', (e) => {
  console.log(e);
  swap();
});

banner.addEventListener('animationend', (e) => {
  if (e.animationName == "prescroll") {
    banner.classList.remove("prescroll");
    banner.classList.add("scroll");
  }
})
