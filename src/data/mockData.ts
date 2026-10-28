import { Complaint, OverlapMatch, Institution, StatutoryAlert, OfficerUser, CoordinationGroup } from '../types';

export const MOCK_INSTITUTIONS: Institution[] = [
  {
    id: 'AICTE-DEMO-1024',
    code: 'NVIT-DELHI',
    name: 'North Valley Institute of Technology',
    type: 'Autonomous Institute',
    region: 'Northern',
    state: 'Delhi NCR',
    city: 'New Delhi',
    establishedYear: 2004,
    approvalStatus: 'UNDER_SCRUTINY',
    headOfInstitution: 'Dr. Virendra Saxena (Director)',
    activeComplaintsCount: 7,
    criticalComplaintsCount: 3,
    crossBureauOverlapCount: 2,
    recidivismRiskIndex: 'CRITICAL',
    accreditationGrade: 'NAAC A (Expired)',
    facultyCount: 184,
    studentEnrollment: 3420,
    complianceScore: 61.4,
    dockets: ['PGRC-2026-0102', 'RB-2026-0087', 'PGRC-2026-0099', 'AB-2026-0045'],
    contactEmail: 'director@northvalley.edu.in',
    contactPhone: '+91 11 2689 4401',
    address: 'Sector 14, Institutional Area, Phase-II, New Delhi, Delhi 110070',
  },
  {
    id: 'AICTE-DEMO-2048',
    code: 'ACET-PUNE',
    name: 'Apex College of Engineering & Technology',
    type: 'Affiliated College',
    region: 'Western',
    state: 'Maharashtra',
    city: 'Pune',
    establishedYear: 2011,
    approvalStatus: 'PROVISIONAL',
    headOfInstitution: 'Dr. Sunita Kulkarni',
    activeComplaintsCount: 4,
    criticalComplaintsCount: 1,
    crossBureauOverlapCount: 1,
    recidivismRiskIndex: 'HIGH',
    accreditationGrade: 'NBA Tier-II Accredited',
    facultyCount: 122,
    studentEnrollment: 2150,
    complianceScore: 78.2,
    dockets: ['RB-2026-0091', 'PAPC-2026-0019'],
    contactEmail: 'principal@apextech.ac.in',
    contactPhone: '+91 20 2567 8900',
    address: 'Hinjawadi Phase 3, Rajiv Gandhi Infotech Park, Pune, Maharashtra 411057',
  },
  {
    id: 'AICTE-DEMO-3091',
    code: 'CPT-CHENNAI',
    name: 'Central Polytechnic Institute',
    type: 'Polytechnic',
    region: 'Southern',
    state: 'Tamil Nadu',
    city: 'Chennai',
    establishedYear: 1996,
    approvalStatus: 'APPROVED',
    headOfInstitution: 'Prof. R. Ramanathan',
    activeComplaintsCount: 2,
    criticalComplaintsCount: 0,
    crossBureauOverlapCount: 0,
    recidivismRiskIndex: 'LOW',
    accreditationGrade: 'State Board Grade A+',
    facultyCount: 94,
    studentEnrollment: 1850,
    complianceScore: 94.6,
    dockets: ['PGRC-2026-0081'],
    contactEmail: 'office@centralpolytechnic.edu.in',
    contactPhone: '+91 44 2254 1120',
    address: 'Tharamani Main Road, CIT Campus, Chennai, Tamil Nadu 600113',
  },
  {
    id: 'AICTE-DEMO-4102',
    code: 'ECU-KOLKATA',
    name: 'East Coast University of Applied Sciences',
    type: 'Deemed University',
    region: 'Eastern',
    state: 'West Bengal',
    city: 'Kolkata',
    establishedYear: 2008,
    approvalStatus: 'NOTICE_SERVED',
    headOfInstitution: 'Dr. B. C. Ganguly',
    activeComplaintsCount: 5,
    criticalComplaintsCount: 2,
    crossBureauOverlapCount: 1,
    recidivismRiskIndex: 'HIGH',
    accreditationGrade: 'NAAC B++',
    facultyCount: 210,
    studentEnrollment: 4100,
    complianceScore: 68.0,
    dockets: ['AB-2026-0038', 'PGRC-2026-0094'],
    contactEmail: 'registrar@eastcoast.edu.in',
    contactPhone: '+91 33 2357 8800',
    address: 'Action Area II, New Town, Kolkata, West Bengal 700156',
  },
  {
    id: 'AICTE-DEMO-5520',
    code: 'MIT-BHOPAL',
    name: 'Malwa Institute of Technology & Management',
    type: 'Affiliated College',
    region: 'Central',
    state: 'Madhya Pradesh',
    city: 'Bhopal',
    establishedYear: 2015,
    approvalStatus: 'APPROVED',
    headOfInstitution: 'Dr. Preeti Shrivastava',
    activeComplaintsCount: 1,
    criticalComplaintsCount: 0,
    crossBureauOverlapCount: 0,
    recidivismRiskIndex: 'LOW',
    accreditationGrade: 'NAAC A',
    facultyCount: 88,
    studentEnrollment: 1420,
    complianceScore: 89.3,
    dockets: ['PGRC-2026-0077'],
    contactEmail: 'contact@malwatech.ac.in',
    contactPhone: '+91 755 273 4410',
    address: 'Airport Road, Gandhinagar, Bhopal, Madhya Pradesh 462036',
  }
];

