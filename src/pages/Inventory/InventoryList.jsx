import { useState } from 'react';
import styles from './InventoryList.module.css';
import SearchFilter from '../../components/ui/SearchFilter';

const initialInventoryData = [
  { id: 1, name: 'Maharaja Katan Silk Saree', variant: 'Deep Maroon · Hand-spun Silk', stock: 24, status: 'In Stock', updated: '2 hours ago' },
  { id: 2, name: 'Lotus Motif Organza', variant: 'Pearl White · Pure Organza', stock: 8, status: 'Low Stock', updated: 'May 12, 10:45 AM' },
  { id: 3, name: 'Zari Bordered Tussar', variant: 'Mustard Gold · Wild Silk', stock: 0, status: 'Out of Stock', updated: 'May 10, 04:12 PM' },
  { id: 4, name: 'Floral Jamdani Weave', variant: 'Emerald Green · Fine Muslin', stock: 12, status: 'In Stock', updated: 'May 09, 09:00 AM' },
  { id: 5, name: 'Midnight Banarasi Brocade', variant: 'Royal Blue · Heavy Silk', stock: 3, status: 'Low Stock', updated: 'May 08, 11:30 AM' },
  { id: 6, name: 'Sandstone Matka Silk', variant: 'Terracotta · Coarse Silk', stock: 45, status: 'In Stock', updated: 'May 07, 02:45 PM' },
];

const activityLogs = [
  { id: 101, variant: 'Lotus Motif (Pearl White)', type: 'Manual Adjustment', quantity: '+15', flow: '08 → 23', admin: 'A. Sharma', time: 'May 12, 11:20 AM' },
  { id: 102, variant: 'Katan Silk (Deep Maroon)', type: 'Order Placed (#9921)', quantity: '-02', flow: '26 → 24', admin: 'System', time: 'May 12, 09:15 AM' },
  { id: 103, variant: 'Zari Tussar (Mustard Gold)', type: 'Order Placed (#9918)', quantity: '-01', flow: '01 → 00', admin: 'System', time: 'May 11, 04:30 PM' },
  { id: 104, variant: 'Midnight Brocade (Royal Blue)', type: 'Manual Adjustment', quantity: '+05', flow: '10 → 15', admin: 'R. Mehta', time: 'May 11, 02:00 PM' },
  { id: 105, variant: 'Floral Jamdani (Emerald)', type: 'Order Placed (#9912)', quantity: '-04', flow: '16 → 12', admin: 'System', time: 'May 10, 11:45 AM' },
];

