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
import { Description, Radio, RadioGroup } from "@heroui/react";

import {
    Eye,
    EyeSlash,
    Person,
    At,
    ShieldKeyhole,
} from "@gravity-ui/icons";

import { signIn, signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { ImageIcon } from "lucide-react";

export default function SignupForm({ redirectTo = "/" }) {
    // Form fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("user");
    const [image, setImage] = useState("");

    // UI States
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const router = useRouter();

    const toggleVisibility = () => setIsVisible((prev) => !prev);

    const handleSignup = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (!name.trim()) {
            setError("Name is required.");
            return;
        }

        if (!email.trim()) {
            setError("Email is required.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        setIsLoading(true);

        const plan = "free";

        try {
            const { error: authError } = await signUp.email({
                email,
                password,
                name,
                role,
                plan,
                image: image || "",
            });

            console.log(email, password, name, role, plan);

            if (authError) {
                setError(
                    authError.message ||
                    "Something went wrong during signup."
                );
                return;
            }

            setSuccess("Account created successfully!");

            setName("");
            setEmail("");
            setPassword("");
            setImage("");

            router.push(redirectTo);
        } catch (err) {
            console.error(err);
            setError("An unexpected network error occurred.");
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
                        Create an account
                    </h1>

                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Fill in the fields below to get started
                    </p>
                </div>

                <form
                    onSubmit={handleSignup}
                    className="flex flex-col gap-5"
                >
                    {/* Name */}
                    <TextField
                        isRequired
                        name="name"
                        className="flex flex-col gap-1.5"
                    >
                        <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                            Name
                        </Label>

                        <InputGroup className="flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900 focus-within:border-primary transition-colors">
                            <Person
                                className="text-zinc-400 pointer-events-none"
                                size={16}
                            />

                            <Input
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) =>
                                    setName(e.target.value)
                                }
                                className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
                            />
                        </InputGroup>
                    </TextField>

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

                                        <div className="space-y-1 text-left">
                        <label className="text-zinc-550 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider block">Image URL (Optional)</label>
                        <div className="relative">
                            <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
                            <input
                                type="url"
                                placeholder="https://example.com/photo.jpg"
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-transparent text-zinc-900 dark:text-white text-sm outline-none focus:border-[#7C3AED] dark:focus:border-[#7C3AED] transition-all placeholder-zinc-400 dark:placeholder-zinc-500"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </div>
                    </div>

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
                                type={isVisible ? "text" : "password"}
                                placeholder="Choose a password"
                                value={password}
                                onChange={(e) =>
                                    setPassword(e.target.value)
                                }
                                className="w-full bg-transparent py-2 text-sm outline-none border-none text-zinc-900 dark:text-zinc-100"
                            />

                            <button
                                type="button"
                                onClick={toggleVisibility}
                                className="focus:outline-none text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition"
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

                    {/* role */}

                    <div className="space-y-2 pt-1">
                        <label className="text-gray-400 text-xs font-medium block">Signup As</label>
                        <div className="flex gap-6 text-sm text-white">
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                                <input
                                    type="radio"
                                    name="role"
                                    value="user"
                                    checked={role === "user"}
                                    onChange={() => setRole("user")}
                                    className="accent-[#7C3AED] h-4 w-4"
                                />
                                Regular User
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer select-none">
                                <input
                                    type="radio"
                                    name="role"
                                    value="creator"
                                    checked={role === "creator"}
                                    onChange={() => setRole("creator")}
                                    className="accent-[#7C3AED] h-4 w-4"
                                />
                                Prompt Creator
                            </label>
                        </div>
                    </div>

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
                        className="w-full h-12 rounded-xl font-semibold text-sm"
                        isLoading={isLoading}
                        isDisabled={isLoading}
                    >
                        Sign Up
                    </Button>

                    {/* Footer */}
                    <div className="text-center pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                        Already have an account?{" "}
                        <Link
                            href={`/auth/signin?redirect=${encodeURIComponent(
                                redirectTo
                            )}`}
                            className="font-medium text-blue-600 dark:text-blue-400 cursor-pointer"
                        >
                            Sign in instead
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