// ================================================================
// 开发者.js - 所有交互逻辑（页面切换、渲染、事件等）
// 依赖全局变量 APPS, DEVELOPERS, POSTS (来自 软件.js)
// ================================================================

// ---------- DOM 快捷引用 ----------
const $ = (id) => document.getElementById(id);
const bottomNav = document.getElementById('bottomNav');

// ---------- 全局状态 ----------
let pageHistory = ['home'];
let currentTab = 'home';
let currentCategory = 'all';
let currentCommunityFilter = 'all';
let detailScrollHandler = null;
let currentAppUpdates = [];

// ---------- 工具函数 ----------
const hideBottomNav = () => bottomNav.classList.add('hidden');
const showBottomNav = () => bottomNav.classList.remove('hidden');

function getBadgeHTML(dev) {
    if (!dev || !dev.badge) return '';
    return `<span class="verified-badge badge-${dev.badge}" title="${dev.badgeTitle || '认证'}">✓</span>`;
}

function parseDownloads(dlStr) {
    if (!dlStr) return 0;
    const s = dlStr.trim();
    if (s.includes('万')) {
        const num = parseFloat(s.replace('万', '')) || 0;
        return num * 10000;
    }
    return parseFloat(s) || 0;
}

// ---------- 创建应用列表项 ----------
function createAppItem(app, showRank, rankNum) {
    const dev = DEVELOPERS[app.developerId] || {};
    const badgeHtml = getBadgeHTML(dev);

    let btnText = '访问', btnCls = 'online';
    if (app.status === 'beta') { btnText = '内测'; btnCls = 'beta'; }
    else if (app.status === 'offline' || app.status === 'error') { btnText = app.statusText || '无法使用'; btnCls = 'error'; }

    const rankHtml = showRank ?
        `<div class="rank-number ${rankNum===1?'top-1':rankNum===2?'top-2':rankNum===3?'top-3':''}">${rankNum}</div>` :
        '';

    const ratingHtml = app.status === 'online' ?
        `<span class="app-rating-downloads">★ ${app.rating} · 下载量${app.downloads}</span>` :
        '';

    const item = document.createElement('div');
    item.className = 'app-list-item';
    item.onclick = () => goToAppDetail(app.id);

    const websiteUrl = app.website || '';
    const btnOnclick = websiteUrl ?
        `event.stopPropagation();window.open('${websiteUrl}','_blank')` :
        `event.stopPropagation();showAlert('该应用暂无外部链接')`;

    item.innerHTML = `
        ${rankHtml}
        <div class="app-icon"><img src="${app.iconUrl}" alt="${app.name}" loading="lazy" onerror="this.style.display='none';this.parentNode.textContent='${app.icon}'"></div>
        <div class="app-info">
            <div class="app-name-row">
                <span class="app-name">${app.name}</span>
                ${ratingHtml}
            </div>
            <div class="app-author-row">
                <span class="app-author-name" onclick="event.stopPropagation();goToDeveloper('${app.developerId}')">${app.developer}</span>
                ${badgeHtml}
            </div>
            <div class="app-desc">${app.shortDesc}</div>
        </div>
        <button class="visit-btn ${btnCls}" onclick="${btnOnclick}">${btnText}</button>
    `;
    return item;
}

// ---------- 页面切换 ----------
function switchTab(tabName) {
    currentTab = tabName;
    pageHistory = [tabName];
    document.querySelectorAll('.nav-item').forEach((el, i) => {
        const tabs = ['home', 'apps', 'community', 'mine'];
        el.classList.toggle('active', tabs[i] === tabName);
    });
    showPage(tabName);
    showBottomNav();
    if (tabName === 'apps') renderAppsList('all');
    if (tabName === 'community') renderPosts();
    if (tabName === 'home') renderHomeList();
    if (tabName === 'mine') renderCreators();
    detachScrollListener();
}

function showPage(pageName) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById('page-' + pageName);
    if (target) target.classList.add('active');
    window.scrollTo(0, 0);
}

