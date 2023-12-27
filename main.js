//creacion de variables
const gameHoles = document.querySelectorAll(".hole");
const gameMoles = document.querySelectorAll(".mole");
const gameScore = document.querySelector(".score");
let lastHole;
let score = 0;
let gameEnded= false;

//creacion de la funcion de tiempo aleatorio para que los Hans Topo salgan de los hoyos aleatoriamente
function randomTime(min, max){
    return Math.round(Math.random()*(max-min)+min);
}

//creacion de la funcion de agujero aleatorio en que se asoma Hans Topo
function randomHole(holes){
    const index = Math.floor(Math.random()*holes.length);
    const hole = holes[index];
    //condicional para que el hole seleccionado no sea el mismo de nuevo
    if(hole === lastHole){
        return randomHole(holes);
    }
    lastHole=hole;
    return hole;
}

//funcion tiempo que Hans Topo este asomado en el hole.
function timeShowingHans(){
    const time = randomTime(200,1000); //maximo 1s, que no sea demasiado facil
    const hole = randomHole(gameHoles);

    hole.classList.add("up");
    setTimeout(()=>{
        hole.classList.remove("up");
        if(!gameEnded){
            timeShowingHans();
        }
    },time)
}

//funcion StartGame 
function startGame(){
    gameScore.textContent=0;
    gameEnded=false;
    score=0;
    timeShowingHans();
    setTimeout(()=> {
    gameEnded=true;
    alert(`Game Over! Score = ${score}`);
    },15000)//el juego tendra una duracion de 15 segundos
}

//funcion wack para poder jugar con el raton
function wack(event){
    if(!event.isTrusted) return; //evitar scripts maliciosos que simulen clicks
    if(!event.target.classList.contains("up")) return;
    score++;
    event.target.classList.remove("up");
    gameScore.textContent = score;
}
//añadimos un evento click con la funcion wack en cada hole
gameHoles.forEach(hole => hole.addEventListener("click", wack));


