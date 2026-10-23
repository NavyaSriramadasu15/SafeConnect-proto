const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const iconMap = {doorbell:"♧",motion:"⌁",delivery:"▣",system:"◉"};
const labelMap = {doorbell:"Doorbell",motion:"Motion",delivery:"Delivery",system:"System"};
let events = [
 {id:1,type:"doorbell",title:"Someone rang the doorbell",place:"Front door",time:"10:42 AM",detail:"Doorbell press detected",note:"Visitor at the front entrance"},
 {id:2,type:"delivery",title:"Package expected today",place:"Front porch",time:"9:18 AM",detail:"Delivery window: 2 PM – 6 PM",note:"Everyday essentials"},
 {id:3,type:"motion",title:"Motion detected",place:"Driveway",time:"8:56 AM",detail:"Motion event recorded",note:"Movement near the driveway"},
 {id:4,type:"system",title:"Device connection checked",place:"Home system",time:"8:30 AM",detail:"Demo device is ready",note:"All demo systems normal"}
];
let contacts = [
 {name:"Riya Sharma",relation:"Family",phone:"+91 98765 43210",initials:"RS",color:"#f2e6dc",ink:"#9b7057"},
 {name:"Arjun Rao",relation:"Neighbor",phone:"+91 98480 12345",initials:"AR",color:"#dcefeb",ink:"#4b8c7b"},
 {name:"Ananya Mehta",relation:"Friend",phone:"+91 99887 65432",initials:"AM",color:"#e9e3f7",ink:"#8472b2"}
];
let deliveries = [{name:"Everyday essentials",window:"Today, 2 PM – 6 PM",status:"Expected today",delivered:false},{name:"Home supplies",window:"Delivered yesterday · 4:12 PM",status:"Delivered",delivered:true},{name:"Books & stationery",window:"Delivered Tuesday · 11:36 AM",status:"Delivered",delivered:true}];
const timeNow = () => new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
const dateNow = () => new Date().toLocaleDateString('en-IN', {weekday:'long', year:'numeric', month:'long', day:'numeric'});
function updateDateTime(){
 const now=new Date(), hour=now.getHours();
 const greeting=hour<12?'Good morning':hour<17?'Good afternoon':hour<21?'Good evening':'Good night';
 const dateLabel=now.toLocaleDateString('en-IN',{weekday:'long',month:'long',day:'numeric',year:'numeric'});
 const shortDate=now.toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
 $('#todayLabel').textContent=dateLabel.toUpperCase();
 $('#overviewDate').textContent=`Today · ${shortDate}`;
 $('#activityDatePill').textContent=`${now.toLocaleDateString('en-IN',{day:'numeric',month:'short'})} · Newest first`;
 $('#greetingTitle').textContent=`${greeting}, Navya.`;
 $('#greetingMessage').textContent=hour<5?'It is late, so take a moment to check that everything at home looks as expected.':hour<12?'Here is what is happening around your home this morning.':hour<17?'Here is the latest activity around your home this afternoon.':hour<21?'Here is the latest activity around your home this evening.':'Here is the latest home activity before you settle in for the night.';
 $('#liveClock').textContent=now.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit',second:'2-digit'});
}
function saveDemoState(){try{localStorage.setItem('safeConnectEvents',JSON.stringify(events));localStorage.setItem('safeConnectDeliveries',JSON.stringify(deliveries));localStorage.setItem('safeConnectContacts',JSON.stringify(contacts));}catch(e){/* local storage may be unavailable in private browsing */}}
try{const savedEvents=localStorage.getItem('safeConnectEvents');if(savedEvents)events=JSON.parse(savedEvents);const savedDeliveries=localStorage.getItem('safeConnectDeliveries');if(savedDeliveries)deliveries=JSON.parse(savedDeliveries);const savedContacts=localStorage.getItem('safeConnectContacts');if(savedContacts)contacts=JSON.parse(savedContacts);}catch(e){/* use sample demo data */}
function toast(message){$('#toastText').textContent=message;$('#toast').classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('#toast').classList.remove('show'),2700)}
function eventMarkup(e){return `<div class="activity-item" role="button" tabindex="0" data-event-id="${e.id}" aria-label="View details for ${escapeHtml(e.title)}"><div class="event-icon event-${e.type}">${iconMap[e.type]}</div><div class="event-copy"><h3>${escapeHtml(e.title)}</h3><p>${escapeHtml(e.detail)} · ${escapeHtml(e.place)}</p>${e.note?`<span class="event-chip">${escapeHtml(e.note)}</span>`:''}</div><span class="event-time">${escapeHtml(e.time)}</span></div>`}
function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function renderEvents(){
 $('#recentActivity').innerHTML=events.slice(0,4).map(eventMarkup).join('');
 const filter=$('#activityFilter')?.value||'all', query=($('#activitySearch')?.value||'').toLowerCase();
 const filtered=events.filter(e=>(filter==='all'||e.type===filter)&&[e.title,e.place,e.detail,e.note].join(' ').toLowerCase().includes(query));
 $('#allActivity').innerHTML=filtered.length?filtered.map(eventMarkup).join(''):'<div class="empty-state">No events match your search. Try another filter.</div>';
 $('#activityTotal').textContent=events.length;$('#activityCount').textContent=events.length;$('#alertTotal').textContent=events.filter(e=>e.type==='motion'||e.type==='doorbell').length;$('#contactTotal').textContent=contacts.length;
 $$('[data-event-id]').forEach(row=>{const open=()=>showEventDetails(row.dataset.eventId);row.addEventListener('click',open);row.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}})});
 $('#eventSubtitle').textContent=`Showing ${filtered.length} of ${events.length} events.`;
}
function renderDeliveries(){
 $('#deliveryTotal').textContent=deliveries.filter(d=>!d.delivered).length;
 $('#deliveryPageCount').textContent=`${deliveries.filter(d=>!d.delivered).length} package${deliveries.filter(d=>!d.delivered).length===1?'':'s'}`;
 $('#deliveryList').innerHTML=deliveries.map(d=>{const windowText=d.name==='Everyday essentials'&&!d.delivered?`Expected ${dateNow()} · 2 PM – 6 PM`:d.window;return `<div class="delivery-list-item"><div class="package-art"><span>▤</span></div><div class="delivery-list-copy"><strong>${escapeHtml(d.name)}</strong><p>${escapeHtml(windowText)}</p></div><span class="pill-status ${d.delivered?'delivered':''}">${d.status.toUpperCase()}</span></div>`}).join('');saveDemoState();
}
function renderContacts(){
 $('#contactsGrid').innerHTML=contacts.map((c,i)=>`<article class="contact-card"><div class="contact-card-top"><div class="contact-avatar" style="background:${c.color};color:${c.ink}">${escapeHtml(c.initials)}</div><div><h3>${escapeHtml(c.name)}</h3><span class="relation">${escapeHtml(c.relation)}</span></div></div><div class="contact-phone">♧ &nbsp;${escapeHtml(c.phone)}</div><div class="contact-card-actions"><span>● &nbsp;Trusted contact</span><button data-contact="${i}">Contact options ↗</button></div></article>`).join('');
 $$('[data-contact]').forEach(btn=>btn.addEventListener('click',()=>toast(`Demo only: no message sent to ${contacts[+btn.dataset.contact].name}.`)));$('#contactTotal').textContent=contacts.length;saveDemoState();
}
function go(view){
 $$('.view').forEach(v=>v.classList.remove('active-view'));
 $(`#${view}View`)?.classList.add('active-view');
 $$('.nav-item').forEach(b=>b.classList.toggle('active',b.dataset.view===view));
 const labels={overview:'Overview',activity:'Activity history',deliveries:'Deliveries',contacts:'Trusted contacts',accessibility:'Accessibility',devices:'Connected devices'};
 $('#pageTitle').textContent=labels[view]||'Overview';$('#sidebar').classList.remove('open');window.scrollTo({top:0,behavior:'smooth'});
}
$$('.nav-item').forEach(btn=>btn.addEventListener('click',()=>go(btn.dataset.view)));
$$('[data-go]').forEach(btn=>btn.addEventListener('click',()=>go(btn.dataset.go)));
$$('[data-card-go]').forEach(card=>{const action=()=>{const target=card.dataset.cardGo;if(target==='alerts'){go('activity');$('#activityFilter').value='all';$('#activitySearch').value='';renderEvents();$('#eventSubtitle').textContent='Showing motion and doorbell alerts.';$('#allActivity').innerHTML=events.filter(e=>e.type==='motion'||e.type==='doorbell').map(eventMarkup).join('')||'<div class="empty-state">No home alerts to review.</div>';$$('[data-event-id]').forEach(row=>{const open=()=>showEventDetails(row.dataset.eventId);row.addEventListener('click',open);row.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open();}})});}else go(target);};card.addEventListener('click',action);card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();action();}})});
$('#mobileMenu').addEventListener('click',()=>$('#sidebar').classList.toggle('open'));
$('#simulateBtn').addEventListener('click',openEventModal);$('#simulateBtn2').addEventListener('click',openEventModal);
$('#activitySearch').addEventListener('input',renderEvents);$('#activityFilter').addEventListener('change',renderEvents);
function openModal(id){$(id).classList.add('open')}
function closeModal(id){$(id).classList.remove('open')}
function openEventModal(){openModal('#modalBackdrop')}
function showEventDetails(id){const event=events.find(item=>String(item.id)===String(id));if(!event)return;$('#eventDetailTitle').textContent=event.title;$('#eventDetailDescription').textContent=`${labelMap[event.type]} activity · ${event.time}`;$('#eventDetailBody').innerHTML=`<div><span>TYPE</span><p><b>${escapeHtml(labelMap[event.type])}</b><br>${escapeHtml(event.detail)}</p></div><div><span>LOCATION</span><p>${escapeHtml(event.place)}</p></div><div><span>NOTE</span><p>${escapeHtml(event.note||'No additional note')}</p></div><div><span>RECORDED</span><p>${escapeHtml(event.time)} · ${escapeHtml(dateNow())}</p></div>`;openModal('#eventDetailBackdrop')}
$('#modalClose').addEventListener('click',()=>closeModal('#modalBackdrop'));
$('#modalBackdrop').addEventListener('click',e=>{if(e.target.id==='modalBackdrop')closeModal('#modalBackdrop')});
$('#eventDetailClose').addEventListener('click',()=>closeModal('#eventDetailBackdrop'));$('#eventDetailBackdrop').addEventListener('click',e=>{if(e.target.id==='eventDetailBackdrop')closeModal('#eventDetailBackdrop')});
$('#eventForm').addEventListener('submit',e=>{
 e.preventDefault();const type=$('#eventType').value,place=$('#eventPlace').value;
 const defaults={doorbell:'Someone rang the doorbell',motion:'Motion detected',delivery:'Package at the door',system:'Device status updated'};
 const detail={doorbell:'Doorbell press detected',motion:'Motion event recorded',delivery:'Package arrival recorded',system:'Demo device status update'};
 events.unshift({id:Date.now(),type,title:defaults[type],place,time:timeNow(),detail:detail[type],note:$('#eventNote').value.trim()||'Added in demo mode'});
 if(type==='delivery'){deliveries.unshift({name:'New demo package',window:`Added ${dateNow()} · ${timeNow()}`,status:'At door',delivered:false})}
 saveDemoState();renderEvents();renderDeliveries();closeModal('#modalBackdrop');e.target.reset();toast('Demo event added to your timeline.');
});
$('#addDeliveryBtn').addEventListener('click',()=>{deliveries.unshift({name:'Sample package',window:`Expected ${dateNow()} · added ${timeNow()}`,status:'Expected today',delivered:false});renderDeliveries();toast('Demo delivery added.')});
$('#addContactBtn').addEventListener('click',()=>openModal('#contactModalBackdrop'));
$('#contactModalClose').addEventListener('click',()=>closeModal('#contactModalBackdrop'));
$('#contactModalBackdrop').addEventListener('click',e=>{if(e.target.id==='contactModalBackdrop')closeModal('#contactModalBackdrop')});
$('#contactForm').addEventListener('submit',e=>{e.preventDefault();const name=$('#contactName').value.trim(),parts=name.split(/\s+/);contacts.push({name,relation:$('#contactRelation').value,phone:$('#contactPhone').value.trim(),initials:parts.slice(0,2).map(p=>p[0]).join('').toUpperCase(),color:'#e4eef4',ink:'#537c8a'});renderContacts();saveDemoState();closeModal('#contactModalBackdrop');e.target.reset();toast('Trusted contact saved in this demo.')});
$('#helpBtn').addEventListener('click',()=>openModal('#infoModalBackdrop'));
$('#infoModalClose').addEventListener('click',()=>closeModal('#infoModalBackdrop'));
$('#infoModalBackdrop').addEventListener('click',e=>{if(e.target.id==='infoModalBackdrop')closeModal('#infoModalBackdrop')});
$('#notificationBtn').addEventListener('click',()=>{go('activity');toast('Here are your latest home updates.')});
$('#ringInfoBtn').addEventListener('click',()=>openModal('#infoModalBackdrop'));
$('#testMotionBtn').addEventListener('click',()=>{$('#eventType').value='motion';$('#eventPlace').value='Driveway';$('#eventNote').value='Test motion event';openEventModal()});
$('#largeTextToggle').addEventListener('change',e=>{document.body.classList.toggle('large-text',e.target.checked);toast(e.target.checked?'Larger text enabled.':'Larger text disabled.')});
$('#contrastToggle').addEventListener('change',e=>{document.body.classList.toggle('high-contrast',e.target.checked);toast(e.target.checked?'High contrast enabled.':'High contrast disabled.')});
$('#motionToggle').addEventListener('change',e=>{document.body.classList.toggle('reduce-motion',e.target.checked);toast(e.target.checked?'Reduced motion enabled.':'Reduced motion disabled.')});
$('#gentleToggle').addEventListener('change',e=>toast(e.target.checked?'Clear alert descriptions enabled.':'Alert descriptions preference updated.'));
document.addEventListener('keydown',e=>{if(e.key==='Escape')$$('.modal-backdrop').forEach(m=>m.classList.remove('open'))});
updateDateTime();setInterval(updateDateTime,1000);renderEvents();renderDeliveries();renderContacts();