export const MOCK_COMPLAINTS: Complaint[] = [
  {
    id: 'PGRC-2026-0102',
    institutionId: 'AICTE-DEMO-1024',
    institutionName: 'North Valley Institute of Technology',
    category: '7th CPC Arrears Non-Disbursement & Mandatory Research Fund Diversion',
    bureau: 'PGRC',
    bureauName: 'Public Grievance Redressal Cell',
    dateFiled: '2026-01-14',
    lastUpdated: '2026-02-18',
    slaDaysRemaining: 4,
    slaBreachStatus: 'NEAR_BREACH',
    status: 'UNDER_INVESTIGATION',
    severity: 'CRITICAL',
    complainantType: 'Faculty Council',
    complainantName: 'Joint Action Committee of NVIT Faculty (142 Co-signatories)',
    assignedOfficer: 'Dr. Rajesh Sharma, IRS',
    officerRole: 'Chief Surveillance Officer & Joint Secretary',
    summary: 'Systemic withholding of 7th Pay Commission revised pay bands, statutory dearness allowances, and illegal clawback of PG research fellowship grants since July 2024.',
    allegationDetails: 'Faculty submitted verified bank statements showing 38% under-payment against statutory AICTE pay scales. College management diverted Rs. 4.82 Cr from government research endowment accounts into unapproved capital expenditure.',
    affectedParties: 184,
    financialImplication: '₹4,82,40,000 (~$580K USD)',
    hasActiveOverlap: true,
    linkedGroupId: '#GRP-2026-088',
    matchedDocketId: 'RB-2026-0087',
    overlapConfidence: 94.2,
    evidenceFiles: [
      { name: 'Pay_Slip_Ledger_2024_2025.pdf', size: '14.2 MB', type: 'application/pdf', hash: 'SHA256:7f4a...92b1', uploadDate: '2026-01-14' },
      { name: 'Audited_Bank_Disbursement_Reconciliation.xlsx', size: '3.8 MB', type: 'application/vnd.ms-excel', hash: 'SHA256:3d1e...a804', uploadDate: '2026-01-19' },
      { name: 'Faculty_Council_Resolution_Signed.pdf', size: '1.9 MB', type: 'application/pdf', hash: 'SHA256:9c02...e54a', uploadDate: '2026-01-22' }
    ],
    auditTrail: [
      { date: '2026-01-14 10:14 IST', author: 'System Ingestion', action: 'DOCKET_REGISTERED', detail: 'Received via National Grievance Portal API token #GRV-99214' },
      { date: '2026-01-16 14:30 IST', author: 'Dr. Rajesh Sharma, IRS', action: 'OFFICER_ASSIGNED', detail: 'Jurisdiction validated under Section 10(k) AICTE Act 1987' },
      { date: '2026-01-28 11:05 IST', author: 'AI Overlap Engine v4.2', action: 'OVERLAP_DETECTED', detail: 'Identified 94.2% semantic & entity convergence with Docket RB-2026-0087' },
      { date: '2026-02-04 16:45 IST', author: 'Dr. Rajesh Sharma, IRS', action: 'COORDINATION_INITIATED', detail: 'Joined Group #GRP-2026-088 with Regulatory Bureau' }
    ]
  },
  {
    id: 'RB-2026-0087',
    institutionId: 'AICTE-DEMO-1024',
    institutionName: 'North Valley Institute of Technology',
    category: 'Ghost Faculty Fraud & Unapproved Expansion of B.Tech CSE Seats',
    bureau: 'RB',
    bureauName: 'Regulatory Bureau',
    dateFiled: '2026-01-18',
    lastUpdated: '2026-02-19',
    slaDaysRemaining: 7,
    slaBreachStatus: 'NORMAL',
    status: 'CROSS_EXAMINATION',
    severity: 'CRITICAL',
    complainantType: 'Anonymous Whistleblower',
    complainantName: 'Confidential Internal Auditor',
    assignedOfficer: 'Smt. Ananya Sen, IAS',
    officerRole: 'Senior Regulatory Inspector',
    summary: 'Submission of falsified Aadhaar and PAN credentials of 34 non-existent doctoral faculties to satisfy mandatory 1:15 Cadre Ratio during annual AICTE Extension of Approval (EoA).',
    allegationDetails: 'Biometric audit revealed that 34 professors listed in the compliance report reside in different states and are simultaneously enrolled at other non-affiliated institutes. Unlawful intake surge of 120 seats.',
    affectedParties: 480,
    financialImplication: '₹6,40,00,000 (Illicit Capitation Pool)',
    hasActiveOverlap: true,
    linkedGroupId: '#GRP-2026-088',
    matchedDocketId: 'PGRC-2026-0102',
    overlapConfidence: 94.2,
    evidenceFiles: [
      { name: 'Biometric_Access_Log_Q3_Q4.csv', size: '22.1 MB', type: 'text/csv', hash: 'SHA256:1a8d...f602', uploadDate: '2026-01-18' },
      { name: 'Faculty_PAN_Aadhaar_Mismatch_Audit.pdf', size: '8.4 MB', type: 'application/pdf', hash: 'SHA256:5b99...32cc', uploadDate: '2026-01-20' },
      { name: 'EoA_Application_Discrepancy_Sheet.xlsx', size: '4.1 MB', type: 'application/vnd.ms-excel', hash: 'SHA256:88ee...917d', uploadDate: '2026-02-02' }
    ],
    auditTrail: [
      { date: '2026-01-18 16:40 IST', author: 'System Ingestion', action: 'DOCKET_REGISTERED', detail: 'Received through Statutory Vigilance Portal drop-box' },
      { date: '2026-01-21 09:15 IST', author: 'Smt. Ananya Sen, IAS', action: 'EVIDENCE_VERIFIED', detail: 'Cross-referenced faculty names against UIDAI registry' },
      { date: '2026-01-28 11:05 IST', author: 'AI Overlap Engine v4.2', action: 'OVERLAP_DETECTED', detail: 'Correlation match with PGRC-2026-0102 confirmed (Score: 94.2%)' }
    ]
  },
  {
    id: 'RB-2026-0091',
    institutionId: 'AICTE-DEMO-2048',
    institutionName: 'Apex College of Engineering & Technology',
    category: 'Deficient Fire Safety Certification & Inadequate Lab Infrastructure',
    bureau: 'RB',
    bureauName: 'Regulatory Bureau',
    dateFiled: '2026-01-26',
    lastUpdated: '2026-02-15',
    slaDaysRemaining: 12,
    slaBreachStatus: 'NORMAL',
    status: 'PRELIMINARY_REVIEW',
    severity: 'HIGH',
    complainantType: 'Student Union',
    complainantName: 'Engineering Students Welfare Association',
    assignedOfficer: 'Shri Vikramaditya Rao',
    officerRole: 'Technical Scrutiny Officer',
    summary: 'Operation of chemical and electrical engineering workshops in basement without mandatory municipal NOC or fire suppression equipment.',
    allegationDetails: 'On-site inspection report dated Jan 2026 highlighted expired extinguishers and absence of secondary fire escapes for 600 students.',
    affectedParties: 620,
    financialImplication: '₹85,00,000 (Required Retrofit)',
    hasActiveOverlap: true,
    matchedDocketId: 'PAPC-2026-0019',
    overlapConfidence: 81.5,
    evidenceFiles: [
      { name: 'Municipal_Inspection_Notice_Basement.pdf', size: '5.2 MB', type: 'application/pdf', hash: 'SHA256:44aa...bc11', uploadDate: '2026-01-26' }
    ],
    auditTrail: [
      { date: '2026-01-26 12:00 IST', author: 'System Ingestion', action: 'DOCKET_REGISTERED', detail: 'Registered via Western Regional Office' }
    ]
  },
  {
    id: 'PAPC-2026-0019',
    institutionId: 'AICTE-DEMO-2048',
    institutionName: 'Apex College of Engineering & Technology',
    category: 'Exorbitant Capitation Fee Charged for Management Quota Admissions',
    bureau: 'PAPC',
    bureauName: 'Policy & Academic Planning Bureau',
    dateFiled: '2026-01-29',
    lastUpdated: '2026-02-17',
    slaDaysRemaining: 15,
    slaBreachStatus: 'NORMAL',
    status: 'PRELIMINARY_REVIEW',
    severity: 'HIGH',
    complainantType: 'Research Scholar',
    complainantName: 'Parent Guardian Delegation (8 Families)',
    assignedOfficer: 'Dr. Meenakshi Sundaram',
    officerRole: 'Fee Regulation Ombudsman',
    summary: 'Charging ₹3.5 Lakhs per student over and above the Shikshan Shulka Samiti approved annual fee schedule under disguised laboratory building funds.',
    allegationDetails: 'Cash receipts and unverified donation slips provided by complaining parents confirm unauthorized fee levying.',
    affectedParties: 45,
    financialImplication: '₹1,57,50,000',
    hasActiveOverlap: true,
    matchedDocketId: 'RB-2026-0091',
    overlapConfidence: 81.5,
    evidenceFiles: [
      { name: 'Cash_Receipts_Fee_Extortion.pdf', size: '9.3 MB', type: 'application/pdf', hash: 'SHA256:99ab...fe21', uploadDate: '2026-01-29' }
    ],
    auditTrail: [
      { date: '2026-01-29 15:20 IST', author: 'System Ingestion', action: 'DOCKET_REGISTERED', detail: 'Transferred from State Higher Education Dept' }
    ]
  },
  {
    id: 'AB-2026-0045',
    institutionId: 'AICTE-DEMO-1024',
    institutionName: 'North Valley Institute of Technology',
    category: 'Non-Refund of Caution Deposit and Hostage Retention of Original Certificates',
    bureau: 'AB',
    bureauName: 'Approval Bureau',
    dateFiled: '2026-02-01',
    lastUpdated: '2026-02-14',
    slaDaysRemaining: 19,
    slaBreachStatus: 'NORMAL',
    status: 'PRELIMINARY_REVIEW',
    severity: 'MEDIUM',
    complainantType: 'Student Union',
    complainantName: 'Graduating Batch 2025 Representatives',
    assignedOfficer: 'Shri D. K. Murali',
    officerRole: 'Director (Approval Process)',
    summary: 'Withholding 10th, 12th, and Transfer Certificates of 89 passed-out students who refused mandatory alumni endowment subscription fee.',
    allegationDetails: 'Direct violation of AICTE Approval Process Handbook (APH 2025-26) Chapter VII prohibiting retention of original student credentials.',
    affectedParties: 89,
    hasActiveOverlap: false,
    evidenceFiles: [
      { name: 'Withholding_Declaration_Undertaking.pdf', size: '3.1 MB', type: 'application/pdf', hash: 'SHA256:66fd...3412', uploadDate: '2026-02-01' }
    ],
    auditTrail: [
      { date: '2026-02-01 11:30 IST', author: 'System Ingestion', action: 'DOCKET_REGISTERED', detail: 'Submitted through Student Grievance Redressal Portal' }
    ]
  },
  {
    id: 'PGRC-2026-0099',
    institutionId: 'AICTE-DEMO-1024',
    institutionName: 'North Valley Institute of Technology',
    category: 'Hostel Mess Substandard Nutrition & Water Contamination Outbreak',
    bureau: 'PGRC',
    bureauName: 'Public Grievance Redressal Cell',
    dateFiled: '2026-02-05',
    lastUpdated: '2026-02-16',
    slaDaysRemaining: 21,
    slaBreachStatus: 'NORMAL',
    status: 'UNDER_INVESTIGATION',
    severity: 'MEDIUM',
    complainantType: 'Student Union',
    complainantName: 'Hostel Inmates Committee',
    assignedOfficer: 'Dr. Rajesh Sharma, IRS',
    officerRole: 'Chief Surveillance Officer',
    summary: 'Hospitalization of 28 hostellers due to bacterial contamination in overhead drinking water storage tanks without periodic cleaning.',
    allegationDetails: 'FSSAI testing report revealed presence of E.coli bacteria in campus dining hall water filters.',
    affectedParties: 310,
    hasActiveOverlap: false,
    evidenceFiles: [
      { name: 'Water_Quality_Lab_Report_FSSAI.pdf', size: '2.5 MB', type: 'application/pdf', hash: 'SHA256:11ac...7722', uploadDate: '2026-02-05' }
    ],
    auditTrail: [
      { date: '2026-02-05 14:00 IST', author: 'System Ingestion', action: 'DOCKET_REGISTERED', detail: 'Emergency petition flagged' }
    ]
  },
  {
    id: 'AB-2026-0038',
    institutionId: 'AICTE-DEMO-4102',
    institutionName: 'East Coast University of Applied Sciences',
    category: 'Unauthorized Off-Campus Study Centers Operating Without AICTE Approval',
    bureau: 'AB',
    bureauName: 'Approval Bureau',
    dateFiled: '2026-02-08',
    lastUpdated: '2026-02-17',
    slaDaysRemaining: 24,
    slaBreachStatus: 'NORMAL',
    status: 'UNDER_INVESTIGATION',
    severity: 'HIGH',
    complainantType: 'Anonymous Whistleblower',
    complainantName: 'Eastern Region Vigilance Taskforce',
    assignedOfficer: 'Shri D. K. Murali',
    officerRole: 'Director (Approval Process)',
    summary: 'Franchising AICTE approved curriculum to 4 commercial coaching centers across Howrah and Siliguri without statutory territorial jurisdiction.',
    allegationDetails: 'Commercial brochures and promotional flyers guaranteeing AICTE validated diplomas printed by unauthorized third-party centers.',
    affectedParties: 320,
    financialImplication: '₹2,40,00,000',
    hasActiveOverlap: false,
    evidenceFiles: [
      { name: 'Franchise_Agreements_Exposed.pdf', size: '11.8 MB', type: 'application/pdf', hash: 'SHA256:aa55...9111', uploadDate: '2026-02-08' }
    ],
    auditTrail: [
      { date: '2026-02-08 17:00 IST', author: 'System Ingestion', action: 'DOCKET_REGISTERED', detail: 'Received via Vigilance Division dispatch' }
    ]
  }
];

