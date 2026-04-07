import React, { useState } from 'react';
import styles from './CouponManagement.module.css';
import SearchFilter from '../../components/ui/SearchFilter';
import Toggle from '../../components/ui/Toggle';

const CouponManagement = () => {
  const [activeTab, setActiveTab] = useState('Active');
  const [selectedCouponCode, setSelectedCouponCode] = useState('FESTIVE25');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [coupons, setCoupons] = useState([
    {
      code: 'SILKHERITAGE15',
      type: 'Percentage',
      value: '15%',
      usage: '412 / 500',
      progress: 82,
      expiry: 'Oct 24, 2024',
      active: true
    },
    {
      code: 'FESTIVE25',
      type: 'Percentage',
      value: '25%',
      usage: '89 / 200',
      progress: 44.5,
      expiry: 'Dec 31, 2024',
      active: true
    },
    {
      code: 'WELCOME500',
      type: 'Flat',
      value: '₹500',
      usage: '1,202 / Unlimited',
      progress: 100,
      expiry: 'No Expiry',
      active: true,
      flat: true
    },
    {
      code: 'CURATORVIP',
      type: 'Percentage',
      value: '30%',
      usage: '12 / 50',
      progress: 24,
      expiry: 'Jan 15, 2025',
      active: true
    }
  ]);

  const handleToggleActive = (code) => {
    setCoupons(prev => prev.map(c => c.code === code ? { ...c, active: !c.active } : c));
  };

  const filteredCoupons = coupons.filter(c => 
    c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const usageHistory = [
    { id: '#TSC-8821', customer: 'Aditi Sharma', date: 'Oct 12, 2024', saved: '₹1,250' },
    { id: '#TSC-8794', customer: 'Meera V.', date: 'Oct 11, 2024', saved: '₹2,000' },
    { id: '#TSC-8750', customer: 'Rohan K.', date: 'Oct 10, 2024', saved: '₹1,840' },
    { id: '#TSC-8742', customer: 'Anjali Roy', date: 'Oct 10, 2024', saved: '₹1,100' }
  ];

  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.headerControls}>
            <SearchFilter 
              placeholder="Search codes..." 
              searchValue={searchTerm}
              onSearchChange={setSearchTerm}
              className={styles.searchFilterOverride}
            >
              <div className={styles.headerActions}>
                <nav className={styles.tabs}>
                  {['Active', 'Inactive', 'Expired'].map(tab => (
                    <button
                      key={tab}
                      className={`${styles.tab} ${activeTab === tab ? styles.activeTab : ''}`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </nav>
                <button className={styles.createBtn}>
                  <span className="material-symbols-outlined">add</span>
                  Create Coupon
                </button>
              </div>
            </SearchFilter>
          </div>

          <div className={styles.headerRight}>
            <div className="d-flex align-items-center gap-3 border-start ps-4">
              <span className="material-symbols-outlined text-secondary cursor-pointer">notifications</span>
              <span className="material-symbols-outlined text-secondary cursor-pointer">account_circle</span>
            </div>
          </div>
        </header>

        <div className="d-flex flex-grow-1 overflow-hidden">
          {/* Coupon Grid */}
          <section className={styles.gridSection}>
            <div className={styles.couponGrid}>
              {filteredCoupons.map((coupon) => (
                <div 
                  key={coupon.code}
                  className={`${styles.card} ${selectedCouponCode === coupon.code ? styles.selectedCard : ''}`}
                  onClick={() => {
                    setSelectedCouponCode(coupon.code);
                    setIsDrawerOpen(true);
                  }}
                >
                  <div className={styles.toggleWrapper} onClick={(e) => e.stopPropagation()}>
                    <Toggle 
                      checked={coupon.active} 
                      onChange={() => handleToggleActive(coupon.code)}
                    />
                  </div>
                  
                  <div className="mb-3">
                    <span className={`${styles.badge} ${coupon.flat ? styles.badgeFlat : styles.badgePercentage}`}>
                      {coupon.type}
                    </span>
                    <h3 className={styles.couponCode}>{coupon.code}</h3>
                  </div>

                  <div className={styles.discountValue}>
                    {coupon.value}
                    <span className={styles.discountLabel}>{coupon.flat ? 'Off' : 'Discount'}</span>
                  </div>

                  <div className={styles.statsSection}>
                    <div className={styles.statsHeader}>
                      <span>Usage Velocity</span>
                      <span>{coupon.usage}</span>
                    </div>
                    <div className={styles.progressBar}>
                      <div 
                        className={`${styles.progressFill} ${coupon.flat ? styles.progressFlat : ''}`} 
                        style={{ width: `${coupon.progress}%` }}
                      ></div>
                    </div>
                    <div className={styles.expiryInfo}>
                      <span className="material-symbols-outlined styles.expiryIcon">calendar_today</span>
                      {coupon.expiry.includes('No') ? '' : 'Expires: '}{coupon.expiry}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Right Drawer */}
          <aside className={`${styles.drawer} ${isDrawerOpen ? styles.drawerOpen : ''}`}>
            <div className={styles.drawerHeader}>
              <div>
                <h3 className={styles.drawerTitle}>Curate Policy</h3>
                <p className={styles.drawerSubtitle}>Editing: {selectedCouponCode}</p>
              </div>
              <button className={styles.closeBtn} onClick={() => setIsDrawerOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className={styles.drawerBody}>
              <div className={styles.formGrid}>
                <div className={styles.formGroupFull}>
                  <label className={styles.label}>Coupon Code</label>
                  <input type="text" className={`${styles.input} ${styles.inputLarge}`} value={selectedCouponCode} readOnly />
                </div>

                <div>
                  <label className={styles.label}>Discount Type</label>
                  <div className={styles.typeSelector}>
                    <button className={`${styles.typeBtn} ${styles.typeBtnActive}`}>Percentage</button>
                    <button className={styles.typeBtn}>Flat Amount</button>
                  </div>
                </div>

                <div>
                  <label className={styles.label}>Value</label>
                  <div className={styles.inputWrapper}>
                    <input type="number" className={styles.input} defaultValue="25" />
                    <span className={styles.inputAffix}>%</span>
                  </div>
                </div>

                <div>
                  <label className={styles.label}>Max Cap</label>
                  <input type="text" className={styles.input} defaultValue="₹2,000" />
                </div>

                <div>
                  <label className={styles.label}>Min Order</label>
                  <input type="text" className={styles.input} defaultValue="₹4,999" />
                </div>

                <div>
                  <label className={styles.label}>Total Limit</label>
                  <input type="number" className={styles.input} defaultValue="200" />
                </div>

                <div>
                  <label className={styles.label}>Per User</label>
                  <input type="number" className={styles.input} defaultValue="1" />
                </div>

                <div className={styles.formGroupFull}>
                  <label className={styles.label}>Expiry Date</label>
                  <input type="date" className={styles.input} defaultValue="2024-12-31" />
                </div>
              </div>

              <button className={styles.updateBtn}>Update Policy</button>

              <h4 className={styles.historyTitle}>Usage History</h4>
              <div className={styles.tableContainer}>
                <table className={styles.historyTable}>
                  <thead>
                    <tr className={styles.tableHeader}>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th className={styles.textRight}>Saved</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usageHistory.map((row, i) => (
                      <tr key={i} className={styles.tableRow}>
                        <td className={styles.tableCell}><span className={styles.orderId}>{row.id}</span></td>
                        <td className={styles.tableCell}><span className={styles.customerName}>{row.customer}</span></td>
                        <td className={styles.tableCell}><span className={styles.date}>{row.date}</span></td>
                        <td className={`${styles.tableCell} ${styles.amount}`}>{row.saved}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </aside>
        </div>
      </main>
      
      {/* Visual Texture Layer */}
      <div 
        className="position-fixed inset-0 pointer-events-none opacity-2 z-100" 
        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC6Rx20KGpv1jVnIQqeSLHKLcai_kiOaMEr5kIdJqNH0gf3F2GoCWh6aXu3USg-od_nmg4FXSWfpvTPl-bYfPrOXV-B8-u_441VbeivZyGhhHgBbrzhLBwwLNT73I5vtd4pdg1wbI2yb2kX8aAA9IecHujA2KuMXt2Wr1ImDm1Xx-h6B0huue2FA7uXFfn--uFAzxbyXd9aWfSJtJZsCqzfcwgehuxuICAP5wZ2_pfMxOmfbj-HPVZ-W5VFHGPodxlEtkvXeIt14Ok')", backgroundSize: '200px' }}
      ></div>
    </div>
  );
};

export default CouponManagement;