function goBack() {
    if (pageHistory.length > 1) {
        pageHistory.pop();
        const prev = pageHistory[pageHistory.length - 1];
        if (['home', 'apps', 'community', 'mine'].includes(prev)) {
            currentTab = prev;
            document.querySelectorAll('.nav-item').forEach((el, i) => {
                const tabs = ['home', 'apps', 'community', 'mine'];
                el.classList.toggle('active', tabs[i] === prev);
            });
            showBottomNav();
        } else {
            hideBottomNav();
        }
        showPage(prev);
        detachScrollListener();
    }
}

// ---------- 首页 & 应用列表 ----------
function renderHomeList() {
    const wrap = document.getElementById('home-app-list');
    wrap.innerHTML = '';
    const list = Object.values(APPS).filter(a => a.status === 'online')
        .sort((a, b) => parseDownloads(b.downloads) - parseDownloads(a.downloads));

    if (!list.length) {
        wrap.innerHTML = '<div style="padding:20px;text-align:center;color:#888;">暂无可访问的应用</div>';
        return;
    }
    list.forEach((app, idx) => wrap.appendChild(createAppItem(app, true, idx + 1)));
}

function filterCategory(cat, el) {
    currentCategory = cat;
    document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    renderAppsList(cat);
}

function renderAppsList(cat) {
    const wrap = document.getElementById('all-apps-list');
    wrap.innerHTML = '';
    let list = Object.values(APPS);
    if (cat === 'online') list = list.filter(a => a.status === 'online');
    else if (cat === 'beta') list = list.filter(a => a.status === 'beta');
    else if (['tools', 'reading', 'education', 'me', 'game', 'happy'].includes(cat))
        list = list.filter(a => a.category === cat);
    list.sort((a, b) => (b.views || 0) - (a.views || 0));

    if (!list.length) {
        wrap.innerHTML = '<div style="padding:40px;text-align:center;color:#888;">暂无相关应用</div>';
        return;
    }
    list.forEach(app => wrap.appendChild(createAppItem(app, false)));
}

// ---------- 应用详情 ----------
function detachScrollListener() {
    if (detailScrollHandler) {
        window.removeEventListener('scroll', detailScrollHandler);
        detailScrollHandler = null;
    }
    const title = document.getElementById('sticky-title'), btn = document.getElementById('sticky-visit-btn');
    if (title) title.style.display = 'none';
    if (btn) btn.style.display = 'none';
}

function attachScrollListener(appName, btnText, btnCls) {
    detachScrollListener();
    const title = document.getElementById('sticky-title'), btn = document.getElementById('sticky-visit-btn'), header = document.getElementById('detail-header');
    title.textContent = appName;
    btn.textContent = btnText;
    btn.className = `visit-btn ${btnCls} sticky-visit-btn`;

    const handler = () => {
        const rect = header.getBoundingClientRect();
        if (rect.bottom <= 0) {
            title.style.display = 'block';
            btn.style.display = 'block';
        } else {
            title.style.display = 'none';
            btn.style.display = 'none';
        }
    };
    detailScrollHandler = handler;
    window.addEventListener('scroll', handler);
    handler();
}

