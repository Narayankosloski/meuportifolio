const reveals = document.querySelectorAll('.reveal');

function animateReveal(){

reveals.forEach(el=>{

const top = el.getBoundingClientRect().top;

if(top < window.innerHeight - 100){
el.classList.add('active');
}

});

}

window.addEventListener('scroll',animateReveal);
animateReveal();