import { createContext, useContext, useState, type ReactNode } from 'react'
import {
  connections as initialConnections,
  pointRecords as initialPointRecords,
  careRequests as initialCareRequests,
  resources as initialResources,
} from '../data/mock'
import type { CareRequest, Connection, PendingMatch, PointRecord, SharedResource } from '../data/types'

export type UserRole = 'guest' | 'worker'

interface AppDataContextValue {
  role: UserRole
  residentName: string
  loginWorker: () => void
  logout: () => void

  connections: Connection[]
  pointRecords: PointRecord[]
  careRequests: CareRequest[]
  resources: SharedResource[]
  pendingMatches: PendingMatch[]

  addConnection: (connection: Connection) => void
  addPointRecord: (record: PointRecord) => void
  addCareRequest: (request: CareRequest) => void
  addResource: (resource: SharedResource) => void
  addPendingMatch: (match: PendingMatch) => void
  updatePendingMatch: (id: string, updates: Partial<PendingMatch>) => void
  removePendingMatch: (id: string) => void
}

const AppDataContext = createContext<AppDataContextValue | null>(null)

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<UserRole>('guest')
  const residentName = '이웃 주민'

  const [connections, setConnections] = useState<Connection[]>(initialConnections)
  const [pointRecords, setPointRecords] = useState<PointRecord[]>(initialPointRecords)
  const [careRequests, setCareRequests] = useState<CareRequest[]>(initialCareRequests)
  const [resources, setResources] = useState<SharedResource[]>(initialResources)
  const [pendingMatches, setPendingMatches] = useState<PendingMatch[]>([])

  const loginWorker = () => setRole('worker')
  const logout = () => setRole('guest')

  const addConnection = (connection: Connection) => {
    setConnections((prev) => [connection, ...prev])
  }
  const addPointRecord = (record: PointRecord) => {
    setPointRecords((prev) => [record, ...prev])
  }
  const addCareRequest = (request: CareRequest) => {
    setCareRequests((prev) => [request, ...prev])
  }
  const addResource = (resource: SharedResource) => {
    setResources((prev) => [resource, ...prev])
  }
  const addPendingMatch = (match: PendingMatch) => {
    setPendingMatches((prev) => [match, ...prev])
  }
  const updatePendingMatch = (id: string, updates: Partial<PendingMatch>) => {
    setPendingMatches((prev) => prev.map((m) => (m.id === id ? { ...m, ...updates } : m)))
  }
  const removePendingMatch = (id: string) => {
    setPendingMatches((prev) => prev.filter((m) => m.id !== id))
  }

  return (
    <AppDataContext.Provider
      value={{
        role,
        residentName,
        loginWorker,
        logout,
        connections,
        pointRecords,
        careRequests,
        resources,
        pendingMatches,
        addConnection,
        addPointRecord,
        addCareRequest,
        addResource,
        addPendingMatch,
        updatePendingMatch,
        removePendingMatch,
      }}
    >
      {children}
    </AppDataContext.Provider>
  )
}

export function useAppData() {
  const ctx = useContext(AppDataContext)
  if (!ctx) throw new Error('useAppData must be used within AppDataProvider')
  return ctx
}
