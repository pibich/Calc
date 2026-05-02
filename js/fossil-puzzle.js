/**
 * Sliding puzzle 3×3: gambar dibagi 9 grid sesuai garis art; sel kanan bawah = kosong (hole).
 * Pengacakan dengan banyak langkah legal dari posisi selesai (selalu bisa diselesaikan).
 */
(function () {
  var GRID = 3;
  var EMPTY = 8;
  var SHUFFLE_STEPS = 240;
  var IMG_SRC = "assets/Final.jpg";
  var TIMER_SEC = 60;
  var TIMER_WARN_AT = 10;

  var audioCtx = null;

  function getAudioContext() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
  }

  function resumeAudio() {
    var ctx = getAudioContext();
    if (ctx.state === "suspended") {
      ctx.resume();
    }
    return ctx;
  }

  function playSuccessSound() {
    try {
      var ctx = resumeAudio();
      var start = ctx.currentTime;
      var freqs = [523.25, 659.25, 783.99];
      freqs.forEach(function (freq, i) {
        var osc = ctx.createOscillator();
        var g = ctx.createGain();
        osc.connect(g);
        g.connect(ctx.destination);
        osc.frequency.value = freq;
        osc.type = "sine";
        var t0 = start + i * 0.07;
        g.gain.setValueAtTime(0, t0);
        g.gain.linearRampToValueAtTime(0.11, t0 + 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.18);
        osc.start(t0);
        osc.stop(t0 + 0.2);
      });
    } catch (e) {}
  }

  function playFailSound() {
    try {
      var ctx = resumeAudio();
      var t0 = ctx.currentTime;
      var osc = ctx.createOscillator();
      var g = ctx.createGain();
      osc.connect(g);
      g.connect(ctx.destination);
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(200, t0);
      osc.frequency.exponentialRampToValueAtTime(70, t0 + 0.28);
      g.gain.setValueAtTime(0.09, t0);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.35);
      osc.start(t0);
      osc.stop(t0 + 0.38);
    } catch (e) {}
  }

  function t(key, vars) {
    if (typeof PWI18N === "undefined") return key;
    return PWI18N.t(key, vars);
  }

  function neighbors(i) {
    var row = Math.floor(i / GRID);
    var col = i % GRID;
    var out = [];
    if (col > 0) out.push(i - 1);
    if (col < GRID - 1) out.push(i + 1);
    if (row > 0) out.push(i - GRID);
    if (row < GRID - 1) out.push(i + GRID);
    return out;
  }

  function isSolved(board) {
    for (var i = 0; i < board.length; i++) {
      if (board[i] !== i) return false;
    }
    return true;
  }

  /**
   * Geser lubang ke indeks target (default 8 = kanan bawah) dengan langkah legal.
   * Memakai greedy Manhattan ke target; fallback random neighbor jika perlu.
   */
  function moveEmptySlotToIndex(board, targetIdx) {
    var tr = Math.floor(targetIdx / GRID);
    var tc = targetIdx % GRID;
    var guard = 0;
    while (board.indexOf(EMPTY) !== targetIdx && guard < 400) {
      guard++;
      var e = board.indexOf(EMPTY);
      var nbs = neighbors(e);
      var best = nbs[0];
      var bestD = 999;
      for (var i = 0; i < nbs.length; i++) {
        var n = nbs[i];
        var nr = Math.floor(n / GRID);
        var nc = n % GRID;
        var d = Math.abs(nr - tr) + Math.abs(nc - tc);
        if (d < bestD) {
          bestD = d;
          best = n;
        } else if (d === bestD && Math.random() < 0.5) {
          best = n;
        }
      }
      var tmp = board[e];
      board[e] = board[best];
      board[best] = tmp;
    }
    var fb = 0;
    while (board.indexOf(EMPTY) !== targetIdx && fb < 6000) {
      fb++;
      var e2 = board.indexOf(EMPTY);
      var opts2 = neighbors(e2);
      var pick2 = opts2[Math.floor(Math.random() * opts2.length)];
      var t2 = board[e2];
      board[e2] = board[pick2];
      board[pick2] = t2;
    }
  }

  /** board[i] = id potongan di sel i; id 8 = lubang. Setelah acak, lubang selalu di kanan bawah (indeks 8). */
  function shuffleSolvableBoard() {
    var board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    var empty = EMPTY;
    var prev = -1;
    for (var s = 0; s < SHUFFLE_STEPS; s++) {
      var opts = neighbors(empty).filter(function (j) {
        return j !== prev;
      });
      if (opts.length === 0) opts = neighbors(empty);
      var pick = opts[Math.floor(Math.random() * opts.length)];
      board[empty] = board[pick];
      board[pick] = EMPTY;
      prev = empty;
      empty = pick;
    }
    moveEmptySlotToIndex(board, 8);
    if (isSolved(board)) {
      var at = board.indexOf(EMPTY);
      var nbs = neighbors(at);
      var j = nbs[Math.floor(Math.random() * nbs.length)];
      board[at] = board[j];
      board[j] = EMPTY;
      moveEmptySlotToIndex(board, 8);
    }
    return board;
  }

  function pieceBgPosition(pieceId) {
    var col = pieceId % GRID;
    var row = Math.floor(pieceId / GRID);
    return col * 50 + "% " + row * 50 + "%";
  }

  function mount(container) {
    if (!container) return;

    var board;
    var moveCount = 0;
    var secondsLeft = TIMER_SEC;
    var timerId = null;
    /** True hanya setelah Start sampai menang / waktu habis. */
    var playing = false;
    var failEscapeHandler = null;

    var wrap = document.createElement("div");
    wrap.className = "fossil-puzzle";
    wrap.setAttribute("data-fossil-puzzle", "");

    var title = document.createElement("h4");
    title.className = "guide-fishing-section-title fossil-puzzle__title";
    title.setAttribute("data-i18n", "guide.puzzle.fossilPuzzleTitle");
    title.textContent = t("guide.puzzle.fossilPuzzleTitle");

    var hint = document.createElement("p");
    hint.className = "fossil-puzzle__hint";
    hint.setAttribute("data-i18n", "guide.puzzle.fossilPuzzleHint");
    hint.textContent = t("guide.puzzle.fossilPuzzleHint");

    var refFig = document.createElement("figure");
    refFig.className = "fossil-puzzle__reference";
    var refCap = document.createElement("figcaption");
    refCap.className = "fossil-puzzle__reference-caption";
    refCap.setAttribute("data-i18n", "guide.puzzle.fossilPuzzleReferenceCaption");
    refCap.textContent = t("guide.puzzle.fossilPuzzleReferenceCaption");
    var refImg = document.createElement("img");
    refImg.className = "fossil-puzzle__reference-img";
    refImg.src = IMG_SRC;
    refImg.alt = "";
    refImg.decoding = "async";
    refImg.loading = "lazy";
    refImg.width = 320;
    refImg.height = 320;
    refFig.append(refCap, refImg);

    var toolbar = document.createElement("div");
    toolbar.className = "fossil-puzzle__toolbar";

    var statsEl = document.createElement("div");
    statsEl.className = "fossil-puzzle__stats";

    var movesLabel = document.createElement("span");
    movesLabel.className = "fossil-puzzle__moves";

    var timerLabel = document.createElement("span");
    timerLabel.className = "fossil-puzzle__timer";
    timerLabel.setAttribute("aria-live", "polite");

    statsEl.append(movesLabel, timerLabel);

    var startBtn = document.createElement("button");
    startBtn.type = "button";
    startBtn.className = "fossil-puzzle__start";
    startBtn.setAttribute("data-i18n", "guide.puzzle.fossilPuzzleStart");
    startBtn.textContent = t("guide.puzzle.fossilPuzzleStart");

    var shuffleBtn = document.createElement("button");
    shuffleBtn.type = "button";
    shuffleBtn.className = "fossil-puzzle__shuffle";
    shuffleBtn.setAttribute("data-i18n", "guide.puzzle.fossilPuzzleShuffle");
    shuffleBtn.textContent = t("guide.puzzle.fossilPuzzleShuffle");

    var statusEl = document.createElement("p");
    statusEl.className = "fossil-puzzle__status";
    statusEl.setAttribute("role", "status");
    statusEl.hidden = true;

    toolbar.append(statsEl, startBtn, shuffleBtn);

    var modal = document.createElement("div");
    modal.className = "fossil-puzzle-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "fossil-puzzle-fail-title");
    modal.hidden = true;

    var modalBackdrop = document.createElement("div");
    modalBackdrop.className = "fossil-puzzle-modal__backdrop";

    var modalBox = document.createElement("div");
    modalBox.className = "fossil-puzzle-modal__box";

    var modalTitle = document.createElement("h3");
    modalTitle.id = "fossil-puzzle-fail-title";
    modalTitle.className = "fossil-puzzle-modal__title";
    modalTitle.setAttribute("data-i18n", "guide.puzzle.fossilPuzzleFailTitle");
    modalTitle.textContent = t("guide.puzzle.fossilPuzzleFailTitle");

    var modalBody = document.createElement("p");
    modalBody.className = "fossil-puzzle-modal__body";
    modalBody.setAttribute("data-i18n", "guide.puzzle.fossilPuzzleFailBody");
    modalBody.textContent = t("guide.puzzle.fossilPuzzleFailBody");

    var modalBtn = document.createElement("button");
    modalBtn.type = "button";
    modalBtn.className = "fossil-puzzle-modal__ok";
    modalBtn.setAttribute("data-i18n", "guide.puzzle.fossilPuzzleFailOk");
    modalBtn.textContent = t("guide.puzzle.fossilPuzzleFailOk");

    modalBox.append(modalTitle, modalBody, modalBtn);
    modal.append(modalBackdrop, modalBox);

    var stage = document.createElement("div");
    stage.className = "fossil-puzzle-stage";

    var gridEl = document.createElement("div");
    gridEl.className = "fossil-puzzle__grid";
    gridEl.setAttribute("role", "grid");
    gridEl.setAttribute("aria-label", t("guide.puzzle.fossilPuzzleGridAria"));

    stage.appendChild(gridEl);

    function formatMoves() {
      movesLabel.textContent = t("guide.puzzle.fossilPuzzleMoves", { n: String(moveCount) });
    }

    function formatTimer() {
      timerLabel.textContent = t("guide.puzzle.fossilPuzzleTime", { n: String(secondsLeft) });
      var timerRunning = timerId != null;
      timerLabel.classList.toggle(
        "fossil-puzzle__timer--warn",
        timerRunning && secondsLeft <= TIMER_WARN_AT && secondsLeft > 0,
      );
    }

    function updateStartButton() {
      startBtn.hidden = playing || (board != null && isSolved(board));
    }

    function beginPlay() {
      if (playing) return;
      resumeAudio();
      if (board != null && isSolved(board)) return;
      playing = true;
      secondsLeft = TIMER_SEC;
      formatTimer();
      setRoundLocked(false);
      updateStartButton();
      startTimer();
    }

    function stopTimer() {
      if (timerId != null) {
        clearInterval(timerId);
        timerId = null;
      }
    }

    function startTimer() {
      stopTimer();
      timerId = window.setInterval(function () {
        secondsLeft -= 1;
        formatTimer();
        if (secondsLeft <= 0) {
          stopTimer();
          onTimeUp();
        }
      }, 1000);
    }

    function setRoundLocked(locked) {
      wrap.classList.toggle("fossil-puzzle--locked", locked);
    }

    function clearFailEscapeListener() {
      if (failEscapeHandler) {
        document.removeEventListener("keydown", failEscapeHandler);
        failEscapeHandler = null;
      }
    }

    function dismissFailAndRestart() {
      clearFailEscapeListener();
      hideFailModal();
      startNewRound();
    }

    function onTimeUp() {
      playing = false;
      setRoundLocked(true);
      playFailSound();
      modalTitle.textContent = t("guide.puzzle.fossilPuzzleFailTitle");
      modalBody.textContent = t("guide.puzzle.fossilPuzzleFailBody");
      modalBtn.textContent = t("guide.puzzle.fossilPuzzleFailOk");
      modal.hidden = false;
      clearFailEscapeListener();
      failEscapeHandler = function (ev) {
        if (ev.key === "Escape" && !modal.hidden) {
          ev.preventDefault();
          dismissFailAndRestart();
        }
      };
      document.addEventListener("keydown", failEscapeHandler);
      modalBtn.focus();
    }

    function hideFailModal() {
      modal.hidden = true;
    }

    function startNewRound() {
      clearFailEscapeListener();
      stopTimer();
      playing = false;
      board = shuffleSolvableBoard();
      moveCount = 0;
      secondsLeft = TIMER_SEC;
      setRoundLocked(true);
      formatMoves();
      formatTimer();
      statusEl.hidden = true;
      hideFailModal();
      renderCells();
      updateStartButton();
    }

    function tryMove(fromIndex) {
      if (!playing) return;
      resumeAudio();
      var emptyAt = board.indexOf(EMPTY);
      if (fromIndex === emptyAt) return;
      var nbs = neighbors(emptyAt);
      if (nbs.indexOf(fromIndex) === -1) return;
      var tmp = board[fromIndex];
      board[fromIndex] = EMPTY;
      board[emptyAt] = tmp;
      moveCount += 1;
      formatMoves();
      renderCells();
      if (isSolved(board)) {
        stopTimer();
        playing = false;
        setRoundLocked(true);
        playSuccessSound();
        statusEl.textContent = t("guide.puzzle.fossilPuzzleSolved");
        statusEl.hidden = false;
        updateStartButton();
      } else {
        statusEl.hidden = true;
      }
    }

    function renderCells() {
      gridEl.innerHTML = "";
      var emptyAt = board.indexOf(EMPTY);
      for (var i = 0; i < 9; i++) {
        (function (idx) {
          var piece = board[idx];
          var cell = document.createElement("div");
          cell.className = "fossil-puzzle__cell";
          cell.setAttribute("role", "gridcell");
          if (piece === EMPTY) {
            cell.classList.add("fossil-puzzle__cell--empty");
            cell.setAttribute("aria-label", t("guide.puzzle.fossilPuzzleEmptySlot"));
          } else {
            var tile = document.createElement("div");
            tile.className = "fossil-puzzle__tile";
            tile.style.backgroundImage = 'url("' + IMG_SRC + '")';
            tile.style.backgroundSize = "300% 300%";
            tile.style.backgroundPosition = pieceBgPosition(piece);
            cell.appendChild(tile);
            var canMove = neighbors(emptyAt).indexOf(idx) !== -1;
            if (canMove) {
              cell.classList.add("fossil-puzzle__cell--movable");
              cell.setAttribute("tabindex", "0");
              cell.setAttribute(
                "aria-label",
                t("guide.puzzle.fossilPuzzleMovePieceAria", { n: String(piece + 1) })
              );
            } else {
              cell.setAttribute("aria-hidden", "true");
            }
            cell.addEventListener("click", function () {
              tryMove(idx);
            });
            cell.addEventListener("keydown", function (ev) {
              if (ev.key === "Enter" || ev.key === " ") {
                ev.preventDefault();
                tryMove(idx);
              }
            });
          }
          gridEl.appendChild(cell);
        })(i);
      }
    }

    function reshuffle() {
      resumeAudio();
      startNewRound();
    }

    startBtn.addEventListener("click", beginPlay);
    shuffleBtn.addEventListener("click", reshuffle);

    modalBtn.addEventListener("click", dismissFailAndRestart);
    modalBackdrop.addEventListener("click", dismissFailAndRestart);

    wrap.append(title, hint, refFig, toolbar, stage, statusEl, modal);
    container.appendChild(wrap);
    startNewRound();
  }

  window.PW_FossilPuzzle = { mount: mount };
})();
