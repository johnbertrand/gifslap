var rainbow_bars_container = document.createElement('div');
rainbow_bars_container.setAttribute("style","position:absolute;");
rainbow_bars_container.setAttribute('id','rainbow_bars');
document.getElementById('container').appendChild( rainbow_bars_container );

var rainbow_bars = {
	run: false,
	container: document.getElementById('rainbow_bars'),
	max_size: 100,
	current_size: 0,
	sky_height: 0,
	color: 0,
	rotate: 90,
	margin: 0,
	bar_width: 33,
	bar_height: 80,
	makeChaos: function(){
		text = "";
		possible  ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		for( var i=0; i < 25; i++ ){
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	},
	modColor: function(currentColor,a,frequency){
		red   = Math.floor(Math.sin(frequency*currentColor + 0) * 127 + 128);
		green = Math.floor(Math.sin(frequency*currentColor + 2) * 127 + 128);
		blue  = Math.floor(Math.sin(frequency*currentColor + 4) * 127 + 128);
		a = a;
		return ("rgba("+red+","+green+","+blue+","+a+")");	
	},
	draw: function(){
		if(!rainbow_bars.run){ return; }
		if( rainbow_bars.current_size > rainbow_bars.max_size ){ 
			rainbow_bars.container.removeChild( document.getElementsByClassName('chroma_bar')[0] );
			//clearInterval(loop);
		}
		
		var chaos = rainbow_bars.makeChaos();
		
		a = chaos[0];
		b = chaos.lastIndexOf(a);
		//if( b>sky_height ){ b = 1; }
		
		if( b>0 ){ rainbow_bars.sky_height = rainbow_bars.sky_height-b; }
		if( rainbow_bars.sky_height<0 ){ rainbow_bars.sky_height = -rainbow_bars.sky_height; }
		
		chroma_bar = document.createElement('p');
		chroma_bar.setAttribute("class","chroma_bar");
		chroma_bar.style.webkitTransform = "rotate("+rainbow_bars.rotate+"deg)";
		chroma_bar.style.margin = rainbow_bars.margin;
		chroma_bar.style.backgroundColor = rainbow_bars.modColor(rainbow_bars.color,(rainbow_bars.sky_height/14),.01);
		chroma_bar.style.paddingTop = (rainbow_bars.sky_height*30).toString()+"px";
		chroma_bar.style.borderLeft = "1px dotted yellow";
		chroma_bar.style.display = "inline-block";
		chroma_bar.style.width = rainbow_bars.bar_width;
		chroma_bar.style.height = rainbow_bars.bar_height;

		
		rainbow_bars.sky_height++;
		rainbow_bars.container.appendChild(chroma_bar);
		rainbow_bars.current_size++;
		rainbow_bars.color++;
	}
}