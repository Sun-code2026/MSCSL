/* ==========================================================================
   MSCSL 챗봇 코어 비즈니스 로직 & AI 엔진 (app.js)
   제작: Antigravity AI
   ========================================================================== */

// 1. 연구실 전용 로컬 지식베이스 (Knowledge Base)
const MSCSL_KNOWLEDGE = {
    introduction: `🔬 **대사성증후군 및 세포신호전달 연구실 (MSCSL)** 소개
대사성증후군 및 세포신호전달 연구실 (Metabolic Syndrome and Cell Signaling Laboratory: MSCSL)은 충남대학교 의과대학 약리학교실 및 의과학교실에 소속되어 있으며, 박종선 교수님(Prof. Jongsun Park, Ph.D.)의 지도 아래 대전광역시 충남대학교 의과대학에서 운영되고 있습니다.

저희 연구실은 세포 내 신호전달계(Cell Signaling Pathways)의 이상으로 야기되는 **대사성 증후군**(당뇨병, 비만, 지방간), **암에너지 대사**, **근감소증**, **교모세포종(Glioblastoma)**의 분자생물학적 기전을 규명하고, 혁신적인 치료 타겟 단백질을 발굴하는 연구를 수행합니다.

**핵심 연구 타겟 단백질**: **PI3K/PKB(Akt) 신호전달 경로**의 신규 기질 단백질인 **PHF20**, **CTMP**, **LETM1**이 에너지 대사 및 종양형성 과정에서 수행하는 역할을 집중 탐구합니다.

**스크리닝 연구**: 항산화 화합물, 지방합성(Lipogenesis) 억제제, 지방분해(Lipolysis) 활성화 물질 등 대사성 질환 치료 후보물질을 적극 발굴하고 있습니다.

지난 25년간 *Cell*, *Science Translational Medicine*, *Nature Communications*, *Autophagy*, *Cancer Research*, *Diabetologia* 등 세계 최고 수준의 SCI 학술지에 다수의 논문을 게재하였으며, 연구 성과를 신약 개발로 연결하기 위해 교원 창업 기업 **㈜미토스테라퓨틱스(Mitos Therapeutics)**를 설립·운영하고 있습니다.

🌐 공식 홈페이지: [한글(cell-signaling.net)](http://cell-signaling.net/) | [영어(mscsl.weebly.com)](https://mscsl.weebly.com/)`,

    professor: `👨‍🔬 **박종선 교수님 (Prof. Jongsun Park, Ph.D.) 프로필**
* **직위**: 교수, 학과장 (Professor, Chairman)
* **소속**: 충남대학교 의과대학 약리학교실 및 의과학교실
* **주소**: 대전광역시 중구 문화로 266, 충남대학교 의과대학 생의학연구원 3006호 (우편번호 35015)
* **이메일**: insulin@cnu.ac.kr
* **전화**: +82-42-280-6768 (오피스) / 010-2784-6895 (휴대폰)

**학력 (Education)**:
  - 🎓 **박사 (Ph.D.)**: 생화학, Basel University, Switzerland (2001)
  - **석사 (M.S.)**: 유전공학, 성균관대학교 (1997)
  - **학사 (B.S.)**: 유전공학, 성균관대학교 (1995)

**경력 (Career)**:
  - 정교수 (2014~현재): 충남대 의과대학 약리학교실 MSCSL
  - 부교수 (2009~2013): 충남대 의과대학 세포신호전달 연구실
  - 방문교수/연구과학자 (2008~2011): Prof. George Thomas 연구실, Metabolic Diseases Institute, University of Cincinnati, OH, USA
  - 조교수 (2004~2008): 충남대 의과대학
  - 박사후 연구원 (2001~2004): Friedrich Miescher Institute for Biomedical Research, Switzerland (단백질 인산화 분자적 측면 연구실)

**주요 연구 관심사 (Research Interests)**:
  - **PI3K/PKB(Akt) 신호전달** 경로의 에너지 대사 및 종양 형성 역할 규명
  - **PHF20**: PKB/Akt의 신규 기질 — NF-κB·p53 신호 조절, 근육 분화(YY1 제어), 지방생성(Lipogenesis)/간 지방증, 대장암 에너지 대사 조절
  - **CTMP**: 비만·인슐린 저항성에서 Akt 인산화 억제, 미토콘드리아 기능 조절 (총 리뷰 논문 게재)
  - **LETM1**: 미토콘드리아 ATP 생성, 미토파지(Mitophagy), 폐암에서 GRP78 축 규명
  - **mTOR/S6K1**: 췌장 β세포 인슐린 분비(NeuroD1 매개), 미토콘드리아 형태 조절
  - **교모세포종(Glioblastoma)**: AXL·PDE11A·SCARF2·AMACR 등 바이오마커 발굴

**학술 활동 및 학회 (Professional Activities)**:
  - 편집위원: *Frontiers in Bioscience* Special Issue Editor (USA)
  - 편집위원: *World Journal of Biological Chemistry*
  - 편집위원: *Toxicological Research*
  - American Association for Cancer Research (AACR) 회원
  - American Diabetes Association (ADA) 회원
  - 한국세포생물학회(KSCB) **총무이사 (General Secretary)**
  - 한국분자세포생물학회(KSMCB) 회원
  - 한국생화학분자생물학회(KSBMB) 회원
  - 한국약리학회(KSP) 회원

* **창업**: ㈜미토스테라퓨틱스(Mitos Therapeutics) 대표이사(CEO) 겸 최고과학책임자(CSO)
* **총 논문 수**: SCI 등재 논문 **121편** (2026년 5월 기준, 출판 완료) + 진행 중 3편`,

    diabetes: `🩸 **당뇨병 및 대사질환 (Diabetes & Metabolic Disease) 연구 분야**
우리 연구실은 **인슐린 신호전달(Insulin Signaling)**의 분자생물학적 기전을 집중 탐구합니다. PI3K/PKB(Akt) 경로를 통한 포도당 대사, 지방 합성, 간 포도당신생합성 조절 기전이 핵심 연구 대상입니다.

**핵심 연구 결과 및 단백질**:
- **LETM1 vs. CTMP 길항 조절**: 고지방식 비만 동물 모델에서 LETM1 발현 감소 + CTMP 발현 증가 → Akt 인산화 억제 → 인슐린 저항성 유발 기전 규명. (*Metabolism* 63(3):318, 2014)
- **PKB/Akt의 ERRγ 인산화**: 인슐린 매개 간의 포도당신생합성 억제 기전 (*Diabetologia* 57(12):2576, 2014)
- **ETV5 전사인자**: 인슐린 분비(Exocytosis) 조절 기전 (*Diabetologia* 57(2):383, 2014)
- **mTOR/NeuroD1**: 췌장 β세포에서 mTOR이 NeuroD1을 통해 인슐린 분비에 필수적임을 in vitro·vivo로 규명 (*Current Biology* 심사 중, 2024)
- **PHF20의 간 지방증(Hepatic Steatosis) 조절**: PHF20 과발현 형질전환 마우스에서 SREBP 조절 통한 지방생성 항진 및 간 지방증 유발 기전 규명 (*Diabetes* 준비 중, 2024)
- **β-Lapachone**: 알코올성 지방간 쥐 모델에서 치료 효과 (*Cellular Signalling* 26(2):295, 2014)
- **S6K1**: 미토콘드리아 형태 및 세포 에너지 흐름 조절 (*Cellular Signalling* 48:13, 2018)

**주요 게재 학술지**: *Diabetologia* (IF 6.7), *Metabolism* (IF 5.8), *Cellular Signalling* (IF 4.3), *Current Biology* (IF 9.2)
**의의**: 인슐린 저항성·비만·제2형 당뇨·지방간의 분자 기전 규명으로 신약 타겟 발굴에 기여합니다.`,

    cancer: `🎗️ **암에너지 대사 및 교모세포종 (Cancer Energy Metabolism & Glioblastoma) 연구 분야**
암세포는 산소가 충분해도 젖산 발효를 선호하는 **Warburg 효과**로 증식 에너지를 획득합니다. 우리 연구실은 이 대사 취약점을 표적하는 연구를 수행합니다.

**핵심 연구 결과 및 단백질**:
- **PHF20 → 대장암 에너지 대사**: PHF20이 미토콘드리아 기능 이상을 유발, 대장암 세포의 호기성 해당과정(Aerobic Glycolysis)으로 전환 유도 (*Cancer Research* 준비 중, 2024)
- **PHF20 → NF-κB 경로**: PHF20이 PP2A의 p65 결합을 방해 → NF-κB 신호 활성화 (*Nature Communications* 4:2062, 2013, IF=11.5, 공동 교신저자)
- **PHF20 → p53 경로**: DNA 손상 시 PKB가 PHF20 Ser291을 인산화 → p53 기능 필수 (*Cellular Signalling* 25(1):74, 2013)
- **LETM1/GRP78 축**: 폐암에서 LETM1-GRP78 상호작용이 새로운 치료 타겟 (*Cell Death & Disease* 13(6):543, 2022, IF=8.5)
- **LETM1·MRPL36**: 미토콘드리아 ATP 생성 및 괴사성 세포사 조절 (*Cancer Research* 69(8):3397, 2009, IF=9.3)
- **mTOR 억제제**: 간세포암에서 유전자 발현 역전 및 자가포식 유도 (*Science Translational Medicine* 2012, IF=15.8)
- **교모세포종(Glioblastoma) 바이오마커 발굴 (진행 중)**:
  - AXL 수용체: 저산소 환경에서 HIF-1α 기능 조절 (*Toxicol Res* 39(4):669, 2023)
  - PDE11A: 교모세포종 잠재적 바이오마커 (*Toxicol Res* 38(3):409, 2022)
  - SCARF2: 교모세포종 신규 치료 타겟 (*Toxicol Res* 38(2):249, 2022)
  - AMACR: 교모세포종 새로운 바이오마커 (*Frontiers in Oncology* 2020)
  - TFAM, PGC1α, TMEM39A: 뇌종양 특이적 마커 연구 (다수 게재)

**게재 주요 학술지**: *Cancer Research* (IF 9.3) / *Nature Communications* (IF 11.5) / *Science Translational Medicine* (IF 15.8) / *Cell Death & Disease* (IF 8.5) / *Redox Biology* (IF 10.8)
**의의**: 대장암·폐암·교모세포종의 대사 취약점을 표적으로 한 정밀 항암 치료 전략 수립에 기여합니다.`,

    sarcopenia: `💪 **근감소증 (Sarcopenia) 연구 분야**
노화 및 대사 이상으로 인한 골격근 질량과 기능 저하(**근감소증**)은 초고령 사회의 핵심 의료 문제이며, 골다공증 등 공존 질환의 부담을 크게 가중시킵니다.

**핵심 연구 결과 및 단백질**:
- **PHF20 → YY1 → 근육 분화**: PHF20이 YY1(Yin Yang 1)을 조절함으로써 근육 줄기세포(Satellite Cells)의 분화 및 근육 재생을 제어하는 기전 규명. In vitro·vivo 모두 검증. (*Cell Death & Differentiation*, 2020, IF=15.8, 공동 교신저자)
- **miR-6516**: 근위축(Disuse Atrophy)에 대한 잠재적 치료 효과 확인 (*Mol Med Rep* 30(3):158, 2024)
- **miRNA 매개 근위축 조절 리뷰**: 근위축에서 microRNA 역할의 분자 경로 및 치료 전략 정리 (*Mol Med Rep* 29(6):9, 2024)
- **진세노사이드 Rg3**: 근위축 억제 및 미토콘드리아 기능 개선 효과 (*J Ethnopharmacol* 242:112054, 2019)
- **자가포식(Autophagy)·미토콘드리아 역학**: 근위축 방어 기전으로서 세포 자가포식 및 미토콘드리아 역학 제어 연구
- **진세노사이드 Rh2**: UV 유도 피부 섬유모세포에서 미토파지 억제 (*J Ginseng Res* 46(5):645, 2022, IF=5.9)

**연계 신약 개발 (㈜미토스테라퓨틱스)**:
- **PHF20을 핵심 표적**으로 하는 근감소증 치료제 후보물질 최적화 진행 중
  - Track 1: **약물재배치(Drug Repositioning)** — 기존 승인 약물 중 근감소증 억제 효과 재발굴
  - Track 2: **신규 약물 개발** — PHF20 조절 신물질 최적화 단계

**게재 주요 학술지**: *Cell Death & Differentiation* (IF 15.8) / *Molecular Medicine Reports* (IF 2.9) / *J Ginseng Research* (IF 5.9)
**의의**: 어르신들의 건강수명 연장과 삶의 질 향상에 직접 기여하는 근감소증 치료제 개발을 선도합니다.`,

    publications: `📄 **주요 연구 성과 및 논문 (Key Publications)**
박종선 교수님 연구팀의 SCI 등재 논문 **총 121편** (1996~2026, 출판 기준) + 진행 중 3편 목록입니다.

**🏆 대표 논문 (Flagship Papers)**:
* **Cell (2002)** 111:293-303 — PKB Binding Proteins: Getting in on the Akt
* **Nature Cell Biology (2005)** 7(1):30-41 — Akt·14-3-3η의 Miz1 제어, DNA 손상 후 세포주기 억제
* **Science Translational Medicine (2012)** 4(139):139ra84 — mTOR 억제제와 간세포암 퇴행 (IF=15.8)
* **Nature Communications (2013)** 4:2062 — PHF20의 NF-κB 신호 조절 기전 (공동 교신저자, IF=11.5)
* **Cancer Research (2009)** 69(8):3397 — LETM1·MRPL36의 미토콘드리아 ATP·괴사 조절 (IF=9.3)
* **Cell Death & Differentiation (2020)** — YY1이 PHF20 매개 근육 분화에 필수 (공동 교신저자, IF=15.8)

**📅 최신 논문 (2024~2026, PubMed 기준)**:
* **121.** Lee B, Son C, Eom S, et al. (2026) Emerging roles of POLR2L in RNA polymerase II dynamics and disease mechanisms (Review). *Mol Med Rep* 33(6). doi:10.3892/mmr.2026.13869
* **120.** Cho H, Lee B, Son C, et al. (2025) ERLIN1: A central regulator of protein quality control, lipid homeostasis, and cellular signaling at the ER. *Cell Signal* 138. doi:10.1016/j.cellsig.2025.112224
* **119.** Park M, Cho S, Choi S, et al. (2025) Therapeutic potential of sulfasalazine for sarcopenia: Insights from mouse models and clinical data. *Exp Gerontol* 210. doi:10.1016/j.exger.2025.112883
* **118.** Lee S, Lee B, Kwon SH, et al. (2025) MCC in the spotlight: Its dual role in signal regulation and oncogenesis. *Cell Signal* 131. doi:10.1016/j.cellsig.2025.111756
* **117.** Nguyen H, Juang U, Gwon S, et al. (2024) Effect of CTMP1 gene on pulmonary fibrosis. *Toxicol Res* 41(3). doi:10.1007/s43188-024-00269-6
* **116.** Juang U, Lee S, Gwon S, et al. (2024) Enhancement of renal fibrosis in PHF20 transgenic mice. *Toxicol Res* 41(1). doi:10.1007/s43188-024-00268-7
* **115.** Juang U, Gwon S, Jung W, et al. (2024) Exploring the various functions of PHD finger protein 20: beyond the unknown (Review). *Toxicol Res* 41(1). doi:10.1007/s43188-024-00265-w
* **114.** Nguyen H, Huang Q, Juang U, et al. (2024) The MCC gene as a potential biomarker of glioblastoma. *Front Oncol* 14. doi:10.3389/fonc.2024.1435605
* **110.** Nguyen H, Kim SH, Juang U, et al. (2024) Overview of CTMP1 and its importance in metabolic regulations (Review). *Mol Med Rep* 30(3). doi:10.3892/mmr.2024.13282
* **109.** Jung W, Juang U, Gwon S, et al. (2024) Identifying the potential therapeutic effects of miR-6516 on muscle disuse atrophy. *Mol Med Rep* 30(1). doi:10.3892/mmr.2024.13243
* **108.** Jung W, Juang U, Gwon S, et al. (2024) MicroRNA-mediated regulation of muscular atrophy (Review). *Mol Med Rep* 29(6). doi:10.3892/mmr.2024.13222
* **107.** Tran Q, Hong Y, Lee H, et al. (2023) AXL is required for hypoxia-mediated HIF-1α function in glioblastoma. *Toxicol Res* 39(4):669. doi:10.1007/s43188-023-00195-z
* **105.** Son J, Jung O, Kim JH, et al. (2023) MARS2 drives metabolic switch of NSCLC cells via interaction with MCU. *Redox Biol* 60:102628. doi:10.1016/j.redox.2023.102628

**📅 진행 중 (In Preparation/Submitted, 2024)**:
* **113.** PHF20 과발현 마우스에서 SREBP 조절 → 지방생성·간 지방증 — *Diabetes* (준비 중)
* **112.** PHF20 매개 미토콘드리아 기능 이상 → 대장암 호기성 해당과정 — *Cancer Research* (준비 중)
* **111.** mTOR이 NeuroD1 통해 췌장 β세포 인슐린 분비에 필수 — *Current Biology* (심사 중)

**📅 연도별 게재 건수 요약**:
2026: 1편 | 2025: 3편 | 2024: 7편 | 2023: 3편 | 2022: 6편 | 2021: 1편 | 2020: 8편
2019: 4편 | 2018: 4편 | 2017: 8편 | 2016: 11편 | 2015: 1편 | 2014: 6편
2013: 6편 | 2012: 2편 | 2010: 5편 | 2009: 5편 | 2008: 7편
2007: 7편 | 2006: 4편 | 2005: 3편 | 2004: 2편 | 2003: 2편
2002: 1편(**Cell**) | 2001: 2편 | 2000: 1편 | 1999: 2편 | 1996: 1편

🔗 전체 논문 목록: [MSCSL Publications](https://mscsl.weebly.com/publications.html) | [PubMed](https://pubmed.ncbi.nlm.nih.gov/?term=Jongsun+Park+Daejeon&sort=date)`,

    company: `🏢 **㈜미토스테라퓨틱스 (Mitos Therapeutics Inc.) 소개**
박종선 교수님이 설립한 **교원 창업 바이오 벤처 기업**으로, 25년간의 세포신호전달 연구 성과를 실제 신약 개발로 연결합니다.

**슬로건**: *"Innovation Today, Healthier Tomorrow"*
**미션**: "에너지 대사의 정밀 조절을 통한 노화 건강 회복" — 세포 에너지 대사를 정상화하는 치료제 발굴

* **회사명 유래**: 'Mitos'는 미토콘드리아(Mitochondria)에서 유래. 미토콘드리아 기반 세포 에너지 대사가 핵심 연구 기반.

**주소**: 대전광역시 유성구 대학로 99, 산학연 교육-연구동 305호 (우편번호 34134)
**연락처**: +82-42-825-6702 / 010-2713-6702
**이메일**: insulin@mitos-thera.com
**운영시간**: 09:00 ~ 17:00

**경영진 (Leadership Team)**:
| 직책 | 이름 |
|------|------|
| CEO & CSO (대표이사) | 박종선 (Jongsun Park) |
| COO | 박지수 (Jisoo Park) |
| CFO | 송찬규 (Chan-Kyu Song) |
| 약물 구조/모델링 자문 | 강남숙 교수 (충남대) |
| 의약화학 자문 | 심재훈 교수 (경희대) |
| 약동학/약력학 자문 | 채정우 교수 (충남대) |

**임상 자문 (Clinical Advisers)**:
- 김선환 교수 (충남대학교병원)
- 조영석 교수 (연세대학교병원)
- 박철현 교수 (강북삼성병원)

**핵심 파이프라인 (6대 치료 영역)**:
1. 🎯 **근감소증 (Sarcopenia)** — 노화 근육 손실 치료 (주력 파이프라인)
2. 🩺 **비만 (Obesity)**
3. 🩸 **당뇨병 (Diabetes Mellitus)**
4. 🫀 **지방간 (Fatty Liver)**
5. 🧬 **암에너지 대사 (Cancer Metabolism)**
6. 🧠 **교모세포종 (Glioblastoma)**

🌐 공식 홈페이지: [www.mitos-thera.com](https://www.mitos-thera.com/)`,

    members: `👥 **MSCSL 현재 연구원 소개 (Lab Members, 2026년 기준)**

| 이름 | 직위/과정 | 연구 주제 |
|------|----------|-----------|
| 엄선호 | 박사 (Post-doc) | PHF20 — UUO 모델 기반 만성신장질환(CKD) 기전 연구 |
| 이범우 | 석사 5기 | 항암제 저항성 난소암 (Drug Resistance in Ovarian Cancer) |
| 최재석 | 석사 4기 | PHF20의 세포 기능 연구 (Cellular Function for PHF20) |
| 손창규 | 석사 2기 | 근육 특이적 PHF20 조건부 결손 마우스 (Muscle-specific PHF20 KO mice) |
| Ayesha Bibi | 석사 2기 | CTMP2 결손 마우스의 고지방식 지방간 모델 (CTMP2 KO mice with HFD-induced Fatty Liver) |
| 하경희 | 석사 1기 | 뇌종양 / TMEM39A 연구 |
| Sumaiya | 석사 1기 | 뇌종양 / 난소암 연구 |

**졸업생 (Alumni 일부)**:
- 박지수 박사 → ㈜미토스테라퓨틱스 COO
- 이용진 박사 → 순천대학교 연구교수
- 양금진 박사 (2007) → 가톨릭대학교병원 대전성모병원 PI
- 국제 유학생 포함 다수의 석·박사 졸업생이 국내외 바이오·제약 기관에서 활동 중

🌐 전체 연구원 목록: [MSCSL Lab Members](https://mscsl.weebly.com/lab-members.html)`,

    location: `📍 **연구실 위치 및 연락처 안내**
* **연구실명**: 대사성증후군 및 세포신호전달 연구실 (MSCSL)
* **소속기관**: 암연구소 내 대사성증후군 및 세포신호전달 연구실 (Institute for Cancer Research)
* **주소 (영문)**: Metabolic Syndrome and Cell Signaling Laboratory in Institute for Cancer Research, Department of Pharmacology, College of Medicine, Chungnam National University, 266 Munhwa-ro, Jung-gu, Daejeon, 35015, South Korea
* **주소 (한글)**: 대전광역시 중구 문화로 266, 충남대학교 의과대학 약리학교실 암연구소 내 MSCSL (우편번호 35015)
* **전화**: +82-42-280-6768
* **연구실 내선**: 042-580-8252
* **팩스**: +82-42-585-6627
* **교수님 이메일**: insulin@cnu.ac.kr
* **교수님 휴대폰**: 010-2784-6895
* **한글 홈페이지**: [cell-signaling.net](http://cell-signaling.net/)
* **영문 홈페이지**: [mscsl.weebly.com](https://mscsl.weebly.com/)
* **회사 홈페이지**: [mitos-thera.com](https://www.mitos-thera.com/)
* **지도 링크**: [충남대학교 의과대학 위치 보기](https://map.naver.com/v5/search/%EC%B6%A9%EB%82%A8%EB%8C%80%ED%95%99%EA%B5%90%20%EC%9D%98%EA%B3%BC%EB%8C%80%ED%95%99)`,

    rules: `🛡️ **MSCSL 연구실 근무수칙 (Work Regulations)**
*(최종 개정: 2026년 2월 2일)*

**1. 근무시간**
- 월~금: 오전 9시 ~ 오후 6시 (출근 기준: 오전 9시)
- 오후 6시 이후는 자율 근무
- **출근 시 Slack 출근 채널에 출근 시간 반드시 기록**
- ⚠️ 천재지변 외 이유로 9시 이후 출근할 경우 → 이후 **3일간 8:30 출근 자동 적용**

**2. 근무 태도**
- 근무 시간에는 **연구에만 전념** (실험, 실험 토의, 논문 읽기)
- 실험실 내 영어 공부, 소설 읽기 등 비연구 활동 **금지**
- 사적인 전화는 **연구실 밖**에서 통화 (타인 방해 최소화)

**3. PC/노트북 사용**
- 개인 목적의 PC/노트북 사용 **원칙적 금지**
- 허용되는 연구 목적 사용: PubMed 논문 검색, EndNote 논문 작성, 데이터 작성
- 인터넷 사용 중 홈쇼핑, 음악 듣기 등 개인적 사용 **금지** (연구실은 PC방이 아님)
- 근무 시간 이후 노트북 개인 사용은 허용

**4. 에너지 절약**
- **마지막 퇴근자**는 연구에 사용되지 않는 모든 장비의 전원을 반드시 차단

**5. 휴가 규정**
연구실 근무 경력에 따라 휴가 일수 배정:
| 근무 기간 | 휴가 일수 |
|-----------|----------|
| 3개월 이하 | 2일 |
| 6개월 이하 | 4일 |
| 1년 이하 | 6일 |
| 1년 이상 | 8일 |

- 여름휴가: 7월 초 ~ 8월 말 / 겨울휴가: 1월 초 ~ 2월 말
- 한 번의 휴가 기간: **최소 3일 ~ 최대 5일** 사용 원칙
- 휴가 일정은 **방장과 사전 상의**하여 연구원 간 겹치지 않도록 조율
- 연간 총 8일은 연구 일정에 맞춰 자율 분할 사용 가능

**현재 연구원**: 이범우, 손창규, 최재석, 하경희, Ayesha Bibi`
};

