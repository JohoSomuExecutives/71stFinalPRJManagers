// ParticipantForm.tsx
import React from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';

interface ParticipantFormProps {
    index: number;
    remove: (index: number) => void;
    register: any;
}

const ParticipantForm: React.FC<ParticipantFormProps> = ({ index, remove, register }) => {
    return (
        <div className='mb-4 border border-black p-4'>
            <h3 className="text-gray-700 text-sm font-bold mb-2">管理者(代表者以外):</h3>
            <div className="flex items-center mb-4">
                <input
                    {...register(`participants.${index}.name` as const, { required: '名前は必須です' })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="氏名"
                />
                <input
                    {...register(`participants.${index}.phonenum` as const, { required: '電話番号は必須です' })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-4"
                    type="text"
                    placeholder="電話番号"
                />
            </div>
            <div className="flex items-center mb-4">
                <input
                    {...register(`participants.${index}.studentnum` as const, { required: '学籍番号は必須です' })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder="学籍番号"
                />
                <input
                    {...register(`participants.${index}.mail` as const, { required: 'メールアドレスは必須です' })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-4"
                    type="text"
                    placeholder="メールアドレス"
                />
            </div>
            <input
                {...register(`participants.${index}.department` as const, { required: '所属学部/研究科は必須です' })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="所属学部/研究科"
            />
            <div className="-mr-2 text-right">
                <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-center w-[2vw] h-[2vw] m-2 right-0 bg-red-500 hover:bg-red-700 text-white font-bold rounded focus:outline-none focus:shadow-outline"
                >
                    ✕
                </button>
            </div>
        </div>
    );
};

export default ParticipantForm;
