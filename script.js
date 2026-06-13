const toggle = document.querySelector("[data-menu-toggle]");
const links = document.querySelector("[data-nav-links]");

if (toggle && links) {
  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

const contactButton = document.querySelector("[data-contact-toggle]");
const contactPanel = document.querySelector("[data-contact-panel]");

const decodeParts = (parts) => parts.map((part) => String.fromCharCode(part)).join("");

let contact = {
  email: decodeParts([97,108,114,110,100,49,52,53,49,64,103,109,97,105,108,46,99,111,109]),
  phone: decodeParts([48,49,48,45,51,52,54,50,45,52,48,50,54])
};

if (contactButton && contactPanel) {
  contactButton.addEventListener("click", () => {
    const isOpen = contactPanel.classList.toggle("is-open");
    contactButton.setAttribute("aria-expanded", String(isOpen));
    if (isOpen && !contactPanel.dataset.loaded) {
      contactPanel.querySelector("[data-email]").textContent = contact.email;
      contactPanel.querySelector("[data-phone]").textContent = contact.phone;
      contactPanel.querySelector("[data-mail-link]").setAttribute("href", `mailto:${contact.email}`);
      contactPanel.querySelector("[data-tel-link]").setAttribute("href", `tel:${contact.phone.replaceAll("-", "")}`);
      contactPanel.dataset.loaded = "true";
    }
  });
}

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const key = button.getAttribute("data-copy");
    const value = contact[key];
    try {
      await navigator.clipboard.writeText(value);
      const original = button.textContent;
      button.textContent = "복사됨";
      setTimeout(() => {
        button.textContent = original;
      }, 1200);
    } catch {
      button.textContent = "복사 실패";
    }
  });
});

