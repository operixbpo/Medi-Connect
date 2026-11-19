"use client";

type Cleanup = () => void;

const stages = [
  {
    k: "BEFORE YOU TRAVEL",
    t: "A little clarity.<br>A calmer departure.",
    p: "Begin with a conversation. We help coordinate hospital enquiries, appointment requests and estimates before you make travel plans.",
    im: "care",
    alt: "Illustrative care coordination conversation",
    li: [
      "Hospital enquiry and report coordination",
      "Appointment and estimate requests",
      "Visa document preparation support",
    ],
  },
  {
    k: "WHEN YOU ARRIVE",
    t: "A welcome.<br>Before the next step.",
    p: "Agree your arrival arrangements before you travel, so you know who to contact and where you are going.",
    im: "arrival",
    alt: "Illustrative airport welcome",
    li: [
      "Airport pickup arrangements",
      "An agreed destination and transfer",
      "Family and mobility needs considered",
    ],
  },
  {
    k: "DURING YOUR STAY",
    t: "Care for you.<br>Comfort for your family.",
    p: "The everyday details matter. We help coordinate agreed practical support while the hospital looks after your care.",
    im: "stay",
    alt: "Illustrative accommodation concept",
    li: [
      "Accommodation and transport enquiries",
      "Appointment logistics",
      "Practical arrangements for family",
    ],
  },
  {
    k: "BACK AT HOME",
    t: "Home again.<br>Still connected.",
    p: "Follow your treating team’s advice. We can help coordinate further hospital enquiries and follow-up appointments.",
    im: "recovery",
    alt: "Illustrative patient with family",
    li: [
      "Follow-up appointment coordination",
      "Further hospital enquiries",
      "Support with planning a return visit",
    ],
  },
] as const;

function $(selector: string, root: ParentNode = document) {
  return root.querySelector(selector);
}

function $$(selector: string, root: ParentNode = document) {
  return [...root.querySelectorAll(selector)];
}

function on(
  el: EventTarget | null | undefined,
  event: string,
  handler: EventListener,
) {
  if (!el) return () => undefined;
  el.addEventListener(event, handler);
  return () => el.removeEventListener(event, handler);
}