function goToAppDetail(appId) {
    const app = APPS[appId];
    if (!app) return;
    const dev = DEVELOPERS[app.developerId] || {};

    hideBottomNav();
    detachScrollListener();

    // 头部图标 & 名称
    const iconContainer = document.getElementById('detail-icon');
    iconContainer.innerHTML =
        `<img src="${app.iconUrl}" alt="${app.name}" onerror="this.style.display='none';this.parentNode.textContent='${app.icon}'">`;
    document.getElementById('detail-name').textContent = app.name;

    // 开发者
    const devRow = document.getElementById('detail-developer');
    devRow.innerHTML = `${dev.name || app.developer} ${getBadgeHTML(dev)}`;
    devRow.onclick = () => goToDeveloper(app.developerId);

    // 访问按钮
    let btnText = '访问', btnCls = 'online';
    if (app.status === 'beta') { btnText = '内测'; btnCls = 'beta'; }
    else if (app.status === 'offline' || app.status === 'error') { btnText = app.statusText || '无法使用'; btnCls = 'error'; }
    const btnDom = document.getElementById('detail-btn');
    btnDom.textContent = btnText;
    btnDom.className = `visit-btn ${btnCls}`;
    const websiteUrl = app.website || '';
    btnDom.onclick = () => { websiteUrl ? window.open(websiteUrl, '_blank') : showAlert('该应用暂无外部链接'); };

    // 描述
    document.getElementById('detail-description').textContent = app.description;

    // 自定义告示
    const banner = document.getElementById('status-banner'), iconEl = document.getElementById('status-banner-icon'), textEl = document.getElementById('status-banner-text');
    if (app.notice && app.notice.trim()) {
        banner.style.display = 'flex';
        const firstChar = app.notice.trim().charAt(0);
        const emojiRegex = /[\u{1F000}-\u{1FFFF}]|[\u2600-\u27BF]|[\u{2700}-\u{27BF}]|[\u{FE00}-\u{FEFF}]|[\u{1F300}-\u{1F5FF}]|[\u{1F600}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F700}-\u{1F77F}]|[\u{1F780}-\u{1F7FF}]|[\u{1F800}-\u{1F8FF}]|[\u{1F900}-\u{1F9FF}]|[\u{1FA00}-\u{1FA6F}]|[\u{1FA70}-\u{1FAFF}]|[\u{1FB00}-\u{1FBFF}]|[\u{1FC00}-\u{1FCFF}]|[\u{1FD00}-\u{1FDFF}]|[\u{1FE00}-\u{1FEFF}]/u;
        if (emojiRegex.test(firstChar)) {
            iconEl.textContent = firstChar;
            textEl.textContent = app.notice.replace(emojiRegex, '').trim() || app.notice;
        } else {
            iconEl.textContent = app.status === 'beta' ? '🔶' : app.status === 'error' ? '🚫' : 'ℹ️';
            textEl.textContent = app.notice;
        }
        banner.style.border = `2px solid ${app.status==='beta'?'#FF9500':app.status==='error'?'#FF3B30':'#007AFF'}`;
        banner.style.background =
            `rgba(${app.status==='beta'?'255,149,0':app.status==='error'?'255,59,48':'0,122,255'},0.08)`;
    } else {
        banner.style.display = 'none';
    }

    // 统计信息
    const isOnline = app.status === 'online';
    document.getElementById('detail-rank').textContent = isOnline ? '#' + app.rank : '-';
    document.getElementById('detail-rating').textContent = isOnline ? app.rating : '-';
    document.getElementById('detail-downloads').textContent = isOnline ? app.downloads : '-';
    document.getElementById('detail-version').textContent = app.version;
    document.getElementById('detail-category').textContent = app.categoryName;
    document.getElementById('detail-status-text').textContent = app.statusText;
    document.getElementById('detail-info-version').textContent = app.version;

    // 截图
    const shotsContainer = document.getElementById('screenshots-container');
    shotsContainer.innerHTML = '';
    const shots = (app.screenshots && app.screenshots.length) ? app.screenshots : [
        'https://picsum.photos/seed/default1/300/540',
        'https://picsum.photos/seed/default2/300/540',
        'https://picsum.photos/seed/default3/300/540'
    ];
    shots.forEach(url => {
        const div = document.createElement('div');
        div.className = 'screenshot';
        div.onclick = (e) => { e.stopPropagation(); openImagePreview(url); };
        div.innerHTML =
            `<img src="${url}" alt="截图" loading="lazy" onerror="this.outerHTML='<span style=\\'color:#888;font-size:12px;\\'>截图</span>'">`;
        shotsContainer.appendChild(div);
    });

    // 更新日志
    const updateWrap = document.getElementById('detail-update-log');
    updateWrap.innerHTML = '';
    const allUpdates = (app.updates || []).slice().sort((a, b) => {
        const va = a.version.replace(/[^0-9.]/g, '').split('.').map(Number);
        const vb = b.version.replace(/[^0-9.]/g, '').split('.').map(Number);
        for (let i = 0; i < Math.max(va.length, vb.length); i++) {
            const na = va[i] || 0, nb = vb[i] || 0;
            if (na !== nb) return nb - na;
        }
        return 0;
    });
    currentAppUpdates = allUpdates;
    if (allUpdates.length) {
        const latest = allUpdates[0];
        const div = document.createElement('div');
        div.className = 'update-item';
        div.innerHTML =
            `<div class="update-version"><span>${latest.version}</span><span class="update-date">${latest.date}</span></div><div class="update-content">${latest.content}</div>`;
        updateWrap.appendChild(div);
    } else {
        updateWrap.innerHTML = '<div style="padding:12px 0;color:#888;">暂无更新日志</div>';
    }

    // 开发商卡片
    const devAvatar = document.getElementById('detail-dev-avatar');
    devAvatar.innerHTML =
        `<img src="${dev.avatarUrl}" alt="${dev.name}" onerror="this.style.display='none';this.parentNode.textContent='${dev.avatar||'👤'}'">`;
    document.getElementById('detail-dev-name').textContent = dev.name || '未知开发者';
    document.getElementById('detail-dev-desc').textContent = dev.description || '暂无简介';
    const badgeDom = document.getElementById('detail-dev-badge');
    if (dev.badge) {
        badgeDom.className = `verified-badge badge-${dev.badge}`;
        badgeDom.title = dev.badgeTitle || '认证';
        badgeDom.textContent = '✓';
        badgeDom.style.display = '';
    } else {
        badgeDom.style.display = 'none';
    }
    document.getElementById('detail-dev-card').onclick = () => goToDeveloper(app.developerId);

    // 协助开发
    const collabSection = document.getElementById('collaborator-section'), collabGrid = document.getElementById('collaborator-grid');
    collabGrid.innerHTML = '';
    if (app.collaborators && app.collaborators.length) {
        collabSection.style.display = 'block';
        app.collaborators.forEach(c => {
            const devData = DEVELOPERS[c.id] || {};
            const item = document.createElement('div');
            item.className = 'collaborator-item';
            item.onclick = () => goToDeveloper(c.id);
            item.innerHTML = `
                <div class="collaborator-avatar"><img src="${devData.avatarUrl||''}" alt="${c.name}" onerror="this.style.display='none';this.parentNode.textContent='${devData.avatar||c.name.charAt(0)}'"></div>
                <div class="collaborator-info">
                    ${c.name}
                    <span class="collaborator-role">${c.role||'合作'}</span>
                </div>
            `;
            collabGrid.appendChild(item);
        });
    } else {
        collabSection.style.display = 'none';
    }

    // 粘性标题
    attachScrollListener(app.name, btnText, btnCls);

    // 切换页面
    pageHistory.push('app-detail');
    showPage('app-detail');
}

