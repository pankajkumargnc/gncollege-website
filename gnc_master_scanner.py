import os
import re
import json
from datetime import datetime

# --- Terminal Colors ---
GREEN = '\033[92m'
BLUE = '\033[94m'
YELLOW = '\033[93m'
RED = '\033[91m'
RESET = '\033[0m'

print(f"{BLUE}======================================================{RESET}")
print(f"{BLUE}🌟 GNC COLLEGE - ULTIMATE MASTER SCANNER 🌟{RESET}")
print(f"{BLUE}======================================================{RESET}\n")

# --- Config ---
IGNORE_DIRS = ['node_modules', '.git', 'dist', 'build', 'public', 'assets']
VALID_EXTENSIONS = ['.jsx', '.js', '.json', '.html', '.css']
ENTRY_FILES = ['main.jsx', 'index.jsx', 'App.jsx', 'firebase.js']

# --- Data Stores ---
stats = {'files': 0, 'lines': 0}
tech_stack = {}
all_files_list = []
all_imports_set = set()

project_data = {'configs': [], 'pages': [], 'components': []}
reports = {'security': [], 'todos': [], 'heavy_files': [], 'dead_files': [], 'mermaid_edges': []}

# --- Helper: Guess File Purpose ---
def guess_purpose(content, filepath):
    content_lower = content.lower()
    if 'package.json' in filepath: return "Project dependencies and scripts registry."
    if 'vite.config' in filepath: return "Vite bundler configuration."
    if 'firebase' in filepath and 'initializeApp' in content: return "Firebase database and auth config."
    if '<route' in content_lower or 'createrouter' in content_lower: return "Handles application routing."
    if 'jodit' in content_lower: return "Rich Text Editor (CMS) functionality."
    if 'pdfmodal' in content_lower: return "PDF viewing and rendering module."
    if 'doc(db,' in content or 'collection(db,' in content: return "Firebase Firestore Data (Reads/Writes)."
    if 'props' in content_lower or 'className=' in content: return "UI Component rendering."
    return "Utility or Helper logic."

# --- 1. Read Package.json ---
def analyze_package_json():
    if os.path.exists('package.json'):
        try:
            with open('package.json', 'r', encoding='utf-8') as f:
                data = json.load(f)
                global tech_stack
                tech_stack = {**data.get('dependencies', {}), **data.get('devDependencies', {})}
        except: pass

# --- 2. Main Code Scanner ---
def scan_codebase():
    print(f"{YELLOW}🔍 Scanning full project architecture & security...{RESET}")
    for root, dirs, files in os.walk('.'):
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]
        
        for file in files:
            ext = os.path.splitext(file)[1]
            if ext not in VALID_EXTENSIONS: continue
                
            filepath = os.path.join(root, file)
            file_no_ext = os.path.splitext(file)[0]
            stats['files'] += 1
            if ext in ['.jsx', '.js']: all_files_list.append(file_no_ext)
            
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                    lines = content.split('\n')
                    line_count = len(lines)
                    stats['lines'] += line_count
                    
                    # File Purpose & Categorization
                    imports = re.findall(r"import\s+.*?\s+from\s+['\"](.*?)['\"]", content)
                    local_imports = [imp.split('/')[-1] for imp in imports if imp.startswith('.')]
                    
                    file_info = {
                        'name': file, 'path': filepath.replace('.\\', ''),
                        'lines': line_count, 'imports': local_imports,
                        'purpose': guess_purpose(content, filepath)
                    }
                    
                    if 'pages' in root.lower() or 'page' in file.lower(): project_data['pages'].append(file_info)
                    elif 'components' in root.lower(): project_data['components'].append(file_info)
                    elif file in ['package.json', 'vite.config.js', 'firebase.js', 'index.html']: project_data['configs'].append(file_info)

                    # Pro Scanning (Security, Heavy Files, TODOs)
                    if ext in ['.jsx', '.js']:
                        if line_count > 800:
                            reports['heavy_files'].append({'file': file, 'lines': line_count})
                        
                        for line_num, line in enumerate(lines, 1):
                            if 'AIzaSy' in line: reports['security'].append({'file': file, 'line': line_num, 'issue': 'Exposed Firebase Key'})
                            if 'api.imgbb.com' in line and 'key=' in line and '${' not in line: reports['security'].append({'file': file, 'line': line_num, 'issue': 'Hardcoded ImgBB Key'})
                            if 'TODO:' in line.upper() or 'FIXME:' in line.upper(): reports['todos'].append({'file': file, 'line': line_num, 'type': 'TODO'})
                            if 'console.log' in line and '//' not in line.split('console.log')[0]: reports['todos'].append({'file': file, 'line': line_num, 'type': 'Console Log'})
                            
                            imp_match = re.search(r"import\s+.*?\s+from\s+['\"](.*?)['\"]", line)
                            if imp_match and imp_match.group(1).startswith('.'):
                                imp_name = imp_match.group(1).split('/')[-1]
                                all_imports_set.add(imp_name)
                                if len(reports['mermaid_edges']) < 80: reports['mermaid_edges'].append(f"{file_no_ext} --> {imp_name}")
            except: pass

    # Find Dead Files
    for file in all_files_list:
        if file not in all_imports_set and file not in [os.path.splitext(e)[0] for e in ENTRY_FILES]:
            reports['dead_files'].append(file)

