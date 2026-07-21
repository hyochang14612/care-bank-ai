import { createContext, useContext, useState, type ReactNode } from 'react'
import { connections as initialConnections, pointRecords as initialPointRecords } from '../data/mock'
import type { Connection, PointRecord } from '../data/types'

interface AppDataContextValue {
  connections: Connection[]
  pointRecords: PointRecord[]
  addConnection: (connection: Connection) => void
  addPointRecord: (record: PointRecord) => void
}

const AppDataContext = createContext<AppDataContextValue | null>(null)

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [connections, setConnections] = useState<Connection[]>(initialConnections)
  const [pointRecords, setPointRecords] = useState<PointRecord[]>(initialPointRecords)

  const addConnection = (connection: Connection) => {
    setConnections((prev) => [connection, ...prev])
  }

  const addPointRecord = (record: PointRecord) => {
    setPointRecords((prev) => [record, ...prev])
  }

  return (
    <AppDataContext.Provider value={{ connections, pointRecords, addConnection, addPointRecord }}>
      {children}
    </AppDataContext.Provider>
  )
}

export function useAppData() {
  const ctx = useContext(AppDataContext)
  if (!ctx) throw new Error('useAppData must be used within AppDataProvider')
  return ctx
}
