/*
 * @name Load and Display Image
 * @description Images can be loaded and displayed to the screen at their
 * actual size or any other size.
 * <p><em><span class="small"> To run this example locally, you will need an 
 * image file, and a running <a href="https://github.com/processing/p5.js/wiki/Local-server">
 * local server</a>.</span></em></p>

 */


/////////////////////////////
let isProjectorVersion = false;
//////////////////////////////

p5.disableFriendlyErrors = true

let canv_x = 1024;
let canv_y = 768;
let rot_off=true;

let img; // Declare variable 'img'.
let img1scale = 0.4;
let img2scale = 0.75;
let but1scale = 0.5;
let bkg_imgscale = 6;
let draw_bkg = true;
let xoff;
let ampli = 8;
let period = 4.5;
let ringphs_shift = 0;

let cornerbuttonsize = 60;

let cellsize = 3; //

let ring_count = 4;
let ring_num = 5;
let T_one = 1000;
let T_two = 1000;

let horz_prog = 0;
let horz_progcnt = 0;
let vert_prog = 0;
let vert_progcnt = 0;

let tint_delta = 0;

let song;
let firstrun = false;

let ring_rad = 100;

let img_ar = [];

let testbutton;
let ringbutton_ar = [];
let buttonmast_ar = [];
let buttonmast2d_ar = [];
let textSecrets = [];

let eye_status = [];
let closedeye_indices = [];
let closed_count;
// let img_ar[];
let issongplaying = false;
let canonmode = false;

let currentbackgroundstring = "";



function preload() {
  //song = loadSound('data/cinnabarDEMO1.mp3');

  bkg_imgmountains = loadImage('data/mountains.jpg'); // Load the image
  bkg_img = loadImage('data/ktltpix.png'); // Load the image
  
  qr_img = loadImage('data/qreyewhite.png');
  glow_img = loadImage('data/goldenglow.png');
  skydi_img = loadImage('data/skydiamond.png');
  // qr_img = loadImage('data/transman.gif');
  
  chest_img = loadImage('data/chest.png');
  chestopen_img = loadImage('data/chest-open.png');
  bluestar_img = loadImage('data/bluestar.png');

  pixeye1_img = loadImage('data/amyeye-small-3b.png');
  pixeye2_img = loadImage('data/amyeye-small-3b.png');
  pixeye3_img = loadImage('data/amyeye-small-3b.png');
  pixeye4_img = loadImage('data/amyeye-small-3b.png');
  pixeye5_img = loadImage('data/amyeye-small-3b.png');

  pixeye_prime = loadImage('data/amyeye3-wc.png');
  pixeye_primeclosed = loadImage('data/amyeye3r-blank.png');

  pixeyeclosed_img = loadImage('data/1x1black.png');
}


function setup() {


  
  createCanvas(canv_x, canv_y);

  //load images
  img_ar[0] = pixeye1_img;
  img_ar[1] = pixeye2_img;
  img_ar[2] = pixeye3_img;
  img_ar[3] = pixeye4_img;
  img_ar[4] = pixeye5_img;
  // 
  //instantiate classes
  testbutton = new EyeButton(100, 100, 0, 1, chest_img);

  //create buttons for each eye
  for (let j = 0; j < ring_count; j++) {
    for (let i = 0; i < ring_num; i++) {
      if ((i == 0) & (j == 0)|(i==0)) {
        ringbutton_ar[i] = new EyeButton(100, 100, 0, 1, pixeye_primeclosed, but1scale);
      } else {
        ringbutton_ar[i] = new EyeButton(100, 100, 0, 1, pixeye1_img, but1scale);
      }
      buttonmast_ar[i + j * ring_num] = ringbutton_ar[i];
    }
    buttonmast2d_ar[j] = ringbutton_ar;
  }

  buildsecrets();
}

