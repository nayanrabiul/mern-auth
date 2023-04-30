import React from 'react';
import Link from "next/link";
import {useRouter} from "next/router";
import {useUserContext} from "@/lib/context/user_context";
import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import Login from "@/components/login/login";
import Register from "@/components/login/register";

const Layout = ({children}) => {
    const router = useRouter()
    const asPath = router.asPath
    const {isLoggedIn, setIsLoggedIn} = useUserContext()
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);

    return (
        <>
            <nav className={'container flex justify-between items-center font-semibold space-x-4 p-4'}>
                <div className={'space-x-4 p-4'}>

                    <Link className={`${asPath === '/' ? 'border-b-2 border-black' : ''}`} href={'/'}>
                        Home
                        <span className={'absolute bg-green-200 '}></span>
                    </Link>
                    <Link className={`${asPath === '/admin' ? 'border-b-2 border-black' : ''}`} href={'/admin'}>
                        Protected Admin Route
                    </Link>
                    <Link className={`${asPath === '/user' ? 'border-b-2 border-black' : ''}`} href={'/user'}>
                        Protected User Route
                    </Link>
                </div>
                <div>
                    {isLoggedIn ? (
                        <div
                            className={'cursor-pointer'}
                            onClick={() => {
                                localStorage.removeItem('authToken')
                                setIsLoggedIn(false)
                                router.push('/')
                            }}
                        >
                            Logout
                        </div>
                    ) : (

                        <Dialog open={open} onOpenChange={() => open && setOpen(false)}>
                            <DialogTrigger asChild>
                                <Button onClick={() => setOpen(true)} variant="outline">Login</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <Login setOpen={setOpen} setOpen2={setOpen2}/>
                                <DialogFooter>
                                    {/*register*/}
                                    <Dialog open={open2} onOpenChange={() => {
                                        if (open2) {
                                            setOpen(false);
                                            setOpen2(false);
                                        }
                                    }}>
                                        <DialogTrigger>
                                            <p onClick={() => setOpen2(true)}> or <span
                                                className={'font-semibold text-pink-400'}>Register</span></p>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <Register setOpen={setOpen} setOpen2={setOpen2} />
                                            <DialogFooter>
                                                {/*register*/}
                                                <Button variant="outline">Register</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>


                    )}
                </div>

            </nav>
            <div className={'w-full'}>
                {children}
            </div>

        </>
    );
};

export default Layout;
