import axios from "axios";
import { useCallback, useReducer, useState } from "react";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useNavigate } from "react-router-dom";
import { profileStorageKey } from "../constants/index.constant";
import { useAppSelector } from "../store";
import { API_HOST } from "../constants/api.constant";

interface IinitialState {
        loading: boolean,
        success: boolean,
        error: {} | [] | null
}
const initialState: IinitialState = {
        loading: false,
        success: false,
        error: null,
}
type methodType = "POST" | "GET" | "PUT" | "PATCH" | "DELETE";

const useRequest = () => {
        const navigate = useNavigate();
        const dispatch = useDispatch();
        const token = useAppSelector((state) => state.profileSlice?.accessToken);

        const makeRequest = useCallback(
                () => axios.create({
                        baseURL: API_HOST,
                        headers: {
                                common: {
                                        Authorization: token ? `Bearer ${token}` : ''
                                }
                        },
                }),
                [],
        )

        return makeRequest()
}

export default useRequest;