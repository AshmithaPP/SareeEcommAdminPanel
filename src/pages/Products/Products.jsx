import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, Trash2, ChevronDown, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import Badge from '../../components/ui/Badge';
import Toggle from '../../components/ui/Toggle';
import styles from './Products.module.css';

/* ─────────────────────────────────────────
   Pagination Component
───────────────────────────────────────── */
const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  const getPages = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages = new Set([1, 2, 3, totalPages]);
    pages.add(currentPage);
    if (currentPage > 1) pages.add(currentPage - 1);
    if (currentPage < totalPages) pages.add(currentPage + 1);
    const sorted = [...pages].sort((a, b) => a - b);
    const result = [];
    sorted.forEach((p, i) => {
      if (i > 0 && p - sorted[i - 1] > 1) result.push('…');
      result.push(p);
    });
    return result;
  };

  return (
    <div className={styles.pagination}>
      <span className={styles.paginationInfo}>
        Showing {start} to {end} of {totalItems} entries
      </span>
      <div className={styles.paginationControls}>
        <button
          className={`${styles.pageBtn} ${currentPage === 1 ? styles.pageBtnDisabled : ''}`}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={14} />
        </button>

        {getPages().map((p, i) =>
          p === '…' ? (
            <span key={`el-${i}`} className={styles.pageEllipsis}>…</span>
          ) : (
            <button
              key={p}
              className={`${styles.pageBtn} ${p === currentPage ? styles.pageBtnActive : ''}`}
              onClick={() => onPageChange(p)}
            >
              {p}
            </button>
          )
        )}

        <button
          className={`${styles.pageBtn} ${currentPage === totalPages ? styles.pageBtnDisabled : ''}`}
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────
   Products Page
───────────────────────────────────────── */
const Products = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);

  const initialProducts = [
    {
      id: 1,
      name: 'Royal Gold Banarasi',
      sku: 'BN-2024-GLD-01',
      price: '$1,250.00',
      category: 'Banarasi Heritage',
      status: 'In Stock',
      availability: true,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5l9bTBIyrXHti0XYn7itosPEGTyri6ejT5PSkrge2NBmKzO9W6G01rUQAda-cLuMpek2GSUkA24hpJXzvWKq02jFXroG6Ee2WfQ6Xgb4OugF2xktPQgfz9LLeJl0HV90eM5ViZMNnugaW_15LG52Qx_6lRwzeg6mvs9efOZsWj3p5Jn7vbNBMtbcSdky_-DufP5fQ3-ktITxhhCqFf8zLdTJQJ8hk2d0f4iVAQCI-DLURpfA_7_ZKyY9YcgXETE8GqLAJz2cWGBQ'
    },
    {
      id: 2,
      name: 'Midnight Lotus Organza',
      sku: 'OR-2024-LOT-42',
      price: '$890.00',
      category: 'Fine Organza',
      status: 'Low Stock',
      availability: true,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhdAJ4eFHD4fycH-I6xC5Cd8vBor8eg7Ibofg0nKreXGlT6x2dhFyORtA94T2uXkubNk1j_P_73ZJ410zeiHc7a0rdL_GUl841ofEJzoZ_GF5PdEbYp9n078gc1mDBhxW4dTgvdQ3zAWXL6XjcHz8Sp3fVwLDNYIY1pjJW7hwSIE8sQivy4e7FAwFeFtuq_vOTo6S55XX6QHqYS1v1QmEGXy7io5vMw7gYiT2jxi3RymABNq3kq159b7TyD5lKZlh47y2-6aL81fk'
    },
    {
      id: 3,
      name: 'Crimson Temple Silk',
      sku: 'KAN-2024-RED-08',
      price: '$1,540.00',
      category: 'Kanchipuram',
      status: 'Out of Stock',
      availability: false,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGc1AFmtB1NKwfCNtWbfveqYek1_vVsu3erdl5EXnwHE8xmG-2QFRUra7PgPgTFC86iXN-qX-iy8jXU8iB20mZfU5x7UODNXFiiSaGOyY8qcrTysxHv10ajhqpfuRaBWhReBhVbUjrG4ZszC9_3VtdrSREgO_VAe_ekyNPmYjCQNuYO7uQIq2xTRwEGvfOo6dyWxr6mHNG4WDwzLHZYGiv36MMlbSWthLTfn6sDw8dJHtLXM_gG12SzKYjyVRHZclvYXZFgGoVvL8'
    },
    {
      id: 4,
      name: "Emerald Weaver's Dream",
      sku: 'CH-2024-EMR-15',
      price: '$620.00',
      category: 'Chanderi Craft',
      status: 'In Stock',
      availability: true,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiBFLCZ_sG3uksh6AEHDtLdmCm2Tyg0YGeDQvi7ugRQzQSdfU1SgjcXhLwKKyQZc2bsbPVTtOBHFphcRn7HFlQNpykqN_Srcec8DzA-ggGv18rBXPttZ7U7v63WsH9MXFySJ2pJ-UpyQnUOmC5Wt-Wp-qKCnfhnLGg9AlqjilSVnJ-EpKJFjD9reSS_JiS8mwEK50OhxHujcRmxmt1mYY5C5BWKTgYZM0T9R6SE4pB2F9-58dll70nKICn-G3TV1C5kcgPlWwBYfY'
    }
  ];

  const [productList, setProductList] = useState(initialProducts);

  const toggleAvailability = (id) => {
    setProductList(prev =>
      prev.map(p => p.id === id ? { ...p, availability: !p.availability } : p)
    );
  };

  const getStatusVariant = (status) => {
    if (status === 'In Stock')  return 'in-stock';
    if (status === 'Low Stock') return 'low-stock';
    return 'out-of-stock';
  };

  return (
    <div className={styles.pageContainer}>

      {/* ── Page Header ── */}
      <div className={styles.pageHeader}>
        <div className={styles.pageHeaderRight}>
          <span className={styles.statsText}>
            Displaying 1–12 of 48 Hand-Woven Masterpieces
          </span>
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className={styles.toolbar}>
        <div className={styles.filters}>
          <div className={styles.dropdown}>
            All Categories <ChevronDown size={14} />
          </div>
          <div className={styles.dropdown}>
            Stock Status <ChevronDown size={14} />
          </div>
        </div>
        <button className={styles.addBtn} onClick={() => navigate('/products/add')}>
          <Plus size={16} />
          <span>Add Product</span>
        </button>
      </div>

      {/* ── Desktop Table ── */}
      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thThumbnail}>Thumbnail</th>
              <th className={styles.thDetails}>Product Details</th>
              <th>Price</th>
              <th>Category</th>
              <th>Status</th>
              <th>Availability</th>
              <th className={styles.thActions}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {productList.map((product) => (
              <tr key={product.id} className={styles.tableRow}>
                <td>
                  <div className={styles.imageContainer}>
                    <img src={product.image} alt={product.name} className={styles.productImg} />
                  </div>
                </td>
                <td>
                  <div className={styles.productInfo}>
                    <span className={styles.productName}>{product.name}</span>
                    <span className={styles.sku}>SKU: {product.sku}</span>
                  </div>
                </td>
                <td className={styles.priceCell}>{product.price}</td>
                <td className={styles.categoryCell}>{product.category}</td>
                <td>
                  <Badge variant={getStatusVariant(product.status)}>
                    {product.status}
                  </Badge>
                </td>
                <td>
                  <Toggle
                    checked={product.availability}
                    onChange={() => toggleAvailability(product.id)}
                  />
                </td>
                <td>
                  <div className={styles.actions}>
                    <button
                      className={styles.actionBtn}
                      onClick={() => navigate('/products/edit')}
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button className={styles.actionBtn} title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Table Pagination */}
        <Pagination
          totalItems={48}
          itemsPerPage={4}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* ── Mobile Card List ── */}
      <div className={styles.mobileList}>
        {productList.map((product) => (
          <div key={product.id} className={styles.mobileCard}>
            <div className={styles.mobileCardTop}>
              <div className={styles.mobileImageWrap}>
                <img src={product.image} alt={product.name} className={styles.productImg} />
              </div>
              <div className={styles.mobileCardMeta}>
                <span className={styles.productName}>{product.name}</span>
                <span className={styles.sku}>SKU: {product.sku}</span>
                <span className={styles.mobileCategory}>{product.category}</span>
              </div>
              <div className={styles.mobileCardActions}>
                <button className={styles.actionBtn} onClick={() => navigate('/products/edit')}>
                  <Edit2 size={15} />
                </button>
                <button className={styles.actionBtn}>
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
            <div className={styles.mobileCardBottom}>
              <span className={styles.mobilePrice}>{product.price}</span>
              <Badge variant={getStatusVariant(product.status)}>
                {product.status}
              </Badge>
              <div className={styles.mobileToggleRow}>
                <span className={styles.mobileToggleLabel}>Available</span>
                <Toggle
                  checked={product.availability}
                  onChange={() => toggleAvailability(product.id)}
                />
              </div>
            </div>
          </div>
        ))}

        <Pagination
          totalItems={48}
          itemsPerPage={4}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* ── Footer Actions ── */}
      <div className={styles.footerActions}>
        <button className={styles.saveDraftBtn}>Save Draft</button>
        <button className={styles.publishBtn}>Publish Changes</button>
      </div>

    </div>
  );
};

export default Products;