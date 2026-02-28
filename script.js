/* ============================================================
   script.js — Interactivity for Personal Academic Website
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     1. ACTIVE NAV LINK ON SCROLL (IntersectionObserver)
  ---------------------------------------------------------- */
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  }, { threshold: 0.3 });

  sections.forEach(section => sectionObserver.observe(section));


  /* ----------------------------------------------------------
     2. SECTION REVEAL ON SCROLL
  ---------------------------------------------------------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  // About section starts visible
  const aboutSection = document.getElementById('about');
  if (aboutSection) aboutSection.classList.add('is-visible');

  sections.forEach(section => {
    if (section.id !== 'about') revealObserver.observe(section);
  });


  /* ----------------------------------------------------------
     3. PUBLICATION FILTER
  ---------------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const pubItems   = document.querySelectorAll('.pub-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      pubItems.forEach(item => {
        if (filter === 'all' || item.dataset.type === filter) {
          item.classList.remove('hidden');
          item.style.opacity = '0';
          item.style.transform = 'translateY(8px)';
          requestAnimationFrame(() => {
            item.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          });
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });


  /* ----------------------------------------------------------
     4. TERMINAL TYPEWRITER EFFECT (Contact section)
  ---------------------------------------------------------- */
  const terminalEl = document.getElementById('terminal-text');
  if (!terminalEl) return;

  const lines = [
    { type: 'prompt', text: '$ whoami' },
    { type: 'output', text: 'jane-doe' },
    { type: 'prompt', text: '$ cat interests.txt' },
    { type: 'highlight', text: 'syntax · semantics · pragmatics' },
    { type: 'highlight', text: 'LLMs · cognitive plausibility' },
    { type: 'highlight', text: 'NLU · psycholinguistics' },
    { type: 'prompt', text: '$ echo $STATUS' },
    { type: 'output', text: 'incoming PhD student, 2024' },
    { type: 'prompt', text: '$ cat collab.md' },
    { type: 'output', text: 'open to research collaborations.' },
    { type: 'output', text: 'reach out anytime.' },
    { type: 'prompt', text: '' },
  ];

  let lineIndex = 0;
  let charIndex = 0;
  let currentLineEl = null;
  let currentText = '';
  let isTyping = false;

  function createLineEl(type) {
    const el = document.createElement('div');
    if (type === 'prompt')    el.classList.add('t-prompt');
    if (type === 'output')    el.classList.add('t-output');
    if (type === 'highlight') el.classList.add('t-highlight');
    terminalEl.appendChild(el);
    return el;
  }

  function typeNextChar() {
    if (lineIndex >= lines.length) {
      // Add blinking cursor at end
      const cursor = document.createElement('span');
      cursor.classList.add('t-cursor');
      terminalEl.appendChild(cursor);
      return;
    }

    const line = lines[lineIndex];

    if (charIndex === 0) {
      currentLineEl = createLineEl(line.type);
      currentText = '';
    }

    if (charIndex < line.text.length) {
      currentText += line.text[charIndex];
      currentLineEl.textContent = currentText;
      charIndex++;
      setTimeout(typeNextChar, line.type === 'prompt' ? 60 : 30);
    } else {
      // Line done
      lineIndex++;
      charIndex = 0;
      const pause = line.type === 'prompt' ? 500 : 180;
      setTimeout(typeNextChar, pause);
    }
  }

  // Start typing when contact section is visible
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    const terminalObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isTyping) {
          isTyping = true;
          setTimeout(typeNextChar, 600);
          terminalObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    terminalObserver.observe(contactSection);
  }


  /* ----------------------------------------------------------
     5. SMOOTH CLICK SCROLL FOR NAV LINKS
  ---------------------------------------------------------- */
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });


  /* ----------------------------------------------------------
     6. KEYWORD HOVER RIPPLE (subtle delight)
  ---------------------------------------------------------- */
  const keywords = document.querySelectorAll('.keyword');
  keywords.forEach(kw => {
    kw.addEventListener('mouseenter', () => {
      kw.style.transform = 'translateY(-2px)';
      kw.style.transition = 'transform 0.15s ease, background 0.2s, color 0.2s, border-color 0.2s';
    });
    kw.addEventListener('mouseleave', () => {
      kw.style.transform = 'translateY(0)';
    });
  });


  /* ----------------------------------------------------------
     7. RESEARCH THREAD HOVER — LINE ACCENT
  ---------------------------------------------------------- */
  const threads = document.querySelectorAll('.thread');
  threads.forEach(thread => {
    thread.addEventListener('mouseenter', () => {
      thread.style.paddingLeft = '16px';
      thread.style.borderLeft = '2px solid var(--amber)';
      thread.style.transition = 'padding 0.25s ease, border 0.25s ease';
    });
    thread.addEventListener('mouseleave', () => {
      thread.style.paddingLeft = '0';
      thread.style.borderLeft = 'none';
    });
  });

});
