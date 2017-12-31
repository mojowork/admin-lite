/**
 * 基于cookie的信息存儲
 * 2017-12-31
 */
import Cookies from 'js-cookie'

const TokenKey = 'x-lite'

export const getToken = () =>  Cookies.get(TokenKey)

export const setToken = (token) => Cookies.set(TokenKey, token)

export const removeToken = () => Cookies.remove(TokenKey)
