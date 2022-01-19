class EyeButton {
  constructor(org_x, org_y, phaseoff, pixperslice, img_in, scale_in){
    this.x = org_x;
    this.y = org_y;
    this.phase = phaseoff;
    this.pixperslice = pixperslice;
    this.img = img_in;
    this.scale = scale_in;
  }
  
  drawButton(){
    image(this.img,this.x,this.y,this.img.width*this.scale,this.img.height*this.scale);
    return 0;
  }
}