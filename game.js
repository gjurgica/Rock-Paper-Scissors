let inputs = {
    insideDivs: document.getElementsByClassName("box-inline"),
    scoreDiv: document.getElementById("score"),
    myScore: document.getElementById("my-score"),
    computerScore: document.getElementById("computer-score"),
    computerHeader: document.querySelector("#computer-choise"),
    mainHeader: document.querySelector(".box-header")
};
let variables = {
    count1: 0,
    count2: 0,
    winnerCsore: 5,
    gameOver: false,
};
inputs.myScore.textContent = variables.count1;
inputs.computerScore.textContent = variables.count2;
let methods = {
    getUserChoise: function (user) {
        if (user === "box-inline-one") {
            return "rock";
        } else if (user === "box-inline-two") {
            return "paper";
        }
        return "scissors";
    },
    getComputerChoise: function () {
        let choise = Math.floor((Math.random() * 3) + 1);
        if (choise === 1) {
            return "rock";
        } else if (choise === 2) {
            return "paper";
        }
        return "scissors";

    },
    compareMethod: function (user, computer) {
        if (user === computer) {
            inputs.computerHeader.textContent = computer;
        } else if (user === "rock" && computer === "scissors" || user === "scissors" && computer === "paper" || user === "paper" && computer === "rock") {
            inputs.computerHeader.textContent = computer;
            variables.count1++;
            inputs.myScore.textContent = variables.count1;
        } else {
            inputs.computerHeader.textContent = computer;
            variables.count2++;
            inputs.computerScore.textContent = variables.count2;
        }
    },
    gamePlay: function () {
        if (!variables.gameOver) {
            this.compareMethod(this.getUserChoise(userChoise), this.getComputerChoise());
            if (variables.count1 === variables.winnerCsore || variables.count2 === variables.winnerCsore) {
                if (variables.count1 === variables.winnerCsore) {
                    this.winnerInterface("images/winner.jpg", "THE WINNER TAKES THE ALL");
                    inputs.mainHeader.innerHTML += `
                    <embed name="fire" src="sounds/fireworks.mp3" loop="false" hidden="true" autostart="true">
                    `;
                } else if (variables.count2 === variables.winnerCsore) {
                    this.winnerInterface("images/sadface.png", "WHAT TO SAY?");
                    inputs.mainHeader.innerHTML += `
                    <embed name="fire" src="sounds/sad.mp3" loop="false" hidden="true" autostart="true">
                    `;
                }
                variables.gameOver = true;
            }
        }
    },
    winnerInterface: function (image, string) {
        inputs.mainHeader.innerHTML = `
        <h1>ANOTHER GAME?</h1>
        `
        for (let element of inputs.insideDivs) {
            element.innerHTML = `
            <h1>${string}<h1>
            <img src=${image} alt="paper">
            `
        }
    }
};
for (const element of inputs.insideDivs) {
    element.addEventListener("click", function () {
        userChoise = element.getAttribute("id");
        methods.getUserChoise(userChoise);
        methods.getComputerChoise();
        methods.gamePlay();
    })
}
document.querySelector(".box-btn-quit").addEventListener("click", function () {
    variables.gameOver = true;
});
document.querySelector(".box-btn-reset").addEventListener("click", function () {
    variables.gameOver = false;
    variables.count1 = 0;
    variables.count2 = 0;
    inputs.myScore.textContent = variables.count1;
    inputs.computerScore.textContent = variables.count2;
    inputs.computerHeader.textContent = "?";
    inputs.insideDivs[0].innerHTML = `
            <h1>ROCK</h1>
            <img src="images/rock.jpg" alt="rock">
    `;
    inputs.insideDivs[1].innerHTML = `
            <h1>PAPER</h1>
            <img src="images/paper.jpg" alt="paper">
    `;
    inputs.insideDivs[2].innerHTML = `
            <h1>SCISSORS</h1>
            <img src="images/scissors.png" alt="scissors">
    `;
    inputs.mainHeader.innerHTML = `
            <h1>Click in to your choise!</h1>
    `;

});



