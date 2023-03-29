export const executable = (flag: boolean) => {
  return (target: any, propertyDescriptor: any): any => {
    const method = target.value;
    target.value = !flag
      ? null
      : function (...args: any) {
          method.apply(this, args);
        };
  };
};
