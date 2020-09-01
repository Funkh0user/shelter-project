/** @format */

import React, { useState, useContext } from 'react';
import FieldSelectorContext from '../context/fieldSelectorContext/FieldSelectorContext';
import SearchBar from '../SearchBar/SearchBar';
import CategorySelector from '../categorySelector/CategorySelector';
import InputLabel from '../InputLabel';
import SubmitButton from '../SubmitButton/SubmitButton.js';
//import ThemeDataContext from '../context/themeData/ThemeDataContext.js';

const Resources = (props) => {
	const fieldSelectorContext = useContext(FieldSelectorContext);
	const [isLoading, setIsLoading] = useState(false);

	const handleIsLoading = () => {
		setIsLoading(!isLoading);
	};

	return (
		//<div className={'field-selector ' + themeDataContext.themeColor}>
		<div className='flex flex-col items-center justify-center mx-5 sm:mx-16 lg:mx-32'>
			<div className='border shadow w-full my-16 px-5 py-5 flex justify-end'>
				<SearchBar handleIsLoading={handleIsLoading} />
			</div>
			{/* <InputLabel label='Resource'> */}
			<div className='border shadow w-full'>
				<CategorySelector />
			</div>
			{/* </InputLabel> */}
			<div className='mt-16'>
				<SubmitButton handleIsLoading={handleIsLoading} />
			</div>
		</div>
	);
};


// return (
// 	//<div className={'field-selector ' + themeDataContext.themeColor}>
// 	<div className=' mx-5 sm:mx-16 lg:mx-32'>
// 		<div className='border shadow w-full my-16 px-5 py-5 flex justify-end'>
// 			<SearchBar handleIsLoading={handleIsLoading} />
// 		</div>
// 		{/* <InputLabel label='Resource'> */}
// 		<div className='border shadow w-full grid grid-auto-rows grid-cols-12'>
// 			<div className='col-start-1 col-span-1 row-start-1'>
// 				<button className='text-lg'>
// 					{'<'}
// 				</button>
// 			</div>
// 			<div className='col-start-2 col-span-10'>
// 			<CategorySelector />

// 			</div>
// 			<div className='col-start-12 col-span-1 row-start-1'>
// 				<button className='text-lg'>
// 					{'>'}
// 				</button>
// 			</div>
// 			{/* <CategorySelector /> */}
// 		</div>
// 		{/* </InputLabel> */}
// 		<div className='mt-16'>
// 			<SubmitButton handleIsLoading={handleIsLoading} />
// 		</div>
// 	</div>
// );
// };
export default Resources;
