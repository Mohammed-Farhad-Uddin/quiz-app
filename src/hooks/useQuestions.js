import React, { useEffect, useState } from 'react';
import { get, getDatabase, orderByKey, query, ref } from 'firebase/database';

const useQuestions = (videoID) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [questions, setQuestions] = useState([]);



    useEffect(() => {
        //useEffect er bitore async await er kaj korle function create kore ei kane call korte hobe
        async function fetchQuestions() {
            //database related work
            const db = getDatabase();//database er reference ta newa hocce upore firebase tekhe import kore
            const quizRef = ref(db, "quiz/" + videoID + "/questions");//ei kane kon node(collection in mongodb) er reference nibe mane quiz collection/node er bitore video id tar vitore j question gula ace oi gular reference nicce
            const quizQuery = query(
                quizRef,
                orderByKey()//query kora hocce orderkey onujayi
            );

            try {
                setError(false);
                setLoading(true);
                // request firebase database
                const snapshot = await get(quizQuery);
                setLoading(false);
                if (snapshot.exists()) {//snapshot.exists() ei ta boolean return kore true hole data pacce false hole data pacce na
                    setQuestions((prevQuestions) => {
                        return [...prevQuestions, ...Object.values(snapshot.val())];//snapshot.val() er modde object akare data gula ace jei tar Object.value gula nile ek ta array pawa jai, and oi ta return array er modde destructure kore kore rakha hocce...
                    });
                }

            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(true);
            }
        }

        fetchQuestions();

    }, [videoID]);


    return {
        loading,
        error,
        questions
    }
};

export default useQuestions;