function draw() {

  //load background
  if (draw_bkg == true) {
    if (isProjectorVersion) {

      while (vert_prog < canv_x) {
        while (horz_prog < canv_x) {
          let value = brightness(80);

          //background(0,0,0);

          colorMode(RGB, 255);
          // let red_color = color(255,0,0);
          // fill(red_color);

          noStroke();
          
          noSmooth();
          
          

          let bkgshade_ind = 20 * (horz_progcnt + vert_progcnt);
          let bkgshade = sin(((frameCount + bkgshade_ind) + 10) / (TWO_PI * 10)) * 100;

          bkg_imgscale = bkgshade/160+12;

          //tint(20, 20, 20);

          image(bkg_img, bkg_img.width * bkg_imgscale * horz_progcnt, bkg_img.height * bkg_imgscale * vert_progcnt, bkg_img.width * bkg_imgscale, bkg_img.height * bkg_imgscale);

          //background(0);
          //blendMode(DODGE);

          fill(128,0,0,100+bkgshade*2);
          //background(0, 0, 0);

          //rect(img.width*bkg_imgscale*horz_progcnt, img.height*bkg_imgscale*vert_progcnt, img.width*bkg_imgscale, img.height*bkg_imgscale);
          //circle(img.width*bkg_imgscale*horz_progcnt+img.width*bkg_imgscale/2, img.height*bkg_imgscale*vert_progcnt+img.height*bkg_imgscale/2,10);
          let cent_x = bkg_img.width * bkg_imgscale * horz_progcnt + bkg_img.width * bkg_imgscale / 2;
          let cent_y = bkg_img.height * bkg_imgscale * vert_progcnt + bkg_img.height * bkg_imgscale / 2;
          
          beginShape();
          vertex((cent_x-10),cent_y-90);
          vertex((cent_x-10),cent_y-100);
          vertex((cent_x-2),cent_y-100);
          vertex((cent_x-2),cent_y-90);


          endShape(CLOSE);

          blendMode(BLEND);

          horz_progcnt = horz_progcnt + 1;
          horz_prog = bkg_img.width * bkg_imgscale + horz_prog;


        }
        horz_progcnt = 0;
        horz_prog = 0;

        vert_progcnt = vert_progcnt + 1;
        vert_prog = bkg_img.width * bkg_imgscale + vert_prog;
      }
      vert_progcnt = 0;
      vert_prog = 0;

    } else {
        image(bkg_imgmountains, 0,0,canv_x, canv_y);
    }
  }

  //scan all closed eyes and draw lines between them
  for (let i = 0; i < closed_count; i++) {
    for (let j = 0; j < closed_count; j++) {
      //determine if a line is to be drawn
      if (int(closedeye_indices[i] / ring_num) == int(closedeye_indices[j] / ring_num)) {
        //start line
        // eye_cellx1=int((buttonmast_ar[closedeye_indices[i]].x+50)/cellsize);
        // eye_celly1=int((buttonmast_ar[closedeye_indices[i]].y+27)/cellsize);
        // 
        // //end line
        // eye_cellx2=int((buttonmast_ar[closedeye_indices[j]].x+50)/cellsize);
        // eye_celly2=int((buttonmast_ar[closedeye_indices[j]].y+27)/cellsize);
        // live
        // // breshhamlerp(eye_cellx1,eye_celly1,eye_cellx2,eye_celly2);

        eye_cellx1 = int((buttonmast_ar[closedeye_indices[i]].x + 50));
        eye_celly1 = int((buttonmast_ar[closedeye_indices[i]].y + 27));

        //end line
        eye_cellx2 = int((buttonmast_ar[closedeye_indices[j]].x + 50));
        eye_celly2 = int((buttonmast_ar[closedeye_indices[j]].y + 27));

        line(eye_cellx1, eye_celly1, eye_cellx2, eye_celly2);
      }
    }
  }

  //draw sprites
  //for each ring...
  for (let j = 0; j < ring_count; j++) {
    //for each element in a ring...
    for (let i = 0; i < ring_num; i++) {

      let rot_dir = -1;

      //direction of rotation
      if (j % 2 == 0) {
        rot_dir = -1;
      } else {
        rot_dir = 1;
      }

      if(rot_off==true){rot_dir = 0;}
      

      let x_off = ring_rad * (j + 1) * sin((i / ring_num + (frameCount + j * ringphs_shift) * rot_dir / T_one) * TWO_PI);
      let y_off = ring_rad * (j + 1) * cos((i / ring_num + (frameCount + j * ringphs_shift) * rot_dir / T_two) * TWO_PI);

      //determin the center of the eye to be drawn
      let cent_x = canv_x / 2 - (img_ar[i % 5].width * but1scale / 2) + x_off;
      let cent_y = canv_y / 2 - (img_ar[i % 5].height * but1scale / 2) + y_off;


      let temp_ar = buttonmast_ar[j];

      buttonmast_ar[i + j * ring_num].x = cent_x;
      buttonmast_ar[i + j * ring_num].y = cent_y;

      buttonmast_ar[i + j * ring_num].drawButton();
    }
  }



  textSize(32);
  textAlign(CENTER);
  stroke(0, 0, 0);
  fill(255, 255, 255);
  text(currentbackgroundstring, canv_x / 2, canv_y / 2);
  
  if(isProjectorVersion){
    
    colorMode(HSB);
    
    let c = color(255,255,255);
    fill(c);
    
    //rect(canv_x/2-120,canv_y/2-120, 250, 250);
  
    split_sprite(canv_x/2-(skydi_img.width/2)*img1scale,canv_y/2-(skydi_img.height/2)*img1scale,1,100,skydi_img);
    
  blendMode(LIGHTEST);
    //glow
    image(glow_img,canv_x/2-(glow_img.width/2)*img2scale,canv_y/2-(glow_img.height/2)*img2scale,glow_img.width*img2scale,glow_img.height*img2scale);
  

  
    blendMode(MULTIPLY);
    split_sprite(canv_x/2-(qr_img.width/2)*img1scale,canv_y/2-(qr_img.height/2)*img1scale,1,100,qr_img);
    
    blendMode(BLEND);
  

    
    
    
    
    
  }
  // image(bluestar_img, 0,0);
}