const InventoryList = () => {
  const [inventory, setInventory] = useState(initialInventoryData);
  const [editingItem, setEditingItem] = useState(null);
  const [newStock, setNewStock] = useState('');

  const handleEditClick = (item) => {
    setEditingItem(item);
    setNewStock(item.stock);
  };

  const handleSave = () => {
    if (!editingItem) return;
    
    setInventory(prev => prev.map(item => {
      if (item.id === editingItem.id) {
        const stockNum = parseInt(newStock) || 0;
        let status = 'In Stock';
        if (stockNum === 0) status = 'Out of Stock';
        else if (stockNum < 10) status = 'Low Stock';
        
        return { ...item, stock: stockNum, status, updated: 'Just now' };
      }
      return item;
    }));
    
    setEditingItem(null);
  };

  return (
    <div className={styles.inventoryContainer}>
      {/* Filters & Search */}
      <SearchFilter 
        placeholder="Search by product name..."
      >
        <div className={styles.filterWrapper}>
          <span className={styles.filterLabel}>Filter By Status</span>
          <div className={styles.filterButtonsGroup}>
            <button className={styles.filterButton}>
              <span className={`material-symbols-outlined ${styles.lowStockIcon}`}>emergency_home</span>
              Low Stock
            </button>
            <button className={styles.filterButton}>
              <span className={`material-symbols-outlined ${styles.outOfStockIcon}`}>cancel</span>
              Out of Stock
            </button>
          </div>
        </div>
      </SearchFilter>

      {/* Main Inventory Table */}
      <section className={styles.sectionCard}>
        <div className={styles.cardHeader}>
          <h2 className={`${styles.serif} ${styles.cardTitle}`}>Inventory Overview</h2>
          <span className={styles.skuCount}>Showing {inventory.length} Skus</span>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.customTable}>
            <thead>
              <tr className={styles.serif}>
                <th style={{ minWidth: '220px' }}>Product Name</th>
                <th style={{ minWidth: '180px' }}>Variant (Color + Fabric)</th>
                <th style={{ minWidth: '140px', textAlign: 'center' }}>Current Stock</th>
                <th style={{ minWidth: '140px' }}>Last Updated</th>
                <th style={{ minWidth: '80px', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map(item => (
                <tr key={item.id}>
                  <td className={styles.productName}>{item.name}</td>
                  <td className={styles.variantInfo}>{item.variant}</td>
                  <td className="text-center">
                    <span className={`${styles.stockBadge} ${
                      item.status === 'In Stock' ? styles.inStock : 
                      item.status === 'Low Stock' ? styles.lowStock : 
                      styles.outOfStock
                    }`}>
                      {item.status} ({item.stock >= 10 ? item.stock : `0${item.stock}`})
                    </span>
                  </td>
                  <td className={styles.variantInfo}>{item.updated}</td>
                  <td className="text-right">
                    <button 
                      className={styles.editBtn}
                      onClick={() => handleEditClick(item)}
                    >
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Activity Logs */}
      <section className={styles.sectionCard}>
        <div className={styles.cardHeader}>
          <h2 className={`${styles.serif} ${styles.cardTitle}`}>Activity Logs</h2>
        </div>
        <div className={styles.tableWrapper}>
          <table className={`${styles.customTable} ${styles.logTable}`}>
            <thead>
              <tr>
                <th style={{ minWidth: '180px' }}>Variant</th>
                <th style={{ minWidth: '150px' }}>Change Type</th>
                <th style={{ minWidth: '100px', textAlign: 'center' }}>Quantity</th>
                <th style={{ minWidth: '100px' }}>Stock Flow</th>
                <th style={{ minWidth: '100px' }}>Admin</th>
                <th style={{ minWidth: '140px' }}>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {activityLogs.map(log => (
                <tr key={log.id}>
                  <td className="fw-medium">{log.variant}</td>
                  <td>{log.type}</td>
                  <td className={`text-center ${log.quantity.startsWith('+') ? styles.qtyPos : styles.qtyNeg}`}>
                    {log.quantity}
                  </td>
                  <td className={styles.variantInfo}>{log.flow}</td>
                  <td>{log.admin}</td>
                  <td className={styles.timestamp}>{log.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Edit Inventory Modal */}
      {editingItem && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h3 className={`${styles.serif} ${styles.modalTitle}`}>Update Inventory</h3>
              <button className={styles.closeBtn} onClick={() => setEditingItem(null)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.inputGroup}>
                <label className={styles.inputLabel}>Product</label>
                <div className={styles.readonlyValue}>{editingItem.name}</div>
                <div className={styles.readonlySubValue}>{editingItem.variant}</div>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.inputLabel} htmlFor="stockInput">Adjust Stock Count</label>
                <input 
                  id="stockInput"
                  type="number" 
                  className={styles.modalInput}
                  value={newStock}
                  onChange={(e) => setNewStock(e.target.value)}
                  autoFocus
                />
              </div>

              <div className={styles.adjustmentNote}>
                <span className="material-symbols-outlined">info</span>
                This adjustment will be logged under your admin profile.
              </div>
            </div>

            <div className={styles.modalFooter}>
              <button className={styles.cancelBtn} onClick={() => setEditingItem(null)}>Cancel</button>
              <button className={styles.saveBtn} onClick={handleSave}>Update Stock</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryList;
