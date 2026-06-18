"use client";

import { useState } from "react";
import {
    Card,
    Button,
    Link,
    TextField,
    Label,
    InputGroup,
    Input,
} from "@heroui/react";

import {
    Eye,
    EyeSlash,
    At,
    ShieldKeyhole,
} from "@gravity-ui/icons";

import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SigninForm({ redirectTo = "/" }) {
    // Form fields
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // UI states
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const router = useRouter();

    const toggleVisibility = () =>
        setIsVisible((prev) => !prev);

    const handleSignin = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setIsLoading(true);

        try {
            const { error: authError } =
                await signIn.email({
                    email,
                    password,
                });

            if (authError) {
                setError(
                    authError.message ||
                    "Invalid email or password."
                );
                return;
            }

            setSuccess(
                "Signed in successfully! Redirecting..."
            );

            setEmail("");
            setPassword("");

            router.push(redirectTo);
        } catch (err) {
            console.error(err);
            setError(
                "An unexpected network error occurred."
            );
        } finally {
            setIsLoading(false);
        }
    };
    const handleGoogleSignin = async () => {
        try {
            await signIn.social({
                provider: "google",
                callbackURL: redirectTo,
            });
        } catch (error) {
            console.error(error);
            setError("Failed to sign in with Google.");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
            <Card className="w-full max-w-md p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">

                {/* Header */}
                <div className="flex flex-col items-center justify-center gap-1 pb-6 border-b border-zinc-100 dark:border-zinc-800 mb-6 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
                        Welcome back
                    </h1>

                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Enter your credentials to access your account
                    </p>
                </div>

                <form
                    onSubmit={handleSignin}
                    className="flex flex-col gap-5"
                >
                    {/* Email */}
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        className="flex flex-col gap-1.5"
                    >
                        <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            Email Address
                        </Label>

                        <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-primary transition-colors">
                            <At
                                className="text-zinc-400 pointer-events-none"
                                size={16}
                            />

                            <Input
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) =>
                                    setEmail(e.target.value)
                                }
                                className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
                            />
                        </InputGroup>
                    </TextField>

                    {/* Password */}
                    <TextField
                        isRequired
                        name="password"
                        className="flex flex-col gap-1.5"
                    >
                        <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            Password
                        </Label>

                        <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-primary transition-colors">
                            <ShieldKeyhole
                                className="text-zinc-400 pointer-events-none"
                                size={16}
                            />

                            <Input
                                type={
                                    isVisible
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(
                                        e.target.value
                                    )
                                }
                                className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
                            />

                            <button
                                type="button"
                                onClick={toggleVisibility}
                                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition"
                                aria-label="toggle password visibility"
                            >
                                {isVisible ? (
                                    <EyeSlash size={18} />
                                ) : (
                                    <Eye size={18} />
                                )}
                            </button>
                        </InputGroup>
                    </TextField>

                    {/* Error */}
                    {error && (
                        <div className="p-3.5 text-xs font-medium rounded-xl bg-red-100/60 dark:bg-red-950/50 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900">
                            <span className="font-semibold">
                                Error:
                            </span>{" "}
                            {error}
                        </div>
                    )}

                    {/* Success */}
                    {success && (
                        <div className="p-3.5 text-xs font-medium rounded-xl bg-emerald-100/60 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900">
                            <span className="font-semibold">
                                Success:
                            </span>{" "}
                            {success}
                        </div>
                    )}

                    {/* Submit */}
                    <Button
                        type="submit"
                        color="primary"
                        className="w-full font-semibold rounded-xl text-sm h-12"
                        isLoading={isLoading}
                        isDisabled={isLoading}
                    >
                        Sign In
                    </Button>

                    {/* Footer */}
                    <div className="text-center pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                        New to HireLoop?{" "}
                        <Link
                            href={`/auth/signup?redirect=${encodeURIComponent(
                                redirectTo
                            )}`}
                            className="font-medium text-blue-600 dark:text-blue-400"
                        >
                            Create an account
                        </Link>
                        <Button
                            type="button"
                            variant="bordered"
                            className="w-full h-12 font-medium"
                            onPress={handleGoogleSignin}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 48 48"
                                className="w-5 h-5 mr-2"
                            >
                                <path
                                    fill="#FFC107"
                                    d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.233 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                                />
                                <path
                                    fill="#FF3D00"
                                    d="M6.306 14.691l6.571 4.819C14.655 16.108 18.961 13 24 13c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4c-7.682 0-14.347 4.337-17.694 10.691z"
                                />
                                <path
                                    fill="#4CAF50"
                                    d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.142 35.091 26.671 36 24 36c-5.211 0-9.617-3.329-11.283-7.946l-6.522 5.025C9.509 39.556 16.227 44 24 44z"
                                />
                                <path
                                    fill="#1976D2"
                                    d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.084 5.57l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                                />
                            </svg>

                            Continue with Google
                        </Button>
                    </div>
                </form>
            </Card>
        </div>
    );
}