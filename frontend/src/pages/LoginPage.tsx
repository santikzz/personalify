
import { useState } from 'react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Navigate, useNavigate } from 'react-router-dom'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Lock, LogIn, Mail } from 'lucide-react'
import { PasswordInput } from '@/components/ui/password-input'

import { authenticate } from '@/services/api'
import { logo_full_black, logo_full_white, squad_icon_256 } from "@/Assets"
import { useGlobalContext } from '@/context/GlobalContext'
import { AdministratorCredentials } from '@/types/Api.types'

const formSchema = z.object({
    email: z.string({ required_error: 'Ingrese su email' }).email({ message: 'Invalid email address' }),
    password: z.string({ required_error: 'Ingrese su contraseña' })
});

export const LoginPage = () => {

    const { isAuthenticated, storeSession } = useGlobalContext();
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const form = useForm({ resolver: zodResolver(formSchema) })

    const onSubmit = async (userdata: AdministratorCredentials) => {
        setError(null);
        try {
            const token = await authenticate(userdata);
            if (token) {
                storeSession(token)
                navigate('/', { replace: true });
            }
        } catch (err) {
            setError('Email y/o contraseña invalidos');
        }

    }

    if (isAuthenticated) return <Navigate to="/" replace />

    return (

        <div className='min-h-screen w-full flex justify-center bg-neutral-100 login-background'>

            <div className="flex flex-col items-center justify-center w-[90%] md:w-[400px]">

                <div className="flex flex-row items-center space-x-2 mb-4 w-full">
                    {/* <img src={logo_full_black} className="" alt="SQUAD" /> */}
                    {/* <h2 className='font-bold text-5xl'>PERSONALIFY</h2> */}
                </div>

                <Card className="w-full">
                    <CardHeader>
                        <img src={logo_full_black} className="" alt="SQUAD" />
                        <CardTitle className="text-2xl">Iniciar sesion</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <div className="grid gap-4">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem className="grid gap-2">
                                                <FormLabel htmlFor="email" className="inline-flex items-center gap-1">
                                                    <Mail size={14} />
                                                    Email
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        id="email"
                                                        placeholder="example@mail.com"
                                                        type="email"
                                                        autoComplete="email"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem className="grid gap-2">
                                                <div className="flex justify-between items-center">
                                                    <FormLabel htmlFor="password" className="inline-flex items-center gap-1">
                                                        <Lock size={14} />
                                                        Contraseña
                                                    </FormLabel>
                                                </div>
                                                <FormControl>
                                                    <PasswordInput
                                                        id="password"
                                                        placeholder="******"
                                                        autoComplete="current-password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    {error && <Label className="text-red-500">{error}</Label>}
                                    <Button type="submit" className="w-full">
                                        <LogIn />
                                        Iniciar sesion
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>


        </div>

    )
}