// ---------- 开发者页面 ----------
function goToDeveloper(devId) {
    const dev = DEVELOPERS[devId];
    if (!dev) return;

    hideBottomNav();
    detachScrollListener();

    const avatarEl = document.getElementById('dev-avatar');
    avatarEl.innerHTML =
        `<img src="${dev.avatarUrl}" alt="${dev.name}" onerror="this.style.display='none';this.parentNode.textContent='${dev.avatar||'👤'}'">`;
    document.getElementById('dev-name').textContent = dev.name;

    const badgeDom = document.getElementById('dev-badge');
    if (dev.badge) {
        badgeDom.className = `verified-badge badge-${dev.badge}`;
        badgeDom.title = dev.badgeTitle || '认证';
        badgeDom.textContent = '✓';
        badgeDom.style.display = '';
    } else {
        badgeDom.style.display = 'none';
    }
    document.getElementById('dev-desc').textContent = dev.description || '暂无简介';

    // 统计
    const ownedApps = Object.values(APPS).filter(a => a.developerId === devId && (a.status === 'online' || a.status === 'beta'));
    const assistApps = Object.values(APPS).filter(a =>
        (a.status === 'online' || a.status === 'beta') &&
        a.collaborators && a.collaborators.some(c => c.id === devId)
    );
    const allRelated = Array.from(new Map([...ownedApps, ...assistApps].map(a => [a.id, a])).values());
    const onlineApps = allRelated.filter(a => a.status === 'online');
    const totalApps = onlineApps.length;
    let totalRating = 0, totalDownloads = 0;
    onlineApps.forEach(a => {
        totalRating += a.rating || 0;
        totalDownloads += parseDownloads(a.downloads);
    });
    const avgRating = totalApps > 0 ? (totalRating / totalApps).toFixed(1) : '-';
    const totalDlStr = totalDownloads >= 10000 ? (totalDownloads / 10000).toFixed(1) + '万' :
        totalDownloads > 0 ? totalDownloads + '' : '-';
    const ratingDlEl = document.getElementById('dev-rating-downloads');
    ratingDlEl.textContent = (avgRating !== '-' && totalDlStr !== '-') ? `★ ${avgRating} · 下载量${totalDlStr}` : '';
    document.getElementById('dev-app-count').textContent = totalApps;

    // 开发的应用
    const ownedWrap = document.getElementById('dev-owned-apps'), ownedTitle = document.getElementById('dev-owned-title');
    ownedWrap.innerHTML = '';
    if (ownedApps.length) {
        ownedTitle.style.display = 'block';
        ownedApps.forEach(app => ownedWrap.appendChild(createAppItem(app, false)));
    } else {
        ownedTitle.style.display = 'none';
    }

    // 协助开发
    const assistWrap = document.getElementById('dev-assist-apps'), assistTitle = document.getElementById('dev-assist-title');
    assistWrap.innerHTML = '';
    if (assistApps.length) {
        assistTitle.style.display = 'block';
        assistWrap.style.display = 'block';
        assistApps.forEach(app => assistWrap.appendChild(createAppItem(app, false)));
    } else {
        assistTitle.style.display = 'none';
        assistWrap.style.display = 'none';
    }

    pageHistory.push('developer');
    showPage('developer');
}