// 2. 키워드 매칭 스코어 사전 (자연어 매칭용) — 실제 홈페이지 데이터 기반으로 업데이트
const KEYWORD_DICTIONARY = {
    introduction: ['소개', '연구실', '실험실', '연구', 'mscsl', 'MSCSL', '무슨', '정의', '개요', '어떤', '랩', 'lab', '홈페이지', '어떤 연구', 'PI3K', 'PKB', 'Akt', '충남대', '의과대학', '약리학'],
    members: ['연구원', '구성원', '학생', '박사', '석사', '멤버', 'member', 'members', '누구', '졸업생', 'alumni', '엄선호', '이범우', '최재석', '손창규', '하경희', 'Ayesha', 'Bibi', 'Sumaiya', '방장', '실험실원', 'CKD', '신장질환', '난소암', 'PHF20 KO', 'CTMP2'],
    professor: ['교수', '박종선', '선생님', '주임', '약리', '약리학', '경력', '약력', '25년', '재직', '소속', '보직', '학회', 'jongsun', 'Jongsun', 'park', 'Park', 'ph.d', 'PhD', '수상', '학술대상', 'MRC', '중견연구자', '창업'],
    diabetes: ['당뇨', '당뇨병', '인슐린', '저항성', '포도당', '글루코스', '감수성', '대사성증후군', '대사질환', '대사 질환', '대사성', 'LETM1', 'CTMP', '비만', '인슐린저항성', 'insulin'],
    cancer: ['암', '에너지', '대사', '암대사', '암에너지', '종양', '워버그', 'warburg', 'Warburg', '항암', '항암제', '암세포', '암에너지대사', 'PHF20', 'NF-kB', 'NF-κB', 'p53', '미토콘드리아', 'mitochondria', 'LETM1', '괴사', 'necrosis'],
    sarcopenia: ['근감소', '근감소증', '근육', '노화', '줄기세포', '위축', '근위축', '골격근', '소실', 'sarcopenia', 'Sarcopenia', '위축증', 'PHF20', 'YY1', '근육분화', '재생', 'satellite'],
    publications: ['논문', '출판', '학술지', '저널', '발표', 'publications', '업적', '실적', '성과', 'paper', 'nature', 'Cell Death', 'Cellular Signalling', '게재', 'SCI', 'ORCID', 'ResearchGate'],
    company: ['회사', '기업', '창업', '미토스', '미토스테라퓨틱스', 'mitos', 'Mitos', '파이프라인', '신약', '치료제', '벤처', '스타트업', '사업화', '기술이전', 'therapeutics'],
    location: ['위치', '주소', '연락처', '오시는 길', '전화', '이메일', '메일', '어디', '찾아가', '지도', '대전', '문화로', '홈페이지', '웹사이트', 'weebly', 'cell-signaling'],
    rules: ['규칙', '수칙', '안전', '규정', '출근', '매너', '약속', '룰', 'rules', 'Rules', '준수', '실험복', '연구노트', 'lab meeting', '미팅', '저널클럽', '근무', '근무시간', '퇴근', '휴가', '연차', '휴일', 'slack', 'Slack', '슬랙', '지각', '8시30분', '8:30', 'PC', '노트북', '인터넷', '전원', '에너지', '이범우', '손창규', '최재석', '하경희', 'Ayesha', '연구원']
};

