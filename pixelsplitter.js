/*
 * @name Load and Display Image
 * @description Images can be loaded and displayed to the screen at their
 * actual size or any other size.
 * <p><em><span class="small"> To run this example locally, you will need an 
 * image file, and a running <a href="https://github.com/processing/p5.js/wiki/Local-server">
 * local server</a>.</span></em></p>

 */
 
 p5.disableFriendlyErrors = true
 
let canv_x=768;
let canv_y=768;
 
let img; // Declare variable 'img'.
let numslices = 16;
let origin_x=100;
let origin_y=100;
let img1scale = 8;
let but1scale = 4;
let bkg_imgscale = 3;
let draw_bkg=true;
let xoff;
let ampli=8;
let period = 4.5;

let ring_count =3;
let ring_num = 4;
let T_one = 1000;
let T_two = 1000;

let horz_prog=0;
let horz_progcnt=0;
let vert_prog=0;
let vert_progcnt=0;

let tint_delta=0;

let song;
let firstrun=false;

let ring_rad=100;

let img_ar = [];

let testbutton;
let ringbutton_ar=[];
let buttonmast_ar=[];
let buttonmast2d_ar=[];
// let img_ar[];

function preload() {
  song = loadSound('data/cinnabarDEMO1.mp3');
}


function setup() {
  // 
  song.play();
  song.loop();
  
  createCanvas(canv_x, canv_y);
  // coin_img = loadImage('data/mariocoin-as.png'); // Load the image
  bkg_img = loadImage('data/bonusroom-ap.png'); // Load the image
  chest_img = loadImage('data/chest.png');
  chestopen_img = loadImage('data/chest-open.png');
  bluestar_img = loadImage('data/bluestar.png');
  // pixeye1_img = loadImage('data/lowpixeye1.png');
  
  pixeye1_img = loadImage('data/lowpixeye1.png');
  pixeye2_img = loadImage('data/lowpixeye2.png');
  pixeye3_img = loadImage('data/lowpixeye3.png');
  pixeye4_img = loadImage('data/lowpixeye4.png');
  pixeye5_img = loadImage('data/lowpixeye5.png');
  pixeyeclosed_img = loadImage('data/lowpixeye-closed.png');
  
  img_ar[0] = pixeye1_img;
  img_ar[1] = pixeye2_img;
  img_ar[2] = pixeye3_img;
  img_ar[3] = pixeye4_img;
  img_ar[4] = pixeye5_img;
  // 
  //instantiate classes
  testbutton = new EyeButton(100,100,0,1,chest_img);
  
  for (let j=0; j<ring_count; j++){
    for (let i=0; i<ring_num; i++){
      // button_ar[i] = new EyeButton(100,100,0,1,chest_img);
      
      ringbutton_ar[i] = new EyeButton(100,100,0,1,img_ar[i],but1scale);
      
      buttonmast_ar[i+j*ring_num] = ringbutton_ar[i];
      
      // buttonmast2d_ar[j][i]=ringbutton_ar[i];
    }
    
    buttonmast2d_ar[j]=ringbutton_ar;
    
  }
  


}

