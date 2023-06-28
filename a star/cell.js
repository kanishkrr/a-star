class Cell {
  constructor(i, j) {
      this.i = i;
      this.j = j; 
      this.f = 0;
      this.h = 0;
      this.g = 0;
      this.cameFrom = null;
      this.nearby = [];
      this.block = false;
      this.x = (this.i * w)+10;
      this.y = (this.j * w)+10;
      this.w = w-20;
      this.a = this.i * w;
      this.b = this.j * w;
      this.c = w;
  }
  
  show(colorToFill) {
      fill(colorToFill);
      //stroke(0);
      noStroke();
      rect(this.a, this.b, this.c, this.c);
      if (this.block) {
          fill(51, 51, 153);
          noStroke();
          rect(this.x, this.y, this.w, this.w);
      }
  }
  
  update() {
      if (this.x > this.i * w) {
          this.x--;
      }
      if (this.y > this.j * w) {
          this.y--;
      }
      if (this.a > this.i * w) {
          this.a--;
      }
      if (this.b > this.j * w) {
          this.b--;
      }
      if (this.w < w) {
          this.w += 2;
      }
      if (this.c < w) {
          this.c += 2;
      }
  }
  
  checkNeighbors() {
      if (this.i > 0) {
          this.nearby.push(grid[this.i-1][this.j]);
      }
      if (this.i < rows-1) {
          this.nearby.push(grid[this.i+1][this.j]);
      }
      if (this.j > 0) {
          this.nearby.push(grid[this.i][this.j-1]);
      }
      if (this.j < cols-1) {
          this.nearby.push(grid[this.i][this.j+1]);
      }
  }
}