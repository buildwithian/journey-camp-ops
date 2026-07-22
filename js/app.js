/**
 * ============================================================================
 * JOURNEY CAMP OPERATIONS HUB — CLIENT ENGINE & SYNC MANAGER
 * ============================================================================
 */

// Initial App State (v14 Data Model)
const state = {
  campTrack: 'Father & Daughter Camp',
  startTime: '15:00',
  attendance: {
    dads: 16,
    children: 16,
    helpers: 11
  },
  gasUrl: localStorage.getItem('journey_gas_url') || '',
  
  volunteers: [
    { name: 'Ian Sinclair', phone: '+27 63 893 9452', email: 'ian@journey.org' },
    { name: 'Neil Harrower', phone: '+27 71 950 8363', email: 'neil@journey.org' },
    { name: 'Marvin Welby-Solomon', phone: '', email: 'marvin@journey.org' },
    { name: 'Kingsley Williams', phone: '+27 83 260 5311', email: 'kingsley@journey.org' },
    { name: 'Kevin de Wet', phone: '+27 82 908 2460', email: 'kevin@journey.org' },
    { name: 'Paul Barter', phone: '', email: 'paul@journey.org' },
    { name: 'Raldo Kruger (Lifeguard Lead)', phone: '+27 84 511 8606', email: 'raldo@journey.org' },
    { name: 'Gavin Graham (Lifeguard 2)', phone: '+27 82 123 4567', email: 'gavin@journey.org' },
    { name: 'Richard Walker', phone: '', email: 'richard@journey.org' },
    { name: 'Youth Track Leader A', phone: '', email: 'youth1@journey.org' },
    { name: 'Youth Track Leader B', phone: '', email: 'youth2@journey.org' }
  ],

  roles: [
    { title: 'Oversight Lead', desc: 'Ultimate decision-making authority during camp. Handles live emergencies & medical decisions.', leader: 'Ian Sinclair' },
    { title: 'Logistics Lead', desc: 'Manages physical setup and breakdown. Coordinates camp layout, tents/bivvies, fire prep.', leader: 'Neil Harrower' },
    { title: 'Session Coordinator', desc: 'Facilitates core structured spiritual/emotional sessions (e.g., Malachi discussion).', leader: 'Marvin Welby-Solomon' },
    { title: 'Activity Facilitator', desc: 'Brings high energy to run games and challenges (Clay Latte, Tug of War, Name Games).', leader: 'Kingsley Williams' },
    { title: 'Catering / Fire Lead', desc: 'Ensures communal fires are started on time and maintained for family cooking.', leader: 'Kevin de Wet' },
    { title: 'Administration', desc: 'Handles paperwork, nametags, RSVPs, emergency contact list, and gate-keeping.', leader: 'Paul Barter' },
    { title: 'Lifeguard 1 (Water Safety Lead)', desc: 'DEDICATED WATER SAFETY LEAD: Stationed at dam during ALL water activities (Dam Swim, Clay Latte, Tug of War).', leader: 'Raldo Kruger (Lifeguard Lead)' },
    { title: 'Lifeguard 2 (Water Safety)', desc: 'DEDICATED SECOND LIFEGUARD: Assists Water Safety Lead during water entries.', leader: 'Gavin Graham (Lifeguard 2)' },
    { title: 'Youth Track Leader 1', desc: 'Supports youth-specific activities and engagement during free time.', leader: 'Youth Track Leader A' },
    { title: 'Youth Track Leader 2', desc: 'Supports youth-specific activities and engagement during free time.', leader: 'Youth Track Leader B' },
    { title: 'General Helper 1', desc: 'Assists Logistics and Catering leads where extra hands are needed.', leader: 'Raldo Kruger (Lifeguard Lead)' },
    { title: 'General Helper 2', desc: 'Assists Activity Facilitator and Session Coordinator.', leader: 'Gavin Graham (Lifeguard 2)' },
    { title: 'Communion Sub-Leader', desc: 'Sub-task role to run and administer communion elements on Sunday morning.', leader: 'Richard Walker' }
  ],

  timetable: [
    { day: 'Saturday', min: 30, activity: 'Arrival', desc: 'Arrive at camp, name tags, get to know contacts', role: 'Administration', planB: 'Plan A operates in all weather (indoor check-in)' },
    { day: 'Saturday', min: 30, activity: 'Ice Breaker', desc: 'Get to know each other (Child introduces Father, name game)', role: 'Activity Facilitator', planB: 'Move under covered veranda or main hall if raining' },
    { day: 'Saturday', min: 90, activity: 'Clay Latte', desc: 'Father-child activities & Dam swim (Lifeguards active)', role: 'Activity Facilitator / Lifeguard 1', planB: 'If rain: Cancel dam swim. Move clay building under veranda.' },
    { day: 'Saturday', min: 90, activity: 'Camp Setup', desc: 'Set-up shelters, bivvy equipment, prepare fire', role: 'Logistics Lead', planB: 'If heavy rain: Erect tarps overhead / setup inside main hall.' },
    { day: 'Saturday', min: 60, activity: 'Dinner Prep', desc: 'Ensure fire is started on time with enough coals for cooking', role: 'Catering / Fire Lead', planB: 'If rain: Use covered braai area or gas stoves under gazebo.' },
    { day: 'Saturday', min: 30, activity: 'Dinner', desc: 'Dads and children cook and have supper together', role: 'Oversight Lead', planB: 'Eat under covered dining veranda / hall.' },
    { day: 'Saturday', min: 60, activity: 'Stokbrood', desc: 'Marshmallows and stokbrood at fire, chat about question cards', role: 'Session Coordinator', planB: 'Move stokbrood to gas stoves; sit inside for question cards.' },
    { day: 'Saturday', min: 60, activity: 'Skits & Debrief', desc: 'Present skits and carving, end of evening debrief', role: 'Oversight Lead', planB: 'Move inside main hall / large marquee.' },
    { day: 'Saturday', min: 0, activity: 'Bed Time', desc: 'Lights out', role: 'Oversight Lead', planB: 'If severe storm: Move sleeping inside indoor hall/vehicles.' },
    
    { day: 'Sunday', min: 45, activity: 'Wake Up', desc: 'Wake up, dam swim (Lifeguards active), boil kettles, coffee', role: 'Logistics Lead / Lifeguard 1', planB: 'If rain: Cancel dam swim. Hot coffee & kettles under veranda.' },
    { day: 'Sunday', min: 90, activity: 'Malachi', desc: 'Malachi discussion (sand demo) and scripture video', role: 'Session Coordinator', planB: 'Move inside main hall with projector.' },
    { day: 'Sunday', min: 30, activity: 'Communion', desc: 'Administer communion elements', role: 'Communion Sub-Leader', planB: 'Perform inside hall with soft lighting.' },
    { day: 'Sunday', min: 15, activity: 'Quiet Time', desc: 'Father-child quiet time (reflect on Malachi)', role: 'Oversight Lead', planB: 'Sit on covered porch / inside main hall.' },
    { day: 'Sunday', min: 60, activity: 'Breakfast', desc: 'Fire ready, boiling water. Families prepare own breakfast.', role: 'Catering / Fire Lead', planB: 'Use covered kitchen area / gas burners under gazebo.' },
    { day: 'Sunday', min: 60, activity: 'Manhood Talk', desc: "Dad's talk and children's talk split", role: 'Session Coordinator', planB: 'Split into two separate indoor rooms.' },
    { day: 'Sunday', min: 15, activity: 'Final Debrief', desc: 'Reflection on the sleepover, present carving', role: 'Oversight Lead', planB: 'Inside main hall.' },
    { day: 'Sunday', min: 60, activity: 'Pack Up', desc: 'Pack up camp', role: 'Logistics Lead', planB: 'Use tarps over gear while packing into vehicles.' },
    { day: 'Sunday', min: 45, activity: 'Tug of War', desc: 'Father-child activity (Tug of war, Dam swim - Lifeguards active)', role: 'Activity Facilitator / Lifeguard 1', planB: 'If rain: Cancel dam swim. Mud tug-of-war if light rain, or indoor arm wrestling.' },
    { day: 'Sunday', min: 0, activity: 'Departure', desc: 'Depart from camp', role: 'Administration', planB: 'Final departure from venue.' }
  ],

  tasks: [
    { category: 'Pre-Planning', desc: 'Finalize RSVP list and dietary requirements', role: 'Administration', status: 'Not Started' },
    { category: 'Pre-Planning', desc: 'Review medical forms, emergency contacts & allergy flags', role: 'Oversight Lead', status: 'Not Started' },
    { category: 'Pre-Planning', desc: 'Confirm 2 Lifeguards / Water Safety Leads assigned & certified', role: 'Oversight Lead', status: 'Not Started' },
    { category: 'Pre-Planning', desc: 'Inspect water safety equipment (throw ropes, life buoys, first aid kit)', role: 'Lifeguard 1 (Water Safety Lead)', status: 'Not Started' },
    { category: 'Pre-Planning', desc: 'Confirm venue emergency contacts & directions to nearest hospital', role: 'Administration', status: 'Not Started' },
    { category: 'Pre-Planning', desc: 'Purchase all communal shopping list items (see Food tab)', role: 'Catering / Fire Lead', status: 'Not Started' },
    { category: 'Pre-Planning', desc: 'Print name tags and laminate question cards', role: 'Administration', status: 'Not Started' },
    { category: 'Pre-Planning', desc: 'Confirm venue access codes and agree on final camp & weather Plan B layout', role: 'Logistics Lead', status: 'Not Started' },
    { category: 'Pre-Planning', desc: 'Pack all camp equipment, tents, bivvies, and activity gear', role: 'Logistics Lead', status: 'Not Started' },
    { category: 'Pre-Planning', desc: 'Download YouTube Malachi scripture video to a device', role: 'Session Coordinator', status: 'Not Started' },
    { category: 'Pre-Planning', desc: 'Test projector and speaker with downloaded video', role: 'Session Coordinator', status: 'Not Started' },
    { category: 'Pre-Planning', desc: 'Communicate final packing list & weather Plan B to all fathers', role: 'Administration', status: 'Not Started' },
    { category: 'Pre-Planning', desc: 'Prepare communion elements (bread loaf, grape juice)', role: 'Communion Sub-Leader', status: 'Not Started' }
  ],

  campEq: [
    { item: 'First aid kit (Comprehensive)', qty: 1, role: 'Oversight Lead / Lifeguard 1', status: 'To Buy' },
    { item: 'Life Buoy / Rescue Ring', qty: 1, role: 'Lifeguard 1 (Water Safety Lead)', status: 'To Buy' },
    { item: 'Water Rescue Throw Rope (20m)', qty: 1, role: 'Lifeguard 1 (Water Safety Lead)', status: 'To Buy' },
    { item: 'Lifeguard Whistles (High-decibel)', qty: 2, role: 'Lifeguard 1 & Lifeguard 2', status: 'To Buy' },
    { item: 'High-Vis Lifeguard Vests', qty: 2, role: 'Lifeguard 1 & Lifeguard 2', status: 'To Buy' },
    { item: 'Washing bowl', qty: 1, role: 'Logistics Lead', status: 'To Buy' },
    { item: 'Dish towel', qty: 2, role: 'Logistics Lead', status: 'To Buy' },
    { item: 'Dish cloth', qty: 5, role: 'Logistics Lead', status: 'To Buy' },
    { item: 'Dish scourers', qty: 5, role: 'Logistics Lead', status: 'To Buy' },
    { item: 'Dish washing liquid', qty: 1, role: 'Logistics Lead', status: 'To Buy' },
    { item: 'Chopping board (wooden)', qty: 4, role: 'Catering / Fire Lead', status: 'To Buy' },
    { item: 'Garbage bags', qty: 5, role: 'Logistics Lead', status: 'To Buy' },
    { item: 'Spade', qty: 1, role: 'Logistics Lead', status: 'To Buy' },
    { item: 'Water Carrier', qty: 1, role: 'Logistics Lead', status: 'To Buy' },
    { item: 'Gas bottles', qty: 2, role: 'Logistics Lead', status: 'To Buy' },
    { item: 'Gas kettle (Large)', qty: 1, role: 'Logistics Lead', status: 'To Buy' },
    { item: 'Gas plate', qty: 2, role: 'Logistics Lead', status: 'To Buy' },
    { item: 'Gas kettle (small)', qty: 1, role: 'Logistics Lead', status: 'To Buy' },
    { item: 'Gas two-plater', qty: 1, role: 'Logistics Lead', status: 'To Buy' },
    { item: 'Cutlery set', qty: 1, role: 'Catering / Fire Lead', status: 'To Buy' },
    { item: 'Gas fire starter (rod)', qty: 1, role: 'Logistics Lead', status: 'To Buy' },
    { item: 'Tongs', qty: 4, role: 'Catering / Fire Lead', status: 'To Buy' },
    { item: 'Bodum', qty: 1, role: 'Catering / Fire Lead', status: 'To Buy' },
    { item: 'Braai grid (large)', qty: 1, role: 'Logistics Lead', status: 'To Buy' },
    { item: 'Journey Banner', qty: 1, role: 'Logistics Lead', status: 'To Buy' },
    { item: 'Fire lighter', qty: 1, role: 'Logistics Lead', status: 'To Buy' },
    { item: 'Camping mats', qty: 6, role: 'Logistics Lead', status: 'To Buy' },
    { item: 'Axe', qty: 1, role: 'Logistics Lead', status: 'To Buy' },
    { item: 'Mallet', qty: 1, role: 'Logistics Lead', status: 'To Buy' }
  ],

  debriefMetrics: [
    { metric: 'Overall Camp Experience', rating: 5, success: 'High engagement, strong spiritual connections made during Malachi session.', challenge: 'Timetable ran slightly behind by Saturday evening.' },
    { metric: 'Safety & Water Supervision', rating: 5, success: 'Zero incidents. Lifeguard 1 & 2 maintained clear water boundary during dam swim.', challenge: 'Need extra throw rope at secondary swim spot.' },
    { metric: 'Logistics & Camp Setup', rating: 4, success: 'Bivvies erected quickly; fire wood supply was plentiful.', challenge: 'Gas bottle fitting was tight; bring spare washer.' },
    { metric: 'Food & Catering', rating: 5, success: 'Families enjoyed bringing their own meals; stokbrood was a highlight.', challenge: 'Suggest extra milk quantity for cold morning.' },
    { metric: 'Spiritual & Emotional Impact', rating: 5, success: 'Communion and letter reading times were deeply moving for fathers and children.', challenge: 'Ensure 15 min buffer before quiet time.' }
  ]
};

