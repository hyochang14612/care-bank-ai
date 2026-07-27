export type ResourceCategory = '위생관리' | '식생활' | '이동지원' | '주거환경' | '정서지원' | '교육문화'

export type ResourceType = '물품 나눔' | '재능 나눔' | '시간 나눔' | '공간 나눔'

export interface SharedResource {
  id: string
  title: string
  provider: string
  location: string
  targetGroup: string
  availability: string
  quantityLeft: number
  quantityTotal: number
  category: ResourceCategory
  resourceType: ResourceType
  tags: string[]
  icon: string
}

export type MatchGrade = '매우 적합' | '적합' | '검토 필요'

export interface MatchResult {
  rank: number
  caseId: string
  applicantAlias: string
  resourceTitle: string
  grade: MatchGrade
  reasons: string[]
  checks: string[]
  status: '확인 대기' | '연계 진행중' | '보류'
}

export interface DailyStat {
  label: string
  value: number
  unit: string
  trend: string
  icon: string
  accent: 'brand' | 'blue' | 'coral' | 'ink'
}

export type ConnectionStatus = '연계 완료' | '진행중' | '확인 필요' | '보류'

export interface Connection {
  id: string
  caseId: string
  applicantAlias: string
  resourceTitle: string
  worker: string
  status: ConnectionStatus
  updatedAt: string
  note: string
}

export interface PointRecord {
  id: string
  title: string
  type: '참여 기록' | 'CARE POINT' | '나눔 실천'
  date: string
  points: number
  memo: string
  icon: string
}

export interface StoryComment {
  id: string
  author: string
  text: string
}

export interface NewsItem {
  id: string
  title: string
  summary: string
  date: string
  tag: string
  org: string
  icon: string
  likes: number
  comments: StoryComment[]
}

export type CareRequestStatus = '신규 접수' | '검토중' | '지원 확정'

export interface CareRequest {
  id: string
  name: string
  location: string
  needType: string
  detail: string
  contactTime: string
  status: CareRequestStatus
  submittedAt: string
}

export type PendingMatchStatus = 'AI 매칭 대기' | '매칭 완료'

export interface PendingMatch {
  id: string
  residentName: string
  resourceTitle: string
  category: ResourceCategory
  location: string
  availableTime: string
  status: PendingMatchStatus
  grade?: MatchGrade
  reasons?: string[]
}