const fallbackContent = {
  settings: {
    heroTitle: "사람과 업무 흐름을 정리해,\n조직이 더 잘 움직이게 돕습니다.",
    heroSubtitle: "맡은 일은 끝까지 책임지고, 문제가 생기면 피하지 않고 원인을 찾습니다. 인사총무, 고객응대, 운영관리 경험을 바탕으로 반복 업무를 체계화하고 AI 도구를 활용한 업무 개선까지 시도하는 경영지원 실무자 이서진입니다.",
    aboutTitle: "현장에서 배우고,\n맡은 일을 끝까지 정리해온 사람",
    aboutIntro: "이서진은 고객응대, 행정지원, 인사총무, 운영관리 경험을 통해 조직이 안정적으로 움직이도록 돕는 역할에 강점을 쌓아왔습니다.",
    resumeTitle: "조직 운영을 안정적으로 받치는\n인사총무 · 경영지원 이력",
    resumeSubtitle: "채용 운영, 인사행정, 문서관리, 고객응대, 현장 인력 조율 경험을 한눈에 검토할 수 있도록 정리했습니다.",
    resumePdfUrl: "이서진_이력서.pdf",
    jobkoreaPdfUrl: "이서진_잡코리아 이력서.PDF",
    profileImageUrl: "assets/operations-visual.svg",
    contactEmail: contact.email,
    contactPhone: contact.phone
  },
  experience: [
    {
      period: "현재",
      company: "㈜슈카",
      role: "인사담당 및 운영지원",
      summary: "인사업무로 입사해 채용, 서류, 근태, 고객 이슈, 현장 인력 운영까지 폭넓게 맡았습니다. 정해진 업무만 처리하기보다, 회사 운영에 필요한 반복 업무와 예민한 이슈를 함께 정리하는 역할을 수행했습니다.",
      details: "채용공고 등록 및 관리, 지원자 응대, 채용 일정 확인\n계약서, 사업자 관련 서류, 근태 및 패널티 자료 관리\n고객 상담과 클레임 접수, 현장 엔지니어 운영 지원\n전산 시스템 관리, 공고 디자인 제작, 온라인 평판 리서치",
      tags: "채용 운영, 문서 관리, 현장 조율, 컴플레인 대응, AI 업무개선"
    },
    {
      period: "2022.02 - 2023.12",
      company: "일산동구보건소 코로나19 TFT",
      role: "행정보조 및 방문객 응대",
      summary: "코로나19 관련 방문객을 응대하고, 정부 지침에 맞는 안내와 기록 관리, 전산 입력, 행정업무 지원을 수행했습니다.",
      details: "방문객 문의 응대 및 지침 기반 안내\n전산 시스템 입력, 자료 정리, 행정업무 보조\n군 기관 및 민간단체 관련 검체 의뢰 업무 대응",
      tags: "행정지원, 전산 관리, 기관 커뮤니케이션, 민원 응대"
    },
    {
      period: "2021.04 - 2021.11",
      company: "둘리구구대리운전",
      role: "인바운드 고객상담",
      summary: "대리운전 서비스 이용 고객의 문의와 요청을 접수하고, 상황에 맞는 안내를 제공했습니다.",
      details: "고객 문의 접수\n요청사항 정리\n상황별 안내",
      tags: "인바운드 상담, 요청사항 정리, 상황 대처"
    },
    {
      period: "2020.11 - 2021.02",
      company: "KTis 일산",
      role: "인바운드 고객상담",
      summary: "고객 문의를 세심하게 파악하고 필요한 정보를 빠짐없이 안내했습니다.",
      details: "고객 문의 응대\n정보 안내\n상담 커뮤니케이션",
      tags: "CS, 정보 안내, 고객 만족"
    },
    {
      period: "2019.04 - 2020.05",
      company: "해바라기 정육식당",
      role: "홀서비스",
      summary: "고객을 직접 응대하며 요청을 빠르게 파악하고 서비스 품질을 유지하는 경험을 쌓았습니다.",
      details: "현장 고객응대\n서비스 품질 유지\n요청사항 파악",
      tags: "서비스, 현장 대응, 고객응대 기본기"
    }
  ],
  portfolio: [
    {
      category: "01. 업무 개선 | AI 활용",
      title: "AI와 파이썬을 활용한 반복 리서치 자동화 시도",
      summary: "회사 이미지와 컴플레인 관리를 위해 여러 웹사이트에서 관련 키워드를 검색하고, 결과를 정리하고, 증거자료를 관리해야 하는 반복 업무가 있었습니다.",
      problem: "검색, 필터링, 캡처, 정리, 업로드 과정이 반복적이고 시간이 많이 걸렸습니다.",
      action: "ChatGPT, Grok, Gemini를 활용해 검색 수집, 관련성 필터링, 스크린샷 저장, 시트 업로드 흐름을 설계했습니다.",
      result: "완성된 상용 도구는 아니지만, 비개발자 상태에서 기술을 업무 개선에 연결하려는 시도 자체가 강점입니다.",
      tags: "AI 활용, 반복업무 개선, 문제 해결",
      imageUrl: ""
    },
    {
      category: "02. 평판 관리",
      title: "회사 관련 게시물 리서치 및 대응 자료 정리",
      summary: "온라인에 퍼진 부정 게시물과 컴플레인성 내용을 확인하고, 회사 이미지에 영향을 줄 수 있는 자료를 정리하는 업무를 수행했습니다.",
      problem: "여러 플랫폼에 흩어진 게시물을 놓치지 않고 확인해야 했습니다.",
      action: "키워드별 검색 결과를 검토하고, 관련성이 있는 자료를 분류해 대응 여부를 확인할 수 있도록 정리했습니다.",
      result: "예민한 이슈를 회피하지 않고 확인, 분류, 조치 흐름으로 정리하는 경험을 쌓았습니다.",
      tags: "평판 리서치, 자료 분류, 리스크 관리",
      imageUrl: ""
    }
  ]
};

const config = window.PORTFOLIO_CONFIG || {};

function driveUrl(url, type = "file") {
  if (!url) return "";
  const match = String(url).match(/\/d\/([a-zA-Z0-9_-]+)/) || String(url).match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (!match) return url;
  const id = match[1];
  if (type === "image") return `https://drive.google.com/thumbnail?id=${id}&sz=w1400`;
  return `https://drive.google.com/file/d/${id}/view`;
}

