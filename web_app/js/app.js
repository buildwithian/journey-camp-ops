/**
 * ============================================================================
 * JOURNEY CAMP OPERATIONS HUB — CLIENT ENGINE & SYNC MANAGER
 * ============================================================================
 */

// Master Default Dataset (v14 Failsafe Model)
const DEFAULT_DATA = {
  campTrack: 'Father & Daughter Camp',
  startTime: '15:00',
  activePlan: 'PlanA',
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
    { name: 'Raldo Kruger', phone: '+27 84 511 8606', email: 'raldo@journey.org' },
    { name: 'Gavin Graham', phone: '+27 82 123 4567', email: 'gavin@journey.org' },
    { name: 'Richard Walker', phone: '', email: 'richard@journey.org' },
    { name: 'Youth Track Leader A', phone: '', email: 'youth1@journey.org' },
    { name: 'Youth Track Leader B', phone: '', email: 'youth2@journey.org' }
  ],

  roles: [
    { title: 'Oversight Lead', desc: 'Carries ultimate authority for the camp weekend. Sets tone & atmosphere, resolves live issues, escalates emergencies, and ensures every session aligns with Journey heart.', leader: 'Ian Sinclair' },
    { title: 'Session Coordinator', desc: 'Holds the spiritual and emotional heartbeat of the weekend. Leads the Malachi discussion, facilitates father-child reflection moments, and coordinates Sunday programme.', leader: 'Marvin Welby-Solomon' },
    { title: 'Logistics Lead', desc: 'Owns physical setup and breakdown, bivvy/shelter allocation, firewood supply, venue layout, and camp environment setup.', leader: 'Neil Harrower' },
    { title: 'Administration', desc: 'Manages RSVPs, attendance, name tags, emergency contact lists, gate access, and welcome check-in.', leader: 'Paul Barter' },
    { title: 'Activity Facilitator', desc: 'Creates the environment of fun, play, and adventure. Leads all physical activities (Clay Latte, Tug of War, ice breakers) and ensures every child feels included.', leader: 'Kingsley Williams' },
    { title: 'Catering / Fire Lead', desc: 'Oversees food logistics and communal fire management. Ensures cooking coals, hot water, and stokbrood fires are ready on schedule.', leader: 'Kevin de Wet' },
    { title: 'Safety & Welfare Lead', desc: 'Accountable for physical safety and welfare across all camp activities. Conducts venue risk assessment, manages water safety & lifeguards, and holds first aid kit.', leader: 'Raldo Kruger' },
    { title: 'Spiritual Oversight / Prayer Lead', desc: 'Carries the spiritual atmosphere and prayer foundation. Gathers team for prayer, stays aware of spiritual dynamics, and assists with communion.', leader: 'Ian Sinclair' },
    { title: 'Pastoral Care Lead', desc: 'Provides 1-on-1 pastoral support for fathers or children processing intense emotions. Debriefs facilitators and coordinates post-camp referrals.', leader: 'Richard Walker' },
    { title: 'Youth Track Leader 1', desc: 'Dedicated to the children experience. Leads parallel youth track during dad talks, keeping children engaged and active.', leader: 'Youth Track Leader A' },
    { title: 'Youth Track Leader 2', desc: 'Co-leads youth programme alongside Youth Track Leader 1, supporting group dynamics and smooth transitions.', leader: 'Youth Track Leader B' },
    { title: 'Communion Sub-Leader', desc: 'Prepares and administers communion elements on Sunday morning with reverence and intentionality.', leader: 'Richard Walker' }
  ],

  timetable: [
    { day: 'Saturday', min: 30, activity: 'Arrival', desc: 'Arrive at camp, name tags, get to know contacts', role: 'Administration', leader: 'Paul Barter', planB: 'Plan A operates in all weather (indoor check-in)' },
    { day: 'Saturday', min: 30, activity: 'Ice Breaker', desc: 'Get to know each other (Child introduces Father, name game)', role: 'Activity Facilitator', leader: 'Kingsley Williams', planB: 'Move under covered veranda or main hall if raining' },
    { day: 'Saturday', min: 90, activity: 'Clay Latte', desc: 'Father-child activities & Dam swim (Water safety active)', role: 'Activity Facilitator / Safety Lead', leader: 'Kingsley Williams', planB: 'If rain: Cancel dam swim. Move clay building under veranda.' },
    { day: 'Saturday', min: 90, activity: 'Camp Setup', desc: 'Set-up shelters, bivvy equipment, prepare fire', role: 'Logistics Lead', leader: 'Neil Harrower', planB: 'If heavy rain: Erect tarps overhead / setup inside main hall.' },
    { day: 'Saturday', min: 60, activity: 'Dinner Prep', desc: 'Ensure fire is started on time with enough coals for cooking', role: 'Catering / Fire Lead', leader: 'Kevin de Wet', planB: 'If rain: Use covered braai area or gas stoves under gazebo.' },
    { day: 'Saturday', min: 30, activity: 'Dinner', desc: 'Dads and children cook and have supper together', role: 'Oversight Lead', leader: 'Ian Sinclair', planB: 'Eat under covered dining veranda / hall.' },
    { day: 'Saturday', min: 60, activity: 'Stokbrood', desc: 'Marshmallows and stokbrood at fire, chat about question cards', role: 'Session Coordinator', leader: 'Marvin Welby-Solomon', planB: 'Move stokbrood to gas stoves; sit inside for question cards.' },
    { day: 'Saturday', min: 60, activity: 'Skits & Debrief', desc: 'Present skits and carving, end of evening debrief', role: 'Oversight Lead', leader: 'Ian Sinclair', planB: 'Move inside main hall / large marquee.' },
    { day: 'Saturday', min: 0, activity: 'Bed Time', desc: 'Lights out', role: 'Oversight Lead', leader: 'Ian Sinclair', planB: 'If severe storm: Move sleeping inside indoor hall/vehicles.' },
    
    { day: 'Sunday', min: 45, activity: 'Wake Up', desc: 'Wake up, dam swim (Water safety active), boil kettles, coffee', role: 'Logistics Lead / Safety Lead', leader: 'Neil Harrower', planB: 'If rain: Cancel dam swim. Hot coffee & kettles under veranda.' },
    { day: 'Sunday', min: 90, activity: 'Malachi', desc: 'Malachi discussion (sand demo) and scripture video', role: 'Session Coordinator', leader: 'Marvin Welby-Solomon', planB: 'Move inside main hall with projector.' },
    { day: 'Sunday', min: 30, activity: 'Communion', desc: 'Administer communion elements', role: 'Communion Sub-Leader', leader: 'Richard Walker', planB: 'Perform inside hall with soft lighting.' },
    { day: 'Sunday', min: 15, activity: 'Quiet Time', desc: 'Father-child quiet time (reflect on Malachi)', role: 'Spiritual Oversight / Prayer Lead', leader: 'Ian Sinclair', planB: 'Sit on covered porch / inside main hall.' },
    { day: 'Sunday', min: 60, activity: 'Breakfast', desc: 'Fire ready, boiling water. Families prepare own breakfast.', role: 'Catering / Fire Lead', leader: 'Kevin de Wet', planB: 'Use covered kitchen area / gas burners under gazebo.' },
    { day: 'Sunday', min: 60, activity: 'Manhood Talk', desc: "Dad's talk and children's talk split", role: 'Session Coordinator', leader: 'Marvin Welby-Solomon', planB: 'Split into two separate indoor rooms.' },
    { day: 'Sunday', min: 15, activity: 'Final Debrief', desc: 'Reflection on the sleepover, present carving', role: 'Oversight Lead', leader: 'Ian Sinclair', planB: 'Inside main hall.' },
    { day: 'Sunday', min: 60, activity: 'Pack Up', desc: 'Pack up camp', role: 'Logistics Lead', leader: 'Neil Harrower', planB: 'Use tarps over gear while packing into vehicles.' },
    { day: 'Sunday', min: 45, activity: 'Tug of War', desc: 'Father-child activity (Tug of war, Dam swim - Water safety active)', role: 'Activity Facilitator / Safety Lead', leader: 'Kingsley Williams', planB: 'If rain: Cancel dam swim. Mud tug-of-war if light rain, or indoor arm wrestling.' },
    { day: 'Sunday', min: 0, activity: 'Departure', desc: 'Depart from camp', role: 'Administration', leader: 'Paul Barter', planB: 'Final departure from venue.' }
  ],

  tasks: [
    { id: 'task-1', category: 'Pre-Camp', desc: 'Download YouTube Malachi scripture video to a device', role: 'Session Coordinator', leader: 'Marvin Welby-Solomon', status: 'Pending' },
    { id: 'task-2', category: 'Pre-Camp', desc: 'Test audio speaker & projector with downloaded video', role: 'Session Coordinator', leader: 'Marvin Welby-Solomon', status: 'Pending' },
    { id: 'task-3', category: 'Pre-Camp', desc: 'Finalize RSVP list and dietary requirements', role: 'Administration', leader: 'Paul Barter', status: 'Pending' },
    { id: 'task-4', category: 'Pre-Camp', desc: 'Review medical forms, emergency contacts & allergy flags', role: 'Safety & Welfare Lead', leader: 'Raldo Kruger', status: 'Pending' },
    { id: 'task-5', category: 'Pre-Camp', desc: 'Confirm Water Safety Leads assigned & certified', role: 'Safety & Welfare Lead', leader: 'Raldo Kruger', status: 'Pending' },
    { id: 'task-6', category: 'Pre-Camp', desc: 'Inspect water safety equipment (life buoy, first aid kit)', role: 'Safety & Welfare Lead', leader: 'Raldo Kruger', status: 'Pending' },
    { id: 'task-7', category: 'Pre-Camp', desc: 'Confirm venue emergency contacts & directions to nearest hospital', role: 'Administration', leader: 'Paul Barter', status: 'Pending' },
    { id: 'task-8', category: 'Pre-Camp', desc: 'Purchase all communal shopping list items (see Food tab)', role: 'Catering / Fire Lead', leader: 'Kevin de Wet', status: 'Pending' },
    { id: 'task-9', category: 'Pre-Camp', desc: 'Print name tags and laminate question cards', role: 'Administration', leader: 'Paul Barter', status: 'Pending' },
    { id: 'task-10', category: 'Pre-Camp', desc: 'Confirm venue access codes & agree on weather Plan B layout', role: 'Logistics Lead', leader: 'Neil Harrower', status: 'Pending' },
    { id: 'task-11', category: 'Pre-Camp', desc: 'Pack all camp equipment, tents, bivvies, and activity gear', role: 'Logistics Lead', leader: 'Neil Harrower', status: 'Pending' },
    { id: 'task-12', category: 'Pre-Camp', desc: 'Communicate final packing list & weather Plan B to all fathers', role: 'Administration', leader: 'Paul Barter', status: 'Pending' },
    { id: 'task-13', category: 'Pre-Camp', desc: 'Prepare communion elements (bread loaf, grape juice)', role: 'Communion Sub-Leader', leader: 'Richard Walker', status: 'Pending' },
    { id: 'task-14', category: 'Pre-Camp', desc: 'Conduct team pre-camp prayer and spiritual prep session', role: 'Spiritual Oversight / Prayer Lead', leader: 'Ian Sinclair', status: 'Pending' },
    
    { id: 'task-15', category: 'Post-Camp', desc: 'Conduct post-camp facilitator debrief session & metrics review', role: 'Oversight Lead', leader: 'Ian Sinclair', status: 'Pending' },
    { id: 'task-16', category: 'Post-Camp', desc: 'Inspect, clean, and return all borrowed camp & activity equipment', role: 'Logistics Lead', leader: 'Neil Harrower', status: 'Pending' },
    { id: 'task-17', category: 'Post-Camp', desc: 'Follow up with fathers for post-camp pastoral feedback and referrals', role: 'Pastoral Care Lead', leader: 'Richard Walker', status: 'Pending' },
    { id: 'task-18', category: 'Post-Camp', desc: 'Finalize camp expenditure & financial reconciliation', role: 'Administration', leader: 'Paul Barter', status: 'Pending' }
  ],

  campEq: [
    { item: 'Washing bowl', qty: 1, role: 'Logistics Lead', leader: 'Neil Harrower', status: 'Pending', notes: '' },
    { item: 'Dish towel', qty: 2, role: 'Logistics Lead', leader: 'Neil Harrower', status: 'Pending', notes: '' },
    { item: 'Dish cloth', qty: 5, role: 'Logistics Lead', leader: 'Neil Harrower', status: 'Pending', notes: '' },
    { item: 'Dish scourers', qty: 5, role: 'Logistics Lead', leader: 'Neil Harrower', status: 'Pending', notes: '' },
    { item: 'Dish washing liquid', qty: 1, role: 'Logistics Lead', leader: 'Neil Harrower', status: 'Pending', notes: '' },
    { item: 'Chopping board (wooden)', qty: 4, role: 'Catering / Fire Lead', leader: 'Kevin de Wet', status: 'Pending', notes: '' },
    { item: 'Garbage bags', qty: 5, role: 'Logistics Lead', leader: 'Neil Harrower', status: 'Pending', notes: '' },
    { item: 'Spade', qty: 1, role: 'Logistics Lead', leader: 'Neil Harrower', status: 'Pending', notes: '' },
    { item: 'Water Carrier', qty: 1, role: 'Logistics Lead', leader: 'Neil Harrower', status: 'Pending', notes: '' },
    { item: 'Gas bottles', qty: 2, role: 'Logistics Lead', leader: 'Neil Harrower', status: 'Pending', notes: '' },
    { item: 'Gas kettle (Large)', qty: 1, role: 'Logistics Lead', leader: 'Neil Harrower', status: 'Pending', notes: '' },
    { item: 'Gas plate', qty: 2, role: 'Logistics Lead', leader: 'Neil Harrower', status: 'Pending', notes: '' },
    { item: 'Gas kettle (small)', qty: 1, role: 'Logistics Lead', leader: 'Neil Harrower', status: 'Pending', notes: '' },
    { item: 'Gas two plater', qty: 1, role: 'Logistics Lead', leader: 'Neil Harrower', status: 'Pending', notes: '' },
    { item: 'Cutlery set', qty: 1, role: 'Catering / Fire Lead', leader: 'Kevin de Wet', status: 'Pending', notes: '' },
    { item: 'Gas fire starter (rod)', qty: 1, role: 'Logistics Lead', leader: 'Neil Harrower', status: 'Pending', notes: '' },
    { item: 'First aid kit', qty: 1, role: 'Safety & Welfare Lead', leader: 'Raldo Kruger', status: 'Pending', notes: '' },
    { item: 'Tongs', qty: 4, role: 'Catering / Fire Lead', leader: 'Kevin de Wet', status: 'Pending', notes: '' },
    { item: 'Bodum', qty: 1, role: 'Catering / Fire Lead', leader: 'Kevin de Wet', status: 'Pending', notes: '' },
    { item: 'Braai grid (large)', qty: 1, role: 'Logistics Lead', leader: 'Neil Harrower', status: 'Pending', notes: '' },
    { item: 'Journey Banner', qty: 1, role: 'Logistics Lead', leader: 'Neil Harrower', status: 'Pending', notes: '' },
    { item: 'Fire lighter', qty: 1, role: 'Logistics Lead', leader: 'Neil Harrower', status: 'Pending', notes: '' },
    { item: 'Camping mats', qty: 6, role: 'Logistics Lead', leader: 'Neil Harrower', status: 'Pending', notes: '' },
    { item: 'Axe', qty: 1, role: 'Logistics Lead', leader: 'Neil Harrower', status: 'Pending', notes: '' },
    { item: 'Mallet', qty: 1, role: 'Logistics Lead', leader: 'Neil Harrower', status: 'Pending', notes: '' },
    { item: 'Prop for earth shaking', qty: 1, role: 'Session Coordinator', leader: 'Marvin Welby-Solomon', status: 'Pending', notes: '' },
    { item: 'Life Buoy / Rescue Ring', qty: 1, role: 'Safety & Welfare Lead', leader: 'Raldo Kruger', status: 'Pending', notes: '' }
  ],

  actEq: [
    { item: 'Audio Speaker & Projector', qty: 1, act: 'Malachi', role: 'Logistics Lead', leader: 'Neil Harrower', status: 'Pending', notes: '' },
    { item: 'Downloaded Malachi video', qty: 1, act: 'Malachi', role: 'Session Coordinator', leader: 'Marvin Welby-Solomon', status: 'Pending', notes: '' },
    { item: 'Prop for earth shaking', qty: 1, act: 'Malachi', role: 'Session Coordinator', leader: 'Marvin Welby-Solomon', status: 'Pending', notes: '' },
    { item: 'Child & dad question cards', qty: 16, act: 'Stokbrood', role: 'Session Coordinator', leader: 'Marvin Welby-Solomon', status: 'Pending', notes: '' },
    { item: 'Stokbrood sticks', qty: 43, act: 'Stokbrood', role: 'Logistics Lead', leader: 'Neil Harrower', status: 'Pending', notes: '' },
    { item: 'Tug of war rope', qty: 1, act: 'Tug of War', role: 'Activity Facilitator', leader: 'Kingsley Williams', status: 'Pending', notes: '' },
    { item: 'Communion cups', qty: 43, act: 'Communion', role: 'Communion Sub-Leader', leader: 'Richard Walker', status: 'Pending', notes: '' },
    { item: 'Claylatt', qty: 43, act: 'Clay Latte', role: 'Activity Facilitator', leader: 'Kingsley Williams', status: 'Pending', notes: '' },
    { item: "Bivvy's (Shelter)", qty: 22, act: 'Camp Setup', role: 'Logistics Lead', leader: 'Neil Harrower', status: 'Pending', notes: '' },
    { item: 'Latte short (Shelter)', qty: 43, act: 'Camp Setup', role: 'Logistics Lead', leader: 'Neil Harrower', status: 'Pending', notes: '' },
    { item: 'Latte long (Shelter)', qty: 43, act: 'Camp Setup', role: 'Logistics Lead', leader: 'Neil Harrower', status: 'Pending', notes: '' },
    { item: 'Guy ropes (Shelter)', qty: 86, act: 'Camp Setup', role: 'Logistics Lead', leader: 'Neil Harrower', status: 'Pending', notes: '' },
    { item: 'Pegs (Shelter)', qty: 86, act: 'Camp Setup', role: 'Logistics Lead', leader: 'Neil Harrower', status: 'Pending', notes: '' }
  ],

  debriefMetrics: [
    { id: 'deb-1', metric: 'Overall Camp Experience', rating: 5, success: 'High engagement, strong spiritual connections made during Malachi session.', challenge: 'Timetable ran slightly behind by Saturday evening.', improvement: 'Add a 15-min buffer before sunset activities; ensure all leaders carry radios.', author: 'Ian Sinclair' },
    { id: 'deb-2', metric: 'Safety & Water Supervision', rating: 5, success: 'Zero incidents. Safety & Welfare Lead maintained clear water boundary during dam swim.', challenge: 'Need extra throw rope at secondary swim spot.', improvement: 'Station secondary lifeguard on far side of dam bank during free swim.', author: 'Raldo Kruger' },
    { id: 'deb-3', metric: 'Logistics & Camp Setup', rating: 4, success: 'Bivvies erected quickly; fire wood supply was plentiful.', challenge: 'Gas bottle fitting was tight; bring spare washer.', improvement: 'Pre-check gas regulators and bottle threads on Friday before packing vehicle.', author: 'Neil Harrower' },
    { id: 'deb-4', metric: 'Food & Catering', rating: 5, success: 'Families enjoyed bringing their own meals; stokbrood was a highlight.', challenge: 'Suggest extra milk quantity for cold morning.', improvement: 'Increase milk order by 4L for hot morning coffee & mieliemeal.', author: 'Kevin de Wet' },
    { id: 'deb-5', metric: 'Spiritual & Emotional Impact', rating: 5, success: 'Communion and letter reading times were deeply moving for fathers and children.', challenge: 'Ensure 15 min buffer before quiet time.', improvement: 'Keep communion background music playing continuously during quiet time.', author: 'Richard Walker' }
  ],
  food: [
    { id: 'f-1', item: 'Dough for stokbrood', leader: 'Kevin de Wet', status: 'To Buy' },
    { id: 'f-2', item: 'Coffee Instant', leader: 'Kevin de Wet', status: 'To Buy' },
    { id: 'f-3', item: 'Coffee Ground', leader: 'Kevin de Wet', status: 'To Buy' },
    { id: 'f-4', item: 'Long life milk', leader: 'Kevin de Wet', status: 'To Buy' },
    { id: 'f-5', item: 'Sugar', leader: 'Kevin de Wet', status: 'To Buy' },
    { id: 'f-6', item: 'Rusks', leader: 'Kevin de Wet', status: 'To Buy' },
    { id: 'f-7', item: 'Braai Brood (stokbrood)', leader: 'Kevin de Wet', status: 'To Buy' },
    { id: 'f-8', item: 'Marshmallows', leader: 'Kevin de Wet', status: 'To Buy' },
    { id: 'f-9', item: 'Mieliemeal', leader: 'Kevin de Wet', status: 'To Buy' },
    { id: 'f-10', item: 'Rooibos tea', leader: 'Kevin de Wet', status: 'To Buy' },
    { id: 'f-11', item: 'Ceylon tea', leader: 'Kevin de Wet', status: 'To Buy' },
    { id: 'f-12', item: 'Hot chocolate', leader: 'Kevin de Wet', status: 'To Buy' },
    { id: 'f-13', item: 'Marie biscuits', leader: 'Kevin de Wet', status: 'To Buy' },
    { id: 'f-14', item: 'Tomato sauce', leader: 'Kevin de Wet', status: 'To Buy' },
    { id: 'f-15', item: 'Syrup', leader: 'Kevin de Wet', status: 'To Buy' },
    { id: 'f-16', item: 'Communion juice (Grape)', leader: 'Kevin de Wet', status: 'To Buy' },
    { id: 'f-17', item: 'Butro Butter', leader: 'Kevin de Wet', status: 'To Buy' },
    { id: 'f-18', item: 'Communion loaf', leader: 'Richard Walker', status: 'To Buy' }
  ]
};

