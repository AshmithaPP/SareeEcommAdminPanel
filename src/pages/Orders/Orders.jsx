import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Orders.module.css';

const Orders = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Pending', 'Confirmed', 'Shipped', 'Cancelled'];

  const ordersData = [
    {
      id: '#AT-94821',
      customer: 'Eleanor Merchant',
      initials: 'EM',
      amount: '$3,450.00',
      paymentStatus: 'Paid',
      orderStatus: 'Shipped',
      date: 'Oct 12, 2023',
    },
    {
      id: '#AT-94825',
      customer: 'Julian Karswell',
      initials: 'JK',
      amount: '$1,280.50',
      paymentStatus: 'Pending',
      orderStatus: 'Confirmed',
      date: 'Oct 14, 2023',
    },
    {
      id: '#AT-94830',
      customer: 'Sienna Al-Fayed',
      initials: 'SA',
      amount: '$5,600.00',
      paymentStatus: 'Paid',
      orderStatus: 'Pending',
      date: 'Oct 15, 2023',
    },
    {
      id: '#AT-94833',
      customer: 'Tobias Blackwood',
      initials: 'TB',
      amount: '$920.00',
      paymentStatus: 'Unpaid',
      orderStatus: 'Pending',
      date: 'Oct 15, 2023',
    },
    {
      id: '#AT-94838',
      customer: 'Victoria Laurent',
      initials: 'VL',
      amount: '$12,400.00',
      paymentStatus: 'Paid',
      orderStatus: 'Shipped',
      date: 'Oct 16, 2023',
    },
  ];

  const getPaymentBadgeClass = (status) => {
    switch (status) {
      case 'Paid': return styles.badgePaid;
      case 'Pending': return styles.badgePending;
      case 'Unpaid': return styles.badgeUnpaid;
      default: return '';
    }
  };

  const getOrderBadgeClass = (status) => {
    switch (status) {
      case 'Shipped': return styles.badgeShipped;
      case 'Confirmed': return styles.badgeConfirmed;
      case 'Pending': return styles.badgePending;
      default: return '';
    }
  };

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>Order Management</h1>
          <p className={styles.subtitle}>Reviewing the digital logs of the Silk Curator atelier.</p>
        </div>
        <div className={styles.filterGroup}>
          {filters.map((filter) => (
            <button
              key={filter}
              className={`${styles.filterBtn} ${activeFilter === filter ? styles.activeFilter : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Table Section */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer Name</th>
              <th>Amount</th>
              <th>Payment Status</th>
              <th>Order Status</th>
              <th>Date</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ordersData.map((order) => (
              <tr key={order.id} className={styles.tableRow}>
                <td className={styles.rowOrderId}>{order.id}</td>
                <td>
                  <div className={styles.customerCell}>
                    <div className={styles.avatar}>{order.initials}</div>
                    <span className={styles.customerName}>{order.customer}</span>
                  </div>
                </td>
                <td className="font-inter font-bold">{order.amount}</td>
                <td>
                  <span className={`${styles.badge} ${getPaymentBadgeClass(order.paymentStatus)}`}>
                    {order.paymentStatus}
                  </span>
                </td>
                <td>
                  <span className={`${styles.badge} ${getOrderBadgeClass(order.orderStatus)}`}>
                    {order.orderStatus}
                  </span>
                </td>
                <td className="text-muted">{order.date}</td>
                <td style={{ textAlign: 'right' }}>
                  <Link to={`/orders/${order.id.replace('#', '')}`} className={styles.viewLink}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Footer */}
        <div className={styles.footer}>
          <p className={styles.showingText}>Showing 5 of 124 Orders</p>
          <div className={styles.pagination}>
            <button className={`${styles.pageLink} ${styles.disabled}`}>
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>west</span>
              Previous
            </button>
            <button className={styles.pageLink}>
              Next <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>east</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className={`${styles.statsGrid} row g-4`}>
        <div className="col-12 col-md-3">
          <div className={styles.statCard}>
            <p className={styles.statLabel}>Total Volume</p>
            <p className={styles.statValue}>$428,950.00</p>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className={styles.statCard}>
            <p className={styles.statLabel}>Pending Fulfillment</p>
            <p className={`${styles.statValue} ${styles.statPrimary}`}>18 Orders</p>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className={styles.statCard}>
            <p className={styles.statLabel}>Avg. Basket Value</p>
            <p className={styles.statValue}>$2,840.00</p>
          </div>
        </div>
        <div className="col-12 col-md-3">
          <div className={`${styles.statCard} ${styles.statCardGrowth}`}>
            <p className={`${styles.statLabel} ${styles.statLabelGrowth}`}>Monthly Growth</p>
            <p className={`${styles.statValue} ${styles.statSecondary}`}>+12.4%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