// 3. 애플리케이션 상태 (State)
let appState = {
    theme: 'light',
    sidebarOpen: false,
    aiEngine: 'local', // 'local' 또는 'gemini'
    geminiApiKey: '',
    isTyping: false
};

// 4. DOM 요소 셀렉터
const dom = {
    appRoot: document.getElementById('app-root'),
    sidebar: document.getElementById('sidebar'),
    sidebarOverlay: null, // 모바일 배경 오버레이 (동적 생성 예정)
    menuBtn: document.getElementById('menu-btn'),
    closeSidebarBtn: document.getElementById('close-sidebar-btn'),
    sidebarTabs: document.getElementById('sidebar-tabs'),
    tabBtns: document.querySelectorAll('.tab-btn'),
    tabPanels: document.querySelectorAll('.tab-panel'),
    themeToggleBtn: document.getElementById('theme-toggle-btn'),
    themeIcon: document.getElementById('theme-icon'),
    settingsBtn: document.getElementById('settings-btn'),
    settingsModal: document.getElementById('settings-modal'),
    closeModalBtn: document.getElementById('close-modal-btn'),
    settingsCancel: document.getElementById('settings-cancel'),
    settingsSave: document.getElementById('settings-save'),
    chatMessages: document.getElementById('chat-messages'),
    chatForm: document.getElementById('chat-form'),
    chatInput: document.getElementById('chat-input'),
    connectionStatus: document.getElementById('connection-status'),
    engineLocal: document.getElementById('engine-local'),
    engineGemini: document.getElementById('engine-gemini'),
    apiKeyGroup: document.getElementById('api-key-group'),
    geminiApiKeyInput: document.getElementById('gemini-api-key'),
    togglePasswordBtn: document.getElementById('toggle-password-btn')
};