// Active Live State initialized from Master Default
let state = JSON.parse(JSON.stringify(DEFAULT_DATA));

function loadAndValidateState() {
  try {
    const savedRaw = localStorage.getItem('journey_app_state_v14');
    if (savedRaw) {
      const saved = JSON.parse(savedRaw);
      if (saved && typeof saved === 'object') {
        if (saved.campTrack) state.campTrack = saved.campTrack;
        if (saved.startTime) state.startTime = saved.startTime;
        if (saved.activePlan) state.activePlan = saved.activePlan;
        if (saved.attendance) state.attendance = saved.attendance;
        if (saved.gasUrl) state.gasUrl = saved.gasUrl;
        if (saved.columnVisibility !== undefined) state.columnVisibility = saved.columnVisibility;
        if (saved.showScheduleLeaders !== undefined) state.showScheduleLeaders = saved.showScheduleLeaders;

        if (Array.isArray(saved.volunteers) && saved.volunteers.length > 0) state.volunteers = saved.volunteers;
        if (Array.isArray(saved.roles) && saved.roles.length > 0) state.roles = saved.roles;
        if (Array.isArray(saved.timetable) && saved.timetable.length > 0) state.timetable = saved.timetable;
        if (Array.isArray(saved.tasks) && saved.tasks.length > 0) state.tasks = saved.tasks;
        if (Array.isArray(saved.campEq) && saved.campEq.length > 0) state.campEq = saved.campEq;
        if (Array.isArray(saved.actEq) && saved.actEq.length > 0) state.actEq = saved.actEq;
        if (Array.isArray(saved.debriefMetrics) && saved.debriefMetrics.length > 0) state.debriefMetrics = saved.debriefMetrics;
        if (Array.isArray(saved.food) && saved.food.length > 0) state.food = saved.food;
      }
    }
  } catch (e) {
    console.warn('Error restoring state from localStorage, using defaults:', e);
    state = JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
}

function saveState() {
  try {
    localStorage.setItem('journey_app_state_v14', JSON.stringify(state));
  } catch (e) {
    console.error('Error saving state:', e);
  }
}

function restoreAllDefaultData() {
  if (confirm('Are you sure you want to restore all master default data? This will bring back all original volunteers, roles, tasks, equipment, timetable, and debrief entries.')) {
    localStorage.removeItem('journey_app_state_v14');
    state = JSON.parse(JSON.stringify(DEFAULT_DATA));
    renderApp();
    alert('Master default data successfully restored!');
  }
}

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
  saveState();
  const statEl = document.getElementById('statTotalParticipants');
  if (statEl) statEl.textContent = getTotalParticipants();
  
  try { renderVolunteers(); } catch(e) { console.error('Error renderVolunteers:', e); }
  try { renderRoster(); } catch(e) { console.error('Error renderRoster:', e); }
  try { renderTimetable(); } catch(e) { console.error('Error renderTimetable:', e); }
  try { renderVisualSchedule(); } catch(e) { console.error('Error renderVisualSchedule:', e); }
  try { renderTasks(); } catch(e) { console.error('Error renderTasks:', e); }
  try { renderEmergencyHub(); } catch(e) { console.error('Error renderEmergencyHub:', e); }
  try { renderCampEq(); } catch(e) { console.error('Error renderCampEq:', e); }
  try { renderActEq(); } catch(e) { console.error('Error renderActEq:', e); }
  try { renderFood(); } catch(e) { console.error('Error renderFood:', e); }
  try { renderPlaybook(); } catch(e) { console.error('Error renderPlaybook:', e); }
  try { renderDebrief(); } catch(e) { console.error('Error renderDebrief:', e); }
}

