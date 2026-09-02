/* =========================================================
   1. TINY C++ SYNTAX HIGHLIGHTER  (single pass, safe)
   ========================================================= */
var KW = /^(int|float|double|char|bool|void|class|struct|public|private|protected|virtual|return|if|else|for|while|do|switch|case|break|continue|new|delete|using|namespace|const|static|friend|inline|this|true|false|string)$/;
var TY = /^(cout|cin|endl|std|main)$/;

function esc(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function hl(src){
  var re = /(\/\/[^\n]*)|("(?:[^"\\]|\\.)*")|('(?:[^'\\]|\\.)*')|(#\w+)|([A-Za-z_]\w*)|(\d+\.?\d*)|([\s\S])/g;
  var out = '', m;
  while ((m = re.exec(src)) !== null) {
    if (m[1])       out += '<span class="c-com">' + esc(m[1]) + '</span>';
    else if (m[2])  out += '<span class="c-str">' + esc(m[2]) + '</span>';
    else if (m[3])  out += '<span class="c-str">' + esc(m[3]) + '</span>';
    else if (m[4])  out += '<span class="c-key">' + esc(m[4]) + '</span>';
    else if (m[5]) {
      var w = m[5];
      if (KW.test(w))      out += '<span class="c-key">' + w + '</span>';
      else if (TY.test(w)) out += '<span class="c-typ">' + w + '</span>';
      else                 out += esc(w);
    }
    else if (m[6])  out += '<span class="c-num">' + m[6] + '</span>';
    else            out += esc(m[7]);
  }
  return out;
}

function renderCode(el, lines, active){
  if (!el) return;
  var html = '';
  for (var i = 0; i < lines.length; i++){
    var n = i + 1;
    var body = lines[i].length ? hl(lines[i]) : '&nbsp;';
    html += '<div class="ln' + (active === n ? ' on' : '') + '"><span class="n">' + n + '</span><span>' + body + '</span></div>';
  }
  el.innerHTML = html;
  scrollToActive(el);
}

function scrollToActive(el){
  var on = el.querySelector('.ln.on');
  if (!on) return;
  var t = on.offsetTop, h = el.clientHeight, sh = on.offsetHeight;
  if (t < el.scrollTop || t + sh > el.scrollTop + h) el.scrollTop = t - h / 2 + sh / 2;
}

function conLine(el, text, cls){
  if (!el) return;
  var d = document.createElement('div');
  d.className = 'cline' + (cls ? ' ' + cls : '');
  d.textContent = text;
  el.appendChild(d);
  el.scrollTop = el.scrollHeight;
}
function conClear(el){ if (!el) return; el.innerHTML = ''; }

/* generic animated step player */
function runSteps(codeElId, codeLines, steps, conEl, guard, onDone){
  if (guard.busy) return;
  if (!document.getElementById(codeElId)) return;
  guard.busy = true;
  var i = 0;
  function tick(){
    if (i >= steps.length){ guard.busy = false; if (onDone) onDone(); return; }
    var s = steps[i++];
    renderCode(document.getElementById(codeElId), codeLines, s.line);
    if (s.en) conLine(conEl, s.en);
    if (s.np) conLine(conEl, s.np, 'np');
    if (s.out) conLine(conEl, '  >> ' + s.out, '');
    if (s.act) s.act();
    setTimeout(tick, 760);
  }
  tick();
}


/* =========================================================
   7. CONTENT ENHANCERS
   Turns author-friendly <pre class="cpp"> blocks into the
   numbered, syntax-highlighted .code markup used everywhere,
   and wires up the "show answer" boxes.
   ========================================================= */
(function(){
  function ready(fn){
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn);
    else fn();
  }

  ready(function(){
    /* ---- numbered C++ blocks ---- */
    var blocks = document.querySelectorAll('pre.cpp');
    for (var i = 0; i < blocks.length; i++){
      var pre = blocks[i];
      var raw = pre.textContent.replace(/\s+$/, '').replace(/^\n/, '');
      var lines = raw.split('\n');
      var noNum = pre.hasAttribute('data-nonum');
      var html = '';
      for (var j = 0; j < lines.length; j++){
        var body = lines[j].length ? hl(lines[j]) : '&nbsp;';
        html += '<div class="ln">' +
                (noNum ? '' : '<span class="n">' + (j + 1) + '</span>') +
                '<span>' + body + '</span></div>';
      }
      var div = document.createElement('div');
      div.className = 'code' + (noNum ? ' nonum' : '');
      div.innerHTML = html;
      pre.parentNode.replaceChild(div, pre);
    }

    /* ---- "show the answer" toggles on practice questions ---- */
    var toggles = document.querySelectorAll('[data-answer]');
    for (var k = 0; k < toggles.length; k++){
      (function(btn){
        var target = document.getElementById(btn.getAttribute('data-answer'));
        if (!target) return;
        btn.addEventListener('click', function(){
          var open = target.classList.toggle('show');
          btn.textContent = open ? 'Hide the answer' : 'Show the answer';
        });
      })(toggles[k]);
    }
  });
})();
