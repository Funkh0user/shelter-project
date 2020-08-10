
import React, { useState, useContext, useEffect } from 'react';
import ExclusiveOption from '../ExclusiveOption';
import { ThemeContext } from '../../ThemeContext';

import ApiDataContext from '../context/apiData/ApiDataContext'
import FieldSelectorContext from '../context/fieldSelectorContext/FieldSelectorContext';
import FieldSelectorState from '../context/fieldSelectorContext/FieldSelectorState';

const CategorySelector = (props) => {
	const themeContext = useContext(ThemeContext);
	const apiDataContext = useContext(ApiDataContext)
	const fieldSelectorContext = useContext(FieldSelectorContext)
	const [categories, setCategories] = useState([]);
	const [keyz, setTheKeyz] = useState([]);

	useEffect(() => {
		const labelsWithImages = createLabelWithImage(
			apiDataContext.categories,
			'category'
		);
		setCategories([labelsWithImages]);

		//look for categorySelectorState in localStorage. if its there, use it to determine which buttons should be styled when navigating backwards.
		if (JSON.parse(localStorage.getItem('categories')))
			setCategories(JSON.parse(localStorage.getItem('categories')));

		if (JSON.parse(localStorage.getItem('keyz')))
			setTheKeyz(JSON.parse(localStorage.getItem('keyz')));
	}, []);

	//TODO rename this...
	const setKey = (keyValue) => {
		setTheKeyz([...keyz, keyValue]);
	};

	//categoryType needs to be 'category' or 'subcategory'
	const createLabelWithImage = (array, categoryType) => {
		const svgPathEndings = themeContext === 'light' ? '-black.svg' : '-white.svg';
		let objArray = [];
		for (const item of array) {
			let obj = {};
			obj['label'] = item[categoryType];
			obj['image'] = '../dog' + svgPathEndings;
			objArray.push(obj);
		}
		return objArray;
	};

	const appendCategory = (row, id) => {
		let newCategory = categories.slice();
		//remove subCategories and keys if user clicks at a higher level of the tree
		for (let i = row; i < categories.length - 1; i++) {
			newCategory.pop();
			keyz.pop();
		}

		//keep options from growing
		if (row >= 2) {
			localStorage.setItem('categories', JSON.stringify(categories));
			localStorage.setItem('keyz', JSON.stringify(keyz));

			fieldSelectorContext.setCategoryId('');
			fieldSelectorContext.setCategorySelected(3)

			return;
		}

		//Category has been selected. Show subcategory
		if (row === 0) {
			newCategory[row + 1] = createLabelWithImage(
				apiDataContext.categories[id]['subcat'],
				'subcategory'
			);
			setCategories(newCategory);
			setKey(id);
			localStorage.setItem('categories', JSON.stringify(newCategory));
			localStorage.setItem('keyz', JSON.stringify(keyz));
			fieldSelectorContext.setCategoryId(apiDataContext.categories[id]['categoryID']);
			fieldSelectorContext.setCategorySelected(1)
		}
		//subcategory has been selectd. Show subbestCategory.
		else {
			try {
				newCategory[row + 1] = createLabelWithImage(
					apiDataContext.categories[keyz[0]]['subcat'][id]['subcatterm'],
					'sterm'
				);
				setCategories(newCategory);
				localStorage.setItem('categories', JSON.stringify(newCategory));
				localStorage.setItem('keyz', JSON.stringify(keyz));
				fieldSelectorContext.setCategoryId(
					apiDataContext.categories[keyz[0]]['subcat'][id]['subcategoryID']
				);
				fieldSelectorContext.setCategoryId(apiDataContext.categories[keyz[0]]['subcat'][id]['subcategoryID'])
				setKey(id);
				fieldSelectorContext.setCategorySelected(2)
				props.handleButtonStateChange({
					...props.buttonState,
					subCat: [
						{
							...props.buttonState.subCat[0],
							subCatTerm: [{ sterm: null }],
						},
					],
				});
				fieldSelectorContext.setButtonState({
					...props.buttonState,
					subCat: [
						{
							...props.buttonState.subCat[0],
							subCatTerm: [{ sterm: null }],
						},
					],
				});
			} catch (error) {
				console.log(
					apiDataContext.categories[id]['subcat'] +
						'does not have subCategories' +
						error
				);
			}
		}
	};

	return categories.map((categories, i) => (
		<ExclusiveOption
			buttonState={props.buttonState}
			handleButtonStateChange={props.handleButtonStateChange}
			items={categories}
			appendCategory={appendCategory}
			key={i}
			row={i}
		/>
	));
};

export default CategorySelector;
