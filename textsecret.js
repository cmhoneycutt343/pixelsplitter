class TextSecret{
  
  constructor(ring_count, ring_num, indices, text){
    this.ring_count = ring_count;
    this.ring_num = ring_num;
    this.indices = indices;
    this.text = text;
  }
}


function buildsecrets()
{
  // textSecrets[0] = new TextSecret(4,5,[0],"hello");
  // textSecrets[1] = new TextSecret(4,5,[0,1,4],"goodbytes");
  // textSecrets[2] = new TextSecret(4,5,[0,2,3],"question everything?");
  // textSecrets[3] = new TextSecret(4,5,[0,1,2,3,4],"Wh4t is a story \n told out of order?");
  
  textSecrets.push(new TextSecret(4,5,[0],"It all starts with awareness. \n Simply opening your eyes \n and allowing yourself to see."));
  textSecrets.push(new TextSecret(4,5,[1,4],"Are we every really \n anything but alone?"));
  textSecrets.push(new TextSecret(4,5,[0,1,4],"is our seperation is \n an illusion?"));
  
  textSecrets.push(new TextSecret(4,5,[0,2,3],"From there a point of view \n can be formed"));
  textSecrets.push(new TextSecret(4,5,[1,2,3,4],"Just because you can't see it\n - doesn't mean it isn't there"));
  textSecrets.push(new TextSecret(4,5,[0,1,2,3,4],"What is a story \n when it's told \n out of order?"));
  textSecrets.push(new TextSecret(4,5,[2,3],"What is the unobserved \n objective world?"));
  
  textSecrets.push(new TextSecret(4,5,[0,1,2,3,4,5,6,7,8,9],"Is a story out of order \n a world without time?"));
  textSecrets.push(new TextSecret(4,5,[1,2,3,4,5,6,7,8,9],"Can a story exist \n without someone to perceive it?"));

  
}