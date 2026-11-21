/**
 * Editorial content for the Services, Approach, About and Home pages,
 * edited from the company brief.
 */

export type ServiceArea = {
  id: "training" | "advisory";
  title: string;
  shortTitle: string;
  summary: string;
  body: string[];
  itemsLabel: string;
  items: { title: string; description: string; programmes?: string[] }[];
};

export const serviceAreas: ServiceArea[] = [
  {
    id: "training",
    title: "Training & Capacity Development",
    shortTitle: "Training",
    summary:
      "Professional training and capacity development programmes that improve technical knowledge, managerial competence and operational effectiveness.",
    body: [
      "We offer a wide range of professional training and capacity development programmes designed to improve technical knowledge, managerial competence and operational effectiveness.",
      "Each programme is tailored to the expectations of participants and the strategic objectives of the client organisation.",
    ],
    itemsLabel: "What we provide",
    items: [
      {
        title: "Technical and industry-specific training",
        description:
          "Specialist programmes for the oil and gas, mining, downstream petroleum and energy sectors.",
        programmes: [
          "local-content-extractive-industries",
          "petroleum-economics",
          "downstream-oil-and-gas",
          "forecourt-management",
        ],
      },
      {
        title: "Professional and executive development",
        description:
          "Programmes that build the knowledge and judgement of experienced professionals and senior decision-makers.",
        programmes: ["corporate-strategic-planning", "cyber-security"],
      },
      {
        title: "Management and leadership training",
        description:
          "Practical development for managers, supervisors and emerging leaders.",
        programmes: ["leading-in-a-dynamic-environment"],
      },
      {
        title: "Corporate governance and institutional development",
        description:
          "Training for boards, directors and executives in private companies, public institutions and state-owned enterprises.",
        programmes: ["corporate-governance"],
      },
      {
        title: "Operational and financial management training",
        description:
          "Programmes that strengthen day-to-day control of cash, purchasing and operations.",
        programmes: ["cash-management", "procurement-in-a-dynamic-environment"],
      },
      {
        title: "Bespoke corporate training and in-house workshops",
        description:
          "Programmes designed around your organisation’s objectives and delivered for your own teams.",
      },
      {
        title: "Short courses, seminars and professional development workshops",
        description:
          "Focused sessions for individuals and groups who need to build knowledge in a specific area.",
      },
    ],
  },
  {
    id: "advisory",
    title: "Corporate Advisory & Organisational Development",
    shortTitle: "Advisory",
    summary:
      "Support for organisations strengthening their institutional structures, improving management systems and developing strategies for sustainable growth.",
    body: [
      "We support organisations in strengthening their institutional structures, improving management systems and developing strategies for sustainable growth.",
      "Advisory work starts from the same place as our training: a clear understanding of your objectives and of the capacity gaps that stand in their way.",
    ],
    itemsLabel: "Our advisory services",
    items: [
      {
        title: "Corporate strategic planning",
        description:
          "Developing new corporate strategic plans and reviewing existing ones.",
        programmes: ["corporate-strategic-planning"],
      },
      {
        title: "Organisational capacity assessments",
        description:
          "Identifying the capacity gaps that affect how an organisation performs.",
      },
      {
        title: "Institutional performance improvement",
        description:
          "Helping institutions strengthen their structures and improve results.",
      },
      {
        title: "Corporate governance advisory",
        description:
          "Advice on governance structures, roles and practices for boards and management.",
        programmes: ["corporate-governance"],
      },
      {
        title: "Operational policies and procedures",
        description:
          "Developing the policies and procedures that guide day-to-day operations.",
      },
      {
        title: "Performance management and business process improvement",
        description:
          "Improving how performance is managed and how work flows through the organisation.",
      },
    ],
  },
];

