import axios from "axios";
import type { ApiParams, ApiResponse, Note, Post, Tag } from "../types/newtApi";

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

export const fetchNotes = async (params: ApiParams) => {
    const paramStr = parseQueryString(params);
    const res = await newtClient.get<ApiResponse<Note>>(`note?${paramStr}`);
    return res.data;
}

export const fetchNote = async (id: string) => {
    const res = await newtClient.get<Note>(`note/${id}`);
    return res.data;
}

export const fetchTags = async (params: ApiParams) => {
    const paramStr = parseQueryString(params);
    const res = await newtClient.get<ApiResponse<Tag>>(`tag?${paramStr}`);
    return res.data;
}

export const fetchTag = async (id: string) => {
    const res = await newtClient.get<Tag>(`tag/${id}`);
    return res.data;
}

export const fetchTagBySlug = async (slug: string) => {
    const res = await newtClient.get<ApiResponse<Tag>>(`tag/?slug=${slug}`);
    return res.data.items[0];
}