export function initPreviewRuntime(root: ParentNode = document): Cleanup {
  const cleanups: Cleanup[] = [];

  const menu = $(".menu-toggle", root);
  const nav = $("#main-nav", root);
  cleanups.push(
    on(menu, "click", () => {
      const open = menu?.getAttribute("aria-expanded") !== "true";
      menu?.setAttribute("aria-expanded", String(open));
      nav?.classList.toggle("open", open);
    }),
  );

  const chat = $("#chat-panel", root) as HTMLElement | null;
  const chatToggle = $(".chat-toggle", root);
  const setChat = (open: boolean) => {
    if (!chat) return;
    chat.hidden = !open;
    chatToggle?.setAttribute("aria-expanded", String(open));
  };
  cleanups.push(on(chatToggle, "click", () => setChat(!!chat?.hidden)));
  cleanups.push(
    on($("[data-close-chat]", root), "click", () => {
      setChat(false);
      (chatToggle as HTMLElement | null)?.focus();
    }),
  );
  $$("[data-open-chat]", root).forEach((b) => {
    cleanups.push(
      on(b, "click", () => {
        setChat(true);
        ($("[data-close-chat]", root) as HTMLElement | null)?.focus();
      }),
    );
  });

  const dialog = $("#contact-dialog", root) as HTMLDialogElement | null;
  $$("[data-contact]", root).forEach((b) => {
    cleanups.push(
      on(b, "click", () => {
        const title = $("#dialog-title", root);
        if (title) {
          title.textContent =
            (b as HTMLElement).dataset.contact === "WhatsApp"
              ? "A conversation on WhatsApp."
              : "A voice at the other end.";
        }
        dialog?.showModal();
      }),
    );
  });
  cleanups.push(on($(".dialog-close", root), "click", () => dialog?.close()));
  cleanups.push(
    on(dialog, "click", (e) => {
      if (!dialog || e.target !== dialog) return;
      const r = dialog.getBoundingClientRect();
      const { clientX, clientY } = e as MouseEvent;
      if (
        clientX < r.left ||
        clientX > r.right ||
        clientY < r.top ||
        clientY > r.bottom
      ) {
        dialog.close();
      }
    }),
  );

  cleanups.push(
    on(document, "keydown", (e) => {
      if ((e as KeyboardEvent).key !== "Escape") return;
      menu?.setAttribute("aria-expanded", "false");
      nav?.classList.remove("open");
      setChat(false);
    }),
  );

  $$("[data-art]", root).forEach((b) => {
    cleanups.push(
      on(b, "click", () => {
        const heroArt = $(".hero-art", root) as HTMLElement | null;
        if (heroArt) {
          const art = (b as HTMLElement).dataset.art;
          heroArt.style.backgroundImage = `url('/assets/${
            art === "city" ? "glass-city" : "glass-skyline"
          }.webp')`;
        }
        $$("[data-art]", root).forEach((x) =>
          x.setAttribute("aria-pressed", String(x === b)),
        );
      }),
    );
  });

  const changeStage = (i: number, focus = false) => {
    const s = stages[i];
    if (!s) return;
    $$("[data-stage]", root).forEach((b, n) => {
      b.setAttribute("aria-selected", String(n === i));
      (b as HTMLElement).tabIndex = n === i ? 0 : -1;
      if (focus && n === i) (b as HTMLElement).focus();
    });
    const kicker = $(".stage-kicker", root);
    const title = $(".stage-title", root);
    const copy = $(".stage-copy", root);
    const image = $(".stage-image", root) as HTMLImageElement | null;
    const list = $(".stage-list", root);
    if (kicker) kicker.textContent = s.k;
    if (title) title.innerHTML = s.t;
    if (copy) copy.textContent = s.p;
    if (image) {
      image.src = `/assets/${s.im}.webp`;
      image.alt = s.alt;
    }
    if (list) {
      list.replaceChildren(
        ...s.li.map((t) => {
          const li = document.createElement("li");
          li.textContent = t;
          return li;
        }),
      );
    }
    $("#journey-panel", root)?.setAttribute("aria-labelledby", `jtab-${i}`);
  };

  $$("[data-stage]", root).forEach((b) => {
    cleanups.push(
      on(b, "click", () =>
        changeStage(Number((b as HTMLElement).dataset.stage)),
      ),
    );
    cleanups.push(
      on(b, "keydown", (e) => {
        const ke = e as KeyboardEvent;
        let i = Number((b as HTMLElement).dataset.stage);
        if (ke.key === "ArrowRight") i = (i + 1) % 4;
        else if (ke.key === "ArrowLeft") i = (i + 3) % 4;
        else if (ke.key === "Home") i = 0;
        else if (ke.key === "End") i = 3;
        else return;
        ke.preventDefault();
        changeStage(i, true);
      }),
    );
  });

  $$(".journey-check", root).forEach((c) => {
    cleanups.push(
      on(c, "change", () => {
        const count = $("#check-count", root);
        if (count) {
          count.textContent = `${$$(".journey-check:checked", root).length} of 6 planning steps checked`;
        }
      }),
    );
  });

  const filterHospitals = () => {
    const search = $("#hospital-search", root) as HTMLInputElement | null;
    const cityEl = $("#hospital-city", root) as HTMLSelectElement | null;
    if (!search || !cityEl) return;
    const q = search.value.trim().toLowerCase();
    const city = cityEl.value;
    let count = 0;
    $$(".hospital-card", root).forEach((c) => {
      const el = c as HTMLElement;
      const show =
        (el.dataset.name || "").includes(q) &&
        (city === "All locations" || city === el.dataset.city);
      el.hidden = !show;
      if (show) count += 1;
    });
    const countEl = $("#hospital-count", root);
    const empty = $("#hospital-empty", root) as HTMLElement | null;
    if (countEl) {
      countEl.textContent = `${count} hospital${count === 1 ? "" : "s"}`;
    }
    if (empty) empty.hidden = count !== 0;
  };
  cleanups.push(on($("#hospital-search", root), "input", filterHospitals));
  cleanups.push(on($("#hospital-city", root), "change", filterHospitals));

  const form = $("#plan-form", root) as HTMLFormElement | null;
  if (form) {
    let step = 0;
    const steps = $$(".form-step", form);
    const next = $("#plan-next", form) as HTMLButtonElement | null;
    const back = $("#plan-back", form) as HTMLButtonElement | null;
    const error = $(".form-error", form);
    const params = new URLSearchParams(window.location.search);
    for (const name of ["help", "hospital"] as const) {
      const el = form.elements.namedItem(name) as HTMLSelectElement | null;
      const value = params.get(name);
      if (el && value && [...el.options].some((o) => o.value === value)) {
        el.value = value;
      }
    }

    const showStep = () => {
      steps.forEach((s, i) => {
        (s as HTMLElement).hidden = i !== step;
      });
      const label = $("#step-label", form);
      if (label) label.textContent = `STEP ${step + 1} OF 4`;
      if (back) back.hidden = step === 0;
      if (next) next.textContent = step === 3 ? "Finish preview ↗" : "Continue →";
      $$(".step-list li", root).forEach((li, i) =>
        li.classList.toggle("active", i === step),
      );
      if (error) error.textContent = "";
      if (step === 3) {
        const dl = $("#plan-review", form);
        if (dl) {
          dl.replaceChildren();
          for (const [name, labelText] of [
            ["help", "Help needed"],
            ["hospital", "Hospital"],
            ["city", "Departure city"],
            ["family", "Accompanying family"],
            ["travel", "Travel period"],
            ["name", "Name"],
            ["phone", "Phone"],
            ["method", "Contact preference"],
            ["time", "Convenient time"],
          ] as const) {
            const el = form.elements.namedItem(name) as
              | HTMLInputElement
              | HTMLSelectElement
              | null;
            const dt = document.createElement("dt");
            const dd = document.createElement("dd");
            dt.textContent = labelText;
            dd.textContent =
              el && el.tagName === "SELECT"
                ? (el as HTMLSelectElement).selectedOptions[0]?.textContent ||
                  "Not decided"
                : el?.value || "Not decided";
            dl.append(dt, dd);
          }
        }
      }
      const title = $("h2", steps[step] as ParentNode) as HTMLElement | null;
      if (title) {
        title.tabIndex = -1;
        title.focus({ preventScroll: true });
      }
    };

    cleanups.push(
      on(next, "click", () => {
        const invalid = $$("input, select", steps[step] as ParentNode).find(
          (el) => !(el as HTMLInputElement).checkValidity(),
        ) as HTMLInputElement | undefined;
        if (invalid) {
          if (error)
            error.textContent =
              "Please complete the required fields to continue.";
          invalid.reportValidity();
          return;
        }
        if (step < 3) {
          step += 1;
          showStep();
        } else {
          steps.forEach((s) => {
            (s as HTMLElement).hidden = true;
          });
          const finished = $("#plan-finished", form) as HTMLElement | null;
          const controls = $(".form-controls", form) as HTMLElement | null;
          if (finished) finished.hidden = false;
          if (controls) controls.hidden = true;
          const label = $("#step-label", form);
          if (label) label.textContent = "PREVIEW COMPLETE";
          if (error) error.textContent = "";
          form.reset();
          $("#plan-review", form)?.replaceChildren();
          const h = $("#plan-finished h2", form) as HTMLElement | null;
          if (h) {
            h.tabIndex = -1;
            h.focus();
          }
        }
      }),
    );
    cleanups.push(
      on(back, "click", () => {
        if (step > 0) {
          step -= 1;
          showStep();
        }
      }),
    );
    cleanups.push(
      on(form, "submit", (e) => {
        e.preventDefault();
      }),
    );
  }

  const callback = $("#callback-form", root) as HTMLFormElement | null;
  cleanups.push(
    on(callback, "submit", (e) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLFormElement;
      const result = $(".form-result", target);
      if (result) {
        result.textContent =
          "Preview complete. No callback request has been sent or saved. Official contact channels will be connected before launch.";
      }
      target.reset();
    }),
  );

  return () => cleanups.forEach((fn) => fn());
}