# --- 3. Generate Master HTML Report ---
def generate_html():
    print(f"{YELLOW}📄 Generating Master HTML Report...{RESET}")
    
    def render_table(items):
        html = "<table><thead><tr><th>File</th><th>Purpose</th><th>Internal Links</th><th>Size</th></tr></thead><tbody>"
        for item in sorted(items, key=lambda x: x['name']):
            deps = "<br>".join([f"↳ {imp}" for imp in item['imports'][:3]])
            if len(item['imports']) > 3: deps += f"<br><em>+{len(item['imports'])-3} more...</em>"
            html += f"<tr><td><b>{item['name']}</b><br><span style='font-size:11px;color:#64748b;'>{item['path']}</span></td><td>{item['purpose']}</td><td>{deps or '-'}</td><td>{item['lines']} lines</td></tr>"
        return html + "</tbody></table>"

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GNC Master Architecture & Audit Report</title>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800;900&display=swap" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
    <script>mermaid.initialize({{startOnLoad:true}});</script>
    <style>
        :root {{ --navy: #0f2347; --gold: #f4a023; --red: #ef4444; --green: #10b981; --bg: #f8fafc; --border: #e2e8f0; }}
        body {{ font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg); color: #334155; margin: 0; padding: 40px 20px; }}
        .container {{ max-width: 1100px; margin: 0 auto; background: #fff; padding: 40px 50px; border-radius: 16px; box-shadow: 0 10px 30px rgba(15,35,71,0.05); border: 1px solid var(--border); }}
        h1 {{ color: var(--navy); font-weight: 900; font-size: 32px; text-align: center; margin-bottom: 5px; }}
        .subtitle {{ text-align: center; color: #64748b; font-weight: 600; margin-bottom: 40px; }}
        .grid-3 {{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px; }}
        .stat-card {{ background: #f0f4f8; padding: 20px; border-radius: 12px; text-align: center; border: 1px solid var(--border); }}
        .stat-card h3 {{ margin: 0; font-size: 36px; color: var(--navy); font-weight: 900; }}
        .stat-card p {{ margin: 5px 0 0; color: #64748b; font-weight: 700; text-transform: uppercase; font-size: 12px; }}
        h2 {{ color: var(--navy); border-bottom: 3px solid var(--gold); padding-bottom: 10px; margin-top: 50px; }}
        .alert-box {{ background: #fef2f2; border: 1px solid #fca5a5; padding: 15px; border-radius: 10px; margin-bottom: 15px; }}
        .alert-box.green {{ background: #f0fdf4; border-color: #bbf7d0; }}
        .alert-box.yellow {{ background: #fffbeb; border-color: #fde68a; }}
        .suggestion-box {{ background: #f0f9ff; border-left: 5px solid #0ea5e9; padding: 20px; border-radius: 8px; margin-top: 15px; }}
        table {{ width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 14px; }}
        th, td {{ padding: 12px; text-align: left; border-bottom: 1px solid var(--border); }}
        th {{ background: var(--navy); color: #fff; font-weight: 700; text-transform: uppercase; font-size: 12px; }}
        tr:hover {{ background: #f8fafc; }}
        .tech-tags {{ display: flex; flex-wrap: wrap; gap: 8px; }}
        .tech-tag {{ background: #e0f2fe; color: #0369a1; padding: 5px 12px; border-radius: 20px; font-size: 13px; font-weight: 700; border: 1px solid #bae6fd; }}
        .mermaid {{ background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid var(--border); text-align: center; overflow-x: auto; }}
        .print-btn {{ display: block; margin: 0 auto 30px; background: var(--navy); color: #fff; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 800; cursor: pointer; }}
        @media print {{ .print-btn {{ display: none; }} body {{ padding: 0; background: #fff; }} .container {{ box-shadow: none; border: none; }} }}
    </style>
</head>
<body>
    <button class="print-btn" onclick="window.print()">🖨️ Print Master Report</button>
    <div class="container">
        <h1>GNC Master Architecture & Audit Report</h1>
        <div class="subtitle">Complete Project Documentation & Diagnostics — {datetime.now().strftime("%d %b %Y, %I:%M %p")}</div>
        
        <div class="grid-3">
            <div class="stat-card"><h3>{stats['files']}</h3><p>Total Files Analyzed</p></div>
            <div class="stat-card"><h3>{stats['lines']:,}</h3><p>Lines of Code (LOC)</p></div>
            <div class="stat-card"><h3>{len(tech_stack)}</h3><p>Dependencies Installed</p></div>
        </div>

        <h2>📦 Tech Stack & Libraries</h2>
        <div class="tech-tags">
            {"".join([f'<span class="tech-tag">{k}</span>' for k in tech_stack.keys()]) if tech_stack else '<p>No package.json found.</p>'}
        </div>

        <h2>🔐 Security Check</h2>
        """
    if reports['security']:
        for sec in reports['security']: html += f"""<div class="alert-box"><strong style="color:var(--red)">⚠️ {sec['issue']}</strong><br>Found in <b>{sec['file']}</b> (Line {sec['line']})</div>"""
    else: html += """<div class="alert-box green"><strong style="color:var(--green)">✅ Excellent! No exposed API keys found.</strong></div>"""

    html += """<h2>🗑️ Dead Files (Unused Code)</h2>"""
    if reports['dead_files']:
        html += f"""<div class="alert-box yellow"><strong style="color:#d97706">🧹 These files are not imported anywhere. Consider deleting them to save space:</strong><br><br>{", ".join([f"<code>{f}.jsx</code>" for f in reports['dead_files']])}</div>"""
    else: html += """<div class="alert-box green"><strong style="color:var(--green)">✅ Very Clean! No unused files detected.</strong></div>"""

    # --- HEAVY FILES & SPLITTING SUGGESTIONS ---
    html += """<h2>⚖️ Heavy Files & Code Splitting Guide</h2>"""
    if reports['heavy_files']:
        html += """<table><thead><tr><th>File Name</th><th>Lines of Code</th><th>Status</th></tr></thead><tbody>"""
        for hf in sorted(reports['heavy_files'], key=lambda x: x['lines'], reverse=True):
            html += f"<tr><td><b>{hf['file']}</b></td><td>{hf['lines']} lines</td><td>🔴 Needs Splitting</td></tr>"
        html += "</tbody></table>"
        
        # ✅ THE SUGGESTION ADDED DIRECTLY TO THE HTML
        html += """
        <div class="suggestion-box">
            <h3 style="margin-top:0; color:#0369a1;">🛠️ CTO Suggestion: How to Split Large Files (Like AdminPanel.jsx)</h3>
            <p>If a file crosses 800-1000 lines, it becomes hard to manage. Here is the Step-by-Step strategy to split it:</p>
            <ol>
                <li><strong>Create Sub-Folders:</strong> Create a folder like <code>src/components/admin/</code>.</li>
                <li><strong>Extract Tabs into Components:</strong> Cut the code for specific tabs (e.g., Notices, Alerts) and paste them into separate files like <code>AdminNoticesTab.jsx</code> and <code>AdminAlertsTab.jsx</code>.</li>
                <li><strong>Pass Props:</strong> If the child tab needs data (like <code>notices</code> array), pass it as a prop from the main AdminPanel: <code>&lt;AdminNoticesTab data={notices} /&gt;</code>.</li>
                <li><strong>Implement Lazy Loading:</strong> Inside AdminPanel.jsx, import them using <code>React.lazy()</code> so they only load when the user clicks on that tab, making the initial load lightning fast!
                <br><br><code>const AdminNoticesTab = lazy(() => import('./admin/AdminNoticesTab'));</code></li>
            </ol>
        </div>
        """
    else: html += """<div class="alert-box green"><strong style="color:var(--green)">✅ All files are well-sized and optimized!</strong></div>"""

    # --- ARCHITECTURE TABLES ---
    html += "<h2>⚙️ Configuration Files</h2>" + render_table(project_data['configs'])
    html += "<h2>📄 Frontend Pages</h2>" + render_table(project_data['pages'])
    html += "<h2>🧩 Reusable Components</h2>" + render_table(project_data['components'])

    # --- MERMAID GRAPH ---
    html += """<h2>🕸️ Visual Dependency Graph</h2>"""
    if reports['mermaid_edges']:
        html += "<div class='mermaid'>\ngraph TD\n" + "".join([f"    {edge}\n" for edge in reports['mermaid_edges']]) + "</div>"

    html += """</div></body></html>"""
    
    with open('GNC_Master_Report.html', 'w', encoding='utf-8') as f: f.write(html)
    print(f"{GREEN}✅ [SUCCESS] Master Report saved as 'GNC_Master_Report.html'{RESET}")

if __name__ == "__main__":
    analyze_package_json()
    scan_codebase()
    generate_html()
    print(f"\n{BLUE}🚀 Run Complete! Open 'GNC_Master_Report.html' to print your full Project Documentation.{RESET}")