import { useQuery } from '@tanstack/react-query'
import * as api from '../apis/bots'

export function useBots() {
  return useQuery({
    queryKey: ['bots'],
    queryFn: api.getBots,
  })
}
