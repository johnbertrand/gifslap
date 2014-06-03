var Jazz2 = document.getElementById("Jazz2");
Jazz2.MidiInOpen(2);
Jazz2.MidiOutOpen(3);

window.setInterval(function(){
  var arr2;
  while(arr2=Jazz2.QueryMidiIn()){
  a2=arr2.slice(1,arr2.length);
  
  if(a2[0]==145&&a2[1]==64&&a2[2]==64){/////LIVID BUTTON
  
    os_hud.update();
  
  }

  
  //$('#midi-info').text(a2[0]+" "+a2[1]+" "+a2[2]);
  // if(a2[0]==177&&a2[1]==11){ //LEFT JOYSTICK VERTICAL
    
  // }else if(a2[0]==177&&a2[1]==10){ //LEFT JOYSTICK HORIZONTAL
    
    
  // }else if(a2[0]==177&&a2[1]==13){ //RIGHT JOYSTICK VERTICAL
    
    
  // }else if(a2[0]==177&&a2[1]==12){ //RIGHT JOYSTICK HORIZONTAL
    
    
  // }else if(a2[0]==177&&a2[1]==14){//BREAKOUT KNOB 1
  
    
  // }else if(a2[0]==177&&a2[1]==15){//BREAKOUT KNOB 2
    
    
  // }else if(a2[0]==177&&a2[1]==16){ //BREAKOUT KNOB 3
    
  
  // }else if(a2[0]==177&&a2[1]==17){//BREAKOUT KNOB 4
    
    
  // }
  else if(a2[0]==177&&a2[1]==9){////LEFT SLIDER

    // BG SIZE

    if(a2[2]==0){ a2[2]=1; }

      a2[2] = a2[2]+"%";

      if(a2[2]=="127%"){ a2[2]="cover"; }

      $('#bg-box').css({"background-size": a2[2]})
    
  }else if(a2[0]==177&&a2[1]==8){/////RIGHT SLIDER
    
    // INNER BG SIZE

    if(a2[2]==0){ a2[2]=1; }

      a2[2] = a2[2]+"%";

      if(a2[2]=="127%"){ a2[2]="contain"; }

      $('#inner-bg-box').css({"background-size": a2[2]})

  // }else if(a2[0]==145&&a2[1]==64&&a2[2]==64){/////LIVID BUTTON


  }else if(a2[0]==145&&a2[1]==69&&a2[2]==64){//button 1
  
    os_hud.fg_advance_view();

  }else if(a2[0]==145&&a2[1]==70&&a2[2]==64){//button 2
    
    os_hud.bg_advance_view();


  }else if(a2[0]==145&&a2[1]==66&&a2[2]==64){//button 3
    
    os_hud.fg_launch();

  }else if(a2[0]==145&&a2[1]==67&&a2[2]==64){//button 4

    os_hud.bg_launch();    

  }else if(a2[0]==145&&a2[1]==71&&a2[2]==64){//button 5
    
    os_hud.inner_bg_advance_view();


  }else if(a2[0]==145&&a2[1]==68&&a2[2]==64){//button 6
    
    os_hud.inner_bg_launch();
  
  }else if(a2[0]==177&&a2[1]==3){/////KNOB 1
    
    inner_bg_mod.box.css('margin-top',a2[2]/3+"%");  

  }else if(a2[0]==177&&a2[1]==2){/////KNOB 2

    inner_bg_mod.box.css('width',a2[2]+5+"%");      
  }else if(a2[0]==177&&a2[1]==1){/////KNOB 3
    
    inner_bg_mod.box.css('height',a2[2]+5+"%");      
      

  }else if(a2[0]==177&&a2[1]==0){/////KNOB 4
  
  inner_bg_mod.box.css({'-webkit-transform':'rotate('+a2[2]*1.5+'deg)'});

  }else if(a2[0]==177&&a2[1]==5){/////KNOB 5
    
    inner_bg_mod.box.css("opacity", a2[2]*.01);
   
  }else if(a2[0]==177&&a2[1]==4){/////KNOB 6
  
    
  }else if(a2[0]==177&&a2[1]==6){/////KNOB 7
   
  
  }else if(a2[0]==177&&a2[1]==7){/////KNOB 8
   
   bg_mod.box.css("opacity", a2[2]*.01); 
    
  }else if(a2[0]==145&&a2[2]==64){/////GRID BUTTONS

    rippler.show_block(a2[1],0);

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==0){/////GRID A1
    

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==1){/////GRID A2
    

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==2){/////GRID A3
  

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==3){/////GRID A4
  

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==4){/////GRID A5
  

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==5){/////GRID A6
    
    
  }else if(a2[0]==145&&a2[2]==64&&a2[1]==6){/////GRID A7
    

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==7){/////GRID A8
    

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==8){/////GRID B1
    

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==9){/////GRID B2
  
  }else if(a2[0]==145&&a2[2]==64&&a2[1]==10){/////GRID B3
  
  }else if(a2[0]==145&&a2[2]==64&&a2[1]==11){/////GRID B4

  
  }else if(a2[0]==145&&a2[2]==64&&a2[1]==12){/////GRID B5
    
  }else if(a2[0]==145&&a2[2]==64&&a2[1]==13){/////GRID B6
    

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==14){/////GRID B7
    

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==15){/////GRID B8
    

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==16){/////GRID C1
    

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==17){/////GRID C2
  

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==18){/////GRID C3
  

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==19){/////GRID C4
    

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==20){/////GRID C5
  

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==21){/////GRID C6
    

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==22){/////GRID C7
    

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==23){/////GRID C8
    

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==24){/////GRID D1
    

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==25){/////GRID D2
    

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==26){/////GRID D3
  

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==27){/////GRID D4
    

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==28){/////GRID D5
  

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==29){/////GRID D6
  

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==30){/////GRID D7
  

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==31){/////GRID D8
  

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==32){/////GRID E1
  

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==33){/////GRID E2
    

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==34){/////GRID E3
  

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==35){/////GRID E4
    
    
  }else if(a2[0]==145&&a2[2]==64&&a2[1]==36){/////GRID E5
  

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==37){/////GRID E6
  

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==38){/////GRID E7
  

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==39){/////GRID E8
  

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==40){/////GRID F1
    

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==41){/////GRID F2
  

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==42){/////GRID F3
  

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==43){/////GRID F4
    

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==44){/////GRID F5
  

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==45){/////GRID F6
  

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==46){/////GRID F7
  

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==47){/////GRID F8
  

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==48){/////GRID G1
    

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==49){/////GRID G2
  
  }else if(a2[0]==145&&a2[2]==64&&a2[1]==50){/////GRID G3
  
  
  }else if(a2[0]==145&&a2[2]==64&&a2[1]==51){/////GRID G4
    

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==52){/////GRID G5 
    

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==53){/////GRID G6
  

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==54){/////GRID G7
  

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==55){/////GRID G8
  

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==56){/////GRID H1
  

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==57){/////GRID H2
  

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==58){/////GRID H3
  

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==59){/////GRID H4
  

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==60){/////GRID H5
  

  }else if(a2[0]==145&&a2[2]==64&&a2[1]==61){/////GRID H6 
        
        
  }else if(a2[0]==145&&a2[2]==64&&a2[1]==62){/////GRID H7
  
  
  }else if(a2[0]==145&&a2[2]==64&&a2[1]==63){/////GRID H8
    
  }
}
},0);

//illuminate buttons

var illuminate_on_block = function(button){
  Jazz2.MidiOut(0x91,button,1);
}
var blackout_on_block = function(button){
  Jazz2.MidiOut(0x91,button,0);
}

// ILLUMINATE EVERYTHING

x=0;
lighterup = setInterval(function(){
  if(x>64){ clearInterval(lighterup);}
  illuminate_on_block(x);
  x++;
},25);


//Middle Line
// Jazz2.MidiOut(0x91,0,1);
// Jazz2.MidiOut(0x91,8,1);
// Jazz2.MidiOut(0x91,16,1);
// Jazz2.MidiOut(0x91,24,1);
// Jazz2.MidiOut(0x91,32,1);
// Jazz2.MidiOut(0x91,40,1);
// Jazz2.MidiOut(0x91,48,1);
// Jazz2.MidiOut(0x91,56,1);
// Jazz2.MidiOut(0x91,64,1);
