var rainbow_bars = {
	run: false,
	bars: document.getElementById('map'),
	max_size: 100,
	current_size: 0,
	sky_height: 0,
	color: 0,
	rotate: 90,
	margin: 0,
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
		if( rainbow_bars.current_size > rainbow_bars.max_size ){ 
			rainbow_bars.bars.removeChild( document.getElementsByClassName('dirt')[0] );
			//clearInterval(loop);
		}
		
		var chaos = rainbow_bars.makeChaos();
		
		a = chaos[0];
		b = chaos.lastIndexOf(a);
		//if( b>sky_height ){ b = 1; }
		
		if( b>0 ){ rainbow_bars.sky_height = rainbow_bars.sky_height-b; }
		if( rainbow_bars.sky_height<0 ){ rainbow_bars.sky_height = -rainbow_bars.sky_height; }
		
		dirt = document.createElement('p');
		dirt.setAttribute("class","dirt");
		dirt.style.webkitTransform = "rotate("+rainbow_bars.rotate+"deg)";
		dirt.style.margin = rainbow_bars.margin;
		dirt.style.backgroundColor = rainbow_bars.modColor(rainbow_bars.color,(rainbow_bars.sky_height/14),.01);
		dirt.style.paddingTop = (rainbow_bars.sky_height*30).toString()+"px";
		
		rainbow_bars.sky_height++;
		rainbow_bars.bars.appendChild(dirt);
		rainbow_bars.current_size++;
		rainbow_bars.color++;
	}
}