// 5. 초기화 함수 (Initialization)
function init() {
    // A. 로컬 저장소 데이터 불러오기
    loadSettings();

    // B. 모바일 오버레이 생성 및 레이아웃 설정
    createMobileOverlay();

    // C. 이벤트 리스너 등록
    registerEventListeners();

    // D. Lucide 아이콘 초기 렌더링
    lucide.createIcons();

    // E. 챗봇 초기 로드 애니메이션
    scrollToBottom();

    // F. 서비스 워커 등록 (PWA 모바일 앱 지원)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./sw.js')
                .then(reg => console.log('[PWA] Service Worker Registered!', reg))
                .catch(err => console.error('[PWA] Service Worker registration failed: ', err));
        });
    }
}

// 6. 설정 로드 및 세팅 적용
function loadSettings() {
    // 테마 설정
    const savedTheme = localStorage.getItem('mscsl-theme');
    if (savedTheme) {
        appState.theme = savedTheme;
        dom.appRoot.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    // AI 엔진 설정
    const savedEngine = localStorage.getItem('mscsl-engine');
    const savedKey = localStorage.getItem('mscsl-gemini-key');

    if (savedEngine) {
        appState.aiEngine = savedEngine;
        if (savedEngine === 'gemini') {
            dom.engineGemini.checked = true;
            dom.apiKeyGroup.style.display = 'block';
            dom.connectionStatus.textContent = 'Gemini AI 모드 작동 중';
            dom.connectionStatus.previousElementSibling.className = 'status-indicator api';
        } else {
            dom.engineLocal.checked = true;
            dom.apiKeyGroup.style.display = 'none';
            dom.connectionStatus.textContent = '로컬 지식 모드 작동 중';
            dom.connectionStatus.previousElementSibling.className = 'status-indicator online';
        }
    }

    if (savedKey) {
        appState.geminiApiKey = savedKey;
        dom.geminiApiKeyInput.value = savedKey;
    }
}

// 7. 모바일 터치 오버레이 생성
function createMobileOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    dom.appRoot.appendChild(overlay);
    dom.sidebarOverlay = overlay;

    // 오버레이 클릭 시 사이드바 닫기
    overlay.addEventListener('click', toggleSidebar);
}

