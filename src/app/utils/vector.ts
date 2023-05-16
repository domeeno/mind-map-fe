class Vector {
  private components: number[];

  constructor(...components: number[]) {
    this.components = components;
  }

  get length(): number {
    return this.components.length;
  }

  getComponent(index: number): number {
    return this.components[index];
  }

  norm(): number {
    return Math.sqrt(
      this.components.reduce((sum, component) => sum + component ** 2, 0)
    );
  }

  add(other: Vector): Vector {
    if (this.length !== other.length) {
      throw new Error("Vectors should have the same length");
    }
    const newComponents = this.components.map(
      (component, index) => component + other.getComponent(index)
    );
    return new Vector(...newComponents);
  }

  subtract(other: Vector): Vector {
    if (this.length !== other.length) {
      throw new Error("Vectors should have the same length");
    }
    const newComponents = this.components.map(
      (component, index) => component - other.getComponent(index)
    );
    return new Vector(...newComponents);
  }

  multiply(scalar: number): Vector {
    const newComponents = this.components.map(
      (component) => component * scalar
    );
    return new Vector(...newComponents);
  }

  divide(scalar: number): Vector {
    if (scalar === 0) {
      throw new Error("division by zero");
    }
    const newComponents = this.components.map(
      (component) => component / scalar
    );
    return new Vector(...newComponents);
  }

  dotProduct(other: Vector): number {
    if (this.length !== other.length) {
      throw new Error("Vectors should have the same length");
    }
    return this.components.reduce(
      (sum, component, index) => sum + component * other.getComponent(index),
      0
    );
  }

  crossProduct(other: Vector): Vector {
    if (this.length !== 3 || other.length !== 3) {
      throw new Error("cross product is possible only for 3D Vector");
    }
    const x =
      this.getComponent(1) * other.getComponent(2) -
      this.getComponent(2) * other.getComponent(1);
    const y =
      this.getComponent(2) * other.getComponent(0) -
      this.getComponent(0) * other.getComponent(2);
    const z =
      this.getComponent(0) * other.getComponent(1) -
      this.getComponent(1) * other.getComponent(0);
    return new Vector(x, y, z);
  }

  static random2DVector(lowerBound: number, upperBound: number): Vector {
    const x = Math.random() * (upperBound - lowerBound) + lowerBound;
    const y = Math.random() * (upperBound - lowerBound) + lowerBound;
    return new Vector(x, y);
  }

  distance(other: Vector): number {
    if (this.length !== other.length) {
      throw new Error("Vectors should have the same length");
    }
    const squaredDifferences = this.components.map(
      (component, index) => (component - other.getComponent(index)) ** 2
    );
    const sumSquaredDifferences = squaredDifferences.reduce(
      (sum, squaredDifference) => sum + squaredDifference,
      0
    );
    return Math.sqrt(sumSquaredDifferences);
  }

  setMagnitude(magnitude: number): void {
    const norm = this.norm();
    if (norm === 0) {
      this.components = this.components.map(() => magnitude);
    } else {
      this.components = this.components.map(
        (component) => (component * magnitude) / norm
      );
    }
  }
}
