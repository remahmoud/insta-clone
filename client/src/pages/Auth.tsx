import { useCallback, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useNavigate, Navigate } from "react-router-dom";
import Input from "@src/components/Input";
import { getToken } from "@src/api/instance";
import Logo from "../assets/logo.png";
import useLogin from "@src/api/hooks/useLogin";
import useRegister from "@src/api/hooks/useRegister";
import { RegisterType } from "@src/types";

type AuthState = "LOGIN" | "REGISTER";

export default function Auth() {
    const token = getToken();
    const navigate = useNavigate();
    const [parent] = useAutoAnimate({
        duration: 400,
    });

    const { mutateAsync: loginMutate } = useLogin();
    const { mutateAsync: registerMutate } = useRegister();
    const [authState, setAuthState] = useState<AuthState>("LOGIN");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            fname: "",
            lname: "",
            username: "",
            password: "",
            email: "",
        },
    });

    // toggle auth state
    const changeAuthState = useCallback(() => {
        if (authState === "LOGIN") {
            setAuthState("REGISTER");
        } else {
            setAuthState("LOGIN");
        }
    }, [authState]);

    // handle submit
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (authState === "LOGIN") {
            // handle login
            const reqData = {
                email: data.email,
                password: data.password,
            };
            await loginMutate(reqData, {
                onSuccess: (data) => {
                    if (data.token) {
                        localStorage.setItem("token", data.token);
                        navigate("/");
                    }
                },
            });
        } else {
            // handle register
            await registerMutate(data as RegisterType, {
                onSuccess: (data) => {
                    if (data.token) {
                        localStorage.setItem("token", data.token);
                        navigate("/");
                    }
                },
            });
        }
    };
    if (token) {
        return <Navigate to="/" />;
    }
    return (
        <div className="h-full container mx-auto flex items-center">
            <div className="px-6 mx-auto my-4 py-2 shadow-md border border-gray-200 rounded-lg w-96 max-w-md flex flex-col transition-all">
                <div className="mb-4">
                    <img src={Logo} className="h-20 mx-auto" />
                    <h3 className="text-center text-4xl font-semibold">
                        Instagram
                    </h3>
                </div>
                <form
                    ref={parent}
                    onSubmit={handleSubmit(onSubmit)}
                    className="mb-4"
                >
                    {authState === "REGISTER" && (
                        <>
                            <Input
                                id="fname"
                                label="First Name"
                                type="text"
                                register={register}
                                errors={errors}
                                placeholder="First Name"
                            />
                            <Input
                                id="lname"
                                label="Last Name"
                                type="text"
                                register={register}
                                errors={errors}
                                placeholder="Last Name"
                            />
                            <Input
                                id="username"
                                label="Username"
                                type="text"
                                register={register}
                                errors={errors}
                                placeholder="Username"
                            />
                        </>
                    )}
                    <Input
                        id="email"
                        label="Email"
                        type="email"
                        register={register}
                        errors={errors}
                        placeholder="Email"
                    />
                    <Input
                        id="password"
                        label="Password"
                        type="password"
                        register={register}
                        errors={errors}
                        placeholder="Password"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 mt-2 text-white w-full py-2 rounded-lg font-semibold"
                    >
                        Submit
                    </button>
                </form>
                <div>
                    <section className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                {authState === "LOGIN"
                                    ? "Don't have an account?"
                                    : "Already have an account?"}
                            </span>
                        </div>
                    </section>
                    <section className="mt-3 flex justify-center gap-2 px-2 text-sm text-gray-500">
                        <div>
                            {authState === "LOGIN"
                                ? "New to Instagram?"
                                : "Already have an account."}
                        </div>
                        <div
                            onClick={changeAuthState}
                            className="cursor-pointer font-semibold text-blue-600"
                        >
                            {authState === "LOGIN"
                                ? "Create an account"
                                : "Login"}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
