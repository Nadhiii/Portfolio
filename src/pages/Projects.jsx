// src/components/Projects.jsx
import React from 'react';
import FadeUp from "../components/FadeUp";
import CodeModal from "../components/CodeModal";

const projects = [
  {
    id: 'automation',
    index: '01',
    title: 'Team-Wide Automation',
    tag: 'Internal Tool',
    description:
      'A Google Apps Script system that eliminated 45+ minutes of manual data entry per day across 10+ teams built before I knew what "engineering" meant.',
    problem:
      'Team leads were manually copying data between sheets every morning. 30+ minutes of copy-paste, every single day, across every team.',
    solution:
      'Wrote a scheduled Apps Script that pulls, syncs, and formats the data automatically. Runs overnight. Nobody touches it.',
    metrics: [
      { value: '10+', label: 'Teams adopted' },
      { value: '45 min', label: 'Saved daily' },
      { value: '100%', label: 'Adoption rate' },
    ],
    stack: ['Apps Script', 'JavaScript', 'Sheets API'],
    accentVar: '--color-brand-text',
    numberColor: 'text-brand-text',
    codeLanguage: 'javascript',
    code: `/**
 * REFRESH & TRANSFER DATA (V12.0 - SPACIOUS DASHBOARD)
 * --------------------------------------------------------------------------
 * INSTRUCTIONS: ONLY CHANGE SECTION [1].
 * DO NOT TOUCH SECTIONS [2] TO [5] - PROTECTED LOGIC.
 * --------------------------------------------------------------------------
 */
function extractAndTransferData() {

  // ========================================================================
  // [1] CONFIGURATION BLOCK - *** CHANGE THESE SETTINGS ONLY ***
  // ========================================================================

  const SUPERVISOR_NAME = "[Supervisor Name]";
  const TARGET_ID = "[TARGET_SHEET_ID]";

  // ========================================================================
  // [2] STRICTLY PROTECTED - SETTINGS & MAPPING
  // ========================================================================

  const SOURCE_ID = "[SOURCE_SHEET_ID]";
  const SOURCE_TAB_NAME = "Followup Raw Data";

  // Column Mappings for Source
  const COL = {
    CASE_ID: 0, DATE: 1, AGENT: 2, SUB_STATUS: 3, CATEGORY: 8, TYPE: 14
  };

  const today = new Date();
  if (today.getDay() === 0 || today.getDay() === 6) return;

  const timeZone = Session.getTimeZone();
  const formattedToday = Utilities.formatDate(today, timeZone, "dd-MM-yyyy");

  const sourceSheet = SpreadsheetApp.openById(SOURCE_ID).getSheetByName(SOURCE_TAB_NAME);
  const targetSS = SpreadsheetApp.openById(TARGET_ID);

  if (!sourceSheet) throw new Error("Source tab not found!");

  const data = sourceSheet.getDataRange().getValues();
  let todayList = [], missedList = [];

  // ========================================================================
  // [3] STRICTLY PROTECTED - DATA EXTRACTION
  // ========================================================================

  for (let i = 1; i < data.length; i++) {
    const row = data[i];

    // Filter by Supervisor Name
    if (String(row[COL.CATEGORY]).trim() === SUPERVISOR_NAME) {
      const type = String(row[COL.TYPE]).trim();
      const extractedRow = [
        row[COL.CASE_ID],
        row[COL.DATE],
        row[COL.AGENT],
        row[COL.SUB_STATUS]
      ];

      if (type === "Today's Followup") {
        todayList.push(extractedRow);
      } else if (["Missed Followup", "Wrong Date Format"].includes(type)) {
        missedList.push(extractedRow);
      }
    }
  }

  // ========================================================================
  // [4] STRICTLY PROTECTED - WRITING & SPACIOUS HORIZONTAL LAYOUT
  // ========================================================================

  let targetSheet = targetSS.getSheetByName(formattedToday) || targetSS.insertSheet(formattedToday);
  targetSheet.clear();

  const headers = ["CASE ID", "F/U DATE", "AGENT", "STATUS"];

  // Table 1: Today's (Starts Col A / 1)
  renderTable(targetSheet, 1, 1, "Today's Follow-up", todayList, "#E6F4EA", headers);

  // Table 2: Misses (Starts Col G / 7)
  renderTable(targetSheet, 1, 7, "Follow-up Misses", missedList, "#FCE8E6", headers);

  // Global Style
  targetSheet.getRange(1, 1, Math.max(todayList.length, missedList.length) + 5, 12)
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle")
    .setFontFamily("Google Sans")
    .setFontSize(10);

  // Spacer Columns (E, F) set to narrow width
  [5, 6].forEach(col => targetSheet.setColumnWidth(col, 25));

  // Auto-resize data columns
  [1, 2, 3, 4, 7, 8, 9, 10].forEach(col => targetSheet.autoResizeColumn(col));

  hideYesterday(targetSS, today);
}

// ========================================================================
// [5] STRICTLY PROTECTED - HELPER FUNCTIONS
// ========================================================================

function renderTable(sheet, startRow, startCol, title, data, bgColor, headers) {
  const numDataCols = headers.length;
  const totalWidth = numDataCols + 1; // Data + Checkbox

  // Title Row
  sheet.getRange(startRow, startCol, 1, totalWidth).merge()
    .setValue(title).setBackground(bgColor).setFontWeight("bold").setBorder(true, true, true, true, null, null);

  // Header Row
  sheet.getRange(startRow + 1, startCol, 1, numDataCols)
    .setValues([headers])
    .setFontWeight("bold").setBackground("#f3f3f3").setBorder(true, true, true, true, null, null);

  if (data.length > 0) {
    // Sort by Agent Name (Index 2)
    data.sort((a, b) => String(a[2]).localeCompare(String(b[2])));

    // Write Data
    sheet.getRange(startRow + 2, startCol, data.length, numDataCols)
      .setValues(data).setBorder(true, true, true, true, null, null);

    // Insert Checkboxes
    sheet.getRange(startRow + 2, startCol + numDataCols, data.length)
      .insertCheckboxes().setBorder(true, true, true, true, null, null);
  } else {
    sheet.getRange(startRow + 2, startCol, 1, totalWidth).merge()
      .setValue("No cases found").setFontStyle("italic").setBorder(true, true, true, true, null, null);
  }
}

function hideYesterday(ss, today) {
  const lookback = (today.getDay() === 1) ? 3 : 1;
  const lastWorkday = new Date(today);
  lastWorkday.setDate(today.getDate() - lastWorkday.getDay() === 1 ? today.getDate() - 3 : today.getDate() - 1);

  // Precise last workday calculation
  const prevDate = new Date(today);
  prevDate.setDate(today.getDate() - lookback);

  const name = Utilities.formatDate(prevDate, Session.getTimeZone(), "dd-MM-yyyy");
  const sheet = ss.getSheetByName(name);
  if (sheet) sheet.hideSheet();
}`,
  },
  {
    id: 'nexus',
    index: '02',
    title: 'Nexus',
    tag: 'Flutter · Firebase',
    description:
      'A personal finance app built in Flutter and Firebase because every app I tried either cost money, sold my data, or looked terrible.',
    problem:
      'Existing finance apps were too generic, too expensive, or too invasive. I needed something that tracked how I actually spend on fuel, EMIs, Groceries.',
    solution:
      'Built from scratch using Flutter with Provider state management and go_router. Firebase backend for auth and data sync. Custom UI with spring-physics animations, an EMI dot calendar, and a fuel log that tracks every fill-up on my motorcycle.',
    metrics: [
      { value: 'Daily', label: 'Personal use' },
      { value: 'Flutter', label: 'Framework' },
      { value: '0₹', label: 'Subscription cost' },
    ],
    stack: ['Flutter', 'Firebase', 'Dart', 'Provider', 'go_router'],
    accentVar: '--color-brand-orange',
    numberColor: 'text-brand-orange',
    link: { label: 'View Nexus', href: './nexus' },
  },
  {
    id: 'portfolio',
    index: '03',
    title: 'This Portfolio',
    tag: 'Vite · React · Framer Motion',
    description:
      'Built because every template I tried felt like someone else\'s portfolio. This one is mine.',
    problem:
      'Generic portfolio sites all look the same, same bento grid, same hero, same "I\'m a developer" headline. None of them say anything.',
    solution:
      'Rebuilt from scratch with Vite, React 19, Tailwind CSS, and Framer Motion. Brand token system, custom intro animation cycling through five languages, Matter.js physics pills in the skills card.',
    metrics: [
      { value: '5', label: 'Languages in intro' },
      { value: 'Matter.js', label: 'Physics sim' },
      { value: '0', label: 'Templates used' },
    ],
    stack: ['React 19', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Matter.js'],
    accentVar: '--color-brand-gold',
    numberColor: 'text-brand-gold',
  },
  {
    id: 'command-center',
    index: '04',
    title: 'Team Command Center',
    tag: 'Apps Script · Automation',
    description:
      'A dispatcher command center that replaced blind, manual case assignment with a data-driven workflow for a 20+ person operations team.',
    problem:
      'Cases were pushed to agents with no visibility into who already had bandwidth. Assignments were made blind, then reassigned mid-flight once the agent turned out to be overloaded.',
    solution:
      'Built an automated dispatch console with a live workload dashboard, duplicate-case detection, and a skill-based suggestion engine that scores agents by past experience against current active load. Every assignment auto-notifies the agent, logs to a master database, and resets the console for the next case.',
    metrics: [
      { value: '20+', label: 'Agents tracked' },
      { value: 'Real-time', label: 'Workload visibility' },
      { value: 'Auto', label: 'Agent suggestions' },
    ],
    stack: ['Google Apps Script', 'Sheets API', 'JavaScript'],
    accentVar: '--color-brand-text',
    numberColor: 'text-brand-text',
    codeLanguage: 'javascript',
    code: `// ============ HELPERS ============

function getDispatchHeaders(sheet) {
  const range = sheet.getDataRange();
  const values = range.getValues();
  for (let r = 0; r < values.length; r++) {
    const row = values[r];
    if (row.includes("Case ID")) {
      const headers = {};
      row.forEach((val, c) => {
        if (val) headers[val.toString().trim()] = c;
      });
      return { headerRowIndex: r, headers: headers };
    }
  }
  return null;
}

function getMasterDBHeaders(sheet) {
  const values = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const headers = {};
  values.forEach((val, c) => {
    if (val) headers[val.toString().trim()] = c;
  });
  return headers;
}

// Sanitized Roster
const AGENT_EMAILS = {
  "Agent Alpha": "agent.alpha@company.com",
  "Agent Beta": "agent.beta@company.com",
  "Agent Gamma": "agent.gamma@company.com",
  "Agent Delta": "agent.delta@company.com",
  "Agent Epsilon": "agent.epsilon@company.com",
  "Agent Zeta": "agent.zeta@company.com",
  "Agent Eta": "agent.eta@company.com",
  "Agent Theta": "agent.theta@company.com",
  "Agent Iota": "agent.iota@company.com",
  "Agent Kappa": "agent.kappa@company.com",
  "Agent Lambda": "agent.lambda@company.com",
  "Agent Mu": "agent.mu@company.com",
  "Agent Nu": "agent.nu@company.com",
  "Agent Xi": "agent.xi@company.com",
  "Agent Omicron": "agent.omicron@company.com",
  "Agent Pi": "agent.pi@company.com",
  "Agent Rho": "agent.rho@company.com",
  "Agent Sigma": "agent.sigma@company.com",
  "Agent Tau": "agent.tau@company.com",
  "Agent Upsilon": "agent.upsilon@company.com",
  "Agent Phi": "agent.phi@company.com",
  "Agent Chi": "agent.chi@company.com"
};

// ============ MAIN ASSIGNMENT FLOW ============

function processAssignment(e) {
  if (!e) return;

  const sheet = e.source.getActiveSheet();
  if (sheet.getName() !== "Dispatch Console") return;

  const headerInfo = getDispatchHeaders(sheet);
  if (!headerInfo) return;

  const headers = headerInfo.headers;
  const checkboxCol = headers["Assign & Notify"];
  const caseIdCol = headers["Case ID"];
  if (checkboxCol === undefined || caseIdCol === undefined) return;

  const editedCol = e.range.getColumn() - 1;
  const editedRow = e.range.getRow();

  if (editedCol === caseIdCol) {
    sheet.getRange(editedRow, caseIdCol + 1).setBackground(null);
    return;
  }

  if (editedCol !== checkboxCol || e.value !== "TRUE") return;
  if (editedRow === headerInfo.headerRowIndex + 1) return;

  const taskTypeCol = headers["Task Type"];
  const agentCol = headers["Assigned Agent"];
  const deadlineCol = headers["Deadline"];
  const suggestedCol = headers["Suggested Agent"];
  const typeCol = headers["Type"];
  const pocCol = headers["POC"];

  if (taskTypeCol === undefined || agentCol === undefined || deadlineCol === undefined) return;

  const rowValues = sheet.getRange(editedRow, 1, 1, sheet.getLastColumn()).getValues()[0];
  const caseId = rowValues[caseIdCol];
  const taskType = rowValues[taskTypeCol];
  const agentName = rowValues[agentCol];
  const deadline = sheet.getRange(editedRow, deadlineCol + 1).getDisplayValue();
  const typeValue = typeCol !== undefined ? rowValues[typeCol] : "";
  const pocValue = pocCol !== undefined ? sheet.getRange(editedRow, pocCol + 1).getDisplayValue() : "";

  if (!caseId || !agentName) {
    sheet.getRange(editedRow, checkboxCol + 1).setValue("FALSE");
    let missing = [];
    if (!caseId) missing.push("Case ID");
    if (!agentName) missing.push("Assigned Agent");
    e.source.toast(\`Missing required fields: \${missing.join(" & ")}\`, "Cannot Process Assignment", 6);
    return;
  }

  if (pocValue && pocValue.toString().includes("@")) {
    sheet.getRange(editedRow, checkboxCol + 1).setValue("FALSE");
    e.source.toast("The POC column cannot contain email addresses or '@' symbols. Please use names only.", "Invalid POC Data", 6);
    return;
  }

  const dbSheet = e.source.getSheetByName("Master Database");
  const dbHeaders = getMasterDBHeaders(dbSheet);
  const caseIdColDB = dbHeaders["Case ID"];

  let isDuplicate = false;
  if (caseIdColDB !== undefined && dbSheet.getLastRow() > 1) {
    const existingIds = dbSheet.getRange(2, caseIdColDB + 1, dbSheet.getLastRow() - 1, 1)
      .getValues().flat().map(v => v.toString().trim());
    isDuplicate = existingIds.includes(caseId.toString().trim());
  }

  if (isDuplicate) {
    sheet.getRange(editedRow, checkboxCol + 1).setValue("FALSE");
    sheet.getRange(editedRow, caseIdCol + 1).setBackground("#f4cccc");
    if (suggestedCol !== undefined) {
      sheet.getRange(editedRow, suggestedCol + 1).setValue("❌ Duplicate found — Case ID already exists.");
    }
    e.source.toast(\`Case ID "\${caseId}" already exists in Master Database.\`, "Duplicate Found", 6);
    return;
  }

  let dispatcherEmail = "";
  try {
    dispatcherEmail = Session.getActiveUser().getEmail() || "Unknown";
  } catch (err) {
    dispatcherEmail = "Unknown";
  }

  const currentStatus = "Assigned";
  const assignedDateObj = new Date();
  const assignedDateDisplay = Utilities.formatDate(assignedDateObj, Session.getScriptTimeZone(), "MM/dd/yyyy");

  const nextRow = dbSheet.getLastRow() + 1;
  function writeDB(fieldName, value) {
    if (dbHeaders[fieldName] !== undefined) {
      dbSheet.getRange(nextRow, dbHeaders[fieldName] + 1).setValue(value);
    }
  }
  writeDB("Case ID", caseId);
  writeDB("Task Type", taskType);
  writeDB("Assigned Agent", agentName);
  writeDB("Current Status", currentStatus);
  writeDB("Assigned Date", assignedDateObj);
  writeDB("Deadline", deadline);
  writeDB("Type", typeValue);
  writeDB("POC", pocValue);
  writeDB("Dispatcher", dispatcherEmail);

  const targetEmail = AGENT_EMAILS[agentName];
  if (targetEmail) {
    const subject = \`🚨 New Case Assigned: \${caseId}\`;
    const body = \`Hello \${agentName},\\n\\nYou have been assigned a new case.\\n\\n\`
      + \`Case ID: \${caseId}\\nTask Type: \${taskType}\\nType: \${typeValue}\\n\`
      + \`Assigned Date: \${assignedDateDisplay}\\nSLA Deadline: \${deadline}\\nPOC: \${pocValue}\\n\\n\`
      + \`Please check the Master Database and update your status accordingly.\`;

    let ccList = "management-cc@company.com";
    MailApp.sendEmail(targetEmail, subject, body, { cc: ccList });
  }

  sheet.getRange(editedRow, caseIdCol + 1).clearContent().setBackground(null);
  sheet.getRange(editedRow, taskTypeCol + 1).clearContent();
  sheet.getRange(editedRow, agentCol + 1).clearContent();
  sheet.getRange(editedRow, deadlineCol + 1).clearContent();
  if (typeCol !== undefined) sheet.getRange(editedRow, typeCol + 1).clearContent();
  if (pocCol !== undefined) sheet.getRange(editedRow, pocCol + 1).clearContent();
  sheet.getRange(editedRow, checkboxCol + 1).setValue("FALSE");
  if (suggestedCol !== undefined) {
    const cell = sheet.getRange(editedRow, suggestedCol + 1);
    cell.clearContent();
    cell.clearNote();
  }
}

// ============ SUGGESTION ENGINE ============

function suggestAgent(e) {
  if (!e) return;

  const sheet = e.source.getActiveSheet();
  if (sheet.getName() !== "Dispatch Console") return;

  const headerInfo = getDispatchHeaders(sheet);
  if (!headerInfo) return;

  const headers = headerInfo.headers;
  const taskTypeCol = headers["Task Type"];
  const suggestedCol = headers["Suggested Agent"];
  if (taskTypeCol === undefined || suggestedCol === undefined) return;

  const editedCol = e.range.getColumn() - 1;
  const editedRow = e.range.getRow();
  if (editedCol !== taskTypeCol) return;
  if (editedRow === headerInfo.headerRowIndex + 1) return;

  const taskType = e.value;
  const outputCell = sheet.getRange(editedRow, suggestedCol + 1);

  if (!taskType) {
    outputCell.clearContent();
    outputCell.clearNote();
    return;
  }

  const ss = e.source;
  const heatmap = ss.getSheetByName("Agent Heatmap");
  const workload = ss.getSheetByName("Workload Dashboard");
  if (!heatmap || !workload) return;

  const heatmapData = heatmap.getDataRange().getValues();
  const workloadData = workload.getDataRange().getValues();

  const heatmapHeaderRow = heatmapData[0];
  const colIndex = heatmapHeaderRow.findIndex(h => h.toString().trim() === taskType.toString().trim());

  if (colIndex === -1) {
    outputCell.setValue("No history for this task type yet.");
    outputCell.clearNote();
    return;
  }

  const workloadHeaderRow = workloadData[0];
  const agentColW = workloadHeaderRow.indexOf("Agent");
  const activeColW = workloadHeaderRow.indexOf("Active Cases");

  const activeMap = {};
  for (let i = 1; i < workloadData.length; i++) {
    activeMap[workloadData[i][agentColW]] = workloadData[i][activeColW];
  }

  const scores = [];
  for (let i = 1; i < heatmapData.length; i++) {
    const agent = heatmapData[i][0];
    const pastCount = heatmapData[i][colIndex] || 0;
    const activeCount = activeMap[agent] || 0;
    const score = (pastCount * 2) - (activeCount * 3);
    scores.push({ agent, pastCount, activeCount, score });
  }

  scores.sort((a, b) => b.score - a.score);
  const top3 = scores.slice(0, 3);

  const shortText = "Top picks: " + top3.map(s => s.agent).join(", ");
  const noteText = top3.map(s => \`\${s.agent} — \${s.pastCount} completed, \${s.activeCount} active\`).join("\\n");

  outputCell.setValue(shortText);
  outputCell.setNote(noteText);
  outputCell.setWrapStrategy(SpreadsheetApp.WrapStrategy.CLIP);
}

function resetDispatchRow() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Dispatch Console");
  const headerInfo = getDispatchHeaders(sheet);
  if (!headerInfo) return;

  const headers = headerInfo.headers;
  const dataRow = headerInfo.headerRowIndex + 2;

  const fieldsToClear = ["Case ID", "Task Type", "Assigned Agent", "Deadline", "Type", "POC"];
  fieldsToClear.forEach(f => {
    if (headers[f] !== undefined) {
      sheet.getRange(dataRow, headers[f] + 1).clearContent();
    }
  });

  if (headers["Case ID"] !== undefined) {
    sheet.getRange(dataRow, headers["Case ID"] + 1).setBackground(null);
  }
  if (headers["Assign & Notify"] !== undefined) {
    sheet.getRange(dataRow, headers["Assign & Notify"] + 1).setValue(false);
  }
  if (headers["Suggested Agent"] !== undefined) {
    const cell = sheet.getRange(dataRow, headers["Suggested Agent"] + 1);
    cell.clearContent();
    cell.clearNote();
  }

  ss.toast("Dispatch row cleared.", "Reset", 3);
}`,
  },
];

const ProjectCard = ({ project, index, onViewCode }) => (
  <FadeUp delay={index * 0.1}>
    <div className="group grid lg:grid-cols-12 gap-0 rounded-2xl bg-brand-surface border border-brand-border overflow-hidden hover:border-brand-orange/40 transition-colors duration-500">

      {/* Left: index, tag, metrics, stack */}
      <div className="lg:col-span-4 p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-brand-border">
        <div>
          {/* Index + tag row */}
          <div className="flex items-center justify-between mb-8">
            <span className={'font-mono text-4xl font-bold leading-none ' + project.numberColor}>
              {project.index}
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase text-brand-muted font-body border border-brand-border rounded-full px-3 py-1">
              {project.tag}
            </span>
          </div>

          {/* Metrics */}
          <div className="space-y-4 mb-8">
            {project.metrics.map((m) => (
              <div key={m.label} className="flex items-baseline justify-between border-b border-brand-border pb-3">
                <span className="text-xs tracking-widest uppercase text-brand-muted">{m.label}</span>
                <span className={'font-mono text-sm font-bold ' + project.numberColor}>{m.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stack pills */}
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-[10px] tracking-wider uppercase font-medium rounded-lg bg-brand-bg border border-brand-border text-brand-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Right: content */}
      <div className="lg:col-span-8 p-8 md:p-10 flex flex-col justify-between">
        <div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-text mb-4 group-hover:text-brand-orange transition-colors duration-300">
            {project.title}
          </h2>
          <p className="text-brand-muted text-base leading-relaxed mb-8 max-w-xl">
            {project.description}
          </p>

          {/* Problem / Solution */}
          <div className="space-y-5">
            <div className="flex gap-4">
              <div className="mt-2 w-px h-full min-h-[2rem] bg-brand-border flex-shrink-0" />
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-brand-muted mb-1">Problem</p>
                <p className="text-sm text-brand-muted leading-relaxed">{project.problem}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className={'mt-2 w-px h-full min-h-[2rem] flex-shrink-0 ' + project.numberColor.replace('text', 'bg')} />
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-brand-muted mb-1">What I built</p>
                <p className="text-sm text-brand-muted leading-relaxed">{project.solution}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Optional link + code buttons */}
        {(project.link || project.code) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {project.link && (
              <a
                href={project.link.href}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-brand-border text-brand-muted text-sm font-medium hover:border-brand-orange hover:text-brand-orange transition-all duration-200 group/link"
              >
                {project.link.label}
                <span className="translate-x-0 group-hover/link:translate-x-1 transition-transform duration-200">→</span>
              </a>
            )}
            {project.code && (
              <button
                onClick={() => onViewCode(project)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-brand-border text-brand-muted text-sm font-medium hover:border-brand-orange hover:text-brand-orange transition-all duration-200"
              >
                View Code
                <span className="font-mono text-xs">{'</>'}</span>
              </button>
            )}
          </div>
        )}
      </div>

    </div>
  </FadeUp>
);

const Projects = () => {
  const [activeCodeProject, setActiveCodeProject] = React.useState(null);

  return (
    <section id="projects" className="relative py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <FadeUp>
          <div className="flex items-end justify-between mb-16 pb-6 border-b border-brand-border">
            <div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-brand-text leading-tight">
                Things I've Built
              </h2>
            </div>
            <span className="font-mono text-xs text-brand-muted hidden md:block">
              {String(projects.length).padStart(2, '0')} projects
            </span>
          </div>
        </FadeUp>

        {/* Project cards */}
        <div className="space-y-6">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onViewCode={setActiveCodeProject}
            />
          ))}
        </div>

        {/* Footer CTA */}
        <FadeUp delay={0.3}>
          <div className="mt-16 pt-8 border-t border-brand-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <p className="text-brand-muted text-sm leading-relaxed max-w-none sm:max-w-3xl lg:whitespace-nowrap">
              These are personal and internal builds. Client work lives under NDA, but I am happy to walk through my personal projects on a call.
            </p>
            <a
              href="mailto:mahanadhip@gmail.com"
              className="flex-shrink-0 px-6 py-3 rounded-xl bg-brand-orange text-brand-bg font-semibold text-sm hover:brightness-110 active:scale-95 transition-all duration-200"
            >
              Let's Talk
            </a>
          </div>
        </FadeUp>

      </div>

      {/* Code viewer modal */}
      <CodeModal
        isOpen={!!activeCodeProject}
        onClose={() => setActiveCodeProject(null)}
        title={activeCodeProject ? activeCodeProject.title + ' · Source' : ''}
        code={activeCodeProject ? activeCodeProject.code : ''}
        language={activeCodeProject ? activeCodeProject.codeLanguage || 'javascript' : 'javascript'}
      />
    </section>
  );
};

export default Projects;
