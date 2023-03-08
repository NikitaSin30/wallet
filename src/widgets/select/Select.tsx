import { ISelect } from './interfaces/interfaces';



export const Select = (props:ISelect) => {
    const {
        isActiveSelect,
        getValueSelect,
        toggleActiveSelect,
        register,
        categories,
        selected,
        labelTitle,
    } = props;

    const style = isActiveSelect ? 'block' : 'hidden';

    return (
        <>
            <div
                onClick={toggleActiveSelect}
                className="flex-1 cursor-pointer bg-white h-8
                         text-black font-semibold rounded-md shadow-lg py-1"
            >
                <div {...register(labelTitle, { required: true })}>{selected}</div>
                <ul className={`flex-1 w-full max-h-20 overflow-y-auto relative bg-slate-900 ${style}`}>
                    {categories?.map(({ categorie }) => {
                        return (
                            <li
                                key={categorie}
                                className="bg-white cursor-pointer  h-8
                         text-black font-semibold rounded-md shadow-lg px-2 py-1 border-solid border-b-2 hover:bg-slate-500 hover:text-white"
                                onClick={() => getValueSelect(categorie)}
                            >
                                {categorie}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
};
