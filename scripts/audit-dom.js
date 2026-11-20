// Read-only browser audit. Run through the supported browser's evaluate API.
// This is a targeted automated check, not a substitute for axe or a human audit.
export default function auditDOM() {
  const visible = el => {
    const r = el.getBoundingClientRect();
    if (r.width <= 0 || r.height <= 0) return false;
    for(let node=el;node;node=node.parentElement) {
      const s=getComputedStyle(node);
      if(s.visibility === 'hidden' || s.display === 'none') return false;
      if(node.tagName === 'DETAILS' && !node.hasAttribute('open') && !node.querySelector('summary')?.contains(el)) return false;
    }
    return true;
  };
  const rgb = s => s.trim().startsWith('#') ? s.trim().slice(1).match(/../g).map(v => +(`0x${v}`)) : (s.match(/[\d.]+/g) ?? []).map(Number);
  const luminance = color => color.slice(0,3).map(v => { v /= 255; return v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4; }).reduce((sum,v,i) => sum + v * [.2126,.7152,.0722][i], 0);
  const contrast = (a,b) => { const x = luminance(a), y = luminance(b); return (Math.max(x,y)+.05)/(Math.min(x,y)+.05); };
  const bg = el => {
    for (let node = el; node; node = node.parentElement) { const color = rgb(getComputedStyle(node).backgroundColor); if(color.length === 3 || color[3] === 1) return color; }
    return [255,255,255];
  };
  const leaves = [...document.querySelectorAll('body *')].filter(el => !el.children.length);
  const contrastFailures = [], smallText = [];
  let minimumContrast = 100, textNodes = 0;
  for (const el of leaves) {
    if(!el.textContent.trim() || ['SCRIPT','STYLE'].includes(el.tagName) || !visible(el)) continue;
    const style = getComputedStyle(el), size = +style.fontSize.replace('px','');
    const ratio = contrast(rgb(style.color), bg(el));
    const threshold = size >= 24 || (size >= 18.66 && +style.fontWeight >= 700) ? 3 : 4.5;
    minimumContrast = Math.min(minimumContrast,ratio); textNodes++;
    if(ratio + .01 < threshold) contrastFailures.push({text:el.textContent.trim().slice(0,70),ratio:+ratio.toFixed(2),threshold});
    if(size < 13) smallText.push({text:el.textContent.trim().slice(0,70),size});
  }
  const controls = [...document.querySelectorAll('.desktop-nav a, .mobile-menu summary, .mobile-panel a, .cv-link, .theme-button, .button, .text-link, .resource-links a, .abstract summary, .social-links a')].filter(visible);
  const undersizedTargets = controls.filter(el => {const r=el.getBoundingClientRect();return r.width < 43.9 || r.height < 43.9;}).map(el=>({text:el.textContent.trim(),width:el.getBoundingClientRect().width,height:el.getBoundingClientRect().height}));
  const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(el=>({level:+el.tagName[1],text:el.textContent.trim()}));
  const headingJumps = headings.filter((h,i)=>i>0 && h.level>headings[i-1].level+1);
  const missingNames = [...document.querySelectorAll('a,button,summary')].filter(visible).filter(el=>!el.getAttribute('aria-label') && !el.textContent.trim() && !el.querySelector('img[alt]'));
  const rootStyle=getComputedStyle(document.documentElement);
  return {
    url:location.href,viewport:{width:innerWidth,height:innerHeight,dpr:devicePixelRatio},theme:document.documentElement.dataset.theme ?? 'system',
    overflow:document.documentElement.scrollWidth>innerWidth,
    minimumTextContrast:+minimumContrast.toFixed(2),textNodes,contrastFailures,smallText,undersizedTargets,headingJumps,missingNames:missingNames.length,
    controlBorderContrast:+contrast(rgb(rootStyle.getPropertyValue('--control')),bg(document.body)).toFixed(2),
    h1Count:document.querySelectorAll('h1').length,
    activeNavigation:[...document.querySelectorAll('nav [aria-current="page"]')].filter(visible).map(el=>el.textContent.trim()),
    images:[...document.images].map(i=>({src:i.getAttribute('src'),alt:i.getAttribute('alt'),loaded:i.complete && i.naturalWidth>0})),
    canonical:document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
    sidebarScrollable:getComputedStyle(document.querySelector('.sidebar')).overflowY,
    bodyFont:getComputedStyle(document.body).fontSize,
  };
}
