(() => {
  const intro = document.getElementById('brand-intro');
  const name = document.getElementById('intro-name');
  const since = document.getElementById('intro-since');
  let cancelled = false;
  let finished = false;
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  function finish(immediate = false) {
    if (finished) return;
    finished = true;
    cancelled = true;
    if (immediate) {
      intro.remove();
      document.body.classList.remove('intro-active');
      return;
    }
    intro.classList.add('intro-exit');
    setTimeout(() => {
      intro.remove();
      document.body.classList.remove('intro-active');
    }, 700);
  }

  async function type(element, value, interval) {
    for (let i = 1; i <= value.length && !cancelled; i++) {
      element.textContent = value.slice(0, i);
      await wait(interval);
    }
  }

  async function erase(element, interval) {
    for (let i = element.textContent.length - 1; i >= 0 && !cancelled; i--) {
      element.textContent = element.textContent.slice(0, i);
      await wait(interval);
    }
  }

  document.getElementById('intro-skip').addEventListener('click', () => finish());
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    finish(true);
  } else {
    (async () => {
      await wait(240);
      await type(name, 'WITH LOVE MC', 95);
      await wait(330);
      await type(since, 'SINCE 2017', 105);
      await wait(740);
      await erase(since, 48);
      await erase(name, 48);
      if (!cancelled) finish();
    })();
  }
})();

document.getElementById('year').textContent=new Date().getFullYear();
document.querySelectorAll('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>a.closest('details').open=false));
document.getElementById('request-form').addEventListener('submit',event=>{
  event.preventDefault();
  const form=event.currentTarget;
  if(!form.reportValidity())return;
  const type=form.elements.type.value;
  const date=form.elements.date.value;
  const occasion=form.elements.event.value.trim();
  const details=form.elements.details.value.trim();
  const lines=['Olá, With Love MC! Gostaria de pedir um orçamento.','Pedido: '+type];
  if(date)lines.push('Data da ocasião: '+date);
  if(occasion)lines.push('Ocasião: '+occasion);
  lines.push('Detalhes: '+details);
  window.location.href='https://wa.me/258846235040?text='+encodeURIComponent(lines.join('\n'));
});
