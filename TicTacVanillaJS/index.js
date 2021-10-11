// Game state related data
const gameState = [
    [{id: 0, data: " "}, {id: 1, data: " "}, {id: 2, data: " "}],
    [{id: 3, data: " "}, {id: 4, data: " "}, {id: 5, data: " "}],
    [{id: 6, data: " "}, {id: 7, data: " "}, {id: 8, data: " "}],
];
let currentPlayer = "X";

const changePlayer = () => {
    document.querySelector("#player").innerText = currentPlayer;
}
changePlayer();

const container = document.querySelector(".container");

const generateGrid = (data) => {
    return `
        <div>
            ${data.map((state) => {
                return `
                    <div class="display-flex">
                        ${state.map(innerData => {
                            return `
                                <p data-cell-index=${innerData.id} class="box">${innerData.data}</p>
                            `;
                        }).join("")}
                    </div>
                `
            }).join("")}
        </div>
    `;
}

container.innerHTML = generateGrid(gameState);
container.addEventListener("click", function(e) {
    if(e.target.nodeName === "P") {
        console.log("e.target ", e.target);
        e.target.innerText = currentPlayer;
        const id = parseInt(e.target.getAttribute("data-cell-index"));
        gameState.forEach(state => {
            state.forEach(innerData => {
                if(innerData.id === id) {
                    innerData.data = currentPlayer;
                }
            });
        });
        evaluateResult();

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        changePlayer();
    }
});

const evaluateResult = () => {
    const winningCases = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    const flatArray = gameState.flat();
    for(var i=0; i<=7; i++) {
        const CASE = winningCases[i];
        var a = flatArray[CASE[0]];
        var b = flatArray[CASE[1]];
        var c = flatArray[CASE[2]];
        if(a.data === " " || b.data === " " || c.data === " ") {
            continue;
        }
        if(a.data === b.data && b.data === c.data) {
            alert(`${currentPlayer} Win!!!!`);
            break;
        }
    }
}

