import { createContext, useContext, useState, type ReactNode } from 'react'
import {
  connections as initialConnections,
  pointRecords as initialPointRecords,
  careRequests as initialCareRequests,
} from '../data/mock'
import type { CareRequest, Connection, PointRecord } from '../data/types'

interface AppDataContextValue {
  connections: Connection[]
  pointRecords: PointRecord[]
  careRequests: CareRequest[]
  addConnection: (connection: Connection) => void
  addPointRecord: (record: PointRecord) => void
  addCareRequest: (request: CareRequest) => void
}

const AppDataContext = createContext<AppDataContextValue | null>(null)

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [connections, setConnections] = useState<Connection[]>(initialConnections)
  const [pointRecords, setPointRecords] = useState<PointRecord[]>(initialPointRecords)
  const [careRequests, setCareRequests] = useState<CareRequest[]>(initialCareRequests)

  const addConnection = (connection: Connection) => {
    setConnections((prev) => [connection, ...prev])
  }

  const addPointRecord = (record: PointRecord) => {
    setPointRecords((prev) => [record, ...prev])
  }

  const addCareRequest = (request: CareRequest) => {
    setCareRequests((prev) => [request, ...prev])
  }

  return (
    <AppDataContext.Provider
      value={{
        connections,
        pointRecords,
        careRequests,
        addConnection,
        addPointRecord,
        addCareRequest,
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
