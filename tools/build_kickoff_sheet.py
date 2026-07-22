import xlsxwriter
from datetime import datetime

def build_spreadsheet(filename):
    workbook = xlsxwriter.Workbook(filename)

    # =================================================================
    # COLOUR PALETTE — Journey Brand
    # =================================================================
    NAVY       = '#1B2A4A'   # Deep navy — headings, main titles
    TEAL       = '#1A7A6D'   # Teal — secondary headers, banners
    GOLD       = '#D4A843'   # Warm gold — highlights, inputs
    SLATE      = '#3D5A80'   # Slate blue — subheadings, secondary
    SAND       = '#F5EFE0'   # Warm sand — alt-row background
    CREAM      = '#FFFDF7'   # Cream — standard row background
    CHARCOAL   = '#2D2D2D'   # Body text
    LIGHT_GRAY = '#E8E8E8'   # Readonly / calculated cells
    BURNT_ORN  = '#C0542F'   # Sunday accent / alerts
    FOREST     = '#2E7D32'   # Status: Done / Packed / Safety pass
    AMBER      = '#F9A825'   # Status: Pending / Caution
    CORAL      = '#E57373'   # Status: Emergency / Action needed

    # =================================================================
    # SHARED FORMATS
    # =================================================================
    title_fmt = workbook.add_format({
        'bold': True, 'font_size': 22, 'font_color': NAVY,
        'font_name': 'Calibri', 'bottom': 2, 'bottom_color': GOLD,
        'valign': 'vcenter'
    })
    subtitle_fmt = workbook.add_format({
        'italic': True, 'font_size': 12, 'font_color': SLATE,
        'font_name': 'Calibri', 'valign': 'vcenter'
    })
    section_fmt = workbook.add_format({
        'bold': True, 'font_size': 14, 'font_color': 'white',
        'bg_color': TEAL, 'font_name': 'Calibri',
        'border': 1, 'border_color': TEAL,
        'valign': 'vcenter', 'align': 'left'
    })
    section_alert_fmt = workbook.add_format({
        'bold': True, 'font_size': 14, 'font_color': 'white',
        'bg_color': BURNT_ORN, 'font_name': 'Calibri',
        'border': 1, 'border_color': BURNT_ORN,
        'valign': 'vcenter', 'align': 'left'
    })

    # --- Headers ---
    hdr = workbook.add_format({
        'bold': True, 'font_size': 11, 'font_color': 'white',
        'bg_color': NAVY, 'font_name': 'Calibri',
        'border': 1, 'border_color': NAVY,
        'text_wrap': True, 'valign': 'vcenter', 'align': 'center'
    })
    hdr_gold = workbook.add_format({
        'bold': True, 'font_size': 11, 'font_color': NAVY,
        'bg_color': GOLD, 'font_name': 'Calibri',
        'border': 1, 'border_color': GOLD,
        'text_wrap': True, 'valign': 'vcenter', 'align': 'center'
    })

    # --- Data cells ---
    def make_cell(bg, **kw):
        base = {
            'font_name': 'Calibri', 'font_size': 11,
            'font_color': CHARCOAL, 'bg_color': bg,
            'border': 1, 'border_color': LIGHT_GRAY,
            'valign': 'vcenter', 'text_wrap': True
        }
        base.update(kw)
        return workbook.add_format(base)

    c1 = make_cell(CREAM)
    c2 = make_cell(SAND)
    c1_center = make_cell(CREAM, align='center')
    c2_center = make_cell(SAND, align='center')

    c1_time = make_cell(CREAM, num_format='hh:mm AM/PM', align='center')
    c2_time = make_cell(SAND, num_format='hh:mm AM/PM', align='center')

    readonly = make_cell(LIGHT_GRAY, font_color='#5D6D7E', italic=True)
    readonly_center = make_cell(LIGHT_GRAY, font_color='#5D6D7E', italic=True, align='center')

    input_cell = make_cell('#FFF8E1', bold=True, align='center', border_color=GOLD)
    calc_cell = make_cell('#E0F2F1', bold=True, align='center', font_color=TEAL, border_color=TEAL)

    time_input_fmt = workbook.add_format({
        'num_format': 'hh:mm AM/PM', 'font_name': 'Calibri',
        'font_size': 14, 'bold': True, 'font_color': NAVY,
        'bg_color': '#FFF8E1', 'align': 'center', 'valign': 'vcenter',
        'border': 2, 'border_color': GOLD
    })
    label_right = workbook.add_format({
        'bold': True, 'font_size': 12, 'font_name': 'Calibri',
        'font_color': SLATE, 'align': 'right', 'valign': 'vcenter'
    })

    # Visual Schedule formats
    vs_day_sat = workbook.add_format({
        'bold': True, 'font_size': 18, 'font_color': 'white',
        'bg_color': NAVY, 'font_name': 'Calibri',
        'align': 'center', 'valign': 'vcenter',
        'bottom': 3, 'bottom_color': GOLD
    })
    vs_day_sun = workbook.add_format({
        'bold': True, 'font_size': 18, 'font_color': 'white',
        'bg_color': BURNT_ORN, 'font_name': 'Calibri',
        'align': 'center', 'valign': 'vcenter',
        'bottom': 3, 'bottom_color': GOLD
    })
    vs_time = workbook.add_format({
        'bold': True, 'font_size': 16, 'num_format': 'h:mm AM/PM',
        'font_color': GOLD, 'font_name': 'Calibri',
        'align': 'right', 'valign': 'vcenter'
    })
    vs_act = workbook.add_format({
        'bold': True, 'font_size': 15, 'font_color': NAVY,
        'font_name': 'Calibri', 'valign': 'vcenter'
    })
    vs_lead = workbook.add_format({
        'italic': True, 'font_size': 11, 'font_color': SLATE,
        'font_name': 'Calibri', 'valign': 'top'
    })
    vs_divider = workbook.add_format({'bottom': 1, 'bottom_color': LIGHT_GRAY})

    def alt(i, fmt_a=c1, fmt_b=c2):
        return fmt_a if i % 2 == 0 else fmt_b

    # =================================================================
    # TAB 1  ▸  Settings & Volunteers (Universal Son/Daughter Template)
    # =================================================================
    ws = workbook.add_worksheet('1. Settings & Leaders')
    ws.hide_gridlines(2)
    ws.set_tab_color(GOLD)
    ws.set_column('A:A', 30)
    ws.set_column('B:B', 18)
    ws.set_column('C:C', 4)
    ws.set_column('D:D', 6)
    ws.set_column('E:E', 28)
    ws.set_column('F:F', 24)
    ws.set_column('G:G', 32)

    ws.set_row(0, 36)
    ws.write('A1', '⚙  Camp Settings & Volunteer Directory', title_fmt)
    ws.set_row(1, 20)
    ws.write('A2', 'Universal template for Dads & Daughters or Dads & Sons camps. Manage variables and available volunteers directory here.', subtitle_fmt)

    # --- Camp Type & Track Config ---
    ws.set_row(3, 28)
    ws.merge_range('A4:B4', '  CAMP TYPE CONFIGURATION', section_fmt)
    
    ws.set_row(4, 26); ws.write('A5', 'Camp Track / Type', c1)
    ws.data_validation(4, 1, 4, 1, {'validate': 'list', 'source': ['Father & Daughter Camp', 'Father & Son Camp'], 'ignore_blank': False})
    ws.write('B5', 'Father & Daughter Camp', input_cell)

    # --- Attendance block ---
    ws.set_row(6, 28)
    ws.merge_range('A7:B7', '  CAMP ATTENDANCE VARIABLES', section_fmt)
    ws.set_row(7, 26); ws.write('A8', 'Number of Dads', c1); ws.write_number('B8', 16, input_cell)
    ws.set_row(8, 26); ws.write('A9', 'Number of Children (Daughters/Sons)', c2); ws.write_number('B9', 16, input_cell)
    ws.set_row(9, 26); ws.write('A10', 'Helpers / Leaders / Lifeguards', c1); ws.write_number('B10', 11, input_cell)
    ws.set_row(10, 30); ws.write('A11', 'TOTAL PARTICIPANTS', hdr_gold); ws.write_formula('B11', '=SUM(B8:B10)', calc_cell)

    # --- Available Volunteers directory ---
    ws.set_row(3, 28)
    ws.merge_range('D4:G4', '  AVAILABLE VOLUNTEERS DIRECTORY', section_fmt)
    ws.write('D5', '#', hdr); ws.write('E5', 'Name', hdr)
    ws.write('F5', 'Contact Number', hdr)
    ws.write('G5', 'Email Address', hdr)
    ws.set_row(4, 24)

    volunteers = [
        ['Ian Sinclair', '+27 63 893 9452', 'ian@journey.org'],
        ['Neil Harrower', '+27 71 950 8363', 'neil@journey.org'],
        ['Marvin Welby-Solomon', '', 'marvin@journey.org'],
        ['Kingsley Williams', '+27 83 260 5311', 'kingsley@journey.org'],
        ['Kevin de Wet', '+27 82 908 2460', 'kevin@journey.org'],
        ['Paul Barter', '', 'paul@journey.org'],
        ['Raldo Kruger', '+27 84 511 8606', 'raldo@journey.org'],
        ['Gavin Graham', '+27 82 123 4567', 'gavin@journey.org'],
        ['Richard Walker', '', 'richard@journey.org'],
        ['Youth Track Leader A', '', 'youth1@journey.org'],
        ['Youth Track Leader B', '', 'youth2@journey.org']
    ]
    for i, v in enumerate(volunteers):
        r = i + 5
        fmt = alt(i, c1_center, c2_center)
        fmtn = alt(i)
        ws.write(r, 3, i + 1, fmt)
        ws.write(r, 4, v[0], fmtn)
        ws.write(r, 5, v[1], fmtn)
        ws.write(r, 6, v[2], fmtn)
        ws.set_row(r, 24)

    for i in range(len(volunteers), 25):
        r = i + 5
        fmt = alt(i, c1_center, c2_center)
        fmtn = alt(i)
        ws.write(r, 3, i + 1, fmt)
        ws.write(r, 4, '', fmtn)
        ws.write(r, 5, '', fmtn)
        ws.write(r, 6, '', fmtn)
        ws.set_row(r, 24)

    # =================================================================
    # TAB 2  ▸  Roster & Roles (Includes Water Safety & Lifeguards)
    # =================================================================
    ws2 = workbook.add_worksheet('2. Roster & Roles')
    ws2.hide_gridlines(2)
    ws2.set_tab_color(NAVY)
    ws2.set_column('A:A', 28)
    ws2.set_column('B:B', 65)
    ws2.set_column('C:C', 26)
    ws2.set_column('D:D', 20)
    ws2.set_column('E:E', 28)

    ws2.set_row(0, 36)
    ws2.write('A1', '👥  Roles & Volunteer Roster', title_fmt)
    ws2.set_row(1, 20)
    ws2.write('A2', 'Assign volunteers from Settings tab to each role. Contact number & email auto-fill.', subtitle_fmt)

    ws2.set_row(3, 28)
    ws2.merge_range('A4:E4', '  ROLE ASSIGNMENTS & WATER SAFETY ROSTER', section_fmt)

    for ci, h in enumerate(['Role Title', 'Description & Default Duties', 'Assigned Volunteer', 'Auto-Filled Contact', 'Auto-Filled Email']):
        ws2.write(4, ci, h, hdr)
    ws2.set_row(4, 26)

    roles = [
        ['Oversight Lead',
         '• Ultimate decision-making authority during camp.\n• Sets tone & atmosphere, resolves live issues, escalates emergencies, and ensures every session aligns with Journey heart.',
         'Ian Sinclair'],
        ['Session Coordinator',
         '• Holds the spiritual and emotional heartbeat of the weekend.\n• Leads the Malachi discussion, facilitates father-child reflection moments, and coordinates Sunday programme.',
         'Marvin Welby-Solomon'],
        ['Logistics Lead',
         '• Owns physical setup and breakdown, bivvy/shelter allocation, firewood supply, venue layout, and camp environment setup.',
         'Neil Harrower'],
        ['Administration',
         '• Manages RSVPs, attendance, name tags, emergency contact lists, gate access, and welcome check-in.',
         'Paul Barter'],
        ['Activity Facilitator',
         '• Creates the environment of fun, play, and adventure.\n• Leads all physical activities (Clay Latte, Tug of War, ice breakers) and ensures every child feels included.',
         'Kingsley Williams'],
        ['Catering / Fire Lead',
         '• Oversees food logistics and communal fire management.\n• Ensures cooking coals, hot water, and stokbrood fires are ready on schedule.',
         'Kevin de Wet'],
        ['Safety & Welfare Lead',
         '• Accountable for physical safety and welfare across all camp activities.\n• Conducts venue risk assessment, manages water safety & lifeguards, and holds first aid kit.',
         'Raldo Kruger'],
        ['Spiritual Oversight / Prayer Lead',
         '• Carries the spiritual atmosphere and prayer foundation.\n• Gathers team for prayer, stays aware of spiritual dynamics, and assists with communion.',
         'Ian Sinclair'],
        ['Pastoral Care Lead',
         '• Provides 1-on-1 pastoral support for fathers or children processing intense emotions.\n• Debriefs facilitators and coordinates post-camp referrals.',
         'Richard Walker'],
        ['Youth Track Leader 1',
         '• Dedicated to the children experience.\n• Leads parallel youth track during dad talks, keeping children engaged and active.',
         'Youth Track Leader A'],
        ['Youth Track Leader 2',
         '• Co-leads youth programme alongside Youth Track Leader 1, supporting group dynamics and smooth transitions.',
         'Youth Track Leader B'],
        ['Communion Sub-Leader',
         '• Prepares and administers communion elements on Sunday morning with reverence and intentionality.',
         'Richard Walker']
    ]

    for i, rd in enumerate(roles):
        r = i + 5
        f = alt(i)
        ws2.write(r, 0, rd[0], make_cell(CREAM if i%2==0 else SAND, bold=True))
        ws2.write(r, 1, rd[1], f)
        ws2.data_validation(r, 2, r, 2, {
            'validate': 'list',
            'source': "='1. Settings & Leaders'!$E$6:$E$30",
            'ignore_blank': True, 'show_error': False
        })
        ws2.write(r, 2, rd[2], make_cell(CREAM if i%2==0 else SAND, border_color=GOLD))
        ws2.write_formula(r, 3,
            f"=IFERROR(VLOOKUP(C{r+1},'1. Settings & Leaders'!$E$6:$G$30,2,FALSE),\"\")",
            readonly)
        ws2.write_formula(r, 4,
            f"=IFERROR(VLOOKUP(C{r+1},'1. Settings & Leaders'!$E$6:$G$30,3,FALSE),\"\")",
            readonly)
        ws2.set_row(r, 65)

    # =================================================================
    # TAB 3  ▸  Detailed Timetable (Includes Plan B Weather Contingency)
    # =================================================================
    ws3 = workbook.add_worksheet('3. Detailed Timetable')
    ws3.hide_gridlines(2)
    ws3.set_tab_color(SLATE)
    ws3.set_column('A:A', 12)
    ws3.set_column('B:C', 15)
    ws3.set_column('D:D', 14)
    ws3.set_column('E:E', 22)
    ws3.set_column('F:F', 40)
    ws3.set_column('G:G', 22)
    ws3.set_column('H:H', 40)
    ws3.set_column('I:I', 14)

    ws3.set_row(0, 36)
    ws3.write('A1', '📋  Detailed Run Sheet', title_fmt)
    ws3.set_row(1, 20)
    ws3.write('A2', 'Sequential timetable with Plan B Weather Contingency for every activity. Override start times by typing directly.', subtitle_fmt)

    ws3.set_row(3, 32)
    ws3.write('B4', 'Camp Start Time ▸', label_right)
    ws3.write_datetime('C4', datetime(1899, 12, 31, 15, 0), time_input_fmt)

    ws3.set_row(5, 4)

    for ci, h in enumerate(['Day', 'Start', 'End', 'Duration', 'Activity', 'Description', 'Assigned Role', 'Plan B (Weather Contingency)', 'Phase']):
        ws3.write(6, ci, h, hdr)
    ws3.set_row(6, 26)

    run = [
        ['Saturday', 30, 'Arrival', 'Arrive at camp, name tags, get to know contacts', 'Administration', 'Plan A operates in all weather (indoor/covered check-in)', 'Arrival'],
        ['Saturday', 30, 'Ice Breaker', 'Get to know each other (Child introduces Father, name game)', 'Activity Facilitator', 'Move under covered veranda or main hall if raining', 'Ice Breaker'],
        ['Saturday', 90, 'Clay Latte', 'Father-child activities (Clay Latte) & Dam swim (Lifeguards active)', 'Activity Facilitator / Lifeguard 1', 'If rain/lightning: Cancel dam swim. Move clay building under covered veranda.', 'Activity'],
        ['Saturday', 90, 'Camp Setup', 'Set-up shelters, bivvy equipment, prepare fire', 'Logistics Lead', 'If heavy rain: Erect waterproof tarps overhead / setup inside main hall/barn.', 'Setup'],
        ['Saturday', 60, 'Dinner Prep', 'Ensure fire is started on time with enough coals for families to cook.', 'Catering / Fire Lead', 'If rain: Use covered braai area or gas stoves under gazebo.', 'Dinner Prep'],
        ['Saturday', 30, 'Dinner', 'Dads and children cook and have supper together', 'Oversight Lead', 'Eat under covered dining veranda / hall.', 'Dinner'],
        ['Saturday', 60, 'Stokbrood', 'Marshmallows and stokbrood at fire, chat about question cards', 'Session Coordinator', 'If rain: Move stokbrood cooking to gas stoves under gazebo; sit inside for questions.', 'Evening'],
        ['Saturday', 60, 'Skits & Debrief', 'Present skits and carving, end of evening debrief', 'Oversight Lead', 'Move inside main hall / large marquee.', 'Wind Down'],
        ['Saturday', 0, 'Bed Time', 'Lights out', 'Oversight Lead', 'If severe storm: Move sleeping from bivvies into indoor hall/vehicles.', 'Lights Out'],
        ['Sunday', 45, 'Wake Up', 'Wake up, dam swim (Lifeguards active), boil kettles, coffee', 'Logistics Lead / Lifeguard 1', 'If rain/cold: Cancel dam swim. Hot coffee & kettles under veranda.', 'Morning'],
        ['Sunday', 90, 'Malachi', 'Malachi discussion (sand demo) and scripture video', 'Session Coordinator', 'Move inside main hall with projector.', 'Session 1'],
        ['Sunday', 30, 'Communion', 'Administer communion elements', 'Communion Sub-Leader', 'Perform inside hall or under covered gazebo with soft lighting.', 'Communion'],
        ['Sunday', 15, 'Quiet Time', 'Father-child quiet time (reflect on Malachi)', 'Oversight Lead', 'Sit on covered porch / inside main hall in quiet corners.', 'Session 2'],
        ['Sunday', 60, 'Breakfast', 'Fire ready, boiling water. Families prepare own breakfast.', 'Catering / Fire Lead', 'Use covered kitchen area / gas burners under gazebo.', 'Breakfast'],
        ['Sunday', 60, 'Manhood Talk', "Dad's talk and children's talk split", 'Session Coordinator', 'Split into two separate indoor rooms / covered areas.', 'Session 3'],
        ['Sunday', 15, 'Final Debrief', 'Reflection on the sleepover, present carving', 'Oversight Lead', 'Inside main hall.', 'Debrief'],
        ['Sunday', 60, 'Pack Up', 'Pack up camp', 'Logistics Lead', 'Use tarps over gear while packing into vehicles.', 'Pack Up'],
        ['Sunday', 45, 'Tug of War', 'Father-child activity (Tug of war, Dam swim - Lifeguards active)', 'Activity Facilitator / Lifeguard 1', 'If rain: Cancel dam swim. Mud tug-of-war if light rain, or indoor arm wrestling challenge if heavy rain.', 'Activity'],
        ['Sunday', 0, 'Departure', 'Depart from camp', 'Administration', 'Final departure from venue.', 'Departure']
    ]

    sr = 7
    for i, rd in enumerate(run):
        r = sr + i
        f = alt(i)
        ft = alt(i, c1_time, c2_time)

        day_fmt = make_cell(CREAM if i%2==0 else SAND, bold=True, font_color=NAVY if rd[0]=='Saturday' else BURNT_ORN, align='center')
        ws3.write(r, 0, rd[0], day_fmt)

        if i == 0:
            ws3.write_formula(r, 1, '=$C$4', ft)
        else:
            ws3.write_formula(r, 1, f'=C{r}', ft)
        ws3.write_formula(r, 2, f'=B{r+1}+(D{r+1}/1440)', ft)

        dur_fmt = make_cell(CREAM if i%2==0 else SAND, align='center', bold=True)
        ws3.write_number(r, 3, rd[1], dur_fmt)

        ws3.write(r, 4, rd[2], make_cell(CREAM if i%2==0 else SAND, bold=True))
        ws3.write(r, 5, rd[3], f)

        ws3.data_validation(r, 6, r, 6, {
            'validate': 'list',
            'source': "='2. Roster & Roles'!$A$6:$A$25",
            'ignore_blank': True, 'show_error': False
        })
        ws3.write(r, 6, rd[4], make_cell(CREAM if i%2==0 else SAND, border_color=GOLD))
        ws3.write(r, 7, rd[5], make_cell(CREAM if i%2==0 else SAND, font_color=BURNT_ORN, italic=True))
        ws3.write(r, 8, rd[6], readonly)
        ws3.set_row(r, 36)

    # =================================================================
    # TAB 4  ▸  Visual Schedule
    # =================================================================
    ws4 = workbook.add_worksheet('4. Visual Schedule')
    ws4.hide_gridlines(2)
    ws4.set_tab_color(GOLD)
    ws4.set_column('A:A', 3)
    ws4.set_column('B:B', 18)
    ws4.set_column('C:C', 30)
    ws4.set_column('D:D', 6)
    ws4.set_column('E:E', 18)
    ws4.set_column('F:F', 30)

    ws4.set_row(0, 36)
    ws4.write('A1', '🗓  Visual Camp Schedule', title_fmt)
    ws4.set_row(1, 20)
    ws4.write('A2', 'Auto-updating overview. Print this page or view on your phone for a quick reference.', subtitle_fmt)

    ws4.set_row(3, 38)
    ws4.merge_range('B4:C4', '☀  SATURDAY', vs_day_sat)
    ws4.merge_range('E4:F4', '🌅  SUNDAY', vs_day_sun)

    for i in range(9):
        rv = 5 + (i * 3)
        rd = 8 + i
        ws4.write_formula(rv, 1, f"='3. Detailed Timetable'!B{rd}", vs_time)
        ws4.write_formula(rv, 2, f"='3. Detailed Timetable'!E{rd}", vs_act)
        ws4.write_formula(rv+1, 2, f'="Led by: "&\'3. Detailed Timetable\'!G{rd}', vs_lead)
        ws4.write(rv+2, 1, '', vs_divider)
        ws4.write(rv+2, 2, '', vs_divider)
        ws4.set_row(rv, 28)
        ws4.set_row(rv+1, 18)
        ws4.set_row(rv+2, 6)

    for i in range(10):
        rv = 5 + (i * 3)
        rd = 17 + i
        ws4.write_formula(rv, 4, f"='3. Detailed Timetable'!B{rd}", vs_time)
        ws4.write_formula(rv, 5, f"='3. Detailed Timetable'!E{rd}", vs_act)
        ws4.write_formula(rv+1, 5, f'="Led by: "&\'3. Detailed Timetable\'!G{rd}', vs_lead)
        ws4.write(rv+2, 4, '', vs_divider)
        ws4.write(rv+2, 5, '', vs_divider)
        ws4.set_row(rv, 28)
        ws4.set_row(rv+1, 18)
        ws4.set_row(rv+2, 6)

    # =================================================================
    # TAB 5  ▸  Pre-Camp Tasks
    # =================================================================
    ws5 = workbook.add_worksheet('5. Pre-Camp Tasks')
    ws5.hide_gridlines(2)
    ws5.set_tab_color(TEAL)
    ws5.set_column('A:A', 22)
    ws5.set_column('B:B', 55)
    ws5.set_column('C:C', 26)
    ws5.set_column('D:D', 15)
    ws5.set_column('E:E', 35)

    ws5.set_row(0, 36)
    ws5.write('A1', '✅  Pre-Camp Task Checklist', title_fmt)
    ws5.set_row(1, 20)
    ws5.write('A2', 'Action items that must be completed before arrival at the camp venue.', subtitle_fmt)

    ws5.set_row(3, 28)
    ws5.merge_range('A4:E4', '  PRE-PLANNING TASKS', section_fmt)

    for ci, h in enumerate(['Category', 'Task Description', 'Assigned Role', 'Status', 'Notes']):
        ws5.write(4, ci, h, hdr)
    ws5.set_row(4, 26)

    tasks = [
        ['Pre-Planning', 'Finalize RSVP list and dietary requirements', 'Administration'],
        ['Pre-Planning', 'Review medical forms, emergency contacts & allergy flags', 'Oversight Lead'],
        ['Pre-Planning', 'Confirm 2 Lifeguards / Water Safety Leads assigned & certified', 'Oversight Lead'],
        ['Pre-Planning', 'Inspect water safety equipment (throw ropes, life buoys, first aid kit)', 'Lifeguard 1 (Water Safety Lead)'],
        ['Pre-Planning', 'Confirm venue emergency contacts & directions to nearest hospital', 'Administration'],
        ['Pre-Planning', 'Purchase all communal shopping list items (see Food tab)', 'Catering / Fire Lead'],
        ['Pre-Planning', 'Print name tags and laminate question cards', 'Administration'],
        ['Pre-Planning', 'Confirm venue access codes and agree on final camp & weather Plan B layout', 'Logistics Lead'],
        ['Pre-Planning', 'Pack all camp equipment, tents, bivvies, and activity gear', 'Logistics Lead'],
        ['Pre-Planning', 'Download YouTube Malachi scripture video to a device', 'Session Coordinator'],
        ['Pre-Planning', 'Test projector and speaker with downloaded video', 'Session Coordinator'],
        ['Pre-Planning', 'Communicate final packing list & weather Plan B to all fathers', 'Administration'],
        ['Pre-Planning', 'Prepare communion elements (bread loaf, grape juice)', 'Communion Sub-Leader']
    ]
    for i, td in enumerate(tasks):
        r = i + 5
        f = alt(i)
        ws5.write(r, 0, td[0], f)
        ws5.write(r, 1, td[1], f)
        ws5.data_validation(r, 2, r, 2, {
            'validate': 'list',
            'source': "='2. Roster & Roles'!$A$6:$A$25",
            'ignore_blank': True, 'show_error': False
        })
        ws5.write(r, 2, td[2], make_cell(CREAM if i%2==0 else SAND, border_color=GOLD))
        ws5.data_validation(r, 3, r, 3, {
            'validate': 'list',
            'source': ['Not Started', 'Pending', 'Done'],
            'ignore_blank': True
        })
        ws5.write(r, 3, 'Not Started', alt(i, c1_center, c2_center))
        ws5.write(r, 4, '', f)
        ws5.set_row(r, 28)

    # =================================================================
    # TAB 6  ▸  Emergency & Safety Protocols (NEW TAB)
    # =================================================================
    ws6 = workbook.add_worksheet('6. Emergency & Safety')
    ws6.hide_gridlines(2)
    ws6.set_tab_color(CORAL)
    ws6.set_column('A:A', 28)
    ws6.set_column('B:B', 30)
    ws6.set_column('C:C', 35)
    ws6.set_column('D:D', 40)

    ws6.set_row(0, 36)
    ws6.write('A1', '🚨  Emergency & Safety Protocols', title_fmt)
    ws6.set_row(1, 20)
    ws6.write('A2', 'Emergency contacts, hospital directions, water safety rules, and medical escalation procedures.', subtitle_fmt)

    # Section 1: Emergency Numbers & Hospital Info
    ws6.set_row(3, 28)
    ws6.merge_range('A4:D4', '  1. EMERGENCY SERVICES & VENUE INFO', section_alert_fmt)
    
    emerg_headers = ['Service / Contact', 'Phone Number', 'Address / Details', 'Notes / Instructions']
    for ci, h in enumerate(emerg_headers):
        ws6.write(4, ci, h, hdr)
    ws6.set_row(4, 24)

    emerg_info = [
        ['Nearest Hospital (ER)', '+27 21 850 4000', 'Helderberg Hospital / Medi-Clinic, Somerset West', '24hr Emergency Room. Drive time: ~20 min. Emergency vehicle assigned: Logistics Lead car.'],
        ['Ambulance (ER24 / Netcare)', '10177 / 084 124', 'National Dispatch', 'State exact venue GPS coordinates and nature of injury.'],
        ['Venue Landowner / Manager', '+27 82 555 1234', 'Camp Site Main Gate / Office', 'For gate access override, power failure, or farm emergencies.'],
        ['Journey Oversight Lead', '+27 63 893 9452', 'Ian Sinclair (On-site)', 'Primary decision maker for medical evacuation or incident reporting.'],
        ['Safety & Welfare Lead', '+27 84 511 8606', 'Raldo Kruger (On-site)', 'Certified Lifeguard & First Aid Lead for all camp activities and dam safety.'],
        ['Pastoral Care Lead', '+27 82 123 4567', 'Richard Walker (On-site)', '1-on-1 emotional/pastoral support and debriefs.']
    ]
    for i, row in enumerate(emerg_info):
        r = i + 5
        f = alt(i)
        ws6.write(r, 0, row[0], make_cell(CREAM if i%2==0 else SAND, bold=True))
        ws6.write(r, 1, row[1], make_cell(CREAM if i%2==0 else SAND, font_color=BURNT_ORN, bold=True, align='center'))
        ws6.write(r, 2, row[2], f)
        ws6.write(r, 3, row[3], f)
        ws6.set_row(r, 28)

    # Section 2: Water Safety Protocol & Lifeguard Rules
    ws6.set_row(12, 28)
    ws6.merge_range('A13:D13', '  2. WATER SAFETY & DAM PROTOCOL', section_fmt)
    
    ws6.write('A14', 'Rule / Protocol', hdr)
    ws6.write('B14', 'Requirement', hdr)
    ws6.write('C14', 'Responsible Role', hdr)
    ws6.write('D14', 'Enforcement & Action Plan', hdr)
    ws6.set_row(13, 24)

    water_rules = [
        ['Dedicated Water Safety Watching', 'ALWAYS active during dam entry', 'Safety & Welfare Lead', 'NO ONE enters the dam unless Safety & Welfare Lead / Lifeguard is on the bank watching. Zero exceptions.'],
        ['Adult Supervision Ratio', '1 adult per 2 children in water', 'All Fathers & Safety Lead', 'Fathers must be in the water or at the water edge actively watching their child.'],
        ['Safety Equipment Required', 'Life buoy + Throw rope + First aid kit', 'Safety & Welfare Lead', 'Kept on the dam bank at all times during swimming / Clay Latte / Tug of War.'],
        ['Weather / Lightning Rule', 'Immediate water exit on thunder/rain', 'Oversight Lead & Safety Lead', 'If lightning or thunder occurs within 10km, water cleared immediately for 30 minutes minimum.'],
        ['Buddy System', 'Pair up every child', 'Activity Facilitator', 'Children must stay with their father/buddy at all times in the water zone.']
    ]
    for i, row in enumerate(water_rules):
        r = i + 14
        f = alt(i)
        ws6.write(r, 0, row[0], make_cell(CREAM if i%2==0 else SAND, bold=True))
        ws6.write(r, 1, row[1], make_cell(CREAM if i%2==0 else SAND, align='center', bold=True, font_color=TEAL))
        ws6.write(r, 2, row[2], f)
        ws6.write(r, 3, row[3], f)
        ws6.set_row(r, 28)

    # Section 3: Medical Escalation & Incident Log
    ws6.set_row(20, 28)
    ws6.merge_range('A21:D21', '  3. MEDICAL INCIDENT DECISION TREE', section_fmt)
    
    ws6.write('A22', 'Severity Level', hdr)
    ws6.write('B22', 'Examples', hdr)
    ws6.write('C22', 'Immediate Action', hdr)
    ws6.write('D22', 'Escalation & Communication', hdr)
    ws6.set_row(21, 24)

    incidents = [
        ['Level 1: Minor', 'Scrape, minor cut, bee sting, small burn', 'Treat using First Aid Kit on-site.', 'Log in incident notes. Inform father.'],
        ['Level 2: Moderate', 'Deep cut, sprain, persistent vomiting, mild allergic reaction', 'Administer first aid, assess if hospital visit needed.', 'Inform Oversight Lead & Parent immediately. Drive to Helderberg ER if required.'],
        ['Level 3: Severe', 'Near-drowning, fracture, head injury, severe anaphylaxis', 'Call Ambulance (10177 / 084 124) immediately. Begin CPR / First Aid.', 'Oversight Lead takes full command. Notify emergency contact. File formal incident report.']
    ]
    for i, row in enumerate(incidents):
        r = i + 22
        f = alt(i)
        severity_color = FOREST if i==0 else (AMBER if i==1 else BURNT_ORN)
        ws6.write(r, 0, row[0], make_cell(CREAM if i%2==0 else SAND, bold=True, font_color=severity_color))
        ws6.write(r, 1, row[1], f)
        ws6.write(r, 2, row[2], f)
        ws6.write(r, 3, row[3], f)
        ws6.set_row(r, 28)

    # =================================================================
    # TAB 7  ▸  Camp Equipment (General + Water Safety Gear)
    # =================================================================
    ws7 = workbook.add_worksheet('7. Camp Equipment')
    ws7.hide_gridlines(2)
    ws7.set_tab_color(SLATE)
    ws7.set_column('A:A', 32)
    ws7.set_column('B:B', 12)
    ws7.set_column('C:C', 26)
    ws7.set_column('D:D', 14)
    ws7.set_column('E:E', 35)

    ws7.set_row(0, 36)
    ws7.write('A1', '🏕  General Camp & Safety Equipment', title_fmt)
    ws7.set_row(1, 20)
    ws7.write('A2', 'Core items for camp setup and safety kit. Static quantities.', subtitle_fmt)

    ws7.set_row(3, 28)
    ws7.merge_range('A4:E4', '  GENERAL EQUIPMENT & SAFETY CHECKLIST', section_fmt)

    for ci, h in enumerate(['Item', 'Qty', 'Assigned Role', 'Status', 'Notes']):
        ws7.write(4, ci, h, hdr)
    ws7.set_row(4, 26)

    camp_eq = [
        ['First aid kit (Comprehensive)', 1, 'Oversight Lead / Lifeguard 1'],
        ['Life Buoy / Rescue Ring', 1, 'Lifeguard 1 (Water Safety Lead)'],
        ['Water Rescue Throw Rope (20m)', 1, 'Lifeguard 1 (Water Safety Lead)'],
        ['Lifeguard Whistles (High-decibel)', 2, 'Lifeguard 1 & Lifeguard 2'],
        ['High-Vis Lifeguard Vests', 2, 'Lifeguard 1 & Lifeguard 2'],
        ['Washing bowl', 1, 'Logistics Lead'],
        ['Dish towel', 2, 'Logistics Lead'],
        ['Dish cloth', 5, 'Logistics Lead'],
        ['Dish scourers', 5, 'Logistics Lead'],
        ['Dish washing liquid', 1, 'Logistics Lead'],
        ['Chopping board (wooden)', 4, 'Catering / Fire Lead'],
        ['Garbage bags', 5, 'Logistics Lead'],
        ['Spade', 1, 'Logistics Lead'],
        ['Water Carrier', 1, 'Logistics Lead'],
        ['Gas bottles', 2, 'Logistics Lead'],
        ['Gas kettle (Large)', 1, 'Logistics Lead'],
        ['Gas plate', 2, 'Logistics Lead'],
        ['Gas kettle (small)', 1, 'Logistics Lead'],
        ['Gas two-plater', 1, 'Logistics Lead'],
        ['Cutlery set', 1, 'Catering / Fire Lead'],
        ['Gas fire starter (rod)', 1, 'Logistics Lead'],
        ['Tongs', 4, 'Catering / Fire Lead'],
        ['Bodum', 1, 'Catering / Fire Lead'],
        ['Braai grid (large)', 1, 'Logistics Lead'],
        ['Journey Banner', 1, 'Logistics Lead'],
        ['Fire lighter', 1, 'Logistics Lead'],
        ['Camping mats', 6, 'Logistics Lead'],
        ['Axe', 1, 'Logistics Lead'],
        ['Mallet', 1, 'Logistics Lead']
    ]
    for i, eq in enumerate(camp_eq):
        r = i + 5
        f = alt(i)
        ws7.write(r, 0, eq[0], f)
        ws7.write_number(r, 1, eq[1], alt(i, c1_center, c2_center))
        ws7.data_validation(r, 2, r, 2, {
            'validate': 'list',
            'source': "='2. Roster & Roles'!$A$6:$A$25",
            'ignore_blank': True, 'show_error': False
        })
        ws7.write(r, 2, eq[2], make_cell(CREAM if i%2==0 else SAND, border_color=GOLD))
        ws7.data_validation(r, 3, r, 3, {
            'validate': 'list',
            'source': ['To Buy', 'Pending', 'Packed'],
            'ignore_blank': True
        })
        ws7.write(r, 3, 'To Buy', alt(i, c1_center, c2_center))
        ws7.write(r, 4, '', f)
        ws7.set_row(r, 24)

    # =================================================================
    # TAB 8  ▸  Activity Equipment
    # =================================================================
    ws8 = workbook.add_worksheet('8. Activity Equipment')
    ws8.hide_gridlines(2)
    ws8.set_tab_color(TEAL)
    ws8.set_column('A:A', 32)
    ws8.set_column('B:B', 16)
    ws8.set_column('C:C', 16)
    ws8.set_column('D:D', 20)
    ws8.set_column('E:E', 28)
    ws8.set_column('F:F', 14)
    ws8.set_column('G:G', 35)

    ws8.set_row(0, 36)
    ws8.write('A1', '🎯  Activity-Specific Equipment', title_fmt)
    ws8.set_row(1, 20)
    ws8.write('A2', 'Quantities scale dynamically from Total Participants set in Tab 1.', subtitle_fmt)

    ws8.set_row(3, 28)
    ws8.merge_range('A4:G4', '  ACTIVITY EQUIPMENT (DYNAMIC QUANTITIES)', section_fmt)

    for ci, h in enumerate(['Item', 'Scaling Rule', 'Calc. Qty', 'Linked Activity', 'Assigned Role', 'Status', 'Notes']):
        ws8.write(4, ci, h, hdr)
    ws8.set_row(4, 26)

    act_eq = [
        ['Prop for earth shaking',    'Static', '1',                                    'Malachi',    'Session Coordinator'],
        ['Speaker',                    'Static', '1',                                    'Malachi',    'Logistics Lead'],
        ['Projector',                  'Static', '1',                                    'Malachi',    'Logistics Lead'],
        ['Downloaded Malachi video',   'Static', '1',                                    'Malachi',    'Session Coordinator'],
        ['Child & dad question cards', '1 per pair', "='1. Settings & Leaders'!$B$8",  'Stokbrood',  'Session Coordinator'],
        ['Stokbrood sticks',           '1 per person',"='1. Settings & Leaders'!$B$11", 'Stokbrood',  'Logistics Lead'],
        ['Tug of war rope',            'Static', '1',                                    'Tug of War', 'Activity Facilitator'],
        ['Communion cups',             '1 per person',"='1. Settings & Leaders'!$B$11", 'Communion',  'Communion Sub-Leader'],
        ['Claylatt',                   '1 per person',"='1. Settings & Leaders'!$B$11", 'Clay Latte', 'Activity Facilitator'],
        ['Clay — bag',                 'Static', '1',                                    'Clay Latte', 'Activity Facilitator'],
        ["Bivvy's (Shelter)",          'Total ÷ 2',  "=CEILING('1. Settings & Leaders'!$B$11/2,0.5)", 'Camp Setup', 'Logistics Lead'],
        ['Latte short (Shelter)',      '1 per person',"='1. Settings & Leaders'!$B$11", 'Camp Setup', 'Logistics Lead'],
        ['Latte long (Shelter)',       '1 per person',"='1. Settings & Leaders'!$B$11", 'Camp Setup', 'Logistics Lead'],
        ['Guy ropes (Shelter)',        '2 per person',"='1. Settings & Leaders'!$B$11*2",'Camp Setup', 'Logistics Lead'],
        ['Pegs (Shelter)',             '2 per person',"='1. Settings & Leaders'!$B$11*2",'Camp Setup', 'Logistics Lead']
    ]
    for i, eq in enumerate(act_eq):
        r = i + 5
        f = alt(i)
        ws8.write(r, 0, eq[0], f)
        ws8.write(r, 1, eq[1], readonly)
        if eq[1] == 'Static':
            ws8.write(r, 2, eq[2], calc_cell)
        else:
            ws8.write_formula(r, 2, eq[2], calc_cell)
        ws8.data_validation(r, 3, r, 3, {
            'validate': 'list',
            'source': "='3. Detailed Timetable'!$E$8:$E$40",
            'ignore_blank': True, 'show_error': False
        })
        ws8.write(r, 3, eq[3], make_cell(CREAM if i%2==0 else SAND, bold=True))
        ws8.data_validation(r, 4, r, 4, {
            'validate': 'list',
            'source': "='2. Roster & Roles'!$A$6:$A$25",
            'ignore_blank': True, 'show_error': False
        })
        ws8.write(r, 4, eq[4], make_cell(CREAM if i%2==0 else SAND, border_color=GOLD))
        ws8.data_validation(r, 5, r, 5, {
            'validate': 'list',
            'source': ['To Buy', 'Pending', 'Packed'],
            'ignore_blank': True
        })
        ws8.write(r, 5, 'To Buy', alt(i, c1_center, c2_center))
        ws8.write(r, 6, '', f)
        ws8.set_row(r, 24)

    # =================================================================
    # TAB 9  ▸  Food Shopping
    # =================================================================
    ws9 = workbook.add_worksheet('9. Food Shopping')
    ws9.hide_gridlines(2)
    ws9.set_tab_color(BURNT_ORN)
    ws9.set_column('A:A', 30)
    ws9.set_column('B:B', 22)
    ws9.set_column('C:C', 24)
    ws9.set_column('D:D', 14)
    ws9.set_column('E:E', 35)

    ws9.set_row(0, 36)
    ws9.write('A1', '🛒  Food & Catering Shopping List', title_fmt)
    ws9.set_row(1, 20)
    ws9.write('A2', 'Communal items only. Quantities auto-scale from Tab 1. Each family brings their own dinner & breakfast.', subtitle_fmt)

    ws9.set_row(3, 28)
    ws9.merge_range('A4:E4', '  COMMUNAL FOOD ITEMS', section_fmt)

    for ci, h in enumerate(['Item', 'Qty Needed', 'Assigned Role', 'Status', 'Notes']):
        ws9.write(4, ci, h, hdr)
    ws9.set_row(4, 26)

    food = [
        ['Dough for stokbrood',       "='1. Settings & Leaders'!$B$11&\" portions\"",       'Catering / Fire Lead'],
        ['Coffee Instant',             "=ROUNDUP('1. Settings & Leaders'!$B$11/20,0)&\" jars\"", 'Catering / Fire Lead'],
        ['Coffee Ground',              "=ROUNDUP('1. Settings & Leaders'!$B$11/40,0)&\" Kg\"",   'Catering / Fire Lead'],
        ['Long life milk',             "=ROUNDUP('1. Settings & Leaders'!$B$11*0.28,0)&\" L\"",  'Catering / Fire Lead'],
        ['Sugar',                      '1 kg',                                              'Catering / Fire Lead'],
        ['Rusks',                      "=ROUNDUP('1. Settings & Leaders'!$B$11/6,0)&\" boxes\"", 'Catering / Fire Lead'],
        ['Braai Brood (stokbrood)',    "=ROUNDUP('1. Settings & Leaders'!$B$11/7,0)&\" bags\"",  'Catering / Fire Lead'],
        ['Marshmallows',               "=ROUNDUP('1. Settings & Leaders'!$B$11/14,0)&\" × 300g pkts\"", 'Catering / Fire Lead'],
        ['Mieliemeal',                 '1 kg',                                              'Catering / Fire Lead'],
        ['Rooibos tea',                '1 box',                                             'Catering / Fire Lead'],
        ['Ceylon tea',                 '1 box',                                             'Catering / Fire Lead'],
        ['Hot chocolate',              "=ROUNDUP('1. Settings & Leaders'!$B$11/40,0)&\" × 500g pkts\"", 'Catering / Fire Lead'],
        ['Marie biscuits',             "=ROUNDUP('1. Settings & Leaders'!$B$11/10,0)&\" pkts\"", 'Catering / Fire Lead'],
        ['Tomato sauce',               '2 bottles',                                         'Catering / Fire Lead'],
        ['Syrup',                      '1 × 500g',                                          'Catering / Fire Lead'],
        ['Communion juice (Grape)',     "=ROUNDUP('1. Settings & Leaders'!$B$11/20,0)&\" L\"",   'Catering / Fire Lead'],
        ['Butro Butter',               '500g',                                              'Catering / Fire Lead'],
        ['Communion loaf',             '1 loaf',                                            'Communion Sub-Leader']
    ]
    for i, fd in enumerate(food):
        r = i + 5
        f = alt(i)
        ws9.write(r, 0, fd[0], f)
        if fd[1].startswith('='):
            ws9.write_formula(r, 1, fd[1], calc_cell)
        else:
            ws9.write(r, 1, fd[1], alt(i, c1_center, c2_center))
        ws9.data_validation(r, 2, r, 2, {
            'validate': 'list',
            'source': "='2. Roster & Roles'!$A$6:$A$25",
            'ignore_blank': True, 'show_error': False
        })
        ws9.write(r, 2, fd[2], make_cell(CREAM if i%2==0 else SAND, border_color=GOLD))
        ws9.data_validation(r, 3, r, 3, {
            'validate': 'list',
            'source': ['To Buy', 'Pending', 'Packed'],
            'ignore_blank': True
        })
        ws9.write(r, 3, 'To Buy', alt(i, c1_center, c2_center))
        ws9.write(r, 4, '', f)
        ws9.set_row(r, 26)

    # =================================================================
    # TAB 10  ▸  Activity Playbook (Includes Plan A & Plan B Weather)
    # =================================================================
    ws10 = workbook.add_worksheet('10. Activity Playbook')
    ws10.hide_gridlines(2)
    ws10.set_tab_color(FOREST)
    ws10.set_column('A:A', 22)
    ws10.set_column('B:B', 32)
    ws10.set_column('C:C', 55)
    ws10.set_column('D:D', 45)

    ws10.set_row(0, 36)
    ws10.write('A1', '📖  Activity Playbook & Weather Plan B', title_fmt)
    ws10.set_row(1, 20)
    ws10.write('A2', 'Detailed facilitator instructions, lead considerations, and Plan B weather contingencies for every activity.', subtitle_fmt)

    ws10.set_row(3, 28)
    ws10.merge_range('A4:D4', '  FACILITATOR GUIDE & WEATHER CONTINGENCIES', section_fmt)

    for ci, h in enumerate(['Activity', 'Goal / Objective', 'Plan A Instructions & Lead Considerations', 'Plan B Weather Contingency (If Rain / Storm)']):
        ws10.write(4, ci, h, hdr)
    ws10.set_row(4, 26)

    playbook = [
        ['Ice Breaker',
         'Break the initial tension and get everyone laughing and connecting.',
         'STEPS:\n1. Have children introduce their fathers to the group (and vice versa).\n2. Play a quick "Name Game" or "Two Truths and a Lie" (Camp Edition).\n\nLEAD CONSIDERATIONS:\n• Keep the energy high and fast-paced.\n• Ensure every single person feels seen and heard.',
         'RAIN PLAN B:\nMove activity under the main covered veranda or inside the dining hall. Use indoor circle games if space is limited.'],
        
        ['Clay Latte',
         'Draw fathers and children together through teamwork and physical connection.',
         'STEPS:\n1. Tie the dad and child together at ankles/wrists with guy rope.\n2. Set up obstacle course & dam swim (Lifeguards active on bank).\n3. Build clay structures together.\n\nLEAD CONSIDERATIONS:\n• Emphasise communication and moving as one unit.\n• Lifeguards MUST be stationed at dam edge before anyone enters water.',
         'RAIN PLAN B:\nCancel dam swim if lightning/heavy rain. Move clay building under covered veranda. Run an indoor tower-building challenge.'],
        
        ['Stokbrood',
         'Quality, guided conversational time in a relaxed setting.',
         'STEPS:\n1. Lay out maize meal, dough, stokke, syrup, marshmallows near fire.\n2. Hand out printed question cards to each pair.\n3. Dads and children cook stokbrood and discuss question cards.\n\nLEAD CONSIDERATIONS:\n• Keep fire well-stoked but safe.\n• Give families private space around fire.',
         'RAIN PLAN B:\nMove stokbrood cooking to gas stoves under covered gazebo / braai area. Move conversation cards indoors to main hall with hot chocolate.'],
        
        ['Skits & Debrief',
         'Lighthearted fun followed by grounding the day\'s experiences.',
         'STEPS:\n1. Allow 10-15 mins for groups to prepare a short funny skit.\n2. Present carving and summarize key takeaways from Saturday.\n\nLEAD CONSIDERATIONS:\n• Set a supportive, cheering tone.\n• Transition smoothly into reflective debrief.',
         'RAIN PLAN B:\nFully operable indoors inside main hall or large marquee.'],
        
        ['Malachi',
         'Spiritual reflection on restoration and the turning of hearts.',
         'STEPS:\n1. Show downloaded YouTube Malachi scripture video on projector/speaker.\n2. Sand Demo: Tray with shaking sand showing how things settle.\n\nLEAD CONSIDERATIONS:\n• Visually and emotionally impactful.\n• Test tech beforehand.',
         'RAIN PLAN B:\nFully operable indoors. Set up projector inside main hall/barn.'],
        
        ['Communion',
         'Spiritual reflection, forgiveness, and partaking in covenant together.',
         'STEPS:\n1. Provide grape juice and bread loaf to each pair.\n2. Read 1 Cor 11:23-26 or Col 3:12-14.\n3. Fathers pray a blessing over their children before taking elements.\n\nLEAD CONSIDERATIONS:\n• Create quiet, reverent atmosphere.\n• Soft instrumental music in background.',
         'RAIN PLAN B:\nAdminister inside main hall or under covered gazebo with soft lanterns/lighting.'],
        
        ['Quiet Time',
         'Personal reflection on Malachi session and Communion.',
         'STEPS:\n1. Fathers and children sit quietly together or reflect/journal.\n\nLEAD CONSIDERATIONS:\n• Clearly define time boundary (15 mins).\n• Keep camp quiet.',
         'RAIN PLAN B:\nFathers and children sit in quiet corners of covered veranda or hall.'],
        
        ['Manhood Talk',
         'Equipping fathers for journey ahead, while children have separate empowering session.',
         'STEPS:\n1. Split group: Dads in one area, children in another.\n2. Lead discussion with dads; Youth Track Leaders run children\'s session.\n\nLEAD CONSIDERATIONS:\n• Encourage vulnerability among dads.',
         'RAIN PLAN B:\nSplit into two separate indoor rooms / covered verandas.'],
        
        ['Tug of War',
         'A final burst of fun, competitive teamwork before departing.',
         'STEPS:\n1. Set up tug of war rope in clear flat area.\n2. Run heats: Dads vs Dads, Children vs Children, Mixed teams.\n3. Optional post-game dam swim (Lifeguards active).\n\nLEAD CONSIDERATIONS:\n• Safety first — check ground for slippery spots.\n• Lifeguards on bank if dam swim follows.',
         'RAIN PLAN B:\nIf light rain: Mud tug-of-war (huge fun!). If heavy rain/lightning: Cancel dam swim; move indoors for arm wrestling / team strength challenge inside hall.']
    ]
    for i, pb in enumerate(playbook):
        r = i + 5
        f = alt(i)
        ws10.data_validation(r, 0, r, 0, {
            'validate': 'list',
            'source': "='3. Detailed Timetable'!$E$8:$E$40",
            'ignore_blank': True, 'show_error': False
        })
        ws10.write(r, 0, pb[0], make_cell(CREAM if i%2==0 else SAND, bold=True, font_color=NAVY))
        ws10.write(r, 1, pb[1], f)
        ws10.write(r, 2, pb[2], f)
        ws10.write(r, 3, pb[3], make_cell(CREAM if i%2==0 else SAND, font_color=BURNT_ORN, italic=True))
        ws10.set_row(r, 140)

    # =================================================================
    # TAB 11  ▸  Post-Camp Debrief (NEW TAB)
    # =================================================================
    ws11 = workbook.add_worksheet('11. Post-Camp Debrief')
    ws11.hide_gridlines(2)
    ws11.set_tab_color(FOREST)
    ws11.set_column('A:A', 28)
    ws11.set_column('B:B', 18)
    ws11.set_column('C:C', 45)
    ws11.set_column('D:D', 45)

    ws11.set_row(0, 36)
    ws11.write('A1', '📝  Post-Camp Debrief & Review', title_fmt)
    ws11.set_row(1, 20)
    ws11.write('A2', 'Structure to review camp execution, leader feedback, and capture action items for the next event.', subtitle_fmt)

    # Section 1: Overall Camp Metrics
    ws11.set_row(3, 28)
    ws11.merge_range('A4:D4', '  1. OVERALL CAMP EVALUATION SUMMARY', section_fmt)
    
    ws11.write('A5', 'Evaluation Metric', hdr)
    ws11.write('B5', 'Score / Rating', hdr)
    ws11.write('C5', 'Key Successes & Highlights', hdr)
    ws11.write('D5', 'Key Challenges & Opportunities', hdr)
    ws11.set_row(4, 24)

    metrics = [
        ['Overall Camp Experience', '5 / 5', 'High engagement, strong spiritual connections made during Malachi session.', 'Timetable ran slightly behind by Saturday evening.'],
        ['Safety & Water Supervision', '5 / 5', 'Zero incidents. Lifeguard 1 & 2 maintained clear water boundary during dam swim.', 'Need extra throw rope at secondary swim spot.'],
        ['Logistics & Camp Setup', '4 / 5', 'Bivvies erected quickly; fire wood supply was plentiful.', 'Gas bottle fitting was tight; bring spare washer.'],
        ['Food & Catering', '5 / 5', 'Families enjoyed bringing their own meals; stokbrood was a highlight.', 'Suggest extra milk quantity for cold morning.'],
        ['Spiritual & Emotional Impact', '5 / 5', 'Communion and letter reading times were deeply moving for fathers and children.', 'Ensure 15 min buffer before quiet time.']
    ]
    for i, row in enumerate(metrics):
        r = i + 5
        f = alt(i)
        ws11.write(r, 0, row[0], make_cell(CREAM if i%2==0 else SAND, bold=True))
        ws11.write(r, 1, row[1], input_cell)
        ws11.write(r, 2, row[2], f)
        ws11.write(r, 3, row[3], f)
        ws11.set_row(r, 28)

    # Section 2: Action Items for Next Camp
    ws11.set_row(11, 28)
    ws11.merge_range('A12:D12', '  2. ACTION ITEMS FOR NEXT CAMP', section_fmt)
    
    ws11.write('A13', 'Action Item', hdr)
    ws11.write('B13', 'Priority', hdr)
    ws11.write('C13', 'Owner / Lead', hdr)
    ws11.write('D13', 'Target Completion Date', hdr)
    ws11.set_row(12, 24)

    actions = [
        ['Add laminating step for emergency hospital map in pre-camp checklist', 'High', 'Administration', '2 weeks before next camp'],
        ['Purchase additional 20m water throw rope for Lifeguard 2 kit', 'High', 'Lifeguard 1 (Water Safety Lead)', '1 month before next camp'],
        ['Update stokbrood question cards with 3 new son/daughter specific prompts', 'Medium', 'Session Coordinator', '3 weeks before next camp'],
        ['Create digital RSVP form to auto-feed participant names directly into Tab 1', 'Medium', 'Administration', 'Next camp launch date']
    ]
    for i, row in enumerate(actions):
        r = i + 13
        f = alt(i)
        ws11.write(r, 0, row[0], make_cell(CREAM if i%2==0 else SAND, bold=True))
        ws11.write(r, 1, row[1], make_cell(CREAM if i%2==0 else SAND, align='center', bold=True, font_color=BURNT_ORN if row[1]=='High' else TEAL))
        ws11.write(r, 2, row[2], f)
        ws11.write(r, 3, row[3], f)
        ws11.set_row(r, 28)

    # =================================================================
    workbook.close()

if __name__ == '__main__':
    build_spreadsheet('templates/operations/Kickoff_Camp_Operations_v14.xlsx')
    print("✅ Kickoff_Camp_Operations_v14.xlsx generated successfully.")
