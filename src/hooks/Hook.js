import { useEffect, useState, useRef } from 'react'

export const useMyHookTest = (value) => {
    const [text,setText] = useState();

    useEffect(()=>{
        setText(value)
    },[value])

    return text;
}

export const useFetchData = (link) => {
    const url = `https://jsonplaceholder.typicode.com/${link}`;
    const cache = useRef({});
    const [text, setText] = useState();
    useEffect(()=>{
        if (cache.current[url]) {
            setText(cache.current[url]);
        }
        else {
            fetch(url)
                .then(res => res.json())
                .then(res => {
                    setText(res);
                    cache.current[url] = text;
                })
        }
    },[url])
    return text;
}