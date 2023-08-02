const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const finalScore = document.getElementById("finalScore");
finalScore.innerText = mostRecentScore;
username.addEventListener("keyup", () => {
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
  e.preventDefault();
  console.log("Clicked the Save Button");
};
