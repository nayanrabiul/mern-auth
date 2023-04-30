import React from 'react';
import Image from "next/image";
import {Form} from "antd";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import SocialSignIn from "@/components/login/socialSignIn";
import {emailLogin} from "@/lib/backend_helper";
import {useAction} from "@/lib/hooks";
import {useRouter} from "next/router";
import {useUserContext} from "@/lib/context/user_context";

const Login = ({setOpen,setOpen2}) => {
    const router = useRouter()
    const {isLoggedIn, setIsLoggedIn} = useUserContext()
    const onFinish = async (values) => {
        const {token, error} = await useAction(emailLogin, values)
        if (error) {
            alert(error)
        } else {
            if (token) {
                setOpen(false)
                setOpen2(false)
                setIsLoggedIn(true)
                await localStorage.setItem('authToken', token)
                await router.push('/user')
            }
        }
    }
    return (
        <div className="w-full grid grid-cols-2">
            <div className={'flex justify-center items-center'}>
                <Image src={'/login.svg'} width={500} height={500} alt={'Login Image'}/>
            </div>

            <div className={'h-full flex flex-col items-center justify-center '}>
                <h2 className={'font-semibold '}>Please Login</h2>

                <Form
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    className={'md:w-1/2'}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input id={'email'}
                               className={'border border-blue-950 m-2'}
                               placeholder={'Enter email...'}/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input id={'password'} className={'border border-blue-950 m-2'}
                               placeholder={'Enter password...'}/>
                    </Form.Item>


                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                {/*tailwind devider*/}
                <div className="border-t border-gray-400 w-full my-4"></div>
                <SocialSignIn/>
            </div>

        </div>
    );
};

export default Login;
