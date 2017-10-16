/* @flow */
type OptsType = {
  context: any,
  onLoadCallback: Function,
  scriptSrc: string,
  uniqueScriptId: string,
};

const installPlayerScript = ({
  context,
  onLoadCallback,
  scriptSrc,
  uniqueScriptId,
}: OptsType) => {
  const jwPlayerScript = context.createElement('script');
  jwPlayerScript.id = uniqueScriptId;
  jwPlayerScript.src = scriptSrc;
  jwPlayerScript.onload = onLoadCallback;

  context.head.appendChild(jwPlayerScript);
};

export default installPlayerScript;
