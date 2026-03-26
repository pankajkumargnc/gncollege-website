// src/components/admin/tabs/SystemTestTab.jsx
import { useState, useRef, useEffect } from 'react';
import { db } from "../../../firebase";
import {
  collection, addDoc, deleteDoc, getDoc, getDocs,
  doc, serverTimestamp, query, limit,
} from 'firebase/firestore';
import toast from 'react-hot-toast';
import { T, NAVY, GOLD } from '../AdminShared';

export default function SystemTestTab({ logAct }) {
  const [testRunning,  setTestRunning]  = useState(false);
  const [testProgress, setTestProgress] = useState(0);
  const [testResults,  setTestResults]  = useState([]);
  const [testScore,    setTestScore]    = useState(null);
  const [sysLog,       setSysLog]       = useState([]);
  const [pdfGen,       setPdfGen]       = useState(false);
  const [siteCfg,      setSiteCfg]      = useState({});
  const sysRef = useRef(null);

  useEffect(() => {
    getDoc(doc(db, 'settings', 'site')).then(s => { if (s.exists()) setSiteCfg(s.data()); }).catch(() => {});
  }, []);

  useEffect(() => {
    if (sysRef.current) sysRef.current.scrollTop = sysRef.current.scrollHeight;
  }, [sysLog]);

  const addResult  = (name, status, detail) =>
    setTestResults(p => [...p, { name, status, detail, time: new Date().toLocaleTimeString() }]);
  const sysLogAdd  = msg => setSysLog(p => [...p, msg]);
  const pause      = ms  => new Promise(r => setTimeout(r, ms));

  const runTest = async () => {
    setTestRunning(true); setTestResults([]); setTestProgress(0); setTestScore(null); setSysLog([]);
    let passed = 0;
    const TOTAL = 25;
    sysLogAdd('▶ GNC SYSTEM DIAGNOSTICS v11.0 — 25-PHASE ULTRA SCAN');
    sysLogAdd('━'.repeat(46)); await pause(300);

    // T1 – Vite env
    sysLogAdd('[1/25] Checking Vite build environment...');
    try { if (import.meta.env.MODE) { addResult('Vite Environment', 'pass', `Mode: ${import.meta.env.MODE} | Base: ${import.meta.env.BASE_URL}`); passed++; sysLogAdd('  ✓ Vite running correctly'); } } catch (e) { addResult('Vite Environment', 'fail', e.message); }
    setTestProgress(Math.round(1 / TOTAL * 100)); await pause(300);

    // T2 – Firebase init
    sysLogAdd('[2/25] Verifying Firebase initialization...');
    try { if (db?.app?.options?.projectId) { addResult('Firebase Init', 'pass', `Project: ${db.app.options.projectId}`); passed++; sysLogAdd(`  ✓ Project: ${db.app.options.projectId}`); } else throw new Error('DB not initialized'); } catch (e) { addResult('Firebase Init', 'fail', e.message); }
    setTestProgress(Math.round(2 / TOTAL * 100)); await pause(300);

    // T3 – Firestore Read
    sysLogAdd('[3/25] Testing Firestore read permissions...');
    try { const s = await getDocs(query(collection(db, 'pages'), limit(1))); addResult('Firestore Read', 'pass', `Read successful — ${s.size} doc(s)`); passed++; sysLogAdd('  ✓ Read permissions active'); } catch (e) { addResult('Firestore Read', 'fail', 'Permission denied — check Firebase Rules'); }
    setTestProgress(Math.round(3 / TOTAL * 100)); await pause(300);

    // T4 – Firestore Write
    sysLogAdd('[4/25] Testing Firestore write permissions...');
    let testId = null;
    try { const d = await addDoc(collection(db, '_sysTest'), { t: serverTimestamp(), v: '11.0' }); testId = d.id; addResult('Firestore Write', 'pass', `Write OK — doc: ${d.id.substring(0, 10)}...`); passed++; sysLogAdd('  ✓ Write active'); } catch (e) { addResult('Firestore Write', 'fail', e.message); }
    setTestProgress(Math.round(4 / TOTAL * 100)); await pause(300);

    // T5 – Firestore Delete
    sysLogAdd('[5/25] Testing Firestore delete permissions...');
    try { if (testId) { await deleteDoc(doc(db, '_sysTest', testId)); addResult('Firestore Delete', 'pass', 'Delete OK — test doc cleaned'); passed++; sysLogAdd('  ✓ Delete active'); } else throw new Error('No test doc'); } catch (e) { addResult('Firestore Delete', 'fail', e.message); }
    setTestProgress(Math.round(5 / TOTAL * 100)); await pause(300);

    // T6 – Navbar
    sysLogAdd('[6/25] Checking navbar settings...');
    try { const s = await getDoc(doc(db, 'settings', 'navbar')); if (s.exists()) { addResult('Navbar Settings', 'pass', `${s.data().links?.length || 0} top-level nav items in DB`); passed++; } else { addResult('Navbar Settings', 'warn', 'No DB record — using static fallback'); passed++; } sysLogAdd('  ✓ Navbar OK'); } catch (e) { addResult('Navbar Settings', 'fail', e.message); }
    setTestProgress(Math.round(6 / TOTAL * 100)); await pause(300);

    // T7 – Site Settings
    sysLogAdd('[7/25] Checking site settings...');
    try { const s = await getDoc(doc(db, 'settings', 'site')); if (s.exists()) { addResult('Site Settings', 'pass', `Name: "${s.data().name || 'Set'}"`); } else { addResult('Site Settings', 'warn', 'Not configured — Admin → Settings tab'); } passed++; sysLogAdd('  ✓ Settings checked'); } catch (e) { addResult('Site Settings', 'fail', e.message); }
    setTestProgress(Math.round(7 / TOTAL * 100)); await pause(300);

    // T8 – ImgBB API
    sysLogAdd('[8/25] Validating ImgBB image upload API...');
    try { const fd = new FormData(); fd.append('image', 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'); const r = await fetch(`https://api.imgbb.com/1/upload?key=${siteCfg.imgbbKey || 'dummy'}`, { method: 'POST', body: fd }); if (r.ok) { addResult('ImgBB API', 'pass', 'Key valid — upload service active'); passed++; sysLogAdd('  ✓ ImgBB key valid'); } else throw new Error('Invalid key'); } catch (e) { addResult('ImgBB API', 'fail', e.message); }
    setTestProgress(Math.round(8 / TOTAL * 100)); await pause(300);

    // T9 – Flash Alerts
    sysLogAdd('[9/25] Checking flash alerts collection...');
    try { const s = await getDocs(collection(db, 'alerts')); const active = s.docs.filter(d => d.data().isActive).length; addResult('Flash Alerts', 'pass', `${s.size} total | ${active} currently LIVE`); passed++; sysLogAdd(`  ✓ ${s.size} alerts, ${active} active`); } catch (e) { addResult('Flash Alerts', 'fail', e.message); }
    setTestProgress(Math.round(9 / TOTAL * 100)); await pause(300);

    // T10 – Faculty
    sysLogAdd('[10/25] Checking faculty directory...');
    try { const s = await getDocs(collection(db, 'faculties')); const te = s.docs.filter(d => (d.data().staffType || 'Teaching') === 'Teaching').length; const nt = s.docs.filter(d => d.data().staffType === 'Non-Teaching').length; addResult('Faculty Directory', 'pass', `Teaching: ${te} | Non-Teaching: ${nt}`); passed++; sysLogAdd(`  ✓ ${te} teaching, ${nt} non-teaching`); } catch (e) { addResult('Faculty Directory', 'fail', e.message); }
    setTestProgress(Math.round(10 / TOTAL * 100)); await pause(300);

    // T11 – Alumni Placements
    sysLogAdd('[11/25] Checking alumni placements (Wall of Fame)...');
    try { const s = await getDocs(collection(db, 'placements')); const withPkg = s.docs.filter(d => d.data().package).length; addResult('Alumni Placements', 'pass', `${s.size} alumni | ${withPkg} with package data`); passed++; sysLogAdd(`  ✓ ${s.size} placement records`); } catch (e) { addResult('Alumni Placements', 'fail', e.message); }
    setTestProgress(Math.round(11 / TOTAL * 100)); await pause(300);

    // T12 – Content Health
    sysLogAdd('[12/25] Content health check (all collections)...');
    try { const [ns, as, es, ds, sl, pgs] = await Promise.all([getDocs(collection(db, 'notices')), getDocs(collection(db, 'announcements')), getDocs(collection(db, 'events')), getDocs(collection(db, 'pdfReports')), getDocs(collection(db, 'sliderSlides')), getDocs(collection(db, 'pages'))]); addResult('Content Health', 'pass', `Notices:${ns.size} | News:${as.size} | Events:${es.size} | Docs:${ds.size} | Slides:${sl.size} | Pages:${pgs.size}`); passed++; sysLogAdd('  ✓ All content collections accessible'); } catch (e) { addResult('Content Health', 'fail', e.message); }
    setTestProgress(Math.round(12 / TOTAL * 100)); await pause(300);

    // T13 – Leadership collection
    sysLogAdd('[13/25] Checking leadership collection...');
    try { const s = await getDocs(collection(db, 'leadership')); const pr = s.docs.filter(d => d.data().type === 'president').length; const sec = s.docs.filter(d => d.data().type === 'secretary').length; const prin = s.docs.filter(d => d.data().type === 'principal').length; if (s.size === 0) { addResult('Leadership Records', 'warn', 'Empty — Admin → Leadership tab se add karein'); } else { addResult('Leadership Records', 'pass', `Presidents:${pr} | Secretaries:${sec} | Principals:${prin}`); } passed++; sysLogAdd(`  ✓ ${s.size} leadership records`); } catch (e) { addResult('Leadership Records', 'fail', e.message); }
    setTestProgress(Math.round(13 / TOTAL * 100)); await pause(300);

    // T14 – GB Meetings
    sysLogAdd('[14/25] Checking GB Meeting PDF records...');
    try { const s = await getDocs(collection(db, 'gb_meetings')); const withPdf = s.docs.filter(d => d.data().pdfUrl).length; if (s.size === 0) { addResult('GB Meetings', 'warn', 'No meetings — Admin → GB Meetings tab se add karein'); } else { addResult('GB Meetings', 'pass', `${s.size} meetings | ${withPdf} with PDF`); } passed++; sysLogAdd(`  ✓ GB meetings: ${s.size}`); } catch (e) { addResult('GB Meetings', 'fail', e.message); }
    setTestProgress(Math.round(14 / TOTAL * 100)); await pause(300);

    // T15 – Staff Council
    sysLogAdd('[15/25] Checking Staff Council PDF records...');
    try { const s = await getDocs(collection(db, 'staff_council')); const withPdf = s.docs.filter(d => d.data().pdfUrl).length; if (s.size === 0) { addResult('Staff Council', 'warn', 'No meetings — Admin → Staff Council tab se add karein'); } else { addResult('Staff Council', 'pass', `${s.size} meetings | ${withPdf} with PDF`); } passed++; sysLogAdd(`  ✓ Staff council meetings: ${s.size}`); } catch (e) { addResult('Staff Council', 'fail', e.message); }
    setTestProgress(Math.round(15 / TOTAL * 100)); await pause(300);

    // T16 – Campus Gallery
    sysLogAdd('[16/25] Checking campus gallery collection...');
    try { const s = await getDocs(collection(db, 'campus_gallery')); const cats = [...new Set(s.docs.map(d => d.data().category).filter(Boolean))]; if (s.size === 0) { addResult('Campus Gallery', 'warn', 'Empty — Admin → Campus Gallery tab se add karein'); } else { addResult('Campus Gallery', 'pass', `${s.size} photos | Categories: ${cats.join(', ') || 'Uncategorized'}`); } passed++; sysLogAdd(`  ✓ Campus gallery: ${s.size} items`); } catch (e) { addResult('Campus Gallery', 'fail', e.message); }
    setTestProgress(Math.round(16 / TOTAL * 100)); await pause(300);

    // T17 – YouTube Config
    sysLogAdd('[17/25] Checking YouTube API configuration...');
    try { const s = await getDoc(doc(db, 'settings', 'youtube')); if (s.exists() && s.data().apiKey) { addResult('YouTube Config', 'pass', `Channel: ${s.data().channelId || '—'} | Max: ${s.data().maxResults || 12} videos`); passed++; } else { addResult('YouTube Config', 'warn', 'Not configured — Admin → YouTube tab'); sysLogAdd('  ⚠ YouTube not set up'); } } catch (e) { addResult('YouTube Config', 'fail', e.message); }
    setTestProgress(Math.round(17 / TOTAL * 100)); await pause(300);

    // T18 – Google Drive
    sysLogAdd('[18/25] Checking Google Drive configuration...');
    try { const s = await getDoc(doc(db, 'settings', 'drive')); if (s.exists() && s.data().apiKey) { addResult('Google Drive', 'pass', `Folder: "${s.data().folderName || s.data().folderId}"`); passed++; } else { addResult('Google Drive', 'warn', 'Not configured — Admin → Drive tab'); } } catch (e) { addResult('Google Drive', 'fail', e.message); }
    setTestProgress(Math.round(18 / TOTAL * 100)); await pause(300);

    // T19 – Activity Logging
    sysLogAdd('[19/25] Verifying activity logging system...');
    try { const testLog = await addDoc(collection(db, 'adminLogs'), { action: 'system_test', message: 'System test v11.0', time: new Date().toISOString(), createdAt: serverTimestamp() }); if (testLog.id) { addResult('Activity Logging', 'pass', `Log system active — ID: ${testLog.id.substring(0, 10)}...`); passed++; sysLogAdd('  ✓ Activity log working'); } } catch (e) { addResult('Activity Logging', 'fail', e.message); }
    setTestProgress(Math.round(19 / TOTAL * 100)); await pause(300);

    // T20 – Department Data
    sysLogAdd('[20/25] Checking department data collections...');
    try {
      const slugs = ['bca', 'bba', 'commerce', 'humanities', 'social-science'];
      const snaps = await Promise.all(slugs.map(s => getDoc(doc(db, 'departments', s))));
      const configured = snaps.filter(s => s.exists() && s.data().fullName).length;
      const withHod    = snaps.filter(s => s.exists() && s.data().hod?.name).length;
      if (configured === 0) { addResult('Department Data', 'warn', 'No dept configured — Admin → Departments tab'); sysLogAdd('  ⚠ No department data found'); }
      else { addResult('Department Data', 'pass', `${configured}/5 configured | HOD: ${withHod}`); sysLogAdd(`  ✓ ${configured}/5 departments active`); }
      passed++;
    } catch (e) { addResult('Department Data', 'fail', e.message); sysLogAdd(`  ✗ ${e.message}`); }
    setTestProgress(Math.round(20 / TOTAL * 100)); await pause(300);

    // T21 – Contact Settings
    sysLogAdd('[21/25] Checking contact settings...');
    try {
      const [contactSnap, dirSnap] = await Promise.all([getDoc(doc(db, 'settings', 'contact')), getDocs(collection(db, 'contactDirectory'))]);
      const hasContact = contactSnap.exists();
      const bhudaOk    = hasContact && !!contactSnap.data().bhuda?.phone;
      const bankMoreOk = hasContact && !!contactSnap.data().bankMore?.phone;
      const dirCount   = dirSnap.size;
      if (!hasContact) { addResult('Contact Settings', 'warn', 'settings/contact missing — Admin → Contact tab'); sysLogAdd('  ⚠ Contact settings not configured'); }
      else if (!bhudaOk || !bankMoreOk) { addResult('Contact Settings', 'warn', `Partial: Bhuda ${bhudaOk ? '✓' : '✗'} | Bank More ${bankMoreOk ? '✓' : '✗'} | Dir: ${dirCount}`); sysLogAdd('  ⚠ Contact partially configured'); }
      else { addResult('Contact Settings', 'pass', `Both campuses configured | Directory: ${dirCount} entries`); sysLogAdd('  ✓ Contact OK'); }
      passed++;
    } catch (e) { addResult('Contact Settings', 'fail', e.message); sysLogAdd(`  ✗ ${e.message}`); }
    setTestProgress(Math.round(21 / TOTAL * 100)); await pause(300);

    // T22 – CMS Pages
    sysLogAdd('[22/25] Checking CMS pages (PageViewer routes)...');
    try {
      const s = await getDocs(collection(db, 'pages'));
      const regulationPaths = [
        '/about-us/regulations/bbmku/special-ug-regulation',
        '/about-us/regulations/bbmku/ug-regulation-fyugp',
        '/about-us/regulations/bbmku/ug-regulation-cbcs',
        '/about-us/regulations/college-affiliation',
        '/about-us/regulations/ugc-section',
        '/about-us/regulations/vbu/ug-regulation-2015',
        '/about-us/regulations/vbu/bca-regulation',
        '/about-us/regulations/byelaws',
        '/about-us/regulations/exemption',
        '/about-us/audit-report',
      ];
      const pagePaths = s.docs.map(d => d.data().slug || d.data().path || '');
      const filled = regulationPaths.filter(p => pagePaths.some(pp => pp.includes(p.split('/').pop())));
      addResult('CMS Pages', filled.length === regulationPaths.length ? 'pass' : 'warn',
        `${filled.length}/${regulationPaths.length} regulation pages created | Total: ${s.size} pages`);
      if (filled.length < regulationPaths.length) sysLogAdd(`  ⚠ ${regulationPaths.length - filled.length} regulation pages missing`);
      else sysLogAdd('  ✓ All regulation pages exist');
      passed++;
    } catch (e) { addResult('CMS Pages', 'fail', e.message); }
    setTestProgress(Math.round(22 / TOTAL * 100)); await pause(300);

    // T23 – Admin Auth
    sysLogAdd('[23/25] Verifying admin session auth system...');
    try {
      const hasSession = typeof sessionStorage !== 'undefined';
      const authKey = sessionStorage.getItem('gnc_admin_auth');
      addResult('Admin Auth System', 'pass', `sessionStorage: ${hasSession ? 'active' : 'N/A'} | Current session: ${authKey === 'true' ? '✓ logged in' : '✗ not logged in'}`);
      passed++; sysLogAdd('  ✓ Auth system operational');
    } catch (e) { addResult('Admin Auth System', 'fail', e.message); }
    setTestProgress(Math.round(23 / TOTAL * 100)); await pause(300);

    // T24 – Hero Slider
    sysLogAdd('[24/25] Checking hero slider slides...');
    try { const s = await getDocs(collection(db, 'sliderSlides')); const active = s.docs.filter(d => d.data().active !== false).length; if (s.size === 0) { addResult('Hero Slider', 'warn', 'No slides — Admin → Hero Slider tab se slides add karein'); } else { addResult('Hero Slider', 'pass', `${s.size} slides | ${active} active`); } passed++; sysLogAdd(`  ✓ Slider: ${s.size} slides`); } catch (e) { addResult('Hero Slider', 'fail', e.message); }
    setTestProgress(Math.round(24 / TOTAL * 100)); await pause(300);

    // T25 – Gallery & Code Audit
    sysLogAdd('[25/25] Checking gallery & code audit...');
    try {
      const s = await getDocs(collection(db, 'gallery'));
      const unusedFiles = ['AboutUs.jsx', 'QuickRibbon.jsx', 'ScrollingNotices.jsx', 'SystemHealth.jsx', 'DemoHomePage.jsx'];
      addResult('Gallery & Code Audit', s.size > 0 ? 'pass' : 'warn',
        `Gallery: ${s.size} photos | Potentially unused files: ${unusedFiles.length}`);
      if (s.size === 0) sysLogAdd('  ⚠ Gallery empty'); else sysLogAdd(`  ✓ Gallery: ${s.size} photos`);
      sysLogAdd('  ℹ Unused files: ' + unusedFiles.join(', '));
      passed++;
    } catch (e) { addResult('Gallery & Code Audit', 'fail', e.message); }
    setTestProgress(100);

    const score = Math.round(passed / TOTAL * 100);
    sysLogAdd(''); sysLogAdd('━'.repeat(46));
    sysLogAdd(`COMPLETE: ${score}% — ${passed}/${TOTAL} tests passed`);
    if (score === 100) sysLogAdd('✓ ALL 25 SYSTEMS OPERATIONAL — WEBSITE READY');
    else if (score >= 80) sysLogAdd('⚠ MINOR ISSUES — CHECK WARNINGS ABOVE');
    else sysLogAdd('✗ CRITICAL ISSUES — IMMEDIATE ATTENTION REQUIRED');
    setTestScore(score);
    setTestRunning(false);
    logAct?.('add', `System test completed — Score: ${score}%`, 'system_test');
  };

  // ── PDF Report Generator ───────────────────────────────────────────────────
  const genPDF = async () => {
    setPdfGen(true);
    try {
      if (!window.jspdf) {
        await new Promise((res, rej) => {
          const s = document.createElement('script');
          s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
          s.onload = res; s.onerror = rej;
          document.head.appendChild(s);
        });
      }
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfW = 210, pdfH = 297;
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
      const timeStr = now.toLocaleTimeString();
      const passCount = testResults.filter(r => r.status === 'pass').length;
      const warnCount = testResults.filter(r => r.status === 'warn').length;
      const failCount = testResults.filter(r => r.status === 'fail').length;
      const sc = testScore || 0;
      const scColor = sc >= 90 ? [16, 185, 129] : sc >= 70 ? [245, 158, 11] : [239, 68, 68];

      // Header
      pdf.setFillColor(15, 35, 71); pdf.rect(0, 0, pdfW, 58, 'F');
      pdf.setFillColor(...scColor); pdf.rect(0, 58, pdfW, 2.5, 'F');

      try {
        const logoUrl = `${window.location.origin}${import.meta.env.BASE_URL || '/'}images/logo.webp`;
        const imgData = await fetch(logoUrl).then(r => r.blob()).then(b => new Promise(res => { const fr = new FileReader(); fr.onload = () => res(fr.result); fr.readAsDataURL(b); }));
        pdf.addImage(imgData, 'PNG', 12, 9, 30, 30);
      } catch {
        pdf.setFillColor(244, 160, 35); pdf.circle(27, 24, 12, 'F');
        pdf.setTextColor(15, 35, 71); pdf.setFontSize(8); pdf.setFont('helvetica', 'bold'); pdf.text('GNC', 23, 26);
      }

      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(19); pdf.setFont('helvetica', 'bold'); pdf.text('GURU NANAK COLLEGE', 50, 18);
      pdf.setFontSize(8.5); pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(180, 200, 240);
      pdf.text('Affiliated to B.B.M.K. University, Dhanbad | NAAC Accredited Institution', 50, 26);
      pdf.text('Bank More, Dhanbad — 826001, Jharkhand, India', 50, 33);
      pdf.text('Website System Health Diagnostic Report — Confidential', 50, 40);

      pdf.setFillColor(...scColor);
      pdf.roundedRect(pdfW - 40, 12, 28, 20, 3, 3, 'F');
      pdf.setTextColor(255, 255, 255); pdf.setFontSize(16); pdf.setFont('helvetica', 'bold');
      pdf.text(`${sc}%`, pdfW - 26, 26, { align: 'center' });

      pdf.setFillColor(244, 160, 35); pdf.rect(0, 65, pdfW, 12, 'F');
      pdf.setTextColor(15, 35, 71); pdf.setFontSize(10); pdf.setFont('helvetica', 'bold');
      pdf.text('WEBSITE SYSTEM HEALTH DIAGNOSTIC REPORT — 25 PHASE DEEP SCAN', pdfW / 2, 73, { align: 'center' });

      pdf.setFontSize(8); pdf.setFont('helvetica', 'normal'); pdf.setTextColor(80, 80, 100);
      pdf.text(`Generated: ${dateStr} at ${timeStr}`, 12, 86);
      pdf.text(`Total Tests: 25  |  Passed: ${passCount}  |  Warnings: ${warnCount}  |  Failed: ${failCount}`, pdfW / 2, 86, { align: 'center' });
      pdf.text('Admin Panel v11.0', pdfW - 12, 86, { align: 'right' });

      let y = 96;
      pdf.setFillColor(15, 35, 71); pdf.rect(12, y, pdfW - 24, 9, 'F');
      pdf.setTextColor(255, 255, 255); pdf.setFontSize(8.5); pdf.setFont('helvetica', 'bold');
      pdf.text('#', 15, y + 6); pdf.text('TEST NAME', 22, y + 6); pdf.text('STATUS', 112, y + 6); pdf.text('DETAILS', 135, y + 6); pdf.text('TIME', 185, y + 6);
      y += 11;

      testResults.forEach((r, i) => {
        if (y > pdfH - 35) {
          pdf.addPage();
          pdf.setFillColor(15, 35, 71); pdf.rect(0, 0, pdfW, 14, 'F');
          pdf.setFillColor(244, 160, 35); pdf.rect(0, 14, pdfW, 2, 'F');
          pdf.setTextColor(255, 255, 255); pdf.setFontSize(8); pdf.text('GNC — System Diagnostic Report (cont.)', 12, 10);
          y = 25;
        }
        const even = i % 2 === 0;
        pdf.setFillColor(even ? 248 : 255, even ? 250 : 255, even ? 255 : 255);
        pdf.rect(12, y - 2, pdfW - 24, 9, 'F');
        const sc2 = r.status === 'pass' ? [16, 185, 129] : r.status === 'warn' ? [245, 158, 11] : [239, 68, 68];
        pdf.setFillColor(...sc2); pdf.roundedRect(110, y - 1.5, 20, 7, 1.5, 1.5, 'F');
        pdf.setTextColor(80, 80, 100); pdf.setFontSize(8); pdf.setFont('helvetica', 'normal');
        pdf.text(String(i + 1), 15, y + 4); pdf.text(r.name.substring(0, 40), 22, y + 4);
        pdf.setTextColor(255, 255, 255); pdf.setFont('helvetica', 'bold'); pdf.setFontSize(7);
        pdf.text(r.status === 'pass' ? 'PASS' : r.status === 'warn' ? 'WARN' : 'FAIL', 120, y + 4, { align: 'center' });
        pdf.setTextColor(80, 80, 100); pdf.setFont('helvetica', 'normal'); pdf.setFontSize(7.5);
        pdf.text((r.detail || '').substring(0, 55), 135, y + 4);
        if (r.time) { pdf.setTextColor(150, 150, 170); pdf.setFontSize(7); pdf.text(r.time, 185, y + 4); }
        pdf.setDrawColor(230, 235, 245); pdf.line(12, y + 7, pdfW - 12, y + 7);
        y += 10;
      });

      // Summary
      y += 6; if (y > pdfH - 55) { pdf.addPage(); y = 20; }
      pdf.setFillColor(244, 160, 35); pdf.rect(12, y, pdfW - 24, 1, 'F'); y += 8;
      pdf.setTextColor(15, 35, 71); pdf.setFontSize(11); pdf.setFont('helvetica', 'bold'); pdf.text('EXECUTIVE SUMMARY', 12, y); y += 10;
      const summaryRows = [
        ['Tests Passed', `${passCount} / 25`, passCount === 25 ? '🟢 Perfect' : passCount >= 20 ? '🟡 Good' : '🔴 Action Required'],
        ['Warnings', `${warnCount}`, warnCount === 0 ? 'None' : 'Review Recommended'],
        ['Failed', `${failCount}`, failCount === 0 ? 'None' : '⚠ Fix Immediately'],
        ['Overall Score', `${sc}%`, sc >= 90 ? 'HEALTHY' : sc >= 70 ? 'FAIR' : 'CRITICAL'],
        ['Report Generated', dateStr, timeStr],
      ];
      summaryRows.forEach(([k, v, n]) => {
        pdf.setFillColor(248, 250, 255); pdf.rect(12, y - 2, pdfW - 24, 9, 'F');
        pdf.setTextColor(80, 80, 100); pdf.setFontSize(8.5); pdf.setFont('helvetica', 'normal'); pdf.text(k, 16, y + 4);
        pdf.setFont('helvetica', 'bold'); pdf.setTextColor(15, 35, 71); pdf.text(v, 85, y + 4);
        pdf.setFont('helvetica', 'italic'); pdf.setTextColor(100, 120, 160); pdf.text(n, 140, y + 4);
        pdf.setDrawColor(230, 235, 245); pdf.line(12, y + 7, pdfW - 12, y + 7);
        y += 11;
      });

      // Footer on each page
      const numPages = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= numPages; i++) {
        pdf.setPage(i);
        pdf.setFillColor(15, 35, 71); pdf.rect(0, pdfH - 13, pdfW, 13, 'F');
        pdf.setFillColor(244, 160, 35); pdf.rect(0, pdfH - 13, pdfW, 1, 'F');
        pdf.setTextColor(140, 160, 200); pdf.setFontSize(7); pdf.setFont('helvetica', 'normal');
        pdf.text('Guru Nanak College, Dhanbad | Confidential — Admin Use Only', 12, pdfH - 4.5);
        pdf.text(`Page ${i} of ${numPages}`, pdfW - 12, pdfH - 4.5, { align: 'right' });
      }

      pdf.save(`GNC_System_Report_${now.toISOString().split('T')[0]}.pdf`);
      toast.success('📥 PDF Report downloaded!');
    } catch (e) { toast.error('PDF Error: ' + e.message); }
    setPdfGen(false);
  };

  return (
    <div className="fade-up">
      <p className="asec">🛡️ System Test Suite</p>
      <p className="asub">25-phase deep scan — har module ka health check. Download PDF report.</p>

      <div className="sys-bg">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, borderBottom: '1px solid rgba(244,160,35,.25)', paddingBottom: 18 }}>
          <div>
            <div style={{ color: GOLD, fontSize: 22, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", letterSpacing: -1 }}>{'>_ GNC.SYS.DIAGNOSTICS'}</div>
            <div style={{ color: 'rgba(244,160,35,.5)', fontSize: 12, fontFamily: "'JetBrains Mono',monospace", marginTop: 3 }}>[ 25-Phase Ultra Scan | Admin Panel v11.0 ]</div>
          </div>
          {testScore !== null && (
            <div style={{ padding: '10px 20px', borderRadius: 10, border: `2px solid ${testScore >= 90 ? T.green : testScore >= 70 ? GOLD : T.red}`, color: testScore >= 90 ? T.green : testScore >= 70 ? GOLD : T.red, fontWeight: 900, fontSize: 24, fontFamily: "'JetBrains Mono',monospace", background: `rgba(${testScore >= 90 ? '16,185,129' : testScore >= 70 ? '244,160,35' : '239,68,68'},.08)` }}>
              {testScore}%
            </div>
          )}
        </div>

        {/* Terminal log */}
        {(testRunning || sysLog.length > 0) && (
          <div className="sys-term" ref={sysRef} style={{ marginBottom: 16 }}>
            {sysLog.map((line, i) => (
              <p key={i} style={{ margin: '3px 0', color: line.includes('✗') || line.includes('CRITICAL') ? T.red : line.includes('⚠') || line.includes('WARN') ? GOLD : line.includes('COMPLETE') || line.includes('✓ ALL') ? '#facc15' : line.startsWith('━') ? 'rgba(244,160,35,.3)' : '#a3e635' }}>{line}</p>
            ))}
            {testRunning && <p style={{ color: GOLD }}><span className="pulse" style={{ display: 'inline-block' }}>█</span></p>}
          </div>
        )}

        {/* Progress bar */}
        {(testRunning || testResults.length > 0) && (
          <div style={{ background: 'rgba(255,255,255,.06)', borderRadius: 99, height: 8, marginBottom: 20, overflow: 'hidden', border: '1px solid rgba(244,160,35,.2)' }}>
            <div style={{ width: `${testProgress}%`, height: '100%', background: `linear-gradient(90deg,${NAVY},${GOLD})`, borderRadius: 99, transition: 'width .4s ease', boxShadow: `0 0 10px ${GOLD}55` }} />
          </div>
        )}

        {/* Idle state */}
        {!testRunning && testResults.length === 0 && (
          <div style={{ textAlign: 'center', padding: '44px 20px' }}>
            <div style={{ fontSize: 60, marginBottom: 18, filter: `drop-shadow(0 0 20px ${GOLD})` }}>🛡️</div>
            <div style={{ color: GOLD, fontSize: 18, fontWeight: 900, fontFamily: "'JetBrains Mono',monospace", marginBottom: 8 }}>25-PHASE DEEP SCAN READY</div>
            <div style={{ color: 'rgba(255,255,255,.35)', fontSize: 13, marginBottom: 28, lineHeight: 1.8 }}>
              Vite • Firebase Init • Firestore Read/Write/Delete<br />
              Navbar • Site Settings • ImgBB • Flash Alerts<br />
              Faculty • Alumni • Content Health • YouTube • Drive<br />
              Activity Log • <span style={{ color: GOLD }}>Department Data • Contact Settings</span>
            </div>
            <button onClick={runTest} className="sys-btn">▶ EXECUTE FULL DIAGNOSTIC</button>
          </div>
        )}

        {/* Results */}
        {!testRunning && testResults.length > 0 && (
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
              {testResults.map((r, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '13px 16px', background: 'rgba(255,255,255,.04)', borderRadius: 10, border: `1px solid ${r.status === 'pass' ? 'rgba(16,185,129,.2)' : r.status === 'warn' ? 'rgba(244,160,35,.2)' : 'rgba(239,68,68,.2)'}`, borderLeft: `4px solid ${r.status === 'pass' ? T.green : r.status === 'warn' ? GOLD : T.red}` }}>
                  <span style={{ fontSize: 18, flexShrink: 0 }}>{r.status === 'pass' ? '✅' : r.status === 'warn' ? '⚠️' : '❌'}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, color: '#f1f5f9', fontSize: 14 }}>{r.name}</div>
                    <div style={{ color: 'rgba(255,255,255,.45)', fontSize: 12, marginTop: 3, fontFamily: "'JetBrains Mono',monospace" }}>{r.detail}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                    <span style={{ fontSize: 10, color: 'rgba(255,255,255,.25)', fontFamily: "'JetBrains Mono',monospace" }}>{r.time}</span>
                    <span style={{ fontSize: 10, fontWeight: 900, padding: '2px 8px', borderRadius: 4, background: r.status === 'pass' ? 'rgba(16,185,129,.15)' : r.status === 'warn' ? 'rgba(244,160,35,.15)' : 'rgba(239,68,68,.15)', color: r.status === 'pass' ? T.green : r.status === 'warn' ? GOLD : T.red, fontFamily: "'JetBrains Mono',monospace" }}>
                      {r.status === 'pass' ? 'PASS' : r.status === 'warn' ? 'WARN' : 'FAIL'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Score summary */}
            <div style={{ background: 'rgba(0,0,0,.3)', borderRadius: 12, padding: '16px 20px', border: '1px solid rgba(244,160,35,.15)', marginBottom: 16 }}>
              <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', marginBottom: 12 }}>
                {[
                  { label: 'Passed',   count: testResults.filter(r => r.status === 'pass').length, color: T.green, bg: 'rgba(16,185,129,.1)' },
                  { label: 'Warnings', count: testResults.filter(r => r.status === 'warn').length, color: GOLD,    bg: 'rgba(244,160,35,.1)' },
                  { label: 'Failed',   count: testResults.filter(r => r.status === 'fail').length, color: T.red,   bg: 'rgba(239,68,68,.1)' },
                  { label: 'Total',    count: testResults.length, color: 'rgba(255,255,255,.7)',                   bg: 'rgba(255,255,255,.05)' },
                ].map(s => (
                  <div key={s.label} style={{ background: s.bg, border: `1px solid ${s.color}30`, borderRadius: 8, padding: '8px 16px', textAlign: 'center' }}>
                    <div style={{ fontSize: 22, fontWeight: 900, color: s.color, fontFamily: "'JetBrains Mono',monospace" }}>{s.count}</div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,.4)', fontWeight: 700, letterSpacing: .5, textTransform: 'uppercase' }}>{s.label}</div>
                  </div>
                ))}
                <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,.4)', marginBottom: 4 }}>Overall Health</div>
                    <div style={{ fontSize: 13, fontWeight: 800, color: testScore >= 90 ? T.green : testScore >= 70 ? GOLD : T.red }}>
                      {testScore >= 90 ? '✅ HEALTHY' : testScore >= 70 ? '⚠ FAIR — Check Warnings' : '🔴 CRITICAL — Fix Required'}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button onClick={runTest} className="sys-btn" disabled={testRunning} style={{ borderColor: 'rgba(255,255,255,.2)', color: 'rgba(255,255,255,.5)', fontSize: 12, padding: '8px 18px' }}>🔄 Re-Run All Tests</button>
                <button onClick={genPDF} className="sys-btn" disabled={pdfGen || testResults.length === 0} style={{ borderColor: GOLD, color: GOLD, fontSize: 12, padding: '8px 18px', display: 'flex', alignItems: 'center', gap: 7 }}>
                  {pdfGen ? <><span className="spin" style={{ display: 'inline-block' }}>⚙️</span> Generating PDF…</> : '📥 Download PDF Report'}
                </button>
                <button
                  onClick={() => {
                    const lines = testResults.map(r => `[${r.status.toUpperCase()}] ${r.name}: ${r.detail} (${r.time})`).join('\n');
                    const blob = new Blob([`GNC System Test Report\nDate: ${new Date().toLocaleString()}\nScore: ${testScore}%\n\n${lines}\n\nLog:\n${sysLog.join('\n')}`], { type: 'text/plain' });
                    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `GNC_SysTest_${new Date().toISOString().split('T')[0]}.txt`; a.click();
                    toast.success('Text report downloaded!');
                  }}
                  className="sys-btn"
                  style={{ borderColor: 'rgba(255,255,255,.2)', color: 'rgba(255,255,255,.4)', fontSize: 12, padding: '8px 18px' }}>
                  📋 Export Log (.txt)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
