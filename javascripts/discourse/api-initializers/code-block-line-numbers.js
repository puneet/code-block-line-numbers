import { apiInitializer } from "discourse/lib/api";

export default apiInitializer("1.14.0", (api) => {
  const decorateLines = (post) => {
    try {
      const classes = ['decorator', 'number', 'wrap', 'scroll'].map(c => `lines-${c}`);
  
      const split = /^(.*)$/mg;
      const elems = post.querySelectorAll('pre:not(.onebox) code:not(.lines-decorator)');
      elems.forEach(elem => {
        const count = elem.innerHTML.trim().match(split).length;
        const quote = elem.closest('aside') ? ['lines-in-quote'] : []
  
        elem.parentElement.classList.add(`lines-count-${count}`, ...classes, ...quote);
        elem.classList.add(`lines-count-${count}`, ...classes, ...quote);
        const lineClass = ['lines-line', ...quote].join(' ');
  
        // trim to hide trailing blank lines
        elem.innerHTML = elem.innerHTML.trim().replace(/^(.*)$/mg, `<span class="${lineClass}">$1</span>`);
      });
    } catch (e) {
      console.error(e);
    }
  }
  
  api.decorateCookedElement(decorateLines, {id: 'decorate-pre-code-lines'});
});