function escapeHtml(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function splitList(value) {
  return String(value || "")
    .split(/\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function setTextWithLines(element, value) {
  if (!element || !value) return;
  element.textContent = "";
  String(value)
    .split("\n")
    .forEach((line) => {
      const span = document.createElement("span");
      span.className = "line";
      span.textContent = line.trim();
      element.appendChild(span);
    });
}

function applySettings(settings) {
  contact = {
    email: settings.contactEmail || contact.email,
    phone: settings.contactPhone || contact.phone
  };

  document.querySelectorAll("[data-setting]").forEach((element) => {
    const key = element.getAttribute("data-setting");
    const value = settings[key];
    if (!value) return;
    if (element.hasAttribute("data-lines")) {
      setTextWithLines(element, value);
    } else {
      element.textContent = value;
    }
  });

  document.querySelectorAll("[data-link-setting]").forEach((element) => {
    const key = element.getAttribute("data-link-setting");
    const value = settings[key];
    if (!value) return;
    element.setAttribute("href", driveUrl(value));
  });

  document.querySelectorAll("[data-image-setting]").forEach((element) => {
    const key = element.getAttribute("data-image-setting");
    const value = settings[key];
    if (!value) return;
    element.setAttribute("src", driveUrl(value, "image"));
  });
}

function renderTags(tags) {
  return splitList(tags).map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
}

function renderExperience(rows) {
  const container = document.querySelector("[data-dynamic-experience]");
  if (!container || !rows?.length) return;
  container.innerHTML = rows
    .filter((row) => String(row.visible || "TRUE").toUpperCase() !== "FALSE")
    .map((row) => {
      const details = splitList(row.details).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
      return `
        <article class="timeline-item">
          <div class="period">${escapeHtml(row.period)}</div>
          <div>
            <h3>${escapeHtml(row.company)}${row.role ? ` | ${escapeHtml(row.role)}` : ""}</h3>
            <p>${escapeHtml(row.summary)}</p>
            ${details ? `<ul class="role-list">${details}</ul>` : ""}
            ${row.tags ? `<div class="tag-row">${renderTags(row.tags)}</div>` : ""}
          </div>
        </article>
      `;
    })
    .join("");
}

function renderPortfolio(rows) {
  const container = document.querySelector("[data-dynamic-portfolio]");
  if (!container || !rows?.length) return;
  container.innerHTML = rows
    .filter((row) => String(row.visible || "TRUE").toUpperCase() !== "FALSE")
    .map((row) => {
      const image = row.imageUrl ? `<img class="case-image" src="${escapeHtml(driveUrl(row.imageUrl, "image"))}" alt="${escapeHtml(row.imageAlt || row.title || "포트폴리오 이미지")}">` : "";
      return `
        <article class="card case">
          ${image}
          <span class="case-meta">${escapeHtml(row.category || "Portfolio")}</span>
          <h2>${escapeHtml(row.title)}</h2>
          <p>${escapeHtml(row.summary)}</p>
          <ul class="case-list">
            ${row.problem ? `<li><strong>문제</strong> ${escapeHtml(row.problem)}</li>` : ""}
            ${row.action ? `<li><strong>행동</strong> ${escapeHtml(row.action)}</li>` : ""}
            ${row.result ? `<li><strong>의미</strong> ${escapeHtml(row.result)}</li>` : ""}
          </ul>
          ${row.tags ? `<div class="tag-row">${renderTags(row.tags)}</div>` : ""}
        </article>
      `;
    })
    .join("");
}

function parseGviz(text) {
  const jsonText = text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1);
  const table = JSON.parse(jsonText).table;
  const headers = table.cols.map((col, index) => col.label || col.id || `col${index}`);
  return table.rows.map((row) => {
    const item = {};
    headers.forEach((header, index) => {
      item[header] = row.c[index]?.f ?? row.c[index]?.v ?? "";
    });
    return item;
  });
}

async function loadSheet(sheetName) {
  if (!config.googleSheetId) return [];
  const cacheKey = Math.floor(Date.now() / ((config.cacheMinutes || 5) * 60 * 1000));
  const url = `https://docs.google.com/spreadsheets/d/${config.googleSheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}&cache=${cacheKey}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Google Sheets 응답 오류: ${response.status}`);
  return parseGviz(await response.text());
}

function settingsFromRows(rows) {
  const result = {};
  rows.forEach((row) => {
    if (row.key) result[row.key] = row.value || "";
  });
  return result;
}

async function loadPortfolioContent() {
  let content = fallbackContent;

  try {
    if (config.googleSheetId) {
      const [settingsRows, experienceRows, portfolioRows] = await Promise.all([
        loadSheet(config.sheets?.settings || "Settings"),
        loadSheet(config.sheets?.experience || "Experience"),
        loadSheet(config.sheets?.portfolio || "Portfolio")
      ]);

      content = {
        settings: { ...fallbackContent.settings, ...settingsFromRows(settingsRows) },
        experience: experienceRows.length ? experienceRows : fallbackContent.experience,
        portfolio: portfolioRows.length ? portfolioRows : fallbackContent.portfolio
      };
    }
  } catch (error) {
    console.warn("Google Sheets 내용을 불러오지 못해 기본 콘텐츠를 표시합니다.", error);
  }

  applySettings(content.settings);
  renderExperience(content.experience);
  renderPortfolio(content.portfolio);
}

loadPortfolioContent();