// Calculated Total Participants
function getTotalParticipants() {
  return state.attendance.dads + state.attendance.children + state.attendance.helpers;
}

// Format Minutes to HH:MM AM/PM
function formatMinutes(totalMins) {
  let h = Math.floor(totalMins / 60) % 24;
  let m = totalMins % 60;
  let ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  h = h ? h : 12;
  let mm = m < 10 ? '0' + m : m;
  return `${h}:${mm} ${ampm}`;
}

// Convert "15:00" to total minutes from midnight
function parseTimeToMins(timeStr) {
  const [h, m] = timeStr.split(':').map(Number);
  return h * 60 + m;
}

// --- DOM Rendering Engine ---
function renderApp() {
  document.getElementById('statTotalParticipants').textContent = getTotalParticipants();
  
  renderVolunteers();
  renderRoster();
  renderTimetable();
  renderVisualSchedule();
  renderTasks();
  renderEmergencyHub();
  renderCampEq();
  renderActEq();
  renderFood();
  renderPlaybook();
  renderDebrief();
}

function renderVolunteers() {
  const tbody = document.getElementById('tblVolunteersBody');
  tbody.innerHTML = state.volunteers.map(v => `
    <tr>
      <td style="font-weight:600; color:#FFF;">${v.name}</td>
      <td style="color:var(--gold-400); font-family:monospace;">${v.phone || '—'}</td>
      <td style="color:var(--teal-500); font-size:0.85rem;">${v.email || '—'}</td>
      <td style="text-align:center;">
        <button class="btn btn-danger btn-delete-vol" data-name="${v.name}" style="padding:0.25rem 0.5rem; font-size:0.75rem;">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </td>
    </tr>
  `).join('');

  document.querySelectorAll('.btn-delete-vol').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const volName = e.currentTarget.getAttribute('data-name');
      deleteVolunteer(volName);
    });
  });
}