function renderVolunteers() {
  const tbody = document.getElementById('tblVolunteersBody');
  tbody.innerHTML = state.volunteers.map(v => `
    <tr>
      <td style="font-weight:600; color:#FFF;">${v.name}</td>
      <td style="color:var(--gold-400); font-family:monospace;">${v.phone || '—'}</td>
      <td style="color:var(--teal-500); font-size:0.85rem;">${v.email || '—'}</td>
      <td style="text-align:center; white-space:nowrap;">
        <button class="btn btn-secondary btn-edit-vol" data-name="${v.name}" style="padding:0.25rem 0.5rem; font-size:0.75rem; margin-right:0.25rem;">
          <i class="fa-solid fa-pen-to-square"></i> Edit
        </button>
        <button class="btn btn-danger btn-delete-vol" data-name="${v.name}" style="padding:0.25rem 0.5rem; font-size:0.75rem;">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </td>
    </tr>
  `).join('');

  document.querySelectorAll('.btn-edit-vol').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const volName = e.currentTarget.getAttribute('data-name');
      openEditVolunteerModal(volName);
    });
  });

  document.querySelectorAll('.btn-delete-vol').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const volName = e.currentTarget.getAttribute('data-name');
      deleteVolunteer(volName);
    });
  });
}

function openEditVolunteerModal(name) {
  const vol = state.volunteers.find(v => v.name === name);
  if (!vol) return;
  document.getElementById('editVolOriginalName').value = vol.name;
  document.getElementById('editVolName').value = vol.name;
  document.getElementById('editVolPhone').value = vol.phone || '';
  document.getElementById('editVolEmail').value = vol.email || '';
  document.getElementById('modalEditVolunteer').style.display = 'flex';
}

function editVolunteer(origName, newName, phone, email) {
  const vol = state.volunteers.find(v => v.name === origName);
  if (!vol) return;

  const trimmedNew = newName.trim();
  if (!trimmedNew) return;

  vol.name = trimmedNew;
  vol.phone = phone.trim();
  vol.email = email.trim();

  // Cascade updates if the name was changed
  if (origName !== trimmedNew) {
    state.roles.forEach(r => { if (r.leader === origName) r.leader = trimmedNew; });
    state.tasks.forEach(t => { if (t.leader === origName) t.leader = trimmedNew; });
    state.campEq.forEach(e => { if (e.leader === origName) e.leader = trimmedNew; });
    if (state.actEq) {
      state.actEq.forEach(e => { if (e.leader === origName) e.leader = trimmedNew; });
    }
  }

  renderApp();
  syncToGoogleSheet('editVolunteer', { origName, newName: trimmedNew, phone, email });
}

