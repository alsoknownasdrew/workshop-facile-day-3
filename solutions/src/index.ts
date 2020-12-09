import * as O from "@app/Option";

export interface Newtype<URI, A> {
  _URI: URI;
  _A: A;
}

export interface Iso<A, B> {
  get: (a: A) => B;
  reverseGet: (a: B) => A;
}

export interface Prism<A, B> {
  getOption: (a: A) => O.Option<B>;
  reverseGet: (a: B) => A;
}

export function newtypeIso<N extends Newtype<any, any>>(): Iso<N["_A"], N> {
  return {
    get: (x) => x,
    reverseGet: (x) => x,
  };
}

export function newtypePrism<N extends Newtype<any, any>>(
  predicate: (a: N["_A"]) => boolean
): Prism<N["_A"], N> {
  return {
    getOption: (a) => (predicate(a) ? O.some(a) : O.none),
    reverseGet: (x) => x,
  };
}

export interface UserId extends Newtype<"UserId", string> {}

export const isoUserId = newtypeIso<UserId>();

export interface Int extends Newtype<"Int", number> {}

const isoInt = newtypeIso<Int>();

export const prismInt = newtypePrism<Int>((n) => Number.isInteger(n));

export function add(x: Int, y: Int): Int {
  return isoInt.get(isoInt.reverseGet(x) + isoInt.reverseGet(y));
}
