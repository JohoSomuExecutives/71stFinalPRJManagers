"use client";
import React from 'react';
import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import ParticipantForm from './components/ParticipantInput';
import { UseFormRegister } from 'react-hook-form';
import { collection, addDoc, getFirestore } from "firebase/firestore";  
import { getFirebaseApp } from './lib/firebase/config';

type Participant = {
    name: string;
    phonenum: string;
    studentnum: string;
    mail: string;
    department: string;
};

type FormData = {
    projectName: string;
    representative: Participant; // 代表者用のフィールドを追加
    participants: Participant[];
};

export default function FormComponent() {

    // Initialize Firebase
    const app = getFirebaseApp();

    // Initialize Cloud Firestore and get a reference to the service
    const db = getFirestore(app);

    const { register, handleSubmit, formState: { errors }, control } = useForm<FormData>({
        defaultValues: {
            projectName: '',
            representative: { name: '', phonenum: '', studentnum: '', mail: '', department: '' }, // 代表者のデフォルト値を設定
            participants: [{ name: '', phonenum: '', studentnum: '', mail: '', department: '' }]
        }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'participants'
    });


    const onSubmit: SubmitHandler<FormData> = async (data) => { 
        const docRef = await addDoc(collection(db, "Managers"), data);
        console.log("Document written with ID: ", docRef.id);
    };

    return (
        <>
            <h1 className='text-3xl text-center mt-16 text-sans'>理工展連絡会 最終企画書 企画管理（出展場所常駐）者調査フォーム</h1>
            <div className="mt-16 flex items-center h-screen flex-col">
                <form className="w-full border border-black p-8 max-w-xl" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label htmlFor="projectName" className="block text-gray-700 text-sm font-bold mb-2">
                            企画名:
                        </label>
                        <input
                            {...register('projectName', { required: '企画名は必須です' })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="projectName"
                            type="text"
                            placeholder="企画名"
                        />
                        {errors.projectName && <p className="text-red-500">{errors.projectName.message}</p>}
                    </div>
                    {/* 代表者セクション */}
                    <div className="mb-4 border border-black p-4">
                        <h3 className="text-gray-700 text-sm font-bold mb-2">代表者:</h3>
                        <div className="flex items-center mb-4">
                            <input
                                {...register('representative.name', { required: '名前は必須です' })}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="名前"
                            />
                            <input
                                {...register('representative.phonenum', { required: '電話番号は必須です' })}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-4"
                                type="text"
                                placeholder="電話番号"
                            />
                        </div>
                        <div className="flex items-center mb-4">
                            <input
                                {...register('representative.studentnum', { required: '学籍番号は必須です' })}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder="学籍番号"
                            />
                            <input
                                {...register('representative.mail', { required: 'メールアドレスは必須です' })}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-4"
                                type="text"
                                placeholder="メールアドレス"
                            />
                        </div>
                        <input
                            {...register('representative.department', { required: '所属学部/研究科は必須です' })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            placeholder="所属学部/研究科"
                        />
                    </div>
                    {/* 一般者セクション */}
                    {fields.map((field, index) => (
                        <ParticipantForm
                            key={field.id}
                            index={index}
                            register={register as UseFormRegister<FormData>}
                            remove={remove}
                        />
                    ))}
                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() => append({ name: '', phonenum: '', studentnum: '', mail: '', department: '' } as Participant)}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform hover:scale-110 transition-transform duration-300"
                        >
                            追加
                        </button>
                        <button
                            type="submit"
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform hover:scale-110 transition-transform duration-300"
                        >
                            送信
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}