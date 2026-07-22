import json
import re

with open("web_app/js/app.js", "r") as f:
    content = f.read()

# Modify DEFAULT_DATA
content = content.replace("    { id: \"deb-5\", metric: \"Spiritual & Emotional Impact\", rating: 5, success: \"Communion and letter reading times were deeply moving for fathers and children.\", challenge: \"Ensure 15 min buffer before quiet time.\", improvement: \"Keep communion background music playing continuously during quiet time.\", author: \"Richard Walker\" }\n  ]", "    { id: \"deb-5\", metric: \"Spiritual & Emotional Impact\", rating: 5, success: \"Communion and letter reading times were deeply moving for fathers and children.\", challenge: \"Ensure 15 min buffer before quiet time.\", improvement: \"Keep communion background music playing continuously during quiet time.\", author: \"Richard Walker\" }\n  ],\n  columnVisibility: {\n    \"tasks\": { \"Assigned Role\": false },\n    \"campEq\": { \"Assigned Role\": false },\n    \"actEq\": { \"Assigned Role\": false },\n    \"food\": { \"Assigned Role\": false },\n    \"timetable\": { \"Assigned Role\": false, \"Assigned Leader\": false }\n  },\n  showScheduleLeaders: false")

# Modify loadAndValidateState
content = content.replace("        if (saved.gasUrl) state.gasUrl = saved.gasUrl;", "        if (saved.gasUrl) state.gasUrl = saved.gasUrl;\n        if (saved.columnVisibility !== undefined) state.columnVisibility = saved.columnVisibility;\n        if (saved.showScheduleLeaders !== undefined) state.showScheduleLeaders = saved.showScheduleLeaders;")

# Modify renderApp
content = content.replace("  try { renderPlaybook(); } catch(e) { console.error(\"Error renderPlaybook:\", e); }\n  try { renderDebrief(); } catch(e) { console.error(\"Error renderDebrief:\", e); }\n}", "  try { renderPlaybook(); } catch(e) { console.error(\"Error renderPlaybook:\", e); }\n  try { renderDebrief(); } catch(e) { console.error(\"Error renderDebrief:\", e); }\n\n  try { initColumnResize(); } catch(e) { console.error(\"Error initColumnResize:\", e); }\n  try { initColumnFilters(); } catch(e) { console.error(\"Error initColumnFilters:\", e); }\n}")

# Modify renderVisualSchedule
old_renderVisualSchedule = """function renderVisualSchedule() {
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
    
    const card = `
      <div class="schedule-card-compact">
        <span class="schedule-time-pill">${startStr}</span>
        <div class="schedule-info">
          <div class="schedule-title-text">${t.activity}</div>
          <div class="schedule-role-text">${(t.leader || t.role).split('/')[0].trim()}</div>
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
}"""

new_renderVisualSchedule = """function renderVisualSchedule() {
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
}"""

content = content.replace(old_renderVisualSchedule, new_renderVisualSchedule)

appended_code = """
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
"""

with open("web_app/js/app.js", "w") as f:
    f.write(content + appended_code)
