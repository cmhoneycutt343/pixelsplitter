class EyeButton {
  constructor(org_x, org_y, phaseoff, pixperslice, img_in){
    this.x = org_x;
    this.y = org_y;
    this.phase = phaseoff;
    this.pixperslice = pixperslice;
    this.img = img_in;
  }
  
  drawButton(){
    // image(this.img,this.x,this.y);
    print("hello method");
    return 0;
  }
}