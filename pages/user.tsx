import React from 'react';
import Layout from "@/components/common/layout";
import {useFetch} from "@/lib/hooks";
import {getPofile} from "@/lib/backend_helper";

const Protected = () => {
    const [userProfile, getProfile, {loading}] = useFetch(getPofile)
    console.log(userProfile);

    if (loading) {
        return (
            <Layout>
                <div className={'container min-h-[400px] flex justify-center items-center'}>
                    <h1>Loading...</h1>
                </div>
            </Layout>
        );
    }
    if (userProfile?.role === 'user') {
        return (
            <Layout>
                <div className={'container min-h-[400px] flex justify-center items-center'}>
                    <h1>user</h1>
                </div>
            </Layout>
        );
    }
    return (
        <Layout>
            <div className={'container min-h-[400px] flex justify-center items-center'}>
                <h1>{'This is admin . but he can view user '}</h1>
            </div>
        </Layout>
    );
};

export default Protected;
