import axios from "axios";
import querystring from "querystring";
import type { ApiParams, ApiResponse, Post } from "../types/newtApi";

const apiKey = import.meta.env.API_KEY;
const apiUrl = import.meta.env.API_URL;

export const newtClient = axios.create({
    baseURL: apiUrl,
    responseType: "json",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
    },
});

const parseQueryString = (params: any) => {
    const urlParams = new URLSearchParams(params);
    return urlParams.toString();
}

export const fetchPosts = async (params: ApiParams) => {
    const paramStr = parseQueryString(params);
    const res = await newtClient.get<ApiResponse<Post>>(`post?${paramStr}`);
    return res.data;
}

export const fetchPost = async (id: string) => {
    const res = await newtClient.get<Post>(`post/${id}`);
    return res.data;
}