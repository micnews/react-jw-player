import getPlayerOpts from './get-player-opts';
import getCurriedOnLoad from './get-curried-on-load';
import initialize from './initialize';
import installPlayerScript from './install-player-script';

function installScriptAndInitialize(context, component) {
  const playerOpts = getPlayerOpts({
    playlist: component.props.playlist,
    isMuted: component.props.muted,
    hasAdvertising: !!component.props.generatePrerollUrl
  });

  const _initialize = () => {
    const player = context.jwplayer(component.props.playerId);
    initialize({ component, player, playerOpts });
  };

  const existingScript = context.document.querySelector(`#${component.uniqueScriptID}`);

  if (!existingScript) {
    installPlayerScript({
      context: context.document,
      onLoadCallback: _initialize,
      scriptSrc: component.props.playerScript,
      uniqueScriptID: component.uniqueScriptID
    });
  } else {
    existingScript.onload = getCurriedOnLoad(existingScript, _initialize);
  }
}

export default installScriptAndInitialize;
