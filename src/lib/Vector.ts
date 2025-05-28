import { random } from "./utils";

export class Vector {
  x: number;
  y: number;
  m: number;
  dir: number;

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.m = this.mag();
    this.dir = this.heading();
  }

  copy() {
    return new Vector(this.x, this.y);
  }

  set(x: number, y: number) {
    this.x = x;
    this.y = y;

    this.mag();
    this.heading();

    return this;
  }

  static add(v0: Vector, v1: Vector) {
    return new Vector(v0.x + v1.x, v0.y + v1.y);
  }

  add(v0: Vector) {
    this.x += v0.x;
    this.y += v0.y;

    this.mag();
    this.heading();

    return this;
  }

  static sub(v0: Vector, v1: Vector) {
    return new Vector(v0.x - v1.x, v0.y - v1.y);
  }

  sub(v0: Vector) {
    this.x -= v0.x;
    this.y -= v0.y;

    this.mag();
    this.heading();

    return this;
  }

  mult(e: number | Vector) {
    if (e instanceof Vector) {
      this.x *= e.x;
      this.y *= e.y;
    } else {
      this.x *= e;
      this.y *= e;
    }

    this.mag();
    this.heading();

    return this;
  }

  div(e: number | Vector) {
    if (e instanceof Vector) {
      this.x /= e.x;
      this.y /= e.y;
    } else {
      this.x = this.x / e;
      this.y = this.y / e;
    }

    this.mag();
    this.heading();

    return this;
  }

  static dist(v1: Vector, v2: Vector) {
    return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2));
  }

  mag() {
    const i = Math.pow(this.x, 2) + Math.pow(this.y, 2);

    this.m = Math.sqrt(i);

    return this.m;
  }

  setMag(m: number) {
    this.m = m;
    this.x = Math.cos(this.dir) * m;
    this.y = Math.sin(this.dir) * m;

    return this;
  }

  heading() {
    this.dir = Math.atan2(this.y, this.x);

    return this.dir;
  }

  static random() {
    // Random unit (m=1) vector
    const ang = random({ min: -Math.PI, max: Math.PI });

    const x = Math.cos(ang);
    const y = Math.sin(ang);

    return new Vector(x, y);
  }

  static fromAngle(a: number) {
    const x = Math.cos(a);
    const y = Math.sin(a);

    return new Vector(x, y);
  }

  limit(max: number) {
    if (this.m > max) {
      this.setMag(max);
    }
  }
}