function addVolunteer(name, phone, email) {
  if (!name.trim()) return;
  state.volunteers.push({ name: name.trim(), phone: phone.trim(), email: email.trim() });
  renderApp();
  syncToGoogleSheet('addVolunteer', { name, phone, email });
}

function deleteVolunteer(name) {
  state.volunteers = state.volunteers.filter(v => v.name !== name);
  // Reset roles assigned to this volunteer to unassigned or default
  state.roles.forEach(r => {
    if (r.leader === name) {
      r.leader = state.volunteers.length > 0 ? state.volunteers[0].name : '';
    }
  });
  renderApp();
  syncToGoogleSheet('deleteVolunteer', { name });
}

function renderRoster() {
  const tbody = document.getElementById('tblRosterBody');
  
  tbody.innerHTML = state.roles.map(r => {
    const volObj = state.volunteers.find(v => v.name === r.leader);
    const phone = volObj ? volObj.phone : '—';
    const email = volObj ? volObj.email : '—';
    return `
      <tr>
        <td style="font-weight:700; color:#FFF;">${r.title}</td>
        <td style="color:var(--text-muted); font-size:0.85rem;">${r.desc.replace(/\n/g, '<br>')}</td>
        <td>
          <select class="form-control role-assign-select" data-role="${r.title}">
            ${state.volunteers.map(v => `<option value="${v.name}" ${v.name === r.leader ? 'selected' : ''}>${v.name}</option>`).join('')}
          </select>
        </td>
        <td style="font-family:monospace; color:var(--gold-400);">${phone || '—'}</td>
        <td style="font-size:0.85rem; color:var(--teal-500);">${email || '—'}</td>
      </tr>
    `;
  }).join('');

  document.querySelectorAll('.role-assign-select').forEach(sel => {
    sel.addEventListener('change', (e) => {
      const roleTitle = e.target.getAttribute('data-role');
      const r = state.roles.find(x => x.title === roleTitle);
      if (r) r.leader = e.target.value;
      renderApp();
      syncToGoogleSheet('updateCell', { sheetName: '2. Roster & Roles', row: 6, col: 3, value: e.target.value });
    });
  });
}

