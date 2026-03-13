import React from 'react';
import { COLORS } from '../styles/colors';

const RichTextEditorToolbar = () => {
  const handleCommand = (command, value = null) => {
    // This uses a deprecated API but is the simplest way without a library.
    // For a production app, a library like React-Quill or Slate.js is recommended.
    document.execCommand(command, false, value);
  };

  const ToolbarButton = ({ command, value, icon, title }) => (
    <button
      type="button" // Prevent form submission
      title={title}
      onMouseDown={e => {
        e.preventDefault(); // Prevent the editor from losing focus
        handleCommand(command, value);
      }}
      style={buttonStyle}
    >
      {icon}
    </button>
  );

  const ToolbarSelect = ({ command, options }) => (
    <select
      onChange={e => handleCommand(command, e.target.value)}
      style={{...buttonStyle, padding: '4px 2px', width: 'auto'}}
    >
      {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
    </select>
  );

  return (
    <div style={toolbarStyle}>
      {/* Font Style Group */}
      <div style={groupStyle}>
        <ToolbarButton command="bold" icon="B" title="Bold" />
        <ToolbarButton command="italic" icon="I" title="Italic" />
        <ToolbarButton command="underline" icon="U" title="Underline" />
        <ToolbarButton command="strikeThrough" icon={<span style={{textDecoration: 'line-through'}}>S</span>} title="Strikethrough" />
      </div>

      {/* Paragraph Group */}
      <div style={groupStyle}>
        <ToolbarButton command="insertUnorderedList" icon="•" title="Bulleted List" />
        <ToolbarButton command="insertOrderedList" icon="1." title="Numbered List" />
        <ToolbarButton command="justifyLeft" icon="Left" title="Align Left" />
        <ToolbarButton command="justifyCenter" icon="Center" title="Align Center" />
        <ToolbarButton command="justifyRight" icon="Right" title="Align Right" />
      </div>

      {/* Headings Group */}
      <div style={groupStyle}>
        <ToolbarSelect command="formatBlock" options={[
          { value: 'p', label: 'Paragraph' },
          { value: 'h1', label: 'Heading 1' },
          { value: 'h2', label: 'Heading 2' },
          { value: 'h3', label: 'Heading 3' },
        ]} />
      </div>

      {/* Link Group */}
      <div style={groupStyle}>
        <button
          type="button"
          title="Insert Link"
          onMouseDown={e => {
            e.preventDefault();
            const url = prompt('Enter the URL:');
            if (url) {
              handleCommand('createLink', url);
            }
          }}
          style={buttonStyle}
        >
          🔗
        </button>
        <ToolbarButton command="unlink" icon="🚫" title="Remove Link" />
      </div>
    </div>
  );
};

const toolbarStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1px',
  padding: '5px',
  backgroundColor: '#f0f2f5',
  border: '1px solid #ddd',
  borderBottom: 'none',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
};

const groupStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '0 8px',
  borderRight: '1px solid #ddd',
};

const buttonStyle = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: '6px 8px',
  borderRadius: '4px',
  minWidth: '28px',
  fontWeight: 'bold',
};

export default RichTextEditorToolbar;