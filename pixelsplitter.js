/*
 * @name Load and Display Image
 * @description Images can be loaded and displayed to the screen at their
 * actual size or any other size.
 * <p><em><span class="small"> To run this example locally, you will need an 
 * image file, and a running <a href="https://github.com/processing/p5.js/wiki/Local-server">
 * local server</a>.</span></em></p>

 */
 
 p5.disableFriendlyErrors = true
 
let canv_x=720;
let canv_y=720;
 
let img; // Declare variable 'img'.
let numslices = 16;
let origin_x=100;
let origin_y=100;
let img1scale = 12;
let bkg_imgscale = 3;
let xoff;
let ampli=50;
let period = 5;

let horz_prog=0;
let horz_progcnt=0;
let vert_prog=0;
let vert_progcnt=0;

let tint_delta=0;

let song;
let firstrun=false;

function preload() {
  song = loadSound('data/SMB3-King.mp3');
}


function setup() {
  
  song.play();
  song.loop();
  
  createCanvas(canv_x, canv_y);
  coin_img = loadImage('data/mariocoin-as.png'); // Load the image
  bkg_img = loadImage('data/bonusroom-ap.png'); // Load the image
  chest_img = loadImage('data/chest.png');
  bluestar_img = loadImage('data/bluestar.png');
  
  
  // 
  // song.play();
  
  //colorMode(HSB, 255);
}

function draw() {
   clear();
   noSmooth();
   
  
   // background
   while(vert_prog<canv_x){
      while(horz_prog<canv_x){
       let value = brightness(128);
       fill(value);
       
       noStroke();
       
       let bkgshade_ind=20*(horz_progcnt+vert_progcnt);
       let bkgshade = sin(((frameCount+bkgshade_ind)+10)/(TWO_PI*10))*100;
        
       //bkg_imgscale = bkgshade/10+12;
       
       image(bkg_img, bkg_img.width*bkg_imgscale*horz_progcnt, bkg_img.height*bkg_imgscale*vert_progcnt, bkg_img.width*bkg_imgscale, bkg_img.height*bkg_imgscale); 
       
       
       blendMode(DODGE);
       
       fill(255,100+bkgshade*2);
       
       //rect(img.width*bkg_imgscale*horz_progcnt, img.height*bkg_imgscale*vert_progcnt, img.width*bkg_imgscale, img.height*bkg_imgscale);
       //circle(img.width*bkg_imgscale*horz_progcnt+img.width*bkg_imgscale/2, img.height*bkg_imgscale*vert_progcnt+img.height*bkg_imgscale/2,10);
       let cent_x=bkg_img.width*bkg_imgscale*horz_progcnt+bkg_img.width*bkg_imgscale/2;
       let cent_y=bkg_img.height*bkg_imgscale*vert_progcnt+bkg_img.height*bkg_imgscale/2;
       beginShape();
       vertex(cent_x-19*bkg_imgscale,cent_y);
       vertex(cent_x,cent_y-19*bkg_imgscale);
       vertex(cent_x+19*bkg_imgscale,cent_y);
       vertex(cent_x,cent_y+19*bkg_imgscale);
       endShape(CLOSE);
       
       blendMode(BLEND);
       
       horz_progcnt=horz_progcnt+1;
       horz_prog=bkg_img.width*bkg_imgscale+horz_prog;


     }
     horz_progcnt=0;
     horz_prog=0;
     
     vert_progcnt=vert_progcnt+1;
     vert_prog=bkg_img.width*bkg_imgscale+vert_prog;
   }
   vert_progcnt=0;
   vert_prog=0;
  
    

   //draw sprites
   split_sprite(30,30,0,1,chest_img);
   split_sprite(250,250,20,0.5,bluestar_img);
   split_sprite(500,450,60,0.1,coin_img);
   
   if(song.isLoaded()&&(firstrun==false)){
     song.play()
     firstrun = true;
   }


}

function split_sprite(org_x, org_y, phaseoff, pixperslice, img_in){
   
   ampli=mouseX/10; 
   
   period=mouseY/10;
   
  
   for(let i=0; i < numslices; i++){
     
     

     xoff = sin(((frameCount+phaseoff)+10*i)/(TWO_PI*period))*ampli;




     numslices=img_in.height/pixperslice;
       
     image(img_in, org_x+xoff, org_y+i*img_in.height/numslices*img1scale, img_in.width * img1scale, img_in.height * img1scale/numslices, 0 ,i*img_in.height/numslices, 0 , img_in.height/numslices);   
   }
 
}

function mousePressed() {
  if (song.isPlaying()) {
      // .isPlaying() returns a boolean
      song.stop();
  } else {
      song.play();
  }
}
