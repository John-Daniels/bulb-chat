
import React, { useCallback, useEffect, useMemo } from 'react'
import { io } from 'socket.io-client'
import { API_HOST } from '../constants/api.constant'

const useSocket = () => {
        const socket = useMemo(() => io(API_HOST), [])
        useEffect(() => {
                return () => {
                        socket.disconnect()
                }
        }, [])


        return socket
}

export default useSocket