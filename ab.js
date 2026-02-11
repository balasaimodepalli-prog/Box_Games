const boxSelected=document.querySelectorAll('.container');
const screenText=document.querySelector('.screen');
let count=0;
let score=0;
const HighScore= document.querySelector('.HighScore');
let highScore=localStorage.getItem('highScore')||0;
highScore=Number(highScore);
HighScore.innerText=`HighScore:${highScore}`;
let premium=false;
let ultraPremium=false;
const counter=document.querySelector('.counter');
const scoreCount=document.querySelector('.scoreCounter');
function saveScore(score){
    if(score>highScore){
            highScore=score;
            HighScore.innerText=`HighScore:${score}`;
            localStorage.setItem('highScore',score);
        }

}
boxSelected.forEach(box =>{box.addEventListener('click',()=>{
    if(count===0)
    {   screenText.innerText=""
        saveScore(score);
        reset();
    }
    
    if(count===10 && !premium && !ultraPremium){
        screenText.innerText="limit exceeded \n click a box to start new diplay\n or try premium for more chances";
        count=0;
        saveScore(score);
        reset();
        
        return;
    }
    else if(count===20 && premium){
        screenText.innerText="premium limit exceeded \n click a box to start new diplay";
        count=0;
        saveScore(score);
        reset();
        return;
    }
    else if(count===30 && ultraPremium){
        screenText.innerText=" ultra premium limit exceeded \n click a box to start new diplay";
        count=0;
        saveScore(score);
        reset();
        return;
    }

    counter.classList.add('showCount');
    scoreCount.classList.add('showCount');
    counter.innerText=` count: ${count+1}`;
    let msg=box.innerText;
    let msgNumber=NumberFind(msg);
    let num=Math.ceil(Math.ceil(Math.random()*12));
    score=score+num;
    saveScore(score);
    scoreCount.innerText=` score: ${score}`;
    boxSelected.forEach(btn=>btn.classList.remove('clicked'));
    count+=1;
    box.classList.add('clicked');
   
    const p=document.createElement("p");

    p.innerText+=`you have clicked ${msg} + box score:${num}`;
    

    
    
    screenText.appendChild(p);
    p.scrollIntoView();
    
    //screenText.scrollTop=screenText.scrollHeightHeight;


});});

const removeScr=document.querySelector('.button');
removeScr.addEventListener('click',reset);
function reset(){
    if(count===0 ){
        score=0;
        return;}
        saveScore(score);
    counter.innerText='count: 0';
    scoreCount.innerText='score: 0';
    score=0;

    screenText.innerText="display reseted";
    boxSelected.forEach(btn=>btn.classList.remove('clicked'));
    count=0;
}

const userMode=document.querySelector('.userMode');
function showMessage()
{
    const dis=document.querySelector('.pop');
    dis.classList.add('pop-up');
    dis.innerHTML=`
    <button class="close"><img src="close.svg" ></button>
    <div class=content-1><p>Hey Try our premium vervsion for more chances</p><p>✔️ Up to 20 cahnces</p><p>✔️ have premium badge</p></div>
    <div class=content-2><p>Hey Try our ultra premium vervsion for more chances</p><p>✔️ Up to 30 cahnces</p><p>✔️ have ultra premium &nbsp; &nbsp; &nbsp; badge</p></div>
    <div class="premiumBtn">TRY PREMIUM</div>
    <div class="ultraPremiumBtn">TRY ULTRA PREMIUM</div>
    `
    const closeBtn=document.querySelector('.close');
    closeBtn.addEventListener('click',()=>{
        overlay.style.display = "none";


        dis.classList.remove('pop-up');
        dis.innerHTML="";
    });
    const premiumBtn=document.querySelector('.premiumBtn');
    premiumBtn.addEventListener('click',()=>{
        if(premium || ultraPremium)
        {   msg='You alredy have subscription';
            clearPop(dis,msg)
            return;
        }
        premium=true;
        userMode.innerText=" PREMIUM";
        userMode.style.color="blue";
        msg='You have premimum subscription';
        clearPop(dis,msg);
    });
    const ultraPremiumBtn=document.querySelector('.ultraPremiumBtn');
    ultraPremiumBtn.addEventListener('click',()=>{
        if(premium){
            msg='You  have upgraded to ultra premium subscription';
            userMode.innerText=" ULTRA PREMIUM";
            userMode.style.color="goldenrod";
            premium=false;
            ultraPremium=true;
            clearPop(dis,msg)
            return;
        }
        else if(ultraPremium)
        {   msg=' You alredy have subscription';
            clearPop(dis,msg)
            return;
        }
        userMode.innerText=" ULTRA PREMIUM";
        userMode.style.color="goldenrod";
        premium=false;
        ultraPremium=true;
        msg='You have ultrapremium subscription';
        clearPop(dis,msg);
    });

    reset();
}
const premiumBtn=document.querySelector('.premium');
const overlay = document.querySelector('.overlay');

premiumBtn.addEventListener('click',()=>{
    
overlay.style.display = "block";

    showMessage();
   
})
    const popMsg=document.querySelector('.popMsg');
function clearPop(dis,msg)
{
    dis.classList.remove('pop-up');
    dis.innerHTML="";
    overlay.style.display = "none";
    //overlay.classList.remove('overlay');
    popMsg.classList.add('msgDisplay');

    popMsg.innerText=`${msg} \n \n click this message to clear`;
    popMsg.addEventListener('click',()=>
    {
        popMsg.classList.remove('msgDisplay');
        popMsg.innerText=``;
    });


}

document.addEventListener('click',(e)=>{
     if(!popMsg.contains(e.target) && !e.target.closest('.ultraPremiumBtn') && !e.target.closest('.premiumBtn') ){
        popMsg.classList.remove('msgDisplay');
        popMsg.innerText=``;
    }
        
   
    
});
function NumberFind(msg)
{   
    let str=msg.split(' ');
    return str[1];
}
const clearKey=document.querySelector('.clear');
clearKey.addEventListener('click',()=>{
    localStorage.clear()
    HighScore.innerText=`HighScore:${0}`;
    location.reload();
}
);

const lightModeBtn=document.querySelector('.light');
const darkModeBtn=document.querySelector('.dark');
const body=document.querySelector('.body');
lightModeBtn.addEventListener('click',()=>{
    body.classList.remove('darkMode'); 
});
darkModeBtn.addEventListener('click',()=>{
    body.classList.add('darkMode'); 
});