// ---------- 社区 & 创作者 ----------
function switchCommunityTab(filter, el) {
    currentCommunityFilter = filter;
    document.querySelectorAll('.community-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    renderPosts();
}

function renderPosts() {
    const wrap = document.getElementById('post-list');
    wrap.innerHTML = '';
    let list = POSTS;
    if (currentCommunityFilter === 'official') list = list.filter(p => p.type === 'official');
    if (currentCommunityFilter === 'developer') list = list.filter(p => p.type === 'developer');
    if (!list.length) {
        wrap.innerHTML = '<div style="padding:40px;text-align:center;color:#888;">暂无动态</div>';
        return;
    }
    list.forEach(post => {
        let badgeHtml = '';
        if (post.badge === 'red') badgeHtml = `<span class="verified-badge badge-red" title="官方认证">✓</span>`;
        else if (post.badge === 'gold') badgeHtml = `<span class="verified-badge badge-gold" title="网站站主专属">✓</span>`;
        else if (post.badge === 'blue') badgeHtml = `<span class="verified-badge badge-blue" title="企业认证">✓</span>`;
        const usernameClass = post.username === '七七官方' ? 'post-username username-official' : 'post-username';

        const card = document.createElement('div');
        card.className = 'post-card' + (post.type === 'official' ? ' official' : '');
        card.innerHTML = `
            <div class="post-header">
                <div class="post-avatar"><img src="${post.avatarUrl}" alt="${post.username}" onerror="this.style.display='none';this.parentNode.style.background='${post.avatarColor}';this.parentNode.textContent='${post.avatar}'"></div>
                <div class="post-user-info">
                    <div class="post-user-row">
                        <span class="${usernameClass}">${post.username}</span>
                        ${badgeHtml}
                    </div>
                    <div class="post-time">${post.time}</div>
                </div>
            </div>
            <div class="post-content">${post.content}</div>
            <div class="post-actions">
                <div class="post-action"><span>❤️</span>${post.likes}</div>
                <div class="post-action"><span>💬</span>${post.comments}</div>
                <div class="post-action"><span>↗</span>${post.shares}</div>
            </div>
        `;
        wrap.appendChild(card);
    });
}

function renderCreators() {
    const wrap = document.getElementById('creator-list');
    wrap.innerHTML = '';
    const devs = Object.values(DEVELOPERS);
    if (!devs.length) {
        wrap.innerHTML = '<div style="padding:40px;text-align:center;color:#888;">暂无开发者</div>';
        return;
    }
    devs.forEach(dev => {
        const item = document.createElement('div');
        item.className = 'creator-item';
        item.onclick = () => goToDeveloper(dev.id);
        const badgeHtml = getBadgeHTML(dev);
        item.innerHTML = `
            <div class="creator-avatar"><img src="${dev.avatarUrl}" alt="${dev.name}" onerror="this.style.display='none';this.parentNode.textContent='${dev.avatar||'👤'}'"></div>
            <div class="creator-info">
                <div class="creator-name-row">
                    <span class="creator-name">${dev.name}</span>
                    ${badgeHtml}
                </div>
                <div class="creator-desc">${dev.description||'暂无简介'}</div>
            </div>
            <div class="creator-arrow">›</div>
        `;
        wrap.appendChild(item);
    });
}

// ---------- 模态框 & 弹窗 ----------
const modalOverlay = document.getElementById('update-modal');
const modalList = document.getElementById('modal-update-list');

function openUpdateModal() {
    modalList.innerHTML = '';
    if (!currentAppUpdates.length) {
        modalList.innerHTML = '<div style="padding:20px;text-align:center;color:#888;">暂无更新记录</div>';
    } else {
        currentAppUpdates.forEach(u => {
            const div = document.createElement('div');
            div.className = 'modal-update-item';
            div.innerHTML =
                `<div class="modal-update-version"><span>${u.version}</span><span class="modal-update-date">${u.date}</span></div><div class="modal-update-content">${u.content}</div>`;
            modalList.appendChild(div);
        });
    }
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeUpdateModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

document.getElementById('show-all-updates-btn').addEventListener('click', openUpdateModal);
document.getElementById('modal-close-btn').addEventListener('click', closeUpdateModal);
modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) closeUpdateModal(); });

