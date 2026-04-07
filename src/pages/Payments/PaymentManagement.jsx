import React, { useState } from 'react';
import styles from './PaymentManagement.module.css';

const MOCK_TRANSACTIONS = [
  {
    id: 'ORD-9821',
    customer: 'Ananya Sharma',
    date: 'Oct 24',
    amount: '₹42,500.00',
    method: 'NetBanking',
    methodIcon: 'account_balance',
    gateway: 'Razorpay',
    status: 'Paid',
    transactionId: 'PAY-77281-Z90',
    authId: 'AUTH_928311X',
    email: 'ananya.s@email.com'
  },
  {
    id: 'ORD-9819',
    customer: 'Vikram Mehra',
    date: 'Oct 23',
    amount: '₹18,200.00',
    method: 'UPI',
    methodIcon: 'payments',
    gateway: 'PhonePe',
    status: 'Pending',
    transactionId: 'PAY-77280-A11',
    authId: 'AUTH_928310Y',
    email: 'vikram.m@email.com'
  },
  {
    id: 'ORD-9815',
    customer: 'Priya Iyer',
    date: 'Oct 22',
    amount: '₹56,000.00',
    method: 'COD',
    methodIcon: 'local_shipping',
    gateway: 'Direct Delivery',
    status: 'COD Pending',
    transactionId: 'PAY-77278-B22',
    authId: 'N/A',
    email: 'priya.i@email.com'
  },
  {
    id: 'ORD-9810',
    customer: 'Rohan Das',
    date: 'Oct 21',
    amount: '₹24,900.00',
    method: 'Visa Card',
    methodIcon: 'credit_card',
    gateway: 'Stripe',
    status: 'Failed',
    transactionId: 'PAY-77275-C33',
    authId: 'ERR_928305Z',
    email: 'rohan.d@email.com'
  }
];