export const MOCK_OVERLAP_MATCHES: OverlapMatch[] = [
  {
    matchId: 'MATCH-2026-001',
    institutionId: 'AICTE-DEMO-1024',
    institutionName: 'North Valley Institute of Technology',
    confidenceScore: 91,
    status: 'ACTION_REQUIRED',
    detectionTimestamp: '12 Jan 2026 14:22 IST',
    pipelineStage: 'REGULATORY_FLAG',
    docketA: {
      id: 'PGRC-2026-0102',
      bureau: 'PGRC',
      bureauName: 'Public Grievance Redressal Cell (PGRC)',
      officer: 'S. K. Verma (Assistant Director, PGRC)',
      date: '12 Jan 2026 (18d ago)',
      category: 'Non-payment of 7th Pay Commission revised arrears and unauthorized withholding of provident fund since July 2025.',
      complainant: 'Faculty Association / Teaching Staff (CMP-7712, Whistleblower Protection Active)',
      summary: 'Despite representations made to the management board in October 2025, 48 senior faculty and laboratory staff members have received staggered half-salaries. PF deductions are registered on paper but not deposited with EPFO, leading to acute staff distress and strike warnings.',
      keyExcerpts: [
        '48 senior faculty and laboratory staff members have received staggered half-salaries.',
        'PF deductions are registered on paper but not deposited with EPFO, leading to acute staff distress.',
        'Management diverted ₹4.82 Cr allocated for doctoral fellowship & laboratory modernization.'
      ],
      evidenceCount: 3
    },
    docketB: {
      id: 'RB-2026-0087',
      bureau: 'RB',
      bureauName: 'Regulation Bureau (RB)',
      officer: 'Dr. A. K. Rao (Deputy Director, Regulation Bureau)',
      date: '22 Jan 2026 (8d ago)',
      category: 'Diversion of institutional development fees and abrupt salary deduction of faculty members leading to cancelled laboratory sessions.',
      complainant: 'Parent-Student Council & Anonymous Staff (CMP-8904, Public Registry Intake)',
      summary: 'Mechanical and CSE lab sessions were discontinued since mid-semester without notice. Upon investigation by the PTA, laboratory instructors stated uncredited salaries since August, while students were charged INR 42,000 special infrastructural dev levy.',
      keyExcerpts: [
        'Mechanical and CSE lab sessions were discontinued since mid-semester without notice.',
        'Laboratory instructors stated uncredited salaries since August while students were charged INR 42,000 special infrastructural levy.',
        'Internal muster rolls show ghost faculties enrolled across 3 concurrent institutes.'
      ],
      evidenceCount: 3
    },
    signals: [
      {
        name: 'Signal 1: AICTE Permanent ID Match',
        weight: 1.0,
        score: 100,
        evidence: 'EXACT MATCH (AICTE-DEMO-1024) — Both grievances link directly to the identical verified national institution key in the AICTE Approval Master Repository.',
        status: 'EXACT_MATCH'
      },
      {
        name: 'Signal 2: Institution Name Similarity',
        weight: 0.25,
        score: 98.4,
        evidence: 'Levenshtein & Token Set Ratio between “North Valley Inst of Technology” and “North Valley Institute of Technology, Pune” exceeds deterministic threshold (>90%).',
        status: 'EXACT_MATCH'
      },
      {
        name: 'Signal 3: Semantic Content Similarity (Multilingual Embeddings)',
        weight: 0.35,
        score: 87.2,
        evidence: 'High semantic vector convergence on operational sub-themes: “Financial irregularities, unauthorized salary disruption, delayed PF, impacting accreditation & laboratory delivery standards”.',
        status: 'HIGH_CORRELATION'
      },
      {
        name: 'Signal 4: Cross-Bureau Rule Engine',
        weight: 0.20,
        score: 94.0,
        evidence: 'Cross-Bureau overlap condition verified: Public Grievance Redressal Cell (PGRC) and Regulation Bureau (RB) have active open dockets filed within ±30 days in identical academic term (2025-26).',
        status: 'HIGH_CORRELATION'
      },
      {
        name: 'Signal 5: Case Independence Safeguard',
        weight: 0.20,
        score: 100,
        evidence: 'Different complainant sources confirmed (Faculty vs Student-Parent body). System strictly disallows unilateral consolidation; recommends establishment of a collaborative investigation thread.',
        status: 'EXACT_MATCH'
      }
    ],
    aiSynthesis: 'High probability of systemic institutional financial distress affecting both faculty salaries (PGRC) and student lab operations (RB). Recommend joint review without case consolidation under Section 10(p).',
    statutoryPrecedent: 'Similar to AICTE v. Apex Group (Delhi High Court W.P.(C) 4120/2023) where joint inspection under Section 10(p) superseded isolated bureau proceedings.',
    recommendation: 'MERGE_COORDINATED_INVESTIGATION'
  },
  {
    matchId: 'MATCH-2026-002',
    institutionId: 'AICTE-DEMO-2048',
    institutionName: 'Apex Institute of Technology',
    confidenceScore: 84,
    status: 'UNDER_REVIEW',
    detectionTimestamp: '28 Jan 2026 10:15 IST',
    pipelineStage: 'SCORE_AGGREGATION',
    docketA: {
      id: 'RB-2026-0094',
      bureau: 'RB',
      bureauName: 'Regulation Bureau (RB)',
      officer: 'Shri Vikramaditya Rao (Assistant Director)',
      date: '24 Jan 2026',
      category: 'Curriculum Non-Compliance & Inadequate Laboratory Equipment',
      complainant: 'Student Academic Council',
      summary: 'Electrical and Electronics laboratories lack mandatory AICTE specified oscilloscope and high-voltage training modules.',
      keyExcerpts: ['Core electronics labs operating at 40% mandatory equipment capacity.'],
      evidenceCount: 2
    },
    docketB: {
      id: 'AB-2026-0012',
      bureau: 'AB',
      bureauName: 'Approval Bureau (AB)',
      officer: 'Shri D. K. Murali (Director, Approvals)',
      date: '27 Jan 2026',
      category: 'Unauthorized Seat Increase in B.Tech ECE without Cadre Ratio Approval',
      complainant: 'Affiliated Technical University Inspection Cell',
      summary: 'Institute admitted 60 extra students into ECE division without obtaining statutory AICTE revised intake sanction.',
      keyExcerpts: ['Intake surge of 60 seats registered in state admission portal without AICTE Approval Handbook compliance.'],
      evidenceCount: 2
    },
    signals: [
      { name: 'Signal 1: AICTE Permanent ID Match', weight: 1.0, score: 100, evidence: 'Exact match AICTE-DEMO-2048 in Western Regional Directorate', status: 'EXACT_MATCH' },
      { name: 'Signal 2: Institution Name Similarity', weight: 0.25, score: 96, evidence: 'Fuzzy string ratio 96.2%', status: 'EXACT_MATCH' },
      { name: 'Signal 3: Semantic Content Similarity', weight: 0.35, score: 81, evidence: 'Correlated deficit in lab equipment vs expanded class size', status: 'HIGH_CORRELATION' },
      { name: 'Signal 4: Cross-Bureau Rule Engine', weight: 0.20, score: 85, evidence: 'RB + AB paired triggers within 7-day window', status: 'HIGH_CORRELATION' },
      { name: 'Signal 5: Case Independence Safeguard', weight: 0.20, score: 100, evidence: 'Separate University vs Student complainants', status: 'EXACT_MATCH' }
    ],
    aiSynthesis: 'Capacity strain: Institute expanded student intake by 60 seats without expanding required lab equipment.',
    statutoryPrecedent: 'AICTE Act Section 10(b) and 10(k).',
    recommendation: 'FORMAL_JOINT_INSPECTION'
  },
  {
    matchId: 'MATCH-2026-003',
    institutionId: 'AICTE-DEMO-3012',
    institutionName: 'Horizon College of Pharmacy',
    confidenceScore: 78,
    status: 'UNDER_REVIEW',
    detectionTimestamp: '29 Jan 2026 16:30 IST',
    pipelineStage: 'SCORE_AGGREGATION',
    docketA: {
      id: 'PGRC-2026-0118',
      bureau: 'PGRC',
      bureauName: 'Public Grievance Redressal Cell (PGRC)',
      officer: 'S. K. Verma (Assistant Director)',
      date: '26 Jan 2026',
      category: 'Non-refund of Caution Deposit to B.Pharm Final Year Batch',
      complainant: 'Graduating Students Welfare Association',
      summary: 'Institute refuses to return ₹25,000 security deposit to 120 passing students citing campus development fees.',
      keyExcerpts: ['₹25,000 deposit withheld arbitrarily without receipts.'],
      evidenceCount: 1
    },
    docketB: {
      id: 'PGRC-2026-0120',
      bureau: 'PGRC',
      bureauName: 'Public Grievance Redressal Cell (PGRC)',
      officer: 'Dr. Rajesh Sharma, IRS',
      date: '28 Jan 2026',
      category: 'Arbitrary Library & Exam Surcharges Levied on M.Pharm Students',
      complainant: 'PG Scholars Delegation',
      summary: 'M.Pharm scholars charged an extra ₹18,000 examination processing fee contrary to state regulatory fee committee schedule.',
      keyExcerpts: ['Duplicate fee collection reported across both UG and PG cohorts.'],
      evidenceCount: 1
    },
    signals: [
      { name: 'Signal 1: AICTE Permanent ID Match', weight: 1.0, score: 100, evidence: 'Exact match AICTE-DEMO-3012', status: 'EXACT_MATCH' },
      { name: 'Signal 2: Institution Name Similarity', weight: 0.25, score: 99, evidence: 'Exact institution name matching', status: 'EXACT_MATCH' },
      { name: 'Signal 3: Semantic Content Similarity', weight: 0.35, score: 76, evidence: 'Both dockets allege unauthorized fee retention and hidden levies', status: 'PARTIAL' },
      { name: 'Signal 4: Cross-Bureau Rule Engine', weight: 0.20, score: 72, evidence: 'Intra-bureau duplicate grievance detection pattern', status: 'PARTIAL' },
      { name: 'Signal 5: Case Independence Safeguard', weight: 0.20, score: 100, evidence: 'UG vs PG distinct cohorts', status: 'EXACT_MATCH' }
    ],
    aiSynthesis: 'Intra-bureau overlap indicating chronic financial extraction from graduating students across departments.',
    statutoryPrecedent: 'AICTE Fee Regulation Guidelines 2021.',
    recommendation: 'MERGE_COORDINATED_INVESTIGATION'
  },
  {
    matchId: 'MATCH-2026-004',
    institutionId: 'AICTE-DEMO-4102',
    institutionName: 'East Coast University of Applied Sciences',
    confidenceScore: 88,
    status: 'ACTION_REQUIRED',
    detectionTimestamp: '30 Jan 2026 11:20 IST',
    pipelineStage: 'REGULATORY_FLAG',
    docketA: {
      id: 'AB-2026-0038',
      bureau: 'AB',
      bureauName: 'Approval Bureau (AB)',
      officer: 'Shri D. K. Murali (Director, Approvals)',
      date: '25 Jan 2026',
      category: 'Unauthorized Off-Campus Commercial Franchise Operations',
      complainant: 'State Technical Vigilance Squad',
      summary: 'Franchising AICTE approved diploma curricula to 4 unapproved private tutorial centers across Howrah and Siliguri.',
      keyExcerpts: ['4 unapproved satellite centers operating under unauthorized franchise agreement.'],
      evidenceCount: 3
    },
    docketB: {
      id: 'PGRC-2026-0094',
      bureau: 'PGRC',
      bureauName: 'Public Grievance Redressal Cell (PGRC)',
      officer: 'Dr. Rajesh Sharma, IRS',
      date: '28 Jan 2026',
      category: 'Fake Degree Issuance & Misleading AICTE Accreditation Claims',
      complainant: 'Consumer Rights Forum & Aggrieved Students',
      summary: 'Students enrolled at satellite Howrah center were denied AICTE recognized convocation certificates.',
      keyExcerpts: ['Over 180 students defrauded with non-recognized off-campus diplomas.'],
      evidenceCount: 2
    },
    signals: [
      { name: 'Signal 1: AICTE Permanent ID Match', weight: 1.0, score: 100, evidence: 'Exact match AICTE-DEMO-4102', status: 'EXACT_MATCH' },
      { name: 'Signal 2: Institution Name Similarity', weight: 0.25, score: 94, evidence: 'Fuzzy match 94.8%', status: 'EXACT_MATCH' },
      { name: 'Signal 3: Semantic Content Similarity', weight: 0.35, score: 89, evidence: 'High semantic match on unauthorized satellite center diplomas', status: 'HIGH_CORRELATION' },
      { name: 'Signal 4: Cross-Bureau Rule Engine', weight: 0.20, score: 92, evidence: 'AB + PGRC paired trigger', status: 'HIGH_CORRELATION' },
      { name: 'Signal 5: Case Independence Safeguard', weight: 0.20, score: 100, evidence: 'State task force vs Citizen consumer forum', status: 'EXACT_MATCH' }
    ],
    aiSynthesis: 'Commercial fraud ring operating counterfeit off-campus centers while trading on legitimate AICTE approval credentials.',
    statutoryPrecedent: 'Supreme Court ruling in AICTE v. Bharathidasan University (territorial jurisdiction limits).',
    recommendation: 'MERGE_COORDINATED_INVESTIGATION'
  }
];

