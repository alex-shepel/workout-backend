type Modified<Type extends object, Modification extends Partial<Type>> = Type & {
  [Property in keyof Type]: Modification[Property];
};

export default Modified;
