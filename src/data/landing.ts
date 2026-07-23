export interface HeroBanner {
  id: string
  eyebrow: string
  message: string
  icons: string[]
  ctaLabel: string
  ctaTo: string
}

export const heroBanners: HeroBanner[] = [
  {
    id: 'b1',
    eyebrow: '지역 주민이 함께 만드는 변화',
    message: '우리 동네의 작은 자원이\n필요한 이웃에게 연결됩니다.',
    icons: ['🤝', '🌳', '👨‍👩‍👧‍👦'],
    ctaLabel: '나눔 시작하기',
    ctaTo: '/register',
  },
  {
    id: 'b2',
    eyebrow: '재능이 곧 돌봄이 되는 동네',
    message: '당신의 경험과 재능이\n우리 동네 돌봄이 됩니다.',
    icons: ['💇', '🍱', '🔧'],
    ctaLabel: '자원 등록하기',
    ctaTo: '/register',
  },
  {
    id: 'b3',
    eyebrow: '사람과 기술이 함께 만드는 연결',
    message: 'AI가 찾고,\n사회복지사가 연결하는\n새로운 지역 돌봄',
    icons: ['🤖', '✨', '🧑‍💼'],
    ctaLabel: 'AI 매칭 체험하기',
    ctaTo: '/register',
  },
  {
    id: 'b4',
    eyebrow: '언제든 기댈 수 있는 동네 연결망',
    message: '도움이 필요할 때\n우리 동네 연결망을 이용하세요.',
    icons: ['💬', '🧑‍💼', '🏠'],
    ctaLabel: '돌봄 신청하기',
    ctaTo: '/request',
  },
]

export const careLetters = [
  { letter: 'C', word: 'Connect', desc: '지역 자원과 사람을 연결' },
  { letter: 'A', word: 'Accessible', desc: '누구나 쉽게 참여' },
  { letter: 'R', word: 'Responsive', desc: '필요에 빠르게 대응' },
  { letter: 'E', word: 'Empathetic', desc: '공감 기반 지원' },
]

export const problemPoints = [
  {
    icon: '🧩',
    title: '흩어진 지역 자원',
    body: '좋은 자원이 존재하지만 필요한 주민에게 연결되지 못해요.',
  },
  {
    icon: '⏳',
    title: '느린 연결 과정',
    body: '수작업 중심 매칭으로 적합한 연결까지 시간이 오래 걸려요.',
  },
  {
    icon: '❓',
    title: '보이지 않는 나눔 결과',
    body: '자원 제공자가 자신의 참여 결과를 확인하기 어려워요.',
  },
]

export const problemNote =
  '지역 자원 공급자와 복지 욕구를 연결하는 구조 자체가 부족합니다.'

export const solutionPoints = [
  {
    icon: '🧺',
    title: '한 곳에 모이는 지역 자원',
    body: '물품·재능·시간·공간 자원을 등록하고 관리해요.',
  },
  {
    icon: '✨',
    title: 'AI + 사회복지사 스마트 매칭',
    body: 'AI가 지역·시간·욕구·자원 유형을 분석하고 사회복지사가 최종 확인해요.',
  },
  {
    icon: '💚',
    title: '나눔 선순환',
    body: '제공 → 연결 → 결과 확인 → 재참여로 이어져요.',
  },
]
