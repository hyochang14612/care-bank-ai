import { SectionHeading } from '../components/SectionHeading'
import { RoleShowcase } from '../components/RoleShowcase'

export function Roles() {
  return (
    <div className="space-y-6">
      <SectionHeading
        title="세 가지 사용자 관점"
        description="같은 서비스라도 후원자·사회복지사·대상자마다 보는 화면이 달라요"
      />
      <RoleShowcase />
    </div>
  )
}
