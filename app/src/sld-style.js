const str = '[{"from":1,"to":19,"line":{"stroke":"#d7191c","stroke-width":"1","stroke-linejoin":"bevel","stroke-linecap":"square"}},{"from":19,"to":37,"line":{"stroke":"#e85b3a","stroke-width":"1","stroke-linejoin":"bevel","stroke-linecap":"square"}},{"from":37,"to":55,"line":{"stroke":"#f99e59","stroke-width":"1","stroke-linejoin":"bevel","stroke-linecap":"square"}},{"from":55,"to":73,"line":{"stroke":"#fec981","stroke-width":"1","stroke-linejoin":"bevel","stroke-linecap":"square"}},{"from":73,"to":91,"line":{"stroke":"#ffedab","stroke-width":"1","stroke-linejoin":"bevel","stroke-linecap":"square"}},{"from":91,"to":109,"line":{"stroke":"#ecf7ad","stroke-width":"1","stroke-linejoin":"bevel","stroke-linecap":"square"}},{"from":109,"to":127,"line":{"stroke":"#c4e687","stroke-width":"1","stroke-linejoin":"bevel","stroke-linecap":"square"}},{"from":127,"to":145,"line":{"stroke":"#97d265","stroke-width":"1","stroke-linejoin":"bevel","stroke-linecap":"square"}},{"from":145,"to":163,"line":{"stroke":"#58b453","stroke-width":"1","stroke-linejoin":"bevel","stroke-linecap":"square"}},{"from":163,"to":181,"line":{"stroke":"#1a9641","stroke-width":"1","stroke-linejoin":"bevel","stroke-linecap":"square"}}]';
const map = JSON.parse(str);
const last = map[map.length - 1];

const getStrokeWidth = (snelheidR) => {
  if (snelheidR < 0.25) return 1;
  if (snelheidR < 0.50) return 2;
  return 3;
};

export const getColors = () => map.map(x => x.line.stroke);

export const styleMap = map;

export const getStyle = (intensiteit, snelheidR) => {
  let style = map.find((x) => {
    const intens = parseInt(intensiteit, 10);
    return intens > x.from && intens <= x.to;
  });

  if (style === undefined) style = last;

  return {
    color: style.line.stroke,
    weight: getStrokeWidth(snelheidR),
  };
};