function addVolunteer(name, phone, email) {
  if (!name.trim()) return;
  state.volunteers.push({ name: name.trim(), phone: phone.trim(), email: email.trim() });
  renderApp();
  syncToGoogleSheet('addVolunteer', { name, phone, email });
}

function deleteVolunteer(name) {
  state.volunteers = state.volunteers.filter(v => v.name !== name);
  // Reset roles assigned to this volunteer to default
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

const timetableEqMap = {
  'Arrival': ['Name Tags', 'RSVP List'],
  'Ice Breaker': ['Name Game Cards', 'Ice Breaker Props'],
  'Clay Latte': ['Claylatts', 'Clay Bags', 'First Aid Kit', 'Life Buoy', 'Throw Rope', 'Whistles'],
  'Camp Setup': ['Bivvies (Shelter)', 'Latte Short', 'Latte Long', 'Guy Ropes', 'Pegs', 'Spade', 'Camping Mats', 'Axe', 'Mallet', 'Journey Banner'],
  'Dinner Prep': ['Gas Bottles', 'Gas Plate', 'Braai Grid', 'Tongs', 'Chopping Boards', 'Fire Lighters', 'Fire Wood'],
  'Dinner': ['Cutlery Set', 'Washing Bowl', 'Dish Towel/Liquid', 'Garbage Bags'],
  'Stokbrood': ['Stokbrood Sticks', 'Stokbrood Dough', 'Question Cards', 'Marshmallows', 'Gas Starter'],
  'Skits & Debrief': ['Carvings', 'Skit Props', 'Journey Banner'],
  'Bed Time': ['Camping Mats', 'Flashlights'],
  'Wake Up': ['Gas Kettles', 'Bodum', 'Coffee', 'Tea', 'Milk', 'Water Carrier'],
  'Malachi': ['Earth Shaking Prop', 'Speaker', 'Projector', 'Downloaded Video'],
  'Communion': ['Communion Cups', 'Communion Loaf', 'Grape Juice'],
  'Quiet Time': ['Question Cards', 'Notebooks / Pens'],
  'Breakfast': ['Gas Two-Plater', 'Gas Kettle', 'Cutlery', 'Tongs', 'Rusks', 'Mieliemeal', 'Butter'],
  'Manhood Talk': ['Separate Room Setup', 'Audio Speaker'],
  'Final Debrief': ['Carvings', 'Reflection Notes'],
  'Pack Up': ['Tarps', 'Spade', 'Garbage Bags'],
  'Tug of War': ['Tug of War Rope', 'Whistles', 'Life Buoy', 'Throw Rope'],
  'Departure': ['Check-out List', 'Gate Access Code']
};

function switchTab(tabId) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
  
  const targetNav = document.querySelector(`.nav-item[data-tab="${tabId}"]`);
  if (targetNav) targetNav.classList.add('active');
  const targetPane = document.getElementById(tabId);
  if (targetPane) targetPane.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderTimetable() {
  let currMins = parseTimeToMins(state.startTime);
  let lastDay = 'Saturday';
  const tbody = document.getElementById('tblTimetableBody');
  if (!tbody) return;

  const isPlanB = state.activePlan === 'PlanB';

  const alertBanner = document.getElementById('planBAlertBanner');
  if (alertBanner) {
    alertBanner.style.display = isPlanB ? 'block' : 'none';
  }

  tbody.innerHTML = state.timetable.map(t => {
    if (t.day !== lastDay) {
      currMins = parseTimeToMins('06:30');
      lastDay = t.day;
    }

    const startStr = formatMinutes(currMins);
    const endMins = currMins + t.min;
    const endStr = formatMinutes(endMins);
    currMins = endMins;
    
    const eqList = timetableEqMap[t.activity] || ['Standard Activity Gear'];
    const eqBadges = eqList.map(item => `
      <a class="badge eq-badge-link" data-tab="tab-act-eq" style="background:rgba(26,122,109,0.25); border:1px solid rgba(26,122,109,0.5); color:#80CBC4; font-size:0.725rem; padding:0.15rem 0.45rem; margin:0.1rem; display:inline-flex; align-items:center; gap:0.25rem; white-space:nowrap; text-decoration:none; cursor:pointer;">
        <i class="fa-solid fa-toolbox" style="font-size:0.65rem; color:var(--teal-500);"></i> ${item}
      </a>
    `).join('');

    const planBStyle = isPlanB 
      ? 'background:rgba(192,84,47,0.2); color:#FF8A65; font-weight:700; font-size:0.825rem;'
      : 'color:var(--text-muted); font-size:0.8rem; font-style:italic;';

    return `
      <tr>
        <td style="font-weight:700; color:${t.day === 'Saturday' ? 'var(--gold-400)' : '#FF8A65'};">${t.day}</td>
        <td>
          <div style="font-weight:800; color:var(--teal-500); font-family:monospace; white-space:nowrap;">${startStr} – ${endStr}</div>
          <div style="font-size:0.75rem; color:var(--gold-400); font-weight:700;">${t.min > 0 ? t.min + ' mins' : '—'}</div>
        </td>
        <td style="font-weight:700; color:#FFF;">${t.activity}</td>
        <td style="font-size:0.85rem;">${t.desc}</td>
        <td style="max-width:240px;"><div style="display:flex; flex-wrap:wrap; gap:0.2rem;">${eqBadges}</div></td>
        <td><span class="badge badge-pending">${t.role}</span></td>
        <td>
          <select class="form-control timetable-leader-select" data-activity="${t.activity}" style="padding:0.3rem 0.5rem; font-size:0.825rem;">
            ${state.volunteers.map(v => `<option value="${v.name}" ${v.name === (t.leader || 'Ian Sinclair') ? 'selected' : ''}>${v.name}</option>`).join('')}
          </select>
        </td>
        <td style="${planBStyle}">
          <a class="planb-jump-link" data-activity="${t.activity}" style="color:inherit; text-decoration:none; cursor:pointer; display:flex; align-items:center; gap:0.35rem;">
            <i class="fa-solid fa-person-shelter" style="color:#FF8A65;"></i> ${t.planB}
          </a>
        </td>
      </tr>
    `;
  }).join('');

  document.querySelectorAll('.timetable-leader-select').forEach(sel => {
    sel.addEventListener('change', (e) => {
      const act = e.target.getAttribute('data-activity');
      const item = state.timetable.find(x => x.activity === act);
      if (item) item.leader = e.target.value;
      saveState();
    });
  });

  document.querySelectorAll('.eq-badge-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      switchTab('tab-act-eq');
    });
  });

  document.querySelectorAll('.planb-jump-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      switchTab('tab-playbook');
    });
  });
}

function renderVisualSchedule() {
  let currMinsSat = parseTimeToMins(state.startTime);
  let currMinsSun = parseTimeToMins('06:30');
  let satHtml = '';
  let sunHtml = '';
  
  state.timetable.forEach(t => {
    let startStr = '';
    if (t.day === 'Saturday') {
      startStr = formatMinutes(currMinsSat);
      currMinsSat += t.min;
    } else {
      startStr = formatMinutes(currMinsSun);
      currMinsSun += t.min;
    }
    
    const roleText = state.showScheduleLeaders ? `<div class="schedule-role-text">${(t.leader || t.role).split('/')[0].trim()}</div>` : '';

    const card = `
      <div class="schedule-card-compact">
        <span class="schedule-time-pill">${startStr}</span>
        <div class="schedule-info">
          <div class="schedule-title-text">${t.activity}</div>
          ${roleText}
        </div>
      </div>
    `;
    
    if (t.day === 'Saturday') satHtml += card;
    else sunHtml += card;
  });

  const satContainer = document.getElementById('visSatContainer');
  const sunContainer = document.getElementById('visSunContainer');
  if (satContainer) satContainer.innerHTML = satHtml;
  if (sunContainer) sunContainer.innerHTML = sunHtml;

  const cardHeader = document.querySelector('#tab-timetable .card-header');
  if (cardHeader && !cardHeader.querySelector('.schedule-leader-toggle')) {
    let actionsWrap = cardHeader.querySelector('.header-actions');
    if (!actionsWrap) {
      actionsWrap = document.createElement('div');
      actionsWrap.className = 'header-actions';
      cardHeader.appendChild(actionsWrap);
    }
    const label = document.createElement('label');
    label.className = 'schedule-leader-toggle';
    label.style.display = 'flex';
    label.style.alignItems = 'center';
    label.style.gap = '0.5rem';
    label.style.fontSize = '0.85rem';
    label.style.color = 'var(--text-main)';
    label.style.cursor = 'pointer';
    
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = state.showScheduleLeaders;
    cb.addEventListener('change', (e) => {
      state.showScheduleLeaders = e.target.checked;
      saveState();
      renderVisualSchedule();
    });

    label.appendChild(cb);
    label.appendChild(document.createTextNode('Show Leaders'));
    actionsWrap.insertBefore(label, actionsWrap.firstChild);
  }
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
        <div style="margin-top:0.75rem; display:flex; gap:0.5rem;">
          <button class="btn btn-secondary btn-jump-acteq" style="font-size:0.775rem; padding:0.25rem 0.6rem;">
            <i class="fa-solid fa-bullseye" style="color:var(--teal-500);"></i> View Activity Equipment for ${p.title}
          </button>
        </div>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.accordion-header').forEach(hdr => {
    hdr.addEventListener('click', () => {
      hdr.parentElement.classList.toggle('open');
    });
  });

  document.querySelectorAll('.btn-jump-acteq').forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab('tab-act-eq');
    });
  });
}

