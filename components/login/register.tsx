import React from 'react';
import Image from "next/image";
import {Form} from "antd";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import SocialSignIn from "@/components/login/socialSignIn";
import {emailRegister} from "@/lib/backend_helper";
import {useAction} from "@/lib/hooks";
import {useRouter} from "next/router";


const Register =  ({setOpen,setOpen2}) => {
    const router = useRouter()
    const onFinish = async  (values) => {
       const {msg,error} =await useAction(emailRegister, values)
        //if error alert
        //else close open
        if(error){
            alert(error)
        }else{
            router.push('/user')
        }
    }
    return (
        <div className="w-full ">


            <div className={'h-full flex flex-col items-center justify-center '}>
                <h2 className={'font-semibold '}>Please Register</h2>

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
            </div>

        </div>
    );
};

export default Register;
