// ============================================================
// 初始化 Supabase 客户端
// ============================================================
if (!window.sb) {
    var SUPABASE_URL = "https://bdflblooezmhgawkzhkv.supabase.co";
    var SUPABASE_ANON_KEY = "sb_publishable_mQbWq3yUoa8U5fmlk61WnA_W_rsrqCL";
    if (window.supabase) {
        window.sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
}

// ============================================================
// 会话管理
// ============================================================
function getSessionUser() {
    var stored = localStorage.getItem('sq_user_session');
    if (!stored) return null;
    try { return JSON.parse(stored); } catch (e) { return null; }
}
function setSessionUser(user) {
    if (!user) { localStorage.removeItem('sq_user_session'); return; }
    localStorage.setItem('sq_user_session', JSON.stringify(user));
}

// ============================================================
// 工具函数
// ============================================================
function escapeHtml(s) {
    if (!s) return '';
    return String(s).replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
}

function getUserAvatar(user) {
    if (user && user.avatar_url) return user.avatar_url;
    var name = user ? user.nickname : 'U';
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="#2e7d32" rx="50"/><text x="50" y="58" font-size="40" text-anchor="middle" fill="white" font-family="sans-serif">' + name.charAt(0).toUpperCase() + '</text></svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

// 统一的全站 Toast
if (!window.showCustomToast) {
    window.showCustomToast = function(msg) {
        var t = document.getElementById('customToast') || document.getElementById('toast');
        if (!t) {
            t = document.createElement('div');
            t.id = 'customToast';
            t.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%) translateY(20px);background:#0F172A;color:#fff;padding:12px 24px;border-radius:99px;font-size:.85em;font-weight:500;opacity:0;transition:all .3s;z-index:99999;pointer-events:none;box-shadow:0 8px 24px rgba(0,0,0,0.2);';
            document.body.appendChild(t);
        }
        t.textContent = msg;
        t.style.opacity = '1';
        t.style.transform = 'translateX(-50%) translateY(0)';
        clearTimeout(window.__toastTimer);
        window.__toastTimer = setTimeout(function() {
            t.style.opacity = '0';
            t.style.transform = 'translateX(-50%) translateY(20px)';
        }, 2500);
    };
}

// 全屏封禁遮罩
window.showBanOverlay = function(msg) {
    var ov = document.getElementById('banOverlay');
    if(!ov) {
        ov = document.createElement('div');
        ov.id = 'banOverlay';
        ov.style.cssText = 'position:fixed;inset:0;background:#0F172A;color:#fff;z-index:999999;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:20px;';
        document.body.appendChild(ov);
    }
    ov.innerHTML = '<h1 style="color:#EF4444;font-size:3em;margin-bottom:20px;font-weight:900;">账号已被封禁</h1>' +
                   '<p style="font-size:1.2em;margin-bottom:30px;color:#94A3B8;">' + msg + '</p>' +
                   '<p style="font-size:.9em;color:#64748B;">3 秒后自动强制退出...</p>';
    
    setTimeout(function() {
        localStorage.removeItem('sq_user_session');
        window.location.href = './index.html';
    }, 3000);
};

// ============================================================
// 渲染头部与底部
// ============================================================
function renderHeader(title, activeTab) {
    var user = getSessionUser();
    var headerContainer = document.getElementById('header-container');
    if (!headerContainer) return;

    var userAreaHtml = '';
    if (user && user.id) {
        var avatar = user.avatar_url || getUserAvatar(user);
        var displayName = user.nickname || '用户';
        var avatarStyle = '', avatarContent = '';
        if (avatar && avatar.startsWith('http')) {
            avatarStyle = 'background-image:url(' + avatar + ');background-size:cover;background-position:center;';
        } else {
            avatarContent = displayName.charAt(0).toUpperCase();
        }
        userAreaHtml = '<div class="user-area" onclick="window.location.href=\'./user.html\'">' +
            '<div class="avatar" style="' + avatarStyle + '">' + avatarContent + '</div>' +
            '<span class="user-name">' + escapeHtml(displayName) + '</span>' +
            '</div>';
    } else {
        userAreaHtml = '<div class="user-area" style="background:var(--primary);color:#fff;border-radius:99px;padding:6px 16px;font-weight:700;font-size:0.85em;" onclick="window.location.href=\'./index.html\'">登录 / 注册</div>';
    }

    headerContainer.innerHTML = '<div class="app-header">' +
        '<div class="brand" onclick="window.location.href=\'./posts.html\'">' +
        'Seven<span>戚</span><small>· ' + escapeHtml(title) + '</small>' +
        '</div>' + userAreaHtml + '</div>';
}

function renderFooter(activeTab) {
    var tabs = [
        { id: 'posts', name: '帖子', href: './posts.html' },
        { id: 'messages', name: '留言板', href: './messages.html' },
        { id: 'chats', name: '消息', href: './chats.html' },
        { id: 'profile', name: '个人', href: './user.html' }
    ];
    var icons = {
        posts: '<svg viewBox="0 0 48 48" fill="none"><path d="M9 18V42H39V18L24 6L9 18Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 29V42H29V29H19Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"/><path d="M9 42H39" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>',
        messages: '<svg viewBox="0 0 48 48" fill="none"><path d="M40 33V42C40 43.1 39.1 44 38 44H31.5" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M40 16V6C40 4.9 39.1 4 38 4H10C8.9 4 8 4.9 8 6V42C8 43.1 8.9 44 10 44H16" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M16 16H30" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M23 44L40 23" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>',
        chats: '<svg viewBox="0 0 48 48" fill="none"><path d="M4 6H44V36H29L24 41L19 36H4V6Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M23 21H25.0" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M33.0 21H35.0" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><path d="M13.0 21H15.0" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>',
        profile: '<svg viewBox="0 0 48 48" fill="none"><circle cx="24" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M42 44C42 34.1 33.9 26 24 26C14.1 26 6 34.1 6 44" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    };
    var footerHtml = '<div class="app-tabs">';
    tabs.forEach(function (tab) {
        var activeClass = (tab.id === activeTab) ? 'active' : '';
        footerHtml += '<a href="' + tab.href + '" class="tab-btn ' + activeClass + '" style="position:relative;">' +
            '<span class="tab-icon">' + (icons[tab.id] || '') + '</span>' + escapeHtml(tab.name) + '</a>';
    });
    footerHtml += '</div>';
    var footerContainer = document.getElementById('footer-container');
    if (footerContainer) footerContainer.innerHTML = footerHtml;
}

// 加载遮罩防卡死
window.hidePageLoading = function () {
    var m = document.getElementById('pageLoadingMask');
    if (m) m.remove();
    if (window.hideLoading) window.hideLoading();
};

window.showCustomAlert = function(title, desc) {
  return new Promise(function(resolve) {
    var mask = document.createElement('div');
    mask.style.cssText = 'position:fixed;inset:0;background:rgba(17,24,39,0.4);backdrop-filter:blur(4px);z-index:99999;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .2s;';
    mask.innerHTML = '<div style="background:#fff;border-radius:16px;width:80%;max-width:320px;padding:24px;text-align:center;transform:scale(.9);transition:transform .2s;box-shadow:0 20px 40px rgba(0,0,0,.1);"><h3 style="margin-bottom:12px;font-size:1.1em;color:#0F172A;font-weight:700;">'+title+'</h3><p style="color:#475569;margin-bottom:24px;font-size:.9em;line-height:1.6;">'+desc+'</p><div style="display:flex;gap:12px;"><button id="ma" style="flex:1;padding:12px;border-radius:99px;border:none;background:#10B981;color:#fff;font-weight:600;cursor:pointer;box-shadow:0 4px 12px rgba(16,185,129,0.3);">确定</button></div></div>';
    document.body.appendChild(mask);
    requestAnimationFrame(function() { mask.style.opacity = '1'; mask.children[0].style.transform = 'scale(1)'; });
    var close = function() { mask.style.opacity = '0'; mask.children[0].style.transform = 'scale(.9)'; setTimeout(function() { document.body.removeChild(mask); resolve(); }, 200); };
    mask.querySelector('#ma').onclick = close;
  });
};

window.showCustomConfirm = function(title, desc) {
  return new Promise(function(resolve) {
    var mask = document.createElement('div');
    mask.style.cssText = 'position:fixed;inset:0;background:rgba(17,24,39,0.4);backdrop-filter:blur(4px);z-index:99999;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .2s;';
    mask.innerHTML = '<div style="background:#fff;border-radius:16px;width:80%;max-width:320px;padding:24px;text-align:center;transform:scale(.9);transition:transform .2s;box-shadow:0 20px 40px rgba(0,0,0,.1);"><h3 style="margin-bottom:12px;font-size:1.1em;color:#0F172A;font-weight:700;">'+title+'</h3><p style="color:#475569;margin-bottom:24px;font-size:.9em;line-height:1.6;">'+desc+'</p><div style="display:flex;gap:12px;"><button id="mc" style="flex:1;padding:12px;border-radius:99px;border:none;background:#F1F5F9;color:#64748B;font-weight:600;cursor:pointer;">取消</button><button id="mo" style="flex:1;padding:12px;border-radius:99px;border:none;background:#10B981;color:#fff;font-weight:600;cursor:pointer;box-shadow:0 4px 12px rgba(16,185,129,0.3);">确定</button></div></div>';
    document.body.appendChild(mask);
    requestAnimationFrame(function() { mask.style.opacity = '1'; mask.children[0].style.transform = 'scale(1)'; });
    var close = function(val) { mask.style.opacity = '0'; mask.children[0].style.transform = 'scale(.9)'; setTimeout(function() { document.body.removeChild(mask); resolve(val); }, 200); };
    mask.querySelector('#mc').onclick = function() { close(false); };
    mask.querySelector('#mo').onclick = function() { close(true); };
  });
};

window.showCustomPrompt = function(title, placeholder) {
  return new Promise(function(resolve) {
    var mask = document.createElement('div');
    mask.style.cssText = 'position:fixed;inset:0;background:rgba(17,24,39,0.4);backdrop-filter:blur(4px);z-index:99999;display:flex;align-items:center;justify-content:center;opacity:0;transition:opacity .2s;';
    mask.innerHTML = '<div style="background:#fff;border-radius:16px;width:80%;max-width:320px;padding:24px;text-align:center;transform:scale(.9);transition:transform .2s;box-shadow:0 20px 40px rgba(0,0,0,.1);"><h3 style="margin-bottom:12px;font-size:1.1em;color:#0F172A;font-weight:700;">'+title+'</h3><input id="pi" placeholder="'+placeholder+'" style="width:100%;padding:12px;border:1px solid #E2E8F0;border-radius:12px;margin-bottom:20px;outline:none;font-size:.9em;background:#F8FAFC;"><div style="display:flex;gap:12px;"><button id="pc" style="flex:1;padding:12px;border-radius:99px;border:none;background:#F1F5F9;color:#64748B;font-weight:600;cursor:pointer;">取消</button><button id="po" style="flex:1;padding:12px;border-radius:99px;border:none;background:#10B981;color:#fff;font-weight:600;cursor:pointer;box-shadow:0 4px 12px rgba(16,185,129,0.3);">确定</button></div></div>';
    document.body.appendChild(mask);
    requestAnimationFrame(function() { mask.style.opacity = '1'; mask.children[0].style.transform = 'scale(1)'; mask.querySelector('#pi').focus(); });
    var close = function(val) { mask.style.opacity = '0'; mask.children[0].style.transform = 'scale(.9)'; setTimeout(function() { document.body.removeChild(mask); resolve(val); }, 200); };
    mask.querySelector('#pc').onclick = function() { close(null); };
    mask.querySelector('#po').onclick = function() { close(mask.querySelector('#pi').value); };
  });
};

// ============================================================
// 全局咖啡 Loading 动画 (由用户保留的炫酷特效)
// ============================================================
(function() {
  var css = document.createElement('style');
  css.innerHTML = 
    '#coffeeLoadingMask { position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 99999; background: var(--bg); flex-direction: column; justify-content: center; align-items: center; transition: opacity 0.4s ease; }' +
    '#coffeeLoadingMask { display: flex; opacity: 0; pointer-events: none; transition: opacity 0.3s ease; }' +
    '#coffeeLoadingMask.show { opacity: 1; pointer-events: auto; }' +
    '.coffee-loader { width: 100px; height: 80px; position: relative; display: flex; justify-items: center; align-items: center; margin-top: 20px; }' +
    '.coffee-loader .cup { position: absolute; width: 25px; height: 18px; background-color: #fff; border: 1px solid #D1D5DB; z-index: 1; border-radius: 2px 2px 10px 10px; animation: expansion 6s infinite ease-in-out; transform-origin: center; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }' +
    '.cup::after { content: ""; position: absolute; top: -2px; width: calc(100% - 2px); height: 2px; background: #fed59fca; border: 1px solid #D1D5DB; border-radius: 50%; }' +
    '.cup::before { content: ""; position: absolute; top: 15px; width: calc(100% - 2px); height: 4px; background: transparent; border: 1px solid #D1D5DB; border-top: none; border-radius: 50%; z-index: -1; }' +
    '.coffee-loader .cup .cup-handle { position: absolute; width: 5px; height: 10px; background-color: #fff; border: 1px solid #D1D5DB; right: -5px; top: 2px; border-radius: 2px 10px 20px 2px; }' +
    '.coffee-loader .cup .smoke { position: absolute; bottom: 100%; left: 50%; width: 15px; height: 25px; background: rgba(156, 163, 175, 0.5); border-radius: 50%; transform: translateX(-50%); animation: rise 6s infinite ease-in-out; filter: blur(8px); }' +
    '.coffee-loader .cup .smoke.one { animation-delay: 0s; }' +
    '.coffee-loader .cup .smoke.two { animation-delay: 1s; }' +
    '.coffee-loader .cup .smoke.three { animation-delay: 2s; }' +
    '.coffee-loader .load { position: absolute; font-size: 10px; opacity: 0.7; top: 45%; left: 50%; transform: translateX(-50%); z-index: -1; color: #9CA3AF; letter-spacing: 2px; }' +
    '@keyframes expansion { 0% { width: 25px; transform: translateX(0); } 40% { width: 100%; transform: translateX(0); } 80% { width: 25px; transform: translateX(64px); } 90% { width: 100%; transform: translateX(0); } 100% { width: 25px; transform: translateX(0); } }' +
    '@keyframes rise { 0% { transform: translate(-50%, 0) scale(0.4); opacity: 0; } 30% { opacity: 0.6; } 60% { opacity: 0.4; } 100% { transform: translate(-50%, -120px) scale(1); opacity: 0; } }';
  document.head.appendChild(css);

  function createMask() {
    if (document.getElementById('coffeeLoadingMask')) return;
    var div = document.createElement('div');
    div.id = 'coffeeLoadingMask';
    div.innerHTML = 
      '<div class="coffee-loader">' +
        '<div class="cup">' +
          '<div class="cup-handle"></div>' +
          '<div class="smoke one"></div>' +
          '<div class="smoke two"></div>' +
          '<div class="smoke three"></div>' +
        '</div>' +
        '<div class="load">..........................</div>' +
      '</div>' +
      '<div style="margin-top: 24px; font-weight: 600; color: #4B5563; font-size: 0.9em; letter-spacing: 4px;">加 载 中</div>';
    if (document.body) {
      document.body.appendChild(div);
    } else {
      window.addEventListener('DOMContentLoaded', function() {
        if (!document.getElementById('coffeeLoadingMask')) {
          document.body.appendChild(div);
        }
      });
    }
  }

  window.showLoading = function() { 
    createMask();
    var el = document.getElementById('coffeeLoadingMask');
    if(!el) return; 
    
    var footer = document.querySelector('.app-tabs');
    if (footer) {
      var footerHeight = footer.offsetHeight;
      el.style.bottom = footerHeight + 'px';
    } else {
      el.style.bottom = '0';
    }
    el.classList.add('show'); 
  };
  
  window.hideLoading = function() { 
    var el = document.getElementById('coffeeLoadingMask');
    if(el) el.classList.remove('show'); 
    
    var app = document.getElementById('mainApp');
    if (app && !app.classList.contains('animate-in')) {
      app.classList.add('animate-in');
    }
  };

  // 自动展示逻辑（如果不在 index.html）
  if (!window.location.pathname.includes('index.html')) {
    var isCached = sessionStorage.getItem('sq_page_cached_' + window.location.pathname);
    if (!isCached) {
      if (document.readyState === 'loading') {
        window.showLoading();
      }
      window.addEventListener('DOMContentLoaded', function() {
        sessionStorage.setItem('sq_page_cached_' + window.location.pathname, '1');
        setTimeout(function() { window.hideLoading(); }, 350);
      });
      setTimeout(function() { window.hideLoading(); }, 2000);
    } else {
      window.hideLoading();
    }
  }
})();
