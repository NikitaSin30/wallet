import React from 'react';
import { useForm } from 'react-hook-form';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Context, GlobalContext } from 'shared/context/context';
import { Navigate } from 'react-router';
import { IFormAuth } from 'features/auth/interfaces/interfaces';
import { UserStore } from 'shared/store/userStore/UserStore';



function FormRegistrationNewUser(): React.ReactElement {
    const { isLogin, onChangeIsLogin }  = React.useContext<GlobalContext>(Context);
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<IFormAuth>({ mode: 'onBlur' });


    function onModifyNewUser({ email,password }: IFormAuth): void {

        registerUser(email, password);
        reset();
    }

    function registerUser(email: string, password: string): void {
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, email, password)
            .then((data) => {
                UserStore.setUser(data.user.email!);
                onChangeIsLogin();

            })
            .catch((error) => new Error(error.message));
    }


    return !isLogin ? (
        <form className="flex gap-1   flex-col  bg text-white bg-slate-900 py-6 px-8 rounded-md shadow-lg md:w-1/2" onSubmit={handleSubmit(onModifyNewUser)}>
            <h2 className="text-xl font-bold text-center">Регистрация</h2>
            <div className="flex justify-between">
                <span>Имя</span> {errors?.firstName && <span className="text-red-700">{errors?.firstName?.message || 'Errors'}</span>}
            </div>
            <input
                className=" flex-1 w-full placeholder-slate-900 text-black font-semibold rounded-md shadow-lg px-2 py-1"
                type="text"
                {...register('firstName', {
                    minLength : {
                        value   : 2,
                        message : 'Минимум 2 символа',
                    },
                    pattern : {
                        value   : /[А-Яа-я]{3}/,
                        message : 'Используйте кириллицу',
                    },
                })}
            />
            <div className="flex justify-between">
                <span>Номер телефона</span> {errors?.phoneNumber && <span className="text-red-700">{errors?.phoneNumber?.message || 'Errors'}</span>}
            </div>
            <input
                type="phone"
                {...register('phoneNumber', {
                    pattern : {
                        value   : /^\s*[\d]+(?:,[\d]+)?\s*$/,
                        message : 'Используйте только цифры',
                    },
                })}
                className=" flex-1 w-full placeholder-slate-900 text-black font-semibold rounded-md shadow-lg px-2 py-1"
            />
            <div className="flex justify-between">
                <span>Email </span> {errors?.email && <span className="text-red-700">{errors?.email?.message || 'Error'}</span>}
            </div>
            <input
                type="email"
                {...register('email', {
                    required : 'Обязательное Поле',
                    pattern  : {
                        value   : /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
                        message : 'Email введен не корректно',
                    },
                })}
                className=" flex-1 w-full placeholder-slate-900 text-black font-semibold rounded-md shadow-lg px-2 py-1"
            />
            <div className="flex justify-between">
                <span>Страна</span>
                {errors?.country && <span className="text-red-700">{errors?.country?.message || 'Errors'}</span>}
            </div>
            <input
                type="text"
                {...register('country', {
                    minLength : {
                        value   : 2,
                        message : 'Минимум 2 символа',
                    },
                    pattern : {
                        value   : /[А-Яа-я]{3}/,
                        message : 'Используйте кириллицу',
                    },
                })}
                className=" flex-1 w-full placeholder-slate-900 text-black font-semibold rounded-md shadow-lg px-2 py-1"
            />
            <div className="flex justify-between">
                <span>Nick name </span> {errors?.nickName && <span className="text-red-700">{errors?.nickName?.message || 'Errors'}</span>}
            </div>
            <input
                className=" flex-1 w-full placeholder-slate-900 text-black font-semibold rounded-md shadow-lg px-2 py-1"
                type="text"
                {...register('nickName', {
                    minLength : {
                        value   : 5,
                        message : 'Минимум 5 символов',
                    },
                    pattern : {
                        value   : /[A-Za-z]{5}/,
                        message : 'Используйте латиницу',
                    },
                })}
            />
            <div className="flex justify-between">
                <span>Пароль</span> {errors?.password && <span className="text-red-700">{errors?.password?.message || 'Error'}</span>}
            </div>
            <input
                type="text"
                {...register('password', {
                    required  : 'Обязательное Поле',
                    minLength : {
                        value   : 6,
                        message : 'Минимум 6 символов',
                    },
                    pattern : {
                        value   : /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g,
                        message : 'Введите латиницу разных регистров и число',
                    },
                })}
                className=" flex-1 w-full placeholder-slate-900 text-black font-semibold rounded-md shadow-lg px-2 py-1"
            />
            <input
                className="flex-1 w-full placeholder-slate-900 cursor-pointer bg-white text-slate-900 font-semibold py-3 rounded-md shadow-lg "
                type="submit"
                value="Зарегистрироваться"
                disabled={!isValid}
            />
        </form>
    ) : (
        <Navigate to="/" />
    );
}

export default FormRegistrationNewUser;
