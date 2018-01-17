const str = '[{"from":0,"to":0.1,"line":{"stroke":"#d7191c","stroke-width":"1","stroke-linejoin":"round","stroke-linecap":"round"}},{"from":0.1,"to":0.2,"line":{"stroke":"#e85b3a","stroke-width":"1","stroke-linejoin":"round","stroke-linecap":"round"}},{"from":0.2,"to":0.3,"line":{"stroke":"#f99e59","stroke-width":"1","stroke-linejoin":"round","stroke-linecap":"round"}},{"from":0.3,"to":0.4,"line":{"stroke":"#fec981","stroke-width":"1","stroke-linejoin":"round","stroke-linecap":"round"}},{"from":0.4,"to":0.5,"line":{"stroke":"#ffedab","stroke-width":"1","stroke-linejoin":"round","stroke-linecap":"round"}},{"from":0.5,"to":0.6,"line":{"stroke":"#ecf7ad","stroke-width":"1","stroke-linejoin":"round","stroke-linecap":"round"}},{"from":0.6,"to":0.7,"line":{"stroke":"#c4e687","stroke-width":"1","stroke-linejoin":"round","stroke-linecap":"round"}},{"from":0.7,"to":0.8,"line":{"stroke":"#97d265","stroke-width":"1","stroke-linejoin":"round","stroke-linecap":"round"}},{"from":0.8,"to":0.9,"line":{"stroke":"#58b453","stroke-width":"1","stroke-linejoin":"round","stroke-linecap":"round"}},{"from":0.9,"to":1,"line":{"stroke":"#1a9641","stroke-width":"1","stroke-linejoin":"round","stroke-linecap":"round"}}]';
export const styleMap = JSON.parse(str);

const getStrokeWidth = (intensiteit) => {
  if (intensiteit < 30) return 1;
  if (intensiteit < 75) return 2;
  return 4;
};

export const getColors = () => styleMap.map(x => x.line.stroke);

export const getStyle = (intensiteit, snelheidR) => {
  const style = styleMap.find(x => snelheidR >= x.from && snelheidR <= x.to);

  const weight = getStrokeWidth(intensiteit);
  const color = style.line.stroke;

  return { weight, color };
};
