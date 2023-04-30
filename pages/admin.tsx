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
    if (userProfile?.role !== 'admin') {
        return (
            <Layout>
                <div className={'container min-h-[400px] flex justify-center items-center'}>
                    <h1>{`User of role ${userProfile?.role} cant view Admin`}</h1>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className={'container min-h-[400px] flex justify-center items-center'}>
                <h1>This is admin</h1>
            </div>
        </Layout>
    );
};

export default Protected;
