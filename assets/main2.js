

const querry = document.querySelector.bind(document)
const  querrys= document.querySelectorAll.bind(document)
const app2={
    playSongWhenYouClicks:function(){
        
        let song2 = querrys('.song')
        song2.forEach(function(value,indext){
            if(indext ==app.curentIndext)
            {
                value.classList.add('songActive')
            }
            let isActive =false
        
            
            value.onclick = function(){
                    
                    querry('.song.songActive').classList.remove('songActive')
                    value.classList.add('songActive')
                    app.curentIndext=indext
                    app.loadCurrentSong();
                    playaudio.play();
        
               } 
              
        
        }
        
        )
       
        
    },
    autoNextInList: function(){
        let song2 = querrys('.song')
        song2.forEach(function(value,indext){
           
            if(indext ==app.curentIndext)
            {
                querry('.song.songActive').classList.remove('songActive')
                value.classList.add('songActive')
            }


        })
    },
    start: function(){
        app.defineproperties()
        
        app.logs()
        app.render();
       
        
       
        app.loadCurrentSong()
        app.nextSongWhenEnd()
        app.handEvent();
        


        this.playSongWhenYouClicks()
        app.handEvent()
        this.autoNextInList()
    }
}
app2.start();






