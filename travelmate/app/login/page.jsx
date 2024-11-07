'use client'
import { useState } from 'react';
import { Navigation } from '@/components/navigation';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter()
    const handleSubmit = (event) => {
        event.preventDefault();

        // Hardcoded credentials
        const hardcodedEmail = "user@example.com";
        const hardcodedPassword = "password123";

        if (email === hardcodedEmail && password === hardcodedPassword) {
            alert("Login successful!");
            router.push('/')
        } else {
            alert("Invalid email or password.");
        }
    };

    return (
        <main className="min-h-screen bg-background">
            <Navigation />
            <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>Enter your credentials to access your account</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5 mb-4">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <CardFooter>
                                <Button type="submit" className="w-full">Login</Button>
                            </CardFooter>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
