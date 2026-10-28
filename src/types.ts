export type ActiveView = 
  | 'dashboard'
  | 'overlap-detection'
  | 'institution-directory'
  | 'coordination-workspace'
  | 'complaint-management'
  | 'alerts-and-notifications'
  | 'reports-and-analytics'
  | 'user-management'
  | 'action-history-and-audit'
  | 'settings';

export type Bureau = 'PGRC' | 'RB' | 'AB' | 'PAPC' | 'VIGILANCE';

export type ComplaintStatus = 'UNDER_INVESTIGATION' | 'PRELIMINARY_REVIEW' | 'CROSS_EXAMINATION' | 'PENDING_TRANSFER' | 'RESOLVED' | 'ESCALATED';

export type SeverityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface Complaint {
  id: string; // e.g. PGRC-2026-0102
  institutionId: string;
  institutionName: string;
  category: string;
  bureau: Bureau;
  bureauName: string;
  dateFiled: string;
  lastUpdated: string;
  slaDaysRemaining: number;
  slaBreachStatus: 'NORMAL' | 'NEAR_BREACH' | 'BREACHED';
  status: ComplaintStatus;
  severity: SeverityLevel;
  complainantType: 'Faculty Council' | 'Student Union' | 'Anonymous Whistleblower' | 'Vendor Consortium' | 'Research Scholar';
  complainantName: string;
  assignedOfficer: string;
  officerRole: string;
  summary: string;
  allegationDetails: string;
  affectedParties: number;
  financialImplication?: string;
  hasActiveOverlap: boolean;
  linkedGroupId?: string;
  matchedDocketId?: string;
  overlapConfidence?: number;
  evidenceFiles: {
    name: string;
    size: string;
    type: string;
    hash: string;
    uploadDate: string;
  }[];
  auditTrail: {
    date: string;
    author: string;
    action: string;
    detail: string;
  }[];
}

export interface OverlapSignal {
  name: string;
  weight: number;
  score: number; // 0 - 100
  evidence: string;
  status: 'EXACT_MATCH' | 'HIGH_CORRELATION' | 'PARTIAL' | 'UNLINKED';
}

export interface OverlapMatch {
  matchId: string; // e.g. MATCH-2026-001
  institutionId: string;
  institutionName: string;
  confidenceScore: number;
  status: 'ACTION_REQUIRED' | 'UNDER_REVIEW' | 'CONFIRMED' | 'DISMISSED';
  detectionTimestamp: string;
  pipelineStage: 'PRE_PROCESSING' | 'FEATURE_VECTOR' | 'TOPIC_MODELING' | 'SEMANTIC_SIMILARITY' | 'METADATA_CORRELATION' | 'SCORE_AGGREGATION' | 'REGULATORY_FLAG';
  docketA: {
    id: string;
    bureau: Bureau;
    bureauName: string;
    officer: string;
    date: string;
    category: string;
    complainant: string;
    summary: string;
    keyExcerpts: string[];
    evidenceCount: number;
  };
  docketB: {
    id: string;
    bureau: Bureau;
    bureauName: string;
    officer: string;
    date: string;
    category: string;
    complainant: string;
    summary: string;
    keyExcerpts: string[];
    evidenceCount: number;
  };
  signals: OverlapSignal[];
  aiSynthesis: string;
  statutoryPrecedent: string;
  recommendation: 'MERGE_COORDINATED_INVESTIGATION' | 'FORMAL_JOINT_INSPECTION' | 'INDEPENDENT_DISMISSAL';
}

export interface Institution {
  id: string;
  code: string;
  name: string;
  type: 'Autonomous Institute' | 'Deemed University' | 'Affiliated College' | 'Polytechnic';
  region: 'Northern' | 'Southern' | 'Western' | 'Eastern' | 'Central';
  state: string;
  city: string;
  establishedYear: number;
  approvalStatus: 'APPROVED' | 'PROVISIONAL' | 'UNDER_SCRUTINY' | 'NOTICE_SERVED';
  headOfInstitution: string;
  activeComplaintsCount: number;
  criticalComplaintsCount: number;
  crossBureauOverlapCount: number;
  recidivismRiskIndex: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
  accreditationGrade: string;
  facultyCount: number;
  studentEnrollment: number;
  complianceScore: number;
  dockets: string[];
  contactEmail: string;
  contactPhone: string;
  address: string;
}

export interface StatutoryAlert {
  id: string;
  title: string;
  category: 'OVERLAP' | 'SLA_BREACH' | 'JURISDICTION' | 'INSPECTION' | 'POLICY';
  severity: SeverityLevel;
  timestamp: string;
  isRead: boolean;
  isSnoozed: boolean;
  relatedDocketId?: string;
  institutionName?: string;
  summary: string;
  recommendedAction: string;
}

export interface OfficerUser {
  id: string;
  name: string;
  designation: string;
  bureau: Bureau;
  bureauFull: string;
  role: 'Bureau Administrator' | 'Chief Surveillance Officer' | 'Investigating Officer' | 'Statutory Registrar' | 'Hearing Officer';
  email: string;
  accessTier: 'Tier 1 - Statutory Sovereign' | 'Tier 2 - Senior Officer' | 'Tier 3 - Investigating Officer';
  status: 'ACTIVE' | 'ON_LEAVE' | 'SUSPENDED';
  activeAssignedDockets: number;
  lastLogin: string;
  nicHsmBadge: string;
  digitalSignatureHash: string;
}

export interface CoordinationGroup {
  id: string; // e.g. #GRP-2026-088
  title: string;
  institutionId: string;
  institutionName: string;
  leadOfficer: string;
  participatingBureaus: Bureau[];
  createdDate: string;
  targetClosureDate: string;
  daysRemaining: number;
  progressPercent: number;
  status: 'ACTIVE_INVESTIGATION' | 'AWAITING_JOINT_HEARING' | 'FINAL_ORDER_PENDING' | 'CLOSED';
  dockets: {
    primary: string;
    secondary: string;
  };
  actionItems: {
    id: string;
    task: string;
    assigneeBureau: Bureau;
    dueDate: string;
    completed: boolean;
  }[];
  findings: {
    id: string;
    date: string;
    author: string;
    bureau: Bureau;
    finding: string;
    evidenceRef?: string;
    signatureVerified: boolean;
  }[];
  statutoryClause: string;
}