function draw() {

   noSmooth();
   

   
   // img1scale = (mouseX-canv_x/2)/30;
  
   if(draw_bkg==true){
   while(vert_prog<canv_x){
      while(horz_prog<canv_x){
       let value = brightness(128);
       
       colorMode(RGB,255);
       let red_color = color(255,0,0);
       fill(red_color);
   
       noStroke();
   
       let bkgshade_ind=20*(horz_progcnt+vert_progcnt);
       let bkgshade = sin(((frameCount+bkgshade_ind)+10)/(TWO_PI*10))*100;
   
       //bkg_imgscale = bkgshade/10+12;
   
       image(bkg_img, bkg_img.width*bkg_imgscale*horz_progcnt, bkg_img.height*bkg_imgscale*vert_progcnt, bkg_img.width*bkg_imgscale, bkg_img.height*bkg_imgscale); 
   
   
       //blendMode(DODGE);
   
       fill(255,0,0,100+bkgshade*2);
   
       //rect(img.width*bkg_imgscale*horz_progcnt, img.height*bkg_imgscale*vert_progcnt, img.width*bkg_imgscale, img.height*bkg_imgscale);
       //circle(img.width*bkg_imgscale*horz_progcnt+img.width*bkg_imgscale/2, img.height*bkg_imgscale*vert_progcnt+img.height*bkg_imgscale/2,10);
       let cent_x=bkg_img.width*bkg_imgscale*horz_progcnt+bkg_img.width*bkg_imgscale/2;
       let cent_y=bkg_img.height*bkg_imgscale*vert_progcnt+bkg_img.height*bkg_imgscale/2;
       beginShape();
       vertex((cent_x-10),cent_y-90);
       vertex((cent_x-10),cent_y-100);
       vertex((cent_x-2),cent_y-100);
       vertex((cent_x-2),cent_y-90);


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
 }
    

   //draw sprites
   for(let j=0; j<ring_count; j++){
     for(let i=0; i <ring_num; i++){
      let rot_dir = -1;

       if(j%2==0){
         rot_dir = -1;
       } else {
         rot_dir = 1;
       }
       
       let x_off = ring_rad*(j+1) * sin((i/ring_num+frameCount*rot_dir/T_one)*TWO_PI);
       let y_off = ring_rad*(j+1) * cos((i/ring_num+frameCount*rot_dir/T_two)*TWO_PI);

       let cent_x=canv_x/2-(img_ar[i].width*img1scale/2)+x_off;
       let cent_y=canv_y/2-(img_ar[i].height*img1scale/2)+y_off;

        //update and draw chests
        let temp_ar = buttonmast_ar[j];
        
        buttonmast_ar[i+j*ring_num].x = cent_x;
        buttonmast_ar[i+j*ring_num].y = cent_y; 
        buttonmast_ar[i+j*ring_num].drawButton();
        
        // buttonmast2d_ar[j][i].x = cent_x;
        // buttonmast2d_ar[j][i].y = cent_y; 
        // buttonmast2d_ar[j][i].drawButton();
      }
    }

       
}

function split_sprite(org_x, org_y, phaseoff, pixperslice, img_in){
   
   // ampli=mouseX/10; 
   // 
   // period=mouseY/50;
   
  
   for(let i=0; i < numslices; i++){
     
     

     xoff = sin(((frameCount+phaseoff)+10*i)/(TWO_PI*period))*ampli;




     numslices=img_in.height/pixperslice;
       
     image(img_in, org_x+xoff, org_y+i*img_in.height/numslices*img1scale, img_in.width * img1scale, img_in.height * img1scale/numslices, 0 ,i*img_in.height/numslices, 0 , img_in.height/numslices);   
   }
 
}

function mousePressed() {
  // if (song.isPlaying()) {
  //     // .isPlaying() returns a boolean
  //     song.stop();
  // } else {
  //     song.play();
  // }
  
  print("mouseX");
  print(mouseX);
  print("mouseY");
  print(mouseY);
  
  for(let j=0; j<ring_count; j++){
    for(let i=0; i <ring_num; i++){
      
      var cent_x=(img_ar[i].width*but1scale/2)+buttonmast_ar[i+j*ring_num].x;
      var cent_y=(img_ar[i].height*but1scale/2)+buttonmast_ar[i+j*ring_num].y;

      
      let dist = Math.sqrt((mouseX-cent_x) ** 2 + (mouseY-cent_y) ** 2)

  
      if(dist<40){
        buttonmast_ar[i+j*ring_num].img = pixeyeclosed_img;
  
        print("i:");
        print(i);
        print("j:");
        print(j);
        print("dist:");
        print(dist);
      }
      }
    }
}