function renderTimetable() {
  let currMins = parseTimeToMins(state.startTime);
  const tbody = document.getElementById('tblTimetableBody');
  
  tbody.innerHTML = state.timetable.map(t => {
    const startStr = formatMinutes(currMins);
    const endMins = currMins + t.min;
    const endStr = formatMinutes(endMins);
    currMins = endMins;
    
    return `
      <tr>
        <td style="font-weight:700; color:${t.day === 'Saturday' ? 'var(--gold-400)' : '#FF8A65'};">${t.day}</td>
        <td style="font-weight:800; color:var(--teal-500);">${startStr}</td>
        <td style="color:var(--text-muted);">${endStr}</td>
        <td style="font-weight:700;">${t.min}</td>
        <td style="font-weight:700; color:#FFF;">${t.activity}</td>
        <td style="font-size:0.85rem;">${t.desc}</td>
        <td><span class="badge badge-pending">${t.role}</span></td>
        <td style="font-size:0.8rem; color:#FF8A65; font-style:italic;">${t.planB}</td>
      </tr>
    `;
  }).join('');
}

function renderVisualSchedule() {
  let currMinsSat = parseTimeToMins(state.startTime);
  let satHtml = '';
  let sunHtml = '';
  
  state.timetable.forEach(t => {
    const startStr = formatMinutes(currMinsSat);
    currMinsSat += t.min;
    
    const card = `
      <div class="schedule-card">
        <div class="schedule-time">${startStr}</div>
        <div class="schedule-title">${t.activity}</div>
        <div class="schedule-leader">Led by: ${t.role}</div>
      </div>
    `;
    
    if (t.day === 'Saturday') satHtml += card;
    else sunHtml += card;
  });

  document.getElementById('visSatContainer').innerHTML = satHtml;
  document.getElementById('visSunContainer').innerHTML = sunHtml;
}