// 8. 테마 아이콘 토글 함수
function updateThemeIcon(theme) {
    if (theme === 'dark') {
        dom.themeIcon.setAttribute('data-lucide', 'sun');
    } else {
        dom.themeIcon.setAttribute('data-lucide', 'moon');
    }
    lucide.createIcons();
}

// 9. 사이드바 제어 (모바일 대응)
function toggleSidebar() {
    appState.sidebarOpen = !appState.sidebarOpen;
    if (appState.sidebarOpen) {
        dom.sidebar.classList.add('open');
        dom.sidebarOverlay.classList.add('open');
    } else {
        dom.sidebar.classList.remove('open');
        dom.sidebarOverlay.classList.remove('open');
    }
}

// 10. 탭 메뉴 전환 기능
function switchTab(e) {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;

    const targetTabId = btn.getAttribute('data-tab');

    // 모든 버튼 비활성화 및 선택 탭 활성화
    dom.tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // 모든 패널 숨김 및 선택 패널 활성화
    dom.tabPanels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === targetTabId) {
            panel.classList.add('active');
        }
    });
}

// 11. 이벤트 리스너 통합 등록
function registerEventListeners() {
    // 사이드바 토글 (모바일 메뉴 버튼)
    dom.menuBtn.addEventListener('click', toggleSidebar);
    dom.closeSidebarBtn.addEventListener('click', toggleSidebar);

    // 탭 클릭 이벤트
    dom.sidebarTabs.addEventListener('click', switchTab);

    // 테마 토글 버튼 클릭
    dom.themeToggleBtn.addEventListener('click', () => {
        const nextTheme = appState.theme === 'light' ? 'dark' : 'light';
        appState.theme = nextTheme;
        dom.appRoot.setAttribute('data-theme', nextTheme);
        localStorage.setItem('mscsl-theme', nextTheme);
        updateThemeIcon(nextTheme);
    });

    // 설정 모달 열기/닫기
    dom.settingsBtn.addEventListener('click', openSettings);
    dom.closeModalBtn.addEventListener('click', closeSettings);
    dom.settingsCancel.addEventListener('click', closeSettings);
    dom.settingsSave.addEventListener('click', saveSettings);

    // AI 엔진 라디오 토글 이벤트
    dom.engineLocal.addEventListener('change', () => {
        dom.apiKeyGroup.style.display = 'none';
    });
    dom.engineGemini.addEventListener('change', () => {
        dom.apiKeyGroup.style.display = 'block';
    });

    // API Key 패스워드 표시 토글
    dom.togglePasswordBtn.addEventListener('click', () => {
        const isPassword = dom.geminiApiKeyInput.getAttribute('type') === 'password';
        dom.geminiApiKeyInput.setAttribute('type', isPassword ? 'text' : 'password');
        dom.togglePasswordBtn.querySelector('i').setAttribute('data-lucide', isPassword ? 'eye-off' : 'eye');
        lucide.createIcons();
    });

    // 대화 입력 양식 제출
    dom.chatForm.addEventListener('submit', handleFormSubmit);

    // 퀵 리플라이 버튼 클릭 감지 (위임형 이벤트 처리)
    dom.chatMessages.addEventListener('click', (e) => {
        const btn = e.target.closest('.quick-reply-btn');
        if (btn) {
            const payload = btn.getAttribute('data-payload');
            sendUserMessage(payload);
        }
    });
}

