import React, { useState } from 'react';
import styles from './ShippingManagement.module.css';

const initialZones = [
  {
    title: 'Tier 1 Metros',
    regions: ['Maharashtra', 'Delhi', 'Karnataka'],
    extraRegions: 2,
    charge: '250',
    freeAbove: '15,000',
  },
  {
    title: 'Rest of India',
    regions: ['All other states'],
    extraRegions: 0,
    charge: '450',
    freeAbove: '25,000',
  },
  {
    title: 'International - GCC',
    regions: ['UAE', 'Oman', 'Qatar'],
    extraRegions: 0,
    charge: '2,800',
    freeAbove: 'N/A',
  },
];

const availableRegions = [
  'Maharashtra', 'Delhi', 'Karnataka', 'Tamil Nadu', 'Gujarat', 
  'West Bengal', 'Uttar Pradesh', 'Rajasthan', 'Kerala', 'Punjab',
  'UAE', 'Oman', 'Qatar', 'Saudi Arabia', 'Kuwait', 'Bahrain'
];

const ShippingManagement = () => {
  const [activeTab, setActiveTab] = useState('PACKED');
  const [zones, setZones] = useState(initialZones);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState([]);

  const shipments = [
    {
      id: '#SC-2940',
      customer: 'Ananya Iyer',
      courier: 'Blue Dart Premium',
      trackingId: 'BD88204910',
      status: 'SHIPPED',
      shippedDate: 'Oct 12, 2023',
      deliveredDate: '-',
    },
    {
      id: '#SC-2938',
      customer: 'Vikram Seth',
      courier: 'Delhivery Express',
      trackingId: 'DLV773012',
      status: 'PACKED',
      shippedDate: '-',
      deliveredDate: '-',
    },
    {
      id: '#SC-2931',
      customer: 'Meera Desai',
      courier: 'Blue Dart Premium',
      trackingId: 'BD88204999',
      status: 'DELIVERED',
      shippedDate: 'Oct 10, 2023',
      deliveredDate: 'Oct 14, 2023',
    },
  ];

  const handleDeleteZone = (index) => {
    if (window.confirm('Are you sure you want to delete this zone?')) {
      const newZones = [...zones];
      newZones.splice(index, 1);
      setZones(newZones);
    }
  };

  const handleToggleEdit = (index) => {
    if (editingIndex === index) {
      setEditingIndex(null);
    } else {
      setEditingIndex(index);
    }
  };

  const handleChargeChange = (index, field, value) => {
    const newZones = [...zones];
    newZones[index][field] = value.replace('₹', '').replace(',', '');
    setZones(newZones);
  };

  const openRegionModal = (index) => {
    setSelectedRegions(zones[index].regions);
    setEditingIndex(index);
    setIsModalOpen(true);
  };

  const toggleRegion = (region) => {
    setSelectedRegions(prev => 
      prev.includes(region) ? prev.filter(r => r !== region) : [...prev, region]
    );
  };

  const saveRegions = () => {
    const newZones = [...zones];
    newZones[editingIndex].regions = selectedRegions.slice(0, 3);
    newZones[editingIndex].extraRegions = Math.max(0, selectedRegions.length - 3);
    setZones(newZones);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.container}>
      {/* Shipments Overview Section */}
      <section className={styles.section}>
        <div className={styles.header}>
          <div className={styles.tabsWrapper}>
            <div className={styles.tabs}>
              {['PACKED', 'SHIPPED', 'OFD', 'DELIVERED', 'RTO'].map((tab) => (
                <button
                  key={tab}
                  className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === 'OFD' ? 'OUT FOR DELIVERY' : tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ORDER ID</th>
                  <th>CUSTOMER</th>
                  <th>COURIER NAME</th>
                  <th>TRACKING ID</th>
                  <th>STATUS</th>
                  <th>SHIPPED DATE</th>
                  <th>DELIVERED DATE</th>
                  <th className={styles.textRight}>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((shipment) => (
                  <tr key={shipment.id} className={styles.tableRow}>
                    <td className={styles.orderId}>{shipment.id}</td>
                    <td>{shipment.customer}</td>
                    <td>{shipment.courier}</td>
                    <td className={styles.trackingId}>{shipment.trackingId}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles[shipment.status.toLowerCase().replace(/ /g, '')]}`}>
                        {shipment.status}
                      </span>
                    </td>
                    <td>{shipment.shippedDate}</td>
                    <td>{shipment.deliveredDate}</td>
                    <td className={styles.textRight}>
                      <button className={styles.updateBtn}>UPDATE STATUS</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Delivery Zones & Pricing Section */}
      <section className={styles.section}>
        <div className={styles.headerStack}>
          <div>
            <h1 className={styles.title}>Delivery Zones & Pricing</h1>
            <p className={styles.subtitle}>Configure shipping rates based on geographical regions.</p>
          </div>
          <button className={styles.addZoneBtn}>
            <span className="material-symbols-outlined">add</span>
            ADD ZONE
          </button>
        </div>

        <div className={styles.zonesGrid}>
          {zones.map((zone, index) => (
            <div key={index} className={styles.zoneCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.zoneTitle}>{zone.title}</h3>
                <div className={styles.cardActions}>
                  <button className={`${styles.iconBtn} ${editingIndex === index ? styles.activeEdit : ''}`} onClick={() => handleToggleEdit(index)}>
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button className={`${styles.iconBtn} ${styles.deleteIcon}`} onClick={() => handleDeleteZone(index)}>
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>

              <div className={styles.regions} onClick={() => openRegionModal(index)}>
                {zone.regions.map((region) => (
                  <span key={region} className={styles.regionTag}>{region}</span>
                ))}
                {zone.extraRegions > 0 && (
                  <span className={styles.regionTag}>+{zone.extraRegions} MORE</span>
                )}
                <span className={styles.addRegionHint}>
                  <span className="material-symbols-outlined">add_circle</span>
                </span>
              </div>

              <div className={styles.pricingInfo}>
                <div className={styles.priceRow}>
                  <span className={styles.priceLabel}>SHIPPING CHARGE</span>
                  {editingIndex === index ? (
                    <div className={styles.inlineEditWrapper}>
                      <span className={styles.currencyPrefix}>₹</span>
                      <input 
                        className={styles.inlineInput} 
                        value={zone.charge} 
                        onChange={(e) => handleChargeChange(index, 'charge', e.target.value)}
                        autoFocus
                      />
                    </div>
                  ) : (
                    <span className={styles.priceValue} onClick={() => handleToggleEdit(index)}>₹{zone.charge}</span>
                  )}
                </div>
                <div className={styles.priceRow}>
                  <span className={styles.priceLabel}>FREE ABOVE</span>
                  {editingIndex === index ? (
                    <div className={styles.inlineEditWrapper}>
                      <span className={styles.currencyPrefix}>₹</span>
                      <input 
                        className={styles.inlineInput} 
                        value={zone.freeAbove} 
                        onChange={(e) => handleChargeChange(index, 'freeAbove', e.target.value)}
                      />
                    </div>
                  ) : (
                    <span className={styles.priceValue} onClick={() => handleToggleEdit(index)}>₹{zone.freeAbove}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          <div className={`${styles.zoneCard} ${styles.dotted}`}>
            <div className={styles.defineNew}>
              <span className="material-symbols-outlined">map</span>
              <h3 className={styles.defineTitle}>DEFINE NEW ZONE</h3>
              <p className={styles.defineSubtitle}>Add region specific rates</p>
            </div>
          </div>
        </div>
      </section>

      {/* Regions Selection Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Select Regions</h3>
              <button className={styles.closeModal} onClick={() => setIsModalOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.regionGrid}>
                {availableRegions.map(region => (
                  <button 
                    key={region}
                    className={`${styles.regionOption} ${selectedRegions.includes(region) ? styles.selectedRegion : ''}`}
                    onClick={() => toggleRegion(region)}
                  >
                    {region}
                    {selectedRegions.includes(region) && <span className="material-symbols-outlined">check</span>}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button className={styles.cancelModalBtn} onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className={styles.saveModalBtn} onClick={saveRegions}>Update Regions</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShippingManagement;