function renderTasks() {
  const tbody = document.getElementById('tblTasksBody');
  tbody.innerHTML = state.tasks.map(t => `
    <tr>
      <td style="color:var(--text-muted);">${t.category}</td>
      <td style="font-weight:600; color:#FFF;">${t.desc}</td>
      <td><span class="badge badge-pending">${t.role}</span></td>
      <td>
        <select class="form-control task-status-select" data-desc="${t.desc}">
          <option value="Not Started" ${t.status === 'Not Started' ? 'selected' : ''}>Not Started</option>
          <option value="Pending" ${t.status === 'Pending' ? 'selected' : ''}>Pending</option>
          <option value="Done" ${t.status === 'Done' ? 'selected' : ''}>Done</option>
        </select>
      </td>
    </tr>
  `).join('');

  document.querySelectorAll('.task-status-select').forEach(sel => {
    sel.addEventListener('change', (e) => {
      const desc = e.target.getAttribute('data-desc');
      const t = state.tasks.find(x => x.desc === desc);
      if (t) t.status = e.target.value;
    });
  });
}

function renderEmergencyHub() {
  const grid = document.getElementById('emergencyButtonsGrid');
  grid.innerHTML = `
    <a href="tel:+27218504000" class="emergency-call-btn">
      <div>
        <div style="font-size:0.75rem; color:#FF8A65; font-weight:700;">NEAREST HOSPITAL (ER)</div>
        <div style="font-size:1.1rem; font-weight:800;">Helderberg Hospital ER</div>
        <div style="font-size:0.8rem; color:var(--text-muted);">20 min drive | Medi-Clinic Somerset West</div>
      </div>
      <i class="fa-solid fa-phone-volume" style="font-size:1.5rem; color:#FF8A65;"></i>
    </a>
    
    <a href="tel:084124" class="emergency-call-btn">
      <div>
        <div style="font-size:0.75rem; color:#FF8A65; font-weight:700;">AMBULANCE DISPATCH</div>
        <div style="font-size:1.1rem; font-weight:800;">ER24 / Netcare (084 124)</div>
        <div style="font-size:0.8rem; color:var(--text-muted);">State venue GPS coordinates</div>
      </div>
      <i class="fa-solid fa-truck-medical" style="font-size:1.5rem; color:#FF8A65;"></i>
    </a>

    <a href="tel:+27845118606" class="emergency-call-btn">
      <div>
        <div style="font-size:0.75rem; color:var(--teal-500); font-weight:700;">WATER SAFETY LEAD</div>
        <div style="font-size:1.1rem; font-weight:800;">Raldo Kruger (Lifeguard 1)</div>
        <div style="font-size:0.8rem; color:var(--text-muted);">Certified Water Safety & Dam Rescue</div>
      </div>
      <i class="fa-solid fa-life-ring" style="font-size:1.5rem; color:var(--teal-500);"></i>
    </a>
  `;

  document.getElementById('waterRulesContainer').innerHTML = `
    <ul style="list-style:none; display:flex; flex-direction:column; gap:0.8rem; font-size:0.9rem;">
      <li style="padding:0.75rem; background:rgba(30,41,59,0.5); border-left:3px solid var(--teal-500); border-radius:6px;">
        <strong>DEDICATED LIFEGUARD WATCHING:</strong> NO ONE enters dam unless Lifeguard 1 & 2 are stationed on bank.
      </li>
      <li style="padding:0.75rem; background:rgba(30,41,59,0.5); border-left:3px solid var(--teal-500); border-radius:6px;">
        <strong>1:2 ADULT RATIO:</strong> Fathers must actively watch their children in the water zone at all times.
      </li>
      <li style="padding:0.75rem; background:rgba(30,41,59,0.5); border-left:3px solid var(--coral-600); border-radius:6px;">
        <strong>LIGHTNING RULE:</strong> Immediate 30-min water evacuation if thunder or lightning occurs within 10km.
      </li>
    </ul>
  `;

  document.getElementById('medicalDecisionContainer').innerHTML = `
    <div style="display:flex; flex-direction:column; gap:0.75rem; font-size:0.875rem;">
      <div style="padding:0.75rem; background:rgba(46,125,50,0.15); border:1px solid rgba(46,125,50,0.4); border-radius:8px;">
        <strong style="color:#81C784;">Level 1 (Minor):</strong> Scrapes, minor cuts, bee stings → Treat on-site with First Aid kit.
      </div>
      <div style="padding:0.75rem; background:rgba(249,168,37,0.15); border:1px solid rgba(249,168,37,0.4); border-radius:8px;">
        <strong style="color:#FFE082;">Level 2 (Moderate):</strong> Deep cut, sprain, allergic reaction → Inform Oversight Lead; drive to Helderberg ER.
      </div>
      <div style="padding:0.75rem; background:rgba(192,84,47,0.15); border:1px solid rgba(192,84,47,0.4); border-radius:8px;">
        <strong style="color:#FF8A65;">Level 3 (Severe):</strong> Near-drowning, fracture, severe anaphylaxis → Call ER24 immediately; Oversight Lead takes command.
      </div>
    </div>
  `;
}