export const MOCK_COORDINATION_GROUP: CoordinationGroup = {
  id: '#GRP-2026-088',
  title: 'NVIT Comprehensive Fraud & Statutory Cadre Investigation',
  institutionId: 'AICTE-DEMO-1024',
  institutionName: 'North Valley Institute of Technology',
  leadOfficer: 'Dr. Rajesh Sharma, IRS (Chief Surveillance Officer)',
  participatingBureaus: ['PGRC', 'RB', 'AB'],
  createdDate: '2026-01-29',
  targetClosureDate: '2026-03-15',
  daysRemaining: 18,
  progressPercent: 68,
  status: 'ACTIVE_INVESTIGATION',
  statutoryClause: 'Section 10(p) Statutory Safeguard Enacted — Shared Intelligence without Diluting Sovereign Bureau Jurisdiction',
  dockets: {
    primary: 'PGRC-2026-0102',
    secondary: 'RB-2026-0087'
  },
  actionItems: [
    { id: 'ACT-01', task: 'Issue Section 10(p) Joint Scrutiny Summons to NVIT Management', assigneeBureau: 'PGRC', dueDate: '2026-02-02', completed: true },
    { id: 'ACT-02', task: 'Cross-verify Aadhaar biometric logs of 34 named faculties with UIDAI master server', assigneeBureau: 'RB', dueDate: '2026-02-10', completed: true },
    { id: 'ACT-03', task: 'Depute 3-member Surprise Flying Squad for on-site physical head-count inspection', assigneeBureau: 'AB', dueDate: '2026-02-24', completed: false },
    { id: 'ACT-04', task: 'Forensic audit of bank accounts for ₹4.82 Cr grant diversion', assigneeBureau: 'PGRC', dueDate: '2026-02-28', completed: false },
    { id: 'ACT-05', task: 'Formulate Joint Determination Order & Submit to Member Secretary AICTE', assigneeBureau: 'RB', dueDate: '2026-03-10', completed: false }
  ],
  findings: [
    {
      id: 'FIND-101',
      date: '2026-02-04 14:15 IST',
      author: 'Dr. Rajesh Sharma, IRS',
      bureau: 'PGRC',
      finding: 'Preliminary forensic examination of NVIT SBI Escrow A/c confirms ₹4.82 Cr was debited under "Lab Vendor Modernization" but wired directly to a shell entity (M/s Apex Infrarealty Ltd).',
      evidenceRef: 'SBI_Forensic_Statement_Annex_A.pdf',
      signatureVerified: true
    },
    {
      id: 'FIND-102',
      date: '2026-02-11 11:30 IST',
      author: 'Smt. Ananya Sen, IAS',
      bureau: 'RB',
      finding: 'UIDAI authentication checks reveal that 22 out of 34 faculty biometric profiles submitted for EoA approval have registered cell phones linked to active professors residing in Bengaluru and Hyderabad with no active residency in Delhi NCR.',
      evidenceRef: 'UIDAI_Geo_Telecom_Verification.pdf',
      signatureVerified: true
    },
    {
      id: 'FIND-103',
      date: '2026-02-18 17:00 IST',
      author: 'Shri D. K. Murali',
      bureau: 'AB',
      finding: 'Approval Bureau recommends issuing an immediate Show Cause Notice to freeze all new admissions in B.Tech Computer Science and Information Technology for Academic Year 2026-27.',
      evidenceRef: 'APH_2026_Penalty_Framework_Notice.pdf',
      signatureVerified: true
    }
  ]
};

