/* 
  script.js
  - Lists the image filenames to show in the gallery (links to /images/<filename>)
  - Renders gallery on index and our-story pages
  - Generates spaced, tilted faint quotes across the entire background
*/

const imageFiles = [
  // <-- replace these filenames with the exact filenames you put inside /images/
  // The filenames below are examples from your uploads; keep or edit them as needed.
  "8B7911DD-9490-487A-B9E5-3FE17ABD237F.jpeg",
  "BB91302E-34ED-46EE-B59D-8ECCCD501777.jpeg",
  "8E967F9D-FACC-47B1-B499-A90505C62A74.jpeg",
  "4C72FACA-F4B4-4F39-BDE5-515E84D3A1E9.jpeg",
  "85569D4D-63D1-482C-B499-7B88E9F56534.jpeg",
  "8FF5481D-D4F8-4CA2-95FD-8995C29965EC.jpeg",
  "D6D96403-A269-477D-99BB-5994E1C13695.jpeg",
  "8763B9CD-6EF7-44F3-B619-BD71323A3E63.jpeg",
  "5743CCD3-4B95-4355-B8F6-46DF0D9D1644.jpeg",
  "0FDB9B46-6B02-4659-8B2E-B9FEEF551C03.jpeg",
  "7F15040A-1045-4EA0-A6E4-5A239F0471F5.jpeg",
  "08BB23AD-B03F-4640-A517-2EA8B031E907.jpeg",
  "931660C4-D7EB-4F66-B3FB-4A147BFCA688.jpeg",
  "3C3E63B2-27CE-4EBC-B8C3-860D3E28C303.jpeg",
  "280BB779-D16D-4180-A97C-EF2F73EE1C4C.jpeg",
  "2F692BAB-1BFB-4795-B02B-24116B94C6F2.jpeg",
  "5F799159-CE83-4568-A6C4-A4AE1005E066.jpeg",
  "77C0E68C-0645-41DE-9258-9194BFAF8B19.jpeg",
  "DFFC50DC-CC0D-4511-96C3-1EE1E41F0AC9.jpeg",
  "E365D2F2-91D8-4E17-8728-8E8A6F30569F.jpeg",
  "6933E143-C1B8-4504-9BEC-64E2CFAFD70E.jpeg",
  "357C0972-FDE5-41FC-9113-3FCCD56D6E87.jpeg",
  "8DDBD3BC-A1E8-49BC-95E1-FE0FB5EFE5CA.jpeg",
  "E8BC81D4-B9B4-4B52-AF6E-A1278D9C49EF.jpeg",
  "5BAFDE88-A6C6-45EE-843A-5CBA8448EBDF.jpeg",
  "B1D0621D-D91F-4A06-A8D6-8598A65A7B34.jpeg"
];

// Quotes to render in the background (exact ones you gave)
const quotes = [
  "You’re hot, you’re cute, you’re sexy, you’re fly",
  "I love you times 1000 plus 18",
  "Forever plus a day and a half",
  "Do you have feelings or do you just have weak ass game",
  "Dookie butt",
  "I miss my honeys",
  "You’re my best friend"
];

// Helper: create gallery from imageFiles
function renderGalleries() {
  const galleryEls = document.querySelectorAll('.gallery, .grid-preview, #gallery');
  galleryEls.forEach(gallery => {
    gallery.innerHTML = ''; // clear
    imageFiles.forEach(fname => {
      const img = document.createElement('img');
      img.src = `images/${fname}`;
      img.alt = 'Our memory';
      // small lazy loading help
      img.loading = 'lazy';
      gallery.appendChild(img);
    });
  });

  // preview grid on index (if exists): limit to first 6
  const preview = document.querySelector('#preview-grid');
  if (preview) {
    preview.innerHTML = '';
    imageFiles.slice(0,6).forEach(fname=>{
      const img = document.createElement('img');
      img.src = `images/${fname}`;
      img.alt = 'Preview';
      img.loading = 'lazy';
      preview.appendChild(img);
    });
  }
}

// Helper: scatter faint tilted quotes across the whole background
function placeBackgroundQuotes() {
  const container = document.getElementById('quotes-background');
  if (!container) return;
  container.innerHTML = '';
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);

  // Create a spaced grid (not overlapping) of positions (rows x cols)
  const cols = Math.max(3, Math.floor(vw/300));
  const rows = Math.max(3, Math.floor(vh/220));
  const used = [];

  for (let r=0; r<rows; r++){
    for (let c=0; c<cols; c++){
      // choose a quote at random
      const q = quotes[Math.floor(Math.random()*quotes.length)];
      const el = document.createElement('div');
      el.className = 'bg-quote';
      el.textContent = q;

      // choose color (light pink or white), tiny opacity difference
      const usePink = Math.random() > 0.45;
      el.style.color = usePink ? 'rgba(255,182,193,0.18)' : 'rgba(255,255,255,0.18)';

      // random slight rotation and font-size variants
      const angle = (Math.random()*30 - 15).toFixed(2);
      const size = 18 + Math.floor(Math.random()*18); // 18px - 36px
      el.style.fontSize = size + 'px';
      el.style.transform = `rotate(${angle}deg)`;

      // position in a coarse grid cell, with small randomness for natural look
      const cellW = vw / cols;
      const cellH = vh / rows;
      const left = Math.max(30, Math.min(vw - 200, Math.floor(c*cellW + Math.random()*cellW*0.6)));
      const top  = Math.max(20, Math.min(vh - 80, Math.floor(r*cellH + Math.random()*cellH*0.6)));
      el.style.position = 'absolute';
      el.style.left = left + 'px';
      el.style.top = top + 'px';
      el.style.pointerEvents = 'none';
      el.style.userSelect = 'none';
      el.style.whiteSpace = 'nowrap';
      el.style.zIndex = 0;

      container.appendChild(el);
    }
  }
}

// Wait for DOM
document.addEventListener('DOMContentLoaded', function(){
  renderGalleries();
  placeBackgroundQuotes();

  // Reposition quotes on resize (debounced)
  let resizeTimer;
  window.addEventListener('resize', function(){
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(placeBackgroundQuotes, 300);
  });
});