function renderCampEq() {
  const tbody = document.getElementById('tblCampEqBody');
  tbody.innerHTML = state.campEq.map(e => `
    <tr>
      <td style="font-weight:600; color:#FFF;">${e.item}</td>
      <td style="font-weight:700; text-align:center;">${e.qty}</td>
      <td><span class="badge badge-pending">${e.role}</span></td>
      <td>
        <select class="form-control eq-status-select" data-item="${e.item}">
          <option value="To Buy" ${e.status === 'To Buy' ? 'selected' : ''}>To Buy</option>
          <option value="Pending" ${e.status === 'Pending' ? 'selected' : ''}>Pending</option>
          <option value="Packed" ${e.status === 'Packed' ? 'selected' : ''}>Packed</option>
        </select>
      </td>
    </tr>
  `).join('');
}

function renderActEq() {
  const tot = getTotalParticipants();
  const actEqList = [
    { item: 'Prop for earth shaking', rule: 'Static', qty: 1, act: 'Malachi', role: 'Session Coordinator' },
    { item: 'Speaker', rule: 'Static', qty: 1, act: 'Malachi', role: 'Logistics Lead' },
    { item: 'Projector', rule: 'Static', qty: 1, act: 'Malachi', role: 'Logistics Lead' },
    { item: 'Downloaded Malachi video', rule: 'Static', qty: 1, act: 'Malachi', role: 'Session Coordinator' },
    { item: 'Child & dad question cards', rule: '1 per pair', qty: state.attendance.dads, act: 'Stokbrood', role: 'Session Coordinator' },
    { item: 'Stokbrood sticks', rule: '1 per person', qty: tot, act: 'Stokbrood', role: 'Logistics Lead' },
    { item: 'Tug of war rope', rule: 'Static', qty: 1, act: 'Tug of War', role: 'Activity Facilitator' },
    { item: 'Communion cups', rule: '1 per person', qty: tot, act: 'Communion', role: 'Communion Sub-Leader' },
    { item: 'Claylatt', rule: '1 per person', qty: tot, act: 'Clay Latte', role: 'Activity Facilitator' },
    { item: 'Clay — bag', rule: 'Static', qty: 1, act: 'Clay Latte', role: 'Activity Facilitator' },
    { item: "Bivvy's (Shelter)", rule: 'Total ÷ 2', qty: Math.ceil(tot / 2), act: 'Camp Setup', role: 'Logistics Lead' },
    { item: 'Latte short (Shelter)', rule: '1 per person', qty: tot, act: 'Camp Setup', role: 'Logistics Lead' },
    { item: 'Latte long (Shelter)', rule: '1 per person', qty: tot, act: 'Camp Setup', role: 'Logistics Lead' },
    { item: 'Guy ropes (Shelter)', rule: '2 per person', qty: tot * 2, act: 'Camp Setup', role: 'Logistics Lead' },
    { item: 'Pegs (Shelter)', rule: '2 per person', qty: tot * 2, act: 'Camp Setup', role: 'Logistics Lead' }
  ];

  const tbody = document.getElementById('tblActEqBody');
  tbody.innerHTML = actEqList.map(e => `
    <tr>
      <td style="font-weight:600; color:#FFF;">${e.item}</td>
      <td style="color:var(--text-muted); font-size:0.85rem;">${e.rule}</td>
      <td style="font-weight:800; color:var(--teal-500); text-align:center;">${e.qty}</td>
      <td style="font-weight:700;">${e.act}</td>
      <td><span class="badge badge-pending">${e.role}</span></td>
      <td><span class="badge badge-tobuy">To Buy</span></td>
    </tr>
  `).join('');
}

