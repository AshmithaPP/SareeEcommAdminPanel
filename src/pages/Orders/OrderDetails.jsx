import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './OrderDetails.module.css';

const OrderDetails = () => {
  const { id } = useParams();

  // Mock data matching the design
  const orderInfo = {
    id: id || 'SA-99210',
    date: 'Oct 24, 2023 at 2:14 PM',
    status: 'In Stock',
    customer: {
      name: 'Eleanor Bennett',
      email: 'e.bennett@silkcurator.com',
      phone: '+44 (0) 7700 900421',
    },
    address: {
      line1: '42 Knightsbridge',
      line2: 'Belgravia, London',
      postcode: 'SW1X 7JN',
      country: 'United Kingdom',
      instructions: '"Please leave with concierge if unavailable."',
    },
    items: [
      {
        name: 'Heritage Kanchipuram Gold',
        sku: 'SAR-KA-001',
        material: 'Hand-woven Silk',
        price: '£1,250.00',
        qty: 1,
        total: '£1,250.00',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDxRHpPCgzNLYv4shf4bfu36j4fd8vfvs1NO30UHLdoH8ClmrVadrZkTwiTcK0jrqQj1XVXeGg4-Cv9-pjkna8B1jaIrA4YMzXmkdXbHlMy3-cjg7s_JFmxy1VgtBs5pEJ7mndCXuUpGlxMWLGNNVl4reNJy5U5OFv-Ysb2t_l3XvnrwXbZ63T-1-OH6WDiEQChCHfZ8iYs8GgzMi5tLeu6s8tELH3lK7_oKzC6L5oFv7JJa0Vg0oCJusEERs-uKueclpAoG7-ahA',
      },
      {
        name: 'Artisan Pearl Kamarbandh',
        sku: 'ACC-KB-042',
        material: 'Sterling Silver Base',
        price: '£320.00',
        qty: 1,
        total: '£320.00',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEsuCCh2bzQbZ4a6CNnCsKXOhV0IaiXg-wMT5p-Oc5TIoQBKJKRR8_2ApR0X7BlGwJDe9P47ieezGPQFJZGPQFJZGY8u1oDy5DNfybLLjn11VQCnYVMojY6UDK7r86wpblope6805vyR4BrmFuzVYOvldFhEWk1g8O5LZIPeEHpNML0Ape7QdrOjYb2C5aiy3QX8CAcSJ5bk53MuesXRhUTq1uHLRmiLCyFbgAlvZZIZtiDFqOUPYhGYwZKxHziQjQP55sb_pv-osj9eblQ',
      },
    ],
    summary: {
      subtotal: '£1,570.00',
      shipping: '£25.00',
      insurance: '£15.00',
      total: '£1,610.00',
    },
    payment: {
      method: 'Visa Ending in *4421',
      status: 'Paid',
      transactionId: 'TXN_99210_BEE_LON',
    },
    history: [
      { title: 'Order Confirmed', date: 'Oct 24, 2023 • 2:45 PM', note: 'Verified by curator: Marcus V.', completed: true },
      { title: 'Payment Received', date: 'Oct 24, 2023 • 2:15 PM', completed: true },
      { title: 'Awaiting Shipment', date: 'Estimated delivery: Oct 28', completed: false, current: true },
      { title: 'Out for Delivery', completed: false, future: true },
    ],
  };

  return (
    <div className={styles.container}>
      {/* Hero Title Area - Now contains actions on the same line as the ID */}
      <div className={styles.heroSection}>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h2 className={`${styles.orderId} mt-0 mb-0`}>Order #{orderInfo.id}</h2>
          <div className={styles.headerActions}>
            <button className={styles.btnConfirm}>Confirm Order</button>
            <button className={styles.btnShipped}>Shipped</button>
          </div>
        </div>
        <div className={styles.statusRow}>
          <span className={styles.badgeInStock}>{orderInfo.status}</span>
          <span className={styles.orderDate}>Placed on {orderInfo.date}</span>
        </div>
      </div>

      <div className="row g-2">
        {/* Left Column */}
        <div className="col-12 col-lg-8">
          <div className="row g-2 mb-2">
            {/* Customer Info */}
            <div className="col-md-6">
              <div className={styles.bentoCard}>
                <div className={styles.cardHeader}>
                  <h3 className={`${styles.serifDisplay} ${styles.cardTitle}`}>Customer Info</h3>
                  <span className={`material-symbols-outlined ${styles.cardIcon}`}>person</span>
                </div>
                <div className={styles.infoGroup}>
                  <p className={styles.label}>Full Name</p>
                  <p className={styles.value}>{orderInfo.customer.name}</p>
                </div>
                <div className={styles.infoGroup}>
                  <p className={styles.label}>Email Address</p>
                  <p className={styles.value}>{orderInfo.customer.email}</p>
                </div>
                <div className={styles.infoGroup}>
                  <p className={styles.label}>Phone Number</p>
                  <p className={styles.value}>{orderInfo.customer.phone}</p>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="col-md-6">
              <div className={styles.bentoCard}>
                <div className={styles.cardHeader}>
                  <h3 className={`${styles.serifDisplay} ${styles.cardTitle}`}>Delivery Address</h3>
                  <span className={`material-symbols-outlined ${styles.cardIcon}`}>local_shipping</span>
                </div>
                <div className={styles.infoGroup}>
                  <p className={styles.value}>{orderInfo.address.line1}</p>
                  <p className={styles.value}>{orderInfo.address.line2}</p>
                  <p className={styles.value}>{orderInfo.address.postcode}</p>
                  <p className={styles.value}>{orderInfo.address.country}</p>
                </div>
                <div className={styles.specialInstructions}>
                  <p className={styles.label}>Special Instructions</p>
                  <p className={styles.italicText}>{orderInfo.address.instructions}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Ordered Items */}
          <div className={styles.itemsTableWrapper}>
            <div className="p-2 border-bottom">
              <h3 className={`${styles.serifDisplay} ${styles.cardTitle} mb-0`}>Ordered Items</h3>
            </div>
            <table className={styles.itemsTable}>
              <thead>
                <tr>
                  <th style={{ width: '50%' }}>Product Details</th>
                  <th className="text-center">Qty</th>
                  <th className="text-end">Price</th>
                  <th className="text-end">Total</th>
                </tr>
              </thead>
              <tbody>
                {orderInfo.items.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className={styles.productCell}>
                        <img src={item.image} alt={item.name} className={styles.thumbnail} />
                        <div>
                          <p className="fw-medium mb-1">{item.name}</p>
                          <p className={styles.sku}>SKU: {item.sku} • {item.material}</p>
                        </div>
                      </div>
                    </td>
                    <td className="text-center fw-medium font-body">{item.qty}</td>
                    <td className="text-end fw-medium font-body">{item.price}</td>
                    <td className={`text-end font-body ${styles.priceTotal}`}>{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-12 col-lg-4">
          <div className="vstack gap-2">
            {/* Order Summary */}
            <div className={styles.bentoCard}>
              <h3 className={`${styles.serifDisplay} ${styles.cardTitle} mb-2`}>Order Summary</h3>
              <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span className="fw-medium font-body text-dark">{orderInfo.summary.subtotal}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping (Premium Courier)</span>
                <span className="fw-medium font-body text-dark">{orderInfo.summary.shipping}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Insurance</span>
                <span className="fw-medium font-body text-dark">{orderInfo.summary.insurance}</span>
              </div>
              <div className={styles.totalRow}>
                <span className={`${styles.serifDisplay} ${styles.totalLabel}`}>Total</span>
                <span className={styles.totalValue}>{orderInfo.summary.total}</span>
              </div>
            </div>

            {/* Payment Info */}
            <div className={styles.bentoCard}>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h3 className={`${styles.serifDisplay} ${styles.cardTitle} mb-0`}>Payment Info</h3>
                <span className="material-symbols-outlined text-primary opacity-20" style={{ fontSize: '32px', fontVariationSettings: "'FILL' 1" }}>payments</span>
              </div>
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className={styles.visaBadge}>VISA</div>
                <p className="mb-0 fw-medium">{orderInfo.payment.method}</p>
              </div>
              <div className={styles.paymentStatus}>
                <div className={styles.statusDot}></div>
                <p className={`mb-0 ${styles.paymentStatusText}`}>Status: {orderInfo.payment.status}</p>
              </div>
              <p className={styles.sku}>Transaction ID: {orderInfo.payment.transactionId}</p>
            </div>

            {/* Order History */}
            <div className={styles.bentoCard}>
              <h3 className={`${styles.serifDisplay} ${styles.cardTitle} mb-2`}>Order History</h3>
              <div className={styles.timeline}>
                {orderInfo.history.map((step, index) => (
                  <div key={index} className={styles.timelineItem} style={{ opacity: step.future ? 0.4 : 1 }}>
                    <div className={`${styles.timelineMarker} ${step.future ? styles.timelineMarkerFuture : ''}`}>
                      {step.completed ? (
                        <span className="material-symbols-outlined text-primary" style={{ fontSize: '14px', fontWeight: 'bold' }}>check</span>
                      ) : step.current ? (
                        <div className={styles.markerPulse}></div>
                      ) : null}
                    </div>
                    <p className={styles.timelineTitle}>{step.title}</p>
                    {step.date && <p className={styles.timelineDate}>{step.date}</p>}
                    {step.note && <p className={`${styles.italicText} mt-1`} style={{ fontSize: '12px' }}>{step.note}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
