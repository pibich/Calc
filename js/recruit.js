(function (global) {
  const listEl = document.getElementById("recruit-list");
  const emptyEl = document.getElementById("recruit-empty");
  const formEl = document.getElementById("recruit-form");
  const feedbackEl = document.getElementById("recruit-feedback");
  const loginHintEl = document.getElementById("recruit-login-hint");
  const ctaProfileEl = document.getElementById("recruit-cta-profile");

  let loadGeneration = 0;

  function tr(key, vars) {
    if (typeof PWI18N === "undefined") return key;
    return PWI18N.t(key, vars);
  }

  function showFeedback(msg, isError) {
    if (!feedbackEl) return;
    if (!msg) {
      feedbackEl.hidden = true;
      feedbackEl.textContent = "";
      feedbackEl.classList.remove("auth-feedback--error", "auth-feedback--success");
      return;
    }
    feedbackEl.hidden = false;
    feedbackEl.textContent = msg;
    feedbackEl.classList.toggle("auth-feedback--error", !!isError);
    feedbackEl.classList.toggle("auth-feedback--success", !isError);
  }

  const cfg = global.PW_SUPABASE_CONFIG || {};
  const hasValidConfig =
    typeof cfg.url === "string" &&
    cfg.url.startsWith("https://") &&
    typeof cfg.anonKey === "string" &&
    cfg.anonKey.startsWith("ey");

  if (!global.supabase || typeof global.supabase.createClient !== "function") {
    showFeedback(tr("recruit.error.library"), true);
    return;
  }

  if (!hasValidConfig) {
    showFeedback(tr("recruit.error.config"), true);
    return;
  }

  const client = global.supabase.createClient(cfg.url, cfg.anonKey, {
    auth: {
      flowType: "implicit",
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  /** Keep in sync with docs/supabase-schema.sql (clan_recruitment_posts_text_limits). */
  const FIELD_LIMITS = { leader: 120, clanName: 120, slots: 200, contact: 500 };

  function stripNullBytes(s) {
    return String(s || "").replace(/\u0000/g, "");
  }

  function validateRecruitFields(leader, clanName, slots, contact) {
    leader = stripNullBytes(leader);
    clanName = stripNullBytes(clanName);
    slots = stripNullBytes(slots);
    contact = stripNullBytes(contact);
    if (
      leader.length > FIELD_LIMITS.leader ||
      clanName.length > FIELD_LIMITS.clanName ||
      slots.length > FIELD_LIMITS.slots ||
      contact.length > FIELD_LIMITS.contact
    ) {
      return null;
    }
    return { leader, clanName, slots, contact };
  }

  let currentUserId = null;

  async function refreshUser() {
    const { data } = await client.auth.getSession();
    currentUserId = data?.session?.user?.id || null;
    const authed = !!currentUserId;
    if (formEl) formEl.hidden = !authed;
    if (loginHintEl) loginHintEl.hidden = authed;
    if (ctaProfileEl) ctaProfileEl.hidden = authed;
  }

  function contactHref(text) {
    const t = String(text || "").trim();
    if (!t) return "";
    if (/^https?:\/\//i.test(t)) return t;
    return "";
  }

  function formatDate(iso) {
    if (!iso) return "";
    const lang = typeof PWI18N !== "undefined" ? PWI18N.getLang() : "id";
    const loc = lang === "en" ? "en-US" : "id-ID";
    try {
      return new Intl.DateTimeFormat(loc, { dateStyle: "medium", timeStyle: "short" }).format(new Date(iso));
    } catch {
      return iso;
    }
  }

  function renderPost(row) {
    const isOwner = currentUserId && row.user_id === currentUserId;
    const card = document.createElement("article");
    card.className = "recruit-card";
    card.dataset.postId = row.id;

    const badge = document.createElement("span");
    badge.className = row.is_recruiting ? "recruit-badge recruit-badge--open" : "recruit-badge recruit-badge--full";
    badge.textContent = row.is_recruiting ? tr("recruit.statusRecruiting") : tr("recruit.statusFull");

    const title = document.createElement("h4");
    title.className = "recruit-card__clan";
    title.textContent = row.clan_name;

    const meta = document.createElement("dl");
    meta.className = "recruit-card__meta";

    function addRow(termKey, value) {
      const dt = document.createElement("dt");
      dt.textContent = tr(termKey);
      const dd = document.createElement("dd");
      dd.textContent = value;
      meta.append(dt, dd);
    }

    addRow("recruit.card.leader", row.leader_name);
    addRow("recruit.card.level", String(row.clan_level));
    addRow("recruit.card.slots", row.slots_text);

    const dtContact = document.createElement("dt");
    dtContact.textContent = tr("recruit.card.contact");
    const ddContact = document.createElement("dd");
    const href = contactHref(row.contact);
    if (href) {
      const a = document.createElement("a");
      a.href = href;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.className = "recruit-card__link";
      a.textContent = row.contact;
      ddContact.appendChild(a);
    } else {
      ddContact.textContent = row.contact;
    }
    meta.append(dtContact, ddContact);

    const foot = document.createElement("div");
    foot.className = "recruit-card__foot";
    const when = document.createElement("time");
    when.className = "recruit-card__time";
    when.dateTime = row.created_at || "";
    when.textContent = formatDate(row.created_at);

    foot.appendChild(when);

    card.append(badge, title, meta, foot);

    if (isOwner) {
      const actions = document.createElement("div");
      actions.className = "recruit-card__actions";

      const toggleWrap = document.createElement("label");
      toggleWrap.className = "recruit-toggle";
      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = !!row.is_recruiting;
      cb.addEventListener("change", async () => {
        showFeedback("", false);
        const next = cb.checked;
        const { error } = await client
          .from("clan_recruitment_posts")
          .update({ is_recruiting: next })
          .eq("id", row.id)
          .eq("user_id", currentUserId);
        if (error) {
          showFeedback(error.message || tr("recruit.error.save"), true);
          cb.checked = !next;
          return;
        }
        badge.className = next ? "recruit-badge recruit-badge--open" : "recruit-badge recruit-badge--full";
        badge.textContent = next ? tr("recruit.statusRecruiting") : tr("recruit.statusFull");
        showFeedback(tr("recruit.success.updated"), false);
      });
      const toggleLabel = document.createElement("span");
      toggleLabel.textContent = tr("recruit.toggleLabel");
      toggleWrap.append(cb, toggleLabel);

      const delBtn = document.createElement("button");
      delBtn.type = "button";
      delBtn.className = "recruit-btn recruit-btn--danger";
      delBtn.textContent = tr("recruit.delete");
      delBtn.addEventListener("click", async () => {
        if (!global.confirm(tr("recruit.confirmDelete"))) return;
        showFeedback("", false);
        const { error } = await client
          .from("clan_recruitment_posts")
          .delete()
          .eq("id", row.id)
          .eq("user_id", currentUserId);
        if (error) {
          showFeedback(error.message || tr("recruit.error.delete"), true);
          return;
        }
        card.remove();
        showFeedback(tr("recruit.success.deleted"), false);
        if (listEl && listEl.children.length === 0 && emptyEl) emptyEl.hidden = false;
      });

      actions.append(toggleWrap, delBtn);
      card.appendChild(actions);
    }

    return card;
  }

  async function loadPosts() {
    if (!listEl) return;
    const gen = ++loadGeneration;
    await refreshUser();
    if (gen !== loadGeneration) return;

    listEl.innerHTML = "";
    const { data, error } = await client
      .from("clan_recruitment_posts")
      .select(
        "id,user_id,leader_name,clan_name,clan_level,slots_text,contact,is_recruiting,created_at,updated_at"
      )
      .order("created_at", { ascending: false });

    if (gen !== loadGeneration) return;

    if (error) {
      showFeedback(error.message || tr("recruit.error.load"), true);
      if (emptyEl) emptyEl.hidden = true;
      return;
    }

    const rows = data || [];
    if (rows.length === 0) {
      if (emptyEl) {
        emptyEl.hidden = false;
        emptyEl.textContent = tr("recruit.empty");
      }
      return;
    }
    if (emptyEl) emptyEl.hidden = true;
    rows.forEach((row) => listEl.appendChild(renderPost(row)));
  }

  if (formEl) {
    formEl.addEventListener("submit", async (ev) => {
      ev.preventDefault();
      showFeedback("", false);
      const {
        data: { session },
      } = await client.auth.getSession();
      currentUserId = session?.user?.id || null;
      await refreshUser();
      if (!currentUserId) {
        showFeedback(tr("recruit.error.auth"), true);
        return;
      }

      const levelRaw = parseInt(document.getElementById("recruit-clan-level")?.value, 10);
      const isRecruiting = document.getElementById("recruit-is-open")?.checked !== false;

      const rawLeader = String(document.getElementById("recruit-leader")?.value || "").trim();
      const rawClan = String(document.getElementById("recruit-clan-name")?.value || "").trim();
      const rawSlots = String(document.getElementById("recruit-slots")?.value || "").trim();
      const rawContact = String(document.getElementById("recruit-contact")?.value || "").trim();

      const cleaned = validateRecruitFields(rawLeader, rawClan, rawSlots, rawContact);
      if (!cleaned) {
        showFeedback(tr("recruit.error.fieldTooLong"), true);
        return;
      }

      const leader = cleaned.leader;
      const clanName = cleaned.clanName;
      const slots = cleaned.slots;
      const contact = cleaned.contact;

      if (!leader || !clanName || !slots || !contact) {
        showFeedback(tr("recruit.error.required"), true);
        return;
      }
      const clan_level = Number.isFinite(levelRaw) ? Math.max(0, Math.min(999, levelRaw)) : 1;

      const { error } = await client
        .from("clan_recruitment_posts")
        .insert({
          user_id: currentUserId,
          leader_name: leader,
          clan_name: clanName,
          clan_level,
          slots_text: slots,
          contact,
          is_recruiting: isRecruiting,
        })
        .select("id")
        .single();

      if (error) {
        showFeedback(error.message || tr("recruit.error.save"), true);
        return;
      }

      formEl.reset();
      const openCb = document.getElementById("recruit-is-open");
      if (openCb) openCb.checked = true;
      showFeedback(tr("recruit.success.post"), false);
      await loadPosts();
    });
  }

  client.auth.onAuthStateChange(function () {
    loadPosts();
  });

  global.addEventListener("pw-lang-change", function () {
    loadPosts();
  });

  loadPosts();
})(window);
