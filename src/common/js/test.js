/**
 * Created by lenovo on 2017/10/17.
 */
export class Point {
  constructor (x, y) {
    this.x = x
    this.y = y
    this.arr = [1, 2, 3]
  }
  toString () {
    return this.x + this.y
  }
}
export class Color extends Point {
  constructor (x, y, color) {
    super(x, y)
    this.color = color
  }
  toString () {
    return this.x + this.y + this.color
  }
}