// 12. 설정 모달창 열기/닫기
function openSettings() {
    dom.settingsModal.classList.add('open');
}

function closeSettings() {
    // 현재 취소 시 원상복구
    loadSettings();
    dom.settingsModal.classList.remove('open');
}

function saveSettings() {
    const selectedEngine = document.querySelector('input[name="ai-engine"]:checked').value;
    const apiKey = dom.geminiApiKeyInput.value.trim();

    if (selectedEngine === 'gemini' && apiKey === '') {
        alert('Gemini AI 모드를 활성화하려면 API Key가 꼭 필요합니다!');
        return;
    }

    appState.aiEngine = selectedEngine;
    appState.geminiApiKey = apiKey;

    localStorage.setItem('mscsl-engine', selectedEngine);
    localStorage.setItem('mscsl-gemini-key', apiKey);

    // 헤더 상태바 업데이트
    if (selectedEngine === 'gemini') {
        dom.connectionStatus.textContent = 'Gemini AI 모드 작동 중';
        dom.connectionStatus.previousElementSibling.className = 'status-indicator api';
    } else {
        dom.connectionStatus.textContent = '로컬 지식 모드 작동 중';
        dom.connectionStatus.previousElementSibling.className = 'status-indicator online';
    }

    dom.settingsModal.classList.remove('open');
}

// 13. 채팅 화면 하단 스크롤
function scrollToBottom() {
    dom.chatMessages.scrollTop = dom.chatMessages.scrollHeight;
}

// 14. 폼 제출 핸들러
function handleFormSubmit(e) {
    e.preventDefault();
    const query = dom.chatInput.value.trim();
    if (query === '' || appState.isTyping) return;

    dom.chatInput.value = '';
    sendUserMessage(query);
}

// 15. 사용자 메시지 전송 및 화면 출력
function sendUserMessage(text) {
    // 사용자 버블 화면에 출력
    renderMessage('user', text);
    scrollToBottom();

    // 봇 응답 생성 지연 (타이핑 효과)
    renderBotResponse(text);
}