export const MOCK_ALERTS: StatutoryAlert[] = [
  {
    id: 'ALT-2026-0941',
    title: 'High Confidence Overlap Triggered (#GRP-2026-088)',
    category: 'OVERLAP',
    severity: 'CRITICAL',
    timestamp: '12 mins ago',
    isRead: false,
    isSnoozed: false,
    relatedDocketId: 'PGRC-2026-0102',
    institutionName: 'North Valley Institute of Technology',
    summary: 'Multi-Signal Correlation Engine detected 94.2% entity overlap between PGRC and RB dockets involving 34 ghost faculties.',
    recommendedAction: 'Open Cross-Bureau Workspace to coordinate joint inspection squad.'
  },
  {
    id: 'ALT-2026-0938',
    title: 'Statutory 30-Day SLA Breach Imminent (4 Days Remaining)',
    category: 'SLA_BREACH',
    severity: 'HIGH',
    timestamp: '1 hour ago',
    isRead: false,
    isSnoozed: false,
    relatedDocketId: 'PGRC-2026-0102',
    institutionName: 'North Valley Institute of Technology',
    summary: 'Public grievance filed by 142 faculty members reaches Day 26 of 30 statutory resolution window under Section 10(k).',
    recommendedAction: 'File interim status memorandum or request 14-day statutory extension from Chairman.'
  },
  {
    id: 'ALT-2026-0925',
    title: 'Fire Safety Non-Compliance Flagged in Regional Audit',
    category: 'INSPECTION',
    severity: 'HIGH',
    timestamp: '4 hours ago',
    isRead: true,
    isSnoozed: false,
    relatedDocketId: 'RB-2026-0091',
    institutionName: 'Apex College of Engineering & Technology',
    summary: 'Municipal Fire Service inspection issued stop-work notice for basement heavy-machinery labs.',
    recommendedAction: 'Issue formal compliance directive with 7-day closure mandate.'
  },
  {
    id: 'ALT-2026-0914',
    title: 'Unapproved Off-Campus Branch Operating in Kolkata Suburbs',
    category: 'JURISDICTION',
    severity: 'CRITICAL',
    timestamp: '1 day ago',
    isRead: true,
    isSnoozed: false,
    relatedDocketId: 'AB-2026-0038',
    institutionName: 'East Coast University of Applied Sciences',
    summary: 'State task force reported unauthorized franchised engineering diploma center operating without AICTE gazette notification.',
    recommendedAction: 'Dispatch regional inspection squad and issue public alert notice.'
  },
  {
    id: 'ALT-2026-0899',
    title: 'New APH 2026-27 Cadre Ratio Guidelines Gazetted',
    category: 'POLICY',
    severity: 'MEDIUM',
    timestamp: '2 days ago',
    isRead: true,
    isSnoozed: true,
    summary: 'Ministry of Education has notified revised guidelines for AI-assisted grievance resolution & whistleblower protection.',
    recommendedAction: 'Review statutory policy handbook changes.'
  }
];

