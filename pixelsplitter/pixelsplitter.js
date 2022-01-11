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
//let numslices = 16;
let origin_x=100;
let origin_y=100;
let img1scale = 10;
let img2scale = 10;
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
  img = loadImage('data/mariocoin-as.png'); // Load the image
  img2 = loadImage('data/bonusroombkg.png'); // Load the image
  
  colorMode(HSB, 255);
}

function draw() {
   clear();
   noSmooth();
   
      // background

   //while(horz_prog<canv_x){
   //  image(img2, img.width*img2scale*horz_progcnt, 0, img.width*img2scale, img.height*img2scale); 
     
     
   //  horz_progcnt=horz_progcnt+1;
   //  horz_prog=img.width*img2scale+horz_prog;
   //}
   
   while(vert_prog<canv_x){
      while(horz_prog<canv_x){
       image(img2, img.width*img2scale*horz_progcnt, img.height*img2scale*vert_progcnt, img.width*img2scale*(horz_progcnt+1), img.height*img2scale); 
       
       horz_progcnt=horz_progcnt+1;
       horz_prog=img.width*img2scale+horz_prog;
       

     }
     horz_progcnt=0;
     horz_prog=0;
     
   vert_progcnt=vert_progcnt+1;
   vert_prog=img.width*img2scale+vert_prog;
     
   }
   
   vert_progcnt=0;
   vert_prog=0;

   
   coindraw(100,100,0,4);
   coindraw(300,100,30,8);
   coindraw(500,100,60,16);


}

function coindraw(org_x, org_y, phaseoff, numslices){
   ampli=mouseX/10; 
   period=mouseY/10;
  
   for(let i=0; i < numslices; i++){
     
     xoff = sin(((frameCount+phaseoff)+10*i)/(TWO_PI*period))*ampli;
     //xoff=0;

     image(img, org_x+xoff, org_y+i*img.height/numslices*img1scale, img.width * img1scale, img.height * img1scale/numslices, 0 ,i*img.height/numslices, 0 , img.height/numslices);   
   }
  
  print(img.height);
  //reset tint
  //tint(255,255,255);
}
