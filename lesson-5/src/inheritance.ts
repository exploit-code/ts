export interface Center {
  x: number,
  y: number
}

export abstract class MyGraphicsPrimitive2D {
  protected top: number;
  protected bottom: number;
  protected left: number;
  protected right: number;

  constructor(top?: number, left?: number, bottom?: number, right?: number) {
    this.left = left;
    this.top = top;
    this.bottom = bottom;
    this.right = right;
  }

  moveVertical(moving: number): number {
    this.top = this.top + moving;
    this.bottom = this.bottom + moving;
    return this.top;
  }

  moveHorizontal(moving: number): number {
    this.left = this.left + moving;
    this.right = this.right + moving;
    return this.left;
  }
}

export abstract class MyAreaPrimitive2D extends MyGraphicsPrimitive2D {
  abstract square(): number
}

export class MyCircle extends MyAreaPrimitive2D {
  public center: Center;
  public radius: number;

  constructor(radius: number, center: Center) {
    super();
    this.radius = radius;
    this.center = {
      x: center.x,
      y: center.y
    }
  }

  square(): number {
    return Math.PI * (Math.pow(this.radius, 2));
  }

  moveVertical(moving: number): number {
    this.center.y = this.center.y + moving;
    return this.center.y;
  }

  moveHorizontal(moving: number): number {
    this.center.x = this.center.x + moving;
    return this.center.x;
  }

  paintCircle(top: number, left: number, radius: number): string {
    return `<div class="circle-to-move" style="top:${top}px; left:${left}px; width:${radius * 2}px; height: ${radius * 2}px;"></div>`;
  }
}

export class MyRectangle extends MyAreaPrimitive2D {
  public top: number;
  public bottom: number;
  public left: number;
  public right: number;

  constructor(top: number, left: number, bottom: number, right: number) {
    super(top, left, bottom, right);
  }

  width(): number | null {
    if (this.right > this.left) {
      return this.right - this.left;
    } else {
      return null;
    }
  }

  height(): number | null {
    if (this.bottom > this.top) {
      return this.bottom - this.top;
    } else {
      return null;
    }

  }

  square(): number {
    return this.width() * this.height();
  }

  moveVertical(moving: number): number {
    return super.moveVertical(moving);
  }

  moveHorizontal(moving: number): number {
    return super.moveHorizontal(moving);
  }

  paintRectangle(top: number, left: number, widthElem: number, heightElem: number): string {
    return `<div class="rectangle-to-move" style="top:${top}px; left:${left}px; width:${widthElem}px; height: ${heightElem}px;"></div>`;
  }
}
