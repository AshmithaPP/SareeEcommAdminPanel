import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import styles from './Login.module.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('hello.designveli@gmail.com');
  const [password, setPassword] = useState('••••••••');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for login can be added here
    console.log("Logging in with:", { email, password });
  };

  return (
    <div className={styles.loginWrapper}>
      <main className={styles.mainContainer}>
        {/* Top Branding Anchor */}
        <div className={styles.brandingHeader}>
          <h1 className={styles.brandTitle}>The Silk Curator</h1>
        </div>

        {/* Login Card */}
        <div className={styles.loginCard}>
          {/* Brand Logo/Icon */}
          <div className={styles.iconWrapper}>
            <div className={styles.logoCircle}>
              <span className={styles.logoText}>SC</span>
            </div>
          </div>

          <div className={styles.headerText}>
            <h2 className={styles.headline}>Log In to your account</h2>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className={styles.fieldContainer}>
              <label className={styles.fieldLabel} htmlFor="email">Email</label>
              <input 
                className={styles.input} 
                id="email" 
                name="email" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello.designveli@gmail.com"
                required
              />
            </div>

            {/* Password Field */}
            <div className={styles.fieldContainer}>
              <label className={styles.fieldLabel} htmlFor="password">Password</label>
              <div className={styles.passwordWrapper}>
                <input 
                  className={styles.input} 
                  id="password" 
                  name="password" 
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button 
                  className={styles.visibilityBtn} 
                  type="button"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
              <div className={styles.forgotPassWrapper}>
                <Link className={styles.forgotLink} to="/reset-password">Forgot password?</Link>
              </div>
            </div>

            {/* CTA Button */}
            <div className={styles.actionRow}>
              <Button label="Log In" type="submit" />
            </div>
          </form>
        </div>
      </main>

      {/* Global Footer */}
      <footer className={styles.globalFooter}>
        <span className={styles.copyright}>© 2024 The Silk Curator. All rights reserved.</span>
      </footer>
    </div>
  );
};

export default Login;