export const approachStages = [
  {
    title: "Needs Assessment",
    summary:
      "We engage clients to understand their organisational objectives, identify capacity gaps and determine the specific learning needs of participants.",
    benefit:
      "You start with a shared, explicit picture of what the training needs to address, so effort goes where it matters.",
  },
  {
    title: "Customised Programme Design",
    summary:
      "We develop training content and learning materials that respond to the needs and expectations of participants.",
    benefit:
      "Participants work with content and examples that relate to their own roles and sector.",
  },
  {
    title: "Expert Facilitation",
    summary:
      "Our programmes are delivered by competent facilitators and industry practitioners with relevant professional and practical experience.",
    benefit:
      "Discussion is grounded in how the work is actually done, not only in theory.",
  },
  {
    title: "Practical Learning",
    summary:
      "We incorporate case studies, group discussions, practical exercises, simulations and industry examples to enhance learning.",
    benefit:
      "Participants practise applying what they learn before they return to the workplace.",
  },
  {
    title: "Assessment and Evaluation",
    summary:
      "We assess participants’ understanding and evaluate the effectiveness of our training programmes.",
    benefit:
      "You can see how well the learning has landed, and we can see what to improve.",
  },
  {
    title: "Post-Training Support",
    qualifier: "Where required",
    summary:
      "Where required, we provide follow-up support and recommendations to facilitate the application of acquired knowledge and skills in the workplace.",
    benefit:
      "Teams have guidance as they begin putting new knowledge and skills to use.",
  },
] as const;

export const learningMethods = [
  "Case studies",
  "Group discussions",
  "Practical exercises",
  "Simulations",
  "Relevant industry examples",
] as const;

export const reasons = [
  {
    title: "Tailored training solutions",
    description:
      "Our programmes are designed around the specific needs of clients and participants.",
  },
  {
    title: "Industry-relevant content",
    description:
      "We focus on practical knowledge and current industry requirements.",
  },
  {
    title: "Experienced facilitators",
    description:
      "We draw on relevant professional and industry expertise in delivering our programmes.",
  },
  {
    title: "Practical and interactive learning",
    description:
      "We promote active participation and the application of knowledge.",
  },
  {
    title: "Flexible delivery options",
    description:
      "We offer training arrangements suited to client requirements, including in-house and customised programmes.",
  },
  {
    title: "A focus on workplace application",
    description:
      "We concentrate on improving individual competence and organisational performance.",
  },
] as const;

/** Intended markets from the brief. These are not a list of existing clients. */
export const targetMarkets = [
  "Oil and gas companies",
  "Mining companies and their service providers",
  "Government ministries, departments and agencies",
  "Regulatory institutions",
  "Oil marketing companies and petroleum retailers",
  "Public and private sector organisations",
  "Financial institutions",
  "Small and medium-sized enterprises",
  "Corporate executives and management professionals",
  "Individual professionals seeking career development",
] as const;

export const values = [
  {
    title: "Professionalism",
    description:
      "Maintaining high standards of quality, integrity and service delivery.",
  },
  {
    title: "Excellence",
    description:
      "Striving for outstanding results in all our training and consultancy engagements.",
  },
  {
    title: "Innovation",
    description:
      "Adopting contemporary approaches to learning, development and organisational improvement.",
  },
  {
    title: "Integrity",
    description:
      "Conducting our business with honesty, transparency and accountability.",
  },
  {
    title: "Client Focus",
    description:
      "Designing solutions that respond to the specific needs and expectations of our clients.",
  },
  {
    title: "Continuous Improvement",
    description: "Promoting lifelong learning and professional development.",
  },
] as const;

export const vision =
  "To become a leading provider of professional training, capacity development and corporate advisory services in Ghana and across Africa.";

export const mission =
  "To deliver innovative, practical and demand-driven training and capacity development solutions that enhance individual competence, strengthen institutional capabilities and promote organisational excellence.";

export const commitment =
  "To build the capacity of individuals and organisations through relevant, practical and high-quality professional development programmes.";

/** Programmes shown on the home page: industry depth plus management capability. */
export const featuredProgrammeSlugs = [
  "local-content-extractive-industries",
  "petroleum-economics",
  "corporate-governance",
  "corporate-strategic-planning",
  "cyber-security",
] as const;
