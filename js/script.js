document.querySelector(".control-buttons span").onclick = function () {
  let playerName = prompt("What is your name ?");
  if (playerName == "" || playerName == null) {
    document.querySelector(".name span").textContent = "NoName";
  } else {
    document.querySelector(".name span").textContent = playerName;
  }
  document.querySelector(".control-buttons").remove();
};

let duration = 1000,
  blocksContainer = document.querySelector(".memory-game-blocks"),
  blocks = Array.from(blocksContainer.children),
  orderRange = [...Array(blocks.length).keys()];

suffil(orderRange);

blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
  block.addEventListener("click", function () {
    filpBlock(block);
  });
});

function suffil(array) {
  let currentIndex = orderRange.length - 1,
    temp,
    Random;
  while (currentIndex > 0) {
    Random = Math.floor(Math.random() * currentIndex);
    temp = array[currentIndex];
    array[currentIndex] = array[Random];
    array[Random] = temp;
    currentIndex--;
  }
  return array;
}

function filpBlock(block) {
  block.classList.add("is-flipped");
  let allFlippedBlocks = blocks.filter((flippedblock) =>
    flippedblock.classList.contains("is-flipped")
  );
  if (allFlippedBlocks.length === 2) {
    stopClicking();
    isMatched(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

function stopClicking() {
  blocksContainer.classList.add("no-clicking");
  setTimeout(() => {
    blocksContainer.classList.remove("no-clicking");
  }, duration);
}

function isMatched(block1, block2) {
  let tries = document.querySelector(".tries span");
  if (block1.dataset.technology === block2.dataset.technology) {
    block1.classList.remove("is-flipped");
    block2.classList.remove("is-flipped");
    block1.classList.add("has-match");
    block2.classList.add("has-match");
  } else {
    tries.innerHTML = parseInt(tries.innerHTML) + 1;
    setTimeout(() => {
      block1.classList.remove("is-flipped");
      block2.classList.remove("is-flipped");
    }, duration);
  }
}