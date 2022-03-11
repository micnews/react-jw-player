function aspectRatioType(props, propName, componentName = 'ANONYMOUS') {
  if (props[propName]) {
    const value = props[propName];

    if (typeof value === 'string') {
      const vList = value.split(':');

      if (
        value === 'inherit' ||
        (vList.length === 2 && !isNaN(Number(vList[0])) && !isNaN(Number(vList[1])))
      ) {
        return null;
      }

      return new Error(
        `Invalid prop \`${propName}\` of value \`${value}\` supplied to ${componentName}, expected a value of \`Number:Number\``,
      );
    }

    return new Error(
      `Invalid prop \`${propName}\` of type ${typeof value} supplied to ${componentName}, expected a value of type \`string\``,
    );
  }

  return null;
}

export default aspectRatioType;
