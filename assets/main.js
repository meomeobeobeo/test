const $=document.querySelector.bind(document)
const $$=document.querySelectorAll.bind(document); 
// song in time
var dashboard = $('.dashboard');
var nameSongInHead = $('.namemusic')
var cdPicture = $('.picture')
var playaudio = $('.audio')
var controlsong = $('.control')
var back = $('.back')
var next = $('.next')
var audio_progress = $('.progress')
var progressBar= $('.Bar')
var cdthumpanimate 
var repeat= $('.reload')







const app = {
    
    curentIndext:0,
    isPlay : false,
    isrepeat : false,
    isActivesong:false,
     songs :[
        {
            nameSong: 'Daoko',
            picture: "/assets/img/picture1.jpg",
            music: "/assets/music/music1.mp3",
    
    
    
        },
        {
            nameSong: "We dont't talk any more.",
            picture: "/assets/img/picture2.jpg",
            music: "/assets/music/music2.mp3",
        },
        {
            nameSong: 'Phải chăng em đã yêu anh.',
            picture: "/assets/img/picture3.jpg",
            music: "/assets/music/music3.mp3",
        },
        {
            nameSong: 'Girl like you.',
            picture: "/assets/img/picture4.jpg",
            music: "/assets/music/music4.mp3",
        },
        {
            nameSong: 'Chrismas snow.',
            picture: "/assets/img/picture5.jpg",
            music: "/assets/music/music5.mp3",
        }
    ],
   
     

    // data


    // active song
    // render song list

    





    render: function(){
        var html=''

        const result = this.songs.map(function(song,index){
            return `
            <div class="song"  >
            <div class="head_song">
                <div class="songpicture" style="background-image:url('${song.picture}') ">
                
                </div>
            </div>

            <div class="nameSong">
                    ${song.nameSong}
            </div>
            <div class="moreinfor"><div class="icon"><i class="fas fa-ellipsis-v icon"></i></div></div>
        </div>

            
            
            `
        })
        // end map
        html = result.join('')
        var col = $('.audio_progress')
        col.innerHTML = html;
        

    },
    defineproperties:function(){
       Object.defineProperty(this, 'currentSong',{
           get:function(){
               return this.songs[this.curentIndext]
           }
       })

    },
    logs:function(){

    },
    checkheadingLength:function(){
        let text = nameSongInHead.innerText
        if(text.length>=20){
            let newtext= text.slice(0,20)+'...'
            nameSongInHead.innerText=newtext
        }
    },
    loadCurrentSong:function(){
      nameSongInHead.innerText = this.currentSong.nameSong
      cdPicture.style.backgroundImage = `url(${this.currentSong.picture})`
      playaudio.src = `${this.currentSong.music}`
      this.checkheadingLength()




     
    },
    cdrotate: function(){
         cdthumpanimate = cdPicture.animate([
            { transform: 'rotate(360deg)' }
        ],
        {
            // time options
            duration: 10000,
            iterations: Infinity
        }
        )

        cdthumpanimate.pause()

    },
    stop_and_pause:function(){
        _this=this;
        let playing=$('.playing')
        let pause = $('.pause')
        playing.classList.add('active');
        controlsong.onclick=function(){
            if (_this.isPlay) {
               
               playaudio.pause()

            } else {
                 playaudio.play()
 
            }


            
          
    
        }
        playaudio.onplay=function(){

            _this.isPlay=true;
            playing.classList.remove('active');
            pause.classList.add('active');
            cdthumpanimate.play();
            
            

    }
     playaudio.onpause=function(){
            


            _this.isPlay=false
            pause.classList.remove('active');
            playing.classList.add('active');
            cdthumpanimate.pause();
 
    }


       

    },
    nextSong:function(){
        this.curentIndext++;
        _this=this;
        if(_this.curentIndext>=_this.songs.length)
        {
            this.curentIndext=0;
        }

        this.loadCurrentSong()
        app2.autoNextInList();
    },
    previousSong:function(){
        
    
       this.curentIndext--;
            if(this.curentIndext<0){
                this.curentIndext=this.songs.length-1;
            }
            
        


        this.loadCurrentSong()
        app2.autoNextInList();

    },
    changeprogressSong: function(){
    let secondsPersent = 0 ;  
    progressBar.onmousedown = function(){
       playaudio.pause();
        

    }
    progressBar.onmouseup = function(){
        playaudio.play();
       
    }
    
      playaudio.ontimeupdate=function(){
       
         if(playaudio.duration) {

           secondsPersent=playaudio.currentTime/playaudio.duration*100
         
        
        }
         audio_progress.value=secondsPersent
        

      }
     
     
     
      //change progress bar audio will pause and when 
      
      
      
      audio_progress.onchange=function(e){
        playaudio.currentTime = e.target.value/100 * playaudio.duration;
        
        

    }

   

        
    },
    repeat:function(){
        _this=this
        repeat.onclick=function(){
          if(_this.isrepeat){
              _this.isrepeat=false;
            repeat.classList.remove("active-btn")

           

          }
          else{
              _this.isrepeat=true;
            repeat.classList.add('active-btn')
            if(repeat.classList.contains("active-btn")){
                playaudio.onended=function(){
                    playaudio.currentTime = 0;
                    playaudio.play();
                }
            }
            
          }
        }
       
        


    },
    nextSongWhenEnd:function(){
        _this=this
        playaudio.onended = function(){
            _this.nextSong();
            playaudio.play()
            app2.autoNextInList();

            
        }

    },
    activeSongWhenClicked:function(){
      

    },

    



    handEvent:function() {
        const ofApp = this
        document.onscroll=function() {
            const cd = $('.picture')
            const cdheight=cd.offsetHeight
            const cdwidth=cd.offsetWidth
            
            document.onscroll=function() {

                const scrollTop = window.scrollY;
                const newCDheight = cdheight - scrollTop;
                const newCDwidth = cdwidth - scrollTop
                cd.style.paddingTop = newCDheight>0?newCDheight +'px':0
                cd.style.width = newCDwidth>0?newCDwidth +'px' :0

            }

        }


        this.stop_and_pause();
        next.onclick=function(){
            ofApp.nextSong();
            playaudio.play();
        }
        back.onclick=function(){
            ofApp.previousSong();
            playaudio.play();
        }
        this.changeprogressSong();
        this.cdrotate() 
        this.repeat()
        this.activeSongWhenClicked()

        

        

    },
    //  START PROGRAM
    start :function() {
       
        
        

    }









}
app.start()
