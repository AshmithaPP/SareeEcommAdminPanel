import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchFilter from '../../components/ui/SearchFilter';
import styles from './CustomerList.module.css';

const CustomerList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const customers = [
    {
      id: 1,
      name: 'Ananya Sharma',
      email: 'ananya.sharma@vogue.in',
      phone: '+91 98765 43210',
      registration: 'Oct 12, 2023',
      orders: 14,
      ltv: '₹ 8,42,000',
      status: 'Active',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc0zIxMy1AhZERDaeVjld9WWrmfjx5Xk8moEM7Uiw8SwaSkktyH3D8sD4ZR49nbuYvqhPFyhR9uT93kmf2sG9D4j3kOAS6kJYIR68-X7d9Ch-fiRSretyu7sTE8Wm_vA2d9XLSFW9ObF56jJ0JCnNBAZv5Sef-JZ1-9Uu2uBVgMHxUBkgIPDxZixawVKeQhzikYnof3yN4c1ASA27lbhe0tgw2ySX2QHuBNs6jpV1YCmIJM-YsF_GVSGSSGiaxjLYLCPZgA0IsNzA'
    },
    {
      id: 2,
      name: 'Vikram Malhotra',
      email: 'v.malhotra@archdigest.com',
      phone: '+91 90000 12345',
      registration: 'Jan 05, 2024',
      orders: 3,
      ltv: '₹ 1,15,000',
      status: 'Active',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcmbZQVxEg8amHpulAlSng-FGCGxZIJKa_sQNosIB-AjfUipiuHmPPSZO4TbZz32OFoKRz7E_7drt0CleODb7u_rU-cCJnLdDS6_UKitgONJ_6CUmAJi2Np0IcZWeRDwqPDwlMmARZr-FD5Qd85bYLZUeI7XYC34TzeBd2sqSShojrtSz7YMy1vtoWX3Hny8j0-gAmKuJCTjX43VmaMHUVppzJSaw2YgYxZNreON6M-9tT3UGT2JaSsvJIMKwc33-MKeG9JC0II7Y'
    },
    {
      id: 3,
      name: 'Saira Khan',
      email: 'skhan@atelier.design',
      phone: '+91 91234 56789',
      registration: 'Aug 22, 2023',
      orders: 21,
      ltv: '₹ 12,80,000',
      status: 'Blocked',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAh259DsphEJ12gYvgwnpeH3kCO2OLmSosy225vsO8BWKppHAfK8vJXTBrtEIeoMinxROZIGfqEA2ktO7rmh4huXOAtghtgypwiTANV8sZk6Z0nHqC2l2yhdvxL47aaPmEF4KqyWWQnLefWB--vsjVa-sdoLgK6P93QZHb1uuTaR6Q4Kr6pcVNjxyPHPvAHGly0YenjGT-ZTuKo_Znx3uPQqKc4K613LnFuFTne2kebEOKFd1cLM-RRY03L7VlQ-3POYoiYt1Bh4i0'
    },
    {
      id: 4,
      name: 'Rohan Das',
      email: 'rohan.das@independent.co',
      phone: '+91 99988 77766',
      registration: 'Feb 14, 2024',
      orders: 1,
      ltv: '₹ 45,000',
      status: 'Active',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAA2jQdDVnK0KryYmsz8bvmf7v-pt-D6c5s5BmxK2JL7j8O2_N6VPyR2p3LumVQLfR0vH_1NuDnJyuzuXWUPnMbCxGBo4n0zh5vpiMSsRFidEXSNiT75tyKkypIA2XRqSQ0A-TEQUaThjx-DpGYIZTwgo2yXhtroHK9AMHizNGa5wFru6XDDZjA11j3Tt-ZqArN3JWgPj9WosUyuoW0R1mtKqlkH1jnVhOCnBOZmkYUmECwB-Tq7gPpOTp4Z_151B3VYoD_RsBa19o'
    },
    {
      id: 5,
      name: 'Meera Reddy',
      email: 'm.reddy@hyderabad.club',
      phone: '+91 90001 00001',
      registration: 'Nov 30, 2023',
      orders: 8,
      ltv: '₹ 3,90,000',
      status: 'Active',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCAiszXoeK2CYEO4WPk3YIJHpX4tevyk0t4bbcQMIWajSeWtKa5j5A8XvDAdG-GALmDbRBXVcVCclsRduAJbkXlGSTYyMxDLb7BBS85b3k0OMJh6pZEjQhKSwPYUNwxKRecR97GFKbcD_pN-nAMBzylE1W7-WSTwT7b9J3xT1R_Tj-k_3NlcZbtW8VWBJqcFNgV7VGp1yHXme_C9OVOeO2amKqtuj2qDMHlZdRBx5BNjhSyAPF4OIj20jLh8QKuPSlPDU8pNMDY8CM'
    }
  ];

  return (
    <div className={styles.customerPageContent}>
      {/* Filter & Control Bar */}
      <SearchFilter 
        placeholder="Search patrons by name or email..."
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        className={styles.searchFilterOverride}
      >
        <div className="d-flex flex-column flex-md-row gap-2 gap-md-3 align-items-md-center align-items-start w-100 w-md-auto justify-content-md-end">
          <select className={styles.statusSelect}>
            <option>All Statuses</option>
            <option>Active</option>
            <option>Blocked</option>
          </select>

          <div className={styles.topPagination}>
            <button className={styles.pageNavBtn}>
              <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>chevron_left</span>
            </button>
            <span className={styles.paginationText}>Page 01 of 12</span>
            <button className={styles.pageNavBtn}>
              <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>chevron_right</span>
            </button>
          </div>
        </div>
      </SearchFilter>

      {/* Table Canvas */}
      <section className={styles.tableWrapper}>
        <div className={styles.tableScrollArea}>
          <table className={styles.customerTable}>
            <thead className={styles.tableHeader}>
              <tr>
                <th>Patron</th>
                <th>Registration</th>
                <th>Order Depth</th>
                <th>LTV</th>
                <th>Status</th>
                <th className="text-end">Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className={styles.tableRow}>
                  <td className={styles.tableCell}>
                    <div className={styles.patronCell}>
                      <div className={styles.patronImageWrapper}>
                        <img src={customer.image} alt={customer.name} className={styles.patronImage} />
                      </div>
                      <div>
                        <p className={styles.patronName}>{customer.name}</p>
                        <p className={styles.patronContact}>{customer.email} | {customer.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className={styles.tableCell}>
                    <span className={styles.standardText}>{customer.registration}</span>
                  </td>
                  <td className={styles.tableCell}>
                    <span className={styles.standardText}>{customer.orders} Orders</span>
                  </td>
                  <td className={styles.tableCell}>
                    <span className={styles.ltvText}>{customer.ltv}</span>
                  </td>
                  <td className={styles.tableCell}>
                    <span className={`${styles.statusBadge} ${customer.status === 'Active' ? styles.statusActive : styles.statusBlocked}`}>
                      {customer.status}
                    </span>
                  </td>
                  <td className={`${styles.tableCell} text-end`}>
                    <button className={styles.actionBtn} onClick={() => navigate(`/customers/${customer.id}`)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className={styles.tableFooter}>
          <p className={styles.footerInfo}>Showing 05 of 124 Patrons</p>
          <div className={styles.paginationControls}>
            <button className={`${styles.pageBtn} ${styles.pageBtnActive}`}>1</button>
            <button className={`${styles.pageBtn} ${styles.pageBtnInactive}`}>2</button>
            <button className={`${styles.pageBtn} ${styles.pageBtnInactive}`}>3</button>
            <span className={styles.ellipsis}>...</span>
            <button className={`${styles.pageBtn} ${styles.pageBtnInactive}`}>25</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CustomerList;
