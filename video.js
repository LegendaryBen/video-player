function query(a){
    return document.querySelector(a);
}

let num = 0;
let num2 = 0;
let video = query(".video");
let zoom = query("#fullscreen");
let vid_container = query(".vid-container");
let play = query("#play");
let load = query(".load");
let current_time = query(".current-time");
let duration = query(".duration");
let mute = query("#mute");
let loop = query("#loop");
let load_container = query(".load-container");
let videos = ["rich.mp4","pekky2.mp4","pekky.mp4","pekky3.mp4","pekky4.mp4"];
let previous = query("#previous");
let next = query("#next");
let num6 = 0;








function load_video(){
    video.src = videos[num6];
}

load_video();




zoom.addEventListener("click",function(){
    if(num === 0){
        num = 1;
        zoom.innerHTML ="fullscreen_exit"
        vid_container.style.width = "100%";
        vid_container.style.height = "100vh";
    }else{
        num = 0;
        zoom.innerHTML = "fullscreen";
        vid_container.style.width = "700px";
        vid_container.style.height = "400px";
    }

});


play.addEventListener("click",function(){
    setInterval(function(){
        current_time.innerHTML = change_time(video.currentTime)
    },200)

    setTimeout(function(){
        duration.innerHTML = change_time(video.duration);
    },200)

    if(num2 === 0){
        num2 = 1;
        video.play();
        
       

        play.innerHTML = "pause";
    }else{
        num2 = 0;
        video.pause();
        play.innerHTML = "play_arrow";
    }
});


video.addEventListener("timeupdate",function(){
    let update_ = (video.currentTime /video.duration) * 100;
    load.style.width = update_ + "%";

})

function change_time(time){
    let min = Math.floor(time/60);
    if(min<10){
        min = `0${min}`;
    }

    let sec = Math.floor(time%60);
    if(sec<10){
        sec = `0${sec}`;
    }
    return `${min} : ${sec}`;
}

let num3 = 0;
mute.addEventListener("click",function(){   
    if(num3 === 0){
        num3 = 1;
        video.muted = true;
        mute.innerHTML = "volume_off";
    }else{
        num3 = 0;
        video.muted = false;
        mute.innerHTML = "volume_up";
    }
})

let num4 = 0;
loop.addEventListener("click",function(){
   if(num4 === 0) {
       num4 = 1;
       loop.style.backgroundColor  = "rgba(33, 33, 186, 0.827)";
      video.loop = true;
   }else{
    num4 = 0;
    loop.style.backgroundColor = "transparent";
    video.loop = false;
    
   }
});


load_container.addEventListener("click",function(e){
    video.currentTime = (e.offsetX/this.clientWidth) * video.duration;
});





previous.addEventListener("click",previous_);

function previous_(){
    num6 -= 1
    if(num6 < 0){
        num6 = videos.length - 1;
    }

    video.src = videos[num6];

    video.play();

    setTimeout(function(){
        duration.innerHTML = change_time(video.duration);
    },200)
    
}

next.addEventListener("click",next_);

function next_(){
    num6 += 1;
    if(num6 > videos.length - 1){
        num6 = 0;
    }
    video.src = videos[num6];
    video.play();

    setTimeout(function(){
        duration.innerHTML = change_time(video.duration);
    },200)
}


video.addEventListener("ended",function(){
    next_()
})