class Result<T, E extends Error> {
  private readonly value: T | E;

  private constructor(value: T | E) {
    this.value = value;
  }

  static ok<T>(data: T): Result<T, Error> {
    return new Result<T, Error>(data);
  }

  static err<E extends Error>(error: E): Result<any, E> {
    return new Result<any, E>(error);
  }

  when({ ok, err }: { ok: (data: T) => void; err: (error: E) => void }) {
    if (this.value instanceof Error) {
      return err(this.value);
    } else {
      return ok(this.value);
    }
  }

  unwrap(): T {
    if (this.value instanceof Error) {
      throw this.value;
    }
    return this.value;
  }

  unwrapOr(or: T): T {
    try {
      return this.unwrap();
    } catch {
      return or;
    }
  }
}