function split_sprite(org_x, org_y, phaseoff, pixperslice, img_in, back) {

  // ampli=mouseX/10; 
  // 
  // period=mouseY/50;

  colorMode(HSB);
  
  numslices = 5;
  
  amplitude = 1.2;

  for (let i = 0; i < numslices; i++) 
  {
  
    
    xoff = amplitude*sin(((frameCount + phaseoff) + 10 * i) / (TWO_PI * period)) * ampli;
  
    numslices = img_in.height / pixperslice;
  
    image(img_in, org_x + xoff, org_y + i * img_in.height / numslices * img1scale, img_in.width * img1scale, img_in.height * img1scale / numslices, 0, i * img_in.height / numslices, 0, img_in.height / numslices);
  }

}

function mousePressed() {

  //scan to see if a button was pressed
  for (let j = 0; j < ring_count; j++) {
    for (let i = 0; i < ring_num; i++) {

      var cent_x = (img_ar[i % 5].width * but1scale / 2) + buttonmast_ar[i + j * ring_num].x;
      var cent_y = (img_ar[i % 5].height * but1scale / 2) + buttonmast_ar[i + j * ring_num].y;


      let dist = Math.sqrt((mouseX - cent_x) ** 2 + (mouseY - cent_y) ** 2)
      if (dist < 30) {
        if (buttonmast_ar[i + j * ring_num].isopen == true) {
          // buttonmast_ar[i+j*ring_num].img = pixeyeclosed_img;

          //blendMode(MULTIPLY);  

          if ((i == 0) & (j == 0)) {
            buttonmast_ar[i + j * ring_num].img = pixeye_prime;
          } else {
            buttonmast_ar[i + j * ring_num].img = pixeyeclosed_img;
          }


          buttonmast_ar[i + j * ring_num].isopen = false;
        } else {
          // buttonmast_ar[i+j*ring_num].img = img_ar[i%5];

          if ((i == 0) & (j == 0)) {
            buttonmast_ar[i + j * ring_num].img = pixeye_primeclosed;
          } else {
            buttonmast_ar[i + j * ring_num].img = img_ar[i % 5];
          }
          buttonmast_ar[i + j * ring_num].isopen = true;
        }

        //blendMode(BLEND);  
      }
    }
  }

  //check if cornern buttons were pressed...
  if ((mouseX < cornerbuttonsize) & (mouseY < cornerbuttonsize)) {
    if (ring_count < 4) {
      ring_count++;
      setup();
    }
  } else if ((mouseX < cornerbuttonsize) & (mouseY > (canv_y - cornerbuttonsize))) {
    if (ring_count > 1) {
      ring_count--;
      setup();
    }
  } else if ((mouseX > (canv_x - cornerbuttonsize)) & (mouseY > (canv_y - cornerbuttonsize))) {
    if (ring_num > 2) {
      ring_num--;
      setup();
    }
  } else if ((mouseX > (canv_x - cornerbuttonsize)) & (mouseY < cornerbuttonsize)) {
    if (ring_num < 9) {
      ring_num++;
      setup();
    }
  }

  closed_count = 0;
  closedeye_indices = [];
  //update the 'closed eye' matrix
  //and counts eyes that are closed
  closedeye_indices.fill(0);

  //scan all buttons to see which ones are closed
  for (let j = 0; j < ring_count; j++) {
    for (let i = 0; i < ring_num; i++) {
      if (buttonmast_ar[i + j * ring_num].isopen == false) {
        eye_status[i + j * ring_num] = 1;
        closedeye_indices[closed_count] = i + j * ring_num;
        closed_count++;
      } else {
        eye_status[i + j * ring_num] = 0;
      }
    }
  }

  print(ring_count);
  print(ring_num);
  print(closedeye_indices);

  updateBkgText();
}

