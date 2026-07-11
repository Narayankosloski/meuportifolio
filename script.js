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
const video = document.getElementById("showreelVideo");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

        if(entry.isIntersecting){
            video.play();
        }else{
            video.pause();
        }

    });
},{
    threshold:0.5
});

observer.observe(video);