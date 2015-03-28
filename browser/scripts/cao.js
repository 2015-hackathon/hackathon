$(document).ready(function(){
	var cao = function(){
		var _=this;
		_.video = document.getElementById('video');
		_.score = document.querySelector('input[type="range"]');

		this.play = function() { 
			setTimeout( function(){ _.video.volume=0; }, 6000 );
			if (_.video.paused)
  				_.video.play(); 
			else 
 	 			_.video.pause(); 
		} 

		this.big = function() { 
			_.video.width=1024; 
		}

		this.small = function(){ 
			_.video.width=600; 
		}

		this.normal = function() { 
			_.video.width=800; 
		}

		this.change = function( num ){
			var target = document.querySelector('.value');
  			var ago = $('.value').html();
  			console.log(num);
  			$(".value").animate({
        		fontSize: 30px,
        		width: ''
    		});
		}
	}

	var x = new cao();
	$('#play').click(function(e){
    	x.play();
	});
	$('.change').click(function(e){
		var fun = e.toElement.id;
		switch ( fun ){
			case 'big':
				x.big();
			case 'small':
				x.small();
			case 'normal':
				x.normal();
			default:
				console.log(fun);
		}
	});

	$('.value').click(function(){
		x.change(100);
	});
});