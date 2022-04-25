export enum ElementState {
  draggable = "draggable",
  static = "static",
  runtime = "runtime"
}

export enum ComponentsTypes {
  signs = "signs",
  monitor = "monitor",
  numbers = "numbers",
  equality = "equality"
}

export interface ColumnElement {
  state: ElementState;
  type: ComponentsTypes;
  id: string;
}

export enum ConstructorState {
  runtime = "runtime",
  constructor = "constructor"
}

export interface ColumnsState {
  elementsColumn: ColumnElement[];
  constructorColumn: ColumnElement[];
  constructorState: ConstructorState;
}

export function isInEnumTypeGuard<Enum>(
  object: Enum,
  possibleValue: unknown
): possibleValue is Enum[keyof Enum] {
  return Object.values(object).includes(possibleValue);
}