export const MOCK_OFFICERS: OfficerUser[] = [
  {
    id: 'OFF-001',
    name: 'Dr. Rajesh Sharma, IRS',
    designation: 'Chief Surveillance Officer & Joint Secretary',
    bureau: 'PGRC',
    bureauFull: 'Public Grievance Redressal Cell',
    role: 'Chief Surveillance Officer',
    email: 'rajesh.sharma@aicte-india.org',
    accessTier: 'Tier 1 - Statutory Sovereign',
    status: 'ACTIVE',
    activeAssignedDockets: 8,
    lastLogin: 'Today, 09:14 IST',
    nicHsmBadge: 'NIC-HSM-256-DEL-0091',
    digitalSignatureHash: '0x882A...F091'
  },
  {
    id: 'OFF-002',
    name: 'Prof. T. G. Sitharam',
    designation: 'Honorable Chairman, AICTE',
    bureau: 'VIGILANCE',
    bureauFull: 'Appellate & Surveillance Council',
    role: 'Bureau Administrator',
    email: 'chairman@aicte-india.org',
    accessTier: 'Tier 1 - Statutory Sovereign',
    status: 'ACTIVE',
    activeAssignedDockets: 2,
    lastLogin: 'Today, 08:30 IST',
    nicHsmBadge: 'NIC-HSM-512-CHM-0001',
    digitalSignatureHash: '0x001A...AA01'
  },
  {
    id: 'OFF-003',
    name: 'Smt. Ananya Sen, IAS',
    designation: 'Senior Regulatory Inspector',
    bureau: 'RB',
    bureauFull: 'Regulatory Bureau',
    role: 'Investigating Officer',
    email: 'ananya.sen@aicte-india.org',
    accessTier: 'Tier 2 - Senior Officer',
    status: 'ACTIVE',
    activeAssignedDockets: 14,
    lastLogin: 'Today, 10:02 IST',
    nicHsmBadge: 'NIC-HSM-256-RB-0144',
    digitalSignatureHash: '0x44B1...C982'
  },
  {
    id: 'OFF-004',
    name: 'Shri D. K. Murali',
    designation: 'Director (Approval Process & Standards)',
    bureau: 'AB',
    bureauFull: 'Approval Bureau',
    role: 'Statutory Registrar',
    email: 'dk.murali@aicte-india.org',
    accessTier: 'Tier 2 - Senior Officer',
    status: 'ACTIVE',
    activeAssignedDockets: 19,
    lastLogin: 'Yesterday, 17:40 IST',
    nicHsmBadge: 'NIC-HSM-256-AB-0032',
    digitalSignatureHash: '0x71D4...E190'
  },
  {
    id: 'OFF-005',
    name: 'Dr. Meenakshi Sundaram',
    designation: 'Ombudsman & Policy Lead',
    bureau: 'PAPC',
    bureauFull: 'Policy & Academic Planning Bureau',
    role: 'Hearing Officer',
    email: 'm.sundaram@aicte-india.org',
    accessTier: 'Tier 2 - Senior Officer',
    status: 'ACTIVE',
    activeAssignedDockets: 11,
    lastLogin: 'Today, 09:45 IST',
    nicHsmBadge: 'NIC-HSM-256-PAPC-0087',
    digitalSignatureHash: '0x55E9...A143'
  },
  {
    id: 'OFF-006',
    name: 'Shri Vikramaditya Rao',
    designation: 'Assistant Director (Western Regional Office)',
    bureau: 'RB',
    bureauFull: 'Regulatory Bureau',
    role: 'Investigating Officer',
    email: 'v.rao@aicte-india.org',
    accessTier: 'Tier 3 - Investigating Officer',
    status: 'ACTIVE',
    activeAssignedDockets: 6,
    lastLogin: 'Today, 10:15 IST',
    nicHsmBadge: 'NIC-HSM-256-RB-0209',
    digitalSignatureHash: '0x99A0...3312'
  }
];