// 自定义提示
function showAlert(message) {
    const overlay = document.getElementById('alert-overlay');
    document.getElementById('alert-message').textContent = message || '该应用暂无外部链接';
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeAlert() {
    document.getElementById('alert-overlay').classList.remove('active');
    document.body.style.overflow = '';
}
document.getElementById('alert-btn').addEventListener('click', closeAlert);
document.getElementById('alert-overlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('alert-overlay')) closeAlert();
});

// 图片预览
function openImagePreview(src) {
    if (!src) return;
    const overlay = document.getElementById('image-overlay');
    const img = document.getElementById('preview-image');
    img.src = src;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeImagePreview() {
    document.getElementById('image-overlay').classList.remove('active');
    document.body.style.overflow = '';
}
document.getElementById('image-overlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('image-overlay')) closeImagePreview();
});

// ---------- 键盘快捷键 ----------
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (document.getElementById('image-overlay').classList.contains('active')) closeImagePreview();
        else if (document.getElementById('alert-overlay').classList.contains('active')) closeAlert();
        else if (modalOverlay.classList.contains('active')) closeUpdateModal();
        else goBack();
    }
});

// ---------- 搜索功能 ----------
document.addEventListener('DOMContentLoaded', () => {
    const homeSearch = document.getElementById('search-home');
    if (homeSearch) {
        homeSearch.addEventListener('input', (e) => {
            const keyword = e.target.value.trim().toLowerCase();
            const items = document.querySelectorAll('#home-app-list .app-list-item');
            items.forEach(item => {
                const name = item.querySelector('.app-name')?.textContent?.toLowerCase() || '';
                const desc = item.querySelector('.app-desc')?.textContent?.toLowerCase() || '';
                item.style.display = (name.includes(keyword) || desc.includes(keyword)) ? '' : 'none';
            });
        });
    }
    const appsSearch = document.getElementById('search-apps');
    if (appsSearch) {
        appsSearch.addEventListener('input', (e) => {
            const keyword = e.target.value.trim().toLowerCase();
            const items = document.querySelectorAll('#all-apps-list .app-list-item');
            items.forEach(item => {
                const name = item.querySelector('.app-name')?.textContent?.toLowerCase() || '';
                const desc = item.querySelector('.app-desc')?.textContent?.toLowerCase() || '';
                item.style.display = (name.includes(keyword) || desc.includes(keyword)) ? '' : 'none';
            });
        });
    }
});

// ---------- 初始化 ----------
document.addEventListener('DOMContentLoaded', () => {
    renderHomeList();
    renderPosts();
    renderCreators();
    showPage('home');
    showBottomNav();
    console.log('✅ 七七软件商城加载完成');
});