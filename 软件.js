<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
    <title>七七软件商城</title>
    <style>
        /* ===== 全局重置 & 基础样式 ===== */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
            background: #f2f2f7;
            color: #000;
            padding-bottom: 85px;
            -webkit-user-select: none;
            user-select: none;
        }
        input,
        textarea {
            -webkit-user-select: text;
            user-select: text;
        }

        /* ===== 通用组件 ===== */
        .verified-badge {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 18px;
            height: 18px;
            border-radius: 50%;
            font-size: 13px;
            font-weight: 700;
            color: #fff;
            flex-shrink: 0;
            cursor: default;
            margin-left: 4px;
            background: #8E8E93;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
        }
        .badge-gold { background: linear-gradient(135deg, #FFD700, #FF9900); }
        .badge-blue { background: linear-gradient(135deg, #00D8FF, #007AFF); }
        .badge-gray { background: linear-gradient(135deg, #9a9aa0, #727278); }
        .badge-red { background: linear-gradient(135deg, #FF3B30, #D70015); }

        /* ===== 页面切换 ===== */
        .page { display: none; }
        .page.active { display: block; animation: fadeIn 0.3s ease; }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        /* ===== 头部 ===== */
        .header {
            position: sticky;
            top: 0;
            background: rgba(242, 242, 247, 0.82);
            backdrop-filter: blur(18px);
            -webkit-backdrop-filter: blur(18px);
            z-index: 90;
            border-bottom: 0.5px solid rgba(0, 0, 0, 0.08);
        }
        .header-content {
            max-width: 900px;
            margin: 0 auto;
            padding: 12px 20px;
            display: flex;
            align-items: center;
            gap: 12px;
            flex-wrap: wrap;
        }
        .app-title {
            font-size: 28px;
            font-weight: 700;
            letter-spacing: -0.2px;
            margin: 0;
            flex: 1;
        }
        .back-btn {
            display: inline-flex;
            align-items: center;
            color: #007AFF;
            font-size: 17px;
            cursor: pointer;
            flex-shrink: 0;
        }
        .back-btn::before {
            content: '‹';
            font-size: 28px;
            margin-right: 4px;
        }
        .sticky-title {
            font-size: 18px;
            font-weight: 600;
            flex: 1;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: none;
        }
        .sticky-visit-btn {
            flex-shrink: 0;
            display: none;
        }

        /* ===== 搜索栏 ===== */
        .search-bar {
            display: flex;
            align-items: center;
            background: #e4e4ea;
            border-radius: 10px;
            padding: 7px 12px;
            flex: 1;
            min-width: 120px;
        }
        .search-bar:focus-within {
            background: #fff;
            box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.18);
        }
        .search-icon { color: #8e8e93; margin-right: 8px; font-size: 14px; }
        .search-input {
            flex: 1;
            border: none;
            background: transparent;
            font-size: 16px;
            outline: none;
        }

        /* ===== 容器 & 标题 ===== */
        .container {
            max-width: 900px;
            margin: 0 auto;
            padding: 16px 20px;
        }
        .section-title {
            font-size: 20px;
            font-weight: 700;
            margin: 24px 0 12px;
        }
        .section-title:first-child { margin-top: 8px; }

        /* ===== 分类标签 ===== */
        .category-tabs {
            display: flex;
            gap: 8px;
            overflow-x: auto;
            padding-bottom: 4px;
            margin-bottom: 16px;
        }
        .category-tab {
            padding: 7px 16px;
            background: #e5e5ea;
            border-radius: 18px;
            font-size: 14px;
            white-space: nowrap;
            cursor: pointer;
            transition: 0.2s;
        }
        .category-tab.active { background: #007AFF; color: #fff; }

        /* ===== 精选卡片 ===== */
        .featured-card {
            background: linear-gradient(135deg, #007AFF, #5856D6);
            border-radius: 16px;
            height: 200px;
            padding: 24px;
            color: #fff;
            cursor: pointer;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            position: relative;
            overflow: hidden;
            margin-bottom: 8px;
        }
        .featured-card::before {
            content: "";
            position: absolute;
            top: -40px;
            right: -40px;
            width: 160px;
            height: 160px;
            background: rgba(255, 255, 255, 0.08);
            border-radius: 50%;
        }
        .featured-title { font-size: 24px; font-weight: 700; margin: 6px 0; z-index: 2; position: relative; }
        .featured-desc { font-size: 14px; opacity: 0.9; z-index: 2; position: relative; }
        .featured-tag { z-index: 2; position: relative; font-size: 13px; opacity: 0.85; }

        /* ===== 应用列表项 ===== */
        .app-list {
            background: #fff;
            border-radius: 14px;
            overflow: hidden;
        }
        .app-list-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 14px 16px;
            border-bottom: 0.5px solid #eee;
            cursor: pointer;
            transition: background 0.2s;
            min-height: 80px;
        }
        .app-list-item:last-child { border-bottom: none; }
        .app-list-item:hover { background: #f8f8fa; }

        .rank-number {
            width: 28px;
            height: 28px;
            line-height: 28px;
            text-align: center;
            font-size: 15px;
            font-weight: 700;
            color: #999;
            flex-shrink: 0;
            border-radius: 50%;
            background: transparent;
        }
        .top-1 { color: #fff; background: #FF9500; }
        .top-2 { color: #fff; background: #A8A8A8; }
        .top-3 { color: #fff; background: #CD7F32; }

        .app-icon {
            width: 52px;
            height: 52px;
            border-radius: 12px;
            flex-shrink: 0;
            overflow: hidden;
            background: #e5e5ea;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
        }
        .app-icon img { width: 100%; height: 100%; object-fit: cover; display: block; }

        .app-info {
            flex: 1;
            min-width: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .app-name-row {
            display: flex;
            align-items: center;
            gap: 6px;
            flex-wrap: wrap;
            margin-bottom: 2px;
        }
        .app-name {
            font-size: 15px;
            font-weight: 700;
            color: #000;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .app-rating-downloads {
            font-size: 12px;
            color: #888;
            white-space: nowrap;
            flex-shrink: 0;
        }
        .app-author-row {
            font-size: 13px;
            font-weight: 500;
            color: #666;
            display: flex;
            align-items: center;
            gap: 4px;
            margin-bottom: 2px;
        }
        .app-author-name { cursor: pointer; }
        .app-author-name:hover { color: #007AFF; }
        .app-desc {
            font-size: 13px;
            color: #888;
            margin-bottom: 5px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .visit-btn {
            padding: 6px 16px;
            border-radius: 18px;
            border: none;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            min-width: 60px;
            text-align: center;
            flex-shrink: 0;
        }
        .visit-btn.online { background: #e5e5ea; color: #007AFF; }
        .visit-btn.beta { background: rgba(255, 149, 0, 0.15); color: #FF9500; }
        .visit-btn.offline,
        .visit-btn.error { color: #888; cursor: not-allowed; }

        /* ===== 详情页 ===== */
        .detail-header {
            display: flex;
            align-items: center;
            padding: 16px 0;
            gap: 16px;
        }
        .detail-header .app-icon { width: 90px; height: 90px; border-radius: 20px; font-size: 40px; }
        .detail-header .app-name { font-size: 24px; font-weight: 700; color: #000; margin-bottom: 6px; }
        .detail-author-row {
            font-size: 14px;
            font-weight: 500;
            color: #666;
            display: flex;
            align-items: center;
            gap: 4px;
            cursor: pointer;
        }
        .detail-author-row:hover { color: #007AFF; }

        .detail-stats {
            display: flex;
            justify-content: space-around;
            background: #fff;
            border-radius: 14px;
            padding: 16px;
            margin-bottom: 20px;
            flex-wrap: wrap;
        }
        .stat-item { text-align: center; padding: 4px 8px; }
        .stat-value { font-size: 18px; font-weight: 700; color: #007AFF; margin-bottom: 4px; }
        .stat-label { font-size: 12px; color: #888; }

        .screenshots {
            display: flex;
            gap: 10px;
            overflow-x: auto;
            padding-bottom: 5px;
        }
        .screenshot {
            width: 150px;
            height: 270px;
            border-radius: 10px;
            flex-shrink: 0;
            overflow: hidden;
            background: #eee;
            cursor: pointer;
            transition: transform 0.15s;
            position: relative;
        }
        .screenshot:hover { transform: scale(1.02); }
        .screenshot img { width: 100%; height: 100%; object-fit: cover; display: block; }

        .detail-section-title {
            font-size: 18px;
            font-weight: 700;
            margin: 20px 0 10px;
        }
        .detail-description {
            font-size: 14px;
            line-height: 1.6;
            white-space: pre-line;
            color: #333;
        }

        .update-log {
            background: #fff;
            border-radius: 14px;
            padding: 4px 16px;
        }
        .update-item {
            padding: 12px 0;
            border-bottom: 0.5px solid #eee;
        }
        .update-item:last-child { border-bottom: none; }
        .update-version {
            display: flex;
            justify-content: space-between;
            font-size: 15px;
            font-weight: 600;
            margin-bottom: 4px;
        }
        .update-date { font-size: 12px; color: #888; font-weight: 400; }
        .update-content {
            font-size: 13px;
            line-height: 1.6;
            white-space: pre-line;
            color: #333;
        }

        .developer-card {
            background: #fff;
            border-radius: 14px;
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 14px;
            cursor: pointer;
            transition: background 0.2s;
        }
        .developer-card:hover { background: #f8f8fa; }
        .dev-avatar {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            flex-shrink: 0;
            overflow: hidden;
            background: #e5e5ea;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
        }
        .dev-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .dev-name-row {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 4px;
        }
        .dev-name { font-size: 16px; font-weight: 600; }
        .dev-desc { font-size: 13px; color: #888; }
        .dev-arrow { color: #ccc; font-size: 20px; margin-left: auto; }

        .collaborator-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            margin-top: 8px;
            background: #fff;
            border-radius: 14px;
            padding: 16px;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
        }
        .collaborator-item {
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            transition: background 0.2s;
            padding: 8px 12px;
            border-radius: 10px;
            background: #f8f8fa;
        }
        .collaborator-item:hover { background: #e8e8ee; }
        .collaborator-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            flex-shrink: 0;
            background: #e5e5ea;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
        }
        .collaborator-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .collaborator-info {
            font-size: 13px;
            font-weight: 500;
            color: #333;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .collaborator-role {
            font-size: 11px;
            color: #888;
            display: block;
            margin-top: 1px;
        }

        .info-list {
            background: #fff;
            border-radius: 12px;
            overflow: hidden;
        }
        .info-item {
            display: flex;
            justify-content: space-between;
            padding: 10px 14px;
            border-bottom: 0.5px solid #eee;
            font-size: 14px;
        }
        .info-item:last-child { border-bottom: none; }
        .info-label { color: #888; }
        .info-value { font-weight: 500; }

        /* ===== 开发者页 ===== */
        .developer-header {
            text-align: center;
            padding: 20px 0;
        }
        .developer-avatar {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            margin: 0 auto 12px;
            overflow: hidden;
            background: #e5e5ea;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 36px;
        }
        .developer-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .developer-name-row {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            flex-wrap: wrap;
            margin-bottom: 6px;
        }
        .developer-name { font-size: 24px; font-weight: 700; }
        .dev-rating-downloads {
            font-size: 14px;
            color: #888;
            font-weight: 400;
            display: inline-flex;
            align-items: center;
            gap: 6px;
            margin-left: 6px;
        }
        .developer-desc { font-size: 14px; color: #888; }
        .developer-stats {
            display: flex;
            justify-content: center;
            background: #fff;
            border-radius: 14px;
            padding: 16px;
            margin-bottom: 20px;
        }

        /* ===== 社区 ===== */
        .community-tabs {
            display: flex;
            background: #fff;
            border-radius: 14px;
            padding: 4px;
            margin-bottom: 16px;
        }
        .community-tab {
            flex: 1;
            text-align: center;
            padding: 8px;
            font-size: 14px;
            border-radius: 10px;
            cursor: pointer;
            color: #888;
        }
        .community-tab.active { background: #007AFF; color: #fff; font-weight: 600; }

        .post-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .post-card {
            background: #fff;
            border-radius: 14px;
            padding: 16px;
        }
        .post-card.official {
            border: 1px solid rgba(255, 59, 48, 0.25);
            background: #fff9f9;
        }
        .post-header {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 12px;
        }
        .post-avatar {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            overflow: hidden;
            flex-shrink: 0;
            background: #e5e5ea;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
        }
        .post-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .post-user-row {
            display: flex;
            align-items: center;
            gap: 6px;
            margin-bottom: 2px;
        }
        .post-username { font-size: 15px; font-weight: 600; }
        .username-official { color: #FF3B30 !important; }
        .post-time { font-size: 12px; color: #888; }
        .post-content {
            font-size: 14px;
            line-height: 1.6;
            margin-bottom: 12px;
            white-space: pre-line;
        }
        .post-actions {
            display: flex;
            justify-content: space-around;
            padding-top: 10px;
            border-top: 0.5px solid #eee;
        }
        .post-action {
            display: flex;
            align-items: center;
            gap: 5px;
            font-size: 13px;
            color: #888;
            cursor: pointer;
        }
        .post-action:hover { color: #007AFF; }

        /* ===== 创作者列表 ===== */
        .creator-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        .creator-item {
            background: #fff;
            border-radius: 14px;
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 14px;
            cursor: pointer;
            transition: background 0.2s;
        }
        .creator-item:hover { background: #f8f8fa; }
        .creator-avatar {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            flex-shrink: 0;
            overflow: hidden;
            background: #e5e5ea;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
        }
        .creator-avatar img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .creator-info { flex: 1; }
        .creator-name-row {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 4px;
        }
        .creator-name { font-size: 16px; font-weight: 600; }
        .creator-desc { font-size: 13px; color: #888; }
        .creator-arrow { color: #ccc; font-size: 20px; }

        /* ===== 底部导航 ===== */
        .bottom-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background: rgba(249, 249, 249, 0.94);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border-top: 0.5px solid rgba(0, 0, 0, 0.1);
            z-index: 999;
            padding-bottom: env(safe-area-inset-bottom);
            transition: transform 0.3s ease, opacity 0.3s ease;
        }
        .bottom-nav.hidden {
            transform: translateY(100%);
            opacity: 0;
            pointer-events: none;
        }
        .bottom-nav-content {
            max-width: 900px;
            margin: 0 auto;
            display: flex;
            justify-content: space-around;
            padding: 6px 0 12px;
        }
        .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            color: #8E8E93;
            font-size: 10px;
            cursor: pointer;
            padding: 4px 12px;
        }
        .nav-item.active { color: #007AFF; }
        .nav-icon { font-size: 20px; margin-bottom: 3px; }

        /* ===== 模态框 ===== */
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            z-index: 1000;
            display: none;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        .modal-overlay.active { display: flex; }
        .modal-card {
            background: #fff;
            border-radius: 20px;
            max-width: 600px;
            width: 100%;
            max-height: 80vh;
            padding: 24px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            overflow-y: auto;
            position: relative;
        }
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 16px;
        }
        .modal-header h3 { font-size: 20px; font-weight: 700; }
        .modal-close {
            background: none;
            border: none;
            font-size: 28px;
            color: #888;
            cursor: pointer;
            padding: 0 8px;
        }
        .modal-close:hover { color: #000; }
        .modal-update-item {
            padding: 12px 0;
            border-bottom: 0.5px solid #eee;
        }
        .modal-update-item:last-child { border-bottom: none; }
        .modal-update-version {
            display: flex;
            justify-content: space-between;
            font-size: 15px;
            font-weight: 600;
            margin-bottom: 4px;
        }
        .modal-update-date { font-size: 12px; color: #888; font-weight: 400; }
        .modal-update-content {
            font-size: 13px;
            line-height: 1.6;
            white-space: pre-line;
            color: #333;
        }

        /* ===== 自定义提示弹窗 ===== */
        .alert-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.45);
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
            z-index: 2000;
            display: none;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        .alert-overlay.active { display: flex; }
        .alert-card {
            background: #fff;
            border-radius: 20px;
            max-width: 340px;
            width: 100%;
            padding: 28px 24px 20px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            text-align: center;
            animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes scaleIn {
            from { transform: scale(0.92); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        .alert-icon { font-size: 44px; margin-bottom: 12px; display: block; }
        .alert-title { font-size: 18px; font-weight: 700; color: #000; margin-bottom: 6px; }
        .alert-message { font-size: 14px; color: #666; line-height: 1.5; margin-bottom: 20px; }
        .alert-btn {
            background: #007AFF;
            color: #fff;
            border: none;
            border-radius: 12px;
            padding: 10px 24px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
            min-width: 100px;
        }
        .alert-btn:hover { background: #0055CC; }
        .alert-btn:active { transform: scale(0.96); }

        /* ===== 图片预览弹窗 ===== */
        .image-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(6px);
            -webkit-backdrop-filter: blur(6px);
            z-index: 2000;
            display: none;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        .image-overlay.active { display: flex; }
        .image-card {
            background: #fff;
            border-radius: 20px;
            max-width: 90vw;
            max-height: 90vh;
            width: auto;
            padding: 16px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            display: flex;
            flex-direction: column;
            align-items: center;
            animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            position: relative;
        }
        .image-card img {
            max-width: 100%;
            max-height: calc(90vh - 80px);
            width: auto;
            height: auto;
            object-fit: contain;
            border-radius: 12px;
            display: block;
        }
        .image-close {
            align-self: flex-end;
            background: none;
            border: none;
            font-size: 28px;
            color: #888;
            cursor: pointer;
            padding: 4px 8px;
            margin-bottom: 8px;
            transition: color 0.2s;
            line-height: 1;
        }
        .image-close:hover { color: #000; }

        /* ===== 响应式 ===== */
        @media(max-width:600px) {
            .app-title { font-size: 24px; }
            .featured-card { height: 170px; padding: 18px; }
            .featured-title { font-size: 20px; }
            .app-icon { width: 48px; height: 48px; font-size: 24px; }
            .app-name { font-size: 14px; }
            .app-rating-downloads { font-size: 11px; }
            .detail-header .app-icon { width: 70px; height: 70px; font-size: 32px; }
            .detail-header .app-name { font-size: 20px; }
            .screenshot { width: 130px; height: 230px; }
            .header-content { flex-wrap: wrap; }
            .header-content .app-title { font-size: 22px; }
            .sticky-title { font-size: 16px; }
            .dev-rating-downloads { font-size: 12px; margin-left: 4px; }
            .developer-name { font-size: 20px; }
            .modal-card { max-height: 90vh; padding: 16px; }
            .creator-avatar { width: 44px; height: 44px; font-size: 18px; }
            .creator-name { font-size: 14px; }
            .creator-desc { font-size: 12px; }
            .collaborator-grid { grid-template-columns: 1fr; gap: 8px; padding: 12px; }
            .collaborator-avatar { width: 32px; height: 32px; font-size: 14px; }
            .collaborator-info { font-size: 12px; }
            .alert-card { max-width: 300px; padding: 24px 20px 16px; }
            .alert-icon { font-size: 36px; }
            .image-card { padding: 12px; max-width: 95vw; }
            .image-close { font-size: 24px; }
            .image-card img { max-height: calc(90vh - 60px); }
        }
    </style>
</head>
<body>

    <!-- ==================== 首页 ==================== -->
    <div class="page active" id="page-home">
        <div class="header">
            <div class="header-content">
                <h1 class="app-title">七七软件商城</h1>
                <div class="search-bar">
                    <span class="search-icon">🔍</span>
                    <input class="search-input" placeholder="搜索应用、游戏和更多" id="search-home" />
                </div>
            </div>
        </div>
        <div class="container">
            <h2 class="section-title">今日精选</h2>
            <div class="featured-card" onclick="goToAppDetail('video')">
                <div class="featured-tag">精选推荐</div>
                <h3 class="featured-title">七七视频解析</h3>
                <p class="featured-desc">全网视频免费看，支持各大平台解析</p>
            </div>
            <h2 class="section-title">热门排行</h2>
            <div class="app-list" id="home-app-list"></div>
        </div>
    </div>

    <!-- ==================== 应用列表页 ==================== -->
    <div class="page" id="page-apps">
        <div class="header">
            <div class="header-content">
                <h1 class="app-title">应用</h1>
                <div class="search-bar">
                    <span class="search-icon">🔍</span>
                    <input class="search-input" placeholder="搜索应用" id="search-apps" />
                </div>
            </div>
        </div>
        <div class="container">
            <div class="category-tabs">
                <div class="category-tab active" onclick="filterCategory('all',this)">全部</div>
                <div class="category-tab" onclick="filterCategory('tools',this)">工具</div>
                <div class="category-tab" onclick="filterCategory('reading',this)">阅读</div>
                <div class="category-tab" onclick="filterCategory('education',this)">教育</div>
                <div class="category-tab" onclick="filterCategory('game',this)">游戏</div>
                <div class="category-tab" onclick="filterCategory('me',this)">个人</div>
                <div class="category-tab" onclick="filterCategory('online',this)">已上线</div>
            </div>
            <div class="app-list" id="all-apps-list"></div>
        </div>
    </div>

    <!-- ==================== 应用详情页 ==================== -->
    <div class="page" id="page-app-detail">
        <div class="header">
            <div class="header-content">
                <div class="back-btn" onclick="goBack()">返回</div>
                <span class="sticky-title" id="sticky-title">应用名称</span>
                <button class="visit-btn online sticky-visit-btn" id="sticky-visit-btn">访问</button>
            </div>
        </div>
        <div class="container">
            <div class="detail-header" id="detail-header">
                <div class="app-icon" id="detail-icon"><img src="" alt="应用图标" /></div>
                <div class="app-info">
                    <div class="app-name-row">
                        <span class="app-name" id="detail-name">应用名称</span>
                    </div>
                    <div class="detail-author-row" id="detail-developer">开发者</div>
                </div>
                <button class="visit-btn online" id="detail-btn">访问</button>
            </div>
            <div class="detail-stats">
                <div class="stat-item"><div class="stat-value" id="detail-rank">#1</div><div class="stat-label">排行榜</div></div>
                <div class="stat-item"><div class="stat-value" id="detail-rating">4.9</div><div class="stat-label">评分</div></div>
                <div class="stat-item"><div class="stat-value" id="detail-downloads">10万+</div><div class="stat-label">下载</div></div>
                <div class="stat-item"><div class="stat-value" id="detail-version">1.0.0</div><div class="stat-label">版本</div></div>
                <div class="stat-item"><div class="stat-value">12+</div><div class="stat-label">年龄</div></div>
            </div>

            <h3 class="detail-section-title">预览</h3>
            <div id="status-banner" style="display:none; padding:12px 16px; border-radius:12px; margin-bottom:16px; font-size:14px; line-height:1.5; align-items:center; gap:10px;">
                <span id="status-banner-icon" style="font-size:18px;"></span>
                <span id="status-banner-text" style="flex:1;"></span>
            </div>
            <div class="screenshots" id="screenshots-container"></div>

            <h3 class="detail-section-title">应用介绍</h3>
            <p class="detail-description" id="detail-description"></p>
            <h3 class="detail-section-title">更新日志</h3>
            <div class="update-log" id="detail-update-log"></div>
            <button class="visit-btn online" id="show-all-updates-btn" style="margin-top:12px; width:100%;">查看全部更新日志</button>

            <h3 class="detail-section-title">开发商</h3>
            <div class="developer-card" id="detail-dev-card" onclick="goToDeveloper('sevenqi')">
                <div class="dev-avatar" id="detail-dev-avatar"><img src="" alt="开发商头像" /></div>
                <div class="dev-info">
                    <div class="dev-name-row">
                        <span class="dev-name" id="detail-dev-name">开发者名称</span>
                        <span class="verified-badge badge-gold" id="detail-dev-badge" title="网站站主专属">✓</span>
                    </div>
                    <div class="dev-desc" id="detail-dev-desc">开发者简介</div>
                </div>
                <div class="dev-arrow">›</div>
            </div>

            <div id="collaborator-section" style="display:none;">
                <h3 class="detail-section-title">协助开发</h3>
                <div class="collaborator-grid" id="collaborator-grid"></div>
            </div>

            <h3 class="detail-section-title">信息</h3>
            <div class="info-list">
                <div class="info-item"><span class="info-label">大小</span><span class="info-value">2.3 MB</span></div>
                <div class="info-item"><span class="info-label">类别</span><span class="info-value" id="detail-category">工具</span></div>
                <div class="info-item"><span class="info-label">版本</span><span class="info-value" id="detail-info-version">1.0.0</span></div>
                <div class="info-item"><span class="info-label">兼容性</span><span class="info-value">所有设备</span></div>
                <div class="info-item"><span class="info-label">状态</span><span class="info-value" id="detail-status-text">已上线</span></div>
                <div class="info-item"><span class="info-label">语言</span><span class="info-value">简体中文</span></div>
            </div>
        </div>
    </div>

    <!-- ==================== 开发者页面 ==================== -->
    <div class="page" id="page-developer">
        <div class="header">
            <div class="header-content">
                <div class="back-btn" onclick="goBack()">返回</div>
            </div>
        </div>
        <div class="container">
            <div class="developer-header">
                <div class="developer-avatar" id="dev-avatar"><img src="" alt="开发者头像" /></div>
                <div class="developer-name-row">
                    <span class="developer-name" id="dev-name">开发者名称</span>
                    <span class="verified-badge badge-gold" id="dev-badge" title="网站站主专属">✓</span>
                    <span class="dev-rating-downloads" id="dev-rating-downloads">★ 4.8 · 下载量50万+</span>
                </div>
                <div class="developer-desc" id="dev-desc">开发者简介</div>
            </div>
            <div class="developer-stats">
                <div class="stat-item"><div class="stat-value" id="dev-app-count">0</div><div class="stat-label">总应用数</div></div>
            </div>

            <h3 class="detail-section-title" id="dev-owned-title">开发者的应用</h3>
            <div class="app-list developer-apps" id="dev-owned-apps"></div>

            <h3 class="detail-section-title" id="dev-assist-title" style="display:none;">协助开发</h3>
            <div class="app-list developer-apps" id="dev-assist-apps" style="display:none;"></div>
        </div>
    </div>

    <!-- ==================== 社区 ==================== -->
    <div class="page" id="page-community">
        <div class="header">
            <div class="header-content">
                <h1 class="app-title">社区</h1>
                <div class="search-bar">
                    <span class="search-icon">🔍</span>
                    <input class="search-input" placeholder="搜索动态" id="search-community" />
                </div>
            </div>
        </div>
        <div class="container">
            <div class="community-tabs">
                <div class="community-tab active" onclick="switchCommunityTab('all',this)">全部</div>
                <div class="community-tab" onclick="switchCommunityTab('official',this)">官方公告</div>
                <div class="community-tab" onclick="switchCommunityTab('developer',this)">开发者</div>
            </div>
            <div class="post-list" id="post-list"></div>
        </div>
    </div>

    <!-- ==================== 创作者 ==================== -->
    <div class="page" id="page-mine">
        <div class="header">
            <div class="header-content">
                <h1 class="app-title">创作者</h1>
            </div>
        </div>
        <div class="container">
            <h2 class="section-title">网站所有开发者</h2>
            <div class="creator-list" id="creator-list"></div>
        </div>
    </div>

    <!-- ==================== 底部导航 ==================== -->
    <div class="bottom-nav" id="bottomNav">
        <div class="bottom-nav-content">
            <div class="nav-item active" onclick="switchTab('home')"><span class="nav-icon">🏠</span><span>首页</span></div>
            <div class="nav-item" onclick="switchTab('apps')"><span class="nav-icon">📱</span><span>应用</span></div>
            <div class="nav-item" onclick="switchTab('community')"><span class="nav-icon">💬</span><span>社区</span></div>
            <div class="nav-item" onclick="switchTab('mine')"><span class="nav-icon">👤</span><span>创作者</span></div>
        </div>
    </div>

    <!-- ==================== 模态框 ==================== -->
    <div class="modal-overlay" id="update-modal">
        <div class="modal-card">
            <div class="modal-header">
                <h3>全部更新日志</h3>
                <button class="modal-close" id="modal-close-btn">&times;</button>
            </div>
            <div id="modal-update-list"></div>
        </div>
    </div>

    <div class="alert-overlay" id="alert-overlay">
        <div class="alert-card">
            <span class="alert-icon">🔔</span>
            <div class="alert-title">提示</div>
            <div class="alert-message" id="alert-message">该应用暂无外部链接</div>
            <button class="alert-btn" id="alert-btn">我知道了</button>
        </div>
    </div>

    <div class="image-overlay" id="image-overlay" onclick="closeImagePreview()">
        <div class="image-card" onclick="event.stopPropagation();">
            <button class="image-close" onclick="closeImagePreview()">✕</button>
            <img id="preview-image" src="" alt="图片预览" />
        </div>
    </div>

    <!-- ===== 引用数据文件（软件.js） ===== -->
    <script src="软件.js"></script>

    <!-- ===== 交互逻辑（内联） ===== -->
    <script>
        (function() {
            // ---------- 确保数据已加载 ----------
            if (typeof APPS === 'undefined' || typeof DEVELOPERS === 'undefined' || typeof POSTS === 'undefined') {
                console.error('数据文件 软件.js 未正确加载，请检查文件是否存在以及第一行是否有非法字符（如 ?）');
                return;
            }

            // ---------- 页面状态 ----------
            let currentPage = 'home';
            let pageStack = ['home'];

            // ---------- 工具函数 ----------
            function getAppById(id) { return APPS[id]; }
            function getDeveloperById(id) { return DEVELOPERS[id]; }
            function getAllApps() { return Object.values(APPS); }

            function getDeveloperApps(devId) {
                const apps = getAllApps();
                const owned = apps.filter(app => app.developerId === devId);
                const assist = apps.filter(app => app.collaborators && app.collaborators.some(c => c.id === devId));
                return { owned, assist };
            }

            // ---------- 页面切换 ----------
            function showPage(pageId) {
                document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
                const target = document.getElementById('page-' + pageId);
                if (target) target.classList.add('active');
                document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
                const navMap = { home: 0, apps: 1, community: 2, mine: 3 };
                const idx = navMap[pageId];
                if (idx !== undefined) {
                    const navItems = document.querySelectorAll('.nav-item');
                    if (navItems[idx]) navItems[idx].classList.add('active');
                }
                window.scrollTo(0, 0);
                const bottomNav = document.getElementById('bottomNav');
                if (pageId === 'app-detail' || pageId === 'developer') {
                    bottomNav.classList.add('hidden');
                } else {
                    bottomNav.classList.remove('hidden');
                }
                currentPage = pageId;
            }

            window.switchTab = function(tab) {
                if (tab === 'home' || tab === 'apps' || tab === 'community' || tab === 'mine') {
                    showPage(tab);
                    if (tab === 'home') renderHome();
                    else if (tab === 'apps') renderApps('all');
                    else if (tab === 'community') renderCommunity('all');
                    else if (tab === 'mine') renderCreators();
                }
            };

            window.goBack = function() {
                if (pageStack.length > 1) {
                    pageStack.pop();
                    const prev = pageStack[pageStack.length - 1];
                    showPage(prev);
                    if (prev === 'home') renderHome();
                    else if (prev === 'apps') renderApps('all');
                    else if (prev === 'community') renderCommunity('all');
                    else if (prev === 'mine') renderCreators();
                } else {
                    showPage('home');
                    renderHome();
                }
            };

            // ---------- 渲染首页（只显示已上架） ----------
            function renderHome() {
                const container = document.getElementById('home-app-list');
                // 关键修改：只保留 status === 'online' 的应用
                const apps = getAllApps()
                    .filter(app => app.status === 'online')
                    .sort((a, b) => (a.rank || 999) - (b.rank || 999));
                container.innerHTML = apps.map((app, index) => {
                    const rankClass = index === 0 ? 'top-1' : index === 1 ? 'top-2' : index === 2 ? 'top-3' : '';
                    return `
                        <div class="app-list-item" onclick="goToAppDetail('${app.id}')">
                            <div class="rank-number ${rankClass}">${index + 1}</div>
                            <div class="app-icon"><img src="${app.iconUrl}" alt="${app.name}" onerror="this.style.display='none'"/></div>
                            <div class="app-info">
                                <div class="app-name-row">
                                    <span class="app-name">${app.name}</span>
                                    <span class="app-rating-downloads">★ ${app.rating} · ${app.downloads}</span>
                                </div>
                                <div class="app-author-row">
                                    <span class="app-author-name" onclick="event.stopPropagation();goToDeveloper('${app.developerId}')">${app.developer}</span>
                                </div>
                                <div class="app-desc">${app.shortDesc}</div>
                            </div>
                            <button class="visit-btn online" onclick="event.stopPropagation();visitApp('${app.id}')">访问</button>
                        </div>
                    `;
                }).join('');
            }

            // ---------- 应用列表（分类） ----------
            let currentCategory = 'all';
            window.filterCategory = function(category, el) {
                currentCategory = category;
                document.querySelectorAll('.category-tab').forEach(t => t.classList.remove('active'));
                if (el) el.classList.add('active');
                renderApps(category);
            };

            function renderApps(category) {
                const container = document.getElementById('all-apps-list');
                let apps = getAllApps();
                if (category === 'online') {
                    apps = apps.filter(a => a.status === 'online');
                } else if (category !== 'all') {
                    apps = apps.filter(a => a.category === category || a.categoryName === category);
                }
                apps.sort((a, b) => (a.rank || 999) - (b.rank || 999));
                container.innerHTML = apps.map(app => {
                    const statusClass = app.status === 'online' ? 'online' : (app.status === 'beta' ? 'beta' : 'error');
                    return `
                        <div class="app-list-item" onclick="goToAppDetail('${app.id}')">
                            <div class="app-icon"><img src="${app.iconUrl}" alt="${app.name}" onerror="this.style.display='none'"/></div>
                            <div class="app-info">
                                <div class="app-name-row">
                                    <span class="app-name">${app.name}</span>
                                    <span class="app-rating-downloads">★ ${app.rating} · ${app.downloads}</span>
                                </div>
                                <div class="app-author-row">
                                    <span class="app-author-name" onclick="event.stopPropagation();goToDeveloper('${app.developerId}')">${app.developer}</span>
                                </div>
                                <div class="app-desc">${app.shortDesc}</div>
                            </div>
                            <button class="visit-btn ${statusClass}" onclick="event.stopPropagation();visitApp('${app.id}')">
                                ${app.status === 'online' ? '访问' : (app.status === 'beta' ? '内测' : '下架')}
                            </button>
                        </div>
                    `;
                }).join('');
            }

            // ---------- 应用详情 ----------
            window.goToAppDetail = function(appId) {
                const app = getAppById(appId);
                if (!app) return;
                pageStack.push('app-detail');
                showPage('app-detail');

                document.getElementById('detail-icon').innerHTML = `<img src="${app.iconUrl}" alt="${app.name}" onerror="this.style.display='none'"/>`;
                document.getElementById('detail-name').textContent = app.name;
                document.getElementById('detail-developer').innerHTML = `开发者：${app.developer}`;
                document.getElementById('detail-developer').setAttribute('onclick', `goToDeveloper('${app.developerId}')`);
                document.getElementById('detail-rank').textContent = `#${app.rank || 0}`;
                document.getElementById('detail-rating').textContent = app.rating;
                document.getElementById('detail-downloads').textContent = app.downloads;
                document.getElementById('detail-version').textContent = app.version;
                document.getElementById('detail-info-version').textContent = app.version;
                document.getElementById('detail-category').textContent = app.categoryName || app.category;
                document.getElementById('detail-status-text').textContent = app.statusText || '未知';
                document.getElementById('detail-description').textContent = app.description || '暂无简介';

                const banner = document.getElementById('status-banner');
                if (app.notice) {
                    banner.style.display = 'flex';
                    const icon = app.status === 'online' ? '✅' : (app.status === 'beta' ? '⚠️' : '🚫');
                    document.getElementById('status-banner-icon').textContent = icon;
                    document.getElementById('status-banner-text').textContent = app.notice;
                    banner.style.backgroundColor = app.status === 'online' ? '#e8f5e9' : (app.status === 'beta' ? '#fff3e0' : '#ffebee');
                } else {
                    banner.style.display = 'none';
                }

                const scContainer = document.getElementById('screenshots-container');
                if (app.screenshots && app.screenshots.length) {
                    scContainer.innerHTML = app.screenshots.map(url => `
                        <div class="screenshot" onclick="previewImage('${url}')">
                            <img src="${url}" alt="截图" onerror="this.style.display='none'"/>
                        </div>
                    `).join('');
                } else {
                    scContainer.innerHTML = '<div style="color:#888;padding:10px 0;">暂无截图</div>';
                }

                const updateLog = document.getElementById('detail-update-log');
                const updates = app.updates || [];
                const showUpdates = updates.slice(0, 3);
                if (showUpdates.length) {
                    updateLog.innerHTML = showUpdates.map(u => `
                        <div class="update-item">
                            <div class="update-version">
                                <span>${u.version}</span>
                                <span class="update-date">${u.date}</span>
                            </div>
                            <div class="update-content">${u.content}</div>
                        </div>
                    `).join('');
                } else {
                    updateLog.innerHTML = '<div style="padding:12px 0;color:#888;">暂无更新记录</div>';
                }

                document.getElementById('show-all-updates-btn').onclick = function() {
                    showAllUpdates(app);
                };

                const dev = getDeveloperById(app.developerId);
                if (dev) {
                    document.getElementById('detail-dev-avatar').innerHTML = `<img src="${dev.avatarUrl}" alt="${dev.name}" onerror="this.style.display='none'"/>`;
                    document.getElementById('detail-dev-name').textContent = dev.name;
                    document.getElementById('detail-dev-desc').textContent = dev.description || '';
                    const badge = document.getElementById('detail-dev-badge');
                    if (dev.badge) {
                        badge.className = `verified-badge badge-${dev.badge}`;
                        badge.style.display = 'inline-flex';
                        badge.textContent = '✓';
                    } else {
                        badge.style.display = 'none';
                    }
                    document.getElementById('detail-dev-card').setAttribute('onclick', `goToDeveloper('${dev.id}')`);
                }

                const collabSection = document.getElementById('collaborator-section');
                if (app.collaborators && app.collaborators.length) {
                    collabSection.style.display = 'block';
                    const grid = document.getElementById('collaborator-grid');
                    grid.innerHTML = app.collaborators.map(c => {
                        const cDev = getDeveloperById(c.id);
                        const avatarUrl = cDev ? cDev.avatarUrl : '';
                        return `
                            <div class="collaborator-item" onclick="goToDeveloper('${c.id}')">
                                <div class="collaborator-avatar"><img src="${avatarUrl}" alt="${c.name}" onerror="this.style.display='none'"/></div>
                                <div class="collaborator-info">
                                    ${c.name}
                                    <span class="collaborator-role">${c.role}</span>
                                </div>
                            </div>
                        `;
                    }).join('');
                } else {
                    collabSection.style.display = 'none';
                }

                const detailBtn = document.getElementById('detail-btn');
                const stickyBtn = document.getElementById('sticky-visit-btn');
                const updateVisitBtn = (btn) => {
                    if (app.status === 'online' && app.website) {
                        btn.className = 'visit-btn online';
                        btn.textContent = '访问';
                        btn.onclick = function(e) { e.stopPropagation(); visitApp(app.id); };
                    } else {
                        btn.className = 'visit-btn error';
                        btn.textContent = '不可用';
                        btn.onclick = function(e) { e.stopPropagation(); showAlert('该应用暂时无法访问'); };
                    }
                };
                updateVisitBtn(detailBtn);
                updateVisitBtn(stickyBtn);
                stickyBtn.style.display = 'inline-block';

                document.getElementById('sticky-title').textContent = app.name;
                document.getElementById('sticky-title').style.display = 'block';
            };

            // ---------- 全部更新日志弹窗 ----------
            function showAllUpdates(app) {
                const modal = document.getElementById('update-modal');
                const list = document.getElementById('modal-update-list');
                const updates = app.updates || [];
                if (updates.length) {
                    list.innerHTML = updates.map(u => `
                        <div class="modal-update-item">
                            <div class="modal-update-version">
                                <span>${u.version}</span>
                                <span class="modal-update-date">${u.date}</span>
                            </div>
                            <div class="modal-update-content">${u.content}</div>
                        </div>
                    `).join('');
                } else {
                    list.innerHTML = '<div style="padding:12px 0;color:#888;">暂无更新记录</div>';
                }
                modal.classList.add('active');
            }
            document.getElementById('modal-close-btn').onclick = function() {
                document.getElementById('update-modal').classList.remove('active');
            };
            document.getElementById('update-modal').onclick = function(e) {
                if (e.target === this) this.classList.remove('active');
            };

            // ---------- 访问应用 ----------
            window.visitApp = function(appId) {
                const app = getAppById(appId);
                if (!app) return;
                if (app.status === 'online' && app.website) {
                    window.open(app.website, '_blank');
                } else {
                    showAlert(app.notice || '该应用暂无外部链接或已下架');
                }
            };

            // ---------- 提示弹窗 ----------
            function showAlert(msg) {
                document.getElementById('alert-message').textContent = msg;
                document.getElementById('alert-overlay').classList.add('active');
            }
            document.getElementById('alert-btn').onclick = function() {
                document.getElementById('alert-overlay').classList.remove('active');
            };
            document.getElementById('alert-overlay').onclick = function(e) {
                if (e.target === this) this.classList.remove('active');
            };
            window.showAlert = showAlert;

            // ---------- 图片预览 ----------
            window.previewImage = function(url) {
                document.getElementById('preview-image').src = url;
                document.getElementById('image-overlay').classList.add('active');
            };
            window.closeImagePreview = function() {
                document.getElementById('image-overlay').classList.remove('active');
                document.getElementById('preview-image').src = '';
            };

            // ---------- 开发者页面 ----------
            window.goToDeveloper = function(devId) {
                const dev = getDeveloperById(devId);
                if (!dev) return;
                pageStack.push('developer');
                showPage('developer');

                document.getElementById('dev-avatar').innerHTML = `<img src="${dev.avatarUrl}" alt="${dev.name}" onerror="this.style.display='none'"/>`;
                document.getElementById('dev-name').textContent = dev.name;
                const badge = document.getElementById('dev-badge');
                if (dev.badge) {
                    badge.className = `verified-badge badge-${dev.badge}`;
                    badge.style.display = 'inline-flex';
                    badge.textContent = '✓';
                } else {
                    badge.style.display = 'none';
                }
                document.getElementById('dev-desc').textContent = dev.description || '';
                const { owned, assist } = getDeveloperApps(devId);
                const allApps = [...owned, ...assist];
                let totalDownloads = 0;
                let totalRating = 0;
                allApps.forEach(a => {
                    const num = parseFloat(a.downloads.replace(/[万,]/g, ''));
                    if (!isNaN(num)) totalDownloads += num;
                    totalRating += parseFloat(a.rating) || 0;
                });
                const avgRating = allApps.length ? (totalRating / allApps.length).toFixed(1) : '0';
                const downloadStr = totalDownloads > 10000 ? (totalDownloads/10000).toFixed(1)+'万' : totalDownloads+'';
                document.getElementById('dev-rating-downloads').textContent = `★ ${avgRating} · 下载量${downloadStr}+`;
                document.getElementById('dev-app-count').textContent = allApps.length;

                const ownedContainer = document.getElementById('dev-owned-apps');
                if (owned.length) {
                    ownedContainer.innerHTML = renderAppListItems(owned);
                } else {
                    ownedContainer.innerHTML = '<div style="padding:12px 16px;color:#888;">暂无独立开发的应用</div>';
                }

                const assistContainer = document.getElementById('dev-assist-apps');
                const assistTitle = document.getElementById('dev-assist-title');
                if (assist.length) {
                    assistTitle.style.display = 'block';
                    assistContainer.style.display = 'block';
                    assistContainer.innerHTML = renderAppListItems(assist);
                } else {
                    assistTitle.style.display = 'none';
                    assistContainer.style.display = 'none';
                }
            };

            function renderAppListItems(apps) {
                return apps.map(app => {
                    const statusClass = app.status === 'online' ? 'online' : (app.status === 'beta' ? 'beta' : 'error');
                    return `
                        <div class="app-list-item" onclick="goToAppDetail('${app.id}')">
                            <div class="app-icon"><img src="${app.iconUrl}" alt="${app.name}" onerror="this.style.display='none'"/></div>
                            <div class="app-info">
                                <div class="app-name-row">
                                    <span class="app-name">${app.name}</span>
                                    <span class="app-rating-downloads">★ ${app.rating} · ${app.downloads}</span>
                                </div>
                                <div class="app-desc">${app.shortDesc}</div>
                            </div>
                            <button class="visit-btn ${statusClass}" onclick="event.stopPropagation();visitApp('${app.id}')">
                                ${app.status === 'online' ? '访问' : (app.status === 'beta' ? '内测' : '下架')}
                            </button>
                        </div>
                    `;
                }).join('');
            }

            // ---------- 社区 ----------
            let communityFilter = 'all';
            window.switchCommunityTab = function(type, el) {
                communityFilter = type;
                document.querySelectorAll('.community-tab').forEach(t => t.classList.remove('active'));
                if (el) el.classList.add('active');
                renderCommunity(type);
            };

            function renderCommunity(type) {
                const container = document.getElementById('post-list');
                let posts = POSTS || [];
                if (type !== 'all') {
                    posts = posts.filter(p => p.type === type);
                }
                container.innerHTML = posts.map(post => `
                    <div class="post-card ${post.type === 'official' ? 'official' : ''}">
                        <div class="post-header">
                            <div class="post-avatar"><img src="${post.avatarUrl}" alt="${post.username}" onerror="this.style.display='none'"/></div>
                            <div>
                                <div class="post-user-row">
                                    <span class="post-username ${post.type === 'official' ? 'username-official' : ''}">${post.username}</span>
                                    <span class="verified-badge badge-${post.badge || 'gray'}">✓</span>
                                    <span class="post-time">${post.time}</span>
                                </div>
                                ${post.badgeText ? `<span style="font-size:12px;color:#888;">${post.badgeText}</span>` : ''}
                            </div>
                        </div>
                        <div class="post-content">${post.content}</div>
                        <div class="post-actions">
                            <span class="post-action">❤️ ${post.likes}</span>
                            <span class="post-action">💬 ${post.comments}</span>
                            <span class="post-action">↗️ ${post.shares}</span>
                        </div>
                    </div>
                `).join('');
            }

            // ---------- 创作者列表 ----------
            function renderCreators() {
                const container = document.getElementById('creator-list');
                const devs = Object.values(DEVELOPERS);
                container.innerHTML = devs.map(dev => `
                    <div class="creator-item" onclick="goToDeveloper('${dev.id}')">
                        <div class="creator-avatar"><img src="${dev.avatarUrl}" alt="${dev.name}" onerror="this.style.display='none'"/></div>
                        <div class="creator-info">
                            <div class="creator-name-row">
                                <span class="creator-name">${dev.name}</span>
                                ${dev.badge ? `<span class="verified-badge badge-${dev.badge}">✓</span>` : ''}
                            </div>
                            <div class="creator-desc">${dev.description || ''}</div>
                        </div>
                        <div class="creator-arrow">›</div>
                    </div>
                `).join('');
            }

            // ---------- 搜索功能 ----------
            function setupSearch(inputId, callback) {
                const input = document.getElementById(inputId);
                if (!input) return;
                input.addEventListener('input', function() {
                    const keyword = this.value.trim().toLowerCase();
                    callback(keyword);
                });
            }
            setupSearch('search-home', function(keyword) {
                if (keyword) {
                    switchTab('apps');
                    setTimeout(() => {
                        const items = document.querySelectorAll('#all-apps-list .app-list-item');
                        items.forEach(item => {
                            const name = item.querySelector('.app-name')?.textContent?.toLowerCase() || '';
                            const desc = item.querySelector('.app-desc')?.textContent?.toLowerCase() || '';
                            item.style.display = (name.includes(keyword) || desc.includes(keyword)) ? '' : 'none';
                        });
                    }, 100);
                } else {
                    document.querySelectorAll('#all-apps-list .app-list-item').forEach(item => item.style.display = '');
                }
            });
            setupSearch('search-apps', function(keyword) {
                document.querySelectorAll('#all-apps-list .app-list-item').forEach(item => {
                    const name = item.querySelector('.app-name')?.textContent?.toLowerCase() || '';
                    const desc = item.querySelector('.app-desc')?.textContent?.toLowerCase() || '';
                    item.style.display = (name.includes(keyword) || desc.includes(keyword)) ? '' : 'none';
                });
            });
            setupSearch('search-community', function(keyword) {
                document.querySelectorAll('#post-list .post-card').forEach(post => {
                    const content = post.querySelector('.post-content')?.textContent?.toLowerCase() || '';
                    post.style.display = content.includes(keyword) ? '' : 'none';
                });
            });

            // ---------- 初始化 ----------
            renderHome();
            renderApps('all');
            renderCommunity('all');
            renderCreators();
            showPage('home');

            // 暴露全局（供 onclick 使用）
            window.renderHome = renderHome;
            window.renderApps = renderApps;
            window.renderCommunity = renderCommunity;
            window.renderCreators = renderCreators;
            window.showAllUpdates = showAllUpdates;
        })();
    </script>

</body>
</html>