import React from 'react';
import styles from './CustomerDetails.module.css';

const CustomerDetails = () => {
  // Mock data based on the provided design
  const customer = {
    name: 'Aditi Rao Hydari',
    email: 'aditi.hydari@royalcurations.com',
    phone: '+91 98765 43210',
    joinedDate: 'Oct 12, 2022',
    type: 'High Value Customer',
    stats: {
      totalSpend: '₹8,45,000',
      purchases: 14,
      returnRate: '7.2%',
      score: 'A+'
    },
    orders: [
      { id: '#SC-90231', date: 'Oct 24', items: 'Banarasi Silk', status: 'Delivered', total: '₹84,500' },
      { id: '#SC-89112', date: 'Sep 12', items: 'Kanjeevaram', status: 'Delivered', total: '₹1,20,000' },
      { id: '#SC-88402', date: 'Aug 05', items: 'Chanderi Silk', status: 'Returned', total: '₹12,400' }
    ],
    addresses: [
      { type: 'Residence (Home)', address: 'Flat 402, Royal Residency, Jubilee Hills, Hyderabad', isPrimary: true }
    ],
    notes: [
      { author: 'Rahul Sharma', time: '2d ago', text: '"Prefers heavy zari work but lightweight fabric. Show silk-organza."', isPrimary: true },
      { author: 'Ananya K.', time: 'Nov 15', text: '"Discussed bespoke blouse stitching. Vintage patterns."', isPrimary: false }
    ]
  };

  return (
    <div className={styles.customerDetailsContainer}>
      {/* Customer Header */}
      <section className={styles.headerSection}>
        <div className="flex-grow-1">
          <div className={styles.badge}>{customer.type}</div>
          <h2 className={styles.customerName}>{customer.name}</h2>
          <div className={styles.contactInfo}>
            <div className={styles.infoItem}>
              <span className={`material-symbols-outlined ${styles.infoIcon}`}>mail</span>
              {customer.email}
            </div>
            <div className={styles.infoItem}>
              <span className={`material-symbols-outlined ${styles.infoIcon}`}>call</span>
              {customer.phone}
            </div>
            <div className={styles.infoItem}>
              <span className={`material-symbols-outlined ${styles.infoIcon}`}>calendar_today</span>
              {customer.joinedDate}
            </div>
          </div>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnBlock}>Block</button>
          <button className={styles.btnSendMessage}>Send Message</button>
        </div>
      </section>

      {/* Stats Bar */}
      <section className={styles.statsBar}>
        <div className={styles.statCard}>
          <div>
            <p className={styles.statLabel}>Total Spend</p>
            <p className={`${styles.statValue} ${styles.statValuePrimary}`}>{customer.stats.totalSpend}</p>
          </div>
          <span className={`material-symbols-outlined ${styles.statIcon} ${styles.statIconPrimary}`}>payments</span>
        </div>
        <div className={styles.statCard}>
          <div>
            <p className={styles.statLabel}>Purchases</p>
            <p className={styles.statValue}>{customer.stats.purchases}</p>
          </div>
          <span className={`material-symbols-outlined ${styles.statIcon}`}>shopping_bag</span>
        </div>
        <div className={styles.statCard}>
          <div>
            <p className={styles.statLabel}>Return Rate</p>
            <p className={styles.statValue}>{customer.stats.returnRate}</p>
          </div>
          <span className={`material-symbols-outlined ${styles.statIcon}`}>assignment_return</span>
        </div>
        <div className={styles.statCard}>
          <div>
            <p className={styles.statLabel}>Score</p>
            <p className={`${styles.statValue} ${styles.statValueSecondary}`}>{customer.stats.score}</p>
          </div>
          <span className={`material-symbols-outlined ${styles.statIcon} ${styles.statIconSecondary}`}>grade</span>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className={styles.contentGrid}>
        {/* Left: Orders Table */}
        <section className={styles.mainCard}>
          <div className={styles.tabs}>
            <button className={`${styles.tab} ${styles.activeTab}`}>Orders</button>
            <button className={styles.tab}>Returns</button>
            <button className={styles.tab}>Wishlist</button>
          </div>
          
          <div className={styles.tableContainer}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Recent History</h3>
              <div className={styles.tableActions}>
                <button className={styles.iconBtn}><span className="material-symbols-outlined" style={{fontSize: '1.1rem'}}>filter_list</span></button>
                <button className={styles.iconBtn}><span className="material-symbols-outlined" style={{fontSize: '1.1rem'}}>download</span></button>
              </div>
            </div>

            <div className={styles.scrollArea}>
              <table className={styles.customTable}>
                <thead>
                  <tr className={styles.tableHeadRow}>
                    <th>ID</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Status</th>
                    <th className="text-end">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {customer.orders.map((order, index) => (
                    <tr key={index} className={styles.tableRow}>
                      <td className="fw-medium">{order.id}</td>
                      <td className="text-muted">{order.date}</td>
                      <td className="text-muted">{order.items}</td>
                      <td>
                        <span className={`${styles.statusBadge} ${
                          order.status === 'Delivered' 
                            ? (index === 1 ? styles.statusDeliveredAlt : styles.statusDelivered) 
                            : styles.statusReturned
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="text-end fw-bold">{order.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.tableFooter}>
              <p className={styles.footerText}>1 to 3 of 24 orders</p>
              <div className={styles.pagination}>
                <button className={`${styles.pageBtn} ${styles.prevBtn}`} disabled>Prev</button>
                <button className={`${styles.pageBtn} ${styles.nextBtn}`}>Next</button>
              </div>
            </div>
          </div>
        </section>

        {/* Right Column */}
        <div className={styles.sideColumn}>
          {/* Addresses */}
          <section className={styles.sideCard}>
            <div className={styles.sideCardHeader}>
              <h3 className={styles.cardTitle}>Addresses</h3>
              <button className={styles.newAddrBtn}>
                <span className="material-symbols-outlined" style={{fontSize: '1.1rem'}}>add</span> New
              </button>
            </div>
            <div className={styles.addressBox}>
              <div>
                <div className={styles.addrTitle}>
                  {customer.addresses[0].type}
                  {customer.addresses[0].isPrimary && <span className={styles.primaryBadge}>Primary</span>}
                </div>
                <p className={styles.addrText}>{customer.addresses[0].address}</p>
              </div>
              <span className="material-symbols-outlined text-muted cursor-pointer" style={{fontSize: '1.1rem'}}>edit</span>
            </div>
          </section>

          {/* Admin Notes */}
          <section className={`${styles.sideCard} ${styles.notesCard}`}>
            <h3 className={styles.cardTitle} style={{marginBottom: '1rem'}}>Admin Notes</h3>
            <div className={styles.notesList}>
              {customer.notes.map((note, index) => (
                <div key={index} className={`${styles.noteItem} ${!note.isPrimary ? styles.noteItemAlt : ''}`}>
                  <div className={styles.noteMeta}>
                    <span className={`${styles.authorName} ${!note.isPrimary ? styles.authorNameAlt : ''}`}>{note.author}</span>
                    <span className={styles.noteTime}>{note.time}</span>
                  </div>
                  <p className={styles.noteText}>{note.text}</p>
                </div>
              ))}
            </div>
            <div className={styles.noteInputArea}>
              <textarea className={styles.textarea} placeholder="Add note..."></textarea>
              <button className={styles.btnPostNote}>Post Note</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
