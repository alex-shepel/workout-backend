type RequiredProperty<Type extends object, Key extends keyof Type> = Type & {
  [Property in Key]-?: Type[Property];
};

export default RequiredProperty;
