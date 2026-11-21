/**
 * The programme catalogue. This is the single source for programme cards,
 * programme pages, catalogue search, related links and the enquiry form.
 *
 * Content is edited from the company brief. Do not add dates, durations, fees,
 * delivery formats, certification or accreditation claims here unless the
 * company has confirmed them.
 */

export const categories = [
  {
    id: "energy-extractives",
    label: "Energy & Extractive Industries",
    short: "Energy & Extractives",
  },
  {
    id: "governance-leadership",
    label: "Governance, Strategy & Leadership",
    short: "Governance & Leadership",
  },
  {
    id: "finance-operations",
    label: "Finance, Procurement & Operations",
    short: "Finance & Operations",
  },
  {
    id: "cyber-technology",
    label: "Cyber Security & Technology",
    short: "Cyber & Technology",
  },
] as const;

export type CategoryId = (typeof categories)[number]["id"];

export type ProgrammeDetail = {
  title: string;
  body?: string;
  items?: string[];
  note?: string;
};

export type Programme = {
  slug: string;
  title: string;
  category: CategoryId;
  /** One or two sentences for cards and search results. */
  summary: string;
  /** Lead paragraph on the programme page. */
  intro: string;
  overview: string[];
  outcomes: string[];
  topics: string[];
  /** Optional thematic grouping of `topics` for long syllabuses. */
  topicGroups?: { title: string; items: string[] }[];
  audiences: string[];
  /** Secondary detail, shown in accordions. */
  details?: ProgrammeDetail[];
  /** Extra search terms that do not appear in the visible copy. */
  keywords: string[];
  related: string[];
};

const leadershipTopicGroups = [
  {
    title: "Understanding the dynamic environment",
    items: [
      "Characteristics of a dynamic environment",
      "Managing uncertainty, complexity and disruption",
      "Understanding internal and external business drivers",
      "Environmental scanning and anticipating change",
    ],
  },
  {
    title: "Adaptive and transformational leadership",
    items: [
      "Traditional versus adaptive leadership",
      "Transformational leadership principles",
      "Emotional intelligence and self-awareness",
      "Flexibility in leadership styles",
      "Leading diverse and multigenerational teams",
    ],
  },
  {
    title: "Leading change and innovation",
    items: [
      "Organisational change management",
      "Overcoming resistance to change",
      "Creating a culture of innovation",
      "Digital transformation and leadership",
      "Continuous improvement",
    ],
  },
  {
    title: "Building high-performing teams",
    items: [
      "Building trust and psychological safety",
      "Employee motivation and engagement",
      "Delegation and accountability",
      "Coaching and mentoring",
      "Developing a performance-driven culture",
    ],
  },
];

