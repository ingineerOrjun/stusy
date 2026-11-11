/* =========================================================
   CIPHER BENCH — encryption as something you do

   THE PROBLEM THIS SOLVES
   Topic 7.7 is "Cryptography (Encryption and Decryption)", and the
   sentence a student memorises is "encryption converts plaintext into
   ciphertext". They can write it and still not be able to say what the
   KEY is for, because nothing in that sentence has a key in it.

   A shift cipher is the smallest thing that has one. Move the key and
   the output changes; set the key back and the message returns. Two
   facts become visible rather than asserted:

     · the same algorithm with a different key gives a different result,
       so secrecy lives in the key and not in the method
     · decryption is not a separate mystery — it is the same operation
       run backwards

   WHY A SHIFT CIPHER AND NOT SOMETHING MODERN
   Because the student has to be able to do it on paper in the exam, and
   because a real algorithm would be a black box — which is exactly the
   thing this component exists to avoid being. The page says plainly
   that this is a 2000-year-old cipher that a computer breaks instantly,
   so nothing here teaches that shifting letters is security.

   WHY A RANGE INPUT AND A TEXT BOX, NOT A CANVAS
   Both are real form controls: keyboard reachable, labelled, announced,
   and they work at 320px. A canvas with draggable letters would look
   better in a screenshot and lock out anyone not using a mouse.

   NO ANIMATION. The letters do not fly. The output updates when the
   input does, which is the whole point — cause and effect, visible in
   one glance. Motion here would add nothing to understand and one more
   thing to wait for.

   MOUNTING
       <div class="cipher" data-text="MEET AT DAWN"></div>
   data-text is optional and seeds the box; the student may type over it.
   ========================================================= */