function renderTasks() {
  const searchVal = (document.getElementById('searchTasks')?.value || '').toLowerCase();
  const tbody = document.getElementById('tblTasksBody');
  
  const filtered = state.tasks.filter(t => 
    t.desc.toLowerCase().includes(searchVal) || 
    t.role.toLowerCase().includes(searchVal) ||
    t.category.toLowerCase().includes(searchVal)
  );

  tbody.innerHTML = filtered.map(t => {
    const isPost = t.category.includes('Post');
    const badgeStyle = isPost 
      ? 'background:rgba(229,115,115,0.2); border:1px solid rgba(229,115,115,0.4); color:#FF8A65;' 
      : 'background:rgba(34,153,136,0.2); border:1px solid rgba(34,153,136,0.4); color:var(--teal-500);';
    
    return `
      <tr>
        <td><span class="badge" style="${badgeStyle}">${t.category}</span></td>
        <td style="font-weight:600; color:#FFF;">${t.desc}</td>
        <td><span class="badge badge-pending">${t.role}</span></td>
        <td>
          <select class="form-control task-leader-select" data-id="${t.id}">
            ${state.volunteers.map(v => `<option value="${v.name}" ${v.name === t.leader ? 'selected' : ''}>${v.name}</option>`).join('')}
          </select>
        </td>
        <td>
          <select class="form-control task-status-select" data-id="${t.id}">
            <option value="Pending" ${t.status === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="In Progress" ${t.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
            <option value="Completed" ${t.status === 'Completed' ? 'selected' : ''}>Completed</option>
          </select>
        </td>
        <td style="text-align:center; white-space:nowrap;">
          <button class="btn btn-secondary btn-edit-task" data-id="${t.id}" style="padding:0.25rem 0.5rem; font-size:0.75rem; margin-right:0.25rem;">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button class="btn btn-danger btn-delete-task" data-id="${t.id}" style="padding:0.25rem 0.5rem; font-size:0.75rem;">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </td>
      </tr>
    `;
  }).join('');

  document.querySelectorAll('.task-leader-select').forEach(sel => {
    sel.addEventListener('change', (e) => {
      const id = e.target.getAttribute('data-id');
      const t = state.tasks.find(x => x.id === id);
      if (t) t.leader = e.target.value;
    });
  });

  document.querySelectorAll('.task-status-select').forEach(sel => {
    sel.addEventListener('change', (e) => {
      const id = e.target.getAttribute('data-id');
      const t = state.tasks.find(x => x.id === id);
      if (t) t.status = e.target.value;
    });
  });

  document.querySelectorAll('.btn-edit-task').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      openEditTaskModal(id);
    });
  });

  document.querySelectorAll('.btn-delete-task').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      state.tasks = state.tasks.filter(x => x.id !== id);
      renderTasks();
    });
  });
}

function openEditTaskModal(id) {
  const t = state.tasks.find(x => x.id === id);
  if (!t) return;
  document.getElementById('editTaskId').value = t.id;
  document.getElementById('inputEditTaskCategory').value = t.category;
  document.getElementById('inputEditTaskDesc').value = t.desc;
  document.getElementById('inputEditTaskRole').value = t.role;
  
  const leaderSelect = document.getElementById('inputEditTaskLeader');
  if (leaderSelect) {
    leaderSelect.innerHTML = state.volunteers.map(v => `<option value="${v.name}" ${v.name === t.leader ? 'selected' : ''}>${v.name}</option>`).join('');
  }
  
  document.getElementById('modalEditTask').style.display = 'flex';
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
  const searchVal = (document.getElementById('searchCampEq')?.value || '').toLowerCase();
  const tbody = document.getElementById('tblCampEqBody');
  
  const filtered = state.campEq.filter(e => 
    e.item.toLowerCase().includes(searchVal) || 
    e.role.toLowerCase().includes(searchVal)
  );

  tbody.innerHTML = filtered.map((e, idx) => `
    <tr>
      <td style="font-weight:600; color:#FFF;">${e.item}</td>
      <td style="font-weight:700; text-align:center;">${e.qty}</td>
      <td><span class="badge badge-pending">${e.role}</span></td>
      <td>
        <select class="form-control campeq-leader-select" data-item="${e.item}">
          ${state.volunteers.map(v => `<option value="${v.name}" ${v.name === e.leader ? 'selected' : ''}>${v.name}</option>`).join('')}
        </select>
      </td>
      <td>
        <select class="form-control campeq-status-select" data-item="${e.item}">
          <option value="Pending" ${e.status === 'Pending' ? 'selected' : ''}>Pending</option>
          <option value="Packed" ${e.status === 'Packed' ? 'selected' : ''}>Packed</option>
          <option value="Completed" ${e.status === 'Completed' ? 'selected' : ''}>Completed</option>
        </select>
      </td>
      <td>
        <input type="text" class="form-control campeq-notes-input" data-item="${e.item}" value="${e.notes || ''}" placeholder="Add note..." style="font-size:0.825rem; padding:0.35rem 0.6rem;">
      </td>
      <td style="text-align:center;">
        <button class="btn btn-danger btn-delete-campeq" data-item="${e.item}" style="padding:0.25rem 0.5rem; font-size:0.75rem;">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </td>
    </tr>
  `).join('');

  document.querySelectorAll('.campeq-leader-select').forEach(sel => {
    sel.addEventListener('change', (ev) => {
      const item = ev.target.getAttribute('data-item');
      const eq = state.campEq.find(x => x.item === item);
      if (eq) eq.leader = ev.target.value;
    });
  });

  document.querySelectorAll('.campeq-status-select').forEach(sel => {
    sel.addEventListener('change', (ev) => {
      const item = ev.target.getAttribute('data-item');
      const eq = state.campEq.find(x => x.item === item);
      if (eq) eq.status = ev.target.value;
    });
  });

  document.querySelectorAll('.campeq-notes-input').forEach(inp => {
    inp.addEventListener('input', (ev) => {
      const item = ev.target.getAttribute('data-item');
      const eq = state.campEq.find(x => x.item === item);
      if (eq) eq.notes = ev.target.value;
    });
  });

  document.querySelectorAll('.btn-delete-campeq').forEach(btn => {
    btn.addEventListener('click', (ev) => {
      const item = ev.currentTarget.getAttribute('data-item');
      state.campEq = state.campEq.filter(x => x.item !== item);
      renderCampEq();
    });
  });
}

