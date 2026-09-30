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