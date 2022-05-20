function returnType(o: any): string {
  const s: string = Object.prototype.toString.call(o);
  const res = <any>s.match(/^\[object (.*)\]$/);
  return res[1];
}

const $type: any = {};

[
  "Object",
  "Function",
  "Array",
  "Symbol",
  "Date",
  "RegExp",
  "Udefined",
  "Null",
  "String",
  "Number",
  "Boolean",
].forEach((key) => {
  $type[`is${key}`] = function (o: any): boolean {
    return returnType(o) === key;
  };
});

$type.isPrimitive = function (o: any): boolean {
  return $type.isString(o) || $type.isNumber(o) || $type.isBoolean(o);
};

export default $type;