function renderActEq() {
  const tot = getTotalParticipants();
  if (!state.actEq) {
    state.actEq = [
      { item: 'Audio Speaker & Projector', qty: 1, act: 'Malachi', role: 'Logistics Lead', leader: 'Neil Harrower', status: 'Pending', notes: '' },
      { item: 'Downloaded Malachi video', qty: 1, act: 'Malachi', role: 'Session Coordinator', leader: 'Marvin Welby-Solomon', status: 'Pending', notes: '' },
      { item: 'Prop for earth shaking', qty: 1, act: 'Malachi', role: 'Session Coordinator', leader: 'Marvin Welby-Solomon', status: 'Pending', notes: '' },
      { item: 'Child & dad question cards', qty: state.attendance.dads, act: 'Stokbrood', role: 'Session Coordinator', leader: 'Marvin Welby-Solomon', status: 'Pending', notes: '' },
      { item: 'Stokbrood sticks', qty: tot, act: 'Stokbrood', role: 'Logistics Lead', leader: 'Neil Harrower', status: 'Pending', notes: '' },
      { item: 'Tug of war rope', qty: 1, act: 'Tug of War', role: 'Activity Facilitator', leader: 'Kingsley Williams', status: 'Pending', notes: '' },
      { item: 'Communion cups', qty: tot, act: 'Communion', role: 'Communion Sub-Leader', leader: 'Richard Walker', status: 'Pending', notes: '' },
      { item: 'Claylatt', qty: tot, act: 'Clay Latte', role: 'Activity Facilitator', leader: 'Kingsley Williams', status: 'Pending', notes: '' },
      { item: "Bivvy's (Shelter)", qty: Math.ceil(tot / 2), act: 'Camp Setup', role: 'Logistics Lead', leader: 'Neil Harrower', status: 'Pending', notes: '' },
      { item: 'Latte short (Shelter)', qty: tot, act: 'Camp Setup', role: 'Logistics Lead', leader: 'Neil Harrower', status: 'Pending', notes: '' },
      { item: 'Latte long (Shelter)', qty: tot, act: 'Camp Setup', role: 'Logistics Lead', leader: 'Neil Harrower', status: 'Pending', notes: '' },
      { item: 'Guy ropes (Shelter)', qty: tot * 2, act: 'Camp Setup', role: 'Logistics Lead', leader: 'Neil Harrower', status: 'Pending', notes: '' },
      { item: 'Pegs (Shelter)', qty: tot * 2, act: 'Camp Setup', role: 'Logistics Lead', leader: 'Neil Harrower', status: 'Pending', notes: '' }
    ];
  } else {
    // Dynamic recalculation of quantities based on attendance
    state.actEq.forEach(e => {
      if (e.item === 'Child & dad question cards') e.qty = state.attendance.dads;
      if (['Stokbrood sticks', 'Communion cups', 'Claylatt', 'Latte short (Shelter)', 'Latte long (Shelter)'].includes(e.item)) e.qty = tot;
      if (e.item === "Bivvy's (Shelter)") e.qty = Math.ceil(tot / 2);
      if (['Guy ropes (Shelter)', 'Pegs (Shelter)'].includes(e.item)) e.qty = tot * 2;
    });
  }

  const tbody = document.getElementById('tblActEqBody');
  tbody.innerHTML = state.actEq.map(e => `
    <tr>
      <td style="font-weight:600; color:#FFF;">${e.item}</td>
      <td style="font-weight:800; color:var(--teal-500); text-align:center;">${e.qty}</td>
      <td style="font-weight:700;">${e.act}</td>
      <td><span class="badge badge-pending">${e.role}</span></td>
      <td>
        <select class="form-control acteq-leader-select" data-item="${e.item}">
          ${state.volunteers.map(v => `<option value="${v.name}" ${v.name === e.leader ? 'selected' : ''}>${v.name}</option>`).join('')}
        </select>
      </td>
      <td>
        <select class="form-control acteq-status-select" data-item="${e.item}">
          <option value="Pending" ${e.status === 'Pending' ? 'selected' : ''}>Pending</option>
          <option value="Packed" ${e.status === 'Packed' ? 'selected' : ''}>Packed</option>
          <option value="Completed" ${e.status === 'Completed' ? 'selected' : ''}>Completed</option>
        </select>
      </td>
      <td>
        <input type="text" class="form-control acteq-notes-input" data-item="${e.item}" value="${e.notes || ''}" placeholder="Add note..." style="font-size:0.825rem; padding:0.35rem 0.6rem;">
      </td>
    </tr>
  `).join('');

  document.querySelectorAll('.acteq-leader-select').forEach(sel => {
    sel.addEventListener('change', (ev) => {
      const item = ev.target.getAttribute('data-item');
      const eq = state.actEq.find(x => x.item === item);
      if (eq) eq.leader = ev.target.value;
    });
  });

  document.querySelectorAll('.acteq-status-select').forEach(sel => {
    sel.addEventListener('change', (ev) => {
      const item = ev.target.getAttribute('data-item');
      const eq = state.actEq.find(x => x.item === item);
      if (eq) eq.status = ev.target.value;
    });
  });

  document.querySelectorAll('.acteq-notes-input').forEach(inp => {
    inp.addEventListener('input', (ev) => {
      const item = ev.target.getAttribute('data-item');
      const eq = state.actEq.find(x => x.item === item);
      if (eq) eq.notes = ev.target.value;
    });
  });
}

function getFoodQty(item, tot) {
  switch(item) {
    case 'Dough for stokbrood': return `${tot} portions`;
    case 'Coffee Instant': return `${Math.ceil(tot / 20)} jars`;
    case 'Coffee Ground': return `${Math.ceil(tot / 40)} Kg`;
    case 'Long life milk': return `${Math.ceil(tot * 0.28)} L`;
    case 'Sugar': return '1 kg';
    case 'Rusks': return `${Math.ceil(tot / 6)} boxes`;
    case 'Braai Brood (stokbrood)': return `${Math.ceil(tot / 7)} bags`;
    case 'Marshmallows': return `${Math.ceil(tot / 14)} × 300g pkts`;
    case 'Mieliemeal': return '1 kg';
    case 'Rooibos tea': return '1 box';
    case 'Ceylon tea': return '1 box';
    case 'Hot chocolate': return `${Math.ceil(tot / 40)} × 500g pkts`;
    case 'Marie biscuits': return `${Math.ceil(tot / 10)} pkts`;
    case 'Tomato sauce': return '2 bottles';
    case 'Syrup': return '1 × 500g';
    case 'Communion juice (Grape)': return `${Math.ceil(tot / 20)} L`;
    case 'Butro Butter': return '500g';
    case 'Communion loaf': return '1 loaf';
    default: return '-';
  }
}

