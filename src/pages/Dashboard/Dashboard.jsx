import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  AlertOctagon,
  Clock,
  CreditCard
} from 'lucide-react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [activeToggle, setActiveToggle] = useState('daily');

  const chartData = [
    { name: 'Jan', revenue: 20 },
    { name: 'Feb', revenue: 35 },
    { name: 'Mar', revenue: 15 },
    { name: 'Apr', revenue: 50 },
    { name: 'May', revenue: 35 },
    { name: 'Jun', revenue: 60 },
    { name: 'Jul', revenue: 40 },
    { name: 'Aug', revenue: 75 },
  ];

  const topProducts = [
    {
      id: 1,
      name: 'Kanchipuram Crimson',
      units: '124 Units',
      rank: '#1',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANMwbn6DymeC1WM5KrRfBN1t4VsJoXO5yFZ1x_PrPkHqItS_IqX6M8WADaKi8nLd8SJmolgT9EoilHGgzw6Tve-lBPOQQdtcmmu9Z5s6CAjkthan9dFG6tG1Rlb23p9QKGzmp2H1TSb5y46-s1sONjOGQ5hqOLXF2i3lPm8IxiZ5wRqO7tk_Bk7nmv94SjqYDqZ4uajIP6j8pGhXIf9ZW4X-_Glf9EE-2fl9rqbqTPJOl5AyUtnUN8PZqiuCl-qy3db9MZrYfXwgI'
    },
    {
      id: 2,
      name: 'Banarasi Lavender',
      units: '98 Units',
      rank: '#2',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6ctphZz4IKXAb_BRFoS21mB6JZOlf-yfC7Bjge3AFMKT_PgalSTLwrGrTS6fCig4-KIqbxDv7VUOerhdUPAZxWhSV4uSHrGKAnkVfYxLK_h2JOYCOxr7BWixUs2wba5jfBXHjfi9yK4-14qU7srU0fEC5LD7uuBAfRLb-K6ImpPnxcMBXGdhybyzbE_VUCskGgV_9CTKlSr1pEJ6FrCd26vIvnQlDKaXjiWgef8gHg25DkxVtzChbI8Ftj_UfvjW3dlxS87RTMns'
    },
    {
      id: 3,
      name: 'Emerald Zari',
      units: '85 Units',
      rank: '#3',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6LP97VcvzpK-i8vUFi8UiBjmfMCvfXntojCY1cXZgR6bmSt04MO1Wm9q6-AYW9vLRWv7t4uxHAO6IxHenZLteFcNVyiRmBMaqR_Qbv9rfxBuaihRb8SuD49X6CES5sgJjnLLiSr8nNaM7YdAP-Tg_2uTPM6sZGfi0kUdbGSWJ6koXsyuLuGh_P2Gp9zdGIiLP-wNYwgl0ecnrQT1DdRgONfw6bzfH93mzM7zM5JLY46sk8aRYuZRUrJhTD4PMPuNt_B4V-8_kqCI'
    }
  ];

  const recentOrders = [
    { id: '#TSC-8492', customer: 'Ananya Sharma',  city: 'Mumbai',    amount: '₹45,200', status: 'Delivered',  date: 'Oct 24' },
    { id: '#TSC-8493', customer: 'Priyanka Rao',   city: 'Bangalore', amount: '₹32,500', status: 'Processing', date: 'Oct 24' },
    { id: '#TSC-8494', customer: 'Deepika P.',     city: 'Chennai',   amount: '₹28,900', status: 'Delivered',  date: 'Oct 25' },
    { id: '#TSC-8495', customer: 'Vidya Balan',    city: 'Mumbai',    amount: '₹55,000', status: 'Processing', date: 'Oct 25' },
  ];

  return (
    <div className={styles.dashboardContainer}>

      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Curatorial Overview</h1>
        <p className={styles.subtitle}>Managing the threads of heritage.</p>
      </header>

      {/* Row 1: KPI Grid + Chart */}
      <div className={styles.topRow}>

        {/* KPI Grid */}
        <div className={styles.kpiCardWrapper}>
          <div className={styles.kpiGrid}>

            <div className={styles.kpiCard}>
              <div className={styles.kpiHeader}>
                <span className={styles.kpiLabel}>Total Revenue</span>
                <span className={`${styles.badge} ${styles.badgeUp}`}>
                  <TrendingUp size={9} style={{ marginRight: 3 }} />12%
                </span>
              </div>
              <div className={styles.kpiValue}>₹12.5M</div>
            </div>

            <div className={styles.kpiCard}>
              <div className={styles.kpiHeader}>
                <span className={styles.kpiLabel}>Total Orders</span>
                <span className={`${styles.badge} ${styles.badgeUp}`}>
                  <TrendingUp size={9} style={{ marginRight: 3 }} />8%
                </span>
              </div>
              <div className={styles.kpiValue}>482</div>
            </div>

            <div className={styles.kpiCard}>
              <div className={styles.kpiHeader}>
                <span className={styles.kpiLabel}>Total Customers</span>
                <span className={`${styles.badge} ${styles.badgeDown}`}>
                  <TrendingDown size={9} style={{ marginRight: 3 }} />4%
                </span>
              </div>
              <div className={styles.kpiValue}>1,240</div>
            </div>

            <div className={styles.kpiCard}>
              <div className={styles.kpiHeader}>
                <span className={styles.kpiLabel}>Active Products</span>
                <span className={`${styles.badge} ${styles.badgeNeutral}`}>Stable</span>
              </div>
              <div className={styles.kpiValue}>85</div>
            </div>

          </div>
        </div>

        {/* Chart */}
        <div className={styles.chartCardWrapper}>
          <div className={styles.contentCard}>
            <div className={styles.chartHeader}>
              <h4 className={styles.cardTitle}>Revenue Over Time</h4>
              <div className={styles.toggleGroup}>
                <button
                  className={`${styles.toggleBtn} ${activeToggle === 'daily' ? styles.toggleBtnActive : ''}`}
                  onClick={() => setActiveToggle('daily')}
                >Daily</button>
                <button
                  className={`${styles.toggleBtn} ${activeToggle === 'monthly' ? styles.toggleBtnActive : ''}`}
                  onClick={() => setActiveToggle('monthly')}
                >Monthly</button>
              </div>
            </div>
            <div className={styles.chartArea}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#C9A84C" stopOpacity={0.12} />
                      <stop offset="95%" stopColor="#C9A84C" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="rgba(208,197,178,0.15)" strokeDasharray="0" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 9, fontWeight: 700, fill: '#9a917e', letterSpacing: '0.08em' }}
                    dy={10}
                  />
                  <YAxis hide domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      fontSize: '11px',
                      borderRadius: '8px',
                      border: '1px solid rgba(208,197,178,0.25)',
                      backgroundColor: 'rgba(255,255,255,0.95)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    }}
                    itemStyle={{ color: '#C9A84C', fontWeight: 700 }}
                    labelStyle={{ color: '#4d4637', fontWeight: 700, fontSize: 10 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#C9A84C"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                    strokeLinecap="round"
                    animationDuration={1200}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>

      {/* Row 2: Top Products + Recent Orders */}
      <div className={styles.middleRow}>

        {/* Top Products */}
        <div className={styles.productCardWrapper}>
          <div className={styles.contentCard}>
            <div className={styles.cardTitleRow}>
              <h4 className={styles.cardTitle}>Top Products</h4>
            </div>
            <div className={styles.productList}>
              {topProducts.map((product) => (
                <div key={product.id} className={styles.productRow}>
                  <img src={product.image} alt={product.name} className={styles.productImg} />
                  <div className={styles.productInfo}>
                    <p className={styles.productName}>{product.name}</p>
                    <p className={styles.productStats}>{product.units}</p>
                  </div>
                  <span className={styles.rank}>{product.rank}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className={styles.orderCardWrapper}>
          <div className={styles.contentCard}>
            <div className={styles.cardTitleRow}>
              <h4 className={styles.cardTitle}>Recent Orders</h4>
              <button className={styles.viewAllBtn}>View All</button>
            </div>
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th className={styles.thCenter}>Status</th>
                    <th className={styles.thRight}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id}>
                      <td className={styles.monoCell}>{order.id}</td>
                      <td>
                        <p className={styles.customerName}>{order.customer}</p>
                        <p className={styles.customerCity}>{order.city}</p>
                      </td>
                      <td className={styles.amountCell}>{order.amount}</td>
                      <td className={styles.statusCell}>
                        <span className={`${styles.statusBadge} ${order.status === 'Delivered' ? styles.statusDelivered : styles.statusProcessing}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className={styles.dateCell}>{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      {/* Row 3: Operational Alerts */}
      <section className={styles.alertsSection}>
        <div className={styles.alertsSectionHeader}>
          <AlertTriangle size={16} className={styles.alertsIcon} />
          <h4 className={styles.alertsSectionTitle}>Operational Alerts</h4>
        </div>
        <div className={styles.alertsGrid}>

          <div className={`${styles.alertCard} ${styles.alertWarn}`}>
            <div>
              <p className={styles.alertLabel}>Low Stock</p>
              <p className={`${styles.alertValue} ${styles.alertValueWarn}`}>12</p>
            </div>
            <AlertTriangle size={18} style={{ color: '#C9A84C', flexShrink: 0 }} />
          </div>

          <div className={`${styles.alertCard} ${styles.alertDanger}`}>
            <div>
              <p className={styles.alertLabel}>Out of Stock</p>
              <p className={`${styles.alertValue} ${styles.alertValueDanger}`}>03</p>
            </div>
            <AlertOctagon size={18} style={{ color: '#ba1a1a', flexShrink: 0 }} />
          </div>

          <div className={`${styles.alertCard} ${styles.alertNeutral}`}>
            <div>
              <p className={styles.alertLabel}>Pending Orders</p>
              <p className={`${styles.alertValue} ${styles.alertValueNeutral}`}>15</p>
            </div>
            <Clock size={18} style={{ color: 'var(--on-surface-variant)', flexShrink: 0 }} />
          </div>

          <div className={`${styles.alertCard} ${styles.alertSoftDanger}`}>
            <div>
              <p className={styles.alertLabel}>Failed Payments</p>
              <p className={`${styles.alertValue} ${styles.alertValueDanger}`}>02</p>
            </div>
            <CreditCard size={18} style={{ color: 'rgba(186,26,26,0.4)', flexShrink: 0 }} />
          </div>

        </div>
      </section>

    </div>
  );
};

export default Dashboard;