// src/App.jsx
import React, { useState, useEffect } from 'react';
import Button from './components/Button/Button';
import CheckboxListItem from './components/CheckboxListItem/CheckboxListItem';
import Card from './components/Card/Card';
import styles from './App.module.css';

function App() {
  // --- State for the left side checkboxes ---
  // Example: matching the initial visual state from the image
  const [leftCheckboxes, setLeftCheckboxes] = useState([
    false, // Top empty
    false, // Second empty (though image shows faint check)
    false, // Third empty (though image shows faint check)
    true,  // Fourth blue check
    true,  // Fifth blue check
    true,  // Sixth blue check
    false, // Seventh empty (though image shows faint check)
    false, // Eighth empty
  ]);

  const handleLeftCheckboxChange = (index) => {
    setLeftCheckboxes(prev =>
      prev.map((checked, i) => (i === index ? !checked : checked))
    );
  };

  // --- State for the right side list ---
  const initialPages = [
    { id: 'p1', label: 'Page 1', checked: false },
    { id: 'p2', label: 'Page 2', checked: false },
    { id: 'p3', label: 'Page 3', checked: false },
    { id: 'p4', label: 'Page 4', checked: false },
    { id: 'p5', label: 'Page 5', checked: false },
    { id: 'p6', label: 'Page 6', checked: false },
    { id: 'p7', label: 'Page 7', checked: false },
    { id: 'p8', label: 'Page 8', checked: false },
    { id: 'p9', label: 'Page 9', checked: false },

  ];
  const [pages, setPages] = useState(initialPages);
  const [allPagesChecked, setAllPagesChecked] = useState(false);

  // Update "All Pages" state when individual pages change
  useEffect(() => {
    const allChecked = pages.length > 0 && pages.every(p => p.checked);
    setAllPagesChecked(allChecked);
  }, [pages]);

  // Handle individual page checkbox change
  const handlePageChange = (id) => {
    setPages(prevPages =>
      prevPages.map(page =>
        page.id === id ? { ...page, checked: !page.checked } : page
      )
    );
  };

  // Handle "All pages" checkbox change
  const handleAllPagesChange = (event) => {
    const isChecked = event.target.checked;
    setAllPagesChecked(isChecked);
    setPages(prevPages =>
      prevPages.map(page => ({ ...page, checked: isChecked }))
    );
  };

  return (
    <div className={styles.appContainer}>
      {/* Left Column */}
      <div className={styles.column}>
        {/* Group 1: Buttons */}
        <div className={styles.buttonGroup}>
          <Button />
          <Button />
          <Button />
        </div>

        {/* Group 2 & 3: Checkboxes and List Items (Combined for alignment) */}
        <div className={styles.leftCheckListArea}>
           {/* Standalone Checkboxes Column */}
           <div className={styles.standaloneCheckboxes}>
            {leftCheckboxes.map((isChecked, index) => (
              <div key={`left-check-${index}`} className={styles.standaloneCheckboxWrapper}>
                <input
                  type="checkbox"
                  className={styles.standaloneCheckbox}
                  checked={isChecked}
                  onChange={() => handleLeftCheckboxChange(index)}
                  // Use different class or style for "faint" if needed
                />
              </div>
            ))}
          </div>

          {/* List Items Column */}
          <div className={styles.leftListItems}>
            {/* We need 8 items to match the checkboxes */}
            {Array.from({ length: 8 }).map((_, index) => (
              <CheckboxListItem
                key={`list-item-${index}`}
                id={`list-item-${index}`} // Ensure unique id
                label="All pages" // Label is always "All pages" in the image
                checked={leftCheckboxes[index]} // Link to corresponding standalone checkbox state
                onChange={() => handleLeftCheckboxChange(index)} // Allow clicking item to toggle
              />
            ))}
          </div>
        </div>
      </div>

      {/* Spacer (Optional) */}
      <div style={{ width: '50px' }}></div>

      {/* Right Column */}
      <div className={`${styles.column} ${styles.rightColumn}`}>
        <Card>
          <CheckboxListItem
            id="all-pages"
            label="All pages"
            checked={allPagesChecked}
            onChange={handleAllPagesChange}
          />
          <hr className={styles.divider} />
          <div className={styles.itemslist}>
          {pages.map(page => (
            <CheckboxListItem
              key={page.id}
              id={page.id}
              label={page.label}
              checked={page.checked}
              onChange={() => handlePageChange(page.id)}
            />
          ))}
          </div>
           <hr className={styles.divider} />
          <div className={styles.cardButton}>
            <Button />
          </div>
        </Card>
      </div>
    </div>
  );
}

export default App;