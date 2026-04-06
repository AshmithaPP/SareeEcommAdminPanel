import React, { useState } from 'react';
import {
  ChevronRight,
  Bell,
  Settings,
  Plus,
  CloudUpload,
  Star,
  Trash2,
  PlusCircle,
  Bold,
  Italic,
  List,
  Link as LinkIcon
} from 'lucide-react';
import Button from '../../components/ui/Button';
import styles from './AddProduct.module.css';

const AddProduct = () => {
  const [productStatus, setProductStatus] = useState(true);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentGrid}>
        {/* Left Column: Primary Details */}
        <div className={styles.leftColumn}>
          {/* Essential Details Card */}
          <section className={styles.card}>
            <h3 className={styles.cardTitle}>Essential Details</h3>
            <div className={styles.formGrid}>
              <div className={styles.fullWidth}>
                <label className={styles.label}>Product Name</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="e.g. Vintage Kanchipuram Silk Saree"
                />
              </div>
              <div className={styles.halfWidth}>
                <label className={styles.label}>SKU Identifier</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="SKU-2024-VNTG"
                />
              </div>
              <div className={styles.halfWidth}>
                <label className={styles.label}>Category</label>
                <select className={styles.select}>
                  <option>Handloom Kanchipuram</option>
                  <option>Banarasi Silk</option>
                  <option>Chanderi Heritage</option>
                  <option>Tussar Collection</option>
                </select>
              </div>
              <div className={styles.fullWidth}>
                <label className={styles.label}>Product Description</label>
                <div className={styles.textareaWrapper}>
                  <div className={styles.toolbar}>
                    <button className={styles.toolbarBtn}><Bold size={16} /></button>
                    <button className={styles.toolbarBtn}><Italic size={16} /></button>
                    <button className={styles.toolbarBtn}><List size={16} /></button>
                    <div className={styles.toolbarDivider}></div>
                    <button className={styles.toolbarBtn}><LinkIcon size={16} /></button>
                  </div>
                  <textarea
                    className={styles.textarea}
                    placeholder="Describe the weave, thread work, and heritage value..."
                    rows={4}
                  ></textarea>
                </div>
              </div>
              <div className={styles.halfWidth}>
                <label className={styles.label}>Base Price (USD)</label>
                <input
                  type="number"
                  className={styles.input}
                  placeholder="0.00"
                />
              </div>
              <div className={styles.halfWidth}>
                <label className={styles.label}>Discounted Price</label>
                <input
                  type="number"
                  className={styles.input}
                  placeholder="0.00"
                />
              </div>
              <div className={styles.statusBox}>
                <div className={styles.statusInfo}>
                  <h4 className={styles.statusTitle}>Product Status</h4>
                  <p className={styles.statusDescription}>Show this product in the gallery immediately</p>
                </div>
                <button
                  className={`${styles.toggle} ${productStatus ? styles.toggleActive : ''}`}
                  onClick={() => setProductStatus(!productStatus)}
                >
                  <span className={styles.toggleThumb}></span>
                </button>
              </div>
            </div>
          </section>

          {/* SEO Settings Card */}
          <section className={styles.card}>
            <h3 className={styles.cardTitle}>Discoverability & SEO</h3>
            <div className={styles.formGrid}>
              <div className={styles.fullWidth}>
                <label className={styles.label}>Meta Title</label>
                <input type="text" className={styles.input} />
              </div>
              <div className={styles.fullWidth}>
                <label className={styles.label}>URL Slug</label>
                <div className={styles.slugInputGroup}>
                  <span className={styles.slugPrefix}>thesilkcurator.com/p/</span>
                  <input type="text" className={styles.slugInput} />
                </div>
              </div>
              <div className={styles.fullWidth}>
                <label className={styles.label}>Meta Description</label>
                <textarea className={styles.textarea} rows={2}></textarea>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Visuals & Variants */}
        <div className={styles.rightColumn}>
          {/* Imagery Card */}
          <section className={styles.card}>
            <div className={styles.cardHeaderWithAction}>
              <h3 className={styles.cardTitle}>Product Imagery</h3>
              <span className={styles.limitLabel}>Max 10MB</span>
            </div>
            <div className={styles.uploadZone}>
              <CloudUpload size={32} className={styles.uploadIcon} />
              <p className={styles.uploadMain}>Drag & drop your textures here</p>
              <p className={styles.uploadSub}>or click to browse library</p>
            </div>
            <div className={styles.imageGrid}>
              <div className={`${styles.imageItem} ${styles.imageItemActive}`}>
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1Dmgd_KBZc3TtmXzS5Va2wBLWVvXS2owqGwDyedlVP25BFOFOa-vDqCo6p5floJfQMDBlYlkqyYvaB1KTjXRmIlYqiW7UHYoNa5RqtVTMX5ktEQbkkVBGu8woOKeNdU8SaxQXdV9dY1twKAsNkU_9J2nKYH2E1gpXLKGsAK3gy_DRKhyMrRF5d6iaeTrsTz8xaXF4EsqWfXXRZU0k0QVZ718gIK00v8BZqByqrJUQGXGUaO_NCXM_AXY90M0BmDkIqNRem3S0E00"
                  alt="Gold zari work"
                />
                <div className={styles.imageBadge}>
                  <Star size={10} fill="currentColor" />
                </div>
              </div>
              <div className={styles.imageItem}>
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGkQcnCkTgadKE2x7B9DECKPP528QQ1XYxAwL9Z_yhrcuyQxGtsW32t3NgeCtUToTVA-lUvKGPJfwxPIlsjF2VGbmUb7b16QnGUTUNr9iekFRI35lmBrhSrSJhVOhKkbv8JBtn-ue1KQPNaawyxnXlp9tRI_xJ9ecNKy_ff8QDnn-5BtFRwNxo29-U96OExAWEfnHJCbaJCsAVPPGPtfVFqo1vsgWh3WZ8eBSvltb0fC_IiSG5ScA4UcbmfLHPkMHSNjD2JlM_N-A"
                  alt="Saree on mannequin"
                />
                <div className={styles.imageOverlay}>
                  <button className={styles.overlayBtn}><Star size={14} /></button>
                  <button className={styles.overlayBtn}><Trash2 size={14} /></button>
                </div>
              </div>
              <div className={styles.addImageBtn}>
                <Plus size={20} />
              </div>
            </div>
          </section>

          {/* Variants Card */}
          <section className={styles.card}>
            <h3 className={styles.cardTitle}>Product Variants</h3>
            <div className={styles.variantsTableWrapper}>
              <table className={styles.variantsTable}>
                <thead>
                  <tr>
                    <th>Color</th>
                    <th>Fabric</th>
                    <th>Stock</th>
                    <th className="text-end">Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div className={styles.variantColor}>
                        <div className={styles.colorCircle} style={{ backgroundColor: '#1A365D' }}></div>
                        <span>Royal Blue</span>
                      </div>
                    </td>
                    <td>Pure Silk</td>
                    <td>
                      <span className={styles.stockBadgeGreen}>12 In Stock</span>
                    </td>
                    <td className="text-end">$850</td>
                    <td>
                      <button className={styles.variantDelete}><Trash2 size={16} /></button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div className={styles.variantColor}>
                        <div className={styles.colorCircle} style={{ backgroundColor: '#702459' }}></div>
                        <span>Deep Plum</span>
                      </div>
                    </td>
                    <td>Tussar Silk</td>
                    <td>
                      <span className={styles.stockBadgeRed}>2 Low Stock</span>
                    </td>
                    <td className="text-end">$920</td>
                    <td>
                      <button className={styles.variantDelete}><Trash2 size={16} /></button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button className={styles.addVariantBtn}>
              <PlusCircle size={14} />
              Add Variant
            </button>
          </section>
        </div>
      </div>

      {/* Footer Action Bar */}
      <div className={styles.actionBar}>
        <Button variant="primary" className={styles.publishBtn}>
          Publish to Boutique
        </Button>
      </div>
    </div>
  );
};

export default AddProduct;
