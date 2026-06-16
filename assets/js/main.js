/* ============================================================
   AJF Estilo Único — Interacciones (demo)
   Vanilla JS. Renderiza desde products.js. Carrito en memoria.
   ============================================================ */
(() => {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const ars = (n) => "$" + Number(n).toLocaleString("es-AR");
  const HEART = `<svg class="icon" viewBox="0 0 24 24" style="width:18px"><path d="M12 21s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z"/></svg>`;
  const waLink = (txt) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(txt)}`;

  /* ---------- Reveal on scroll (definido arriba: lo usan los renders) ---------- */
  let io;
  function observeReveals() {
    if (!io) io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    $$(".reveal:not(.in)").forEach((el) => io.observe(el));
  }

  /* ---------- Año + links de WhatsApp ---------- */
  $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
  $$("[data-wa]").forEach((a) => (a.href = waLink(a.dataset.wa || "Hola! Te escribo desde la web 👋")));

  /* ---------- Card ---------- */
  function cardHTML(p) {
    const badge = p.badge
      ? `<div class="card__tags"><span class="tag ${p.badge === "Oferta" ? "tag--sale" : "tag--new"}">${p.badge}</span></div>`
      : "";
    return `<article class="card reveal" data-cat="${p.cat}" data-price="${p.price}" data-name="${p.name.toLowerCase()}">
      <div class="card__media">${badge}
        <button class="card__fav" aria-label="Favorito">${HEART}</button>
        <a href="producto.html?id=${p.id}" aria-label="${p.name}"><img src="${p.img}" alt="${p.name}" loading="lazy"></a>
        <button class="btn btn--block card__add" data-add data-id="${p.id}">Agregar al carrito</button>
      </div>
      <div class="card__info">
        <div class="card__row"><a href="producto.html?id=${p.id}" class="card__name">${p.name}</a><span class="price">${ars(p.price)}</span></div>
        <span class="card__cat">${p.note || CAT_LABEL[p.cat]}</span>
      </div>
    </article>`;
  }

  /* ---------- Home: destacados ---------- */
  const featGrid = $("#featuredGrid");
  if (featGrid) featGrid.innerHTML = PRODUCTS.filter((p) => p.featured).map(cardHTML).join("");

  /* ---------- Tienda: chips + grilla + orden ---------- */
  const shopGrid = $("#shopGrid");
  if (shopGrid) {
    const chipsWrap = $("#shopChips");
    if (chipsWrap) chipsWrap.innerHTML = CATS.map((c, i) =>
      `<button class="chip ${i === 0 ? "active" : ""}" data-cat="${c.id}">${c.label}</button>`).join("");

    const params = new URLSearchParams(location.search);
    const initialCat = params.get("cat") || "all";
    let current = { cat: initialCat, sort: "featured" };

    const apply = () => {
      let list = PRODUCTS.slice();
      if (current.cat !== "all") list = list.filter((p) => p.cat === current.cat);
      if (current.sort === "price-asc") list.sort((a, b) => a.price - b.price);
      else if (current.sort === "price-desc") list.sort((a, b) => b.price - a.price);
      else list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      shopGrid.innerHTML = list.map(cardHTML).join("");
      const count = $("#shopCount"); if (count) count.textContent = `${list.length} ${list.length === 1 ? "producto" : "productos"}`;
      observeReveals();
    };

    $$(".chip", chipsWrap).forEach((c) => c.classList.toggle("active", c.dataset.cat === initialCat));
    chipsWrap?.addEventListener("click", (e) => {
      const chip = e.target.closest(".chip"); if (!chip) return;
      $$(".chip", chipsWrap).forEach((c) => c.classList.remove("active"));
      chip.classList.add("active"); current.cat = chip.dataset.cat; apply();
    });
    $("#sortSelect")?.addEventListener("change", (e) => { current.sort = e.target.value; apply(); });
    apply();
  }

  /* ---------- Página de producto ---------- */
  const pdpRoot = $("#pdpRoot");
  if (pdpRoot) {
    const id = new URLSearchParams(location.search).get("id");
    const p = byId(id) || PRODUCTS[0];
    document.title = `${p.name} — AJF Estilo Único`;
    const related = PRODUCTS.filter((x) => x.cat === p.cat && x.id !== p.id).slice(0, 4);
    const relFill = related.length < 4 ? PRODUCTS.filter((x) => x.id !== p.id && !related.includes(x)).slice(0, 4 - related.length) : [];
    const rel = [...related, ...relFill];

    pdpRoot.innerHTML = `
      <p class="breadcrumb" style="padding-top:calc(var(--header-h) + 30px)">
        <a href="index.html">Inicio</a> / <a href="tienda.html?cat=${p.cat}">${CAT_LABEL[p.cat]}</a> / ${p.name}</p>
      <div class="pdp" style="padding-top:10px">
        <div class="gallery gallery--single">
          <div class="gallery__main"><img id="galleryMain" src="${p.img}" alt="${p.name}"></div>
        </div>
        <div class="pdp__info">
          <span class="eyebrow">${CAT_LABEL[p.cat]}</span>
          <h1>${p.name}</h1>
          <div class="pdp__price"><span class="price">${ars(p.price)}</span><span class="cuotas">Transferencia o efectivo · consultá cuotas</span></div>
          <p class="pdp__desc">${p.note || "Prenda seleccionada de nuestra colección. Calidad importada."}</p>
          <div class="opt-label"><span>Talle</span><a href="#" onclick="return false">Guía de talles</a></div>
          <div class="opts">${["S","M","L","XL","XXL"].map((s,i)=>`<button class="size ${i===1?"active":""}">${s}</button>`).join("")}</div>
          <div class="pdp__buy">
            <button class="btn btn--block" id="pdpAdd" data-id="${p.id}">Agregar al carrito</button>
            <button class="btn btn--ghost btn--block" id="pdpBuyNow" data-id="${p.id}">Comprar ahora</button>
          </div>
          <div class="accordion">
            <div class="acc__item open"><button class="acc__head">Detalle <span class="pm">+</span></button>
              <div class="acc__body" style="max-height:240px"><p>${p.note || "Prenda importada de calidad premium."} Consultá colores y disponibilidad por WhatsApp.</p></div></div>
            <div class="acc__item"><button class="acc__head">Envíos <span class="pm">+</span></button>
              <div class="acc__body"><p>Hacemos envíos a todo el país por Correo Argentino y Andreani. Coordinamos todo por WhatsApp.</p></div></div>
            <div class="acc__item"><button class="acc__head">Cambios <span class="pm">+</span></button>
              <div class="acc__body"><p>¿No era tu talle? Coordinamos el cambio sin drama. Escribinos y te ayudamos.</p></div></div>
          </div>
          <div class="pdp__trust">
            <div><svg class="icon" viewBox="0 0 24 24"><path d="M3 7h11v8H3zM14 10h4l3 3v2h-7"/></svg> Envíos a todo el país</div>
            <div><svg class="icon" viewBox="0 0 24 24"><path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5z"/></svg> Atención por WhatsApp</div>
          </div>
        </div>
      </div>
      <section class="section" style="padding-top:clamp(56px,8vw,110px)">
        <div class="section-head"><div><span class="eyebrow">Te puede gustar</span><h2>Seguí mirando</h2></div>
          <a href="tienda.html" class="link-underline">Ver todo</a></div>
        <div class="products">${rel.map(cardHTML).join("")}</div>
      </section>`;

    $("#pdpAdd")?.addEventListener("click", () => {
      const active = $(".size.active");
      addToCart(byId($("#pdpAdd").dataset.id), active ? active.textContent.trim() : "M");
    });
    $("#pdpBuyNow")?.addEventListener("click", () => {
      const active = $(".size.active");
      addToCart(byId($("#pdpBuyNow").dataset.id), active ? active.textContent.trim() : "M");
      location.href = "checkout.html";
    });
  }

  /* ---------- Menú mobile ---------- */
  const menu = $("#mobileMenu");
  $("#navToggle")?.addEventListener("click", () => menu?.classList.add("open"));
  $("#menuClose")?.addEventListener("click", () => menu?.classList.remove("open"));
  $$("#mobileMenu a").forEach((a) => a.addEventListener("click", () => menu?.classList.remove("open")));

  /* ---------- Header scroll (solo home) ---------- */
  const header = $(".site-header");
  if (header && document.body.classList.contains("home")) {
    let last = 0;
    const onScroll = () => {
      const y = window.scrollY;
      header.classList.toggle("scrolled", y > 60);
      header.classList.toggle("hide", y > 480 && y > last);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Reveal: re-observa lo que haya quedado (home/estáticos) ---------- */
  observeReveals();

  /* ---------- Favoritos + acordeón (delegado) ---------- */
  document.addEventListener("click", (e) => {
    const fav = e.target.closest(".card__fav");
    if (fav) { e.preventDefault(); fav.classList.toggle("active"); }
    const accHead = e.target.closest(".acc__head");
    if (accHead) {
      const item = accHead.parentElement, body = accHead.nextElementSibling;
      const open = item.classList.toggle("open");
      body.style.maxHeight = open ? body.scrollHeight + "px" : 0;
    }
    const size = e.target.closest(".size");
    if (size && !size.disabled) { $$(".size").forEach((s) => s.classList.remove("active")); size.classList.add("active"); }
  });

  /* ============================================================
     CARRITO
     ============================================================ */
  const CART_KEY = "ajf_cart";
  let cart = [];
  try { cart = JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { cart = []; }
  const saveCart = () => { try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {} };
  const drawer = $("#cartDrawer");
  const overlay = $("#overlay");
  const itemsEl = $("#cartItems");
  const countEl = $("#cartCount");
  const subEl = $("#cartSubtotal");
  const emptyMsg = `<div style="text-align:center;color:var(--muted);padding:60px 10px">
      <p style="font-family:var(--font-display);font-size:1.3rem;color:var(--ink);margin-bottom:6px">Tu carrito está vacío 👀</p>
      <p style="font-size:.9rem">Date una vuelta por la tienda, algo te va a gustar.</p></div>`;

  const openCart = () => { drawer?.classList.add("open"); overlay?.classList.add("open"); };
  const closeCart = () => { drawer?.classList.remove("open"); overlay?.classList.remove("open"); };
  $("#cartOpen")?.addEventListener("click", openCart);
  $("#cartClose")?.addEventListener("click", closeCart);
  overlay?.addEventListener("click", closeCart);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeCart(); menu?.classList.remove("open"); } });

  function render() {
    if (!itemsEl) return;
    const qty = cart.reduce((a, i) => a + i.qty, 0);
    if (countEl) {
      countEl.textContent = qty;
      countEl.style.visibility = qty ? "visible" : "hidden";
      countEl.classList.add("bump"); setTimeout(() => countEl.classList.remove("bump"), 300);
    }
    itemsEl.innerHTML = !cart.length ? emptyMsg : cart.map((i, idx) => `
      <div class="citem">
        <img src="${i.img}" alt="${i.name}">
        <div class="citem__body">
          <h4>${i.name}</h4><small>Talle ${i.size}</small>
          <div class="citem__foot">
            <div class="qty"><button data-dec="${idx}" aria-label="Restar">–</button><span>${i.qty}</span><button data-inc="${idx}" aria-label="Sumar">+</button></div>
            <span class="price">${ars(i.price * i.qty)}</span>
          </div>
        </div>
      </div>`).join("");
    const sub = cart.reduce((a, i) => a + i.price * i.qty, 0);
    if (subEl) subEl.textContent = ars(sub);
    saveCart();
  }

  function addToCart(p, size = "M") {
    if (!p) return;
    const found = cart.find((i) => i.id === p.id && i.size === size);
    if (found) found.qty++;
    else cart.push({ id: p.id, name: p.name, price: p.price, img: p.img, size, qty: 1 });
    render(); openCart();
  }

  document.addEventListener("click", (e) => {
    const add = e.target.closest("[data-add]");
    if (!add) return;
    e.preventDefault();
    addToCart(byId(add.dataset.id));
  });
  itemsEl?.addEventListener("click", (e) => {
    const inc = e.target.closest("[data-inc]"), dec = e.target.closest("[data-dec]");
    if (inc) { cart[+inc.dataset.inc].qty++; render(); }
    if (dec) { const i = +dec.dataset.dec; cart[i].qty--; if (cart[i].qty < 1) cart.splice(i, 1); render(); }
  });
  render();

  /* ============================================================
     CHECKOUT (compra 100% por la página, pago simulado)
     ============================================================ */
  const ckForm = $("#checkoutForm");
  if (ckForm) {
    const ckItems = $("#checkoutItems");
    let shipCost = 4500;
    const renderSummary = () => {
      if (!cart.length) {
        ckItems.innerHTML = `<p style="color:var(--muted);padding:14px 0">Tu carrito está vacío. <a href="tienda.html" class="link-underline" style="font-size:.9rem">Ir a la tienda</a></p>`;
      } else {
        ckItems.innerHTML = cart.map((i) => `
          <div class="ck-item"><img src="${i.img}" alt="${i.name}">
            <div><h4>${i.name}</h4><span class="ck-q">Talle ${i.size} · x${i.qty}</span></div>
            <span class="price">${ars(i.price * i.qty)}</span></div>`).join("");
      }
      const sub = cart.reduce((a, i) => a + i.price * i.qty, 0);
      const eff = cart.length ? shipCost : 0;
      $("#ckSub").textContent = ars(sub);
      $("#ckShip").textContent = eff ? ars(eff) : "Gratis";
      $("#ckTotal").textContent = ars(sub + eff);
    };
    renderSummary();

    const setActive = (wrap, radio) => $$(".opt-card", wrap).forEach((c) => c.classList.toggle("active", c.contains(radio)));
    $("#shipOptions")?.addEventListener("change", (e) => {
      setActive($("#shipOptions"), e.target);
      shipCost = +e.target.dataset.cost;
      $("#shipFields").classList.toggle("open", e.target.value === "domicilio");
      renderSummary();
    });
    $("#payOptions")?.addEventListener("change", (e) => {
      setActive($("#payOptions"), e.target);
      $("#cardFields").classList.toggle("open", e.target.value === "tarjeta");
    });
    $("#ck-card")?.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
    });
    $("#ck-exp")?.addEventListener("input", (e) => {
      const v = e.target.value.replace(/\D/g, "").slice(0, 4);
      e.target.value = v.length > 2 ? v.slice(0, 2) + "/" + v.slice(2) : v;
    });

    ckForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!cart.length) { location.href = "tienda.html"; return; }
      const req = ["#ck-email", "#ck-nombre", "#ck-apellido", "#ck-tel"];
      if (ckForm.querySelector('input[name="ship"]:checked')?.value === "domicilio")
        req.push("#ck-dir", "#ck-loc", "#ck-prov", "#ck-cp");
      let firstBad = null;
      req.forEach((s) => {
        const el = $(s); if (!el) return;
        const bad = !el.value.trim();
        el.style.borderColor = bad ? "var(--clay)" : "";
        if (bad && !firstBad) firstBad = el;
      });
      if (firstBad) { firstBad.focus(); firstBad.scrollIntoView({ block: "center", behavior: "smooth" }); return; }
      $("#orderId").textContent = "Pedido #AJF-" + (Math.floor(Math.random() * 90000) + 10000);
      $("#checkoutLive").hidden = true;
      $("#checkoutSuccess").hidden = false;
      cart.length = 0; saveCart(); render();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Newsletter (demo) ---------- */
  $$("form[data-news]").forEach((f) => f.addEventListener("submit", (e) => {
    e.preventDefault();
    f.innerHTML = `<p style="font-family:var(--font-display);font-size:1.3rem;color:var(--bone);width:100%;text-align:center">¡Listo! Ya sos parte del club AJF ✦</p>`;
  }));
})();
