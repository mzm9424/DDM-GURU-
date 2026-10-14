/**
 * DDmGurU Theme Switcher
 * Manages Dark / Light mode toggle, persistent storage, system preference detection,
 * and UI button synchronization across desktop navbar, mobile drawer, and floating dock.
 */

(function () {
  'use strict';

  var STORAGE_KEY = 'ddmguru_theme';

  function getSavedTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function getSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  }

  function getActiveTheme() {
    var saved = getSavedTheme();
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    return getSystemTheme();
  }

  function updateButtonsUI(theme) {
    var isDark = theme === 'dark';
    var nextTheme = isDark ? 'light' : 'dark';
    var actionLabel = isDark ? 'Switch to light mode' : 'Switch to dark mode';

    var buttons = document.querySelectorAll('.theme-toggle-btn, .floating-theme-toggle');
    buttons.forEach(function (btn) {
      btn.setAttribute('aria-label', actionLabel);
      btn.setAttribute('title', actionLabel);
      btn.setAttribute('data-current-theme', theme);

      var labelSpan = btn.querySelector('.theme-toggle-label');
      if (labelSpan) {
        labelSpan.textContent = isDark ? 'Dark' : 'Light';
      }
    });
  }

  function applyTheme(theme, animate) {
    var root = document.documentElement;

    if (animate) {
      root.classList.add('theme-transitioning');
    }

    root.setAttribute('data-theme', theme);

    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // storage unavailable
    }

    updateButtonsUI(theme);

    if (animate) {
      setTimeout(function () {
        root.classList.remove('theme-transitioning');
      }, 400);
    }

    try {
      window.dispatchEvent(
        new CustomEvent('themechange', {
          detail: { theme: theme }
        })
      );
    } catch (e) {}
  }

  function toggleTheme() {
    var current = document.documentElement.getAttribute('data-theme') || getActiveTheme();
    var target = current === 'light' ? 'dark' : 'light';
    applyTheme(target, true);
  }

  function createToggleButtonMarkup(isMobile) {
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'theme-toggle-btn' + (isMobile ? ' mobile-theme-btn' : '');
    btn.setAttribute('aria-label', 'Toggle theme');
    btn.setAttribute('title', 'Toggle theme');
    btn.innerHTML =
      '<span class="theme-toggle-icon">' +
      '<i class="bi bi-sun-fill sun-icon"></i>' +
      '<i class="bi bi-moon-stars-fill moon-icon"></i>' +
      '</span>';
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      toggleTheme();
    });
    return btn;
  }

  function createFloatingToggle() {
    if (document.getElementById('floatingThemeToggle')) {
      return;
    }
    var floating = document.createElement('button');
    floating.type = 'button';
    floating.id = 'floatingThemeToggle';
    floating.className = 'floating-theme-toggle';
    floating.setAttribute('aria-label', 'Toggle theme');
    floating.setAttribute('title', 'Switch between dark and light mode');
    floating.innerHTML =
      '<span class="theme-toggle-icon">' +
      '<i class="bi bi-sun-fill sun-icon"></i>' +
      '<i class="bi bi-moon-stars-fill moon-icon"></i>' +
      '</span>' +
      '<span class="theme-toggle-label d-none d-md-inline-block">Theme</span>';

    floating.addEventListener('click', function (e) {
      e.preventDefault();
      toggleTheme();
    });

    document.body.appendChild(floating);
  }

  function initThemeElements() {
    // 1. Ensure theme is applied
    var currentTheme = getActiveTheme();
    applyTheme(currentTheme, false);

    // 2. Attach click handlers to any existing static toggle buttons
    document.querySelectorAll('.theme-toggle-btn, .floating-theme-toggle').forEach(function (btn) {
      // Remove any duplicate listeners by cloning or checking flag
      if (!btn.hasAttribute('data-theme-listener')) {
        btn.setAttribute('data-theme-listener', 'true');
        btn.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          toggleTheme();
        });
      }
    });

    // 3. Inject into desktop / mobile navbar__options if not present
    document.querySelectorAll('.navbar__options').forEach(function (navOpts) {
      if (!navOpts.querySelector('.theme-toggle-btn')) {
        var btn = createToggleButtonMarkup(false);
        // Insert as first item in navbar__options for immediate prominence
        navOpts.insertBefore(btn, navOpts.firstChild);
      }
    });

    // 4. Inject into mobile menu header if present
    document.querySelectorAll('.mobile-menu__header').forEach(function (header) {
      if (!header.querySelector('.mobile-theme-btn')) {
        var btn = createToggleButtonMarkup(true);
        var closeBtn = header.querySelector('.close-mobile-menu');
        if (closeBtn) {
          header.insertBefore(btn, closeBtn);
        } else {
          header.appendChild(btn);
        }
      }
    });

    // 5. Inject into offcanvas navigation header if present (e.g., index-four)
    document.querySelectorAll('.offcanvas-menu__header').forEach(function (header) {
      if (!header.querySelector('.mobile-theme-btn')) {
        var btn = createToggleButtonMarkup(true);
        var closeBtn = header.querySelector('.close-offcanvas-menu');
        if (closeBtn) {
          header.insertBefore(btn, closeBtn);
        } else {
          header.appendChild(btn);
        }
      }
    });

    // 6. Inject floating toggle button
    createFloatingToggle();

    // 7. Sync initial UI
    updateButtonsUI(currentTheme);
  }

  // Early sync if document.body already available
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeElements);
  } else {
    initThemeElements();
  }

  // Listen to OS theme changes if user has not explicitly chosen
  if (window.matchMedia) {
    var mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', function (e) {
        if (!getSavedTheme()) {
          applyTheme(e.matches ? 'dark' : 'light', true);
        }
      });
    }
  }

  // Expose helper on window for programmatic control or testing
  window.DDmTheme = {
    get: getActiveTheme,
    set: function (t) {
      if (t === 'light' || t === 'dark') {
        applyTheme(t, true);
      }
    },
    toggle: toggleTheme
  };
})();
