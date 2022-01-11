/*
 * @name Load and Display Image
 * @description Images can be loaded and displayed to the screen at their
 * actual size or any other size.
 * <p><em><span class="small"> To run this example locally, you will need an 
 * image file, and a running <a href="https://github.com/processing/p5.js/wiki/Local-server">
 * local server</a>.</span></em></p>

 */
let canv_x=720;
let canv_y=400;
 
let img; // Declare variable 'img'.
let numslices = 16;
let origin_x=100;
let origin_y=100;
let img1scale = 10;
let bkg_imgscale = 2;
let xoff;
let ampli=50;
let period = 2;

let horz_prog=0;
let horz_progcnt=0;
let vert_prog=0;
let vert_progcnt=0;

let tint_delta=0;

function setup() {
  createCanvas(canv_x, canv_y);
  coin_img = loadImage('data/mariocoin-as.png'); // Load the image
  bkg_img = loadImage('data/bonusroom-ap.png'); // Load the image
  thankshrrld_img = loadImage('data/thankshrrld.png');
  
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
       image(bkg_img, bkg_img.width*bkg_imgscale*horz_progcnt, bkg_img.height*bkg_imgscale*vert_progcnt, bkg_img.width*bkg_imgscale, bkg_img.height*bkg_imgscale); 
       
       noStroke();
       
       let bkgshade_ind=20*(horz_progcnt+vert_progcnt);
       let bkgshade = sin(((frameCount+bkgshade_ind)+10)/(TWO_PI*10))*100;
       blendMode(DODGE);
       
       fill(255,50+bkgshade);
       
       //rect(img.width*bkg_imgscale*horz_progcnt, img.height*bkg_imgscale*vert_progcnt, img.width*bkg_imgscale, img.height*bkg_imgscale);
       //circle(img.width*bkg_imgscale*horz_progcnt+img.width*bkg_imgscale/2, img.height*bkg_imgscale*vert_progcnt+img.height*bkg_imgscale/2,10);
       let cent_x=bkg_img.width*bkg_imgscale*horz_progcnt+bkg_img.width*bkg_imgscale/2;
       let cent_y=bkg_img.height*bkg_imgscale*vert_progcnt+bkg_img.height*bkg_imgscale/2;
       beginShape();
       vertex(cent_x-38,cent_y);
       vertex(cent_x,cent_y-38);
       vertex(cent_x+38,cent_y);
       vertex(cent_x,cent_y+38);
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
   split_sprite(100,100,0,4,thankshrrld_img);
   split_sprite(500,100,60,1,coin_img);


}

function split_sprite(org_x, org_y, phaseoff, pixperslice, img_in){
   ampli=mouseX/10; 
   period=mouseY/10;
  
   for(let i=0; i < numslices; i++){
     
     xoff = sin(((frameCount+phaseoff)+10*i)/(TWO_PI*period))*ampli;
     //xoff=0;

     numslices=img_in.height/pixperslice;
       
     image(img_in, org_x+xoff, org_y+i*img_in.height/numslices*img1scale, img_in.width * img1scale, img_in.height * img1scale/numslices, 0 ,i*img_in.height/numslices, 0 , img_in.height/numslices);   
   }
 
}