export const SYSTEM_METRICS = {
  activeComplaintsTotal: 1248,
  activeComplaintsChange: '+14% vs last mo',
  highConfidenceOverlaps: 42,
  highConfidenceResolved: '38 pending action',
  slaComplianceRate: '88.4%',
  slaAverageDays: '16.2 Days Avg',
  activeInstitutionsAudited: 849,
  highRiskInstitutionsCount: 38,
  bureauWorkloads: [
    { bureau: 'PGRC', name: 'Public Grievance Cell', count: 482, activePercent: 38.6, color: '#001632' },
    { bureau: 'RB', name: 'Regulatory Bureau', count: 394, activePercent: 31.5, color: '#3b5e98' },
    { bureau: 'AB', name: 'Approval Bureau', count: 246, activePercent: 19.7, color: '#271000' },
    { bureau: 'PAPC', name: 'Policy & Planning', count: 126, activePercent: 10.2, color: '#4a5f81' }
  ],
  slaAgeingDistribution: [
    { label: '< 7 Days', count: 540, percentage: 43, status: 'safe' },
    { label: '8 - 15 Days', count: 380, percentage: 30, status: 'safe' },
    { label: '16 - 25 Days', count: 210, percentage: 17, status: 'warning' },
    { label: '26 - 30 Days (At Risk)', count: 86, percentage: 7, status: 'alert' },
    { label: '> 30 Days (Breached)', count: 32, percentage: 3, status: 'breach' }
  ]
};
