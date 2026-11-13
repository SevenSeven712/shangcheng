(function(){
  var style = document.createElement('style');
  style.innerHTML = `
    .gomoku-wrap{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;width:100%;height:100%;overflow:hidden}
    .gomoku-status{font-size:.85em;font-weight:700;text-align:center;min-height:22px;color:var(--text) !important}
    .gomoku-board{display:grid;grid-template-columns:repeat(15,1fr);width:min(82vw, 42vh);aspect-ratio:1;background:#dcb35c;border-radius:8px;padding:4px;box-shadow:0 4px 16px rgba(0,0,0,.2);overflow:hidden}
    .gmk-cell{position:relative;display:flex;align-items:center;justify-content:center;box-shadow:inset 0 0 0 0.5px rgba(90,60,20,.5);cursor:pointer;overflow:hidden}
    .gmk-cell.gmk-last .gmk-stone{box-shadow:0 0 0 2.5px #e53935,0 1px 3px rgba(0,0,0,.35)}
    .gmk-stone{width:84%;height:84%;border-radius:50%;display:block;box-shadow:0 1px 3px rgba(0,0,0,.35); animation: dropIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);}
    .gmk-stone.black{background:radial-gradient(circle at 32% 32%,#6a6a6a,#000)}
    .gmk-stone.white{background:radial-gradient(circle at 32% 32%,#fff,#b9b9b9)}
    @keyframes dropIn { 0% { transform: scale(2); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
    
    .draw-wrap{display:flex;flex-direction:column;gap:10px;width:100%;height:100%;overflow:hidden}
    .draw-info{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:.8em;font-weight:700;flex-wrap:wrap;color:var(--text)!important}
    .draw-timer{background:rgba(25,118,210,.15);color:#1976d2;padding:4px 12px;border-radius:99px;font-weight:800;font-size:1.05em}
    .draw-word{background:linear-gradient(135deg,#1976d2,#42a5f5);color:#fff;padding:5px 14px;border-radius:99px;font-size:1.05em;letter-spacing:2px}
    .draw-canvas-wrap{position:relative;flex:1;min-height:180px;background:#fff;border-radius:10px;overflow:hidden;border:2px solid #90caf9}
    .draw-canvas{display:block;width:100%;height:100%;touch-action:none;cursor:crosshair}
    .draw-tools{display:flex;gap:6px;flex-wrap:wrap;align-items:center}
    .draw-size{background:#fff;border:2px solid #90caf9;color:#1976d2;font-weight:700;padding:4px 10px;border-radius:8px;cursor:pointer;font-size:.75em}
    .draw-guess-box{display:flex;gap:6px}
    .draw-guess-box input{flex:1;padding:8px 12px;border:2px solid #90caf9;border-radius:10px;outline:none;color:var(--text)}
    .draw-guess-box button{padding:8px 16px;border:none;background:#1976d2;color:#fff;border-radius:10px;font-weight:700;cursor:pointer}
    .draw-messages{max-height:60px;overflow-y:auto;font-size:.75em;background:rgba(0,0,0,.05);border-radius:8px;padding:6px 10px;color:var(--text)}

    .spy-wrap{display:flex;flex-direction:column;gap:10px;color:var(--text)!important;width:100%;height:100%;overflow-y:auto}
    .spy-role-card{background:linear-gradient(135deg,rgba(139,92,246,.15),rgba(139,92,246,.05));border:2px solid rgba(139,92,246,.4);border-radius:12px;padding:14px;text-align:center;}
    .spy-role-word{font-size:1.4em;font-weight:900;letter-spacing:4px;color:#6d28d9}
    .spy-players{display:flex;flex-direction:column;gap:6px}
    .spy-player{display:flex;align-items:center;gap:8px;padding:8px 10px;background:rgba(0,0,0,.04);border-radius:10px;border:1px solid rgba(0,0,0,.05)}
    .spy-player .name{flex:1;font-size:.82em;font-weight:700}
    .spy-desc-input{display:flex;gap:6px}
    .spy-desc-input input{flex:1;padding:8px 12px;border-radius:10px;border:1px solid #ccc;outline:none}
    .spy-desc-input button{background:#8b5cf6;color:#fff;border:none;padding:0 16px;border-radius:10px;cursor:pointer}

    .ww-wrap{display:flex;flex-direction:column;gap:10px;color:var(--text)!important;width:100%;height:100%;overflow-y:auto}
    .ww-role-card{background:linear-gradient(135deg,rgba(239,68,68,.15),rgba(239,68,68,.05));border:2px solid rgba(239,68,68,.4);border-radius:12px;padding:14px;text-align:center;}
    .ww-role-word{font-size:1.4em;font-weight:900;letter-spacing:4px;color:#b91c1c}
    .ww-players{display:flex;flex-direction:column;gap:6px}
    .ww-player{display:flex;align-items:center;gap:8px;padding:8px 10px;background:rgba(0,0,0,.04);border-radius:10px;border:1px solid rgba(0,0,0,.05)}
    .ww-player .btn{background:#ef4444;color:#fff;border:none;padding:4px 12px;border-radius:99px;cursor:pointer;font-size:0.8em}

    .ddz-board{display:flex;flex-direction:column;gap:8px;color:var(--text)!important;width:100%}
    .ddz-opps{display:flex;gap:10px}
    .ddz-opp{flex:1;display:flex;flex-direction:column;gap:5px;background:rgba(0,0,0,.03);border-radius:12px;padding:8px;border:1px solid rgba(0,0,0,.05)}
    .ddz-opp-head{display:flex;align-items:center;gap:7px;}
    .ddz-opp-head .avatar{width:28px;height:28px;border-radius:50%;background:var(--primary);color:#fff;display:grid;place-items:center;font-size:12px;}
    .ddz-hand{display:flex;justify-content:center;flex-wrap:wrap;gap:2px;padding:6px 0;min-height:66px}
    .ddz-card{width:38px;height:54px;border-radius:6px;background:#fff;color:#222;border:1px solid #bbb;box-shadow:0 2px 4px rgba(0,0,0,.3);display:flex;flex-direction:column;align-items:center;justify-content:center;font-weight:800;cursor:pointer;transition:transform .12s}
    .ddz-card.sel{transform:translateY(-14px);box-shadow:0 6px 10px rgba(0,0,0,.4);border-color:#3b82f6}
    .ddz-card.red{color:#d32f2f}
    .ddz-btn{padding:9px 18px;border:none;border-radius:10px;font-weight:800;background:#3b82f6;color:#fff;cursor:pointer}
    .ddz-btn.pass{background:#e2e8f0;color:#475569}
  `;
  document.head.appendChild(style);

  var ddzSuits = ['♠','♥','♣','♦'];
  var ddzVal = function(id){return id<52?(Math.floor(id/4))+3:(id===52?16:17);};
  var ddzSuit = function(id){return id<52?id%4:-1;}
  var ddzValName = function(v){return v===16?'小王':v===17?'大王':v===15?'2':v===14?'A':v===13?'K':v===12?'Q':v===11?'J':String(v);};

  var DRAW_WORDS = ['苹果', '太阳', '月亮', '星星', '汽车', '飞机', '电脑', '手机', '猫咪', '小狗', '大象', '蝴蝶', '钢琴', '雨伞', '眼镜', '雪人', '蛋糕', '冰淇淋', '汉堡', '披萨'];

  function getOnlineMembers() {
    return (typeof state !== 'undefined' && state.onlineMembers) ? state.onlineMembers : [];
  }
  function isPlayerOffline(uid) {
    var online = getOnlineMembers();
    return online.length > 0 && online.indexOf(uid) === -1;
  }

  async function grantCoinReward(amount, reason) {
    // ★ 安全修复：前端不再直接调用 RPC 增加金币！
    // 真正的金币发放必须在 Supabase 的数据库触发器或安全 RPC 中完成，
    // 否则黑客可以直接伪造胜利数据刷币。
    if(window.showCustomToast) window.showCustomToast('🎉 游戏结束，奖励结算中...');
  }

  window.RoomGames = {
    gomoku: {
      render: function(game, el) {
        var st = game.state || {}, board = st.board || [], players = game.players || [];
        var myColor = (players[0] && players[0].user_id === currentUser.id) ? 'black' : ((players[1] && players[1].user_id === currentUser.id) ? 'white' : null);
        var oppPlayer = players.find(function(p){ return p.user_id !== currentUser.id; });
        var isOppOffline = oppPlayer && isPlayerOffline(oppPlayer.user_id);
        
        var statusText = st.turn === myColor ? '轮到你落子' : '等待对方…';
        if(isOppOffline) statusText = '对方已离线';
        if(st.winner) statusText = st.winner === 'black' ? '黑子获胜！' : '白子获胜！';

        var html = '<div class="gomoku-wrap"><div class="gomoku-status" style="'+(isOppOffline?'color:var(--danger)':'')+'">'+statusText+'</div><div class="gomoku-board">';
        for(var rr=0; rr<15; rr++) for(var cc=0; cc<15; cc++) {
          var v = (board[rr] && board[rr][cc]) || null;
          var cls = v === 'b' ? 'black' : (v === 'w' ? 'white' : '');
          var isLast = st.lastMove && st.lastMove.r === rr && st.lastMove.c === cc;
          html += '<div class="gmk-cell'+(isLast?' gmk-last':'')+'" data-r="'+rr+'" data-c="'+cc+'">'+(v?'<span class="gmk-stone '+cls+'"></span>':'')+'</div>';
        }
        html += '</div></div>';
        el.innerHTML = html;
        
        if(!isOppOffline && !st.winner) {
          el.querySelectorAll('.gmk-cell').forEach(function(cell) {
             cell.onclick = function() {
                window.RoomGames.gomoku.click(parseInt(this.dataset.r, 10), parseInt(this.dataset.c, 10));
             };
          });
        }
      },
      click: function(r, c) {
        var game = state.room.current_game;
        if(game.status !== 'playing') return showToast('游戏尚未开始或已结束');
        var players = game.players || [];
        var myColor = (players[0] && players[0].user_id === currentUser.id) ? 'black' : ((players[1] && players[1].user_id === currentUser.id) ? 'white' : null);
        if(!myColor) return showToast('你是观战者，不能落子');
        if(game.state.turn !== myColor) return showToast('还没轮到你落子');
        if(game.state.board[r][c]) return showToast('这个位置已经有棋子了');
        
        var board = game.state.board.map(function(row){ return row.slice(); });
        board[r][c] = myColor === 'black' ? 'b' : 'w';
        
        var win = false;
        var dirs = [[0,1],[1,0],[1,1],[1,-1]];
        for(var i=0; i<4; i++) {
          var cnt = 1;
          for(var s=-1; s<=1; s+=2) {
            var rr = r + dirs[i][0]*s, cc = c + dirs[i][1]*s;
            while(rr>=0 && rr<15 && cc>=0 && cc<15 && board[rr][cc] === board[r][c]) {
              cnt++; rr += dirs[i][0]*s; cc += dirs[i][1]*s;
            }
          }
          if(cnt >= 5) win = true;
        }
        
        var ns = Object.assign({}, game.state, { board: board, turn: myColor === 'black' ? 'white' : 'black', lastMove: {r:r, c:c} });
        var newGame = Object.assign({}, game, { state: ns });
        if(win) {
           ns.winner = myColor;
           newGame.status = 'finished';
           newGame.state.ended_reason = (myColor === 'black' ? '黑方' : '白方') + '获胜';
           setTimeout(function(){ showToast(myColor==='black'?'黑方胜利':'白方胜利'); }, 100);
           if (myColor === (players[0].user_id === currentUser.id ? 'black' : 'white')) {
               grantCoinReward(10, '五子棋获胜');
           }
        }
        updateGame(newGame);
      }
    },

    draw: {
      render: function(game, el) {
        var st = game.state || {}, players = game.players || [];
        var order = st.order || [], drawerId = order[st.drawer_index];
        var drawer = players.find(function(p){ return p.user_id === drawerId; }) || {};
        var isDrawer = drawerId === currentUser.id;
        var isDrawerOffline = drawer.user_id && isPlayerOffline(drawer.user_id);
        var remain = st.end_time ? Math.max(0, Math.floor((st.end_time - Date.now())/1000)) : 0;
        var timeStr = Math.floor(remain/60) + ':' + ('0' + (remain%60)).slice(-2);
        
        var html = '<div class="draw-wrap">';
        html += '<div class="draw-info">';
        html += '<span>' + (isDrawer ? '轮到你画' : (escapeHtml(drawer.nickname || '某人') + (isDrawerOffline ? ' (掉线)' : '') + ' 画')) + '</span>';
        html += '<span class="draw-timer" id="drawTimer">' + timeStr + '</span>';
        html += '<span class="draw-word">' + (isDrawer ? escapeHtml(st.word || '') : '? ? ?') + '</span>';
        html += '</div>';
        html += '<div class="draw-canvas-wrap"><canvas class="draw-canvas" id="drawCanvas"></canvas></div>';
        if(isDrawer) html += '<div class="draw-tools"><button class="draw-size" id="btnDrawClear">清空</button></div>';
        if(!isDrawer) html += '<div class="draw-guess-box"><input id="drawGuessInput" placeholder="输入猜测"><button id="btnDrawGuess">猜</button></div>';
        
        var scores = st.scores || {};
        html += '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:4px;">';
        players.forEach(function(p){
           var sc = scores[p.user_id] || 0;
           html += '<div style="font-size:.72em;background:rgba(0,0,0,.05);padding:4px 10px;border-radius:8px;font-weight:700;">' + escapeHtml(p.nickname) + ': ' + sc + '</div>';
        });
        html += '</div>';
        
        html += '<div class="draw-messages">' + (st.messages||[]).slice(-5).map(function(m){ return '<div>'+escapeHtml(m.text)+'</div>'; }).join('') + '</div></div>';
        el.innerHTML = html;
        
        var clearBtn = document.getElementById('btnDrawClear');
        if(clearBtn) clearBtn.onclick = function(){ window.RoomGames.draw.clear(); };

        var guessBtn = document.getElementById('btnDrawGuess');
        var guessInput = document.getElementById('drawGuessInput');
        if(guessBtn && guessInput) {
           guessBtn.onclick = function() { window.RoomGames.draw.guess(); };
           guessInput.onkeydown = function(e) { if(e.key === 'Enter') window.RoomGames.draw.guess(); };
        }
        
        var canvas = document.getElementById('drawCanvas');
        if(!canvas) return;
        canvas.width = canvas.parentElement.clientWidth; canvas.height = canvas.parentElement.clientHeight;
        var ctx = canvas.getContext('2d');
        
        if(st.strokes && st.strokes.length) {
          st.strokes.forEach(function(s) {
            ctx.beginPath(); ctx.strokeStyle = s.color; ctx.lineWidth = s.size;
            ctx.lineCap = 'round'; ctx.lineJoin = 'round';
            s.points.forEach(function(p,i){
              if(i===0) ctx.moveTo(p.x,p.y); else ctx.lineTo(p.x,p.y);
            });
            ctx.stroke();
          });
        }
        
        if(!isDrawer || isDrawerOffline) return;
        
        var isDrawing = false, currentPoints = [];
        canvas.onmousedown = function(e){ startDraw(e); };
        canvas.onmousemove = function(e){ draw(e); };
        canvas.onmouseup = function(){ endDraw(); };
        canvas.onmouseleave = function(){ endDraw(); };
        canvas.ontouchstart = function(e){ e.preventDefault(); startDraw(e.touches[0]); };
        canvas.ontouchmove = function(e){ e.preventDefault(); draw(e.touches[0]); };
        canvas.ontouchend = function(){ endDraw(); };

        function getPos(e){
          var rect = canvas.getBoundingClientRect();
          return { x: e.clientX - rect.left, y: e.clientY - rect.top };
        }
        function startDraw(e){
          isDrawing = true; var pos = getPos(e); currentPoints = [pos];
          ctx.beginPath(); ctx.moveTo(pos.x, pos.y);
        }
        function draw(e){
          if(!isDrawing) return;
          var pos = getPos(e); currentPoints.push(pos);
          ctx.lineTo(pos.x, pos.y);
          ctx.strokeStyle = '#000'; ctx.lineWidth = 4;
          ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
        }
        function endDraw(){
          if(!isDrawing) return; isDrawing = false;
          if(currentPoints.length > 0) {
             var game = state.room.current_game;
             var strokes = (game.state.strokes||[]).concat([{ color: '#000', size: 4, points: currentPoints }]);
             if(strokes.length > 200) strokes.shift();
             updateGame(Object.assign({}, game, {state: Object.assign({}, game.state, {strokes: strokes})}));
          }
          currentPoints = [];
        }
      },
      guess: function() {
        var text = document.getElementById('drawGuessInput').value.trim();
        if(!text) return;
        var game = state.room.current_game;
        var st = game.state;
        if(text === st.word) {
           var ns = Object.assign({}, st);
           ns.scores = ns.scores || {};
           ns.scores[currentUser.id] = (ns.scores[currentUser.id] || 0) + 10;
           ns.messages = (ns.messages||[]).concat([{ text: currentUser.nickname + ' 猜对啦！' }]);
           
           var nextIndex = (st.drawer_index + 1) % st.order.length;
           var newWord = DRAW_WORDS[Math.floor(Math.random() * DRAW_WORDS.length)];
           ns.drawer_index = nextIndex;
           ns.word = newWord;
           ns.strokes = [];
           ns.messages = [];
           ns.end_time = Date.now() + 180000;
           
           updateGame(Object.assign({}, game, {state: ns}));
           document.getElementById('drawGuessInput').value = '';
           showToast('猜对啦！+10分，正在切换画手...');
        } else {
           var ns2 = Object.assign({}, st);
           ns2.messages = (ns2.messages||[]).concat([{ text: currentUser.nickname + '：' + text }]);
           updateGame(Object.assign({}, game, {state: ns2}));
           document.getElementById('drawGuessInput').value = '';
        }
      },
      clear: function() {
        var game = state.room.current_game;
        updateGame(Object.assign({}, game, {state: Object.assign({}, game.state, {strokes: []})}));
      }
    },

    spy: {
      render: function(game, el) {
        var st = game.state || {}, players = game.players || [];
        var myWord = (st.words && st.words[currentUser.id]) || '?';
        var phase = st.phase || 'describe';
        
        var html = '<div class="spy-wrap"><div class="spy-role-card"><div>' + (phase === 'vote' ? '投票阶段' : '你的词语') + '</div><div class="spy-role-word">' + (phase === 'vote' ? '请找出卧底' : escapeHtml(myWord)) + '</div></div><div class="spy-players">';
        
        players.forEach(function(p) {
          var isOffline = isPlayerOffline(p.user_id);
          var isDead = st.dead && st.dead.indexOf(p.user_id) > -1;
          var desc = (st.descriptions||[]).find(function(d){ return d.user_id === p.user_id; });
          var votes = (st.votes||[]).filter(function(v){ return v.target_id === p.user_id; }).length;
          var isMe = p.user_id === currentUser.id;
          
          var actionBtn = '';
          if (phase === 'vote' && !isMe && !isDead && !isOffline) {
              actionBtn = '<button class="btn-sm btn-ban" data-uid="'+p.user_id+'">投票</button>';
          }
          if (isDead) {
              actionBtn = '<span style="color:var(--danger);font-size:0.8em;">已淘汰</span>';
          }
          
          html += '<div class="spy-player ' + (isOffline||isDead ? 'offline' : '') + '" style="' + (isOffline||isDead ? 'opacity:0.4;filter:grayscale(1);' : '') + '"><div class="gpm-avatar">' + escapeHtml(p.nickname.charAt(0)) + '</div><div class="name">' + escapeHtml(p.nickname) + (isDead?' (出局)':'') + (isOffline?' (离线)':'') + (votes>0&&!isDead?' ('+votes+'票)':'') + '</div>' + (desc ? '<span style="font-size:0.7em;margin-right:8px;">'+escapeHtml(desc.text)+'</span>' : '') + actionBtn + '</div>';
        });
        html += '</div>';
        
        var myDesc = (st.descriptions||[]).find(function(d){ return d.user_id === currentUser.id; });
        var amIDead = st.dead && st.dead.indexOf(currentUser.id) > -1;
        if(phase === 'describe' && !myDesc && !amIDead && !isPlayerOffline(currentUser.id)) {
          html += '<div class="spy-desc-input"><input id="spyDescInput" placeholder="描述你的词语..."><button id="btnSpyDesc">发送</button></div>';
        } else if (phase === 'vote' && !amIDead) {
          html += '<div style="text-align:center;font-size:0.8em;color:var(--text-muted);margin-top:10px;">请点击上方玩家头像旁的按钮进行投票</div>';
        }
        
        if (phase === 'vote') {
           html += '<button class="btn btn-primary" style="margin-top:10px;width:100%;" id="btnSpyFinishVote">统计投票结果</button>';
        }
        
        html += '</div>'; el.innerHTML = html;
        
        var descBtn = document.getElementById('btnSpyDesc');
        var descInput = document.getElementById('spyDescInput');
        if(descBtn && descInput) {
           descBtn.onclick = function() { window.RoomGames.spy.desc(); };
           descInput.onkeydown = function(e) { if(e.key === 'Enter') window.RoomGames.spy.desc(); };
        }

        if (phase === 'vote') {
           el.querySelectorAll('.spy-player button[data-uid]').forEach(function(btn) {
              btn.onclick = function() {
                 var target = this.dataset.uid;
                 var game = state.room.current_game;
                 if((game.state.votes||[]).some(v=>v.user_id===currentUser.id)) return showToast('你已投过票');
                 var votes = (game.state.votes||[]).concat([{ user_id: currentUser.id, target_id: target }]);
                 updateGame(Object.assign({}, game, {state: Object.assign({}, game.state, {votes: votes})}));
                 showToast('投票成功');
              };
           });
        }
        
        var finishVoteBtn = document.getElementById('btnSpyFinishVote');
        if(finishVoteBtn) {
           finishVoteBtn.onclick = function() {
              var game = state.room.current_game;
              var votes = game.state.votes || [];
              if(votes.length === 0) return showToast('还没有人投票');
              var counts = {};
              votes.forEach(function(v){ counts[v.target_id] = (counts[v.target_id]||0)+1; });
              var maxVotes = 0, deadId = null;
              Object.keys(counts).forEach(function(k){
                 if(counts[k] > maxVotes) { maxVotes = counts[k]; deadId = k; }
              });
              if(!deadId) return;
              var dead = (game.state.dead||[]).concat([deadId]);
              var spyIds = game.state.spy_ids || [];
              var deadPlayer = game.players.find(function(p){return p.user_id === deadId;});
              var msg = (deadPlayer?deadPlayer.nickname:'某人') + ' 被淘汰';
              
              var aliveCivilians = game.players.filter(function(p){ return dead.indexOf(p.user_id) === -1 && spyIds.indexOf(p.user_id) === -1; }).length;
              var aliveSpies = spyIds.filter(function(id){ return dead.indexOf(id) === -1; }).length;
              
              var nextPhase = 'describe';
              var status = 'playing';
              var reason = '';
              if(aliveSpies === 0) { status = 'finished'; reason = '平民获胜'; }
              else if(aliveSpies >= aliveCivilians) { status = 'finished'; reason = '卧底获胜'; }
              
              var ns = Object.assign({}, game.state, { dead: dead, votes: [], descriptions: [], phase: nextPhase });
              if(status === 'finished') {
                 ns.ended_reason = reason;
                 showToast(reason);
              } else {
                 showToast(msg);
              }
              updateGame(Object.assign({}, game, { state: ns, status: status }));
           };
        }
      },
      desc: function() {
        var text = document.getElementById('spyDescInput').value.trim();
        if(!text) return;
        var game = state.room.current_game;
        var descs = (game.state.descriptions||[]).concat([{ user_id: currentUser.id, nickname: currentUser.nickname, text: text }]);
        var alivePlayers = game.players.filter(function(p){ return (game.state.dead||[]).indexOf(p.user_id) === -1; });
        var nextPhase = (descs.length === alivePlayers.length) ? 'vote' : 'describe';
        updateGame(Object.assign({}, game, {state: Object.assign({}, game.state, {descriptions: descs, phase: nextPhase})}));
      }
    },

    werewolf: {
      render: function(game, el) {
        var st = game.state || {}, players = game.players || [];
        var myRole = (st.roles && st.roles[currentUser.id]) || '平民';
        var html = '<div class="ww-wrap"><div class="ww-role-card"><div>你的身份</div><div class="ww-role-word">' + escapeHtml(myRole) + '</div></div><div class="ww-players">';
        players.forEach(function(p) {
          var alive = (st.alive||[]).indexOf(p.user_id) >= 0;
          var isOffline = isPlayerOffline(p.user_id);
          var btn = (st.phase === 'night' && myRole === '狼人' && alive && p.user_id !== currentUser.id && !isOffline) ? '<button class="btn" data-uid="'+p.user_id+'">击杀</button>' : '';
          html += '<div class="ww-player ' + (isOffline?'offline':'') + '" style="' + (isOffline?'opacity:0.4;filter:grayscale(1);':'') + '"><div class="gpm-avatar">' + escapeHtml(p.nickname.charAt(0)) + '</div><div class="name">' + escapeHtml(p.nickname) + (alive?'':' (死)') + (isOffline?' (离线)':'') + '</div>' + btn + '</div>';
        });
        html += '</div></div>'; el.innerHTML = html;
        
        el.querySelectorAll('.ww-player .btn[data-uid]').forEach(function(btn) {
           btn.onclick = function() { window.RoomGames.werewolf.kill(this.dataset.uid); };
        });
      },
      kill: function(targetId) {
        var game = state.room.current_game;
        updateGame(Object.assign({}, game, {state: Object.assign({}, game.state, {night_action: targetId})}));
      }
    },

    doudizhu: {
      render: function(game, el) {
        var st = game.state || {}, players = game.players || [];
        var myHand = st.hands ? st.hands[currentUser.id] : [];
        
        var html = '<div class="ddz-board"><div class="ddz-opps">';
        players.forEach(function(p) {
          if(p.user_id !== currentUser.id) {
            var isOffline = isPlayerOffline(p.user_id);
            html += '<div class="ddz-opp ' + (isOffline?'offline':'') + '" style="' + (isOffline?'opacity:0.4;filter:grayscale(1);':'') + '"><div class="ddz-opp-head"><div class="avatar">' + escapeHtml(p.nickname.charAt(0)) + '</div><div style="font-size:0.75em;font-weight:700;">' + escapeHtml(p.nickname) + (isOffline?' (掉线)':'') + '</div></div></div>';
          }
        });
        html += '</div>';
        html += '<div style="text-align:center; font-size:0.8em; margin:10px 0; color:#475569;">' + (st.phase === 'bid' ? '叫地主阶段' : (st.currentTurn === currentUser.id ? '轮到你出牌' : '等待中...')) + '</div>';
        html += '<div class="ddz-hand">';
        (myHand || []).forEach(function(c) {
          var v = ddzVal(c);
          var suit = ddzSuit(c);
          var isRed = (suit === 1 || suit === 3 || v >= 16);
          var rk = ddzValName(v);
          var su = v >= 16 ? '王' : ddzSuits[suit];
          html += '<div class="ddz-card ' + (isRed?'red':'') + '" data-cid="'+c+'"><div style="font-size:14px;">'+rk+'</div><div style="font-size:12px;">'+su+'</div></div>';
        });
        html += '</div>';
        if(st.phase === 'play' && st.currentTurn === currentUser.id) {
           html += '<div style="display:flex;justify-content:center;gap:10px;margin-top:10px;">';
           html += '<button class="ddz-btn pass" id="btnDdzPass">不要</button>';
           html += '<button class="ddz-btn" id="btnDdzPlay">出牌</button>';
           html += '</div>';
        }
        html += '</div>'; el.innerHTML = html;
        
        var selected = [];
        el.querySelectorAll('.ddz-card').forEach(function(card) {
          card.onclick = function() {
            var cid = parseInt(this.dataset.cid, 10);
            if(this.classList.contains('sel')) {
              this.classList.remove('sel');
              selected = selected.filter(function(id){ return id !== cid; });
            } else {
              this.classList.add('sel');
              selected.push(cid);
            }
          };
        });

        var passBtn = document.getElementById('btnDdzPass');
        if(passBtn) passBtn.onclick = function() { window.RoomGames.doudizhu.pass(); };
        
        var playBtn = document.getElementById('btnDdzPlay');
        if(playBtn) playBtn.onclick = function() {
          if(selected.length === 0) return showToast('请选择要出的牌');
          window.RoomGames.doudizhu.play(selected);
        };
      },
      pass: function() {
        var game = state.room.current_game;
        var order = game.state.order, myIdx = order.indexOf(currentUser.id);
        updateGame(Object.assign({}, game, {state: Object.assign({}, game.state, {currentTurn: order[(myIdx+1)%3]})}));
      },
      play: function(cards) {
        var game = state.room.current_game;
        var hands = Object.assign({}, game.state.hands);
        hands[currentUser.id] = hands[currentUser.id].filter(function(c){ return cards.indexOf(c) === -1; });
        
        var order = game.state.order, myIdx = order.indexOf(currentUser.id);
        var ns = Object.assign({}, game.state, { hands: hands, currentTurn: order[(myIdx+1)%3] });
        
        updateGame(Object.assign({}, game, { state: ns }));
        if(hands[currentUser.id].length === 0) {
           setTimeout(function(){ 
               showToast('你出完了所有的牌，获胜！'); 
               grantCoinReward(10, '斗地主获胜');
           }, 300);
        }
      }
    },

    initState: function(type, players) {
      if(type === 'gomoku') return { board: Array(15).fill(null).map(function(){return Array(15).fill(null);}), turn: 'black', lastMove: null, winner: null };
      if(type === 'draw') {
         var randWord = DRAW_WORDS[Math.floor(Math.random() * DRAW_WORDS.length)];
         return { order: players.map(function(p){return p.user_id;}), drawer_index: 0, word: randWord, strokes: [], correct: [], messages: [], scores: {}, end_time: Date.now() + 180000 };
      }
      if(type === 'spy') {
         var spyIds = [players[Math.floor(Math.random() * players.length)].user_id];
         var words = {};
         players.forEach(function(p) {
            words[p.user_id] = spyIds.indexOf(p.user_id) > -1 ? '卧底词' : '平民词';
         });
         return { words: words, spy_ids: spyIds, phase: 'describe', descriptions: [], votes: [], dead: [] };
      }
      if(type === 'werewolf') return { roles: {}, phase: 'night', alive: players.map(function(p){return p.user_id;}) };
      if(type === 'doudizhu') {
         var deck = []; for(var i=0; i<54; i++) deck.push(i);
         deck.sort(function(){ return Math.random() - 0.5; });
         var hands = {};
         players.forEach(function(p, i) { hands[p.user_id] = deck.slice(i*17, i*17+17).sort(function(a,b){ return ddzVal(a)-ddzVal(b); }); });
         return { phase: 'play', order: players.map(function(p){return p.user_id;}), hands: hands, currentTurn: players[0].user_id };
      }
      return {};
    },
    
    tick: function(game) {
      if(!game || !game.state) return;
      if(game.type === 'draw' && game.status === 'playing') {
        var st = game.state;
        if(st.end_time && Date.now() > st.end_time) {
           var nextIndex = (st.drawer_index + 1) % st.order.length;
           var newWord = DRAW_WORDS[Math.floor(Math.random() * DRAW_WORDS.length)];
           var ns = Object.assign({}, st, { drawer_index: nextIndex, word: newWord, strokes: [], messages: [], end_time: Date.now() + 180000 });
           updateGame(Object.assign({}, game, { state: ns }));
        }
      }
    }
  };
})();
