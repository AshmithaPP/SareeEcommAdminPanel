import React, { useState } from 'react';
import {
  Plus,
  CloudUpload,
  Star,
  Trash2,
  Bold,
  Italic,
  List,
  Link as LinkIcon
} from 'lucide-react';
import styles from './EditProduct.module.css';

const EditProduct = () => {
  const [productStatus, setProductStatus] = useState(true);

  const [productData, setProductData] = useState({
    name: 'Royal Banarasi Silk Saree',
    sku: 'SK-BANA-2024-001',
    category: 'Banarasi Heritage',
    description:
      'Hand-woven in the heart of Varanasi, this Royal Banarasi Saree features intricate zari work using pure gold-dipped threads and authentic mulberry silk.',
    basePrice: '1,250.00',
    discountedPrice: '1,100.00',
    metaTitle: 'Authentic Royal Banarasi Silk Saree | Hand-Woven Luxury',
    slug: 'royal-banarasi-silk-saree',
    metaDescription:
      'Shop the exquisite Royal Banarasi Silk Saree. Handcrafted with pure gold zari work and premium silk for timeless elegance.',
  });

  const update = (field, value) =>
    setProductData((prev) => ({ ...prev, [field]: value }));

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentGrid}>

        {/* ── Left Column ── */}
        <div className={styles.leftColumn}>

          {/* Essential Details */}
          <section className={styles.card}>
            <h3 className={styles.cardTitle}>Essential Details</h3>
            <div className={styles.formGrid}>

              <div className={styles.fullWidth}>
                <label className={styles.label}>Product Name</label>
                <input
                  type="text"
                  className={styles.input}
                  value={productData.name}
                  onChange={(e) => update('name', e.target.value)}
                />
              </div>

              <div className={styles.halfWidth}>
                <label className={styles.label}>SKU Identifier</label>
                <input
                  type="text"
                  className={`${styles.input} ${styles.uppercase}`}
                  value={productData.sku}
                  onChange={(e) => update('sku', e.target.value)}
                />
              </div>

              <div className={styles.halfWidth}>
                <label className={styles.label}>Category</label>
                <select
                  className={styles.select}
                  value={productData.category}
                  onChange={(e) => update('category', e.target.value)}
                >
                  <option>Banarasi Heritage</option>
                  <option>Kanchipuram Silks</option>
                  <option>Fine Organza</option>
                  <option>Chanderi Craft</option>
                </select>
              </div>

              <div className={styles.fullWidth}>
                <label className={styles.label}>Product Description</label>
                <div className={styles.textareaWrapper}>
                  <div className={styles.toolbar}>
                    <button className={styles.toolbarBtn}><Bold size={13} /></button>
                    <button className={styles.toolbarBtn}><Italic size={13} /></button>
                    <div className={styles.toolbarDivider} />
                    <button className={styles.toolbarBtn}><List size={13} /></button>
                    <button className={styles.toolbarBtn}><LinkIcon size={13} /></button>
                  </div>
                  <textarea
                    className={styles.textarea}
                    rows={3}
                    value={productData.description}
                    onChange={(e) => update('description', e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.halfWidth}>
                <label className={styles.label}>Base Price (USD)</label>
                <input
                  type="text"
                  className={styles.input}
                  value={productData.basePrice}
                  onChange={(e) => update('basePrice', e.target.value)}
                />
              </div>

              <div className={styles.halfWidth}>
                <label className={styles.label}>Discounted Price</label>
                <input
                  type="text"
                  className={styles.input}
                  value={productData.discountedPrice}
                  onChange={(e) => update('discountedPrice', e.target.value)}
                />
              </div>

              <div className={styles.statusBox}>
                <div>
                  <p className={styles.statusTitle}>Product Status</p>
                  <p className={styles.statusSub}>
                    Show this product in the gallery immediately
                  </p>
                </div>
                <button
                  className={`${styles.toggle} ${productStatus ? styles.toggleActive : ''}`}
                  onClick={() => setProductStatus((v) => !v)}
                  aria-label="Toggle product status"
                >
                  <span className={styles.toggleThumb} />
                </button>
              </div>

            </div>
          </section>

          {/* SEO */}
          <section className={styles.card}>
            <h3 className={styles.cardTitle}>Discoverability & SEO</h3>
            <div className={styles.formGrid}>

              <div className={styles.fullWidth}>
                <label className={styles.label}>Meta Title</label>
                <input
                  type="text"
                  className={styles.input}
                  value={productData.metaTitle}
                  onChange={(e) => update('metaTitle', e.target.value)}
                />
              </div>

              <div className={styles.fullWidth}>
                <label className={styles.label}>URL Slug</label>
                <div className={styles.slugGroup}>
                  <span className={styles.slugPrefix}>thesilkcurator.com/p/</span>
                  <input
                    type="text"
                    className={styles.slugInput}
                    value={productData.slug}
                    onChange={(e) => update('slug', e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.fullWidth}>
                <label className={styles.label}>Meta Description</label>
                <textarea
                  className={`${styles.textarea} ${styles.textareaStandalone}`}
                  rows={3}
                  value={productData.metaDescription}
                  onChange={(e) => update('metaDescription', e.target.value)}
                />
              </div>

            </div>
          </section>

        </div>

        {/* ── Right Column ── */}
        <div className={styles.rightColumn}>

          {/* Product Imagery */}
          <section className={styles.card}>
            <div className={styles.cardHeaderAction}>
              <h3 className={styles.cardTitle}>Product Imagery</h3>
              <span className={styles.limitLabel}>MAX 10MB</span>
            </div>

            <div className={styles.uploadZone}>
              <CloudUpload size={28} className={styles.uploadIcon} />
              <p className={styles.uploadText}>Drag & drop your textures here</p>
              <p className={styles.uploadSubtext}>or click to browse library</p>
            </div>

            <div className={styles.imageGrid}>
              <div className={`${styles.imageItem} ${styles.imageItemActive}`}>
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrT65K3I5XYTvu_fSrSb6nNJlUfwQIRo-UpTYTq_xsFKAqVQavswfXqqYoZkcGkuRBb6NkBY0UEWk8BzuqbLe_t75wln0IUfmqZ8OhtsP1FFst3ODHy6qRo5SWkX3ZXiSu0ABF57m8nnlVHDADePqAim4jtCuSkDiJJz3bdZKt3X4N2eL6R6ukuWpHtm_l4kzoh3TBzsTYTNOvKMxEhh3q7QTkM6eeNPlS5wI8veVuKcYH6t-P3dzo0uALT6vOuwahWTJcVZy7WSI"
                  alt="Product"
                />
                <div className={styles.imageBadge}>
                  <Star size={8} fill="currentColor" />
                </div>
              </div>

              <div className={styles.imageItem}>
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDg2s7pY-_1LqZD7fBwPeagmgpLlrF0Ysp9gy40gZ14tPyFEXQtDxjzB7G7Rx33eBo2BNxsU-Iz2nocWfdElfZW042fyOq3YMSyjZTgPvDPaysNCCCSRE-aFsIOMgtmmjhF5KjWosSVWLSgPk29qdTIbbAqao7HfzchFId1AJ1_sY2N_PjaK6HcC_SCYKwdhJPBiJbXobAE1iZKocvpo7ppipQ1jNDu2fsAu-PC2KlOcb9J4ufSzKIB7vXFoQQJpLO7Bfc5o5Jjkco"
                  alt="Product"
                />
              </div>

              <div className={styles.addImage}>
                <Plus size={18} />
              </div>
            </div>
          </section>

          {/* Product Variants */}
          <section className={styles.card}>
            <h3 className={styles.cardTitle}>Product Variants</h3>

            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Color</th>
                    <th>Fabric</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className={styles.variantColor}>
                        <span className={styles.colorCircle} style={{ backgroundColor: '#1b1c7c' }} />
                        <span>Royal Blue</span>
                      </div>
                    </td>
                    <td>Pure Silk</td>
                    <td><span className={styles.badgeGreen}>12 In Stock</span></td>
                    <td className={styles.variantPrice}>$850</td>
                    <td className={styles.variantDel}>
                      <button className={styles.deleteBtn}><Trash2 size={13} /></button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className={styles.variantColor}>
                        <span className={styles.colorCircle} style={{ backgroundColor: '#671a3d' }} />
                        <span>Deep Plum</span>
                      </div>
                    </td>
                    <td>Tussar Silk</td>
                    <td><span className={styles.badgeRed}>2 Low Stock</span></td>
                    <td className={styles.variantPrice}>$920</td>
                    <td className={styles.variantDel}>
                      <button className={styles.deleteBtn}><Trash2 size={13} /></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button className={styles.addVariant}>
              <Plus size={13} /> Add Variant
            </button>
          </section>

        </div>
      </div>

      {/* ── Footer ── */}
      <div className={styles.actionBar}>
        <button className={styles.publishBtn}>
          Publish to Boutique
        </button>
      </div>

    </div>
  );
};

export default EditProduct;