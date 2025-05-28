import { Vector } from "./Vector";

export class Particle {
  pos: Vector;
  acc: Vector;
  vel: Vector;
  r: number;
  children: Particle[];
  c: string;
  maxSpeed: number;
  maxForce: number;

  constructor(pos: Vector, vel: Vector, c = "white", r = 4) {
    this.pos = pos;
    this.acc = new Vector(0, 0);
    this.vel = vel;
    this.r = r;
    this.children = [];
    this.c = c;
    this.maxSpeed = 4;
    this.maxForce = 1;
  }

  applyForce(force: Vector) {
    this.acc = force;
  }

  update() {
    this.pos.add(this.vel);
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.acc = new Vector(0, 0);
  }

  show(point: (x: number, y: number, c: string, r: number) => void) {
    point(this.pos.x, this.pos.y, this.c, this.r);
  }

  borders(t = 0, WIDTH: number, HEIGHT: number) {
    // t lets you choose between two ways of handling canvas borders
    if (t == 0) {
      if (this.pos.x > WIDTH) {
        this.pos.x = 0;
      } else if (this.pos.x < 0) {
        this.pos.x = WIDTH;
      } else if (this.pos.y > HEIGHT) {
        this.pos.y = 0;
      } else if (this.pos.y < 0) {
        this.pos.y = HEIGHT;
      }
    } else {
      if (this.pos.x > WIDTH || this.pos.x < 0) {
        this.vel.x = -this.vel.x;
      } else if (this.pos.y > HEIGHT || this.pos.y < 0) {
        this.vel.y = -this.vel.y;
      }
    }
  }
}