function renderFood() {
  const tot = getTotalParticipants();
  
  const hdrEl = document.getElementById('foodTotalCount');
  if (hdrEl) hdrEl.textContent = tot;

  if (!state.food || state.food.length === 0) {
    state.food = JSON.parse(JSON.stringify(DEFAULT_DATA.food));
  }

  const tbody = document.getElementById('tblFoodBody');
  tbody.innerHTML = state.food.map(f => {
    const qty = getFoodQty(f.item, tot);
    
    let badgeStyle = '';
    if (f.status === 'To Buy') badgeStyle = 'badge-tobuy';
    else if (f.status === 'Bought') badgeStyle = 'badge-done';
    else badgeStyle = 'badge-pending';
    
    return `
      <tr>
        <td style="font-weight:600; color:#FFF;">${f.item}</td>
        <td style="font-weight:800; color:var(--teal-500); text-align:center;">${qty}</td>
        <td>
          <select class="form-control food-leader-select" data-id="${f.id}">
            ${state.volunteers.map(v => `<option value="${v.name}" ${v.name === f.leader ? 'selected' : ''}>${v.name}</option>`).join('')}
          </select>
        </td>
        <td>
          <select class="form-control food-status-select badge ${badgeStyle}" data-id="${f.id}" style="padding:0.25rem 0.5rem; height:auto;">
            <option value="To Buy" ${f.status === 'To Buy' ? 'selected' : ''}>To Buy</option>
            <option value="Pending" ${f.status === 'Pending' ? 'selected' : ''}>Pending</option>
            <option value="Bought" ${f.status === 'Bought' ? 'selected' : ''}>Bought</option>
          </select>
        </td>
      </tr>
    `;
  }).join('');
  
  document.querySelectorAll('.food-leader-select').forEach(sel => {
    sel.addEventListener('change', (e) => {
      const id = e.target.getAttribute('data-id');
      const f = state.food.find(x => x.id === id);
      if (f) f.leader = e.target.value;
      saveState();
    });
  });

  document.querySelectorAll('.food-status-select').forEach(sel => {
    sel.addEventListener('change', (e) => {
      const id = e.target.getAttribute('data-id');
      const f = state.food.find(x => x.id === id);
      if (f) {
        f.status = e.target.value;
        saveState();
        renderFood();
      }
    });
  });
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
  if (!container) return;

  container.innerHTML = state.debriefMetrics.map(m => {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
      starsHtml += `<i class="fa-solid fa-star debrief-card-star" data-id="${m.id}" data-rating="${i}" style="cursor:pointer; color:${i <= m.rating ? 'var(--gold-500)' : 'rgba(255,255,255,0.2)'}; font-size:1.1rem; margin-right:2px;"></i>`;
    }

    return `
      <div class="card" style="margin-bottom:1rem; padding:1.25rem; border-left:4px solid var(--gold-500);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.75rem;">
          <div>
            <div style="font-weight:700; font-size:1.1rem; color:#FFF;">${m.metric}</div>
            <div style="font-size:0.775rem; color:var(--text-muted);">Submitted by: <strong style="color:var(--gold-400);">${m.author || 'Ian Sinclair'}</strong></div>
          </div>
          <div style="display:flex; align-items:center; gap:0.75rem;">
            <div style="display:flex; align-items:center;">${starsHtml} <span style="font-weight:800; font-size:0.9rem; color:var(--gold-400); margin-left:0.4rem;">(${m.rating}/5)</span></div>
            <button class="btn btn-secondary btn-edit-debrief" data-id="${m.id}" style="padding:0.25rem 0.5rem; font-size:0.75rem;"><i class="fa-solid fa-pen-to-square"></i> Edit</button>
            <button class="btn btn-danger btn-delete-debrief" data-id="${m.id}" style="padding:0.25rem 0.5rem; font-size:0.75rem;"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        </div>

        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap:0.75rem; font-size:0.875rem;">
          <div style="padding:0.75rem; background:rgba(46,125,50,0.15); border:1px solid rgba(46,125,50,0.3); border-radius:8px;">
            <strong style="color:#81C784; display:flex; align-items:center; gap:0.35rem; margin-bottom:0.25rem;"><i class="fa-solid fa-circle-check"></i> What Worked Well (Successes)</strong>
            <div style="color:var(--text-main); line-height:1.4;">${m.success || '—'}</div>
          </div>
          <div style="padding:0.75rem; background:rgba(192,84,47,0.15); border:1px solid rgba(192,84,47,0.3); border-radius:8px;">
            <strong style="color:#FF8A65; display:flex; align-items:center; gap:0.35rem; margin-bottom:0.25rem;"><i class="fa-solid fa-circle-exclamation"></i> What Didn't Work (Challenges)</strong>
            <div style="color:var(--text-main); line-height:1.4;">${m.challenge || '—'}</div>
          </div>
          <div style="padding:0.75rem; background:rgba(212,168,67,0.15); border:1px solid rgba(212,168,67,0.3); border-radius:8px;">
            <strong style="color:var(--gold-400); display:flex; align-items:center; gap:0.35rem; margin-bottom:0.25rem;"><i class="fa-solid fa-lightbulb"></i> Improvements & Notes for Next Time</strong>
            <div style="color:var(--text-main); line-height:1.4;">${m.improvement || '—'}</div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  document.querySelectorAll('.debrief-card-star').forEach(star => {
    star.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      const rating = parseInt(e.target.getAttribute('data-rating'));
      const item = state.debriefMetrics.find(x => x.id === id);
      if (item) {
        item.rating = rating;
        renderDebrief();
      }
    });
  });

  document.querySelectorAll('.btn-edit-debrief').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      openEditDebriefModal(id);
    });
  });

  document.querySelectorAll('.btn-delete-debrief').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      state.debriefMetrics = state.debriefMetrics.filter(x => x.id !== id);
      renderDebrief();
    });
  });
}

function openEditDebriefModal(id) {
  const item = state.debriefMetrics.find(x => x.id === id);
  if (!item) return;

  document.getElementById('debriefModalTitle').innerHTML = '<i class="fa-solid fa-pen-to-square" style="color:var(--gold-500)"></i> Edit Debrief Reflection';
  document.getElementById('inputDebriefId').value = item.id;
  document.getElementById('inputDebriefMetric').value = item.metric || '';
  document.getElementById('inputDebriefRating').value = item.rating || 5;
  updateStarSelectorUI(item.rating || 5);
  document.getElementById('inputDebriefSuccess').value = item.success || '';
  document.getElementById('inputDebriefChallenge').value = item.challenge || '';
  document.getElementById('inputDebriefImprovement').value = item.improvement || '';
  
  const authorSelect = document.getElementById('inputDebriefAuthor');
  authorSelect.innerHTML = state.volunteers.map(v => `<option value="${v.name}" ${v.name === item.author ? 'selected' : ''}>${v.name}</option>`).join('');

  document.getElementById('modalAddDebrief').style.display = 'flex';
}

function updateStarSelectorUI(ratingVal) {
  document.querySelectorAll('#debriefStarSelector i').forEach(star => {
    const v = parseInt(star.getAttribute('data-val'));
    star.style.color = v <= ratingVal ? 'var(--gold-500)' : 'rgba(255,255,255,0.2)';
  });
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
  document.getElementById('inputDads')?.addEventListener('input', (e) => {
    state.attendance.dads = parseInt(e.target.value) || 0;
    renderApp();
  });
  document.getElementById('inputChildren')?.addEventListener('input', (e) => {
    state.attendance.children = parseInt(e.target.value) || 0;
    renderApp();
  });
  document.getElementById('inputHelpers')?.addEventListener('input', (e) => {
    state.attendance.helpers = parseInt(e.target.value) || 0;
    renderApp();
  });
  document.getElementById('inputCampStartTime')?.addEventListener('change', (e) => {
    state.startTime = e.target.value;
    renderTimetable();
    renderVisualSchedule();
  });

  // Add Volunteer Modal Events
  document.getElementById('btnOpenAddVolunteer')?.addEventListener('click', () => {
    document.getElementById('modalAddVolunteer').style.display = 'flex';
  });
  document.getElementById('btnCloseAddVolunteer')?.addEventListener('click', () => {
    document.getElementById('modalAddVolunteer').style.display = 'none';
  });
  document.getElementById('btnCancelAddVolunteer')?.addEventListener('click', () => {
    document.getElementById('modalAddVolunteer').style.display = 'none';
  });
  document.getElementById('btnSaveVolunteer')?.addEventListener('click', () => {
    const name = document.getElementById('inputVolName').value;
    const phone = document.getElementById('inputVolPhone').value;
    const email = document.getElementById('inputVolEmail').value;
    addVolunteer(name, phone, email);
    document.getElementById('inputVolName').value = '';
    document.getElementById('inputVolPhone').value = '';
    document.getElementById('inputVolEmail').value = '';
    document.getElementById('modalAddVolunteer').style.display = 'none';
  });

  // Edit Volunteer Modal Events
  document.getElementById('btnCloseEditVolunteer')?.addEventListener('click', () => {
    document.getElementById('modalEditVolunteer').style.display = 'none';
  });
  document.getElementById('btnCancelEditVolunteer')?.addEventListener('click', () => {
    document.getElementById('modalEditVolunteer').style.display = 'none';
  });
  document.getElementById('btnSaveEditVolunteer')?.addEventListener('click', () => {
    const origName = document.getElementById('editVolOriginalName').value;
    const newName = document.getElementById('editVolName').value;
    const phone = document.getElementById('editVolPhone').value;
    const email = document.getElementById('editVolEmail').value;
    editVolunteer(origName, newName, phone, email);
    document.getElementById('modalEditVolunteer').style.display = 'none';
  });

  // Add Task Modal Events
  document.getElementById('btnOpenAddTask')?.addEventListener('click', () => {
    const leaderSelect = document.getElementById('inputTaskLeader');
    if (leaderSelect) leaderSelect.innerHTML = state.volunteers.map(v => `<option value="${v.name}">${v.name}</option>`).join('');
    document.getElementById('modalAddTask').style.display = 'flex';
  });
  document.getElementById('btnCloseAddTask')?.addEventListener('click', () => {
    document.getElementById('modalAddTask').style.display = 'none';
  });
  document.getElementById('btnCancelAddTask')?.addEventListener('click', () => {
    document.getElementById('modalAddTask').style.display = 'none';
  });
  document.getElementById('btnSaveTask')?.addEventListener('click', () => {
    const category = document.getElementById('inputTaskCategory').value;
    const desc = document.getElementById('inputTaskDesc').value.trim();
    const role = document.getElementById('inputTaskRole').value;
    const leader = document.getElementById('inputTaskLeader').value;
    if (!desc) return;
    
    state.tasks.push({
      id: `task-${Date.now()}`,
      category,
      desc,
      role,
      leader,
      status: 'Pending'
    });
    document.getElementById('inputTaskDesc').value = '';
    document.getElementById('modalAddTask').style.display = 'none';
    renderTasks();
  });

  // Edit Task Modal Events
  document.getElementById('btnCloseEditTask')?.addEventListener('click', () => {
    document.getElementById('modalEditTask').style.display = 'none';
  });
  document.getElementById('btnCancelEditTask')?.addEventListener('click', () => {
    document.getElementById('modalEditTask').style.display = 'none';
  });
  document.getElementById('btnSaveEditTask')?.addEventListener('click', () => {
    const id = document.getElementById('editTaskId').value;
    const category = document.getElementById('inputEditTaskCategory').value;
    const desc = document.getElementById('inputEditTaskDesc').value.trim();
    const role = document.getElementById('inputEditTaskRole').value;
    const leader = document.getElementById('inputEditTaskLeader').value;
    if (!desc) return;
    
    const t = state.tasks.find(x => x.id === id);
    if (t) {
      t.category = category;
      t.desc = desc;
      t.role = role;
      t.leader = leader;
    }
    
    document.getElementById('modalEditTask').style.display = 'none';
    renderTasks();
  });

  // Add Camp Equipment Modal Events
  document.getElementById('btnOpenAddCampEq')?.addEventListener('click', () => {
    const leaderSelect = document.getElementById('inputEqLeader');
    if (leaderSelect) leaderSelect.innerHTML = state.volunteers.map(v => `<option value="${v.name}">${v.name}</option>`).join('');
    document.getElementById('modalAddCampEq').style.display = 'flex';
  });
  document.getElementById('btnCloseAddCampEq')?.addEventListener('click', () => {
    document.getElementById('modalAddCampEq').style.display = 'none';
  });
  document.getElementById('btnCancelAddCampEq')?.addEventListener('click', () => {
    document.getElementById('modalAddCampEq').style.display = 'none';
  });
  document.getElementById('btnSaveCampEq')?.addEventListener('click', () => {
    const item = document.getElementById('inputEqItem').value.trim();
    const qty = parseInt(document.getElementById('inputEqQty').value) || 1;
    const role = document.getElementById('inputEqRole').value;
    const leader = document.getElementById('inputEqLeader').value;
    const notes = document.getElementById('inputEqNotes').value.trim();
    if (!item) return;

    state.campEq.push({
      item,
      qty,
      role,
      leader,
      status: 'Pending',
      notes
    });
    document.getElementById('inputEqItem').value = '';
    document.getElementById('inputEqQty').value = '1';
    document.getElementById('inputEqNotes').value = '';
    document.getElementById('modalAddCampEq').style.display = 'none';
    renderCampEq();
  });

  // Add/Edit Debrief Modal Events
  document.getElementById('btnOpenAddDebrief')?.addEventListener('click', () => {
    document.getElementById('debriefModalTitle').innerHTML = '<i class="fa-solid fa-pen-to-square" style="color:var(--gold-500)"></i> Submit Debrief Reflection';
    document.getElementById('inputDebriefId').value = '';
    document.getElementById('inputDebriefMetric').value = '';
    document.getElementById('inputDebriefRating').value = '5';
    updateStarSelectorUI(5);
    document.getElementById('inputDebriefSuccess').value = '';
    document.getElementById('inputDebriefChallenge').value = '';
    document.getElementById('inputDebriefImprovement').value = '';

    const authorSelect = document.getElementById('inputDebriefAuthor');
    if (authorSelect) authorSelect.innerHTML = state.volunteers.map(v => `<option value="${v.name}">${v.name}</option>`).join('');

    document.getElementById('modalAddDebrief').style.display = 'flex';
  });

  document.querySelectorAll('#debriefStarSelector i').forEach(star => {
    star.addEventListener('click', (e) => {
      const val = parseInt(e.currentTarget.getAttribute('data-val'));
      document.getElementById('inputDebriefRating').value = val;
      updateStarSelectorUI(val);
    });
  });

  document.getElementById('btnCloseAddDebrief')?.addEventListener('click', () => {
    document.getElementById('modalAddDebrief').style.display = 'none';
  });
  document.getElementById('btnCancelAddDebrief')?.addEventListener('click', () => {
    document.getElementById('modalAddDebrief').style.display = 'none';
  });
  document.getElementById('btnSaveDebrief')?.addEventListener('click', () => {
    const id = document.getElementById('inputDebriefId').value;
    const metric = document.getElementById('inputDebriefMetric').value.trim();
    const rating = parseInt(document.getElementById('inputDebriefRating').value) || 5;
    const success = document.getElementById('inputDebriefSuccess').value.trim();
    const challenge = document.getElementById('inputDebriefChallenge').value.trim();
    const improvement = document.getElementById('inputDebriefImprovement').value.trim();
    const author = document.getElementById('inputDebriefAuthor').value;

    if (!metric) return;

    if (id) {
      const existing = state.debriefMetrics.find(x => x.id === id);
      if (existing) {
        existing.metric = metric;
        existing.rating = rating;
        existing.success = success;
        existing.challenge = challenge;
        existing.improvement = improvement;
        existing.author = author;
      }
    } else {
      state.debriefMetrics.push({
        id: `deb-${Date.now()}`,
        metric,
        rating,
        success,
        challenge,
        improvement,
        author
      });
    }

    document.getElementById('modalAddDebrief').style.display = 'none';
    renderDebrief();
  });

  // Search Filters
  document.getElementById('searchTasks')?.addEventListener('input', renderTasks);
  document.getElementById('searchCampEq')?.addEventListener('input', renderCampEq);

  // Visual Schedule Day Toggle
  document.querySelectorAll('.schedule-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.schedule-toggle-btn').forEach(b => {
        b.classList.remove('active');
        b.style.background = 'rgba(255, 255, 255, 0.08)';
        b.style.borderColor = 'var(--border-light)';
      });
      const day = e.currentTarget.getAttribute('data-day');
      e.currentTarget.classList.add('active');
      e.currentTarget.style.background = 'linear-gradient(135deg, var(--gold-500), #B88E2D)';
      e.currentTarget.style.color = 'var(--navy-900)';
      
      const colSat = document.getElementById('colSat');
      const colSun = document.getElementById('colSun');
      
      if (day === 'Saturday') {
        colSat.style.display = 'block';
        colSun.style.display = 'none';
      } else if (day === 'Sunday') {
        colSat.style.display = 'none';
        colSun.style.display = 'block';
      } else {
        colSat.style.display = 'block';
        colSun.style.display = 'block';
      }
    });
  });

  // Timetable Plan A / Plan B Toggle
  document.querySelectorAll('#timetablePlanToggle .plan-toggle-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('#timetablePlanToggle .plan-toggle-btn').forEach(b => {
        b.classList.remove('active');
        b.style.background = 'rgba(255, 255, 255, 0.08)';
        b.style.color = 'var(--text-main)';
      });
      const plan = e.currentTarget.getAttribute('data-plan');
      e.currentTarget.classList.add('active');
      state.activePlan = plan;
      
      if (plan === 'PlanB') {
        e.currentTarget.style.background = 'linear-gradient(135deg, var(--coral-600), #C0542F)';
        e.currentTarget.style.color = '#FFF';
      } else {
        e.currentTarget.style.background = 'linear-gradient(135deg, var(--gold-500), #B88E2D)';
        e.currentTarget.style.color = 'var(--navy-900)';
      }

      renderTimetable();
    });
  });

  // Settings Modal & Master Reset
  document.getElementById('btnSettings')?.addEventListener('click', () => {
    document.getElementById('modalSettings').style.display = 'flex';
    document.getElementById('inputGasUrl').value = state.gasUrl;
  });
  document.getElementById('btnCloseModal')?.addEventListener('click', () => {
    document.getElementById('modalSettings').style.display = 'none';
  });
  document.getElementById('btnSaveGasUrl')?.addEventListener('click', () => {
    state.gasUrl = document.getElementById('inputGasUrl').value.trim();
    localStorage.setItem('journey_gas_url', state.gasUrl);
    document.getElementById('modalSettings').style.display = 'none';
    checkGasSyncStatus();
    saveState();
  });
  document.getElementById('btnRestoreDefaults')?.addEventListener('click', restoreAllDefaultData);

  // Export
  document.getElementById('btnExport')?.addEventListener('click', exportAppData);
}

function checkGasSyncStatus() {
  const badge = document.getElementById('syncBadge');
  const text = document.getElementById('syncText');
  
  if (state.gasUrl) {
    if (badge) badge.classList.remove('offline');
    if (text) text.textContent = 'Google Sheet Sync Active';
  } else {
    if (badge) badge.classList.add('offline');
    if (text) text.textContent = 'Local Mode';
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

// Initialize Engine Failsafe
function initApp() {
  loadAndValidateState();
  initEvents();
  checkGasSyncStatus();
  renderApp();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

function initColumnResize() {
  document.querySelectorAll('.data-table').forEach(table => {
    if (table.dataset.resizeInitialized) return;
    table.dataset.resizeInitialized = 'true';
    
    let isResizing = false;
    let currentTh = null;
    let startX = 0;
    let startWidth = 0;

    table.querySelectorAll('th').forEach(th => {
      if (!th.querySelector('.col-resize-handle')) {
        const handle = document.createElement('div');
        handle.className = 'col-resize-handle';
        th.appendChild(handle);

        const onStart = (e) => {
          isResizing = true;
          currentTh = th;
          startX = e.pageX || (e.touches && e.touches[0].pageX);
          startWidth = th.offsetWidth;
          table.classList.add('resizing');
          
          table.querySelectorAll('th').forEach(col => {
            col.style.width = col.offsetWidth + 'px';
          });
        };

        handle.addEventListener('mousedown', onStart);
        handle.addEventListener('touchstart', onStart, {passive: true});
      }
    });

    const onMove = (e) => {
      if (!isResizing || !currentTh) return;
      const pageX = e.pageX || (e.touches && e.touches[0].pageX);
      const diff = pageX - startX;
      currentTh.style.width = Math.max(30, startWidth + diff) + 'px';
    };

    const onEnd = () => {
      if (isResizing) {
        isResizing = false;
        currentTh = null;
      }
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('touchmove', onMove, {passive: true});
    document.addEventListener('mouseup', onEnd);
    document.addEventListener('touchend', onEnd);
  });
}

function initColumnFilters() {
  document.querySelectorAll('.data-table').forEach(table => {
    const tableId = table.getAttribute('data-table-id');
    if (!tableId) return;

    const cardHeader = table.closest('.card')?.querySelector('.card-header');
    if (!cardHeader) return;

    let filterBtn = cardHeader.querySelector('.btn-col-filter');
    if (filterBtn) filterBtn.remove();
    let dropdown = cardHeader.querySelector('.col-filter-dropdown');
    if (dropdown) dropdown.remove();

    filterBtn = document.createElement('button');
    filterBtn.className = 'btn btn-secondary btn-col-filter';
    filterBtn.innerHTML = '<i class="fa-solid fa-filter"></i> Columns';
    
    dropdown = document.createElement('div');
    dropdown.className = 'col-filter-dropdown';

    const ths = table.querySelectorAll('thead th');
    
    if (!state.columnVisibility) state.columnVisibility = {};
    if (!state.columnVisibility[tableId]) state.columnVisibility[tableId] = {};
    
    const updateColumnVisibility = () => {
      ths.forEach((th, index) => {
        const colName = th.textContent.trim();
        const isHidden = state.columnVisibility[tableId][colName] === true;
        
        if (isHidden) {
          th.classList.add('col-hidden');
          table.querySelectorAll(`tbody tr td:nth-child(${index + 1})`).forEach(td => td.classList.add('col-hidden'));
        } else {
          th.classList.remove('col-hidden');
          table.querySelectorAll(`tbody tr td:nth-child(${index + 1})`).forEach(td => td.classList.remove('col-hidden'));
        }
      });
    };

    ths.forEach((th, index) => {
      const colName = th.textContent.trim();
      const label = document.createElement('label');
      label.className = 'col-filter-label';
      
      const isHidden = state.columnVisibility[tableId][colName] === true;
      
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = !isHidden;
      
      checkbox.addEventListener('change', (e) => {
        state.columnVisibility[tableId][colName] = !e.target.checked;
        saveState();
        updateColumnVisibility();
      });

      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(colName));
      dropdown.appendChild(label);
    });

    filterBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      document.querySelectorAll('.col-filter-dropdown.show').forEach(d => {
        if (d !== dropdown) d.classList.remove('show');
      });
      dropdown.classList.toggle('show');
    });
    
    dropdown.addEventListener('click', (e) => e.stopPropagation());

    let actionsWrap = cardHeader.querySelector('.header-actions');
    if (!actionsWrap) {
      actionsWrap = document.createElement('div');
      actionsWrap.className = 'header-actions';
      cardHeader.appendChild(actionsWrap);
    }
    
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.appendChild(filterBtn);
    wrapper.appendChild(dropdown);
    
    actionsWrap.appendChild(wrapper);

    updateColumnVisibility();
  });
}

document.addEventListener('click', () => {
  document.querySelectorAll('.col-filter-dropdown.show').forEach(d => {
    d.classList.remove('show');
  });
});
