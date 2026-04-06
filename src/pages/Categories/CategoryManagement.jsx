import React, { useState } from 'react';
import AttributeCard from '../../components/features/AttributeCard';
import styles from './CategoryManagement.module.css';

const CategoryManagement = () => {
  // Real expandable state for hierarchy
  const [expanded, setExpanded] = useState({
    'pure_silk': true,
    'kanchipuram': true,
  });

  const toggle = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const fabricTags = [
    { label: 'Mulberry Silk' },
    { label: 'Muga Silk' },
    { label: 'Wild Tussar' },
    { label: 'Chanderi' }
  ];

  const colorTags = [
    { label: 'Vermillion', color: '#8B0000' },
    { label: 'Forest', color: '#1B3022' },
    { label: 'Turmeric', color: '#FFB800' }
  ];

  const occasionTags = [
    { label: 'Wedding' },
    { label: 'Formal Gala' },
    { label: 'Cocktail' }
  ];

  const patternTags = [
    { label: 'Zari Butta' },
    { label: 'Paisley' },
    { label: 'Floral Jaal' }
  ];

  return (
    <div className={styles.pageWrapper}>
      {/* Main Content Grid */}
      <div className={styles.contentGrid}>
        {/* Left Panel: Hierarchy */}
        <section className={styles.hierarchyPanel}>
          <div className={styles.panelTitleWrapper}>
            <h2 className={styles.panelTitle}>Hierarchy</h2>
            <button className={styles.addButton}>
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
          
          <div className={`${styles.hierarchyBox} custom-scrollbar`}>
            <div className={styles.tree}>
              {/* Level 1: Pure Silk Sarees */}
              <div className={styles.treeItem}>
                <div className={styles.treeHeader} onClick={() => toggle('pure_silk')}>
                  <span className={`material-symbols-outlined ${styles.expandIcon}`}>
                    {expanded['pure_silk'] ? 'expand_more' : 'chevron_right'}
                  </span>
                  <span className={styles.level1Text}>Pure Silk Sarees</span>
                  <span className={styles.nodeCount}>142</span>
                </div>
                
                {expanded['pure_silk'] && (
                  <div className={styles.subTree}>
                    {/* Level 2: Kanchipuram Silks */}
                    <div className={styles.treeItem}>
                      <div className={styles.treeHeader} onClick={() => toggle('kanchipuram')}>
                        <span className={`material-symbols-outlined ${styles.expandIconSmall}`}>
                          {expanded['kanchipuram'] ? 'expand_more' : 'chevron_right'}
                        </span>
                        <span className={styles.level2Text}>Kanchipuram Silks</span>
                        <span className={styles.subNodeCount}>84</span>
                      </div>
                      
                      {expanded['kanchipuram'] && (
                        <div className={styles.leaves}>
                          <p className={styles.leaf}>Handloom Traditional</p>
                          <p className={styles.leaf}>Bridal Specials</p>
                          <p className={`${styles.leaf} ${styles.leafActive}`}>Temple Borders</p>
                        </div>
                      )}
                    </div>

                    {/* Level 2: Banarasi Silk */}
                    <div className={styles.treeItem}>
                      <div className={styles.treeHeader} onClick={() => toggle('banarasi')}>
                        <span className={`material-symbols-outlined ${styles.expandIconSmall}`}>
                          {expanded['banarasi'] ? 'expand_more' : 'chevron_right'}
                        </span>
                        <span className={styles.level2Text}>Banarasi Silk</span>
                        <span className={styles.subNodeCount}>58</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Level 1: Tussar & Muga (Inactive style) */}
              <div className={`${styles.treeItem} ${styles.inactiveNode}`}>
                <div className={styles.treeHeader} onClick={() => toggle('tussar')}>
                  <span className={`material-symbols-outlined ${styles.expandIcon}`}>
                    {expanded['tussar'] ? 'expand_more' : 'chevron_right'}
                  </span>
                  <span className={styles.level1Text}>Tussar & Muga</span>
                  <span className={styles.nodeCount}>89</span>
                </div>
              </div>

              {/* Level 1: Cotton Silks (Inactive style) */}
              <div className={`${styles.treeItem} ${styles.inactiveNode}`}>
                <div className={styles.treeHeader} onClick={() => toggle('cotton')}>
                  <span className={`material-symbols-outlined ${styles.expandIcon}`}>
                    {expanded['cotton'] ? 'expand_more' : 'chevron_right'}
                  </span>
                  <span className={styles.level1Text}>Cotton Silks</span>
                  <span className={styles.nodeCount}>214</span>
                </div>
              </div>
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
                />
              </div>
              <div className="col">
                <AttributeCard 
                  title="Color Story" 
                  icon="palette" 
                  tags={colorTags} 
                />
              </div>
              <div className="col">
                <AttributeCard 
                  title="Occasion" 
                  icon="event" 
                  tags={occasionTags} 
                  variant="primary"
                />
              </div>
              <div className="col">
                <AttributeCard 
                  title="Patterns" 
                  icon="texture" 
                  tags={patternTags} 
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
