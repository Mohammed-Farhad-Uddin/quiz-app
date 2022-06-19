import React, { useEffect, useState } from 'react';
import { get, getDatabase, limitToFirst, orderByKey, query, ref, startAt } from 'firebase/database';

const useVideoList = (page) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [videos, setVideos] = useState([]);
    const [hasMore, setHasMore] = useState(true);


    useEffect(() => {
        //useEffect er bitore async await er kaj korle function create kore ei kane call korte hobe
        async function fetchVideos() {
            //database related work
            const db = getDatabase();//database er reference ta newa hocce upore firebase tekhe import kore
            const videosRef = ref(db, "videos");//ei kane kon node(collection in mongodb) er reference nibe mane videos collection/node tar reference nicce
            const videoQuery = query(
                videosRef,
                orderByKey(),//query kora hocce video gula orderkey onujayi
                startAt("" + page),//koi number data tekhe dekabe ei tar kaj,, but ei ta number accept kore na string accept kore tai parameter hisabe page er jei number ta pabe oi ta k string er sathe add kore dile  number ta string hoye jai
                limitToFirst(8)//ei ta mane per page e prothom dik tekhe koi ta dekabe 
            );

            try {
                setError(false);
                setLoading(true);
                // request firebase database
                const snapshot = await get(videoQuery);
                setLoading(false);
                if (snapshot.exists()) {//snapshot.exists() ei ta boolean return kore true hole data pacce false hole data pacce na
                    setVideos((prevVideos) => {
                        return [...prevVideos, ...Object.values(snapshot.val())]//snapshot.val() er modde object akare data gula ace jei tar Object.value gula nile ek ta array pawa jai, and oi ta return array er modde destructure kore kore rakha hocce...
                    });
                } else {
                    //jkn snapshot.exists e data takbe na tkn ei ta false hobe
                    setHasMore(false);//ei ta holo infinity scroll er option hasmore true hole date ace , false hole data nai 
                }
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(true);
            }
        }

        setTimeout(() => {
            fetchVideos();
        }, 1000);


    }, [page]);


    return {
        loading,
        error,
        videos,
        hasMore
    }
};

export default useVideoList;