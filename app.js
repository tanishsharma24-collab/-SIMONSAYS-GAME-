//variable diclration
let gameseq = [];
let userseq = [];
let color = ["red", "orange", "pink", "yellow"];
let gamestarted = false;
let level = 0;

let h2 = document.querySelector("h2");


// Start game
document.addEventListener("keypress", function() {

    if(gamestarted == false)
    {
        console.log("game is started");

        gamestarted = true;

        levelup();
    }
});


// Game flash
function gameflash(btn)
{
    btn.classList.add("gf");

    setTimeout(() => {
        btn.classList.remove("gf");
    }, 300);
}


// User flash
function userflash(btn)
{
    btn.classList.add("uf");

    setTimeout(() => {
        btn.classList.remove("uf");
    }, 300);
}


// Reset game
function reset()
{
    gamestarted = false;
    gameseq = [];
    userseq = [];
    level = 0;
}


// Check user's answer
function check(idx)
{
    if(userseq[idx] === gameseq[idx])
    {
        // Current level completed
        if(userseq.length == gameseq.length)
        {
            levelup();
        }
    }
    else
    {
        //background color white krna
        let body = document.querySelector("body").style.backgroundColor="red";
         setTimeout(()=>
        {
             let body = document.querySelector("body").style.backgroundColor="white";
        } , 400);

        h2.innerHTML = `Game Over! your score is ${level} Press any key to start`;

        reset();
    }
}


// Generate next level
function levelup()
{
    userseq = [];

    level++;

    h2.innerText = `Level ${level}`;

    //ab game kudh sa random color pick krka flash kraga
    let randomIdx = Math.floor(Math.random() * color.length);
    let randomColor = color[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);

    gameflash(randomBtn);

    gameseq.push(randomColor);
}


// Button press
function btnpress()
{
    // Don't allow clicking when game isn't running(game start he nhi huaa to user koi button press nhi kar payaga)
    if(gamestarted == false) return;
     
    //user na jo btn press kiya uska color ko userseq mai dal diya
    userflash(this);
    let uid = this.getAttribute("id");
    userseq.push(uid);

    check(userseq.length - 1);
}


// Add click listener
let btns = document.querySelectorAll(".btn");
for(let btn of btns)
{
    btn.addEventListener("click", btnpress);
}