(function (global) {
  'use strict';

  var doc = global.document;
  if (!doc) return;

  var A = 'A'.charCodeAt(0);

  /* The transformation itself, kept apart from anything that draws, so
     the tests can check the arithmetic without a DOM. Non-letters pass
     through untouched — which is why spaces survive and why the shape
     of the message leaks. The page says so; it is a real weakness of
     this cipher and worth seeing. */
  function shift(text, by){
    var out = '', i, c, code;
    by = ((by % 26) + 26) % 26;
    for (i = 0; i < text.length; i++){
      c = text.charAt(i);
      code = text.toUpperCase().charCodeAt(i);
      if (code >= A && code <= A + 25) out += String.fromCharCode(A + ((code - A + by) % 26));
      else out += c;
    }
    return out;
  }

  function ui(key, fallback){
    return (typeof global.UIStrings !== 'undefined' && global.UIStrings.get)
      ? global.UIStrings.get(key) : fallback;
  }

  function el(tag, cls){
    var e = doc.createElement(tag);
    if (cls) e.className = cls;
    return e;
  }

  /* Both languages written into the DOM, as every runtime-rendered
     string in this product is, so the language layer can choose without
     anything being re-rendered. The Nepali half declares its own lang:
     the build's tagger never sees text created at runtime. */
  function bi(en, ne){
    return '<span class="t-en">' + en + '</span>' +
           '<span class="t-ne np-cell" lang="ne">' + ne + '</span>';
  }

  var seq = 0;

  function build(root){
    if (root.getAttribute('data-cipher-mounted')) return false;
    var id = 'cip' + (++seq);
    var seed = root.getAttribute('data-text') || 'MEET AT DAWN';

    root.innerHTML = '';

    var head = el('p', 'cip-h');
    head.innerHTML = bi('Type a message, then move the key.',
                        'सन्देश टाइप गर्नुहोस्, अनि key सार्नुहोस्।');
    root.appendChild(head);

    /* ---- the message ---- */
    var inWrap = el('div', 'cip-row');
    var inLab = el('label', 'cip-lab');
    inLab.setAttribute('for', id + '-in');
    inLab.innerHTML = bi('Plaintext — the readable message', 'Plaintext — पढ्न मिल्ने सन्देश');
    var input = doc.createElement('input');
    input.type = 'text';
    input.id = id + '-in';
    input.className = 'cip-in';
    input.value = seed;
    input.setAttribute('spellcheck', 'false');
    input.setAttribute('autocomplete', 'off');
    inWrap.appendChild(inLab);
    inWrap.appendChild(input);
    root.appendChild(inWrap);

    /* ---- the key ---- */
    var keyWrap = el('div', 'cip-row');
    var keyLab = el('label', 'cip-lab');
    keyLab.setAttribute('for', id + '-key');
    keyLab.innerHTML = bi('Key — how many places each letter moves',
                          'Key — हरेक अक्षर कति ठाउँ सर्ने');
    var key = doc.createElement('input');
    key.type = 'range';
    key.id = id + '-key';
    key.className = 'cip-key';
    key.min = '0'; key.max = '25'; key.step = '1'; key.value = '3';
    var keyVal = el('span', 'cip-keyval');
    keyVal.id = id + '-keyval';
    keyWrap.appendChild(keyLab);
    keyWrap.appendChild(key);
    keyWrap.appendChild(keyVal);
    root.appendChild(keyWrap);

    /* ---- the result ----
       A live region, because the output changes without the focus
       moving: a student using a screen reader has to be told that the
       thing they just changed produced a new result. */
    var outWrap = el('div', 'cip-out-wrap');
    var outLab = el('p', 'cip-lab');
    outLab.innerHTML = bi('Ciphertext — what an interceptor would see',
                          'Ciphertext — बीचमा पक्रनेले देख्ने कुरा');
    var out = el('div', 'cip-out');
    out.id = id + '-out';
    out.setAttribute('role', 'status');
    out.setAttribute('aria-live', 'polite');
    outWrap.appendChild(outLab);
    outWrap.appendChild(out);
    root.appendChild(outWrap);

    var back = el('p', 'cip-back');
    back.id = id + '-back';
    root.appendChild(back);

    function render(){
      var k = parseInt(key.value, 10) || 0;
      keyVal.textContent = String(k);
      key.setAttribute('aria-valuetext', String(k));
      var cipher = shift(input.value, k);
      out.textContent = cipher;

      /* Decryption shown as the same operation with the key negated.
         Stating the arithmetic is the point: students who see
         "shift back by the same key" stop treating decryption as a
         second, unexplained algorithm. */
      if (k === 0){
        back.innerHTML = bi('A key of 0 moves nothing — the ciphertext is the message. ' +
                            'A key is only useful when it is not zero, and only secret ' +
                            'while nobody else knows it.',
                            'Key ० ले केही सार्दैन — ciphertext नै सन्देश हो। Key शून्य नभए ' +
                            'मात्र काम लाग्छ, र अरूलाई थाहा नभएसम्म मात्र गोप्य रहन्छ।');
      } else {
        back.innerHTML = bi('To decrypt, shift back by ' + k + ' — the same operation, ' +
                            'the other way. Without the key, an interceptor must try all 25.',
                            'Decrypt गर्न ' + k + ' ले पछाडि सार्नुहोस् — उही काम, उल्टो ' +
                            'दिशामा। Key नभए बीचमा पक्रनेले २५ वटै प्रयास गर्नुपर्छ।');
      }
    }

    input.addEventListener('input', render);
    key.addEventListener('input', render);
    key.addEventListener('change', render);
    render();

    if (typeof global.LanguageService !== 'undefined' && global.LanguageService.onChange){
      global.LanguageService.onChange(render);
    }

    root.setAttribute('data-cipher-mounted', '1');
    return true;
  }

  function mount(){
    var all = doc.querySelectorAll('.cipher');
    var n = 0;
    for (var i = 0; i < all.length; i++) if (build(all[i])) n++;
    return n;
  }

  if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', mount);
  else mount();

  global.CipherBench = { mount: mount, build: build, shift: shift };

})(typeof window !== 'undefined' ? window : this);