function breshhamlerp(x0, y0, x1, y1) {
  drawcell(x0, y0);
  drawcell(x1, y1);

  let dx = abs(x1 - x0);
  let sx = x0 < x1 ? 1 : -1;
  let dy = -abs(y1 - y0);
  let sy = y0 < y1 ? 1 : -1;
  let error = dx + dy;

  while (1) {
    drawcell(x0, y0);
    if (x0 == x1 && y0 == y1) {
      break;
    };
    let e2 = 2 * error;

    if (e2 >= dy) {
      if (x0 == x1) {
        break;
      };
      error = error + dy;
      x0 = x0 + sx;
    }
    if (e2 <= dx) {
      if (y0 == y1) {
        break;
      };
      error = error + dx;
      y0 = y0 + sy;
    }

    // break;
  }

}

function drawcell(x_pos, y_pos) {
  //fill(255);
  rectMode(CORNER);
  noStroke();
  // rect(x_pos*cellsize,y_pos*cellsize,cellsize,cellsize);
  image(pixeyeclosed_img, x_pos * cellsize, y_pos * cellsize);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    if (ring_count < 4) {
      ring_count++;
    }
  } else if (keyCode === RIGHT_ARROW) {
    if (ring_count > 1) {
      ring_count--;
    }
  } else if (keyCode === DOWN_ARROW) {
    if (ring_num > 2) {
      ring_num--;
    }
  } else if (keyCode === UP_ARROW) {
    if (ring_num < 9) {
      ring_num++;
    }
  }

  setup();
}

function updateBkgText() {
  //check all secrets for a match
  for (let i = 0; i < textSecrets.length; i++) {
    //check ring count
    if (textSecrets[i].ring_count == ring_count) {
      //checkl ring num
      if (textSecrets[i].ring_num == ring_num) {

        // print("textSecrets[i].indices");
        // print(textSecrets[i].indices);
        // print("closedeye_indices");
        // print(closedeye_indices);

        set1 = new Set(textSecrets[i].indices);
        set2 = new Set(closedeye_indices);

        if (setsAreEqual(set1, set2)) {
          print("match found");
          currentbackgroundstring = textSecrets[i].text;
          break;
        } else {
          currentbackgroundstring = "";
        }

        print("currentbackgroundstring");
        // print(currentbackgroundstring);
      }
    }

  }
}


function setsAreEqual(a, b) {
  if (a.size !== b.size) {
    return false;
  }

  return Array.from(a).every(element => {
    return b.has(element);
  });
}