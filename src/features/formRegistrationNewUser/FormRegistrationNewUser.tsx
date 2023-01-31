import React from 'react';
import { useForm, Resolver } from 'react-hook-form';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { setUserApi } from 'shared/api/apiMethod';


type FormValues = {
   firstName: string;
   phoneNumber: string;
   email: string;
   country: string;
   nickName: string;
   password: string;
};

function FormRegistrationNewUser(): React.ReactElement {
   // const resolver: Resolver<FormValues> = async (values) => {
   //   return {
   //     values: values.firstName ? values : {},
   //     errors: !values.firstName
   //       ? {
   //           firstName: {
   //             type: 'required',
   //             message: 'This is required.',
   //             minLength:{
   //               values:2,
   //               message:'Минимум 2 символа'
   //             }
   //           },
   //         }
   //       : {},
   //       minLength:{
   //         values:2,
   //         message:'Минимум 2 символа'
   //       }
   //   };
   // };

   const {
      register,
      reset,
      handleSubmit,
      formState: { errors },
   } = useForm<FormValues>({ mode: 'onBlur' });

   function onRegisterNewUser(data: FormValues): FormValues {
     const dataForm: FormValues = data;
     const { email, password } = dataForm;
     setUserApi(email,password)
     return dataForm;
   }


   return (
     <form
       className="flex gap-4  w-1/2 flex-col  bg text-white bg-slate-900 py-6 px-8 rounded-md shadow-lg"
       onSubmit={handleSubmit(onRegisterNewUser)}
     >
       <h2 className="text-xl font-bold text-center">Регистрация</h2>
       <label htmlFor="firstName">
         <p className="flex justify-between">
           <h2>Имя</h2> {errors?.firstName && <h2 className="text-red-700">{errors?.firstName?.message || "Errors"}</h2>}
         </p>
         <input
           className=" flex-1 w-full placeholder-slate-900 text-black font-semibold rounded-md shadow-lg px-2 py-1"
           type="text"
           {...register("firstName", {
             required: "Обязательное Поле",
             minLength: {
               value: 2,
               message: "Минимум 2 символа",
             },
             pattern: {
               value: /[А-Яа-я]{3}/,
               message: "Используйте кириллицу",
             },
           })}
         />
       </label>
       <label htmlFor="phoneNumber">
         <p className="flex justify-between">
           <h2>Номер телефона</h2> {errors?.phoneNumber && <h2 className="text-red-700">{errors?.phoneNumber?.message || "Errors"}</h2>}
         </p>
         <input
           type="phone"
           {...register("phoneNumber", {
             pattern: {
               value: /^\s*[\d]+(?:,[\d]+)?\s*$/,
               message: "Используйте только цифры",
             },
           })}
           className=" flex-1 w-full placeholder-slate-900 text-black font-semibold rounded-md shadow-lg px-2 py-1"
         />
       </label>
       <label htmlFor="email">
         <p className="flex justify-between">
           <h2>Email </h2> {errors?.email && <h2 className="text-red-700">{errors?.email?.message || "Error"}</h2>}
         </p>
         <input
           type="email"
           {...register("email", {
             required: "Обязательное Поле",
             pattern: {
               value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
               message: "Email введен не корректно",
             },
           })}
           className=" flex-1 w-full placeholder-slate-900 text-black font-semibold rounded-md shadow-lg px-2 py-1"
         />
       </label>
       <label htmlFor="country">
         <p className="flex justify-between">
           <h2>Страна</h2>
           {errors?.country && <h2 className="text-red-700">{errors?.country?.message || "Errors"}</h2>}
         </p>
         <input
           type="text"
           {...register("country", {
             minLength: {
               value: 2,
               message: "Минимум 2 символа",
             },
             pattern: {
               value: /[А-Яа-я]{3}/,
               message: "Используйте кириллицу",
             },
           })}
           className=" flex-1 w-full placeholder-slate-900 text-black font-semibold rounded-md shadow-lg px-2 py-1"
         />
       </label>
       <label htmlFor="nickName">
         <p className="flex justify-between">
           <h2>Nick name </h2> {errors?.nickName && <h2 className="text-red-700">{errors?.nickName?.message || "Errors"}</h2>}
         </p>
         <input
           className=" flex-1 w-full placeholder-slate-900 text-black font-semibold rounded-md shadow-lg px-2 py-1"
           type="text"
           {...register("nickName", {
             required: "Обязательное Поле",
             minLength: {
               value: 5,
               message: "Минимум 5 символов",
             },
             pattern: {
               value: /[A-Za-z]{5}/,
               message: "Используйте латиницу",
             },
           })}
         />
       </label>
       <label htmlFor="password">
         <p className="flex justify-between">
           <h2>Пароль</h2> {errors?.password && <h2 className="text-red-700">{errors?.password?.message || "Error"}</h2>}
         </p>
         <input
           type="text"
           {...register("password", {
             required: "Обязательное Поле",
             minLength: {
               value: 6,
               message: "Минимум 6 символов",
             },
             pattern: {
               value: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g,
               message: "Введите латиницу разных регистров и число",
             },
           })}
           className=" flex-1 w-full placeholder-slate-900 text-black font-semibold rounded-md shadow-lg px-2 py-1"
         />
       </label>
       <input
         className="flex-1 w-full placeholder-slate-900 cursor-pointer bg-white text-slate-900 font-semibold py-3 rounded-md shadow-lg "
         type="submit"
         value="Зарегистрироваться"
       />
     </form>
   );
}


export default FormRegistrationNewUser