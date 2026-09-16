// src/components/admin/BulkImportModal.jsx — Enterprise Bulk Excel & CSV Importer
// Drag-and-drop batch upload for Faculty, Placements, and Student Notices using XLSX

import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { db } from '../../firebase';
import { writeBatch, collection, doc, serverTimestamp } from 'firebase/firestore';
import toast from 'react-hot-toast';
import {
  FileSpreadsheet,
  Upload,
  Download,
  CheckCircle2,
  AlertCircle,
  X,
  RefreshCw,
  FileText,
  Users,
  Briefcase,
  Bell
} from 'lucide-react';

const ENTITY_SCHEMAS = {
  faculty: {
    label: 'Faculty & Staff Roster',
    collection: 'faculties',
    icon: <Users size={18} />,
    requiredFields: ['Name', 'Designation', 'Department'],
    sampleData: [
      {
        Name: 'Dr. Gurpreet Singh',
        Designation: 'Associate Professor & HOD',
        Department: 'Commerce',
        Qualification: 'Ph.D, M.Com, NET',
        Email: 'gurpreet.commerce@gncollege.org',
        Order: 1
      },
      {
        Name: 'Prof. Amrita Kaur',
        Designation: 'Assistant Professor',
        Department: 'Computer Science',
        Qualification: 'MCA, M.Tech',
        Email: 'amrita.bca@gncollege.org',
        Order: 2
      }
    ],
    mapRow: (row) => ({
      name: (row.Name || row.name || '').trim(),
      designation: (row.Designation || row.designation || 'Faculty Member').trim(),
      department: (row.Department || row.department || 'General').trim(),
      qualification: (row.Qualification || row.qualification || '').trim(),
      email: (row.Email || row.email || '').trim(),
      order: parseInt(row.Order || row.order || '99', 10),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
  },
  placements: {
    label: 'Campus Placements Record',
    collection: 'placements',
    icon: <Briefcase size={18} />,
    requiredFields: ['Company Name', 'Year', 'CTC Package'],
    sampleData: [
      {
        'Company Name': 'Tata Consultancy Services',
        Year: '2025-26',
        'CTC Package': '4.50 LPA',
        'Students Placed': 42,
        Role: 'System Associate'
      },
      {
        'Company Name': 'Wipro Technologies',
        Year: '2025-26',
        'CTC Package': '3.80 LPA',
        'Students Placed': 28,
        Role: 'Project Engineer'
      }
    ],
    mapRow: (row) => ({
      companyName: (row['Company Name'] || row.companyName || '').trim(),
      year: (row.Year || row.year || new Date().getFullYear()).toString().trim(),
      packageCTC: (row['CTC Package'] || row.packageCTC || '').trim(),
      studentsPlaced: parseInt(row['Students Placed'] || row.studentsPlaced || '0', 10),
      role: (row.Role || row.role || 'Graduate Trainee').trim(),
      createdAt: serverTimestamp()
    })
  },
  notices: {
    label: 'College Circulars & Notices',
    collection: 'notices',
    icon: <Bell size={18} />,
    requiredFields: ['Title', 'Category'],
    sampleData: [
      {
        Title: 'Semester V Examination Form Fill-up Schedule',
        Category: 'Examination',
        Urgency: 'URGENT',
        Date: new Date().toISOString().split('T')[0],
        Description: 'All undergraduate students must submit forms before the deadline.'
      },
      {
        Title: 'Annual Athletic Meet 2026 Registration Open',
        Category: 'Sports',
        Urgency: 'NORMAL',
        Date: new Date().toISOString().split('T')[0],
        Description: 'Interested students contact the Department of Physical Education.'
      }
    ],
    mapRow: (row) => ({
      title: (row.Title || row.title || '').trim(),
      text: (row.Description || row.text || row.Title || '').trim(),
      category: (row.Category || row.category || 'General').trim(),
      urgency: (row.Urgency || row.urgency || 'NORMAL').trim().toUpperCase(),
      date: (row.Date || row.date || new Date().toISOString().split('T')[0]).toString().trim(),
      isPinned: false,
      isNew: true,
      createdAt: serverTimestamp()
    })
  }
};

export default function BulkImportModal({ isOpen, onClose, defaultEntity = 'faculty', onImportSuccess }) {
  const [selectedEntity, setSelectedEntity] = useState(defaultEntity);
  const [parsedRows, setParsedRows] = useState([]);
  const [validRows, setValidRows] = useState([]);
  const [invalidRows, setInvalidRows] = useState([]);
  const [fileName, setFileName] = useState('');
  const [importing, setImporting] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const currentSchema = ENTITY_SCHEMAS[selectedEntity] || ENTITY_SCHEMAS.faculty;

  // 1. Download Sample Excel Template
  const handleDownloadSample = () => {
    try {
      const ws = XLSX.utils.json_to_sheet(currentSchema.sampleData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, currentSchema.label.substring(0, 30));
      XLSX.writeFile(wb, `GNC_${selectedEntity}_import_template.xlsx`);
      toast.success(`Downloaded template for ${currentSchema.label}!`, { icon: '📊' });
    } catch (err) {
      toast.error('Failed to generate template: ' + err.message);
    }
  };

  // 2. Process uploaded file
  const handleProcessFile = (file) => {
    if (!file) return;
    setFileName(file.name);
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);

        if (!json || json.length === 0) {
          toast.error('The selected file contains no data rows.');
          return;
        }

        const valid = [];
        const invalid = [];

        json.forEach((row, idx) => {
          const missing = currentSchema.requiredFields.filter((req) => !row[req] || String(row[req]).trim() === '');
          if (missing.length === 0) {
            valid.push({ rowNumber: idx + 2, raw: row, mapped: currentSchema.mapRow(row) });
          } else {
            invalid.push({ rowNumber: idx + 2, raw: row, reason: `Missing: ${missing.join(', ')}` });
          }
        });

        setParsedRows(json);
        setValidRows(valid);
        setInvalidRows(invalid);

        if (valid.length > 0) {
          toast.success(`Parsed ${json.length} rows (${valid.length} valid, ${invalid.length} invalid)`, { icon: '📁' });
        } else {
          toast.error('No valid rows found matching the required format.');
        }
      } catch (err) {
        toast.error('Error parsing spreadsheet: ' + err.message);
      }
    };

    reader.readAsArrayBuffer(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleProcessFile(e.dataTransfer.files[0]);
    }
  };

  // 3. Execute batch write to Firestore
  const handleExecuteImport = async () => {
    if (!validRows.length) {
      toast.error('No valid rows to import.');
      return;
    }
    if (!db) {
      toast.error('Firestore database connection unavailable.');
      return;
    }

    setImporting(true);
    const toastId = toast.loading(`Importing ${validRows.length} records into '${currentSchema.collection}'...`);

    try {
      // Chunk into batches of 450 (Firestore limit is 500 operations per batch)
      const chunkSize = 450;
      let totalImported = 0;

      for (let i = 0; i < validRows.length; i += chunkSize) {
        const chunk = validRows.slice(i, i + chunkSize);
        const batch = writeBatch(db);
        const colRef = collection(db, currentSchema.collection);

        chunk.forEach(({ mapped }) => {
          const newDocRef = doc(colRef);
          batch.set(newDocRef, mapped);
        });

        await batch.commit();
        totalImported += chunk.length;
      }

      toast.success(`Successfully imported ${totalImported} records into ${currentSchema.label}!`, { id: toastId });
      setParsedRows([]);
      setValidRows([]);
      setInvalidRows([]);
      setFileName('');
      if (typeof onImportSuccess === 'function') onImportSuccess();
      onClose();
    } catch (err) {
      console.error('[BulkImport] Batch commit error:', err);
      toast.error(`Import failed: ${err.message}`, { id: toastId });
    } finally {
      setImporting(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 999999,
      background: 'rgba(6, 14, 28, 0.82)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
    }}>
      <div style={{
        background: '#ffffff', borderRadius: 16, width: '100%', maxWidth: 780,
        maxHeight: '90vh', display: 'flex', flexDirection: 'column',
        boxShadow: '0 24px 60px rgba(15, 35, 71, 0.35)', overflow: 'hidden',
        border: '1.5px solid #e2e8f0'
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 22px', background: '#0f2347', color: '#ffffff',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, background: 'rgba(244, 160, 35, 0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f4a023'
            }}>
              <FileSpreadsheet size={20} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: 16, color: '#ffffff', fontFamily: "'Space Grotesk', sans-serif" }}>
                Enterprise Bulk Importer (Excel &amp; CSV)
              </h3>
              <p style={{ margin: 0, fontSize: 12, color: '#94a3b8' }}>
                Batch upload records with instant column validation and atomic writes
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 4 }}
            title="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: 22, overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: 18 }}>
          
          {/* Target Entity Selector */}
          <div>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 8 }}>
              Select Destination Collection:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
              {Object.entries(ENTITY_SCHEMAS).map(([key, schema]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    setSelectedEntity(key);
                    setParsedRows([]);
                    setValidRows([]);
                    setInvalidRows([]);
                    setFileName('');
                  }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px',
                    borderRadius: 10, border: selectedEntity === key ? '2px solid #f4a023' : '1px solid #cbd5e1',
                    background: selectedEntity === key ? '#fffdfa' : '#f8fafc',
                    color: selectedEntity === key ? '#0f2347' : '#64748b',
                    fontWeight: 700, fontSize: 13, cursor: 'pointer', transition: 'all 0.2s'
                  }}
                >
                  <span style={{ color: selectedEntity === key ? '#f4a023' : '#64748b' }}>{schema.icon}</span>
                  <span>{schema.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Template Download Prompt */}
          <div style={{
            background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 10, padding: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0f2347' }}>
                Download Sample Template: {currentSchema.label}
              </div>
              <div style={{ fontSize: 12, color: '#64748b' }}>
                Required columns: <strong>{currentSchema.requiredFields.join(', ')}</strong>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDownloadSample}
              style={{
                display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px',
                borderRadius: 8, background: '#0f2347', color: '#ffffff', border: 'none',
                fontSize: 12, fontWeight: 700, cursor: 'pointer'
              }}
            >
              <Download size={14} /> Download Sample (.xlsx)
            </button>
          </div>

          {/* Drag & Drop Upload Zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            style={{
              border: `2px dashed ${dragOver ? '#f4a023' : '#cbd5e1'}`,
              borderRadius: 12, padding: '30px 20px', textAlign: 'center',
              background: dragOver ? '#fffdf5' : '#f8fafc', cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.csv"
              style={{ display: 'none' }}
              onChange={(e) => handleProcessFile(e.target.files?.[0])}
            />
            <div style={{
              width: 48, height: 48, borderRadius: '50%', background: '#0f234712',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#0f2347', margin: '0 auto 12px'
            }}>
              <Upload size={24} />
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#0f2347' }}>
              {fileName ? fileName : 'Click to Upload or Drag & Drop Excel/CSV File'}
            </div>
            <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>
              Supports Microsoft Excel (.xlsx, .xls) and Comma-Separated Values (.csv)
            </div>
          </div>

          {/* Verification & Summary Bar */}
          {parsedRows.length > 0 && (
            <div style={{ display: 'flex', gap: 12 }}>
              <div style={{
                flex: 1, padding: 10, borderRadius: 8, background: '#ecfdf5',
                border: '1px solid #a7f3d0', display: 'flex', alignItems: 'center', gap: 8
              }}>
                <CheckCircle2 size={18} color="#059669" />
                <span style={{ fontSize: 13, fontWeight: 700, color: '#065f46' }}>
                  {validRows.length} Valid Records Ready
                </span>
              </div>
              {invalidRows.length > 0 && (
                <div style={{
                  flex: 1, padding: 10, borderRadius: 8, background: '#fff1f2',
                  border: '1px solid #fecdd3', display: 'flex', alignItems: 'center', gap: 8
                }}>
                  <AlertCircle size={18} color="#e11d48" />
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#9f1239' }}>
                    {invalidRows.length} Invalid / Incomplete Rows (Will Be Skipped)
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Preview Table */}
          {validRows.length > 0 && (
            <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{
                padding: '8px 12px', background: '#f1f5f9', fontSize: 12,
                fontWeight: 700, color: '#334155'
              }}>
                Preview (First 5 of {validRows.length} valid rows):
              </div>
              <div style={{ maxHeight: 160, overflowY: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                      <th style={{ padding: '6px 10px', textAlign: 'left', color: '#64748b' }}>#</th>
                      {currentSchema.requiredFields.map((field) => (
                        <th key={field} style={{ padding: '6px 10px', textAlign: 'left', color: '#0f2347' }}>{field}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {validRows.slice(0, 5).map(({ rowNumber, raw }) => (
                      <tr key={rowNumber} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '6px 10px', color: '#94a3b8' }}>{rowNumber}</td>
                        {currentSchema.requiredFields.map((field) => (
                          <td key={field} style={{ padding: '6px 10px', color: '#334155' }}>{raw[field] || '—'}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div style={{
          padding: '14px 22px', background: '#f8fafc', borderTop: '1px solid #e2e8f0',
          display: 'flex', justifyContent: 'flex-end', gap: 10
        }}>
          <button
            type="button"
            onClick={onClose}
            disabled={importing}
            style={{
              padding: '9px 18px', borderRadius: 8, border: '1px solid #cbd5e1',
              background: '#ffffff', color: '#334155', fontWeight: 600, fontSize: 13,
              cursor: 'pointer'
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleExecuteImport}
            disabled={importing || validRows.length === 0}
            style={{
              padding: '9px 24px', borderRadius: 8, border: 'none',
              background: validRows.length > 0 ? '#0f2347' : '#94a3b8',
              color: '#ffffff', fontWeight: 700, fontSize: 13,
              cursor: validRows.length > 0 ? 'pointer' : 'not-allowed',
              display: 'flex', alignItems: 'center', gap: 8
            }}
          >
            {importing ? (
              <>
                <RefreshCw size={16} className="spin" /> Importing Records...
              </>
            ) : (
              <>
                <CheckCircle2 size={16} color="#f4a023" /> Import {validRows.length} Valid Records
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