function renderFood() {
  const tot = getTotalParticipants();
  const foodList = [
    { item: 'Dough for stokbrood', qty: `${tot} portions`, role: 'Catering / Fire Lead' },
    { item: 'Coffee Instant', qty: `${Math.ceil(tot / 20)} jars`, role: 'Catering / Fire Lead' },
    { item: 'Coffee Ground', qty: `${Math.ceil(tot / 40)} Kg`, role: 'Catering / Fire Lead' },
    { item: 'Long life milk', qty: `${Math.ceil(tot * 0.28)} L`, role: 'Catering / Fire Lead' },
    { item: 'Sugar', qty: '1 kg', role: 'Catering / Fire Lead' },
    { item: 'Rusks', qty: `${Math.ceil(tot / 6)} boxes`, role: 'Catering / Fire Lead' },
    { item: 'Braai Brood (stokbrood)', qty: `${Math.ceil(tot / 7)} bags`, role: 'Catering / Fire Lead' },
    { item: 'Marshmallows', qty: `${Math.ceil(tot / 14)} × 300g pkts`, role: 'Catering / Fire Lead' },
    { item: 'Mieliemeal', qty: '1 kg', role: 'Catering / Fire Lead' },
    { item: 'Rooibos tea', qty: '1 box', role: 'Catering / Fire Lead' },
    { item: 'Ceylon tea', qty: '1 box', role: 'Catering / Fire Lead' },
    { item: 'Hot chocolate', qty: `${Math.ceil(tot / 40)} × 500g pkts`, role: 'Catering / Fire Lead' },
    { item: 'Marie biscuits', qty: `${Math.ceil(tot / 10)} pkts`, role: 'Catering / Fire Lead' },
    { item: 'Tomato sauce', qty: '2 bottles', role: 'Catering / Fire Lead' },
    { item: 'Syrup', qty: '1 × 500g', role: 'Catering / Fire Lead' },
    { item: 'Communion juice (Grape)', qty: `${Math.ceil(tot / 20)} L`, role: 'Catering / Fire Lead' },
    { item: 'Butro Butter', qty: '500g', role: 'Catering / Fire Lead' },
    { item: 'Communion loaf', qty: '1 loaf', role: 'Communion Sub-Leader' }
  ];

  const tbody = document.getElementById('tblFoodBody');
  tbody.innerHTML = foodList.map(f => `
    <tr>
      <td style="font-weight:600; color:#FFF;">${f.item}</td>
      <td style="font-weight:800; color:var(--teal-500); text-align:center;">${f.qty}</td>
      <td><span class="badge badge-pending">${f.role}</span></td>
      <td><span class="badge badge-tobuy">To Buy</span></td>
    </tr>
  `).join('');
}

