
import React, { useCallback } from 'react'
import { io } from 'socket.io-client'
import { API_HOST } from '../constants/api.constant'

const useSocket = () => {

        return (useCallback(
                () => {
                        return io(API_HOST)
                },
                [],
        ))()
}

export default useSocket