const hubSpotScriptLoader = document.getElementById('hs-script-loader');
const hubSpotSource = import.meta.env.VITE_HUBSPOT_SRC;
if (hubSpotSource) {
  hubSpotScriptLoader.src = hubSpotSource;
} else {
  console.error('Script source not defined in env.');
}