const PaymentManagement = () => {
  const [selectedTransaction, setSelectedTransaction] = useState(MOCK_TRANSACTIONS[0]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isJsonOpen, setIsJsonOpen] = useState(false);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Paid': return styles.statusPaid;
      case 'Pending': return styles.statusPending;
      case 'Failed': return styles.statusFailed;
      case 'COD Pending': return styles.statusPendingCOD;
      default: return '';
    }
  };

  return (
    <div className={styles.paymentContainer}>
      {/* Left Panel: Transaction Register */}
      <section className={styles.leftPanel}>
        <div className={styles.filterBar}>
          <div className={styles.filterHeader}>
            <h2 className={styles.title}>Transaction Register</h2>
            <div className={styles.statusFilter}>
              {['All', 'Paid', 'Pending', 'Refunded', 'Failed'].map((filter) => (
                <button
                  key={filter}
                  className={`${styles.filterBtn} ${activeFilter === filter ? styles.filterBtnActive : ''}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.searchBar}>
            <div className={styles.inputWrapper}>
              <span className={`material-symbols-outlined ${styles.searchIcon}`}>search</span>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search Transaction ID or Customer..."
              />
            </div>
            <div className={styles.datePicker}>
              <span className={`material-symbols-outlined ${styles.calendarIcon}`}>calendar_month</span>
              <span className={styles.dateText}>Oct 01 — Oct 31</span>
            </div>
          </div>
        </div>

        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th className={styles.tableHeaderCell}>Order Details</th>
                <th className={styles.tableHeaderCell}>Amount</th>
                <th className={styles.tableHeaderCell}>Method</th>
                <th className={styles.tableHeaderCell}>Status</th>
                <th className={`${styles.tableHeaderCell} ${styles.tableHeaderCellLast}`}>Action</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_TRANSACTIONS.map((tx) => (
                <tr
                  key={tx.id}
                  className={`${styles.tableRow} ${selectedTransaction.id === tx.id ? styles.tableRowSelected : ''}`}
                >
                  <td className={`${styles.tableCell} ${styles.tableCellFirst} ${selectedTransaction.id === tx.id ? styles.tableCellSelected : ''}`}>
                    <div className={styles.orderId}>{tx.id}</div>
                    <div className={styles.customerInfo}>{tx.customer} • {tx.date}</div>
                  </td>
                  <td className={styles.tableCell}>
                    <div className={styles.amount}>{tx.amount}</div>
                  </td>
                  <td className={styles.tableCell}>
                    <div className={styles.methodWrapper}>
                      <span className={`material-symbols-outlined ${styles.methodIcon}`}>{tx.methodIcon}</span>
                      <span className={styles.methodName}>{tx.method}</span>
                    </div>
                    <div className={styles.gatewayName}>{tx.gateway}</div>
                  </td>
                  <td className={styles.tableCell}>
                    <span className={`${styles.statusBadge} ${getStatusClass(tx.status)}`}>
                      {tx.status === 'COD Pending' ? 'Pending' : tx.status}
                    </span>
                  </td>
                  <td className={`${styles.tableCell} ${styles.tableCellLast}`}>
                    <button
                      className={`${styles.actionBtn} ${selectedTransaction.id === tx.id ? styles.actionBtnActive : ''}`}
                      onClick={() => setSelectedTransaction(tx)}
                    >
                      <span className="material-symbols-outlined">visibility</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Right Panel: Details & Actions */}
      <section className={styles.rightPanel}>
        {/* Transaction Details Card */}
        <div className={styles.detailsCard}>
          <div className={styles.cardHeaderCentered}>
            <h3 className={styles.cardTitle}>Transaction Details</h3>
            <p className={styles.transactionId}>{selectedTransaction.transactionId}</p>
            <span className={styles.verifiedBadge}>
              <span>VERIFIED</span>
              <span>PAYMENT</span>
            </span>
          </div>

          <div className={styles.detailsGrid}>
            <div>
              <p className={styles.label}>Customer</p>
              <p className={styles.value}>{selectedTransaction.customer}</p>
              <p className={styles.subValue}>{selectedTransaction.email}</p>
            </div>
            <div>
              <p className={styles.label}>Amount Settled</p>
              <p className={styles.largeAmount}>{selectedTransaction.amount}</p>
            </div>
            <div>
              <p className={styles.label}>Gateway</p>
              <p className={styles.value}>{selectedTransaction.gateway} Business</p>
            </div>
            <div>
              <p className={styles.label}>Bank Auth ID</p>
              <p className={styles.monoValue}>{selectedTransaction.authId}</p>
            </div>
          </div>

          {/* Collapsible JSON Block */}
          <div className={styles.jsonViewer}>
            <div
              className={styles.jsonSummary}
              onClick={() => setIsJsonOpen(!isJsonOpen)}
            >
              <span className={`material-symbols-outlined ${isJsonOpen ? 'rotate-180' : ''}`} style={{ transition: 'transform 0.3s' }}>
                expand_more
              </span>
              View Raw Response JSON
            </div>
            {isJsonOpen && (
              <div className={styles.jsonContent}>
{`{
  "id": "${selectedTransaction.transactionId.toLowerCase().replace(/-/g, '_')}",
  "status": "${selectedTransaction.status === 'Paid' ? 'captured' : 'pending'}",
  "amount": ${parseInt(selectedTransaction.amount.replace(/[^0-9]/g, '')) * 100},
  "currency": "INR",
  "method": "${selectedTransaction.method.toLowerCase()}",
  "bank": "HDFC",
  "captured": ${selectedTransaction.status === 'Paid' ? 'true' : 'false'},
  "created_at": 1698124800
}`}
              </div>
            )}
          </div>
        </div>

        {/* Contextual Action: Mark as Paid for COD */}
        {/* Exact Delivery Payment Card as per image */}
        <div className={styles.deliveryCardCompact}>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h3 className={styles.deliveryTitle}>Delivery Payment</h3>
              <p className={styles.deliverySub}>Awaiting Cash Collection</p>
            </div>
            <span className={`material-symbols-outlined ${styles.deliveryIcon}`}>payments</span>
          </div>
        </div>

        {/* Refund Management Panel */}
        <div className={styles.refundCard}>
          <div className="d-flex align-items-center gap-3 mb-4">
            <span className="material-symbols-outlined" style={{ color: '#C9A84C' }}>keyboard_return</span>
            <h3 className={styles.cardTitle} style={{ fontSize: '20px' }}>Initiate Refund</h3>
          </div>

          <div className={styles.refundAmountDisplay}>
            <span className={styles.label} style={{ marginBottom: 0 }}>Settled Amount</span>
            <span className={styles.value}>{selectedTransaction.amount}</span>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Refund Amount</label>
            <div className="position-relative">
              <span className={styles.currencyPrefix}>₹</span>
              <input
                type="text"
                className={styles.refundInput}
                defaultValue={selectedTransaction.amount.replace('₹', '')}
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Reason for Refund</label>
            <textarea
              className={styles.textarea}
              placeholder="State reason for processing (e.g., Fabric Defect, Order Cancellation)..."
            />
          </div>

          <button className={styles.secondaryActionBtn}>
            Initiate Refund Process
          </button>

          {/* Refund History */}
          <div className={styles.historySection}>
            <h4 className={styles.historyTitle}>Refund History</h4>
            <div className={styles.emptyState}>
              <p className={styles.emptyText}>No refund history available for this record.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative Blur */}
      <div className={styles.decorativeBlur}>
        <div className={styles.blurCircle}></div>
      </div>
    </div>
  );
};

export default PaymentManagement;
