import React, { useState } from 'react';
import AttributeCard from '../../components/features/AttributeCard';
import styles from './CategoryManagement.module.css';

const CategoryManagement = () => {
  // Dynamic categories state
  const [categories, setCategories] = useState([
    {
      id: 'pure_silk',
      name: 'Pure Silk Sarees',
      count: 142,
      level: 1,
      children: [
        {
          id: 'kanchipuram',
          name: 'Kanchipuram Silks',
          count: 84,
          level: 2,
          children: [
            { id: 'leaf_1', name: 'Handloom Traditional', isLeaf: true },
            { id: 'leaf_2', name: 'Bridal Specials', isLeaf: true },
            { id: 'leaf_3', name: 'Temple Borders', isLeaf: true, isActive: true },
          ]
        },
        {
          id: 'banarasi',
          name: 'Banarasi Silk',
          count: 58,
          level: 2,
          children: []
        }
      ]
    },
    {
      id: 'tussar',
      name: 'Tussar & Muga',
      count: 89,
      level: 1,
      isInactive: true,
      children: []
    },
    {
      id: 'cotton',
      name: 'Cotton Silks',
      count: 214,
      level: 1,
      isInactive: true,
      children: []
    }
  ]);

  const [expanded, setExpanded] = useState({
    'pure_silk': true,
    'kanchipuram': true,
  });

  const [addingTo, setAddingTo] = useState(null); // ID of parent category being added to
  const [newCategoryName, setNewCategoryName] = useState('');

  const toggle = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddClick = (e, parentId) => {
    e.stopPropagation();
    setAddingTo(parentId);
    setNewCategoryName('');
    // Expand parent if adding a subcategory
    if (parentId) {
      setExpanded(prev => ({ ...prev, [parentId]: true }));
    }
  };

  const submitAdd = () => {
    if (!newCategoryName.trim()) {
      setAddingTo(null);
      return;
    }

    const newCategory = {
      id: `cat_${Date.now()}`,
      name: newCategoryName,
      count: 0,
      children: []
    };

    const updateCategories = (list) => {
      if (addingTo === 'root') {
        return [...list, { ...newCategory, level: 1 }];
      }
      return list.map(cat => {
        if (cat.id === addingTo) {
          return {
            ...cat,
            children: [...(cat.children || []), { ...newCategory, level: (cat.level || 1) + 1 }]
          };
        }
        if (cat.children) {
          return { ...cat, children: updateCategories(cat.children) };
        }
        return cat;
      });
    };

    setCategories(prev => updateCategories(prev));
    setAddingTo(null);
    setNewCategoryName('');
  };

  const renderAddInput = (parentId) => (
    <div className={styles.addInputWrapper}>
      <input
        autoFocus
        className={styles.addInput}
        placeholder="Category name..."
        value={newCategoryName}
        onChange={(e) => setNewCategoryName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') submitAdd();
          if (e.key === 'Escape') setAddingTo(null);
        }}
      />
      <div className={styles.addInputActions}>
        <span className="material-symbols-outlined" onClick={submitAdd}>done</span>
        <span className="material-symbols-outlined" onClick={() => setAddingTo(null)}>close</span>
      </div>
    </div>
  );

  const renderTree = (items) => {
    return items.map(node => {
      const isLevel1 = node.level === 1;
      const hasChildren = node.children && node.children.length > 0;
      const isExpanded = expanded[node.id];

      if (node.isLeaf) {
        return (
          <p key={node.id} className={`${styles.leaf} ${node.isActive ? styles.leafActive : ''}`}>
            {node.name}
          </p>
        );
      }

      return (
        <div key={node.id} className={`${styles.treeItem} ${node.isInactive ? styles.inactiveNode : ''}`}>
          <div className={styles.treeHeader} onClick={() => toggle(node.id)}>
            <span className={`material-symbols-outlined ${isLevel1 ? styles.expandIcon : styles.expandIconSmall}`}>
              {hasChildren ? (isExpanded ? 'expand_more' : 'chevron_right') : 'remove'}
            </span>
            <span className={isLevel1 ? styles.level1Text : styles.level2Text}>{node.name}</span>
            <span className={isLevel1 ? styles.nodeCount : styles.subNodeCount}>
              {node.count || 0}
            </span>
            <button className={styles.inlineAdd} onClick={(e) => handleAddClick(e, node.id)}>
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
          
          {(isExpanded || (addingTo === node.id)) && (
            <div className={isLevel1 ? styles.subTree : styles.leaves}>
              {renderTree(node.children)}
              {addingTo === node.id && renderAddInput(node.id)}
            </div>
          )}
        </div>
      );
    });
  };

  const [fabricTags, setFabricTags] = useState([
    { label: 'Mulberry Silk' },
    { label: 'Muga Silk' },
    { label: 'Wild Tussar' },
    { label: 'Chanderi' }
  ]);

  const [colorTags, setColorTags] = useState([
    { label: 'Vermillion', color: '#8B0000' },
    { label: 'Forest', color: '#1B3022' },
    { label: 'Turmeric', color: '#FFB800' }
  ]);

  const [occasionTags, setOccasionTags] = useState([
    { label: 'Wedding' },
    { label: 'Formal Gala' },
    { label: 'Cocktail' }
  ]);

  const [patternTags, setPatternTags] = useState([
    { label: 'Zari Butta' },
    { label: 'Paisley' },
    { label: 'Floral Jaal' }
  ]);

  const handleAddTag = (setter) => (label) => {
    setter(prev => [...prev, { label }]);
  };

  const handleRemoveTag = (setter) => (index) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className={styles.pageWrapper}>
      {/* Main Content Grid */}
      <div className={styles.contentGrid}>
        {/* Left Panel: Hierarchy */}
        <section className={styles.hierarchyPanel}>
          <div className={styles.panelTitleWrapper}>
            <h2 className={styles.panelTitle}>Hierarchy</h2>
            <button className={styles.addButton} onClick={(e) => handleAddClick(e, 'root')}>
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
          
          <div className={`${styles.hierarchyBox} custom-scrollbar`}>
            <div className={styles.tree}>
              {renderTree(categories)}
              {addingTo === 'root' && renderAddInput('root')}
            </div>
          </div>
        </section>

        {/* Right Panel: Attributes & Banner */}
        <section className={styles.attributesPanel}>
          <div className={`${styles.cardsGrid} custom-scrollbar`}>
            <div className="row g-4 row-cols-1 row-cols-md-2">
              <div className="col">
                <AttributeCard 
                  title="Fabric Type" 
                  icon="settings_ethernet" 
                  tags={fabricTags} 
                  variant="secondary"
                  onAddTag={handleAddTag(setFabricTags)}
                  onRemoveTag={handleRemoveTag(setFabricTags)}
                />
              </div>
              <div className="col">
                <AttributeCard 
                  title="Color Story" 
                  icon="palette" 
                  tags={colorTags} 
                  onAddTag={handleAddTag(setColorTags)}
                  onRemoveTag={handleRemoveTag(setColorTags)}
                />
              </div>
              <div className="col">
                <AttributeCard 
                  title="Occasion" 
                  icon="event" 
                  tags={occasionTags} 
                  variant="primary"
                  onAddTag={handleAddTag(setOccasionTags)}
                  onRemoveTag={handleRemoveTag(setOccasionTags)}
                />
              </div>
              <div className="col">
                <AttributeCard 
                  title="Patterns" 
                  icon="texture" 
                  tags={patternTags} 
                  onAddTag={handleAddTag(setPatternTags)}
                  onRemoveTag={handleRemoveTag(setPatternTags)}
                />
              </div>
            </div>
          </div>

        </section>
      </div>
    </div>
  );
};

export default CategoryManagement;