export const programmes: Programme[] = [
  {
    slug: "local-content-extractive-industries",
    title: "Local Content in the Extractive Industries (Oil and Gas & Mining)",
    category: "energy-extractives",
    summary:
      "Local content policy, regulation and implementation in Ghana’s petroleum and mining sectors, from indigenous participation to monitoring and compliance.",
    intro:
      "An introduction to local content policies, regulatory frameworks and implementation strategies in the oil and gas and mining industries.",
    overview: [
      "This programme gives participants a working understanding of local content policies, regulatory frameworks and implementation strategies within the oil and gas and mining industries.",
      "It examines the role of local content in promoting indigenous participation, developing local capabilities, creating employment opportunities and strengthening the contribution of the extractive industries to national economic development.",
    ],
    outcomes: [
      "Explain what local content and local participation mean, and why they matter to national economic development.",
      "Describe the policies, laws and regulatory frameworks that govern local content in the extractive industries.",
      "Identify the local content requirements that apply in Ghana’s upstream petroleum industry and in the mining sector.",
      "Recognise how local procurement, supplier development and indigenous enterprise development are put into practice.",
      "Relate employment, training, succession planning and technology transfer to local content obligations.",
      "Outline how local content is monitored and reported, and what compliance involves.",
    ],
    topics: [
      "Introduction to local content and local participation",
      "Local content policies, laws and regulatory frameworks",
      "Local content requirements in Ghana’s upstream petroleum industry",
      "Local content requirements in the mining sector",
      "Ghanaian content and indigenous enterprise development",
      "Local procurement and supplier development",
      "Employment, training and succession planning",
      "Technology transfer and skills development",
      "Local content monitoring, reporting and compliance",
      "Strategies for maximising local participation in extractive industries",
    ],
    audiences: [
      "Oil and gas professionals",
      "Mining companies",
      "Regulatory institutions",
      "Indigenous businesses",
      "Procurement officers",
      "Human resource practitioners",
      "Consultants",
      "Policy professionals",
    ],
    keywords: ["petroleum", "upstream", "regulation", "suppliers", "HR", "policy"],
    related: [
      "petroleum-economics",
      "downstream-oil-and-gas",
      "procurement-in-a-dynamic-environment",
    ],
  },
  {
    slug: "petroleum-economics",
    title: "Petroleum Economics",
    category: "energy-extractives",
    summary:
      "The economic and commercial dimensions of petroleum exploration, development, production and investment, including fiscal regimes and project evaluation.",
    intro:
      "The fundamental knowledge and analytical skills needed to understand the economic and commercial dimensions of the petroleum industry.",
    overview: [
      "This course equips participants with the fundamental knowledge and analytical skills required to understand the economic and commercial dimensions of the petroleum industry.",
      "It examines the economic principles that underpin petroleum exploration, development, production and investment decisions, with emphasis on project economics and the fiscal relationship between governments and petroleum companies.",
    ],
    outcomes: [
      "Describe the petroleum value chain and the costs involved in exploration and development.",
      "Explain how reserves and production forecasts inform economic analysis.",
      "Explain how oil and gas prices are formed.",
      "Compare petroleum fiscal regimes, including Production Sharing Agreements and concessionary arrangements.",
      "Explain how royalties, taxes and petroleum revenue determine government take and contractor profitability.",
      "Follow a cash flow model and the economic analysis used to evaluate a petroleum project.",
      "Apply risk assessment and sensitivity analysis to investment decisions.",
    ],
    topics: [
      "Fundamentals of petroleum economics",
      "Overview of the petroleum value chain",
      "Petroleum exploration and development costs",
      "Petroleum reserves and production forecasting",
      "Oil and gas pricing mechanisms",
      "Petroleum fiscal regimes",
      "Royalties, taxes and petroleum revenue",
      "Production Sharing Agreements and concessionary arrangements",
      "Petroleum project evaluation and investment decisions",
      "Cash flow modelling and economic analysis",
      "Government take and contractor profitability",
      "Risk assessment and sensitivity analysis",
    ],
    audiences: [
      "Petroleum engineers",
      "Economists",
      "Accountants and finance professionals",
      "Government officials",
      "Energy consultants",
      "Investors",
      "Other oil and gas industry practitioners",
    ],
    keywords: ["oil", "gas", "upstream", "PSA", "investment", "finance", "energy"],
    related: [
      "local-content-extractive-industries",
      "downstream-oil-and-gas",
      "cash-management",
    ],
  },
  {
    slug: "downstream-oil-and-gas",
    title: "Downstream Oil and Gas Courses",
    category: "energy-extractives",
    summary:
      "Practical knowledge of how petroleum products are transported, stored, distributed, marketed and sold, and of the regulatory environment that governs the sector.",
    intro:
      "Practical knowledge of the operations, management, commercial activities and regulatory environment of the petroleum downstream sector.",
    overview: [
      "Our downstream oil and gas training programmes give participants practical knowledge of the operations, management, commercial activities and regulatory environment of the petroleum downstream sector.",
      "The programmes cover the activities involved in the transportation, storage, distribution, marketing and sale of petroleum products.",
    ],
    outcomes: [
      "Describe the structure of the downstream petroleum industry and how products move from supply to sale.",
      "Explain petroleum product pricing and the market dynamics that influence it.",
      "Describe how oil marketing companies, bulk distribution and storage operations work.",
      "Recognise the quality assurance, regulatory and compliance requirements that apply to petroleum products.",
      "Apply health, safety and environmental management principles to downstream operations.",
      "Identify operational risks and ways to improve customer service and efficiency.",
    ],
    topics: [
      "Overview of the downstream petroleum industry",
      "Petroleum product supply and distribution",
      "Petroleum product pricing and market dynamics",
      "Oil marketing company operations",
      "Bulk distribution and storage operations",
      "Petroleum product quality assurance",
      "Regulatory and compliance requirements",
      "Health, safety and environmental management",
      "Petroleum retail marketing and distribution",
      "Risk management in downstream operations",
      "Customer service and operational efficiency",
    ],
    audiences: [
      "Oil marketing companies",
      "Bulk distribution companies",
      "Petroleum retailers",
      "Regulators",
      "Depot operators",
      "Entrepreneurs",
      "Industry professionals",
    ],
    keywords: ["OMC", "BDC", "fuel", "depot", "storage", "HSE", "retail", "energy"],
    related: [
      "forecourt-management",
      "petroleum-economics",
      "local-content-extractive-industries",
    ],
  },
  {
    slug: "forecourt-management",
    title: "Forecourt Management",
    category: "energy-extractives",
    summary:
      "Running a petroleum retail outlet safely, efficiently and profitably: station supervision, stock and cash reconciliation, customer service and emergency response.",
    intro:
      "The operational, managerial and customer service skills required for efficient, safe and profitable forecourt operations.",
    overview: [
      "This programme focuses on the effective management of petroleum retail outlets and service stations.",
      "It provides participants with the operational, managerial and customer service skills required to ensure efficient, safe and profitable forecourt operations.",
    ],
    outcomes: [
      "Organise and supervise daily station operations.",
      "Manage and reconcile fuel stock, and oversee pump and dispenser operations.",
      "Handle cash and reconcile sales accurately.",
      "Apply fraud prevention measures and internal controls.",
      "Meet health, safety and environmental requirements, and respond to incidents and emergencies.",
      "Supervise staff, manage performance and maintain good customer relationships.",
      "Control costs and improve the profitability of a retail outlet.",
    ],
    topics: [
      "Principles of forecourt management",
      "Daily station operations and supervision",
      "Fuel stock management and reconciliation",
      "Pump operations and dispenser management",
      "Cash handling and sales reconciliation",
      "Customer service and relationship management",
      "Health, safety and environmental compliance",
      "Fraud prevention and internal controls",
      "Staff supervision and performance management",
      "Retail outlet profitability and cost control",
      "Incident management and emergency response",
    ],
    audiences: [
      "Filling station managers",
      "Supervisors",
      "Forecourt attendants",
      "Oil marketing companies",
      "Station owners",
      "Prospective petroleum retail entrepreneurs",
    ],
    keywords: [
      "service station",
      "fuel station",
      "petrol station",
      "retail",
      "OMC",
      "safety",
      "petroleum",
    ],
    related: ["downstream-oil-and-gas", "cash-management", "petroleum-economics"],
  },
  {
    slug: "cash-management",
    title: "Cash Management",
    category: "finance-operations",
    summary:
      "Planning, handling, monitoring and reconciling cash to strengthen internal financial controls and improve organisational liquidity.",
    intro:
      "The knowledge and practical skills required to manage cash resources effectively, strengthen internal financial controls and improve liquidity.",
    overview: [
      "This course equips participants with the knowledge and practical skills required to manage cash resources effectively, strengthen internal financial controls and improve organisational liquidity.",
      "The programme focuses on cash planning, cash handling, monitoring, reconciliation and accountability.",
    ],
    outcomes: [
      "Prepare cash flow forecasts and budgets.",
      "Apply sound procedures and controls for handling, collecting and disbursing cash.",
      "Carry out bank reconciliations and cash verification.",
      "Manage petty cash properly.",
      "Identify fraud risks and strengthen internal controls and financial accountability.",
      "Manage working capital and report on cash to support better liquidity and financial efficiency.",
    ],
    topics: [
      "Fundamentals of cash management",
      "Cash flow forecasting and budgeting",
      "Cash handling procedures and controls",
      "Cash collection and disbursement",
      "Bank reconciliation and cash verification",
      "Petty cash management",
      "Fraud prevention and risk management",
      "Internal controls and financial accountability",
      "Working capital management",
      "Cash management reporting",
      "Improving liquidity and financial efficiency",
    ],
    audiences: [
      "Finance officers",
      "Accountants",
      "Cashiers",
      "Business owners",
      "Retail managers",
      "Station managers",
      "Internal auditors",
      "Administrative professionals",
    ],
    keywords: ["finance", "treasury", "accounting", "audit", "SME", "liquidity"],
    related: [
      "forecourt-management",
      "procurement-in-a-dynamic-environment",
      "corporate-governance",
    ],
  },
  {
    slug: "corporate-governance",
    title: "Corporate Governance",
    category: "governance-leadership",
    summary:
      "The principles, structures and practices behind effective leadership, accountability, transparency and responsible corporate management.",
    intro:
      "The principles, structures and practices required to promote effective leadership, accountability, transparency and responsible corporate management.",
    overview: [
      "Our corporate governance programme gives participants an understanding of the principles, structures and practices required to promote effective leadership, accountability, transparency and responsible corporate management.",
      "The course examines the roles and responsibilities of boards, management and other stakeholders in ensuring sound corporate governance and sustainable organisational performance.",
    ],
    outcomes: [
      "Explain the principles and foundations of corporate governance.",
      "Describe the roles and responsibilities of the Board of Directors and the duties of individual directors.",
      "Assess board composition, structure and effectiveness.",
      "Relate risk management, internal controls, ethics and integrity to accountable, transparent management.",
      "Recognise regulatory compliance and corporate reporting obligations.",
      "Plan constructive stakeholder engagement.",
      "Apply governance frameworks and good practice, including in public institutions and state-owned enterprises.",
    ],
    topics: [
      "Principles and foundations of corporate governance",
      "Roles and responsibilities of the Board of Directors",
      "Board composition, structure and effectiveness",
      "Duties and responsibilities of directors",
      "Corporate accountability and transparency",
      "Risk management and internal controls",
      "Ethics, integrity and corporate responsibility",
      "Regulatory compliance and corporate reporting",
      "Stakeholder engagement",
      "Corporate governance in public institutions and state-owned enterprises",
      "Governance frameworks and best practices",
    ],
    audiences: [
      "Board members",
      "Directors",
      "Chief executives",
      "Senior managers",
      "Company secretaries",
      "Governance professionals",
      "Public sector executives",
      "Business owners",
    ],
    keywords: ["board", "SOE", "public sector", "compliance", "ethics", "leadership"],
    related: [
      "corporate-strategic-planning",
      "leading-in-a-dynamic-environment",
      "cyber-security",
    ],
  },
  {
    slug: "corporate-strategic-planning",
    title: "Corporate Strategic Planning",
    category: "governance-leadership",
    summary:
      "Developing, implementing, monitoring and evaluating corporate strategic plans, from vision and situational analysis to KPIs and performance reporting.",
    intro:
      "The knowledge and practical skills required to develop, implement, monitor and evaluate effective corporate strategic plans.",
    overview: [
      "This programme equips participants with the knowledge and practical skills required to develop, implement, monitor and evaluate effective corporate strategic plans.",
      "It provides a structured understanding of the strategic planning process and of how organisations can translate their vision and mission into measurable objectives, strategic initiatives and performance targets.",
    ],
    outcomes: [
      "Clarify an organisation’s vision, mission and values as the basis for its strategy.",
      "Carry out environmental scanning and situational analysis using SWOT and PESTLE.",
      "Analyse stakeholders and plan how to engage them.",
      "Formulate strategic goals, objectives and initiatives, and develop a corporate strategic plan.",
      "Translate the plan into departmental work programmes, KPIs and performance targets.",
      "Plan implementation and resource allocation, and assess and mitigate risks.",
      "Monitor, evaluate and report on corporate performance.",
    ],
    topics: [
      "Introduction to strategic management and corporate planning",
      "Understanding organisational vision, mission and values",
      "Environmental scanning and situational analysis",
      "SWOT and PESTLE analysis",
      "Stakeholder analysis and engagement",
      "Development of strategic goals and objectives",
      "Formulation of strategies and strategic initiatives",
      "Development of corporate strategic plans",
      "Development of departmental work programmes",
      "Key Performance Indicators (KPIs) and performance targets",
      "Strategic plan implementation and resource allocation",
      "Monitoring, evaluation and performance reporting",
      "Risk assessment and mitigation",
      "Corporate performance management and reporting",
    ],
    audiences: [
      "Board members",
      "Chief executives",
      "Corporate planners",
      "Strategy managers",
      "Heads of departments",
      "Monitoring and evaluation professionals",
      "Public sector managers",
      "Business executives",
    ],
    keywords: ["strategy", "M&E", "planning", "public sector", "performance"],
    related: [
      "corporate-governance",
      "leading-in-a-dynamic-environment",
      "procurement-in-a-dynamic-environment",
    ],
  },
  {
    slug: "cyber-security",
    title: "Cyber Security",
    category: "cyber-technology",
    summary:
      "A practical, foundation-to-intermediate course in cyber security risk assessment and reporting: assets, threats, scoring, controls, treatment decisions and executive reporting.",
    intro:
      "A structured method for assessing cyber security risk, and the practical outputs needed to report it to leadership.",
    overview: [
      "Organisations need to demonstrate more than the presence of firewalls, identity controls, policies and vulnerability scanners. They need to show which assets support critical services, how threats could exploit weaknesses, which consequences matter most, and why selected treatments receive funding.",
      "A defensible cyber security risk assessment identifies assets and owners, establishes risk criteria, analyses likelihood and impact, evaluates existing controls and documents treatment decisions. Working with ISO 31000, NIST SP 800-30 and the NIST Cybersecurity Framework 2.0, participants practise five capabilities: asset and dependency mapping, threat and vulnerability analysis, likelihood and impact scoring, control effectiveness evaluation, and risk acceptance documentation.",
      "The resulting evidence supports risk registers, audit trails, security roadmaps and leadership reporting. The course suits foundation-to-intermediate learners who need a structured risk assessment method and practical reporting outputs.",
    ],
    outcomes: [
      "Assess information assets and threats using ISO 31000.",
      "Apply CVSS evidence within business-focused cyber security risk analysis.",
      "Build a cyber security risk register with owners, ratings and treatment status.",
      "Design control mappings using CIS Controls v8 and ISO/IEC 27001:2022.",
      "Evaluate residual risk through control testing evidence and risk acceptance criteria.",
      "Navigate supplier cyber risk using due diligence and contract evidence mapping.",
      "Configure spreadsheet risk scoring and Power BI-ready cyber risk dashboards.",
      "Synthesise assessment findings into executive reports, roadmaps and action plans.",
    ],
    topics: [
      "Asset and dependency mapping",
      "Asset ownership and risk criteria",
      "Threat and vulnerability analysis",
      "Likelihood and impact scoring",
      "Control effectiveness evaluation",
      "Risk treatment decisions",
      "Risk acceptance documentation",
      "Residual risk and control testing evidence",
      "Supplier and third-party cyber risk",
      "Cyber security risk registers",
      "Executive cyber risk reporting, roadmaps and action plans",
    ],
    audiences: [
      "IT support professionals",
      "Network administrators",
      "Junior security analysts and risk analysts",
      "Governance, risk and compliance (GRC) staff",
      "Internal auditors",
      "Technology managers and project managers",
      "Security leaders",
      "Computer science students and others with foundational cyber security knowledge",
    ],
    details: [
      {
        title: "Frameworks and standards referenced in the curriculum",
        items: [
          "ISO 31000",
          "NIST SP 800-30",
          "NIST Cybersecurity Framework (CSF) 2.0",
          "ISO/IEC 27001:2022",
          "CIS Controls v8",
          "Common Vulnerability Scoring System (CVSS)",
        ],
        note: "These publications are used as curriculum reference material. The course is not accredited, endorsed or certified by the organisations that publish them.",
      },
      {
        title: "Practical outputs",
        body: "Participants work towards outputs they can adapt for their own organisation:",
        items: [
          "A cyber security risk register with owners, ratings and treatment status",
          "Spreadsheet-based risk scoring",
          "Power BI-ready cyber risk dashboards",
          "Executive reports, roadmaps and action plans",
        ],
      },
      {
        title: "Roles the course is designed to support",
        items: [
          "Cyber security risk analysts maintaining threat, vulnerability and risk registers",
          "IT risk managers prioritising treatment plans across technology portfolios",
          "Information security officers evaluating control effectiveness and residual risk",
          "Security operations analysts linking alerts and vulnerabilities to business assets",
          "GRC analysts mapping security evidence to ISO/IEC 27001:2022 controls",
          "Internal auditors reviewing cyber risk governance and remediation evidence",
          "Cloud security analysts assessing shared-responsibility and configuration risks",
          "Third-party risk managers evaluating supplier security dependencies",
          "Technology project managers identifying cyber risks in digital initiatives",
          "CISOs and security leaders preparing executive cyber risk reporting",
        ],
      },
    ],
    keywords: [
      "cybersecurity",
      "information security",
      "IT",
      "risk assessment",
      "NIST",
      "ISO 27001",
      "CISO",
      "audit",
      "technology",
    ],
    related: [
      "corporate-governance",
      "procurement-in-a-dynamic-environment",
      "leading-in-a-dynamic-environment",
    ],
  },
  {
    slug: "leading-in-a-dynamic-environment",
    title: "Leading in a Dynamic Environment",
    category: "governance-leadership",
    summary:
      "Adaptive leadership for uncertainty, technological change and shifting stakeholder needs: decisions under pressure, leading change and building resilient teams.",
    intro:
      "The knowledge, skills and behaviours required to lead effectively in a dynamic and constantly changing environment.",
    overview: [
      "Today’s business environment is characterised by rapid technological advancement, changing customer expectations, economic uncertainty, global competition and evolving workforce demands.",
      "Leaders must therefore move beyond traditional management approaches and develop the ability to anticipate change, make timely decisions, inspire teams and deliver results despite uncertainty. This programme equips leaders with the knowledge, skills and behaviours to do so.",
    ],
    outcomes: [
      "Understand the characteristics and challenges of a dynamic operating environment.",
      "Demonstrate adaptive and transformational leadership.",
      "Make effective decisions under pressure and uncertainty.",
      "Lead organisational change and overcome resistance.",
      "Communicate effectively during periods of uncertainty.",
      "Build resilient, innovative and high-performing teams.",
      "Manage conflict and competing stakeholder expectations.",
      "Develop strategic thinking and forward-looking leadership capabilities.",
    ],
    topics: leadershipTopicGroups.flatMap((group) => group.items),
    topicGroups: leadershipTopicGroups,
    audiences: [
      "Managers",
      "Supervisors",
      "Team leaders",
      "Emerging leaders",
      "Senior management",
    ],
    details: [
      {
        title: "Learning methods",
        body: "The programme is taught through interactive presentations, group discussions, case studies, simulations, role-playing and practical exercises.",
      },
      {
        title: "Practical activity",
        body: "Participants carry out a SWOT and PESTLE analysis of their own organisations.",
      },
    ],
    keywords: [
      "leadership",
      "management",
      "change management",
      "decision-making",
      "communication",
      "conflict",
      "strategic thinking",
      "resilience",
    ],
    related: [
      "corporate-strategic-planning",
      "corporate-governance",
      "procurement-in-a-dynamic-environment",
    ],
  },
  {
    slug: "procurement-in-a-dynamic-environment",
    title: "Procurement in a Dynamic Environment",
    category: "finance-operations",
    summary:
      "Strategic, risk-responsive procurement: the procurement cycle, sourcing and supplier management, technology, ethics, supply disruption and performance measurement.",
    intro:
      "Moving beyond traditional purchasing towards strategic, flexible, innovative and risk-responsive procurement management.",
    overview: [
      "Procurement is the organisational function responsible for acquiring goods, works and services of the right quality and quantity, at the right price and time, and from the right source.",
      "Today, procurement is increasingly affected by globalisation, technological advancement, economic uncertainty, changing customer expectations, regulatory requirements, supplier disruptions and environmental concerns. A dynamic procurement environment requires organisations to move beyond traditional purchasing practices towards strategic, flexible, innovative and risk-responsive procurement management.",
    ],
    outcomes: [
      "Explain the concept and importance of procurement in a dynamic environment.",
      "Identify the factors influencing modern procurement practices.",
      "Understand the procurement cycle and strategic sourcing.",
      "Apply effective supplier selection and relationship management techniques.",
      "Identify, assess and mitigate procurement risks.",
      "Understand the role of technology and digital transformation in procurement.",
      "Apply ethical, transparent and sustainable procurement principles.",
      "Develop strategies for managing supply chain disruptions.",
      "Evaluate procurement performance using appropriate indicators.",
      "Make informed procurement decisions that deliver value for money.",
    ],
    topics: [
      "Understanding procurement in a dynamic environment",
      "The strategic procurement process",
      "Strategic sourcing and supplier management",
      "Procurement risk management",
      "Technology and digital transformation in procurement",
      "Ethical, sustainable and compliant procurement",
      "Managing change and supply chain disruptions",
      "Procurement performance measurement",
      "Procurement challenges in a dynamic environment",
    ],
    audiences: [
      "Procurement managers",
      "Supply chain officers",
      "Managers",
      "Organisational leaders",
    ],
    keywords: [
      "purchasing",
      "supply chain",
      "suppliers",
      "sourcing",
      "value for money",
      "compliance",
    ],
    related: [
      "cash-management",
      "local-content-extractive-industries",
      "corporate-strategic-planning",
    ],
  },
];

export function getProgramme(slug: string): Programme | undefined {
  return programmes.find((programme) => programme.slug === slug);
}

export function getCategory(id: CategoryId) {
  return categories.find((category) => category.id === id)!;
}

export function isCategoryId(value: string | null | undefined): value is CategoryId {
  return categories.some((category) => category.id === value);
}

export function getRelatedProgrammes(programme: Programme): Programme[] {
  return programme.related
    .map((slug) => getProgramme(slug))
    .filter((related): related is Programme => Boolean(related));
}

export function programmeHref(slug: string): string {
  return `/training-programmes/${slug}`;
}
