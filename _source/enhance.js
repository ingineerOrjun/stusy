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
