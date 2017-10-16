/* @flow */

const getCurriedOnLoad = (existingScript: any, callback: Function) => {
  const previousOnload = existingScript.onload || (() => {});
  const curriedOnLoad = () => {
    previousOnload();
    callback();
  };

  return curriedOnLoad;
};

export default getCurriedOnLoad;