// 16. 메시지 렌더링 함수
function renderMessage(sender, text, isHtml = false) {
    const msgGroup = document.createElement('div');
    msgGroup.className = `message-group ${sender}`;

    const date = new Date();
    const timeString = date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: true });

    if (sender === 'bot') {
        msgGroup.innerHTML = `
            <div class="message-avatar">
                <img src="assets/mscsl_logo.png" alt="MSCSL AI">
            </div>
            <div class="message-bubble-wrapper">
                <div class="message-bubble">
                    ${isHtml ? text : escapeHtmlAndFormat(text)}
                </div>
                <span class="message-time">${timeString}</span>
            </div>
        `;
    } else {
        msgGroup.innerHTML = `
            <div class="message-bubble-wrapper">
                <div class="message-bubble">
                    ${escapeHtmlAndFormat(text)}
                </div>
                <span class="message-time">${timeString}</span>
            </div>
        `;
    }

    dom.chatMessages.appendChild(msgGroup);
    lucide.createIcons();
}

// HTML 엔티티 이스케이프 및 줄바꿈/마크다운 형식 변환
function escapeHtmlAndFormat(str) {
    let div = document.createElement('div');
    div.innerText = str;
    let html = div.innerHTML;

    // 간단한 마크다운 파싱 (줄바꿈, 볼드, 링크)
    html = html.replace(/\n/g, '<br>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    return html;
}

// 17. 생각중 (타이핑 로더) 렌더링
function renderTypingIndicator() {
    const loaderGroup = document.createElement('div');
    loaderGroup.className = 'message-group bot typing-indicator-group';
    loaderGroup.innerHTML = `
        <div class="message-avatar">
            <img src="assets/mscsl_logo.png" alt="MSCSL AI">
        </div>
        <div class="message-bubble-wrapper">
            <div class="message-bubble">
                <div class="typing-loader">
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                </div>
            </div>
        </div>
    `;
    dom.chatMessages.appendChild(loaderGroup);
    scrollToBottom();
    appState.isTyping = true;
}

// 생각중 지우기
function removeTypingIndicator() {
    const loader = document.querySelector('.typing-indicator-group');
    if (loader) {
        loader.remove();
    }
    appState.isTyping = false;
}

// 18. 봇 응답 제어기 (대화 코어)
async function renderBotResponse(userQuery) {
    renderTypingIndicator();

    // 입력한 질문을 분석하여 지식 답변 획득
    let responseText = '';
    
    // 약간의 딜레이를 주어 실제 로딩 같은 사용자 경험 부여 (최소 0.8초)
    await new Promise(resolve => setTimeout(resolve, 800));

    if (appState.aiEngine === 'gemini' && appState.geminiApiKey) {
        // 구글 Gemini API 실시간 학습 통신
        try {
            responseText = await fetchGeminiResponse(userQuery);
        } catch (error) {
            console.error('Gemini API Error:', error);
            responseText = `⚠️ **Gemini AI 호출 오류**: ${error.message}\n\n로컬 지식 데이터베이스로 자동 전환하여 대신 답변을 드립니다:\n\n${getLocalKnowledgeResponse(userQuery)}`;
        }
    } else {
        // 로컬 지식 엔진 구동
        responseText = getLocalKnowledgeResponse(userQuery);
    }

    removeTypingIndicator();
    renderMessage('bot', responseText);

    // 로컬 모드일 때 특정 키워드가 나온 경우, 연관 퀵 버튼을 동적으로 추가
    appendDynamicQuickReplies(userQuery);
    scrollToBottom();
}

// 19. 로컬 자연어 지식 매칭 엔진 (Keyword Scoring Matcher)
function getLocalKnowledgeResponse(query) {
    const cleanQuery = query.toLowerCase().replace(/\s+/g, '');
    let scores = {
        introduction: 0,
        professor: 0,
        diabetes: 0,
        cancer: 0,
        sarcopenia: 0,
        publications: 0,
        company: 0,
        members: 0,
        location: 0,
        rules: 0
    };

    // 각 카테고리별 매칭 키워드 채점
    for (const [category, keywords] of Object.entries(KEYWORD_DICTIONARY)) {
        for (const kw of keywords) {
            if (cleanQuery.includes(kw.toLowerCase())) {
                scores[category] += 2; // 정확히 매치되면 2점
            }
        }
    }

    // 최고 점수 획득 카테고리 찾기
    let bestCategory = 'none';
    let maxScore = 0;
    
    for (const [cat, score] of Object.entries(scores)) {
        if (score > maxScore) {
            maxScore = score;
            bestCategory = cat;
        }
    }

    // 0점이면 기본 폴백 답변 출력
    if (maxScore === 0) {
        return `죄송합니다, 입력하신 질문 **"${query}"**에 대한 명확한 연구실 내장 정보를 찾지 못했습니다. 😢

저는 다음과 같은 내용에 대해 안내를 드릴 수 있습니다. 아래 주제어로 물어봐 주시거나, 하단의 버튼을 눌러보세요!
* **연구실 관련**: "연구실 어떤 곳이야?", "MSCSL 뜻이 뭐야?"
* **교수님 관련**: "박종선 교수님 소개", "교수님 수상 이력 알려줘"
* **핵심 연구 분야**: "당뇨병 연구", "암에너지 대사 연구", "근감소증 연구"
* **논문 및 성과**: "주요 논문 알려줘", "어떤 학술지에 게재했나요?"
* **회사 소개**: "미토스테라퓨틱스가 뭐야?", "연구실 창업 회사 소개해줘"
* **위치 및 수칙**: "연구실 주소", "연구실 운영 규칙"`;
    }

    // 매치 성공 시 해당 지식베이스 출력
    return MSCSL_KNOWLEDGE[bestCategory];
}

// 20. 구글 Gemini API 통신 및 시스템 콘텍스트 주입 로직
async function fetchGeminiResponse(userQuery) {
    const API_KEY = appState.geminiApiKey;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${API_KEY}`;

    // 질문과 관련된 논문 최대 5편 검색
    const relatedPapers = (typeof searchPapers === 'function') ? searchPapers(userQuery) : [];
    const papersContext = relatedPapers.length > 0
        ? '\n\n[질문 관련 MSCSL 논문 (PDF 데이터베이스 기반)]\n' +
          relatedPapers.map((p, i) =>
              `${i+1}. [${p.year}] ${p.journal} | ${p.id}\n   ${p.abstract}`
          ).join('\n')
        : '';

    const requestBody = {
        systemInstruction: {
            parts: [{
                text: `너는 충남대학교 의과대학 약리학교실의 '대사성증후군 및 세포신호전달 연구실 (MSCSL)' 공식 AI 비서다.
지도교수님은 25년간 재직하신 박종선 교수님 (Prof. Jongsun Park, Ph.D.)이시다.
아래에 제공하는 연구실 공식 정보(홈페이지 http://cell-signaling.net/, https://mscsl.weebly.com/ 및 창업회사 https://www.mitos-thera.com/ 데이터 기반)를 최우선 기준으로 준수하여 사용자에게 한국어로 친절하고 전문적으로 답해라.

[MSCSL 공식 연구실 정보]
1. 연구실 개요:
${MSCSL_KNOWLEDGE.introduction}

2. 박종선 교수님 이력:
${MSCSL_KNOWLEDGE.professor}

3. 당뇨병 및 대사질환 연구 (핵심 단백질: LETM1, CTMP, PI3K/Akt):
${MSCSL_KNOWLEDGE.diabetes}

4. 암에너지 대사 연구 (핵심 단백질: PHF20, LETM1, NF-κB, p53):
${MSCSL_KNOWLEDGE.cancer}

5. 근감소증 연구 (핵심 단백질: PHF20, YY1):
${MSCSL_KNOWLEDGE.sarcopenia}

6. 주요 논문 및 연구 성과:
${MSCSL_KNOWLEDGE.publications}

7. 창업회사 미토스테라퓨틱스 소개:
${MSCSL_KNOWLEDGE.company}

8. 위치 및 오시는 길:
${MSCSL_KNOWLEDGE.location}

9. 연구실 규칙:
${MSCSL_KNOWLEDGE.rules}

10. 현재 연구원 및 졸업생:
${MSCSL_KNOWLEDGE.members}

[대화 수칙]
- 연구실이나 의학 관련 질문에 대해서는 최대한 상세하고 신뢰성 있게 학술적인 어조를 가미하여 답변해라.
- PHF20, CTMP, LETM1, PI3K, PKB/Akt 등 핵심 연구 단백질에 대해서는 자신 있게 설명해라.
- 제공된 정보 외의 답변이 필요할 때는 "연구실 공식 문서 이외의 전문 지식을 기반으로 보완하여 답변드립니다"라고 상기시키고 정확한 의학/생명과학 지식으로 보완해라.
- 인사는 늘 공손하고 메디컬 연구실의 품위가 드러나게 해라.${papersContext}`
            }]
        },
        contents: [
            {
                role: "user",
                parts: [{ text: userQuery }]
            }
        ],
        generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 8192
        }
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`[${response.status}] ${errorData.error?.message || 'Gemini API 호출에 실패했습니다.'}`);
    }

    const data = await response.json();
    const botText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!botText) {
        throw new Error('AI 응답 포맷이 맞지 않습니다.');
    }

    return botText.trim();
}

// 21. 동적 퀵 리플라이 버튼 주입 함수
function appendDynamicQuickReplies(query) {
    const cleanQuery = query.toLowerCase();
    let showReplies = false;
    let buttonsHtml = '';

    // 특정 키워드 출현에 맞춰 동적 퀵 링크 생성
    if (cleanQuery.includes('소개') || cleanQuery.includes('연구실') || cleanQuery.includes('mscsl')) {
        buttonsHtml = `
            <button class="quick-reply-btn" data-payload="박종선 교수님 소개"><i data-lucide="user"></i> 박종선 교수님</button>
            <button class="quick-reply-btn" data-payload="당뇨병 연구 소개"><i data-lucide="droplet"></i> 당뇨병 연구</button>
            <button class="quick-reply-btn" data-payload="암에너지 대사 연구 소개"><i data-lucide="activity"></i> 암에너지 대사</button>
            <button class="quick-reply-btn" data-payload="근감소증 연구 소개"><i data-lucide="dumbbell"></i> 근감소증 연구</button>
        `;
        showReplies = true;
    } else if (cleanQuery.includes('당뇨') || cleanQuery.includes('인슐린') || cleanQuery.includes('letm1') || cleanQuery.includes('ctmp')) {
        buttonsHtml = `
            <button class="quick-reply-btn" data-payload="암에너지 대사 연구 소개"><i data-lucide="activity"></i> 암에너지 대사</button>
            <button class="quick-reply-btn" data-payload="주요 논문 알려줘"><i data-lucide="book-open"></i> 주요 논문</button>
        `;
        showReplies = true;
    } else if (cleanQuery.includes('암') || cleanQuery.includes('phf20') || cleanQuery.includes('종양')) {
        buttonsHtml = `
            <button class="quick-reply-btn" data-payload="미토스테라퓨틱스 소개"><i data-lucide="building-2"></i> 창업회사 소개</button>
            <button class="quick-reply-btn" data-payload="주요 논문 알려줘"><i data-lucide="book-open"></i> 주요 논문</button>
        `;
        showReplies = true;
    } else if (cleanQuery.includes('근감소') || cleanQuery.includes('근육')) {
        buttonsHtml = `
            <button class="quick-reply-btn" data-payload="미토스테라퓨틱스 소개"><i data-lucide="building-2"></i> 창업회사 소개</button>
            <button class="quick-reply-btn" data-payload="연구실 오시는 길"><i data-lucide="map-pin"></i> 위치 & 규칙</button>
        `;
        showReplies = true;
    } else if (cleanQuery.includes('논문') || cleanQuery.includes('publication') || cleanQuery.includes('성과')) {
        buttonsHtml = `
            <button class="quick-reply-btn" data-payload="미토스테라퓨틱스 소개"><i data-lucide="building-2"></i> 창업회사 소개</button>
            <button class="quick-reply-btn" data-payload="연구실 소개"><i data-lucide="home"></i> 연구실 소개 홈</button>
        `;
        showReplies = true;
    }

    if (showReplies) {
        const repliesContainer = document.createElement('div');
        repliesContainer.className = 'quick-replies-container dynamic';
        repliesContainer.innerHTML = buttonsHtml;
        
        // 마지막 메시지 그룹 하단에 붙이기
        const messageGroups = dom.chatMessages.querySelectorAll('.message-group.bot');
        if (messageGroups.length > 0) {
            const lastGroup = messageGroups[messageGroups.length - 1];
            const bubbleWrapper = lastGroup.querySelector('.message-bubble-wrapper');
            bubbleWrapper.appendChild(repliesContainer);
        }
    }
}

// 22. 애플리케이션 시작
window.addEventListener('DOMContentLoaded', init);

