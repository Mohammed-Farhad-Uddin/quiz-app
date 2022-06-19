import React, { useEffect, useState } from 'react';

const useFetch = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [result, setResult] = useState(null);


    useEffect(() => {
        async function requestFetch(url, method, headers) {
            try {
                setLoading(true);
                setError(false);

                const response = await fetch(url, {
                    method: method || "GET",
                    headers: headers
                });

                const data = await response.json();
                setLoading(false);
                setResult(data);

            } catch (error) {
                console.log(error);
                setLoading(false);
                setError(true);
            }
        }

        requestFetch();

    }, []);


    return {
        loading,
        error,
        result
    };
};

export default useFetch;