function renderPlaybook() {
  const container = document.getElementById('playbookAccordionContainer');
  const playbookData = [
    { title: 'Ice Breaker', goal: 'Break initial tension and get everyone laughing.', steps: '1. Children introduce fathers to group.\n2. Play Name Game or Two Truths and a Lie.', planB: 'Move under covered veranda / main hall if raining.' },
    { title: 'Clay Latte', goal: 'Draw fathers and children together through physical teamwork.', steps: '1. Tie dad and child together at ankles.\n2. Set up obstacle course & dam swim (Lifeguards active on bank).', planB: 'Cancel dam swim if lightning/rain. Move clay building under veranda.' },
    { title: 'Stokbrood', goal: 'Quality guided conversational time in relaxed setting.', steps: '1. Lay out dough, stokke, syrup, marshmallows near fire.\n2. Dads and children cook stokbrood and discuss question cards.', planB: 'Move stokbrood cooking to gas stoves under covered gazebo.' },
    { title: 'Skits & Debrief', goal: 'Lighthearted fun followed by grounding day experiences.', steps: '1. Groups prepare short funny skit.\n2. Present carving and summarize Saturday takeaways.', planB: 'Fully operable indoors inside main hall.' },
    { title: 'Malachi', goal: 'Spiritual reflection on restoration and turning of hearts.', steps: '1. Show YouTube Malachi scripture video on projector.\n2. Sand Demo showing how things naturally drift.', planB: 'Move inside main hall with projector.' },
    { title: 'Communion', goal: 'Spiritual reflection, forgiveness, and covenant.', steps: '1. Provide grape juice and bread loaf.\n2. Read 1 Cor 11:23-26. Fathers pray blessing over children.', planB: 'Administer inside main hall with soft lanterns/lighting.' }
  ];

  container.innerHTML = playbookData.map((p, idx) => `
    <div class="accordion-item ${idx === 0 ? 'open' : ''}">
      <div class="accordion-header">
        <div style="font-weight:700; font-size:1.1rem; color:#FFF;">${p.title}</div>
        <div style="font-size:0.85rem; color:var(--gold-400);">${p.goal}</div>
      </div>
      <div class="accordion-body">
        <div style="font-weight:600; color:var(--teal-500); margin-bottom:0.4rem;">STEPS & LEAD CONSIDERATIONS:</div>
        <div style="white-space:pre-line; color:var(--text-main);">${p.steps}</div>
        <div class="plan-b-box">
          <div class="plan-b-title"><i class="fa-solid fa-cloud-showers-heavy"></i> PLAN B (RAIN / WEATHER CONTINGENCY)</div>
          <div>${p.planB}</div>
        </div>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.accordion-header').forEach(hdr => {
    hdr.addEventListener('click', () => {
      hdr.parentElement.classList.toggle('open');
    });
  });
}

function renderDebrief() {
  const container = document.getElementById('debriefMetricsContainer');
  container.innerHTML = state.debriefMetrics.map(m => `
    <div style="padding:1rem; background:rgba(30,41,59,0.6); border:1px solid var(--border-light); border-radius:12px; margin-bottom:1rem;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
        <div style="font-weight:700; font-size:1.1rem; color:#FFF;">${m.metric}</div>
        <div style="color:var(--gold-500); font-weight:800; font-size:1.2rem;">${'★'.repeat(m.rating)}${'☆'.repeat(5 - m.rating)} (${m.rating}/5)</div>
      </div>
      <div style="font-size:0.875rem; color:var(--teal-500); margin-bottom:0.2rem;"><strong>Successes:</strong> ${m.success}</div>
      <div style="font-size:0.875rem; color:#FF8A65;"><strong>Challenges:</strong> ${m.challenge}</div>
    </div>
  `).join('');
}

// --- Event Handlers & Sync ---
function initEvents() {
  // Navigation
  document.querySelectorAll('.nav-item').forEach(nav => {
    nav.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
      
      nav.classList.add('active');
      const tabId = nav.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
    });
  });

  // Inputs & Attendance
  document.getElementById('numDads').addEventListener('input', (e) => {
    state.attendance.dads = parseInt(e.target.value) || 0;
    renderApp();
  });
  document.getElementById('numChildren').addEventListener('input', (e) => {
    state.attendance.children = parseInt(e.target.value) || 0;
    renderApp();
  });
  document.getElementById('numHelpers').addEventListener('input', (e) => {
    state.attendance.helpers = parseInt(e.target.value) || 0;
    renderApp();
  });
  document.getElementById('inputCampStartTime').addEventListener('change', (e) => {
    state.startTime = e.target.value;
    renderTimetable();
    renderVisualSchedule();
  });

  // Volunteer Modal Events
  document.getElementById('btnAddVolunteerModal').addEventListener('click', () => {
    document.getElementById('modalAddVolunteer').style.display = 'flex';
  });
  document.getElementById('btnCloseAddVolunteer').addEventListener('click', () => {
    document.getElementById('modalAddVolunteer').style.display = 'none';
  });
  document.getElementById('btnCancelAddVolunteer').addEventListener('click', () => {
    document.getElementById('modalAddVolunteer').style.display = 'none';
  });
  document.getElementById('btnSaveVolunteer').addEventListener('click', () => {
    const name = document.getElementById('inputVolName').value;
    const phone = document.getElementById('inputVolPhone').value;
    const email = document.getElementById('inputVolEmail').value;
    addVolunteer(name, phone, email);
    document.getElementById('inputVolName').value = '';
    document.getElementById('inputVolPhone').value = '';
    document.getElementById('inputVolEmail').value = '';
    document.getElementById('modalAddVolunteer').style.display = 'none';
  });

  // Settings Modal
  document.getElementById('btnSettings').addEventListener('click', () => {
    document.getElementById('modalSettings').style.display = 'flex';
    document.getElementById('inputGasUrl').value = state.gasUrl;
  });
  document.getElementById('btnCloseModal').addEventListener('click', () => {
    document.getElementById('modalSettings').style.display = 'none';
  });
  document.getElementById('btnSaveGasUrl').addEventListener('click', () => {
    state.gasUrl = document.getElementById('inputGasUrl').value.trim();
    localStorage.setItem('journey_gas_url', state.gasUrl);
    document.getElementById('modalSettings').style.display = 'none';
    checkGasSyncStatus();
  });

  // Export
  document.getElementById('btnExport').addEventListener('click', exportAppData);
}

function checkGasSyncStatus() {
  const badge = document.getElementById('syncBadge');
  const text = document.getElementById('syncText');
  
  if (state.gasUrl) {
    badge.classList.remove('offline');
    text.textContent = 'Google Sheet Sync Active';
  } else {
    badge.classList.add('offline');
    text.textContent = 'Local Mode';
  }
}

function syncToGoogleSheet(action, payload) {
  if (!state.gasUrl) return;
  
  fetch(state.gasUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, ...payload })
  }).catch(err => console.log('Sync error:', err));
}

function exportAppData() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `Journey_Camp_Operations_Export.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
  initEvents();
  checkGasSyncStatus();
  renderApp();
});
