(function (global) {
  const root = document.getElementById("auth-page");

  if (!root) return;

  const loginForm = document.getElementById("auth-login-form");

  const registerForm = document.getElementById("auth-register-form");

  const logoutBtn = document.getElementById("auth-logout-btn");

  const feedbackEl = document.getElementById("auth-feedback");

  const stateText = document.getElementById("auth-state-text");

  const formsWrap = document.getElementById("auth-forms-wrap");

  const forgotPanel = document.getElementById("auth-forgot-panel");

  const forgotOpenBtn = document.getElementById("auth-forgot-open");

  const forgotCancelBtn = document.getElementById("auth-forgot-cancel");

  const forgotForm = document.getElementById("auth-forgot-form");

  const forgotEmailInput = document.getElementById("auth-forgot-email");

  const recoveryWrap = document.getElementById("auth-recovery-wrap");

  const recoveryForm = document.getElementById("auth-recovery-form");

  const recoveryPassword = document.getElementById("auth-recovery-password");

  const recoveryConfirm = document.getElementById(
    "auth-recovery-password-confirm",
  );

  const signedInWrap = document.getElementById("auth-signed-in-wrap");

  const changePasswordForm = document.getElementById(
    "auth-change-password-form",
  );

  const changePasswordNew = document.getElementById("auth-change-password-new");

  const changePasswordConfirm = document.getElementById(
    "auth-change-password-confirm",
  );

  const changePasswordSection = document.getElementById(
    "auth-change-password-section",
  );

  const changePasswordBody = document.getElementById(
    "auth-change-password-body",
  );

  const changePasswordDone = document.getElementById(
    "auth-change-password-done",
  );

  const changePasswordAgainBtn = document.getElementById(
    "auth-change-password-again",
  );

  const loginEmail = document.getElementById("auth-login-email");

  const loginPassword = document.getElementById("auth-login-password");

  const registerName = document.getElementById("auth-register-name");

  const registerEmail = document.getElementById("auth-register-email");

  const registerPassword = document.getElementById("auth-register-password");

  let forgotPanelVisible = false;

  var changePasswordShowsSuccess = false;

  function tr(key, vars) {
    if (typeof PWI18N === "undefined") return key;

    return PWI18N.t(key, vars);
  }

  function showFeedback(msg, isError) {
    if (!feedbackEl) return;

    if (!msg) {
      feedbackEl.hidden = true;

      feedbackEl.textContent = "";

      feedbackEl.classList.remove(
        "auth-feedback--error",
        "auth-feedback--success",
      );

      return;
    }

    feedbackEl.hidden = false;

    feedbackEl.textContent = msg;

    feedbackEl.classList.toggle("auth-feedback--error", !!isError);

    feedbackEl.classList.toggle("auth-feedback--success", !isError);
  }

  function setChangePasswordPanelMode(done) {
    changePasswordShowsSuccess = !!done;

    if (!changePasswordBody || !changePasswordDone) return;

    if (done) {
      changePasswordBody.hidden = true;

      changePasswordDone.hidden = false;

      if (changePasswordSection) {
        changePasswordSection.setAttribute(
          "aria-labelledby",
          "auth-change-password-status",
        );
      }
    } else {
      changePasswordBody.hidden = false;

      changePasswordDone.hidden = true;

      if (changePasswordSection) {
        changePasswordSection.setAttribute(
          "aria-labelledby",
          "auth-change-password-heading",
        );
      }
    }
  }

  function redirectUrlProfile() {
    try {
      const u = new URL("profile.html", location.href);

      return u.href.replace(/[#].*$/, "");
    } catch (e) {
      return String(location.origin || "") + "/profile.html";
    }
  }

  function hashLooksLikeRecovery() {
    var h = String(location.hash || "").replace(/^#/, "");

    if (!h) return false;

    try {
      return new URLSearchParams(h).get("type") === "recovery";
    } catch (e) {
      return /(^|&)type=recovery(&|$)/.test(h);
    }
  }

  function clearAuthHashFromUrl() {
    try {
      var u = new URL(location.href);

      u.hash = "";

      history.replaceState(null, "", u.pathname + u.search);
    } catch (e2) {
      history.replaceState(null, "", location.pathname + location.search);
    }
  }

  const cfg = global.PW_SUPABASE_CONFIG || {};

  const hasValidConfig =
    typeof cfg.url === "string" &&
    cfg.url.startsWith("https://") &&
    typeof cfg.anonKey === "string" &&
    cfg.anonKey.startsWith("ey");

  if (!global.supabase || typeof global.supabase.createClient !== "function") {
    showFeedback(tr("auth.error.missingLibrary"), true);

    root.setAttribute("data-auth-disabled", "true");

    return;
  }

  if (!hasValidConfig) {
    showFeedback(tr("auth.error.missingConfig"), true);

    root.setAttribute("data-auth-disabled", "true");

    return;
  }

  const client = global.supabase.createClient(cfg.url, cfg.anonKey, {
    auth: {
      flowType: "pkce",

      persistSession: true,

      autoRefreshToken: true,

      detectSessionInUrl: true,
    },
  });

  function applyAuthLayout(event, session) {
    var user = session && session.user ? session.user : null;

    var recovery =
      (event === "PASSWORD_RECOVERY" && session && session.user) ||
      (user && hashLooksLikeRecovery());

    if (recovery && user) {
      if (recoveryWrap) recoveryWrap.hidden = false;

      if (formsWrap) formsWrap.hidden = true;

      if (signedInWrap) signedInWrap.hidden = true;

      if (forgotPanel) forgotPanel.hidden = true;

      forgotPanelVisible = false;

      if (logoutBtn) logoutBtn.hidden = true;

      if (stateText) stateText.textContent = tr("auth.statePasswordRecovery");

      return;
    }

    if (recoveryWrap) recoveryWrap.hidden = true;

    if (user) {
      if (formsWrap) formsWrap.hidden = true;

      if (forgotPanel) forgotPanel.hidden = true;

      forgotPanelVisible = false;

      if (signedInWrap) signedInWrap.hidden = false;

      if (logoutBtn) logoutBtn.hidden = false;

      if (stateText) {
        stateText.textContent = tr("auth.stateSignedIn", {
          email: user.email || "-",
        });
      }

      if (event === "SIGNED_IN") {
        setChangePasswordPanelMode(false);
      } else if (event === "INITIAL_SESSION") {
        setChangePasswordPanelMode(changePasswordShowsSuccess);
      }

      return;
    }

    if (logoutBtn) logoutBtn.hidden = true;

    if (signedInWrap) signedInWrap.hidden = true;

    setChangePasswordPanelMode(false);

    if (stateText) stateText.textContent = tr("auth.stateSignedOut");

    if (forgotPanelVisible && forgotPanel) {
      if (formsWrap) formsWrap.hidden = true;

      forgotPanel.hidden = false;
    } else {
      if (formsWrap) formsWrap.hidden = false;

      if (forgotPanel) forgotPanel.hidden = true;
    }
  }

  async function refreshSession() {
    var res = await client.auth.getSession();

    if (res.error) {
      showFeedback(res.error.message || tr("auth.error.generic"), true);

      applyAuthLayout("INITIAL_SESSION", null);

      return;
    }

    var session = res.data && res.data.session ? res.data.session : null;

    var ev = "INITIAL_SESSION";

    if (session && hashLooksLikeRecovery()) {
      ev = "PASSWORD_RECOVERY";
    }

    applyAuthLayout(ev, session);
  }

  function readPasswordPair(primary, confirm) {
    var a = String(primary && primary.value ? primary.value : "");

    var b = String(confirm && confirm.value ? confirm.value : "");

    return { a: a, b: b };
  }

  function validateNewPasswordPair(a, b) {
    if (!a || !b) {
      showFeedback(tr("auth.error.required"), true);

      return null;
    }

    if (a.length < 8) {
      showFeedback(tr("auth.error.passwordWeak"), true);

      return null;
    }

    if (a !== b) {
      showFeedback(tr("auth.error.passwordMismatch"), true);

      return null;
    }

    return a;
  }

  async function handleLogin(ev) {
    ev.preventDefault();

    showFeedback("", false);

    var email = String(loginEmail && loginEmail.value ? loginEmail.value : "")
      .trim()

      .toLowerCase();

    var password = String(
      loginPassword && loginPassword.value ? loginPassword.value : "",
    );

    if (!email || !password) {
      showFeedback(tr("auth.error.required"), true);

      return;
    }

    var result = await client.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (result.error) {
      showFeedback(result.error.message || tr("auth.error.loginFailed"), true);

      return;
    }

    forgotPanelVisible = false;

    if (loginForm) loginForm.reset();

    showFeedback(tr("auth.success.login"), false);

    applyAuthLayout("SIGNED_IN", result.data.session);
  }

  async function handleRegister(ev) {
    ev.preventDefault();

    showFeedback("", false);

    var fullName = String(
      registerName && registerName.value ? registerName.value : "",
    ).trim();

    var email = String(
      registerEmail && registerEmail.value ? registerEmail.value : "",
    )
      .trim()

      .toLowerCase();

    var password = String(
      registerPassword && registerPassword.value ? registerPassword.value : "",
    );

    if (!fullName || !email || !password) {
      showFeedback(tr("auth.error.required"), true);

      return;
    }

    if (password.length < 8) {
      showFeedback(tr("auth.error.passwordWeak"), true);

      return;
    }

    var result = await client.auth.signUp({
      email: email,

      password: password,

      options: {
        emailRedirectTo: redirectUrlProfile(),

        data: {
          full_name: fullName,
        },
      },
    });

    if (result.error) {
      showFeedback(
        result.error.message || tr("auth.error.registerFailed"),
        true,
      );

      return;
    }

    if (registerForm) registerForm.reset();

    showFeedback(tr("auth.success.register"), false);
  }

  async function handleLogout() {
    showFeedback("", false);

    var result = await client.auth.signOut();

    if (result.error) {
      showFeedback(result.error.message || tr("auth.error.logoutFailed"), true);

      return;
    }

    forgotPanelVisible = false;

    showFeedback(tr("auth.success.logout"), false);

    applyAuthLayout("SIGNED_OUT", null);
  }

  async function handleForgot(ev) {
    ev.preventDefault();

    showFeedback("", false);

    var email = String(
      forgotEmailInput && forgotEmailInput.value ? forgotEmailInput.value : "",
    )
      .trim()

      .toLowerCase();

    if (!email) {
      showFeedback(tr("auth.error.required"), true);

      return;
    }

    var result = await client.auth.resetPasswordForEmail(email, {
      redirectTo: redirectUrlProfile(),
    });

    if (result.error) {
      showFeedback(
        result.error.message || tr("auth.error.resetEmailFailed"),
        true,
      );

      return;
    }

    if (forgotForm) forgotForm.reset();

    showFeedback(tr("auth.success.resetEmailSent"), false);
  }

  async function handleRecovery(ev) {
    ev.preventDefault();

    showFeedback("", false);

    var pair = readPasswordPair(recoveryPassword, recoveryConfirm);

    var pw = validateNewPasswordPair(pair.a, pair.b);

    if (!pw) return;

    var result = await client.auth.updateUser({ password: pw });

    if (result.error) {
      showFeedback(
        result.error.message || tr("auth.error.passwordUpdateFailed"),
        true,
      );

      return;
    }

    if (recoveryForm) recoveryForm.reset();

    clearAuthHashFromUrl();

    showFeedback(tr("auth.success.passwordUpdated"), false);

    setChangePasswordPanelMode(true);

    var sess = await client.auth.getSession();

    var s = sess.data && sess.data.session ? sess.data.session : null;

    applyAuthLayout("USER_UPDATED", s);
  }

  async function handleChangePassword(ev) {
    ev.preventDefault();

    showFeedback("", false);

    var pair = readPasswordPair(changePasswordNew, changePasswordConfirm);

    var pw = validateNewPasswordPair(pair.a, pair.b);

    if (!pw) return;

    var result = await client.auth.updateUser({ password: pw });

    if (result.error) {
      showFeedback(
        result.error.message || tr("auth.error.passwordUpdateFailed"),
        true,
      );

      return;
    }

    if (changePasswordForm) changePasswordForm.reset();

    showFeedback(tr("auth.success.passwordUpdated"), false);

    setChangePasswordPanelMode(true);

    var sess = await client.auth.getSession();

    var s = sess.data && sess.data.session ? sess.data.session : null;

    applyAuthLayout("USER_UPDATED", s);
  }

  if (changePasswordAgainBtn) {
    changePasswordAgainBtn.addEventListener("click", function () {
      showFeedback("", false);

      setChangePasswordPanelMode(false);

      if (changePasswordForm) changePasswordForm.reset();
    });
  }

  if (forgotOpenBtn) {
    forgotOpenBtn.addEventListener("click", function () {
      showFeedback("", false);

      forgotPanelVisible = true;

      var e = loginEmail && loginEmail.value ? loginEmail.value : "";

      if (forgotEmailInput && e) forgotEmailInput.value = e;

      applyAuthLayout("SIGNED_OUT", null);
    });
  }

  if (forgotCancelBtn) {
    forgotCancelBtn.addEventListener("click", function () {
      showFeedback("", false);

      forgotPanelVisible = false;

      applyAuthLayout("SIGNED_OUT", null);
    });
  }

  if (loginForm) loginForm.addEventListener("submit", handleLogin);

  if (registerForm) registerForm.addEventListener("submit", handleRegister);

  if (logoutBtn) logoutBtn.addEventListener("click", handleLogout);

  if (forgotForm) forgotForm.addEventListener("submit", handleForgot);

  if (recoveryForm) recoveryForm.addEventListener("submit", handleRecovery);

  if (changePasswordForm)
    changePasswordForm.addEventListener("submit", handleChangePassword);

  client.auth.onAuthStateChange(function (event, session) {
    if (event === "PASSWORD_RECOVERY") {
      forgotPanelVisible = false;

      applyAuthLayout("PASSWORD_RECOVERY", session);

      return;
    }

    if (event === "SIGNED_OUT") {
      forgotPanelVisible = false;

      applyAuthLayout("SIGNED_OUT", null);

      return;
    }

    if (
      event === "SIGNED_IN" ||
      event === "TOKEN_REFRESHED" ||
      event === "USER_UPDATED"
    ) {
      if (event === "SIGNED_IN") forgotPanelVisible = false;

      applyAuthLayout(event, session);

      return;
    }

    if (event === "INITIAL_SESSION") {
      applyAuthLayout(
        session && hashLooksLikeRecovery()
          ? "PASSWORD_RECOVERY"
          : "INITIAL_SESSION",

        session,
      );
    }
  });

  global.addEventListener("pw-lang-change", function () {
    refreshSession();
  });

  refreshSession();
})(window);
